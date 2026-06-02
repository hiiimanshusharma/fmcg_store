from pydantic import BaseModel
from typing import Optional


class Product(BaseModel):
    hul_article_code: str
    name: str
    brand: str
    category: str
    unit_size: str
    case_quantity: int
    mrp: float
    distributor_price: float
    image: str = "/brands/placeholder.png"


class ProductWithStock(Product):
    """Product enriched with aggregated stock info from inventory."""
    stock_quantity: int = 0
    in_stock: bool = True
