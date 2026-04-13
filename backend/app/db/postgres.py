from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
from app.core.logging import get_logger

load_dotenv()

logger = get_logger(__name__)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set.")


def _mask_db_url(url: str) -> str:
    try:
        prefix, rest = url.split("://")
        user_pass, host = rest.split("@")
        user = user_pass.split(":")[0]
        return f"{prefix}://{user}:****@{host}"
    except Exception:
        return "Invalid DB URL"


engine = create_engine(DATABASE_URL, echo=False)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def init_db():
    logger.info(f"Database connected: {_mask_db_url(DATABASE_URL)}")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()