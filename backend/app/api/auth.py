from fastapi import APIRouter, Depends
from app.auth import get_current_user, CurrentUser

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.get("/me")
async def get_me(user: CurrentUser = Depends(get_current_user)):
    """Return the current user's profile."""
    from app.supabase_client import get_supabase_client

    sb = get_supabase_client()
    profile = sb.table("profiles").select("*").eq("id", user.id).maybe_single().execute()

    return {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "profile": profile.data,
    }
