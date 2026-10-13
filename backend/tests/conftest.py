"""Shared test fixtures."""
import pytest
from fastapi.testclient import TestClient
from server import app, _rate_limit_store


@pytest.fixture(autouse=True)
def clear_rate_limit():
    """Reset rate limit store before each test."""
    _rate_limit_store.clear()
    yield
    _rate_limit_store.clear()


@pytest.fixture
def client():
    return TestClient(app)
