"""
Qdrant client for vector search operations + ingestion support
"""

from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

# 🔥 SINGLE SOURCE OF TRUTH
COLLECTION_NAME = "schemes"

# Initialize client
client = QdrantClient(host="localhost", port=6333)


def init_collection():
    """
    Create collection if it does not exist
    """

    collections = client.get_collections().collections

    if not any(c.name == COLLECTION_NAME for c in collections):
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=384,  
                distance=Distance.COSINE
            )
        )


def search_vectors(query_vector: list, top_k: int = 5):
    """
    Search Qdrant for similar vectors
    """

    results = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=top_k
    )

    return [hit.payload for hit in results]