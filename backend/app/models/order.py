from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class OrderItemCreate(BaseModel):
    product_code: str
    quantity: int
    price_per_unit: float


class OrderItem(OrderItemCreate):
    id: str
    order_id: str


class OrderCreate(BaseModel):
    items: List[OrderItemCreate]


class Order(BaseModel):
    id: str
    retailer_id: str
    status: str
    total_value: float
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    items: List[OrderItem] = []


class OrderStatusUpdate(BaseModel):
    status: str
