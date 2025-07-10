#!/usr/bin/env python3
"""
OctoSlots HIGH-RES Die-Cut Sticker Background Creator
Creates and caches realistic die-cut stickers with transparent centers and white edges
"""

import os
import requests
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw
import random
import math
import json
import hashlib

def download_all_octocats():
    """Download the complete collection of current Octodex images"""
    
    # Updated list with correct current filenames
    all_octocats = [
        "original.png", "codercat.jpg", "nyantocat.gif", "jetpacktocat.png",
        "spocktocat.png", "droidtocat.png", "stormtroopocat.png", "electrocat.png",
        "Robotocat.png", "defunktocat.png", "bear-cavalry.png", "ironcat.jpg",
        "hubot.jpg", "pythocat.png", "octobiwan.jpg", "class-act.png",
        "snowoctocat.png", "adventure-cat.png", "dojocat.jpg", "heisencat.png",
        "red-polo.png", "momtocat.png", "front-end-conftocat.png", "strongbadtocat.png",
        "doctocat-brown.jpg", "herme-t-crabb.png", "orderedlistocat.png", "thanktocat.png",
        "megacat.jpg", "linktocat.jpg", "plumber.jpg", "octotron.jpg",
        "baracktocat.jpg", "octocat-de-los-muertos.jpg", "grim-repo.jpg", "waldocat.png",
        "hipster-partycat.jpg", "riddlocat.png", "visionary.jpg", "oktobercat.png",
        "shoptocat.png", "octdrey-catburn.jpg", "spectrocat.png", "andycat.jpg",
        "notocat.jpg", "dodgetocat.jpg", "cloud.jpg", "scarletteocat.jpg",
        "poptocat.png", "jenktocat.jpg", "xtocat.jpg", "chellocat.jpg",
        "cherryontop-o-cat.png", "supportcat.png", "collabocats.jpg", "constructocat2.jpg",
        "total-eclipse-of-the-octocat.jpg", "pacman-ghosts.jpg", "okal-eltocat.jpg",
        "octoclark-kentocat.jpg", "agendacat.png", "inspectocat.jpg", "jean-luc-picat.jpg",
        "wilson.jpg", "swagtocat.png", "drunktocat.jpg", "monroe.jpg",
        "trekkie.png", "octonaut.jpg", "bouncercat.png", "founding-father.jpg",
        "drupalcat.jpg", "socialite.jpg", "setuptocat.jpg", "repo.png",
        "forktocat.jpg", "benevocats.png", "scottocat.jpg", "puppeteer.png",
        "twenty-percent-cooler-octocat.png", "megacat-2.png", "pusheencat.png",
        "deckfailcat.png", "murakamicat.png", "homercat.png", "minion.png",
        "octofez.png", "skitchtocat.png", "gangnamtocat.png", "droctocat.png",
        "spidertocat.png", "dodgetocat_v2.png", "motherhubbertocat.png", "goretocat.png",
        "Professortocat_v2.png", "kimonotocat.png", "Mardigrastocat.png", "poptocat_v2.png",
        "foundingfather_v2.png", "daftpunktocat-guy.gif", "daftpunktocat-thomas.gif",
        "femalecodertocat.png", "octoliberty.png", "dunetocat.png", "labtocat.png",
        "mummytocat.gif", "steroidtocat.png", "yaktocat.png", "maxtocat.gif",
        "grinchtocat.gif", "carlostocat.gif", "topguntocat.png", "saritocat.png",
        "luchadortocat.png", "saketocat.png", "mountietocat.png", "minertocat.png",
        "gobbleotron.gif", "gracehoppertocat.jpg", "privateinvestocat.jpg", "filmtocat.png",
        "welcometocat.png", "inflatocat.png", "bewitchedtocat.jpg", "skatetocat.png",
        "mcefeeline.jpg", "catstello.png", "bannekat.png", "dinotocat.png",
        "mona-lovelace.jpg", "saint_nictocat.jpg", "snowtocat_final.jpg", "justicetocat.jpg"
    ]
    
    os.makedirs("octocats", exist_ok=True)
    downloaded = []
    failed = []
    
    print(f"🐙 Downloading {len(all_octocats)} Octodex stickers...")
    
    for i, filename in enumerate(all_octocats):
        local_path = f"octocats/{filename}"
        
        # Skip if already downloaded
        if os.path.exists(local_path):
            downloaded.append(local_path)
            continue
            
        url = f"https://octodex.github.com/images/{filename}"
        
        try:
            response = requests.get(url, timeout=15)
            response.raise_for_status()
            
            with open(local_path, 'wb') as f:
                f.write(response.content)
            
            downloaded.append(local_path)
            if (i + 1) % 10 == 0:
                print(f"✓ Downloaded {i + 1}/{len(all_octocats)} stickers")
            
        except requests.exceptions.HTTPError as e:
            if "404" in str(e):
                failed.append(filename)
                print(f"⚠️ Skipping {filename} (not found)")
            else:
                print(f"✗ Failed to download {filename}: {e}")
            continue
        except Exception as e:
            print(f"✗ Failed to download {filename}: {e}")
            continue
    
    if failed:
        print(f"\n📋 Skipped {len(failed)} missing files")
    
    print(f"🎯 Ready with {len(downloaded)} stickers!")
    return downloaded

def create_die_cut_sticker(image_path, target_size, rotation=0):
    """Transform an image into a realistic die-cut sticker with transparent center and white edge"""
    
    try:
        # Load image at full resolution
        if image_path.lower().endswith('.gif'):
            img = Image.open(image_path).convert('RGBA')
        else:
            img = Image.open(image_path).convert('RGBA')
        
        # Use high-quality resampling and maintain aspect ratio
        img.thumbnail((target_size, target_size), Image.LANCZOS)
        
        # Create die-cut sticker with white border edge only
        border_width = max(4, target_size // 20)  # Proportional border
        
        # Create the sticker canvas (transparent)
        sticker_size = img.width + (border_width * 2)
        sticker = Image.new('RGBA', (sticker_size, sticker_size), (0, 0, 0, 0))
        
        # Create mask for the image shape
        mask = Image.new('L', (sticker_size, sticker_size), 0)
        mask_draw = ImageDraw.Draw(mask)
        
        # Draw rounded rectangle mask
        corner_radius = max(8, sticker_size // 10)
        mask_draw.rounded_rectangle(
            [0, 0, sticker_size-1, sticker_size-1],
            radius=corner_radius,
            fill=255
        )
        
        # Create white border (edge only)
        border_mask = mask.copy()
        
        # Create inner mask (smaller rounded rectangle for the transparent center)
        inner_mask = Image.new('L', (sticker_size, sticker_size), 0)
        inner_draw = ImageDraw.Draw(inner_mask)
        
        inner_draw.rounded_rectangle(
            [border_width, border_width, 
             sticker_size - border_width - 1, sticker_size - border_width - 1],
            radius=max(4, corner_radius - border_width//2),
            fill=255
        )
        
        # Create the white edge by subtracting inner from outer
        white_edge_mask = Image.new('L', (sticker_size, sticker_size), 0)
        for y in range(sticker_size):
            for x in range(sticker_size):
                outer_pixel = border_mask.getpixel((x, y))
                inner_pixel = inner_mask.getpixel((x, y))
                
                # White edge where there's outer but not inner
                if outer_pixel > 0 and inner_pixel == 0:
                    white_edge_mask.putpixel((x, y), 255)
        
        # Apply white edge with slight transparency
        white_edge = Image.new('RGBA', (sticker_size, sticker_size), (255, 255, 255, 200))
        sticker.paste(white_edge, (0, 0), white_edge_mask)
        
        # Paste the octodex image in the center
        paste_x = (sticker_size - img.width) // 2
        paste_y = (sticker_size - img.height) // 2
        
        # Mask the image to fit within the inner area
        if img.mode == 'RGBA':
            # Get the existing alpha channel
            img_alpha = img.split()[-1]
            
            # Create a mask that's slightly smaller than inner area
            content_mask = Image.new('L', img.size, 0)
            content_draw = ImageDraw.Draw(content_mask)
            
            padding = max(3, border_width // 2)
            content_draw.rounded_rectangle(
                [padding, padding, img.width - padding - 1, img.height - padding - 1],
                radius=max(3, corner_radius - border_width),
                fill=255
            )
            
            # Combine original alpha with content mask
            combined_alpha = Image.new('L', img.size, 0)
            for y in range(img.height):
                for x in range(img.width):
                    original_alpha = img_alpha.getpixel((x, y))
                    mask_alpha = content_mask.getpixel((x, y))
                    final_alpha = int((original_alpha * mask_alpha) / 255)
                    combined_alpha.putpixel((x, y), final_alpha)
            
            img.putalpha(combined_alpha)
            sticker.paste(img, (paste_x, paste_y), img)
        else:
            sticker.paste(img, (paste_x, paste_y))
        
        # Add subtle drop shadow
        shadow = create_die_cut_shadow(sticker, offset=(3, 3), blur_radius=4)
        
        # Combine shadow and sticker
        final_sticker = Image.new('RGBA', 
                                 (sticker.width + 8, sticker.height + 8), 
                                 (0, 0, 0, 0))
        final_sticker.paste(shadow, (0, 0), shadow)
        final_sticker.paste(sticker, (4, 4), sticker)
        
        # Apply rotation if specified
        if rotation != 0:
            final_sticker = final_sticker.rotate(rotation, expand=True, fillcolor=(0,0,0,0))
        
        return final_sticker
        
    except Exception as e:
        print(f"Error creating die-cut sticker from {image_path}: {e}")
        return None

def create_die_cut_shadow(sticker, offset=(3, 3), blur_radius=4):
    """Create a drop shadow for the die-cut sticker"""
    
    if sticker.mode == 'RGBA':
        # Create shadow based on sticker's alpha channel
        shadow_mask = sticker.split()[-1]
        shadow_mask = shadow_mask.point(lambda p: min(80, p) if p > 0 else 0)
        
        # Apply blur
        shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(radius=blur_radius))
        
        # Create colored shadow
        shadow = Image.new('RGBA', sticker.size, (0, 0, 0, 0))
        shadow.putalpha(shadow_mask)
        
        return shadow
    
    return Image.new('RGBA', sticker.size, (0, 0, 0, 0))

def generate_sticker_cache(image_paths, cache_dir="cached_stickers"):
    """Generate and cache high-res die-cut stickers at various sizes"""
    
    os.makedirs(cache_dir, exist_ok=True)
    
    # Create cache manifest
    manifest_path = os.path.join(cache_dir, "manifest.json")
    manifest = {}
    
    if os.path.exists(manifest_path):
        with open(manifest_path, 'r') as f:
            manifest = json.load(f)
    
    print(f"🎨 Generating cached stickers for {len(image_paths)} images...")
    
    # Size ranges for different sticker variations
    size_ranges = {
        "small": [60, 80, 100, 120],
        "medium": [140, 160, 180, 200],
        "large": [220, 250, 280, 320]
    }
    
    cached_stickers = []
    
    for i, image_path in enumerate(image_paths):
        filename = os.path.basename(image_path)
        
        # Generate hash for this image to track changes
        with open(image_path, 'rb') as f:
            file_hash = hashlib.md5(f.read()).hexdigest()[:8]
        
        for size_category, sizes in size_ranges.items():
            for size in sizes:
                cache_key = f"{filename}_{size}_{file_hash}"
                cache_file = os.path.join(cache_dir, f"{cache_key}.png")
                
                # Check if already cached
                if cache_key in manifest and os.path.exists(cache_file):
                    cached_stickers.append(cache_file)
                    continue
                
                # Generate new sticker
                sticker = create_die_cut_sticker(image_path, size, rotation=0)
                
                if sticker:
                    sticker.save(cache_file, "PNG", optimize=True)
                    cached_stickers.append(cache_file)
                    manifest[cache_key] = {
                        "original": filename,
                        "size": size,
                        "category": size_category,
                        "hash": file_hash
                    }
        
        if (i + 1) % 5 == 0:
            print(f"✓ Cached stickers for {i + 1}/{len(image_paths)} images")
    
    # Save updated manifest
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    
    print(f"🎯 Generated {len(cached_stickers)} cached stickers!")
    return cached_stickers

def create_cached_sticker_bomb(cached_stickers, output_path="octoslots_cached_bomb.png"):
    """Create sticker bomb using pre-generated cached stickers"""
    
    # Work at 3x resolution
    work_size = 704 * 3  # 2112x2112
    final_size = 704
    
    canvas = Image.new("RGBA", (work_size, work_size), (0, 0, 0, 0))
    
    print(f"🎨 Creating sticker bomb from {len(cached_stickers)} cached stickers...")
    
    # Place stickers with different densities
    placement_passes = [
        {"count": 100, "rotations": (-45, 45)},   # Background layer
        {"count": 150, "rotations": (-30, 30)},   # Mid layer
        {"count": 200, "rotations": (-20, 20)},   # Front layer
        {"count": 180, "rotations": (-15, 15)},   # Detail layer
        {"count": 120, "rotations": (-10, 10)}    # Fill layer
    ]
    
    total_placed = 0
    
    for pass_idx, pass_config in enumerate(placement_passes):
        print(f"🎯 Pass {pass_idx + 1}/5: Placing {pass_config['count']} stickers...")
        
        for i in range(pass_config["count"]):
            try:
                # Random cached sticker selection
                sticker_path = random.choice(cached_stickers)
                
                # Load cached sticker
                sticker = Image.open(sticker_path).convert('RGBA')
                
                # Random rotation
                min_rot, max_rot = pass_config["rotations"]
                rotation = random.randint(min_rot, max_rot)
                
                if rotation != 0:
                    sticker = sticker.rotate(rotation, expand=True, fillcolor=(0,0,0,0))
                
                # Random position with overlap
                x = random.randint(-sticker.width//2, work_size - sticker.width//2)
                y = random.randint(-sticker.height//2, work_size - sticker.height//2)
                
                # Random opacity variation for layering
                opacity = random.randint(180, 255)
                if opacity < 255:
                    alpha = sticker.split()[-1]
                    alpha = alpha.point(lambda p: int(p * opacity / 255))
                    sticker.putalpha(alpha)
                
                # Paste sticker
                canvas.paste(sticker, (x, y), sticker)
                total_placed += 1
                
            except Exception as e:
                continue
        
        print(f"✓ Completed pass {pass_idx + 1} - {total_placed} stickers placed")
    
    print(f"🎉 Placed {total_placed} cached stickers!")
    
    # Scale down with high quality
    print(f"📐 Scaling down to {final_size}x{final_size}...")
    final_image = canvas.resize((final_size, final_size), Image.LANCZOS)
    
    # Gaming optimizations
    enhancer = ImageEnhance.Color(final_image)
    final_image = enhancer.enhance(0.88)
    
    # Save versions
    print("💾 Saving cached sticker bomb...")
    final_image.save(output_path, "PNG", optimize=True)
    
    webp_path = output_path.replace('.png', '.webp')
    final_image.save(webp_path, "WebP", quality=95, optimize=True)
    
    fullres_path = output_path.replace('.png', '_fullres.png')
    canvas.save(fullres_path, "PNG", optimize=True)
    
    return output_path, webp_path, fullres_path

def main():
    """Main execution function"""
    print("🚀 OctoSlots CACHED Die-Cut Sticker Creator Starting...")
    print("📱 Target: 704x704 pixels with cached high-res stickers")
    
    # Download source images (only if needed)
    downloaded_images = download_all_octocats()
    
    if len(downloaded_images) < 10:
        print("❌ Need more images for sticker bomb effect!")
        return
    
    print(f"\n🎯 Ready with {len(downloaded_images)} source images")
    
    # Generate cached stickers (only if needed)
    cached_stickers = generate_sticker_cache(downloaded_images)
    
    # Create sticker bomb from cache
    png_path, webp_path, fullres_path = create_cached_sticker_bomb(cached_stickers)
    
    print(f"\n🎉 Cached die-cut sticker bomb created!")
    print(f"\n📄 Output files:")
    print(f"   Game PNG: {png_path}")
    print(f"   Game WebP: {webp_path}")
    print(f"   Full-res: {fullres_path}")
    
    print(f"\n💡 CSS usage:")
    print(f"   background-color: #f8f9fa;")
    print(f"   background-image: url('{webp_path}');")
    print(f"   background-size: cover;")
    print(f"   background-position: center;")
    
    print(f"\n✨ Caching benefits:")
    print(f"   • {len(cached_stickers)} pre-rendered stickers saved")
    print(f"   • Faster subsequent generations")
    print(f"   • Multiple size variations available")
    print(f"   • Reusable for different layouts")
    
    # Show cache stats
    cache_size = sum(os.path.getsize(f"cached_stickers/{f}") 
                    for f in os.listdir("cached_stickers") 
                    if f.endswith('.png')) / (1024 * 1024)
    print(f"   • Cache size: {cache_size:.1f} MB")

if __name__ == "__main__":
    main()