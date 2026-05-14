import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Info,
  Minus,
  Phone,
  Plus,
  ScanLine,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";
import heroImage from "./assets/product/1_11zon.webp";
import sideImage from "./assets/product/2_11zon.webp";
import arenaImage from "./assets/product/3_11zon.webp";
import detailImage from "./assets/product/4_11zon.webp";
import screenImage from "./assets/product/5_11zon.webp";
import controlsImage from "./assets/product/6_11zon.webp";
import prizeImage from "./assets/product/7_11zon.webp";
import cabinetImage from "./assets/product/8_11zon.webp";
import paymentImage from "./assets/product/9_11zon.webp";
import lightImage from "./assets/product/10_11zon.webp";
import twinImage from "./assets/product/11_11zon.webp";
import backImage from "./assets/product/12_11zon.webp";
import darkImage from "./assets/product/бм_темнота.webp";

const basePrice = 630000;

const product = {
  sku: "rr_030",
  title: "Автомат морской бой «Бродяги морей»",
  maker: "Robotic Retailers",
  country: "Россия",
  description:
    "Двусторонний аркадный автомат с механикой двойной оплаты, призовым модулем и QR-бонусами для ТРЦ, игровых клубов и развлекательных центров.",
};

const options = [
  {
    id: "coin",
    label: "Монетоприемник",
    price: 10000,
    note: "Прием монет для классического сценария оплаты.",
  },
  {
    id: "bill",
    label: "Купюроприемник",
    price: 35000,
    note: "Полноценный прием наличных с кешбоксом.",
  },
  {
    id: "lite",
    label: "Купюроприемник Lite без кешбокса",
    price: 14000,
    note: "Упрощенная наличная комплектация.",
  },
  {
    id: "terminal",
    label: "Безналичный терминал",
    price: 18000,
    note: "Оплата картой, учет выручки, Wi-Fi и VIP SIM.",
  },
];

const gallery = [
  {
    src: heroImage,
    label: "Общий вид автомата",
    caption: "Корпус, две стороны и призовой модуль в одном кадре.",
    position: "center",
  },
  {
    src: twinImage,
    label: "Две игровые стороны",
    caption: "Два игровых места для парной игры или игры с ботом.",
    position: "center",
  },
  {
    src: arenaImage,
    label: "Украшение",
    caption: "Тропическая пальма и попугай в пиратском духе.",
    position: "center",
  },
  {
    src: controlsImage,
    label: "Платёжка",
    caption: "Монетоприемник, купюроприемник, терминал.",
    position: "center",
  },
  {
    src: prizeImage,
    label: "Призовая зона",
    caption: "Витрина, хоппер и мотивация повторной игры.",
    position: "center",
  },
  {
    src: paymentImage,
    label: "Вид по центру",
    caption: "Угол между автоматами не повзоляет смотреть в экран противника.",
    position: "center",
  },
  {
    src: darkImage,
    label: "Подсветка корпуса",
    caption: "Неон и пиратский дизайн привлекают внимание.",
    position: "center",
  },
  {
    src: cabinetImage,
    label: "Панель управления",
    caption: "Интуитивно понятные кнопки для игры.",
    position: "center",
  },
  {
    src: detailImage,
    label: "Декор",
    caption: "Яркая надпись и красивая картинка.",
    position: "center",
  },
  {
    src: screenImage,
    label: "Декор",
    caption: "Картинка крупным планом.",
    position: "center",
  },
  {
    src: lightImage,
    label: "Декор",
    caption: "Бочка с пиратскими сокровищами.",
    position: "center",
  },
  {
    src: sideImage,
    label: "Декор",
    caption: "Яркая надпись и красивая картинка.",
    position: "center",
  },
  {
    src: backImage,
    label: "Интерфейс начала игры",
    caption: "Можно сыграть как с другом, так и с ботом.",
    position: "center",
  },
];

const revenueReasons = [
  {
    eyebrow: "01 / платежи",
    title: "Две оплаты за один матч",
    text: "Оба игрока участвуют в оплате, поэтому парная игра повышает средний чек с одной сессии.",
    image: paymentImage,
    className: "reason-card-large",
    visual: "2 игрока = 2 оплаты",
    position: "center",
  },
  {
    eyebrow: "02 / поток",
    title: "Две стороны работают параллельно",
    text: "Если один человек играет против бота, вторая сторона свободна для игры.",
    image: twinImage,
    className: "reason-card-split",
    visual: "независимые игры",
    position: "center",
  },
  {
    eyebrow: "03 / повтор",
    title: "Призовая механика",
    text: "Хоппер, витрина призов и QR-бонусы дают понятный повод сыграть снова.",
    image: prizeImage,
    className: "reason-card-compact",
    visual: "хоппер + витрина + QR",
    position: "center",
  },
  {
    eyebrow: "04 / внимание",
    title: "Привлекает внимание",
    text: "Деревянный корпус, пиратская тема и неоновая подсветка моментально заинтересуют прохожих.",
    image: darkImage,
    className: "reason-card-tall",
    visual: "Магнит для внимания",
    position: "center",
  },
  {
    eyebrow: "05 / удержание",
    title: "5 уровней сложности бота",
    text: "Новичкам проще начать, а постоянным игрокам есть куда повышать сложность.",
    image: screenImage,
    className: "reason-card-wide",
    visual: "уровни 1-5",
    position: "center",
  },
];

const specs = [
  ["Производитель", "Robotic Retailers"],
  ["Страна", "Россия"],
  ["Вес", "181 кг"],
  ["Мощность", "300-400 Вт"],
  ["Габариты", "155 × 139 × 165 см"],
  ["Напряжение", "220 V"],
];

const money = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

function formatMoney(value: number) {
  return money.format(Math.max(0, Math.round(value)));
}

function formatChartMoney(value: number) {
  const rounded = Math.round(value / 1000) * 1000;
  const abs = Math.abs(rounded);
  const sign = rounded < 0 ? "-" : "";
  if (abs >= 1000000)
    return `${sign}${(abs / 1000000).toFixed(abs >= 10000000 ? 0 : 1).replace(".", ",")} млн ₽`;
  return `${sign}${Math.round(abs / 1000)}к ₽`;
}

function formatMonths(value: number) {
  if (!Number.isFinite(value)) return "—";
  if (value < 1) return "менее 1 мес.";
  return `${value.toFixed(value < 10 ? 1 : 0).replace(".", ",")} мес.`;
}

function formatDays(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${Math.max(1, Math.round(value))} дней`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
};

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: SliderProps) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <label className="roi-slider">
      <span className="roi-slider-top">
        <span>{label}</span>
        <strong>
          {suffix === "₽" ? formatMoney(value) : `${value}${suffix}`}
        </strong>
      </span>
      <input
        className="roi-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--range-progress": `${progress}%` } as React.CSSProperties}
        onInput={(event) => onChange(Number(event.currentTarget.value))}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
      <span className="roi-slider-scale">
        <span>{suffix === "₽" ? formatMoney(min) : `${min}${suffix}`}</span>
        <span>{suffix === "₽" ? formatMoney(max) : `${max}${suffix}`}</span>
      </span>
    </label>
  );
}

type PaybackChartProps = {
  investment: number;
  dailyProfit: number;
  paybackDays: number;
};

function PaybackChart({
  investment,
  dailyProfit,
  paybackDays,
}: PaybackChartProps) {
  const width = 720;
  const height = 220;
  const pad = { left: 58, right: 28, top: 18, bottom: 42 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const xMax = Number.isFinite(paybackDays)
    ? Math.max(60, Math.ceil((paybackDays + 12) / 15) * 15)
    : 60;
  const samples = Array.from({ length: 37 }, (_, index) => (xMax / 36) * index);
  const rawValues = samples.map((day) => dailyProfit * day - investment);
  const yMin = Math.min(-investment, ...rawValues, 0);
  const yMax = Math.max(0, ...rawValues, dailyProfit * xMax - investment);
  const yPadding = Math.max(80000, (yMax - yMin) * 0.1);
  const min = yMin - yPadding;
  const max = yMax + yPadding;
  const x = (day: number) => pad.left + (day / xMax) * chartWidth;
  const y = (value: number) =>
    pad.top + ((max - value) / (max - min || 1)) * chartHeight;
  const path = samples
    .map(
      (day, index) =>
        `${index === 0 ? "M" : "L"} ${x(day).toFixed(1)} ${y(dailyProfit * day - investment).toFixed(1)}`,
    )
    .join(" ");
  const zeroY = y(0);
  const markerDay = Number.isFinite(paybackDays)
    ? clamp(paybackDays, 0, xMax)
    : xMax;
  const markerX = x(markerDay);
  const ticks = [0, Math.round(xMax / 2), Math.round(xMax * 0.75), xMax];
  const yTicks = [max - yPadding, (max + min) / 2, 0, min + yPadding].filter(
    (value, index, array) =>
      index ===
      array.findIndex((item) => Math.round(item) === Math.round(value)),
  );

  return (
    <div className="roi-chart-card" aria-label="График окупаемости">
      <div className="roi-chart-kpi">
        <span>Примерная окупаемость</span>
        <strong>
          {dailyProfit > 0 ? formatMonths(paybackDays / 30) : "не окупается"}
        </strong>
        <p>
          {dailyProfit > 0
            ? `Точка выхода в плюс: ~${formatDays(paybackDays)}`
            : "Увеличьте выручку или снизьте расходы"}
        </p>
        <b>
          <WalletCards className="h-4 w-4" />
          Стоимость комплекта: {formatMoney(investment)}
        </b>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Накопленная прибыль по дням"
      >
        <defs>
          <linearGradient id="roiLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8a2cff" />
            <stop offset="54%" stopColor="#6256ff" />
            <stop offset="100%" stopColor="#31d7f4" />
          </linearGradient>
          <linearGradient id="roiArea" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#31d7f4" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8a2cff" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(tick)}
              y2={y(tick)}
              className="roi-grid-line"
            />
            <text
              x={pad.left - 12}
              y={y(tick) + 4}
              textAnchor="end"
              className="roi-axis-label"
            >
              {formatChartMoney(tick)}
            </text>
          </g>
        ))}
        <line
          x1={pad.left}
          x2={width - pad.right}
          y1={zeroY}
          y2={zeroY}
          className="roi-zero-line"
        />
        <path
          d={`${path} L ${width - pad.right} ${zeroY} L ${pad.left} ${zeroY} Z`}
          fill="url(#roiArea)"
        />
        <path d={path} className="roi-curve" />
        {dailyProfit > 0 && (
          <>
            <line
              x1={markerX}
              x2={markerX}
              y1={pad.top}
              y2={height - pad.bottom}
              className="roi-marker-line"
            />
            <circle cx={markerX} cy={zeroY} r="7" className="roi-marker-dot" />
            <foreignObject
              x={clamp(markerX - 52, pad.left, width - pad.right - 104)}
              y={pad.top + 4}
              width="104"
              height="34"
            >
              <div className="roi-marker-label">Окупаемость</div>
            </foreignObject>
          </>
        )}
        <line
          x1={pad.left}
          x2={pad.left}
          y1={pad.top}
          y2={height - pad.bottom}
          className="roi-axis-line"
        />
        {ticks.map((tick) => (
          <text
            key={tick}
            x={x(tick)}
            y={height - 12}
            textAnchor={tick === 0 ? "start" : tick === xMax ? "end" : "middle"}
            className="roi-x-label"
          >
            {tick === 0 ? "Старт" : `${tick} дней`}
          </text>
        ))}
      </svg>
    </div>
  );
}

function App() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "terminal",
  ]);
  const [quantity, setQuantity] = useState(1);
  const [pricePerGame, setPricePerGame] = useState(200);
  const [paymentsPerDay, setPaymentsPerDay] = useState(80);
  const [daysPerMonth, setDaysPerMonth] = useState(30);
  const [rent, setRent] = useState(30000);
  const [serviceCost, setServiceCost] = useState(15000);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const unitPrice = useMemo(() => {
    return (
      basePrice +
      options
        .filter((option) => selectedOptions.includes(option.id))
        .reduce((sum, option) => sum + option.price, 0)
    );
  }, [selectedOptions]);

  const totalPrice = unitPrice * quantity;

  const roi = useMemo(() => {
    const monthlyRevenue = pricePerGame * paymentsPerDay * daysPerMonth;
    const monthlyExpenses = rent + serviceCost;
    const monthlyProfit = monthlyRevenue - monthlyExpenses;
    const paybackMonths =
      monthlyProfit > 0 ? unitPrice / monthlyProfit : Infinity;
    const dailyProfit = daysPerMonth > 0 ? monthlyProfit / daysPerMonth : 0;
    const paybackDays = dailyProfit > 0 ? unitPrice / dailyProfit : Infinity;
    const dailyNet = daysPerMonth > 0 ? monthlyProfit / daysPerMonth : 0;
    const annualProfit = monthlyProfit * 12;
    const margin =
      monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0;
    const scenarios = [
      {
        label: "Осторожный",
        months:
          monthlyProfit * 0.48 > 0
            ? unitPrice / (monthlyProfit * 0.48)
            : Infinity,
        accent: "#cdb8ff",
      },
      { label: "Базовый", months: paybackMonths, accent: "#6256ff" },
      {
        label: "Оптимистичный",
        months:
          monthlyProfit * 1.45 > 0
            ? unitPrice / (monthlyProfit * 1.45)
            : Infinity,
        accent: "#31d7f4",
      },
    ];
    const maxScenarioMonths = Math.max(
      ...scenarios.map((item) =>
        Number.isFinite(item.months) ? item.months : 0,
      ),
      1,
    );
    const influences = [
      { label: "Оплат в день", score: 5, color: "#6f35ff" },
      { label: "Цена игры", score: 4, color: "#2c9dff" },
      { label: "Аренда", score: 3, color: "#31c7df" },
      { label: "Обслуживание", score: 2, color: "#76d8e8" },
    ];
    return {
      annualProfit,
      dailyNet,
      dailyProfit,
      influences,
      margin,
      monthlyRevenue,
      monthlyExpenses,
      monthlyProfit,
      paybackMonths,
      paybackDays,
      scenarios,
      maxScenarioMonths,
    };
  }, [
    daysPerMonth,
    paymentsPerDay,
    pricePerGame,
    rent,
    serviceCost,
    unitPrice,
  ]);

  const toggleOption = (id: string) => {
    setSelectedOptions((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const moveGallery = (direction: 1 | -1) => {
    setActiveImage(
      (current) => (current + direction + gallery.length) % gallery.length,
    );
  };

  const handleTouchEnd = (x: number) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - x;
    if (Math.abs(delta) > 42) moveGallery(delta > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const activeGalleryItem = gallery[activeImage];

  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-lockup">
            <span className="brand-mark">
              <ScanLine className="h-5 w-5" />
            </span>
            <span>
              <strong>Robotail</strong>
              <small>Аркадное оборудование</small>
            </span>
          </div>
          <a className="manager-link" href="tel:+78000000000">
            Связаться с менеджером
          </a>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-grid">
          <section className="gallery-card" aria-label="Галерея товара">
            <button
              type="button"
              className="gallery-main"
              onClick={() => setLightboxOpen(true)}
              onTouchStart={(event) => {
                touchStartX.current = event.changedTouches[0].clientX;
              }}
              onTouchEnd={(event) =>
                handleTouchEnd(event.changedTouches[0].clientX)
              }
              aria-label="Открыть фото товара"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeGalleryItem.src}
                  src={activeGalleryItem.src}
                  alt={activeGalleryItem.label}
                  style={{ objectPosition: activeGalleryItem.position }}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
              <span className="gallery-counter">
                {activeImage + 1} / {gallery.length}
              </span>
            </button>
            <div className="gallery-controls">
              <button
                type="button"
                onClick={() => moveGallery(-1)}
                aria-label="Предыдущее фото"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <strong>{activeGalleryItem.label}</strong>
                <p>{activeGalleryItem.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => moveGallery(1)}
                aria-label="Следующее фото"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="gallery-dots" aria-label="Навигация по фото">
              {gallery.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={activeImage === index ? "is-active" : ""}
                  aria-label={`Показать фото: ${image.label}`}
                />
              ))}
            </div>
          </section>

          <div className="hero-side">
            <div className="hero-copy">
              <h1>{product.title}</h1>
            </div>

            <aside className="purchase-panel" aria-label="Покупка автомата">
              <div className="price-head">
                <div>
                  <span className="price-label">Цена от</span>
                  <strong>{formatMoney(basePrice)}</strong>
                </div>
                <div className="unit-price">
                  <span>Итог за единицу</span>
                  <b>{formatMoney(unitPrice)}</b>
                </div>
              </div>

              <div className="configurator">
                <div className="section-label">Комплектация</div>
                <div className="option-list">
                  {options.map((option) => (
                    <label key={option.id} className="option-row">
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.id)}
                        onChange={() => toggleOption(option.id)}
                        className="sr-only"
                      />
                      <span className="option-check">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="option-body">
                        <span className="option-name">{option.label}</span>
                        <span className="option-note">{option.note}</span>
                      </span>
                      <strong>+{formatMoney(option.price)}</strong>
                    </label>
                  ))}
                </div>
              </div>

              <div className="purchase-bottom">
                <div>
                  <span className="section-label">Количество</span>
                  <div className="quantity-control" aria-label="Количество">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((value) => Math.max(1, value - 1))
                      }
                      aria-label="Уменьшить количество"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((value) => Math.min(99, value + 1))
                      }
                      aria-label="Увеличить количество"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="total-box">
                  <span>Итого</span>
                  <strong>{formatMoney(totalPrice)}</strong>
                </div>
              </div>

              <div className="cta-stack">
                <button type="button" className="primary-cta">
                  <ShoppingCart className="h-5 w-5" />В корзину
                </button>
                <button type="button" className="secondary-cta">
                  <CreditCard className="h-4 w-4" />
                  Лизинг
                </button>
                <a className="tertiary-cta" href="tel:+78000000000">
                  <Phone className="h-4 w-4" />
                  Связаться с менеджером
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="revenue-section">
        <div className="section-head">
          <div>
            <p>Экономика автомата</p>
            <h2>Почему автомат зарабатывает</h2>
          </div>
        </div>

        <div className="revenue-grid">
          {revenueReasons.map((reason) => (
            <article
              key={reason.title}
              className={`reason-card ${reason.className}`}
            >
              <div className="reason-media">
                <img
                  src={reason.image}
                  alt=""
                  style={{ objectPosition: reason.position }}
                />
              </div>
              <div className="reason-content">
                <span>{reason.eyebrow}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
                <b>{reason.visual}</b>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="roi-section">
        <div className="roi-intro">
          <p className="pill-label">
            <ShieldCheck className="h-3.5 w-3.5" />
            ROI-калькулятор
          </p>
          <h2>Ориентир по окупаемости</h2>
          <ul>
            <li>цена игры и поток оплат;</li>
            <li>аренда, сервис и призовой фонд;</li>
            <li>пересчет при смене комплектации.</li>
          </ul>
        </div>

        <div className="roi-dashboard">
          <div className="roi-inputs">
            <Slider
              label="Цена игры"
              value={pricePerGame}
              min={50}
              max={500}
              step={10}
              suffix="₽"
              onChange={setPricePerGame}
            />
            <Slider
              label="Оплат в день"
              value={paymentsPerDay}
              min={10}
              max={400}
              step={5}
              onChange={setPaymentsPerDay}
            />
            <Slider
              label="Дней работы в месяц"
              value={daysPerMonth}
              min={15}
              max={31}
              onChange={setDaysPerMonth}
            />
            <Slider
              label="Аренда места"
              value={rent}
              min={0}
              max={200000}
              step={5000}
              suffix="₽"
              onChange={setRent}
            />
            <Slider
              label="Обслуживание и призовой фонд"
              value={serviceCost}
              min={0}
              max={150000}
              step={5000}
              suffix="₽"
              onChange={setServiceCost}
            />
          </div>

          <div className="roi-output">
            <PaybackChart
              investment={unitPrice}
              dailyProfit={roi.dailyProfit}
              paybackDays={roi.paybackDays}
            />

            <div className="roi-summary-row">
              <div className="roi-stat-card">
                <span className="roi-icon-badge roi-icon-purple">
                  <WalletCards className="h-5 w-5" />
                </span>
                <div>
                  <span>Выручка в месяц</span>
                  <strong>{formatMoney(roi.monthlyRevenue)}</strong>
                  <p>
                    {formatMoney(pricePerGame)} × {paymentsPerDay} оплат ×{" "}
                    {daysPerMonth} дней
                  </p>
                </div>
              </div>
              <div className="roi-stat-card">
                <span className="roi-icon-badge roi-icon-blue">
                  <CreditCard className="h-5 w-5" />
                </span>
                <div>
                  <span>Расходы в месяц</span>
                  <strong>{formatMoney(roi.monthlyExpenses)}</strong>
                  <p>
                    {formatMoney(rent)} аренда + {formatMoney(serviceCost)}{" "}
                    обслуживание
                  </p>
                </div>
              </div>
            </div>

            <div className="roi-lower-grid">
              <div className="roi-donut-card">
                <span>Структура расходов</span>
                <div className="roi-donut-wrap">
                  <div
                    className="roi-donut"
                    style={
                      {
                        "--rent-share": `${roi.monthlyExpenses > 0 ? (rent / roi.monthlyExpenses) * 100 : 0}%`,
                      } as React.CSSProperties
                    }
                    aria-hidden="true"
                  />
                  <div className="roi-donut-legend">
                    <p>
                      <b className="legend-rent" />
                      Аренда места{" "}
                      <strong>
                        {formatMoney(rent)} (
                        {roi.monthlyExpenses > 0
                          ? Math.round((rent / roi.monthlyExpenses) * 100)
                          : 0}
                        %)
                      </strong>
                    </p>
                    <p>
                      <b className="legend-service" />
                      Обслуживание и призовой фонд{" "}
                      <strong>
                        {formatMoney(serviceCost)} (
                        {roi.monthlyExpenses > 0
                          ? Math.round(
                              (serviceCost / roi.monthlyExpenses) * 100,
                            )
                          : 0}
                        %)
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="roi-scenario-card">
                <span>Сценарии окупаемости</span>
                <div className="roi-scenario-list">
                  {roi.scenarios.map((scenario) => (
                    <div key={scenario.label} className="roi-scenario-row">
                      <p>{scenario.label}</p>
                      <div>
                        <span
                          style={{
                            width: `${Number.isFinite(scenario.months) ? clamp((scenario.months / roi.maxScenarioMonths) * 100, 8, 100) : 100}%`,
                            background: scenario.accent,
                          }}
                        />
                      </div>
                      <strong>
                        {Number.isFinite(scenario.months)
                          ? formatMonths(scenario.months)
                          : "—"}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="roi-profit-card">
                <TrendingUp className="roi-profit-arrow" />
                <span>Прибыль</span>
                <strong>
                  {roi.monthlyProfit > 0
                    ? `${formatMoney(roi.monthlyProfit)} / месяц`
                    : "ниже нуля"}
                </strong>
                <div className="roi-profit-mini">
                  <p>
                    <b>≈ {formatMoney(roi.dailyNet)}</b>
                    <span>/ день</span>
                  </p>
                  <p>
                    <b>≈ {formatMoney(roi.annualProfit)}</b>
                    <span>/ год</span>
                  </p>
                  <p>
                    <b>{Math.max(0, Math.round(roi.margin))}%</b>
                    <span>Маржа</span>
                  </p>
                </div>
                <div className="roi-profit-equation">
                  <span>
                    <b>{formatMoney(roi.monthlyRevenue)}</b>выручка
                  </span>
                  <i>−</i>
                  <span>
                    <b>{formatMoney(roi.monthlyExpenses)}</b>расходы
                  </span>
                  <i>=</i>
                  <span>
                    <b>
                      {roi.monthlyProfit > 0
                        ? formatMoney(roi.monthlyProfit)
                        : "0 ₽"}
                    </b>
                    прибыль
                  </span>
                </div>
              </div>

              <div className="roi-impact-card">
                <span>Что сильнее влияет на окупаемость</span>
                {roi.influences.map((item) => (
                  <div key={item.label} className="roi-impact-row">
                    <p>{item.label}</p>
                    <div>
                      <span
                        style={{
                          width: `${(item.score / 5) * 100}%`,
                          background: item.color,
                        }}
                      />
                    </div>
                    <strong>{item.score}/5</strong>
                  </div>
                ))}
              </div>
            </div>

            <p className="roi-disclaimer">
              <Info className="h-4 w-4" />
              Расчёт ориентировочный и зависит от локации, трафика, цены игры и
              условий обслуживания.
            </p>
          </div>
        </div>
      </section>

      <section className="spec-section">
        <div className="spec-copy">
          <p>Технические данные</p>
          <h2>Характеристики</h2>
          <span>
            Учитывайте габариты, вес, и энергопотребление! Они важны для выбора
            места в ТРЦ, игровом клубе или развлекательном центре.
          </span>
        </div>
        <dl className="spec-table">
          {specs.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {lightboxOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={() => moveGallery(-1)}
            aria-label="Предыдущее фото"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <img src={activeGalleryItem.src} alt={activeGalleryItem.label} />
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={() => moveGallery(1)}
            aria-label="Следующее фото"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <p>{activeGalleryItem.label}</p>
        </div>
      )}
    </main>
  );
}

export default App;
