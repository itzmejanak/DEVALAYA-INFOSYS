import os
import shutil
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import time

def copy_file_fast(src_file, dst_file):
    """Fast file copy with directory creation"""
    try:
        # Create parent directory if it doesn't exist
        dst_file.parent.mkdir(parents=True, exist_ok=True)
        
        # Use shutil.copy2 for fast copying with metadata
        shutil.copy2(src_file, dst_file)
        return True, src_file, dst_file, src_file.stat().st_size
    except Exception as e:
        return False, src_file, dst_file, str(e)

def collect_files_fast(base_path, items_to_copy):
    """Collect all files to copy in parallel"""
    all_files = []
    
    def scan_item(item):
        item_path = Path(base_path) / item
        files = []
        
        if item_path.is_dir():
            # Use rglob for faster recursive scanning
            for file_path in item_path.rglob('*'):
                if file_path.is_file():
                    try:
                        # Calculate relative path for destination
                        rel_path = file_path.relative_to(base_path)
                        files.append((file_path, rel_path, file_path.stat().st_size))
                    except (OSError, ValueError):
                        continue
        elif item_path.is_file():
            try:
                rel_path = item_path.relative_to(base_path)
                files.append((item_path, rel_path, item_path.stat().st_size))
            except (OSError, ValueError):
                pass
        
        return files
    
    # Scan items in parallel
    with ThreadPoolExecutor(max_workers=min(len(items_to_copy), 4)) as executor:
        futures = {executor.submit(scan_item, item): item for item in items_to_copy}
        
        for future in as_completed(futures):
            item = futures[future]
            try:
                files = future.result()
                all_files.extend(files)
                print(f"📂 Scanned {item}: {len(files)} files")
            except Exception as e:
                print(f"❌ Error scanning {item}: {e}")
    
    return all_files

def copy_files_parallel(src_base, dst_base, all_files, max_workers=8):
    """Copy files in parallel for maximum speed"""
    
    # Convert to Path objects
    src_base = Path(src_base)
    dst_base = Path(dst_base)
    
    # Prepare copy tasks
    copy_tasks = []
    for src_file, rel_path, size in all_files:
        dst_file = dst_base / rel_path
        copy_tasks.append((src_file, dst_file, size))
    
    # Sort by size (larger files first for better load balancing)
    copy_tasks.sort(key=lambda x: x[2], reverse=True)
    
    print(f"📋 Copying {len(copy_tasks)} files...")
    
    # Track progress
    completed = 0
    total_size = sum(size for _, _, size in copy_tasks)
    copied_size = 0
    
    # Copy files in parallel
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Submit all copy tasks
        futures = {executor.submit(copy_file_fast, src, dst): (src, dst, size) 
                  for src, dst, size in copy_tasks}
        
        # Process completed tasks
        for future in as_completed(futures):
            src, dst, size = futures[future]
            try:
                success, src_file, dst_file, result = future.result()
                completed += 1
                
                if success:
                    copied_size += size
                    if completed % 100 == 0 or completed == len(copy_tasks):
                        progress = (completed / len(copy_tasks)) * 100
                        size_mb = copied_size / (1024 * 1024)
                        print(f"✅ Progress: {completed}/{len(copy_tasks)} ({progress:.1f}%) - {size_mb:.1f}MB copied")
                else:
                    print(f"❌ Failed to copy {src_file}: {result}")
                    
            except Exception as e:
                print(f"❌ Error copying {src}: {e}")
                completed += 1

def main():
    start_time = time.time()
    
    # Get paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    infosys_dir = os.path.dirname(current_dir)
    
    # Output directory
    output_dir = r'C:\Users\revDev\Desktop\Daily\Devalaya\Production'
    
    # Items to copy
    items_to_copy = ['.next', 'public', 'server.js', 'package.json', 'node_modules']
    
    print(f"🚀 ULTRA-FAST FILE COPY")
    print(f"Source: {infosys_dir}")
    print(f"Destination: {output_dir}")
    print("-" * 50)
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Quick validation
    base_path = Path(infosys_dir)
    existing_items = []
    
    for item in items_to_copy:
        item_path = base_path / item
        if item_path.exists():
            existing_items.append(item)
        else:
            print(f"❌ Missing: {item}")
            sys.exit(1)
    
    print(f"✅ All {len(existing_items)} items found")
    
    # Clear destination directory if it exists
    if os.path.exists(output_dir):
        print("🗑️ Clearing destination directory...")
        for item in os.listdir(output_dir):
            item_path = os.path.join(output_dir, item)
            if os.path.isdir(item_path):
                shutil.rmtree(item_path)
            else:
                os.remove(item_path)
    
    # Collect all files first (parallel scanning)
    print("🔍 Scanning files...")
    scan_start = time.time()
    all_files = collect_files_fast(infosys_dir, existing_items)
    scan_time = time.time() - scan_start
    
    if not all_files:
        print("❌ No files found to copy")
        sys.exit(1)
    
    total_size = sum(size for _, _, size in all_files)
    total_size_mb = total_size / (1024 * 1024)
    
    print(f"📊 Found {len(all_files)} files ({total_size_mb:.2f} MB) in {scan_time:.2f}s")
    
    # Calculate optimal thread count
    max_workers = min(16, max(4, len(all_files) // 100))
    
    try:
        # Copy files with parallel processing
        copy_start = time.time()
        copy_files_parallel(infosys_dir, output_dir, all_files, max_workers)
        copy_time = time.time() - copy_start
        
        total_time = time.time() - start_time
        
        print("-" * 50)
        print(f"🎉 SUCCESS!")
        print(f"📁 Files copied to: {output_dir}")
        print(f"📏 Total size: {total_size_mb:.2f} MB")
        print(f"⏱️ Total time: {total_time:.2f}s")
        print(f"🔥 Speed: {total_size_mb/total_time:.2f} MB/s")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()