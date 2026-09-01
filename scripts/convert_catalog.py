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
            products.append({
                "slug": slug,
                "name": r["name"],
                "article": r["article"],
                "category": cat_title,
                "categorySlug": cat_slug,
                "image": r["image_url"],
                "imageWidth": int(r["image_width"]) if r["image_width"] else None,
                "imageHeight": int(r["image_height"]) if r["image_height"] else None,
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
