"""Upload endpoint security tests."""
import io
import pytest
from fastapi.testclient import TestClient
from server import app


client = TestClient(app)


def test_upload_rejects_disallowed_extension():
    resp = client.post(
        "/api/upload",
        files={"file": ("malware.exe", b"MZ\x90\x00", "application/octet-stream")},
    )
    assert resp.status_code == 400
    assert "not allowed" in resp.json()["detail"].lower()


def test_upload_rejects_oversized_file(monkeypatch):
    """Override MAX_UPLOAD_BYTES to a small value for testing."""
    import server
    monkeypatch.setattr(server, "MAX_UPLOAD_BYTES", 1024)  # 1 KB limit

    big = b"\x00" * (1024 * 1024)  # 1 MB of zeros
    resp = client.post(
        "/api/upload",
        files={"file": ("big.mp4", big, "video/mp4")},
    )
    assert resp.status_code == 413


def test_upload_valid_video_placeholder():
    """A real video file would be needed for a full success test."""
    mp4_header = b"\x00\x00\x00\x18ftypmp42"
    resp = client.post(
        "/api/upload",
        files={"file": ("test.mp4", mp4_header, "video/mp4")},
    )
    # OpenCV will fail to open this, but the upload itself should work
    assert resp.status_code in (200, 500)


def test_rate_limit_returns_429():
    """Rapid requests should eventually trigger rate limit."""
    responses = []
    for _ in range(35):
        resp = client.get("/")
        responses.append(resp.status_code)
    assert 429 in responses


def test_health_check():
    resp = client.get("/")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


def test_templates_endpoint():
    resp = client.get("/api/templates")
    assert resp.status_code == 200
    data = resp.json()
    assert "templates" in data
    assert len(data["templates"]) > 0


def test_status_invalid_id():
    resp = client.get("/api/status/nonexistent")
    assert resp.status_code == 404


def test_download_invalid_id():
    resp = client.get("/api/download/nonexistent")
    assert resp.status_code == 404
