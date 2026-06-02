from pydantic import BaseModel
from typing import Optional


class Retailer(BaseModel):
    id: str
    email: str
    role: str = "client"
    store_name: Optional[str] = None
    owner_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    credit_limit: float = 0
    outstanding: float = 0
    status: str = "PENDING_APPROVAL"


class RetailerUpdate(BaseModel):
    status: Optional[str] = None
    credit_limit: Optional[float] = None
    store_name: Optional[str] = None
    phone: Optional[str] = None
