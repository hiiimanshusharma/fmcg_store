from pydantic import BaseModel
from typing import Optional
from datetime import date


class InventoryItem(BaseModel):
    id: str
    product_code: str
    batch_number: str
    expiry_date: Optional[date] = None
    quantity: int
    warehouse_location: str = "Main Warehouse"


class InventoryUpdate(BaseModel):
    quantity: int
