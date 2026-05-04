"""
Vector retrieval from Qdrant.
"""

from app.rag.qdrant_client import search_vectors


def retrieve_context(query: str):
    """
    Retrieves relevant policy snippets.
    """
    results = search_vectors(query)
    return results