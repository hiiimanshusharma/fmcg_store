from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.api.auth import router as auth_router
from app.api.products import router as products_router
from app.api.inventory import router as inventory_router
from app.api.retailers import router as retailers_router
from app.api.orders import router as orders_router
from app.api.dashboard import router as dashboard_router

settings = get_settings()

app = FastAPI(
    title="KB Brothers FMCG API",
    description="Distribution management API for Hindustan Unilever products",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        settings.frontend_url,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(auth_router)
app.include_router(products_router)
app.include_router(inventory_router)
app.include_router(retailers_router)
app.include_router(orders_router)
app.include_router(dashboard_router)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "kb-brothers-api"}
