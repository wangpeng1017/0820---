
import os
import shutil
import glob
import re

SOURCE_DIR = r"C:\Users\peng.n.wang\.gemini\antigravity\brain\37fda389-1f51-4014-952a-1e40730be793"
DEST_DIR = r"e:\trae\0820焦甜香\docs\assets"

if not os.path.exists(DEST_DIR):
    os.makedirs(DEST_DIR)

print(f"Scanning {SOURCE_DIR}...")
files = glob.glob(os.path.join(SOURCE_DIR, "*_png_*.png"))

print(f"Found {len(files)} files.")

for file_path in files:
    filename = os.path.basename(file_path)
    # Expected format: name_png_timestamp.png
    # We want to remove _png_timestamp
    # Regex: (.*)_png_\d+\.png
    match = re.match(r"(.*)_png_\d+\.png", filename)
    if match:
        new_name = match.group(1) + ".png"
        dest_path = os.path.join(DEST_DIR, new_name)
        print(f"Copying {filename} -> {new_name}")
        shutil.copy2(file_path, dest_path)
    else:
        print(f"Skipping {filename} (no match)")

print("Done.")
