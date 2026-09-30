import zlib
import struct
import math
import os

def create_png(width, height, get_pixel_func):
    """Generate a valid PNG in pure python using zlib and struct."""
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # filter type None
        for x in range(width):
            r, g, b, a = get_pixel_func(x, y, width, height)
            raw_data.extend((r, g, b, a))

    def make_chunk(chunk_type, data):
        crc = zlib.crc32(chunk_type + data) & 0xffffffff
        return struct.pack('>I', len(data)) + chunk_type + data + struct.pack('>I', crc)

    header = b'\x89PNG\r\n\x1a\n'
    ihdr = make_chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    idat = make_chunk(b'IDAT', zlib.compress(bytes(raw_data), 9))
    iend = make_chunk(b'IEND', b'')
    return header + ihdr + idat + iend

def drumstick_pixel(x, y, w, h, is_maskable=False):
    # Normalized coordinates centered at (0, 0), range roughly [-1, 1]
    scale = 0.72 if is_maskable else 0.84
    nx = ((x / (w - 1)) - 0.5) * 2 / scale
    ny = ((y / (h - 1)) - 0.5) * 2 / scale

    # Background color: deep stone charcoal #0c0a09
    bg_r, bg_g, bg_b, bg_a = 12, 10, 9, 255

    # Center glow
    dist_center = math.sqrt(nx*nx + ny*ny)
    glow = max(0.0, 1.0 - dist_center / 1.3)
    if glow > 0:
        # mix subtle amber glow
        bg_r = int(bg_r + 40 * glow)
        bg_g = int(bg_g + 20 * glow)

    # Fried chicken drumstick approximation:
    # Rotate by -35 deg (approx -0.6 rad)
    angle = -0.61
    cos_a = math.cos(angle)
    sin_a = math.sin(angle)
    rx = nx * cos_a - ny * sin_a
    ry = nx * sin_a + ny * cos_a

    # Meat bulb: ellipse centered at (0.05, -0.05)
    dx_meat = (rx - 0.05) / 0.55
    dy_meat = (ry - -0.05) / 0.45
    meat_dist = math.sqrt(dx_meat * dx_meat + dy_meat * dy_meat)

    # Bone shaft: box along rx in [-0.55, 0.0], ry in [-0.08, 0.08]
    in_bone = (-0.55 <= rx <= -0.05) and (abs(ry) <= 0.08)

    # Bone knobs (two circles at end)
    k1_dist = math.sqrt((rx - -0.58)**2 + (ry - 0.09)**2)
    k2_dist = math.sqrt((rx - -0.58)**2 + (ry - -0.09)**2)
    in_knob = (k1_dist <= 0.12) or (k2_dist <= 0.12)

    # Texture / noise / crispy speckles
    crisp = math.sin(x * 0.45) * math.cos(y * 0.45)

    if meat_dist <= 1.0:
        # Golden crispy crust gradient (#f59e0b to #d97706)
        factor = (dy_meat + 1.0) / 2.0
        r = int(245 - 30 * factor + 15 * crisp)
        g = int(158 - 35 * factor + 10 * crisp)
        b = int(11 + 5 * crisp)
        # Highlight on top
        if dy_meat < -0.2 and meat_dist < 0.8:
            r = min(255, r + 25)
            g = min(255, g + 25)
            b = min(255, b + 15)
        return (min(255, max(0, r)), min(255, max(0, g)), min(255, max(0, b)), 255)

    if in_knob or in_bone:
        # Bone off-white #f8fafc
        shade = 0.9 + 0.1 * math.sin(rx * 10)
        return (int(248 * shade), int(250 * shade), int(252 * shade), 255)

    # Border squircle for standard icons
    if not is_maskable:
        dist_box = max(abs(nx * scale), abs(ny * scale))
        if dist_box > 0.94 and dist_box <= 0.98:
            return (245, 158, 11, 160)

    return (bg_r, bg_g, bg_b, bg_a)

os.makedirs('public', exist_ok=True)

# Generate pwa-192x192.png
with open('public/pwa-192x192.png', 'wb') as f:
    f.write(create_png(192, 192, lambda x, y, w, h: drumstick_pixel(x, y, w, h, False)))
print("Created public/pwa-192x192.png")

# Generate pwa-512x512.png
with open('public/pwa-512x512.png', 'wb') as f:
    f.write(create_png(512, 512, lambda x, y, w, h: drumstick_pixel(x, y, w, h, False)))
print("Created public/pwa-512x512.png")

# Generate pwa-maskable-512x512.png (with safe zone padding)
with open('public/pwa-maskable-512x512.png', 'wb') as f:
    f.write(create_png(512, 512, lambda x, y, w, h: drumstick_pixel(x, y, w, h, True)))
print("Created public/pwa-maskable-512x512.png")

# Generate apple-touch-icon.png (180x180)
with open('public/apple-touch-icon.png', 'wb') as f:
    f.write(create_png(180, 180, lambda x, y, w, h: drumstick_pixel(x, y, w, h, False)))
print("Created public/apple-touch-icon.png")
