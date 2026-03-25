from app.core.logging import setup_logger
setup_logger()

from fastapi import FastAPI, Request
from app.api import health, chat, auth, ingest, stt
from app.db.postgres import Base, engine, init_db
from app.db import models
from app.core.logging import get_logger

logger = get_logger("request")

app = FastAPI(
    title="Eligify AI",
    version="1.0.0"
)

# Create tables
Base.metadata.create_all(bind=engine)


# REQUEST LOGGING FIRST
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"{request.method} {request.url}")

    response = await call_next(request)

    logger.info(f"Status: {response.status_code}")

    return response


# ERROR HANDLING
@app.middleware("http")
async def catch_errors(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        logger.error(f"Unhandled error: {str(e)}")
        raise


# Startup
@app.on_event("startup")
def startup_event():
    init_db()


# Routers
app.include_router(health.router, prefix="/health")
app.include_router(chat.router, prefix="/chat")
app.include_router(auth.router, prefix="/auth")
app.include_router(ingest.router, prefix="/ingest")
app.include_router(stt.router, prefix="/stt")


@app.get("/")
def root():
    return {"message": "Eligify AI Backend Running"}