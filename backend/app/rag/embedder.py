"""
Embedding utility for converting text → vector.
"""

from sentence_transformers import SentenceTransformer
from app.core.logging import get_logger

logger = get_logger(__name__)

# Load model once (IMPORTANT)
try:
    model = SentenceTransformer("all-MiniLM-L6-v2")
    logger.info("Embedding model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load embedding model: {e}")
    model = None


def embed_text(text: str):
    """
    Convert text into vector embedding.

    Args:
        text (str): Input text

    Returns:
        list: Vector embedding
    """
    try:
        if model is None:
            raise ValueError("Embedding model not loaded")

        embedding = model.encode(text)

        return embedding.tolist()

    except Exception as e:
        logger.error(f"Embedding failed: {e}")

        # fallback (VERY IMPORTANT)
        return [0.0] * 384  # MiniLM dimension