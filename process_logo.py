from PIL import Image
import os

img_path = "c:/projects/store_finder_frontend/public/logo.png"
if not os.path.exists(img_path):
    print("Logo file not found!")
    exit(1)

img = Image.open(img_path).convert("RGBA")
datas = img.getdata()

new_data = []
for item in datas:
    r, g, b, a = item
    # If the pixel is close to white (threshold 240), make it transparent
    if r > 240 and g > 240 and b > 240:
        new_data.append((255, 255, 255, 0))
    else:
        # Enhance contrast/saturation of the peach color slightly so it doesn't look washed out
        factor = 0.88 # slightly darker/richer
        nr = max(0, min(255, int(r * factor)))
        ng = max(0, min(255, int(g * factor)))
        nb = max(0, min(255, int(b * factor)))
        new_data.append((nr, ng, nb, a))

img.putdata(new_data)
img.save(img_path, "PNG")

# Also save as JPG (with white background preserved, but enhanced color)
jpg_path = "c:/projects/store_finder_frontend/public/logo.jpg"
img_jpg = Image.open(img_path).convert("RGB")
img_jpg.save(jpg_path, "JPEG")

print("Successfully processed logo.png (transparent) and logo.jpg (enhanced)!")
