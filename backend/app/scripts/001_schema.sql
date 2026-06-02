-- ============================================================
-- KB Brothers FMCG — Supabase Schema Migration
-- Run this in the Supabase SQL Editor (or via supabase db push)
-- ============================================================

-- 0. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES (linked to auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT UNIQUE NOT NULL,
  role        TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  store_name  TEXT,
  owner_name  TEXT,
  phone       TEXT,
  address     TEXT,
  credit_limit  NUMERIC(12,2) DEFAULT 0,
  outstanding   NUMERIC(12,2) DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'PENDING_APPROVAL' CHECK (status IN ('PENDING_APPROVAL', 'ACTIVE', 'SUSPENDED')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. PRODUCTS (HUL catalog)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
  hul_article_code TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  brand            TEXT NOT NULL,
  category         TEXT NOT NULL CHECK (category IN ('HOME_CARE', 'BEAUTY_PERSONAL_CARE', 'FOODS_REFRESHMENT')),
  unit_size        TEXT NOT NULL,
  case_quantity    INTEGER NOT NULL DEFAULT 1,
  mrp              NUMERIC(10,2) NOT NULL,
  distributor_price NUMERIC(10,2) NOT NULL,
  image            TEXT DEFAULT '/brands/placeholder.png',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. INVENTORY (per-batch stock)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.inventory (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_code     TEXT NOT NULL REFERENCES public.products(hul_article_code) ON DELETE CASCADE,
  batch_number     TEXT NOT NULL,
  expiry_date      DATE,
  quantity         INTEGER NOT NULL DEFAULT 0,
  warehouse_location TEXT DEFAULT 'Main Warehouse',
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  retailer_id  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status       TEXT NOT NULL DEFAULT 'PENDING'
               CHECK (status IN ('PENDING','CONFIRMED','PROCESSING','OUT_FOR_DELIVERY','DELIVERED')),
  total_value  NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. ORDER ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id       UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_code   TEXT NOT NULL REFERENCES public.products(hul_article_code),
  quantity       INTEGER NOT NULL DEFAULT 1,
  price_per_unit NUMERIC(10,2) NOT NULL
);

-- ============================================================
-- 6. AUTO-CREATE PROFILE ON SIGN-UP
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    'client',
    'PENDING_APPROVAL'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Products (public read)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Inventory (authenticated read, admin write)
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read inventory"
  ON public.inventory FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage inventory"
  ON public.inventory FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = retailer_id);

CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Clients can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = retailer_id);

CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Order Items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view order items for their orders"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND retailer_id = auth.uid())
  );

CREATE POLICY "Admins can view all order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Clients can create order items"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND retailer_id = auth.uid())
  );

-- ============================================================
-- 8. INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_inventory_product ON public.inventory(product_code);
CREATE INDEX IF NOT EXISTS idx_orders_retailer   ON public.orders(retailer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order  ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role      ON public.profiles(role);
