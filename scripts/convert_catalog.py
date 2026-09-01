# -*- coding: utf-8 -*-
"""Конвертирует volar_catalog.csv (из ../volar-parser) в src/data/catalog.json."""
import csv
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(HERE, "..", "..", "volar-parser", "volar_catalog.csv")
OUT_PATH = os.path.join(HERE, "..", "src", "data", "catalog.json")

# Категория по ключевым словам в slug (URL) товара.
CATEGORY_BY_KEY = [
    ("gidravlicheskoe", ("Гидравлическое масло", "gidravlicheskoe-maslo")),
    ("transmissionnoe", ("Трансмиссионное масло", "transmissionnoe-maslo")),
    ("motornoe", ("Моторное масло", "motornoe-maslo")),
    ("maslo-motornoe", ("Моторное масло", "motornoe-maslo")),
    ("industrialnoe", ("Масло индустриальное", "maslo-industrialnoe")),
    ("kompressornoe", ("Масло компрессорное", "maslo-kompressornoe")),
    ("czepnoe", ("Масла цепные", "masla-czepnye")),
    ("harvesterov", ("Масла цепные", "masla-czepnye")),
    ("reduktornoe", ("Масла редукторные", "masla-reduktornye")),
    ("turbinnoe", ("Масла турбинные", "masla-turbinnye")),
    ("zakalochnoe", ("Масла закалочные", "masla-zakalochnye")),
]


def slug_from_url(url):
    return url.rstrip("/").rsplit("/", 1)[-1]


def guess_category(slug, name, existing):
    if existing:
        return existing, _slugify_cat(existing)
    low = slug.lower()
    for key, (title, cslug) in CATEGORY_BY_KEY:
        if key in low:
            return title, cslug
    return "Каталог", "katalog"


CAT_SLUG = {
    "Гидравлическое масло": "gidravlicheskoe-maslo",
    "Трансмиссионное масло": "transmissionnoe-maslo",
    "Моторное масло": "motornoe-maslo",
    "Масло индустриальное": "maslo-industrialnoe",
    "Масло компрессорное": "maslo-kompressornoe",
    "Масла цепные": "masla-czepnye",
    "Масла редукторные": "masla-reduktornye",
    "Масла турбинные": "masla-turbinnye",
    "Масла закалочные": "masla-zakalochnye",
}


def _slugify_cat(title):
    return CAT_SLUG.get(title, "katalog")


# Локальные фото товаров (public/products), чтобы не зависеть от хотлинка volar.by.
# Значение: (путь, ширина, высота).
DEFAULT_IMAGE = ("/products/volar-bochka.png", 504, 771)

IMAGE_BY_SLUG = {
    # Моторное масло
    "motornoe-maslo-m8v-mineralnoe-18-kg-20-l": ("/products/m-8v-kanistra.jpg", 600, 600),
    "maslo-motornoe-volar-ultra-sae-5w-40-api-sn-cf": ("/products/volar-ultra-5w40.jpg", 600, 600),
    "maslo-motornoe-dlya-avtotraktornyh-dizelej-m-10g2k": ("/products/m-10g2k-bochka.jpg", 600, 600),
    "maslo-motornoe-dlya-avtotraktornyh-dizelej-m-10dm": ("/products/m-10dm-bochka.jpg", 600, 600),
    "maslo-motornoe-dlya-avtotraktornyh-dizelej-m-10g2": ("/products/m-10g2-bochka.jpg", 600, 600),
    "maslo-motornoe-classic-universal-sae-10w-40-api-sl-cf-4": ("/products/classic-universal-10w40.jpg", 600, 600),
    "maslo-motornoe-classic-universal-sae-15w-40-api-sl-cf-4": ("/products/classic-universal-bochka.jpg", 372, 600),
    "maslo-motornoe-lux-sae-10w-40-api-sl-ci-4": ("/products/volar-lux-10w40.jpg", 600, 600),
    "maslo-motornoe-lux-sae-15w-40-api-sl-ci-4": ("/products/volar-lux-15w40.jpg", 372, 600),
    "maslo-motornoe-m-14-v2": ("/products/volar-bochka-sinyaya.jpg", 372, 600),
    "maslo-motornoe-mt-16p": ("/products/mt-16p.jpg", 451, 510),
    "maslo-motornoe-universalnoe-m-8v": ("/products/m-8v-bochka.jpg", 600, 600),
    # Гидравлическое масло
    "maslo-gidravlicheskoe-hlp-32": ("/products/hlp-32.jpg", 600, 600),
    "maslo-gidravlicheskoe-hlp-46": ("/products/hlp-46.jpg", 600, 600),
    "maslo-gidravlicheskoe-hlp-68": ("/products/hlp-68.jpg", 600, 600),
    "maslo-gidravlicheskoe-hlp-100": ("/products/hlp-100.jpg", 372, 600),
    "maslo-gidravlicheskoe-mge-46v": ("/products/mge-46v.jpg", 600, 600),
    "maslo-gidravlicheskoe-vmgz": ("/products/vmgz.jpg", 338, 350),
    "maslo-gidravlicheskoe-vmgz-45": ("/products/vmgz-45.jpg", 600, 600),
    "maslo-gidravlicheskoe-vmgz-60": ("/products/vmgz-60.jpg", 372, 600),
    "maslo-gidravlicheskoe-mge-10a": ("/products/mge-10a.jpg", 600, 600),
    "maslo-gidravlicheskoe-marki-a": ("/products/gidravlika-marki-a.jpg", 372, 600),
    "maslo-gidravlicheskoe-marki-r": ("/products/gidravlika-marki-r.jpg", 372, 600),
    "maslo-gidravlicheskoe-hvlp-22": ("/products/hvlp-22.jpg", 372, 600),
    "maslo-gidravlicheskoe-hvlp-32": ("/products/hvlp-32.jpg", 600, 600),
    "maslo-gidravlicheskoe-hvlp-46": ("/products/hvlp-46.jpg", 600, 600),
    "maslo-gidravlicheskoe-hvlp-68": ("/products/hvlp-68.jpg", 372, 600),
    "maslo-gidravlicheskoe-mgt": ("/products/mgt.jpg", 600, 600),
    # Трансмиссионное масло
    "maslo-transmissionnoe-tep-15": ("/products/tep-15.jpg", 600, 600),
    "maslo-transmissionnoe-gl-5-80w90": ("/products/gl5-80w90.jpg", 338, 350),
    "maslo-transmissionnoe-tap-15v-2": ("/products/tap-15v.jpg", 338, 350),
    "maslo-transmissionnoe-sinteticheskoe-sae-75w90-api-gl-4-gl-5": ("/products/75w-90.jpg", 600, 600),
    # Масло индустриальное
    "maslo-industrialnoe-i-20a": ("/products/i-20a.jpg", 600, 600),
    "maslo-industrialnoe-i-40a": ("/products/i-40a.jpg", 600, 600),
    "maslo-industrialnoe-igp-38": ("/products/igp-38.jpg", 338, 350),
    "maslo-industrialnoe-i-50a": ("/products/i-50a.jpg", 500, 500),
    "maslo-industrialnoe-i-12a": ("/products/i-20a-kanistra.jpg", 250, 283),
    "maslo-industrialnoe-igp-18": ("/products/igp-38-kanistra.jpg", 250, 283),
    # Масло компрессорное
    "maslo-kompressornoe-ks-19": ("/products/ks-19.png", 362, 430),
    "maslo-kompressornoe-ks-19p": ("/products/ks-19.png", 362, 430),
    # Масла редукторные
    "maslo-reduktornoe-clp-100": ("/products/clp-100.jpg", 372, 600),
    "maslo-reduktornoe-clp-150": ("/products/clp-150.jpg", 248, 400),
    "maslo-reduktornoe-clp-220": ("/products/clp-220.jpg", 248, 400),
    "maslo-reduktornoe-clp-320": ("/products/clp-100.jpg", 372, 600),
}


def local_image(slug):
    return IMAGE_BY_SLUG.get(slug, DEFAULT_IMAGE)


SPEC_PATTERNS = [
    ("Технические условия", r"(?:Технические условия)\s+((?:ТУ BY|ГОСТ)[\d.\- ]+)"),
    ("Кинематическая вязкость при 100°С", r"Кинематическая вязкость при 100С\s+([\d,\-.]+)"),
    ("Кинематическая вязкость при 40°С", r"Кинематическая вязкость при 40С\s+([\d,\-.]+)"),
    ("Температура застывания, °С", r"Температура застывания,?\s*С\s+(-?[\d,]+)"),
    ("Кислотное число, мг КОН/г", r"Кислотное число, мг КОН/г, не более\s+([\d,]+)"),
]


def extract_specs(text):
    specs = []
    for label, pat in SPEC_PATTERNS:
        m = re.search(pat, text)
        if m:
            specs.append({"label": label, "value": m.group(1).strip()})
    return specs


def short_description(text, name):
    # Берём фрагмент после блока "Описание Применение ..." если есть
    m = re.search(r"Применение\s+(.+?)\s+Ключевые особенности", text)
    if m:
        return m.group(1).strip()
    m = re.search(r"Применение\s+(.+?)\s+(?:Характеристики|Преимущества)", text)
    if m:
        return m.group(1).strip()
    return ""


def main():
    with open(CSV_PATH, "r", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))

    products = []
    categories = {}
    functions = []

    for r in rows:
        if r["type"] == "product":
            slug = slug_from_url(r["source_url"])
            cat_title, cat_slug = guess_category(slug, r["name"], r["category"])
            categories.setdefault(cat_slug, {"slug": cat_slug, "title": cat_title, "count": 0})
            categories[cat_slug]["count"] += 1
            img, img_w, img_h = local_image(slug)
            products.append({
                "slug": slug,
                "name": r["name"],
                "article": r["article"],
                "category": cat_title,
                "categorySlug": cat_slug,
                "image": img,
                "imageWidth": img_w,
                "imageHeight": img_h,
                "sourceUrl": r["source_url"],
                "specs": extract_specs(r["full_text"]),
                "description": short_description(r["full_text"], r["name"]),
            })
        elif r["type"] == "function":
            functions.append({
                "name": r["function_name"],
                "text": r["name"],
                "link": r["link"],
            })

    # Уникальные функции по (name, link)
    seen = set()
    uniq_functions = []
    for fn in functions:
        key = (fn["name"], fn["link"])
        if key in seen:
            continue
        seen.add(key)
        uniq_functions.append(fn)

    data = {
        "categories": sorted(categories.values(), key=lambda c: c["title"]),
        "products": products,
        "functions": uniq_functions,
        "contacts": {
            "phones": ["8 (044) 774-41-40", "+375 (44) 796-81-53"],
            "email": "2123089@mail.ru",
        },
    }

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"OK: {len(products)} товаров, {len(categories)} категорий, "
          f"{len(uniq_functions)} функций -> {OUT_PATH}")


if __name__ == "__main__":
    main()
