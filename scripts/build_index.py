#!/usr/bin/env python3
import json, os, re, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FOLDERS = ["blog", "projects"]

FM_BLOCK = re.compile(r"^---\n([\s\S]*?)\n---\n", re.M)
KV_LINE  = re.compile(r"^(\w+):\s*(.*)$")

def parse_front_matter(text: str) -> dict:
    m = FM_BLOCK.match(text)
    if not m:
        return {}
    data = {}
    for line in m.group(1).splitlines():
        kvm = KV_LINE.match(line.strip())
        if not kvm:
            continue
        k, v = kvm.group(1).lower(), kvm.group(2).strip()
        data[k] = v
    # naive tags: [a, b, c]
    if "tags" in data and data["tags"].startswith("[") and data["tags"].endswith("]"):
        inside = data["tags"][1:-1].strip()
        if inside:
            data["tags"] = [t.strip().strip(",") for t in inside.split() if t.strip(",")]
        else:
            data["tags"] = []
    return data

def file_meta(p: Path) -> dict:
    meta = {"slug": p.stem, "href": p.name}
    text = p.read_text(encoding="utf-8", errors="ignore")

    fm = parse_front_matter(text)
    for key in ("title", "summary"):
        if fm.get(key):
            meta[key] = fm[key]

    # date from front matter, else YYYY-MM-DD-... filename prefix, else None
    date = fm.get("date")
    if not date:
        try:
            date_candidate = p.name[:10]
            datetime.date.fromisoformat(date_candidate)
            date = date_candidate
        except Exception:
            date = None
    if date:
        meta["date"] = date

    if isinstance(fm.get("tags"), list):
        meta["tags"] = fm["tags"]

    return meta

def build_for(folder: str) -> int:
    base = ROOT / folder
    if not base.exists():
        return 0
    entries = []
    for ext in ("*.md", "*.html"):
        for f in sorted(base.glob(ext)):
            if f.name == "index.html":  # ignore folder index pages
                continue
            entries.append(file_meta(f))
    (base / "index.json").write_text(
        json.dumps(entries, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8"
    )
    return len(entries)

def main():
    total = 0
    for folder in FOLDERS:
        total += build_for(folder)
    print(f"Indexed {total} items across {', '.join(FOLDERS)}")

if __name__ == "__main__":
    main()
