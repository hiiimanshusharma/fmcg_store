-- ============================================================
-- KB Brothers FMCG — Seed Data
-- Run AFTER 001_schema.sql in the Supabase SQL Editor
-- ============================================================

-- Products (HUL Catalog)
INSERT INTO public.products (hul_article_code, name, brand, category, unit_size, case_quantity, mrp, distributor_price, image)
VALUES
  ('HUL-SFE-105', 'Surf Excel Easy Wash', 'Surf Excel', 'HOME_CARE', '1kg', 12, 195.00, 168.00, '/brands/surf-excel.png'),
  ('HUL-SFE-112', 'Surf Excel Matic Front Load', 'Surf Excel', 'HOME_CARE', '1L', 6, 380.00, 328.00, '/brands/surf-excel.png'),
  ('HUL-DVS-201', 'Dove Cream Beauty Bathing Bar', 'Dove', 'BEAUTY_PERSONAL_CARE', '100g', 48, 62.00, 52.00, '/brands/dove.png'),
  ('HUL-LUX-001', 'Lux International Soap', 'Lux', 'BEAUTY_PERSONAL_CARE', '100g', 48, 65.00, 55.00, '/brands/dove.png'),
  ('HUL-LUX-002', 'Lux Velvet Touch Soap', 'Lux', 'BEAUTY_PERSONAL_CARE', '100g', 48, 62.00, 53.00, '/brands/dove.png'),
  ('HUL-RLT-301', 'Red Label Tea', 'Red Label', 'FOODS_REFRESHMENT', '500g', 24, 295.00, 255.00, '/brands/red-label.png'),
  ('HUL-KNR-401', 'Knorr Hot & Sour Soup', 'Knorr', 'FOODS_REFRESHMENT', '43g', 48, 55.00, 46.00, '/brands/red-label.png'),
  ('HUL-KNR-024', 'Knorr Manchow Soup', 'Knorr', 'FOODS_REFRESHMENT', '43g', 48, 58.00, 48.00, '/brands/red-label.png'),
  ('HUL-VIM-501', 'Vim Bar', 'Vim', 'HOME_CARE', '200g', 36, 25.00, 21.00, '/brands/surf-excel.png'),
  ('HUL-RIN-601', 'Rin Detergent Bar', 'Rin', 'HOME_CARE', '250g', 36, 18.00, 15.00, '/brands/surf-excel.png'),
  ('HUL-HLK-701', 'Horlicks Health Drink', 'Horlicks', 'FOODS_REFRESHMENT', '500g', 12, 280.00, 242.00, '/brands/red-label.png'),
  ('HUL-KSN-801', 'Kissan Mixed Fruit Jam', 'Kissan', 'FOODS_REFRESHMENT', '500g', 12, 170.00, 146.00, '/brands/red-label.png')
ON CONFLICT (hul_article_code) DO NOTHING;

-- Inventory (initial batches)
INSERT INTO public.inventory (product_code, batch_number, expiry_date, quantity, warehouse_location)
VALUES
  ('HUL-SFE-105', 'B2026-01', '2027-06-15', 450, 'Main Warehouse'),
  ('HUL-SFE-112', 'B2026-01', '2027-06-15', 120, 'Main Warehouse'),
  ('HUL-DVS-201', 'B2026-02', '2028-01-20', 800, 'Main Warehouse'),
  ('HUL-LUX-001', 'B2026-02', '2028-03-10', 640, 'Main Warehouse'),
  ('HUL-LUX-002', 'B2026-02', '2028-03-10', 0, 'Main Warehouse'),
  ('HUL-RLT-301', 'B2026-03', '2027-11-30', 340, 'Main Warehouse'),
  ('HUL-KNR-401', 'B2026-03', '2027-09-15', 0, 'Main Warehouse'),
  ('HUL-KNR-024', 'B2026-03', '2027-09-15', 200, 'Main Warehouse'),
  ('HUL-VIM-501', 'B2026-04', '2028-06-01', 1200, 'Main Warehouse'),
  ('HUL-RIN-601', 'B2026-04', '2028-06-01', 900, 'Main Warehouse'),
  ('HUL-HLK-701', 'B2026-05', '2027-12-31', 5, 'Main Warehouse'),
  ('HUL-KSN-801', 'B2026-05', '2027-08-20', 150, 'Main Warehouse');
