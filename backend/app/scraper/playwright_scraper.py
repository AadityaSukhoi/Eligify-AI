"""
Optimized Playwright scraper (reuses browser for all states)
"""

from playwright.sync_api import sync_playwright
from app.scraper.cleaner import clean_text
from app.core.logging import get_logger

logger = get_logger(__name__)


def scrape_multiple_pages(urls: list[str]) -> list[list[dict]]:
    """
    Scrape multiple pages efficiently using one browser instance.
    Returns a list of lists containing extracted schemes for each URL.
    """

    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Using a realistic viewport and user agent to avoid simple blocks
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        # Prevent some basic bot detection
        context.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            })
        """)

        page = context.new_page()

        for url in urls:
            state_results = []
            try:
                logger.info(f"Scraping: {url}")

                page.goto(url, timeout=60000)

                # 1. Wait for meaningful content to load or error to appear
                # The site typically shows "We found X schemes based on your preferences"
                try:
                    page.wait_for_selector("text=/schemes based on your preferences/i", timeout=15000)
                except Exception:
                    # Fallback checks if the success text didn't load
                    if page.get_by_text("Something went wrong").is_visible():
                        logger.warning(f"Site error page detected: {url}")
                        results.append(state_results)
                        continue
                    if page.get_by_text("We found 0 schemes").is_visible():
                        logger.warning(f"No schemes found for this state: {url}")
                        results.append(state_results)
                        continue
                    
                    logger.warning(f"Timeout waiting for content: {url}")
                    results.append(state_results)
                    continue

                # 2. Extract cards across multiple pages (limit to 5 pages max per state for efficiency)
                current_page = 1
                max_pages = 5
                
                while current_page <= max_pages:
                    # Wait a bit for the cards to stabilize
                    page.wait_for_timeout(2000)
                    
                    cards = page.locator("div.group").all()
                    logger.info(f"Found {len(cards)} scheme cards on {url} (Page {current_page})")

                    for card in cards:
                        try:
                            # Find link to get the exact scheme URL
                            title_el = card.locator("a[href^='/schemes/']").first
                            if not title_el.is_visible():
                                continue
                                
                            href = title_el.get_attribute("href")
                            scheme_url = f"https://www.myscheme.gov.in{href}" if href else url

                            # Extract text from the whole card to capture title, tags, and description
                            card_text = card.inner_text()
                            cleaned_text = clean_text(card_text)

                            if len(cleaned_text) < 20:
                                continue

                            state_results.append({
                                "text": cleaned_text,
                                "source": scheme_url
                            })
                        except Exception as e:
                            logger.error(f"Error parsing a card on page {current_page}: {e}")
                            continue
                            
                    # Try to go to the next page
                    next_page = current_page + 1
                    # Looking for an <li> that exactly matches the next page number
                    next_li = page.locator("ul li").filter(has_text=f"{next_page}").first
                    
                    # Ensure the text is exactly the next page number (to avoid matching '12' when looking for '2')
                    try:
                        if next_li.is_visible() and next_li.inner_text().strip() == str(next_page):
                            next_li.click()
                            current_page += 1
                        else:
                            break
                    except Exception:
                        # No more pages or element not interactable
                        break

            except Exception as e:
                logger.error(f"Error scraping {url}: {e}")
            
            results.append(state_results)

        browser.close()

    return results