"""
Password hashing utilities with bcrypt limit fix.
"""

from passlib.context import CryptContext
import hashlib

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def _preprocess(password: str) -> str:
    """
    Ensure password is safe for bcrypt (<=72 bytes)
    """
    if len(password.encode("utf-8")) > 72:
        return hashlib.sha256(password.encode()).hexdigest()
    return password


def hash_password(password: str) -> str:
    password = _preprocess(password)
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    password = _preprocess(password)
    return pwd_context.verify(password, hashed)