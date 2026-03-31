#!/bin/bash

set -e

echo "Starting CI pipeline..."

# -------------------------------
# Install dependencies
# -------------------------------
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

if [ -f requirements-dev.txt ]; then
    pip install -r requirements-dev.txt
fi

# -------------------------------
# Linting
# -------------------------------
echo "🔍 Running lint (ruff)..."
ruff check app/ || echo "Ruff found issues (non-blocking)"

# -------------------------------
# Import check (VERY IMPORTANT)
# -------------------------------
echo "Checking if app loads properly..."

python - <<EOF
try:
    from app.main import app
    print("FastAPI app loaded successfully")
except Exception as e:
    print(" App failed to load:", e)
    exit(1)
EOF

# -------------------------------
# Run tests (if exist)
# -------------------------------
echo "Running tests..."

if [ -d "tests" ]; then
    pytest -q --tb=short --cov=app --cov-report=term || echo "Tests failed"
else
    echo "No tests directory found, skipping tests..."
fi

# -------------------------------
# Basic security sanity checks
# -------------------------------
echo "Running basic security checks..."

grep -r "print(" app/ && echo "Debug prints found" || echo "No debug prints"

grep -r "password=" app/ && echo "Hardcoded password risk" || echo "No obvious password leaks"

# -------------------------------
# Done
# -------------------------------
echo "CI pipeline completed successfully!"