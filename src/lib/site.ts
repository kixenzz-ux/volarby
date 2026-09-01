// Дополнительный информационный контент для сайта-каталога VOLAR.by.
// Каталожные данные (товары/категории) остаются в catalog.ts / catalog.json.

export type InfoLink = { label: string; href: string };

// Блок «Информация» в футере. Разделы-заглушки ведут на якорь,
// «Контакты» — на существующую страницу.
export const infoLinks: InfoLink[] = [
  { label: "О компании", href: "#" },
  { label: "Оплата", href: "#" },
  { label: "Доставка", href: "#" },
  { label: "Самовывоз", href: "#" },
  { label: "Статьи", href: "#" },
  { label: "Прайс-лист", href: "#" },
  { label: "Акции", href: "#" },
  { label: "Контакты", href: "/contacts" },
];

export type Company = {
  legalName: string;
  unp: string;
  registration: string;
  address: string;
  tradeRegister: string;
  hours: string[];
  email: string;
  phones: string[];
};

// Юридические и контактные данные компании (блок «Контакты» в футере).
export const company: Company = {
  legalName: 'ООО "ХимПромОил"',
  unp: "691772248",
  registration: "Регистрация Мингорисполком 02.09.2014",
  address: "г. Минск, ул. Ложинская, д.9, пом. 6Н",
  tradeRegister: "В торговом реестре под № 296206",
  hours: ["Пн-пт 09:00 до 17:00", "Сб-Вс выходной"],
  email: "2123089@mail.ru",
  phones: ["+375447744140", "8 (017) 388-00-41"],
};

export type Advantage = {
  icon: "quality" | "assortment" | "fuel";
  title: string;
  text: string;
};

// Преимущества моторных масел (блок на главной).
export const advantages: Advantage[] = [
  {
    icon: "quality",
    title: "Высокое качество и надежность",
    text: "Наши моторные масла производятся с использованием современных технологий и высококачественных компонентов. Это обеспечивает отличную защиту двигателя от износа и продлевает его срок службы.",
  },
  {
    icon: "assortment",
    title: "Широкий ассортимент",
    text: "Мы предлагаем разнообразные масла для всех типов двигателей: легковых, грузовых, мотоциклов и спецтехники. У нас вы найдёте как синтетические, так и полусинтетические, а также минеральные масла, подходящие для любых условий эксплуатации.",
  },
  {
    icon: "fuel",
    title: "Экономия топлива",
    text: "Использование качественного моторного масла снижает сопротивление движущихся частей, что может привести к экономии топлива и снижению выбросов вредных веществ в атмосферу.",
  },
];

// Изображения оформления сайта (public/site) — локальные копии с volar.by,
// поэтому не зависят от доступности внешнего хостинга.
export const siteImages = {
  logo: "/site/logo.png",
  logoMark: "/site/logo-mark.png",
  logoMarkWhite: "/site/logo-mark-white.png",
  heroBackground: "/site/doroga-gorod.jpg",
  heroProduct: "/products/volar-bochka.png",
  advantagesBanner: "/site/doroga-zakat.jpg",
  catalogBanner: "/site/maslo-naliv.jpg",
  delivery: "/site/benzovoz.jpg",
  barrelPhoto: "/site/bochka-volar-foto.jpg",
} as const;

// Обложка категории для карточек каталога.
export const categoryImages: Record<string, string> = {
  "motornoe-maslo": "/products/volar-ultra-5w40.jpg",
  "gidravlicheskoe-maslo": "/products/hlp-32.jpg",
  "transmissionnoe-maslo": "/products/tep-15.jpg",
  "maslo-industrialnoe": "/products/i-20a.jpg",
  "maslo-kompressornoe": "/products/ks-19.png",
  "masla-czepnye": "/products/volar-bochka.png",
  "masla-reduktornye": "/products/clp-100.jpg",
  "masla-turbinnye": "/products/mgt.jpg",
  "masla-zakalochnye": "/products/volar-bochka-sinyaya.jpg",
};

export function categoryImage(slug: string): string {
  return categoryImages[slug] ?? "/products/volar-bochka.png";
}
