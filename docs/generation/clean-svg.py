import re, sys, os, glob
os.makedirs('assets/icons', exist_ok=True)
for src in sorted(glob.glob('gen/icons/*.svg')):
    name = os.path.basename(src)
    s = open(src).read()
    s = re.sub(r'<metadata>.*?</metadata>', '', s, flags=re.S)
    # drop the full-canvas white background path
    s = re.sub(r'<path[^>]*fill="rgb\(255,255,255\)" d="M 0 0 L 2048 0 L 2048 2048 L 0 2048 L 0 0 z"/>\s*', '', s)
    paths = re.findall(r'<path[^>]*/>', s)
    xs, ys = [], []
    for p in paths:
        d = re.search(r' d="([^"]+)"', p).group(1)
        nums = [float(n) for n in re.findall(r'-?\d+\.?\d*', d)]
        xs += nums[0::2]; ys += nums[1::2]
    if not xs: print('skip', name); continue
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    w, h = maxx - minx, maxy - miny
    side = max(w, h) * 1.08
    cx, cy = (minx + maxx) / 2, (miny + maxy) / 2
    vb = f'{cx - side/2:.1f} {cy - side/2:.1f} {side:.1f} {side:.1f}'
    body = '\n'.join(p.replace(' transform="translate(0,0)"', '') for p in paths)
    out = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" aria-hidden="true">\n{body}\n</svg>\n'
    open(f'assets/icons/{name}', 'w').write(out)
    print(f'{name}: {len(s)} -> {len(out)} bytes, bbox {w:.0f}x{h:.0f}')
