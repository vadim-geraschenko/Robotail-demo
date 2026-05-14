import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  BadgePercent,
  Calculator,
  Check,
  ChevronRight,
  CreditCard,
  Gift,
  LandPlot,
  RadioTower,
  ShipWheel,
  Sparkles,
  Swords,
  Users,
  Zap,
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

const options = [
  { id: 'coin', label: 'Монетоприемник', price: 10000 },
  { id: 'bill', label: 'Купюроприемник', price: 35000 },
  { id: 'lite', label: 'Купюроприемник Lite без кешбокса', price: 14000 },
  { id: 'terminal', label: 'Терминал безнал + учёт выручки + Wi-Fi + VIP SIM', price: 18000 },
];

const gallery = [
  { src: heroImage, label: 'Общий вид автомата' },
  { src: darkImage, label: 'Подсветка в темном зале' },
  { src: arenaImage, label: 'Игровая сцена' },
  { src: detailImage, label: 'Игровой экран' },
  { src: sideImage, label: 'Две стороны корпуса' },
  { src: screenImage, label: 'Детали оформления' },
  { src: controlsImage, label: 'Панель управления' },
  { src: prizeImage, label: 'Призовая зона' },
  { src: cabinetImage, label: 'Корпус автомата' },
  { src: paymentImage, label: 'Платежный модуль' },
  { src: lightImage, label: 'Подсветка корпуса' },
  { src: twinImage, label: 'Двухсторонняя конфигурация' },
  { src: backImage, label: 'Задняя часть корпуса' },
];

const reasons = [
  {
    title: 'Двойная оплата',
    text: 'Когда играют двое, платят оба игрока.',
    icon: Users,
  },
  {
    title: 'Две стороны работают параллельно',
    text: 'Один игрок может играть с ботом, а вторая сторона — принимать другого игрока.',
    icon: Swords,
  },
  {
    title: 'Призовая механика',
    text: 'Хоппер, витрина призов и QR-бонусы повышают мотивацию играть снова.',
    icon: Gift,
  },
  {
    title: 'Цепляет проходной трафик',
    text: 'Яркий корпус, пиратская тема и подсветка работают как визуальный магнит в ТРЦ.',
    icon: Sparkles,
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
  if (value < 1) return 'до 1 мес.';
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
  return (
    <label className="block border-b border-white/10 py-4 last:border-b-0">
      <span className="flex items-center justify-between gap-3 text-xs text-white/64 sm:text-sm">
        <span>{label}</span>
        <strong className="text-sm font-black text-white sm:text-base">
          {suffix === '₽' ? formatMoney(value) : `${value}${suffix}`}
        </strong>
      </span>
      <input
        className="roi-range mt-3 w-full"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(event) => onChange(Number(event.currentTarget.value))}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
      <span className="mt-1.5 flex justify-between text-[11px] text-white/36">
        <span>{suffix === '₽' ? formatMoney(min) : `${min}${suffix}`}</span>
        <span>{suffix === '₽' ? formatMoney(max) : `${max}${suffix}`}</span>
      </span>
    </label>
  );
}

function App() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['terminal']);
  const [pricePerGame, setPricePerGame] = useState(200);
  const [paymentsPerDay, setPaymentsPerDay] = useState(80);
  const [daysPerMonth, setDaysPerMonth] = useState(30);
  const [rent, setRent] = useState(30000);
  const [serviceCost, setServiceCost] = useState(15000);
  const calcRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const totalPrice = useMemo(() => {
    return (
      basePrice +
      options
        .filter((option) => selectedOptions.includes(option.id))
        .reduce((sum, option) => sum + option.price, 0)
    );
  }, [selectedOptions]);

  const roi = useMemo(() => {
    const monthlyRevenue = pricePerGame * paymentsPerDay * daysPerMonth;
    const monthlyProfit = monthlyRevenue - rent - serviceCost;
    const paybackMonths = monthlyProfit > 0 ? totalPrice / monthlyProfit : Infinity;
    return {
      monthlyRevenue,
      monthlyProfit,
      paybackMonths,
      annualRevenue: monthlyRevenue * 12,
    };
  }, [daysPerMonth, paymentsPerDay, pricePerGame, rent, serviceCost, totalPrice]);

  const toggleOption = (id: string) => {
    setSelectedOptions((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const scrollToCalc = () => calcRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3efe6] text-[#171018]">
      <section className="hero-shell relative isolate min-h-screen px-4 pb-10 pt-4 text-white sm:px-6 lg:px-8">
        <div className="sonar-bg" aria-hidden="true" />
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs text-white/62 sm:text-sm">
          <div className="flex items-center gap-2 font-black tracking-[0.16em] text-white/78">
            <RadioTower className="h-3.5 w-3.5 text-[#59d3d8]" />
            ROBOTAIL DEMO
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span>Новинка</span>
            <span className="h-1 w-1 rounded-full bg-[#f2b94b]" />
            <span>Предзаказ</span>
          </div>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-7 pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:pt-12">
          <div className="relative z-30 lg:pb-14">
            <div className="mb-4 flex flex-wrap gap-2">
              {['Нет в наличии', 'Россия', 'Robotic Retailers'].map((item) => (
                <span key={item} className="border border-white/16 bg-white/[0.08] px-3 py-1 text-xs font-bold text-white/72 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#f2b94b]">
              Морской бой для коммерческих площадок
            </p>
            <h1 className="max-w-5xl font-display text-[44px] font-black leading-[0.88] tracking-normal sm:text-[78px] lg:max-w-[680px] lg:text-[82px] xl:text-[94px]">
              Автомат морской бой «Бродяги морей»
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72 lg:text-lg">
              Двухсторонний аркадный автомат с механикой двойной оплаты, призовым модулем и
              QR-бонусами. Для ТРЦ, игровых клубов и развлекательных центров, где важны трафик,
              вовлечение и повторные игры.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToCalc}
                className="group inline-flex items-center justify-center gap-2 bg-[#59d3d8] px-5 py-3 text-sm font-black text-[#071116] transition hover:bg-white"
              >
                <Calculator className="h-4 w-4" />
                Рассчитать окупаемость
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 border border-white/16 bg-white/[0.09] px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/16"
              >
                <CreditCard className="h-4 w-4" />
                Оформить предзаказ
              </button>
            </div>
          </div>

          <motion.div className="layered-product relative z-10 min-h-[430px] lg:min-h-[630px]" initial={false}>
            <div className="absolute left-0 top-8 z-20 w-[44%] overflow-hidden border border-white/14 bg-black shadow-2xl shadow-black/50">
              <img src={darkImage} alt="Автомат с подсветкой в темном зале" className="aspect-[4/5] h-full w-full object-cover opacity-90" />
            </div>
            <div className="absolute bottom-2 right-0 z-10 w-[86%] overflow-hidden border border-white/14 bg-black shadow-2xl shadow-black/50">
              <img src={heroImage} alt="Автомат морской бой Бродяги морей" className="aspect-[4/5] h-full w-full object-cover" />
            </div>
            <div className="absolute right-4 top-0 z-30 w-[46%] border border-[#f2b94b]/40 bg-[#f2b94b] p-3 text-[#171018] shadow-xl">
              <p className="text-xs font-black uppercase tracking-[0.16em] opacity-70">Цена от</p>
              <p className="mt-1 text-3xl font-black">{formatMoney(basePrice)}</p>
            </div>
            <div className="absolute bottom-10 left-5 z-30 grid grid-cols-3 gap-2 bg-white/10 p-2 backdrop-blur">
              {[controlsImage, prizeImage, sideImage].map((src) => (
                <img key={src} src={src} alt="" className="h-20 w-20 object-cover" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={calcRef} className="bg-[#171018] px-4 py-10 text-white sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 bg-[#59d3d8]/15 px-3 py-1 text-xs font-black text-[#59d3d8]">
              <BadgePercent className="h-3.5 w-3.5" />
              ROI-калькулятор
            </p>
            <h2 className="font-display text-3xl font-black leading-[0.95] sm:text-5xl">
              Посчитайте окупаемость под свою площадку
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/58 sm:text-base">
              Цена автомата — это только вход. Важнее понять, сколько он может приносить при вашем трафике.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border border-white/10 bg-white/[0.04] px-4">
              <Slider label="Цена игры" value={pricePerGame} min={50} max={500} step={10} suffix="₽" onChange={setPricePerGame} />
              <Slider label="Оплат в день" value={paymentsPerDay} min={10} max={400} step={5} onChange={setPaymentsPerDay} />
              <Slider label="Дней работы в месяц" value={daysPerMonth} min={15} max={31} onChange={setDaysPerMonth} />
              <Slider label="Аренда места в месяц" value={rent} min={0} max={200000} step={5000} suffix="₽" onChange={setRent} />
              <Slider label="Обслуживание и призовой фонд" value={serviceCost} min={0} max={150000} step={5000} suffix="₽" onChange={setServiceCost} />
            </div>

            <div className="grid content-between border border-[#f2b94b]/45 bg-[#f2b94b] p-4 text-[#171018]">
              <div className="grid grid-cols-2 gap-px bg-[#171018]/20">
                {[
                  ['Выручка в месяц', formatMoney(roi.monthlyRevenue), Zap],
                  ['Прибыль после расходов', roi.monthlyProfit > 0 ? formatMoney(roi.monthlyProfit) : 'ниже нуля', LandPlot],
                  ['Окупаемость', roi.monthlyProfit > 0 ? formatMonths(roi.paybackMonths) : 'не окупается', Calculator],
                  ['Выручка за год', formatMoney(roi.annualRevenue), RadioTower],
                ].map(([label, value, Icon]) => (
                  <div key={label as string} className="bg-[#f2b94b] p-3">
                    <Icon className="mb-3 h-4 w-4 opacity-70" />
                    <p className="text-[11px] font-black uppercase tracking-[0.1em] opacity-60">{label as string}</p>
                    <p key={value as string} className="mt-1 text-2xl font-black leading-none">{value as string}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-l-4 border-[#171018] pl-3">
                <p className="font-black">
                  {roi.monthlyProfit <= 0
                    ? 'При этих параметрах модель не окупается. Попробуйте увеличить трафик или цену игры.'
                    : `При выбранных настройках покупка может окупиться примерно за ${formatMonths(roi.paybackMonths)}`}
                </p>
                <p className="mt-1 text-sm leading-6 opacity-70">
                  Расчёт ориентировочный. Реальная окупаемость зависит от локации, трафика, цены игры и условий обслуживания.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <h2 className="font-display text-3xl font-black leading-none sm:text-5xl">Почему автомат зарабатывает</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#4c4248] sm:text-base">
              Игрок видит аттракцион, площадка видит понятный сценарий монетизации проходного трафика.
            </p>
            <div className="mt-5 w-fit bg-[#171018] px-3 py-2 text-xs font-black text-white sm:text-sm">
              5 уровней сложности бота
            </div>
          </div>

          <div className="feature-rail">
            {reasons.map(({ title, text, icon: Icon }, index) => (
              <article key={title} className="feature-row">
                <div className="feature-count">0{index + 1}</div>
                <div className="grid h-12 w-12 place-items-center bg-[#171018] text-[#59d3d8]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black leading-tight">{title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#5b5056]">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="masonry-product">
            {gallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`masonry-shot ${activeImage === index ? 'is-active' : ''}`}
                aria-label={`Показать фото: ${image.label}`}
              >
                <img src={image.src} alt={image.label} />
              </button>
            ))}
          </div>

          <div className="product-stage">
            <AnimatePresence mode="wait">
              <motion.img
                key={gallery[activeImage].src}
                src={gallery[activeImage].src}
                alt={gallery[activeImage].label}
                className="h-full w-full object-cover"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.03 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 to-transparent p-4 text-white">
              <div className="inline-flex items-center gap-2 bg-white/12 px-3 py-1.5 text-xs font-bold backdrop-blur">
                <ShipWheel className="h-3.5 w-3.5 text-[#f2b94b]" />
                {gallery[activeImage].label}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#171018] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden">
            <img src={twinImage} alt="Двухсторонний автомат" className="h-full min-h-[340px] w-full object-cover" />
          </div>
          <div className="tech-panel">
            <div>
              <h2 className="font-display text-3xl font-black leading-none sm:text-5xl">Характеристики без лишнего</h2>
              <p className="mt-4 text-sm leading-6 text-white/58 sm:text-base">
                Два соединенных корпуса, игра друг против друга или с ботом, хоппер для выдачи призов и возможность подключить витрину.
              </p>
            </div>
            <dl className="mt-6 grid gap-px bg-white/12 sm:grid-cols-2">
              {specs.map(([label, value]) => (
                <div key={label} className="bg-[#171018] p-4">
                  <dt className="text-xs font-black uppercase tracking-[0.12em] text-white/40">{label}</dt>
                  <dd className="mt-2 text-xl font-black">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <h2 className="font-display text-3xl font-black leading-none sm:text-5xl">
              Карточка должна не просто показывать товар — она должна помогать его купить.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-[#5b5056]">
              В этой версии клиент сразу видит сценарий использования, коммерческие преимущества и примерную экономику покупки.
            </p>
          </div>

          <div className="decision-interface mt-7">
            <div className="bg-[#171018] p-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-white/45">Конфигурация</p>
              <p className="mt-2 text-4xl font-black">{formatMoney(totalPrice)}</p>
              <div className="mt-5 grid gap-2">
                {options.map((option) => (
                  <label key={option.id} className="flex cursor-pointer items-start gap-3 border border-white/10 p-3 transition hover:border-white/28">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => toggleOption(option.id)}
                      className="peer sr-only"
                    />
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-white/30 bg-white/10 text-transparent peer-checked:border-[#59d3d8] peer-checked:bg-[#59d3d8] peer-checked:text-[#071116]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="flex min-w-0 flex-1 justify-between gap-3 text-sm">
                      <span>{option.label}</span>
                      <strong className="whitespace-nowrap text-white/82">+{formatMoney(option.price)}</strong>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="decision-image">
              <img src={paymentImage} alt="Платежный модуль автомата" />
            </div>
            <div className="bg-[#f2b94b] p-5 text-[#171018]">
              <p className="text-xs font-black uppercase tracking-[0.14em] opacity-60">Следующий шаг</p>
              <p className="mt-2 text-2xl font-black leading-tight">Получить расчет под площадку</p>
              <button
                type="button"
                onClick={scrollToCalc}
                className="mt-5 inline-flex items-center justify-center gap-2 bg-[#171018] px-5 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#171018]"
              >
                Открыть калькулятор
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
