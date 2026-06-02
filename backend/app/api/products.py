from fastapi import APIRouter, Depends, Query
from typing import Optional
from app.auth import get_current_user, CurrentUser
from app.supabase_client import get_supabase_client

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("")
async def list_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    user: CurrentUser = Depends(get_current_user),
):
    """List all products, optionally filtered by category or search term.
    Each product is enriched with aggregated stock from inventory."""
    sb = get_supabase_client()

    query = sb.table("products").select("*")
    if category:
        query = query.eq("category", category)

    result = query.execute()
    products = result.data or []

    if search:
        s = search.lower()
        products = [
            p for p in products
            if s in p["name"].lower()
            or s in p["brand"].lower()
            or s in p["hul_article_code"].lower()
        ]

    # Enrich with aggregated stock
    inv_result = sb.table("inventory").select("product_code, quantity").execute()
    stock_map: dict[str, int] = {}
    for row in (inv_result.data or []):
        code = row["product_code"]
        stock_map[code] = stock_map.get(code, 0) + row["quantity"]

    for p in products:
        qty = stock_map.get(p["hul_article_code"], 0)
        p["stock_quantity"] = qty
        p["in_stock"] = qty > 0

    return products


@router.get("/{code}")
async def get_product(code: str, user: CurrentUser = Depends(get_current_user)):
    """Get a single product by HUL article code."""
    sb = get_supabase_client()

    product = sb.table("products").select("*").eq("hul_article_code", code).maybe_single().execute()
    if not product.data:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Product not found")

    # Aggregate stock
    inv = sb.table("inventory").select("quantity").eq("product_code", code).execute()
    total_stock = sum(row["quantity"] for row in (inv.data or []))
    product.data["stock_quantity"] = total_stock
    product.data["in_stock"] = total_stock > 0

    return product.data
