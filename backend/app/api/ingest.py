from fastapi import APIRouter
from app.scraper.schemes_scraper import scrape_myscheme_states
from app.scraper.ingest import run_ingestion

router = APIRouter()


@router.get("/test-scrape")
def test_scrape():
    data = scrape_myscheme_states()

    return {
        "states_scraped": len(data),
        "sample": data[0] if data else "no data"
    }


@router.post("/run")
def ingest():
    return run_ingestion()