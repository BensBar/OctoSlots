#!/usr/bin/env python3
"""
OctoSlots HIGH-RES Die-Cut Sticker Background Creator
Creates realistic die-cut stickers with transparent centers and white edges
"""

import os
import requests
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw
import random
import math

def download_all_octocats():
    """Download the complete collection of Octodex images"""
    
    all_octocats = [
        "snowtocat_final.jpg", "justicetocat.jpg", "saint_nictocat.jpg",
        "mona-lovelace.jpg", "dinotocat.png", "bannekat.png", "catstello.png",
        "mcefeeline.jpg", "skatetocat.png", "bewitchedtocat.jpg", "inflatocat.png",
        "hanukkat.png", "welcometocat.png", "filmtocat.png", "privateinvestocat.jpg",
        "gracehoppertocat.jpg", "gobbleotron.gif", "jetpacktocat.png", "minertocat.png",
        "mountietocat.png", "saketocat.png", "luchadortocat.png", "saritocat.png",
        "topguntocat.png", "carlostocat.gif", "grinchtocat.gif", "maxtocat.gif",
        "yaktocat.png", "steroidtocat.png", "mummytocat.gif", "labtocat.png",
        "dunetocat.png", "octoliberty.png", "femalecodertocat.png", "daftpunktocat-thomas.gif",
        "daftpunktocat-guy.gif", "foundingfather_v2.png", "poptocat_v2.png",
        "Mardigrastocat.png", "kimonotocat.png", "Professortocat_v2.png", "goretocat.png",
        "Robotocat.png", "motherhubbertocat.png", "skitchtocat.png", "gangnamtocat.png",
        "droctocat.png", "spidertocat.png", "megacat-2.png", "dodgetocat_v2.png",
        "stormtroopocat.png", "pusheencat.png", "deckfailcat.png", "murakamicat.png",
        "homercat.png", "minion.png", "droidtocat.png", "octofez.png",
        "heisencat.png", "red-polo.png", "twenty-percent-cooler-octocat.png", "momtocat.png",
        "front-end-conftocat.png", "snowoctocat.png", "electrocat.png", "codercat.jpg",
        "strongbadtocat.png", "adventure-cat.png", "doctocat-brown.jpg", "dojocat.jpg",
        "defunktocat.png", "herme-t-crabb.png", "saint-nicktocat.jpg", "orderedlistocat.png",
        "thanktocat.png", "megacat.jpg", "linktocat.jpg", "plumber.jpg",
        "octotron.jpg", "baracktocat.jpg", "octocat-de-los-muertos.jpg", "grim-repo.jpg",
        "father_timeout.jpg", "waldocat.png", "hipster-partycat.jpg", "riddlocat.png",
        "visionary.jpg", "oktobercat.png", "shoptocat.png", "nyantocat.gif",
        "octdrey-catburn.jpg", "spectrocat.png", "bear-cavalry.png", "andycat.jpg",
        "notocat.jpg", "dodgetocat.jpg", "cloud.jpg", "scarletteocat.jpg",
        "poptocat.png", "jenktocat.jpg", "xtocat.jpg", "chellocat.jpg",
        "cherryontop-o-cat.png", "supportcat.png", "collabocats.jpg", "constructocat2.jpg",
        "total-eclipse-of-the-octocat.jpg", "pacman-ghosts.jpg", "okal-eltocat.jpg",
        "octoclark-kentocat.jpg", "agendacat.png", "ironcat.jpg", "inspectocat.jpg",
        "jean-luc-picat.jpg", "spocktocat.png", "wilson.jpg", "swagtocat.png",
        "drunktocat.jpg", "hubot.jpg", "monroe.jpg", "trekkie.png",
        "octonaut.jpg", "bouncercat.png", "founding-father.jpg", "pythocat.png",
        "drupalcat.jpg", "socialite.jpg", "setuptocat.jpg", "repo.png",
        "forktocat.jpg", "benevocats.png", "scottocat.jpg", "puppeteer.png",
        "octobiwan.jpg", "class-act.png", "original.png"
    ]
    
    os.makedirs("octocats", exist_ok=True)
    downloaded = []
    
    print(f"🐙 Downloading {len(all_octocats)} HIGH-RES Octodex stickers...")
    
    for i, filename in enumerate(all_octocats):
        url = f"https://octodex.github.com/images/{filename}"  # Fixed URL!
        
        try:
            response = requests.get(url, timeout=15)
            response.raise_for_status()
            
            local_path = f"octocats/{filename}"
            with open(local_path, 'wb') as f:
                f.write(response.content)
            
            downloaded.append(local_path)
            if (i + 1) % 10 == 0:
                print(f"✓ Downloaded {i + 1}/{len(all_octocats)} stickers")
            
        except Exception as e:
            print(f"✗ Failed to download {filename}: {e}")
            continue
    
    print(f"🎯 Successfully downloaded {len(downloaded)} high-res stickers!")
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
        border_width = max(3, target_size // 30)  # Proportional border
        
        # Create the sticker canvas (transparent)
        sticker_size = img.width + (border_width * 2)
        sticker = Image.new('RGBA', (sticker_size, sticker_size), (0, 0, 0, 0))
        
        # Create mask for the image shape (this will define our sticker cut)
        mask = Image.new('L', (sticker_size, sticker_size), 0)
        mask_draw = ImageDraw.Draw(mask)
        
        # Draw rounded rectangle mask
        corner_radius = max(8, sticker_size // 15)
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
        
        # Apply white edge
        white_edge = Image.new('RGBA', (sticker_size, sticker_size), (255, 255, 255, 220))
        sticker.paste(white_edge, (0, 0), white_edge_mask)
        
        # Paste the octodx image in the center (it will show through the transparent center)
        paste_x = (sticker_size - img.width) // 2
        paste_y = (sticker_size - img.height) // 2
        
        # Create a slightly smaller mask for the image to ensure it doesn't overlap the white edge
        img_mask = Image.new('L', img.size, 0)
        img_mask_draw = ImageDraw.Draw(img_mask)
        
        # Make the image mask slightly smaller than the inner area
        padding = border_width // 2
        img_mask_draw.rounded_rectangle(
            [padding, padding, img.width - padding - 1, img.height - padding - 1],
            radius=max(2, corner_radius - border_width),
            fill=255
        )
        
        # Apply the mask to the image
        if img.mode == 'RGBA':
            # Combine the image's alpha with our mask
            img_alpha = img.split()[-1]
            combined_alpha = Image.new('L', img.size, 0)
            
            for y in range(img.height):
                for x in range(img.width):
                    original_alpha = img_alpha.getpixel((x, y))
                    mask_alpha = img_mask.getpixel((x, y))
                    # Keep original alpha but mask out areas outside our sticker shape
                    final_alpha = int((original_alpha * mask_alpha) / 255)
                    combined_alpha.putpixel((x, y), final_alpha)
            
            img.putalpha(combined_alpha)
            sticker.paste(img, (paste_x, paste_y), img)
        else:
            # For non-RGBA images, use the mask directly
            sticker.paste(img, (paste_x, paste_y), img_mask)
        
        # Add subtle drop shadow to the whole sticker
        shadow = create_die_cut_shadow(sticker, offset=(2, 2), blur_radius=3)
        
        # Combine shadow and sticker
        final_sticker = Image.new('RGBA', 
                                 (sticker.width + 6, sticker.height + 6), 
                                 (0, 0, 0, 0))
        final_sticker.paste(shadow, (0, 0), shadow)
        final_sticker.paste(sticker, (3, 3), sticker)
        
        # Apply rotation if specified
        if rotation != 0:
            final_sticker = final_sticker.rotate(rotation, expand=True, fillcolor=(0,0,0,0))
        
        # Add subtle edge highlight for realism
        final_sticker = add_die_cut_highlight(final_sticker)
        
        return final_sticker
        
    except Exception as e:
        print(f"Error creating die-cut sticker from {image_path}: {e}")
        return None

def create_die_cut_shadow(sticker, offset=(2, 2), blur_radius=3):
    """Create a drop shadow for the die-cut sticker"""
    
    # Create shadow based on sticker's alpha channel
    shadow_mask = sticker.split()[-1]  # Get alpha channel
    shadow_mask = shadow_mask.point(lambda p: min(80, p) if p > 0 else 0)  # Darker, semi-transparent shadow
    
    # Apply blur
    shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(radius=blur_radius))
    
    # Create colored shadow
    shadow = Image.new('RGBA', sticker.size, (0, 0, 0, 0))
    shadow.putalpha(shadow_mask)
    
    return shadow

def add_die_cut_highlight(sticker):
    """Add subtle edge highlight to make the die-cut edge more realistic"""
    
    # Create subtle highlight on the white edge
    highlight = Image.new('RGBA', sticker.size, (0, 0, 0, 0))
    
    if sticker.mode == 'RGBA':
        alpha = sticker.split()[-1]
        
        # Create edge detection for highlight
        edge_mask = alpha.filter(ImageFilter.FIND_EDGES)
        edge_mask = edge_mask.point(lambda p: min(40, p * 2) if p > 10 else 0)
        
        # Apply white highlight
        highlight.putalpha(edge_mask)
        white_highlight = Image.new('RGBA', sticker.size, (255, 255, 255, 0))
        white_highlight.putalpha(edge_mask)
        
        # Blend with original
        result = Image.alpha_composite(sticker, white_highlight)
        return result
    
    return sticker

def create_high_res_die_cut_bomb(image_paths, output_path="octoslots_diecut_stickers.png"):
    """Create high-resolution die-cut sticker bomb background"""
    
    # Work at 3x resolution for crisp results
    work_size = 704 * 3  # 2112x2112
    final_size = 704
    
    canvas = Image.new("RGBA", (work_size, work_size), (0, 0, 0, 0))  # Transparent canvas
    
    print(f"🎨 Creating HIGH-RES die-cut sticker bomb at {work_size}x{work_size}...")
    
    # High-res sticker placement
    passes = [
        {"count": 60, "size_range": (240, 360), "rotation": (-45, 45)},   # Large stickers
        {"count": 100, "size_range": (180, 280), "rotation": (-30, 30)},  # Medium stickers  
        {"count": 150, "size_range": (120, 200), "rotation": (-20, 20)},  # Small stickers
        {"count": 180, "size_range": (80, 140), "rotation": (-15, 15)},   # Tiny stickers
        {"count": 120, "size_range": (60, 100), "rotation": (-10, 10)}    # Fill stickers
    ]
    
    total_stickers = 0
    
    for pass_idx, pass_config in enumerate(passes):
        print(f"🎯 Pass {pass_idx + 1}/5: Creating {pass_config['count']} die-cut stickers...")
        
        for i in range(pass_config["count"]):
            try:
                # Random image selection
                image_path = random.choice(image_paths)
                
                # Random size for this pass
                size = random.randint(*pass_config["size_range"])
                
                # Random rotation
                rotation = random.randint(*pass_config["rotation"])
                
                # Create die-cut sticker
                sticker = create_die_cut_sticker(image_path, size, rotation)
                
                if sticker is None:
                    continue
                
                # Random position with overlap
                x = random.randint(-sticker.width//2, work_size - sticker.width//2)
                y = random.randint(-sticker.height//2, work_size - sticker.height//2)
                
                # Paste with alpha blending
                try:
                    canvas.paste(sticker, (x, y), sticker)
                    total_stickers += 1
                    
                except Exception as e:
                    continue
                
            except Exception as e:
                continue
        
        print(f"✓ Completed pass {pass_idx + 1} - {total_stickers} stickers placed so far")
    
    print(f"🎉 Placed {total_stickers} die-cut stickers!")
    
    # Scale down to final size with high-quality resampling
    print(f"📐 Scaling down to {final_size}x{final_size} with LANCZOS resampling...")
    final_image = canvas.resize((final_size, final_size), Image.LANCZOS)
    
    # Apply subtle gaming optimizations
    print("🎮 Applying final gaming optimizations...")
    enhancer = ImageEnhance.Color(final_image)
    final_image = enhancer.enhance(0.88)
    
    # Save high-quality versions
    print("💾 Saving die-cut sticker bomb...")
    
    # Save PNG with transparency
    final_image.save(output_path, "PNG", optimize=True)
    
    # Save WebP with transparency
    webp_path = output_path.replace('.png', '.webp')
    final_image.save(webp_path, "WebP", quality=95, optimize=True)
    
    # Also save the full-res version
    fullres_path = output_path.replace('.png', '_fullres.png')
    canvas.save(fullres_path, "PNG", optimize=True)
    
    return output_path, webp_path, fullres_path

def main():
    """Main execution function"""
    print("🚀 OctoSlots DIE-CUT Sticker Creator Starting...")
    print("📱 Target: 704x704 pixels with transparent centers and white edges")
    
    # Download ALL the stickers
    downloaded_images = download_all_octocats()
    
    if len(downloaded_images) < 20:
        print("❌ Need more images for sticker bomb effect!")
        return
    
    print(f"\n🎯 Ready to create DIE-CUT sticker bomb with {len(downloaded_images)} stickers")
    
    # Create high-res die-cut sticker bomb
    png_path, webp_path, fullres_path = create_high_res_die_cut_bomb(downloaded_images)
    
    print(f"\n🎉 Die-cut sticker bomb backgrounds created!")
    print(f"\n📄 Final versions:")
    print(f"   Game-ready PNG: {png_path}")
    print(f"   Game-ready WebP: {webp_path}")
    print(f"   Full-res PNG: {fullres_path}")
    
    print(f"\n💡 CSS usage (with background):")
    print(f"   background-color: #f8f9fa;  /* Light gray background */")
    print(f"   background-image: url('{webp_path}');")
    print(f"   background-size: cover;")
    print(f"   background-position: center;")
    
    print(f"\n✨ Die-cut sticker features:")
    print(f"   • Transparent centers showing background through")
    print(f"   • White edges only (like real die-cut stickers)")
    print(f"   • Drop shadows for depth")
    print(f"   • Edge highlights for realism")
    print(f"   • 3x internal resolution for crisp zoom")

if __name__ == "__main__":
    main()