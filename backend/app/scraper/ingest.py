from app.scraper.schemes_scraper import scrape_myscheme_states
from app.rag.embedder import embed_text
from app.rag.qdrant_client import client, init_collection, COLLECTION_NAME
from qdrant_client.models import PointStruct
import uuid


def chunk_text(text, size=300, overlap=50):
    words = text.split()
    chunks = []

    for i in range(0, len(words), size - overlap):
        chunk = " ".join(words[i:i + size])

        if len(chunk) > 50:
            chunks.append(chunk)

    return chunks


def run_ingestion():
    init_collection()   # 🔥 THIS WAS MISSING

    data = scrape_myscheme_states()

    points = []

    for item in data:
        chunks = chunk_text(item["text"])

        for chunk in chunks:
            vector = embed_text(chunk)

            points.append(
                PointStruct(
                    id=str(uuid.uuid4()),
                    vector=vector,
                    payload={
                        "text": chunk,
                        "state": item["state"],
                        "source": item["source"]
                    }
                )
            )

    client.upsert(
        collection_name=COLLECTION_NAME,  # 🔥 FIXED
        points=points
    )

    return {
        "status": "done",
        "points": len(points),
        "states_scraped": len(data)
    }