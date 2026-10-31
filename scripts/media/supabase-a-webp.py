"""Convierte a WebP las imágenes de blog-media que tenemos en local y escribe el mapa ruta -> /media/...

Uso: python3 convert.py <repo flame-next> <salida mapa.json> [--max 1600] [--q 78]
"""
import json, os, re, subprocess, sys, unicodedata, urllib.parse, io
from PIL import Image, ImageOps

REPO = sys.argv[1]
OUT_MAP = sys.argv[2]
MAX = int(sys.argv[sys.argv.index("--max") + 1]) if "--max" in sys.argv else 1600
Q = int(sys.argv[sys.argv.index("--q") + 1]) if "--q" in sys.argv else 78
BASE = "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/"
FLAME = os.path.dirname(REPO)
WS = os.path.dirname(os.path.dirname(os.path.dirname(FLAME)))
DEST = os.path.join(REPO, "public", "media")

nfc = lambda s: unicodedata.normalize("NFC", s)

# 1. Referencias (rutas tal cual aparecen, sin query)
refs = set()
pat = re.compile(re.escape(BASE) + r"([^\"'()\s\\?#]+)")
for top in ("data", "lib", "app", "scripts", "components"):
    for dp, _, fs in os.walk(os.path.join(REPO, top)):
        for f in fs:
            p = os.path.join(dp, f)
            try:
                txt = open(p, encoding="utf-8").read()
            except (UnicodeDecodeError, IsADirectoryError):
                continue
            refs.update(pat.findall(txt))

# 2. Originales: historial git (antes de ad53f16) + copias locales del WP
hist = {}
out = subprocess.run(["git", "-c", "core.quotepath=false", "ls-tree", "-r", "ad53f16^", "--", "public/wp-content/uploads"],
                     cwd=REPO, capture_output=True, text=True).stdout
for line in out.splitlines():
    meta, path = line.split("\t", 1)
    hist[nfc(path[len("public/wp-content/uploads/"):])] = ("git", meta.split()[2])
roots = [os.path.join(WS, "_otros-repos/flame-web-v2/clone/wp-content/uploads"),
         os.path.join(FLAME, "web/flameanalytics.com/wp-content/uploads")] + \
        [os.path.join(FLAME, d, "public/wp-content/uploads") for d in sorted(os.listdir(FLAME)) if d.startswith("flame-next")]
for r in roots:
    for dp, _, fs in os.walk(r):
        for f in fs:
            rel = nfc(os.path.relpath(os.path.join(dp, f), r))
            hist.setdefault(rel, ("fs", os.path.join(dp, f)))


def slug(rel):
    s = unicodedata.normalize("NFKD", rel).encode("ascii", "ignore").decode()
    s = re.sub(r"[^A-Za-z0-9/._-]+", "-", s)
    return re.sub(r"-+", "-", s)


def load(src):
    kind, ref = src
    if kind == "git":
        return subprocess.run(["git", "cat-file", "blob", ref], cwd=REPO, capture_output=True).stdout
    return open(ref, "rb").read()


mapping, missing, before, after = {}, [], 0, 0
for ref in sorted(refs):
    rel = nfc(urllib.parse.unquote(ref))
    src = hist.get(rel)
    if not src:
        missing.append(ref)
        continue
    ext = rel.rsplit(".", 1)[-1].lower()
    data = load(src)
    before += len(data)
    if ext in ("png", "jpg", "jpeg", "webp"):
        target = slug(rel).rsplit(".", 1)[0] + ".webp"
        im = Image.open(io.BytesIO(data))
        im = ImageOps.exif_transpose(im)
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA" if "transparency" in im.info or im.mode in ("LA", "P") else "RGB")
        if im.width > MAX:
            im = im.resize((MAX, round(im.height * MAX / im.width)), Image.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, "WEBP", quality=Q, method=6)
        blob = buf.getvalue()
        if ext == "webp" and len(blob) >= len(data):
            blob = data
    else:  # svg, gif, pdf, mp4, webm: copia tal cual (o reutiliza la copia ya publicada)
        if os.path.isfile(os.path.join(REPO, "public/wp-content/uploads", rel)):
            mapping[ref] = "/wp-content/uploads/" + ref
            continue
        target = slug(rel)
        blob = data
    dst = os.path.join(DEST, target)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    open(dst, "wb").write(blob)
    after += len(blob)
    mapping[ref] = "/media/" + target

json.dump({"map": mapping, "missing": missing}, open(OUT_MAP, "w"), ensure_ascii=False, indent=1)
print(f"refs {len(refs)} | convertidas {len(mapping)} | sin original {len(missing)}")
print(f"originales {before/1e6:.0f} MB -> {after/1e6:.0f} MB")
