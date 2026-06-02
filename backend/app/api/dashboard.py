from fastapi import APIRouter, Depends
from app.auth import require_admin, CurrentUser
from app.supabase_client import get_supabase_client

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/metrics")
async def get_dashboard_metrics(user: CurrentUser = Depends(require_admin)):
    """Return aggregated dashboard metrics (admin only)."""
    sb = get_supabase_client()

    # Total retailers
    retailers = sb.table("profiles").select("id", count="exact").eq("role", "client").execute()
    total_retailers = retailers.count or 0

    # Active retailers
    active_retailers = sb.table("profiles").select("id", count="exact").eq("role", "client").eq("status", "ACTIVE").execute()
    active_retailer_count = active_retailers.count or 0

    # Total products
    products = sb.table("products").select("hul_article_code", count="exact").execute()
    total_products = products.count or 0

    # Inventory stats
    inv = sb.table("inventory").select("product_code, quantity").execute()
    inv_data = inv.data or []
    stock_map: dict[str, int] = {}
    for row in inv_data:
        code = row["product_code"]
        stock_map[code] = stock_map.get(code, 0) + row["quantity"]

    total_stock_units = sum(stock_map.values())
    oos_count = sum(1 for qty in stock_map.values() if qty == 0)
    stockout_rate = (oos_count / len(stock_map) * 100) if stock_map else 0

    # Orders summary
    orders = sb.table("orders").select("total_value, status").execute()
    orders_data = orders.data or []
    total_revenue = sum(o["total_value"] for o in orders_data)
    pending_orders = sum(1 for o in orders_data if o["status"] == "PENDING")

    # Top selling products (by order item quantity)
    top_items = sb.table("order_items").select(
        "product_code, quantity, products(name, brand)"
    ).execute()
    product_sales: dict[str, dict] = {}
    for item in (top_items.data or []):
        code = item["product_code"]
        if code not in product_sales:
            product_sales[code] = {
                "product_code": code,
                "name": item.get("products", {}).get("name", ""),
                "brand": item.get("products", {}).get("brand", ""),
                "total_quantity": 0,
            }
        product_sales[code]["total_quantity"] += item["quantity"]

    top_products = sorted(product_sales.values(), key=lambda x: x["total_quantity"], reverse=True)[:5]

    return {
        "total_retailers": total_retailers,
        "active_retailers": active_retailer_count,
        "total_products": total_products,
        "total_stock_units": total_stock_units,
        "stockout_rate": round(stockout_rate, 1),
        "total_revenue": total_revenue,
        "pending_orders": pending_orders,
        "top_products": top_products,
    }
