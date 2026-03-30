name: CI — Eligify Backend

on:
  push:
    branches: [main, backend]
    paths:
      - "backend/**"
  pull_request:
    branches: [main]
    paths:
      - "backend/**"

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: backend

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Run CI script
        env:
          PYTHONPATH: "."
          DATABASE_URL: "sqlite:///./test.db"
          JWT_SECRET: "ci-test-secret"
          GOOGLE_CLIENT_ID: "test-client-id"
        run: ./backend/scripts/run_tests.sh