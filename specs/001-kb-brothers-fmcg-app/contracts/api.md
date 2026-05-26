# API Contract: KB Brothers FMCG Portal

## Authentication
- **Method**: Google OAuth2 (Gmail SSO)
- **Scope**: email, profile

## Retailer Endpoints

### Order Placement
- **POST** `/api/orders`
- **Body**:
```json
{
  "items": [
    { "product_code": "HUL12345", "quantity": 10 }
  ]
}
```

### View Catalog
- **GET** `/api/products`
- **Query Params**: `category`, `brand`, `search`

## Admin Endpoints

### Inventory Management
- **PATCH** `/api/inventory/:id`
- **Body**: `{ "quantity": 100, "batch": "B123" }`

### Order Management
- **PATCH** `/api/orders/:id/status`
- **Body**: `{ "status": "CONFIRMED" }`
