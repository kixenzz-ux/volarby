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

## Деплой (Vercel, бесплатный тариф)

Сайт полностью статический — все 74 страницы прегенерируются на сборке,
серверных зависимостей (БД, API-роуты, переменные окружения) нет. Поэтому
бесплатного тарифа Vercel Hobby достаточно.

1. Создать на GitHub пустой репозиторий (без README и .gitignore), например
   `volar-catalog-v2`.
2. Привязать и отправить код:

   ```bash
   git remote add origin https://github.com/<логин>/volar-catalog-v2.git
   git push -u origin main
   ```

3. На https://vercel.com/new войти через GitHub, выбрать репозиторий и нажать
   Deploy. Настройки менять не нужно — Vercel сам определяет Next.js
   (`next build`, вывод `.next`).
4. Через ~2 минуты сайт доступен по адресу вида
   `https://volar-catalog-v2.vercel.app`. Каждый следующий `git push` в `main`
   пересобирает и публикует сайт автоматически.

Альтернатива без GitHub — CLI (потребуется вход через браузер один раз):

```bash
npx vercel login
npx vercel --prod
```

## Замечания

- Изображения берутся напрямую с `volar.by` (разрешено в `next.config.ts`
  через `images.remotePatterns`).
- Данные демонстрационные — получены парсером с сайта volar.by.

