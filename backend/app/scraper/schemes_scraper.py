from urllib.parse import quote
from app.scraper.playwright_scraper import scrape_multiple_pages

STATES = [
    "Delhi", "Uttar Pradesh", "Maharashtra", "Karnataka",
    "Tamil Nadu", "Rajasthan", "Bihar", "West Bengal",
    "Madhya Pradesh", "Gujarat", "Punjab", "Haryana",
    "Odisha", "Assam", "Kerala", "Telangana",
    "Andhra Pradesh", "Chhattisgarh", "Jharkhand",
    "Uttarakhand", "Himachal Pradesh", "Goa",
    "Jammu and Kashmir", "Ladakh", "Chandigarh",
    "Puducherry", "Andaman and Nicobar Islands",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep"
]


def scrape_myscheme_states():
    base_url = "https://www.myscheme.gov.in/search/state/"

    urls = [
        base_url + quote(state)
        for state in STATES
    ]

    raw_results = scrape_multiple_pages(urls)

    # attach state back and flatten the list
    final_data = []
    for state, state_schemes in zip(STATES, raw_results):
        for item in state_schemes:
            item["state"] = state
            final_data.append(item)

    return final_data