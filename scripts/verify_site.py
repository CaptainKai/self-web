"""
Automated verification script for self-website integrity and structure.
Windows GBK terminal safe.
"""
import os
import sys

# Ensure UTF-8 output on Windows terminal
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

REQUIRED_FILES = [
    "index.html",
    "develop_diary/development_log.md",
    "css/style.css",
    "css/print.css",
    "js/data.js",
    "js/i18n.js",
    "js/theme.js",
    "js/projects-modal.js",
    "js/main.js",
    "README.md"
]

def verify():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    print(f"[CHECK] Verifying self-website project at: {root_dir}")
    
    missing_files = []
    for rel_path in REQUIRED_FILES:
        full_path = os.path.join(root_dir, rel_path.replace("/", os.sep))
        if not os.path.exists(full_path):
            missing_files.append(rel_path)
        else:
            size = os.path.getsize(full_path)
            print(f"  [OK] Found: {rel_path:<35} ({size} bytes)")
            
    if missing_files:
        print(f"\n[FAIL] Missing {len(missing_files)} required file(s):")
        for f in missing_files:
            print(f"  [MISSING] {f}")
        return False
    else:
        print("\n[SUCCESS] All core files are present and verified!")
        return True

if __name__ == "__main__":
    success = verify()
    sys.exit(0 if success else 1)

