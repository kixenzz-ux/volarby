# VOLAR.by — редизайн каталога (Next.js)

Современный интерфейс каталога масел, построенный на данных, собранных парсером
(`../volar-parser/volar_catalog.csv`).

## Стек

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Статическая генерация (SSG) всех страниц товаров и категорий

## Структура

```
src/
  app/
    layout.tsx              — корневой layout (шапка + подвал)
    page.tsx                — главная (hero, категории, популярные товары)
    catalog/page.tsx        — весь каталог
    catalog/[slug]/page.tsx — страница категории
    product/[slug]/page.tsx — карточка товара со спецификациями
    contacts/page.tsx       — контакты
  components/               — Header, Footer, ProductCard
  lib/catalog.ts            — типизированный доступ к данным
  data/catalog.json         — данные каталога (генерируются)
scripts/
  convert_catalog.py        — CSV -> catalog.json
```

## Обновление данных

После перезапуска парсера пересоберите JSON из CSV:

```bash
python scripts/convert_catalog.py
```

Скрипт:

- читает `../volar-parser/volar_catalog.csv`;
- восстанавливает категорию по slug товара, если в CSV она пустая;
- извлекает технические характеристики (ТУ BY/ГОСТ, вязкость, температура застывания);
- пишет `src/data/catalog.json`.

## Запуск

```bash
npm install
npm run dev      # разработка → http://localhost:3000
npm run build    # продакшен-сборка (проверка TypeScript)
npm start        # запуск собранного приложения
```

## Замечания

- Изображения берутся напрямую с `volar.by` (разрешено в `next.config.ts`
  через `images.remotePatterns`).
- Данные демонстрационные — получены парсером с сайта volar.by.

