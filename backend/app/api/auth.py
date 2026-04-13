from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.db.postgres import get_db
from app.db.models import User
from app.auth.hashing import hash_password, verify_password
from app.auth.jwt import create_access_token
from app.auth.deps import get_current_user
from app.core.logging import get_logger

logger = get_logger(__name__)

router = APIRouter()


# -------- Schemas -------- #

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# -------- Register -------- #

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == data.email).first()

    if existing:
        logger.warning(f"Duplicate registration attempt: {data.email}")
        raise HTTPException(400, "User already exists")

    user = User(
        email=data.email,
        hashed_password=hash_password(data.password)
    )

    db.add(user)
    db.commit()

    logger.info(f"User registered: {data.email}")

    return {"message": "User registered successfully"}


# -------- Login -------- #

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        logger.warning(f"Login failed (user not found): {data.email}")
        raise HTTPException(404, "User not found")

    if not verify_password(data.password, user.hashed_password):
        logger.warning(f"Invalid password attempt: {data.email}")
        raise HTTPException(401, "Invalid credentials")

    token = create_access_token({"sub": user.email})

    logger.info(f"Login success: {data.email}")

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# -------- Protected -------- #

@router.get("/me")
def me(user: User = Depends(get_current_user)):

    logger.info(f"User accessed profile: {user.email}")

    return {
        "email": user.email,
        "role": user.role
    }