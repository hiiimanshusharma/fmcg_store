# Data Model: KB Brothers FMCG Distribution

## Entities

### Product (HUL SKU)
- `hul_article_code`: String (Primary Key) - Official HUL identifier
- `name`: String - e.g., "Surf Excel Matic Liquid"
- `brand`: String - e.g., "Surf Excel"
- `category`: Enum (HOME_CARE, BEAUTY_PERSONAL_CARE, FOODS_REFRESHMENT)
- `unit_size`: String - e.g., "1L", "500g"
- `case_quantity`: Integer - Units per case
- `mrp`: Decimal
- `distributor_price`: Decimal

### Inventory
- `id`: UUID (Primary Key)
- `product_code`: String (Foreign Key -> Product)
- `batch_number`: String
- `expiry_date`: Date
- `quantity`: Integer (Available units)
- `warehouse_location`: String

### Retailer (Client)
- `id`: UUID (Primary Key)
- `email`: String (Unique) - For Gmail SSO
- `store_name`: String
- `owner_name`: String
- `address`: Text
- `phone`: String
- `credit_limit`: Decimal
- `status`: Enum (PENDING_APPROVAL, ACTIVE, SUSPENDED)

### Order
- `id`: UUID (Primary Key)
- `retailer_id`: UUID (Foreign Key -> Retailer)
- `status`: Enum (PENDING, CONFIRMED, PROCESSING, OUT_FOR_DELIVERY, DELIVERED)
- `total_value`: Decimal
- `created_at`: Timestamp
- `updated_at`: Timestamp

### OrderItem
- `id`: UUID (Primary Key)
- `order_id`: UUID (Foreign Key -> Order)
- `product_code`: String (Foreign Key -> Product)
- `quantity`: Integer
- `price_per_unit`: Decimal

## State Transitions

### Order Status
1. **PENDING**: Created by Retailer.
2. **CONFIRMED**: Admin reviews and approves.
3. **PROCESSING**: Warehouse starts picking items.
4. **OUT_FOR_DELIVERY**: Dispatched with driver.
5. **DELIVERED**: Confirmed by driver/retailer.
