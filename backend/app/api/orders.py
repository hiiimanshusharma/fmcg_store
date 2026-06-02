from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from app.auth import get_current_user, require_admin, CurrentUser
from app.supabase_client import get_supabase_client
from app.models.order import OrderCreate, OrderStatusUpdate

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.get("")
async def list_orders(
    limit: Optional[int] = Query(None),
    user: CurrentUser = Depends(get_current_user),
):
    """List orders. Admins see all, clients see only their own."""
    sb = get_supabase_client()

    query = sb.table("orders").select("*, order_items(*, products(name, brand))")

    if not user.is_admin:
        query = query.eq("retailer_id", user.id)

    query = query.order("created_at", desc=True)

    if limit:
        query = query.limit(limit)

    result = query.execute()
    return result.data or []


@router.post("")
async def create_order(
    payload: OrderCreate,
    user: CurrentUser = Depends(get_current_user),
):
    """Create a new order (any authenticated user)."""
    sb = get_supabase_client()

    if not payload.items:
        raise HTTPException(status_code=400, detail="Order must have at least one item")

    total_value = sum(item.price_per_unit * item.quantity for item in payload.items)

    # Create order
    order_result = sb.table("orders").insert({
        "retailer_id": user.id,
        "status": "PENDING",
        "total_value": total_value,
    }).execute()

    if not order_result.data:
        raise HTTPException(status_code=500, detail="Failed to create order")

    order = order_result.data[0]
    order_id = order["id"]

    # Create order items
    items_data = [
        {
            "order_id": order_id,
            "product_code": item.product_code,
            "quantity": item.quantity,
            "price_per_unit": item.price_per_unit,
        }
        for item in payload.items
    ]

    sb.table("order_items").insert(items_data).execute()

    # Return the full order with items
    full_order = sb.table("orders").select(
        "*, order_items(*, products(name, brand))"
    ).eq("id", order_id).single().execute()

    return full_order.data


@router.patch("/{order_id}")
async def update_order_status(
    order_id: str,
    payload: OrderStatusUpdate,
    user: CurrentUser = Depends(require_admin),
):
    """Update order status (admin only)."""
    sb = get_supabase_client()

    valid_statuses = ["PENDING", "CONFIRMED", "PROCESSING", "OUT_FOR_DELIVERY", "DELIVERED"]
    if payload.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")

    result = sb.table("orders").update({
        "status": payload.status,
    }).eq("id", order_id).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Order not found")

    return result.data[0]
