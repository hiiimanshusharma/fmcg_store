from fastapi import APIRouter, Depends, HTTPException
from app.auth import require_admin, CurrentUser
from app.supabase_client import get_supabase_client
from app.models.retailer import RetailerUpdate

router = APIRouter(prefix="/api/retailers", tags=["retailers"])


@router.get("")
async def list_retailers(user: CurrentUser = Depends(require_admin)):
    """List all retailer profiles (admin only)."""
    sb = get_supabase_client()

    result = sb.table("profiles").select("*").eq("role", "client").order("created_at", desc=True).execute()
    return result.data or []


@router.patch("/{retailer_id}")
async def update_retailer(
    retailer_id: str,
    payload: RetailerUpdate,
    user: CurrentUser = Depends(require_admin),
):
    """Update a retailer's status, credit limit, etc. (admin only)."""
    sb = get_supabase_client()

    update_data = payload.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = sb.table("profiles").update(update_data).eq("id", retailer_id).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Retailer not found")

    return result.data[0]
