import { useState, useEffect, useRef } from "react";

const TG_LINK = "https://t.me/YOUR_CHANNEL";

const TEAS = [
  {
    id: 1,
    badge: "Тёмный · Выдержанный",
    name: "Пуэр Шу",
    origin: "Yunnan, China · Урожай 2018",
    desc: "Землистый, плотный, с нотами мокрого дерева. Давит на мозг мягче любого вискаря. Чайная версия пятилетней выдержки.",
    price: "от 1 200 ₽",
    unit: "100г",
    seal: "🐉",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
  },
  {
    id: 2,
    badge: "Улун · Скрученный",
    name: "Те Гуань Инь",
    origin: "Fujian, China · Весенний сбор",
    desc: "Орхидея, сливочность, едва уловимый дым. Восемь заварок без потери аромата — мастера умеют делать чай на совесть.",
    price: "от 900 ₽",
    unit: "100г",
    seal: "🍃",
    img: "https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?w=600&q=80",
  },
  {
    id: 3,
    badge: "Белый · Редкий",
    name: "Бай Хао Инь Чжэнь",
    origin: "Fuding, China · Серебряные иглы",
    desc: "Собирается два раза в год, только утром, только почки. Вкус — роса и мёд. Люди платят за это хорошие деньги. Не без причины.",
    price: "от 2 400 ₽",
    unit: "50г",
    seal: "☁️",
    img: "https://images.unsplash.com/photo-1546273703-3e44e7cdc654?w=600&q=80",
  },
  {
    id: 4,
    badge: "Красный · Крепкий",
    name: "Дянь Хун",
    origin: "Yunnan, China · Золотые типсы",
    desc: "Мёд, карамель, тёмный шоколад. Убивает желание пить кофе раз и навсегда. Стандартный для хорошего утра.",
    price: "от 750 ₽",
    unit: "100г",
    seal: "🔥",
    img: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=600&q=80",
  },
];

const STEPS = [
  { n: "01", title: "Пишешь в Telegram", text: "Подписываешься на канал, смотришь ассортимент, задаёшь вопросы. Отвечаем быстро." },
  { n: "02", title: "Выбираешь чай", text: "Говоришь что хочешь, мы уточняем граммовку. Оплата на карту или крипто." },
  { n: "03", title: "Получаешь товар", text: "Доставка по всей стране. СДЭК, Почта, самовывоз в Москве и Питере." },
];

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, stretch = false }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.65s ${delay}ms ease, transform 0.65s ${delay}ms ease`,
      ...(stretch ? { height: "100%", display: "flex", flexDirection: "column" } : {}),
    }}>
      {children}
    </div>
  );
}

function Lantern({ delay, height }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: 1, height, background: "linear-gradient(to bottom,#555,transparent)" }} />
      <span style={{ fontSize: 26, filter: "drop-shadow(0 0 10px rgba(220,50,50,0.9))", animation: `swing 4s ${delay}s ease-in-out infinite`, display: "block" }}>🏮</span>
    </div>
  );
}

function TeaCard({ tea, delay, isMobile, isWide }) {
  const [hov, setHov] = useState(false);
  const imgH = isMobile ? 200 : isWide ? 280 : 230;
  const sealTop = imgH - 39;
  return (
    <Reveal delay={delay} stretch>
      <a
        href={TG_LINK}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          textDecoration: "none",
          color: "inherit",
          background: "#111",
          border: `1px solid ${hov ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.13)"}`,
          position: "relative",
          overflow: "hidden",
          transform: hov && !isMobile ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.2)" : "none",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s, border-color 0.3s",
        }}
      >
        {/* corner bracket */}
        <div style={{ position: "absolute", top: 10, right: 10, width: 16, height: 16, borderTop: "1px solid rgba(201,168,76,0.4)", borderRight: "1px solid rgba(201,168,76,0.4)", zIndex: 2 }} />

        <img
          src={tea.img}
          alt={tea.name}
          style={{ width: "100%", height: imgH, objectFit: "cover", display: "block", flexShrink: 0, filter: hov ? "saturate(0.85) brightness(0.92)" : "saturate(0.55) brightness(0.75)", transition: "filter 0.4s" }}
        />

        {/* wax seal */}
        <div style={{ position: "absolute", top: sealTop, right: 14, width: 46, height: 46, background: "#8b0000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, zIndex: 3, boxShadow: "0 4px 14px rgba(139,0,0,0.8)", border: "2px solid rgba(255,255,255,0.08)" }}>
          {tea.seal}
        </div>

        <div style={{ padding: isMobile ? "20px 16px 18px" : isWide ? "30px 26px 26px" : "26px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.38em", textTransform: "uppercase", color: "#c0392b", marginBottom: 9, display: "flex", alignItems: "center", gap: 7 }}>
            {tea.badge}
            <div style={{ flex: 1, height: 1, background: "rgba(139,0,0,0.3)" }} />
          </div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? 18 : 21, fontWeight: 700, color: "#fff", marginBottom: 5, lineHeight: 1.2 }}>{tea.name}</div>
          <div style={{ fontSize: 10, color: "#c9a84c", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.7, marginBottom: 12 }}>{tea.origin}</div>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "#6b6560", marginBottom: 20, flex: 1 }}>{tea.desc}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div>
              <span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 700, color: "#c9a84c" }}>{tea.price}</span>
              <span style={{ fontSize: 11, color: "#6b6560", marginLeft: 4 }}>/ {tea.unit}</span>
            </div>
            <div style={{ padding: "9px 15px", border: `1px solid ${hov ? "#c9a84c" : "rgba(201,168,76,0.3)"}`, color: hov ? "#080808" : "#c9a84c", background: hov ? "#c9a84c" : "transparent", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", transition: "all 0.25s", display: "flex", alignItems: "center", gap: 5 }}>
              В канал
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

/* ─── GLOBAL STYLES injected once ─── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; min-height: 100%; background: #080808; overflow-x: hidden; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
  @keyframes swing     { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }
  @keyframes fogL      { from{transform:translateX(0)} to{transform:translateX(9%)} }
  @keyframes fogR      { from{transform:translateX(0)} to{transform:translateX(-9%)} }
  @keyframes scrollDrop {
    0%  { transform:scaleY(0); transform-origin:top;    opacity:0 }
    50% { transform:scaleY(1); transform-origin:top;    opacity:1 }
    100%{ transform:scaleY(0); transform-origin:bottom; opacity:0 }
  }
  @keyframes stampPulse {
    0%,100%{ box-shadow:0 0 18px rgba(139,0,0,0.2),inset 0 0 0 2px rgba(139,0,0,0.3) }
    50%    { box-shadow:0 0 36px rgba(139,0,0,0.5),inset 0 0 0 2px rgba(139,0,0,0.6) }
  }
  ::-webkit-scrollbar       { width:4px }
  ::-webkit-scrollbar-track { background:#111 }
  ::-webkit-scrollbar-thumb { background:#8b0000 }
`;

export default function App() {
  const w       = useWindowWidth();
  const mobile  = w < 640;
  const tablet  = w < 960;
  const wide    = w >= 1400;
  const xl      = w >= 1800;

  /* responsive horizontal padding — scales gracefully on ultra-wide screens */
  const px = mobile ? "20px" : tablet ? "32px" : wide ? "60px" : "48px";

  /* inner max-width container style — grows on large displays */
  const maxW  = xl ? 1600 : wide ? 1400 : 1200;
  const inner = { maxWidth: maxW, margin: "0 auto", width: "100%" };

  const scrollToCatalog = (e) => {
    e.preventDefault();
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div style={{ width: "100%", background: "#080808", color: "#d4cfc8", fontFamily: "'Inter','Helvetica Neue',sans-serif", fontWeight: 300, overflowX: "hidden" }}>

        {/* ═══════════ HERO — full viewport width, no side gaps ═══════════ */}
        <section style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: `80px ${px} 80px`, overflow: "hidden" }}>

          {/* bg — absolutely fills the section, no gaps */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.25) saturate(0.45)" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse 80% 60% at 50% 95%, rgba(139,0,0,0.3) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 30%, rgba(8,8,8,0.6) 100%)" }} />

          {/* fog */}
          <div style={{ position: "absolute", bottom: 0, left: "-25%", width: "150%", height: 200, zIndex: 2, background: "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 70%)", animation: "fogL 20s ease-in-out infinite alternate", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 30, left: "-15%", width: "140%", height: 160, zIndex: 2, background: "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(139,0,0,0.05) 0%, transparent 70%)", animation: "fogR 27s ease-in-out infinite alternate", pointerEvents: "none" }} />

          {/* lanterns */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, display: "flex", justifyContent: "space-around", pointerEvents: "none" }}>
            {(mobile ? [80, 55, 90] : w >= 1800 ? [80, 55, 100, 65, 90, 72, 88, 60] : w >= 1400 ? [80, 55, 100, 65, 90, 72] : [80, 55, 100, 65, 90]).map((h, i) => (
              <Lantern key={i} height={h} delay={-i * 0.8} />
            ))}
          </div>

          {/* content */}
          <div style={{ position: "relative", zIndex: 4, maxWidth: w >= 1800 ? 1100 : w >= 1400 ? 960 : 880, width: "100%" }}>
            <div style={{ fontSize: 12, color: "#8b0000", letterSpacing: "0.3em", marginBottom: 10, opacity: 0.8 }}>茶 · 龙 · 秘密</div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.42em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 20, opacity: 0.7 }}>
              Эксклюзивный чай · С 2018 года
            </div>

            <h1 style={{ fontSize: "clamp(46px,10vw,124px)", fontWeight: 900, fontFamily: "Georgia,serif", lineHeight: 0.88, letterSpacing: "-0.02em", color: "#fff", textShadow: "0 0 80px rgba(139,0,0,0.55), 0 2px 4px rgba(0,0,0,0.9)" }}>
              Чайный
            </h1>
            <h1 style={{ fontSize: "clamp(46px,10vw,124px)", fontWeight: 900, fontFamily: "Georgia,serif", lineHeight: 0.9, letterSpacing: "-0.02em", color: "#c9a84c", textShadow: "0 0 60px rgba(201,168,76,0.25)", marginBottom: 6 }}>
              Барыга
            </h1>

            {/* stamp */}
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0 24px" }}>
              <div style={{ width: mobile ? 74 : 86, height: mobile ? 74 : 86, border: "3px solid #8b0000", borderRadius: 4, transform: "rotate(-12deg)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b0000", fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", textAlign: "center", lineHeight: 1.4, textTransform: "uppercase", animation: "stampPulse 3s ease-in-out infinite", position: "relative" }}>
                <div style={{ position: "absolute", inset: 3, border: "1px solid rgba(139,0,0,0.35)" }} />
                ПРОВЕРЕНО<br />БАРЫГОЙ<br />☯
              </div>
            </div>

            <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "clamp(15px,2.2vw,21px)", color: "#d4cfc8", opacity: 0.7, marginBottom: 38, letterSpacing: "0.02em" }}>
              Лучший чай. Без лишних вопросов.
            </p>

            <a
              href="#catalog"
              onClick={scrollToCatalog}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: mobile ? "13px 26px" : "15px 38px", background: "#8b0000", color: "#fff", textDecoration: "none", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", border: "1px solid rgba(201,168,76,0.22)" }}
            >
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              Смотреть товар
            </a>
          </div>

          {/* scroll hint */}
          <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#6b6560", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            <span>Листай</span>
            <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom,#c9a84c,transparent)", animation: "scrollDrop 2s ease-in-out infinite" }} />
          </div>
        </section>

        {/* ═══════════ DIVIDER ═══════════ */}
        <div style={{ ...inner, display: "flex", alignItems: "center", gap: 14, padding: `0 ${px}`, margin: "64px auto" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)" }} />
          <span style={{ color: "#c9a84c", fontSize: 15, opacity: 0.5 }}>☯</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)" }} />
        </div>

        {/* ═══════════ CATALOG ═══════════ */}
        <section id="catalog" style={{ width: "100%", padding: `0 ${px} 90px` }}>
          <div style={inner}>
            <Reveal>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.5em", textTransform: "uppercase", color: "#c9a84c", opacity: 0.6, textAlign: "center", marginBottom: 10 }}>Ассортимент</div>
            </Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 700, textAlign: "center", color: "#fff", marginBottom: 12 }}>Что есть в наличии</h2>
            </Reveal>
            <Reveal delay={150}>
              <p style={{ textAlign: "center", color: "#6b6560", fontSize: 14, maxWidth: 420, margin: "0 auto 50px" }}>
                Каждая партия — ограниченный завоз. Вопросы о происхождении не задаём.
              </p>
            </Reveal>

            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "repeat(4,1fr)",
              gap: wide ? 28 : 20,
            }}>
              {TEAS.map((tea, i) => (
                <TeaCard key={tea.id} tea={tea} delay={i * 70} isMobile={mobile} isWide={wide} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ QUOTE ═══════════ */}
        <div style={{ width: "100%", padding: `${mobile ? 56 : 80}px ${px}`, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: mobile ? 160 : 280, color: "rgba(201,168,76,0.025)", fontFamily: "serif", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>茶</div>
          <div style={inner}>
            <Reveal>
              <p style={{ fontFamily: "Georgia,serif", fontSize: "clamp(17px,3vw,31px)", fontStyle: "italic", color: "rgba(255,255,255,0.65)", maxWidth: 700, margin: "0 auto 16px", lineHeight: 1.55, position: "relative", zIndex: 1 }}>
                «Хороший чай не нуждается в рекламе —{" "}
                <span style={{ color: "#c9a84c", fontStyle: "normal" }}>он говорит сам за себя.</span>{" "}
                Плохой чай не продаём.»
              </p>
              <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#6b6560", position: "relative", zIndex: 1 }}>— Чайный Барыга</p>
            </Reveal>
          </div>
        </div>

        {/* ═══════════ HOW IT WORKS ═══════════ */}
        <section style={{ width: "100%", padding: `${mobile ? 56 : 80}px ${px}`, borderTop: "1px solid rgba(201,168,76,0.07)", borderBottom: "1px solid rgba(201,168,76,0.07)", background: "linear-gradient(180deg,transparent,rgba(139,0,0,0.05),transparent)" }}>
          <div style={inner}>
            <Reveal>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.5em", textTransform: "uppercase", color: "#c9a84c", opacity: 0.6, textAlign: "center", marginBottom: 10 }}>Схема работы</div>
            </Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, textAlign: "center", color: "#fff", marginBottom: 52 }}>Как всё устроено</h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: mobile ? 36 : 0, position: "relative" }}>
              {!mobile && (
                <div style={{ position: "absolute", top: 26, left: "calc(16.66% + 27px)", right: "calc(16.66% + 27px)", height: 1, background: "linear-gradient(to right,rgba(201,168,76,0.3),rgba(201,168,76,0.1),rgba(201,168,76,0.3))" }} />
              )}
              {STEPS.map((s, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div style={{ textAlign: "center", padding: mobile ? "0 10px" : wide ? "0 48px" : "0 28px", position: "relative" }}>
                    {mobile && i < STEPS.length - 1 && (
                      <div style={{ position: "absolute", left: "50%", bottom: -36, width: 1, height: 36, background: "linear-gradient(to bottom,rgba(201,168,76,0.3),transparent)" }} />
                    )}
                    <div style={{ width: 52, height: 52, border: "1px solid rgba(201,168,76,0.35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#c9a84c", margin: "0 auto 18px", background: "#111", position: "relative", zIndex: 1 }}>{s.n}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "#fff", marginBottom: 10 }}>{s.title}</div>
                    <p style={{ fontSize: 13, color: "#6b6560", lineHeight: 1.65 }}>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CONTACTS ═══════════ */}
        <section id="contacts" style={{ width: "100%", padding: `${mobile ? 56 : 80}px ${px} 0` }}>
          <div style={inner}>
            <Reveal>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.5em", textTransform: "uppercase", color: "#c9a84c", opacity: 0.6, textAlign: "center", marginBottom: 10 }}>Связь</div>
            </Reveal>
            <Reveal delay={80}>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, textAlign: "center", color: "#fff", marginBottom: 52 }}>Контакты</h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: mobile || tablet ? "1fr" : "1fr 1fr", gap: (mobile || tablet) ? 40 : wide ? 80 : 60, alignItems: "start" }}>

              {/* contact list */}
              <div>
                {[
                  { icon: "✈", label: "Telegram",          value: "@chainiy_baryga",       href: TG_LINK },
                  { icon: "📱", label: "WhatsApp / Телефон", value: "+7 900 123-45-67",       href: "tel:+79001234567" },
                  { icon: "📍", label: "Самовывоз",          value: "Москва и Санкт-Петербург", sub: "Адрес — при заказе в Telegram" },
                  { icon: "⏱", label: "Время работы",        value: "Пн–Вс: 10:00 — 22:00",   sub: "Срочные заявки — в любое время" },
                ].map((c, i) => (
                  <Reveal key={i} delay={i * 70}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 18, padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", borderTop: i === 0 ? "1px solid rgba(255,255,255,0.05)" : undefined }}>
                      <div style={{ width: 42, height: 42, border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0, color: "#c9a84c" }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "#6b6560", marginBottom: 5 }}>{c.label}</div>
                        {c.href
                          ? <a href={c.href} target="_blank" rel="noreferrer" style={{ fontSize: 15, color: "#d4cfc8", textDecoration: "none" }}>{c.value}</a>
                          : <span style={{ fontSize: 15, color: "#d4cfc8" }}>{c.value}</span>}
                        {c.sub && <div style={{ fontSize: 12, color: "#6b6560", marginTop: 3 }}>{c.sub}</div>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* TG CTA s */}
              <Reveal delay={100}>
                <div style={{ background: "#111", border: "1px solid rgba(201,168,76,0.12)", padding: mobile ? 22 : 36, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -40, right: -40, width: 150, height: 150, background: "radial-gradient(circle,rgba(139,0,0,0.2),transparent 70%)", pointerEvents: "none" }} />
                  <div style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c0392b", marginBottom: 14 }}>Главный канал</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: mobile ? 19 : 23, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>
                    Весь ассортимент и новинки — в Telegram
                  </div>
                  <p style={{ fontSize: 13, color: "#6b6560", marginBottom: 26, lineHeight: 1.65 }}>
                    Там выкладываем свежие поступления, фото партий, отзывы постоянников и иногда — закрытые предложения для своих. Вступай.
                  </p>
                  <a
                    href={TG_LINK}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: mobile ? "12px 20px" : "14px 26px", background: "linear-gradient(135deg,#0088cc,#006699)", color: "#fff", textDecoration: "none", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Подписаться на канал
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer style={{ width: "100%", marginTop: 80, padding: `30px ${px}`, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ ...inner, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, flexDirection: mobile ? "column" : "row", textAlign: mobile ? "center" : "left" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 700, color: "#c9a84c" }}>
              Чайный<span style={{ color: "#8b0000" }}> Барыга</span>
            </div>
            <div style={{ fontSize: 11, color: "#6b6560", letterSpacing: "0.17em" }}>
              © 2024 · Лучший чай. Без лишних вопросов.
            </div>
            <div style={{ fontSize: 18, color: "rgba(201,168,76,0.3)", letterSpacing: "0.24em" }}>茶 龍 秘</div>
          </div>
        </footer>

      </div>
    </>
  );
}