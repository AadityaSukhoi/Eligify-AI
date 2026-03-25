import logging
import os

LOG_FILE = "logs/app.log"
os.makedirs("logs", exist_ok=True)


def setup_logger():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    # Clear old handlers
    if logger.hasHandlers():
        logger.handlers.clear()

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )

    console = logging.StreamHandler()
    console.setFormatter(formatter)

    file_handler = logging.FileHandler(LOG_FILE)
    file_handler.setFormatter(formatter)

    logger.addHandler(console)
    logger.addHandler(file_handler)


def get_logger(name: str):
    return logging.getLogger(name)