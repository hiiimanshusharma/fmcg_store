from fastapi import APIRouter, Depends, HTTPException
from app.auth import require_admin, CurrentUser
from app.supabase_client import get_supabase_client
from app.models.inventory import InventoryUpdate

router = APIRouter(prefix="/api/inventory", tags=["inventory"])


@router.get("")
async def list_inventory(user: CurrentUser = Depends(require_admin)):
    """List all inventory records with product info (admin only)."""
    sb = get_supabase_client()

    result = sb.table("inventory").select(
        "*, products(name, brand, category, unit_size, case_quantity, mrp, image)"
    ).execute()

    return result.data or []


@router.patch("/{inventory_id}")
async def update_inventory(
    inventory_id: str,
    payload: InventoryUpdate,
    user: CurrentUser = Depends(require_admin),
):
    """Update stock quantity for an inventory record (admin only)."""
    sb = get_supabase_client()

    result = sb.table("inventory").update({
        "quantity": payload.quantity,
    }).eq("id", inventory_id).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Inventory record not found")

    return result.data[0]
