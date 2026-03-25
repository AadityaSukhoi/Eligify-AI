"""
Google OAuth verification.
"""

from google.oauth2 import id_token
from google.auth.transport import requests
import os

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


def verify_google_token(token: str):
    """
    Verifies Google ID token and returns user info.
    """

    idinfo = id_token.verify_oauth2_token(
        token,
        requests.Request(),
        GOOGLE_CLIENT_ID
    )

    return {
        "email": idinfo["email"],
        "google_id": idinfo["sub"]
    }