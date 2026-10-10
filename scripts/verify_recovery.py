#!/usr/bin/env python3
"""Check preserved recovery bytes and portable HTML JavaScript syntax, read-only."""
from hashlib import sha256
from html.parser import HTMLParser
import json
from pathlib import Path
import shutil
import subprocess
import sys
from tempfile import TemporaryDirectory

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "docs/recovery/baseline-manifest.json"


class Scripts(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.entries = []
        self.active = None

    def handle_starttag(self, tag, attrs):
        if tag == "script":
            self.active = [dict(attrs), ""]

    def handle_data(self, data):
        if self.active is not None:
            self.active[1] += data

    def handle_endtag(self, tag):
        if tag == "script" and self.active is not None:
            self.entries.append(self.active)
            self.active = None


def main():
    errors = []
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    for entry in manifest["files"]:
        path = ROOT / entry["path"]
        if not path.is_file():
            errors.append(f"MISSING: {entry['path']}")
            continue
        data = path.read_bytes()
        if len(data) != entry["bytes"] or sha256(data).hexdigest() != entry["sha256"]:
            errors.append(f"CHANGED: {entry['path']}")

    preview = ROOT / "site/FORMA_OPUS_FULL_REVIEW.html"
    checked = 0
    if preview.is_file():
        parser = Scripts()
        parser.feed(preview.read_text(encoding="utf-8"))
        node = shutil.which("node")
        if not node:
            errors.append("Node.js is required for JavaScript syntax verification.")
        else:
            with TemporaryDirectory(prefix="forma-recovery-") as temp:
                for index, (attrs, body) in enumerate(parser.entries, start=1):
                    kind = attrs.get("type", "").strip().lower()
                    if kind not in ("", "module", "text/javascript", "application/javascript"):
                        continue
                    if "src" in attrs:
                        errors.append(f"Script {index}: external source cannot be verified offline.")
                        continue
                    suffix = ".mjs" if kind == "module" else ".js"
                    script = Path(temp) / f"script-{index}{suffix}"
                    script.write_text(body, encoding="utf-8")
                    result = subprocess.run([node, "--check", str(script)], capture_output=True, text=True)
                    checked += 1
                    if result.returncode:
                        errors.append(f"Script {index} syntax failed:\n{result.stderr}")
            if not checked:
                errors.append("No executable inline JavaScript was checked.")

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"PASS: {len(manifest['files'])} baseline files unchanged; {checked} inline script(s) passed Node syntax check.")
    print("Not a browser, visual, security, or Architecture v2 build validation.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
