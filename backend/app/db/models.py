"""
Database models.
"""

from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.db.postgres import Base


class User(Base):
    """
    User table.
    """

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String(255), unique=True, index=True, nullable=False)

    hashed_password = Column(String(255), nullable=False)

    role = Column(String(50), default="user")

    google_id = Column(String(255), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<User(email={self.email}, role={self.role})>"