"""
Deterministic rule evaluation engine (UI-aligned).
"""

import yaml
from pathlib import Path
from app.core.logging import get_logger

logger = get_logger(__name__)

RULE_FILE = Path(__file__).parent / "scheme_rules.yaml"


def load_rules():
    try:
        with open(RULE_FILE, "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    except Exception as e:
        logger.error(f"Failed to load rules: {e}")
        return {"schemes": []}


def safe_int(value, default=0):
    try:
        if isinstance(value, str):
            value = value.replace(",", "").strip().lower()

            if "lakh" in value:
                return int(float(value.replace("lakh", "").strip()) * 100000)

            return int(value)

        return int(value)

    except:
        return default


def evaluate_rules(user_data: dict):
    """
    Returns UI-ready scheme objects.
    """

    logger.info("Evaluating rules...")

    rules = load_rules()
    results = []

    user_income = safe_int(user_data.get("income", 0))
    user_category = str(user_data.get("category", "")).lower()
    user_occupation = str(user_data.get("occupation", "")).lower()

    for scheme in rules.get("schemes", []):
        try:
            match_score = 0
            reasoning = []

            # Income check
            if "max_income" in scheme:
                if user_income <= scheme["max_income"]:
                    match_score += 1
                    reasoning.append("Income below threshold")

            # Category check
            if "eligible_categories" in scheme:
                if user_category in [c.lower() for c in scheme["eligible_categories"]]:
                    match_score += 1
                    reasoning.append("Matches eligible category")

            # Occupation check
            if "occupation" in scheme:
                if user_occupation == scheme["occupation"].lower():
                    match_score += 1
                    reasoning.append("Matches occupation requirement")

            # Determine status
            if match_score >= 2:
                status = "eligible"
            elif match_score == 1:
                status = "possible"
            else:
                status = "not_eligible"

            results.append({
                "name": scheme.get("name"),
                "ministry": scheme.get("ministry", "Government of India"),
                "status": status,
                "benefits": scheme.get("benefits", ""),
                "reasoning": reasoning if reasoning else ["Does not meet eligibility criteria"],
                "sources": [
                    {
                        "title": f"{scheme.get('name')} Official Guidelines",
                        "type": "guideline",
                        "url": "#"
                    }
                ]
            })

        except Exception as e:
            logger.warning(f"Error evaluating scheme {scheme.get('name')}: {e}")

    return results