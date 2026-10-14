import json
import logging
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE_DIR = Path(__file__).resolve().parent / "templates"
log = logging.getLogger("capify")


def list_templates() -> list[str]:
    return sorted(p.stem for p in TEMPLATE_DIR.glob("*.json"))


def get_template(name: str) -> dict:
    p = TEMPLATE_DIR / f"{name}.json"
    if not p.exists():
        available = list_templates()
        fallback = "creator_yellow" if "creator_yellow" in available else (available[0] if available else None)
        log.warning("Template '%s' not found. Falling back to '%s'", name, fallback)
        if fallback:
            p = TEMPLATE_DIR / f"{fallback}.json"
        else:
            raise ValueError(f"No template found. Available: {', '.join(available)}")
    return json.loads(p.read_text())
