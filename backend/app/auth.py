from fastapi import Depends, HTTPException, Header
from typing import Optional
import httpx
from app.config import get_settings
from app.supabase_client import get_supabase_client


class CurrentUser:
    """Represents the authenticated user extracted from a Supabase JWT."""

    def __init__(self, id: str, email: str, role: str):
        self.id = id
        self.email = email
        self.role = role

    @property
    def is_admin(self) -> bool:
        return self.role == "admin"


async def get_current_user(authorization: Optional[str] = Header(None)) -> CurrentUser:
    """FastAPI dependency: verify Supabase JWT and return the current user."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")

    token = authorization.split(" ", 1)[1]
    settings = get_settings()

    # Verify the token with Supabase Auth API
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{settings.supabase_url}/auth/v1/user",
            headers={
                "Authorization": f"Bearer {token}",
                "apikey": settings.supabase_anon_key,
            },
        )

    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_data = resp.json()
    user_id = user_data.get("id")
    user_email = user_data.get("email", "")

    # Fetch role from profiles table
    sb = get_supabase_client()
    profile_resp = sb.table("profiles").select("role").eq("id", user_id).maybe_single().execute()

    role = "client"
    if profile_resp.data:
        role = profile_resp.data.get("role", "client")

    return CurrentUser(id=user_id, email=user_email, role=role)


async def require_admin(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    """FastAPI dependency: require admin role."""
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user
