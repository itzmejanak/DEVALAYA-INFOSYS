import os
import shutil
from zipfile import ZipFile

# Paths
project_root = os.path.dirname(os.path.abspath(__file__))
output_dir = r'C:\Users\janak\Desktop\Devalaya\Production'
output_zip_path = os.path.join(output_dir, 'devalaya.zip')

# Files and folders to include in the zip
items_to_zip = ['.next', 'public', 'server.js', 'package.json', 'node_modules']

# Delete old zip if exists
if os.path.exists(output_zip_path):
    print(f"Deleting old zip at {output_zip_path}")
    os.remove(output_zip_path)

# Create the zip file
with ZipFile(output_zip_path, 'w') as zipf:
    for item in items_to_zip:
        item_path = os.path.join(project_root, item)
        if os.path.exists(item_path):
            if os.path.isdir(item_path):
                for foldername, subfolders, filenames in os.walk(item_path):
                    for filename in filenames:
                        file_path = os.path.join(foldername, filename)
                        arcname = os.path.relpath(file_path, project_root)
                        zipf.write(file_path, arcname)
            else:
                arcname = os.path.relpath(item_path, project_root)
                zipf.write(item_path, arcname)
        else:
            print(f"Warning: {item} not found, skipping...")

print(f"\n✅ Zip created at: {output_zip_path}")
