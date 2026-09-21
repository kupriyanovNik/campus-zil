import glob, os
from PIL import Image
for src in sorted(glob.glob('gen/photos/*.png')):
    name = os.path.splitext(os.path.basename(src))[0]
    im = Image.open(src).convert('RGB')
    w = 1600
    im = im.resize((w, round(im.size[1] * w / im.size[0])), Image.LANCZOS)
    out = f'assets/img/{name}.jpg'
    im.save(out, quality=82, optimize=True, progressive=True)
    print(out, os.path.getsize(out) // 1024, 'KB')
