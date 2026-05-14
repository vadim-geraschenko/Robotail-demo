import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Minus,
  Phone,
  Plus,
  ScanLine,
  ShieldCheck,
  ShoppingCart,
  X,
} from 'lucide-react';
import heroImage from './assets/product/1_11zon.webp';
import sideImage from './assets/product/2_11zon.webp';
import arenaImage from './assets/product/3_11zon.webp';
import detailImage from './assets/product/4_11zon.webp';
import screenImage from './assets/product/5_11zon.webp';
import controlsImage from './assets/product/6_11zon.webp';
import prizeImage from './assets/product/7_11zon.webp';
import cabinetImage from './assets/product/8_11zon.webp';
import paymentImage from './assets/product/9_11zon.webp';
import lightImage from './assets/product/10_11zon.webp';
import twinImage from './assets/product/11_11zon.webp';
import backImage from './assets/product/12_11zon.webp';
import darkImage from './assets/product/бм_темнота.webp';

const basePrice = 630000;

const product = {
  sku: 'rr_030',
  title: 'Автомат морской бой «Бродяги морей»',
  maker: 'Robotic Retailers',
  country: 'Россия',
  description:
    'Двусторонний аркадный автомат с механикой двойной оплаты, призовым модулем и QR-бонусами для ТРЦ, игровых клубов и развлекательных центров.',
};

const options = [
  { id: 'coin', label: 'Монетоприемник', price: 10000, note: 'Прием монет для классического сценария оплаты.' },
  { id: 'bill', label: 'Купюроприемник', price: 35000, note: 'Полноценный прием наличных с кешбоксом.' },
  { id: 'lite', label: 'Купюроприемник Lite без кешбокса', price: 14000, note: 'Упрощенная наличная комплектация.' },
  {
    id: 'terminal',
    label: 'Безналичный терминал',
    price: 18000,
    note: 'Оплата картой, учет выручки, Wi-Fi и VIP SIM.',
  },
];

const gallery = [
  { src: heroImage, label: 'Общий вид автомата', caption: 'Корпус, две стороны и призовой модуль в одном кадре.', position: 'center' },
  { src: twinImage, label: 'Две игровые стороны', caption: 'Два игровых места для парной игры или игры с ботом.', position: 'center' },
  { src: arenaImage, label: 'Игровое поле', caption: 'Поле морского боя и механика снарядов.', position: 'center' },
  { src: controlsImage, label: 'Панель управления', caption: 'Органы управления и зона игрока крупным планом.', position: 'center' },
  { src: prizeImage, label: 'Призовая зона', caption: 'Витрина, хоппер и мотивация повторной игры.', position: 'center' },
  { src: paymentImage, label: 'Платёжный модуль', caption: 'Зоны оплаты для коммерческой эксплуатации.', position: 'center' },
  { src: darkImage, label: 'Подсветка корпуса', caption: 'Неон и пиратская тема как магнит в проходном трафике.', position: 'center' },
  { src: cabinetImage, label: 'Корпус автомата', caption: 'Дерево, форма бочки и фронтальная витрина.', position: 'center' },
  { src: detailImage, label: 'Детали экрана', caption: 'Экранная зона и оформление интерфейса.', position: 'center' },
  { src: screenImage, label: 'Оформление игры', caption: 'Игровой процесс и уровни сложности бота.', position: 'center' },
  { src: lightImage, label: 'Световой контур', caption: 'Акцентная подсветка без лишнего декора.', position: 'center' },
  { src: sideImage, label: 'Боковая проекция', caption: 'Габарит и профиль корпуса для планирования установки.', position: 'center' },
  { src: backImage, label: 'Задняя часть', caption: 'Технический вид задней части автомата.', position: 'center' },
];

const revenueReasons = [
  {
    eyebrow: '01 / платежи',
    title: 'Две оплаты за один матч',
    text: 'Оба игрока участвуют в оплате, поэтому парная игра повышает средний чек с одной сессии.',
    image: paymentImage,
    className: 'reason-card-large',
    visual: '2 игрока = 2 оплаты',
    position: 'center',
  },
  {
    eyebrow: '02 / поток',
    title: 'Две стороны работают параллельно',
    text: 'Одна сторона принимает игрока против бота, другая остается доступной для второго сценария.',
    image: twinImage,
    className: 'reason-card-split',
    visual: 'левая сторона / правая сторона',
    position: 'center',
  },
  {
    eyebrow: '03 / повтор',
    title: 'Призовая механика',
    text: 'Хоппер, витрина призов и QR-бонусы дают понятный повод сыграть снова.',
    image: prizeImage,
    className: 'reason-card-compact',
    visual: 'хоппер + витрина + QR',
    position: 'center',
  },
  {
    eyebrow: '04 / внимание',
    title: 'Цепляет проходной трафик',
    text: 'Деревянный корпус, пиратская тема и подсветка считываются издалека в ТРЦ.',
    image: darkImage,
    className: 'reason-card-tall',
    visual: 'акцент в зоне трафика',
    position: 'center',
  },
  {
    eyebrow: '05 / удержание',
    title: '5 уровней сложности бота',
    text: 'Новичкам проще начать, а постоянным игрокам есть куда повышать сложность.',
    image: screenImage,
    className: 'reason-card-wide',
    visual: 'уровни 1-5',
    position: 'center',
  },
];

const specs = [
  ['Производитель', 'Robotic Retailers'],
  ['Страна', 'Россия'],
  ['Вес', '181 кг'],
  ['Мощность', '300-400 Вт'],
  ['Габариты', '155 × 139 × 165 см'],
  ['Напряжение', '220 V'],
];

const money = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

function formatMoney(value: number) {
  return money.format(Math.max(0, Math.round(value)));
}

function formatMonths(value: number) {
  if (!Number.isFinite(value)) return '—';
  if (value < 1) return 'менее 1 мес.';
  return `${value.toFixed(value < 10 ? 1 : 0).replace('.', ',')} мес.`;
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

function Slider({ label, value, min, max, step = 1, suffix = '', onChange }: SliderProps) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <label className="roi-slider">
      <span className="roi-slider-top">
        <span>{label}</span>
        <strong>{suffix === '₽' ? formatMoney(value) : `${value}${suffix}`}</strong>
      </span>
      <input
        className="roi-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ '--range-progress': `${progress}%` } as React.CSSProperties}
        onInput={(event) => onChange(Number(event.currentTarget.value))}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
      <span className="roi-slider-scale">
        <span>{suffix === '₽' ? formatMoney(min) : `${min}${suffix}`}</span>
        <span>{suffix === '₽' ? formatMoney(max) : `${max}${suffix}`}</span>
      </span>
    </label>
  );
}

function App() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['terminal']);
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
    const paybackMonths = monthlyProfit > 0 ? unitPrice / monthlyProfit : Infinity;
    return {
      monthlyRevenue,
      monthlyExpenses,
      monthlyProfit,
      paybackMonths,
    };
  }, [daysPerMonth, paymentsPerDay, pricePerGame, rent, serviceCost, unitPrice]);

  const toggleOption = (id: string) => {
    setSelectedOptions((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const moveGallery = (direction: 1 | -1) => {
    setActiveImage((current) => (current + direction + gallery.length) % gallery.length);
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
              onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
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
              <button type="button" onClick={() => moveGallery(-1)} aria-label="Предыдущее фото">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <strong>{activeGalleryItem.label}</strong>
                <p>{activeGalleryItem.caption}</p>
              </div>
              <button type="button" onClick={() => moveGallery(1)} aria-label="Следующее фото">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="gallery-dots" aria-label="Навигация по фото">
              {gallery.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={activeImage === index ? 'is-active' : ''}
                  aria-label={`Показать фото: ${image.label}`}
                />
              ))}
            </div>
          </section>

          <div className="hero-side">
            <div className="hero-copy">
              <div className="tech-line">
                <span>Артикул {product.sku}</span>
                <span>{product.maker}</span>
                <span>{product.country}</span>
              </div>
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
                    <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Уменьшить количество">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label="Увеличить количество">
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
                  <ShoppingCart className="h-5 w-5" />
                  В корзину
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
          <span>
            Конструкция, два игровых сценария, платежные опции и призовая мотивация работают вместе на повторные оплаты.
          </span>
        </div>

        <div className="revenue-grid">
          {revenueReasons.map((reason) => (
            <article key={reason.title} className={`reason-card ${reason.className}`}>
              <div className="reason-media">
                <img src={reason.image} alt="" style={{ objectPosition: reason.position }} />
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
          <p>
            Расчёт показывает примерную экономику выбранной комплектации. Он помогает оценить порядок цифр до разговора с менеджером.
          </p>
          <ul>
            <li>цена игры и поток оплат;</li>
            <li>аренда, сервис и призовой фонд;</li>
            <li>пересчет при смене комплектации.</li>
          </ul>
        </div>

        <div className="roi-panel">
          <div className="roi-inputs">
            <Slider label="Цена игры" value={pricePerGame} min={50} max={500} step={10} suffix="₽" onChange={setPricePerGame} />
            <Slider label="Оплат в день" value={paymentsPerDay} min={10} max={400} step={5} onChange={setPaymentsPerDay} />
            <Slider label="Дней работы в месяц" value={daysPerMonth} min={15} max={31} onChange={setDaysPerMonth} />
            <Slider label="Аренда места" value={rent} min={0} max={200000} step={5000} suffix="₽" onChange={setRent} />
            <Slider label="Обслуживание и призовой фонд" value={serviceCost} min={0} max={150000} step={5000} suffix="₽" onChange={setServiceCost} />
          </div>

          <div className="roi-result">
            <div className="roi-metric roi-metric-main">
              <span>Примерная окупаемость</span>
              <strong>{roi.monthlyProfit > 0 ? formatMonths(roi.paybackMonths) : 'не окупается'}</strong>
            </div>
            <div className="roi-metric-grid">
              <div className="roi-metric">
                <span>Выручка в месяц</span>
                <strong>{formatMoney(roi.monthlyRevenue)}</strong>
              </div>
              <div className="roi-metric">
                <span>Расходы</span>
                <strong>{formatMoney(roi.monthlyExpenses)}</strong>
              </div>
              <div className="roi-metric">
                <span>Прибыль</span>
                <strong>{roi.monthlyProfit > 0 ? formatMoney(roi.monthlyProfit) : 'ниже нуля'}</strong>
              </div>
            </div>
            <p className="roi-disclaimer">
              Расчёт ориентировочный и зависит от локации, трафика, цены игры и условий обслуживания.
            </p>
          </div>
        </div>
      </section>

      <section className="spec-section">
        <div className="spec-copy">
          <p>Технические данные</p>
          <h2>Характеристики для установки</h2>
          <span>
            Габариты, вес и питание важны для выбора места в ТРЦ, игровом клубе или развлекательном центре.
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
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фото">
          <button type="button" className="lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="Закрыть">
            <X className="h-5 w-5" />
          </button>
          <button type="button" className="lightbox-nav lightbox-prev" onClick={() => moveGallery(-1)} aria-label="Предыдущее фото">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <img src={activeGalleryItem.src} alt={activeGalleryItem.label} />
          <button type="button" className="lightbox-nav lightbox-next" onClick={() => moveGallery(1)} aria-label="Следующее фото">
            <ArrowRight className="h-5 w-5" />
          </button>
          <p>{activeGalleryItem.label}</p>
        </div>
      )}
    </main>
  );
}

export default App;
