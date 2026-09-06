import { useCallback, useEffect, useRef, useState } from 'react';

import About from './components/About.jsx';
import copiedIcon from './assets/icons/copied.svg';
import emailIcon from './assets/icons/email-logo.svg';
import facebookIcon from './assets/icons/facebook.svg';
import instagramIcon from './assets/icons/instagram-logo.svg';
import nightIcon from './assets/icons/night-mode.svg';
import phoneIcon from './assets/icons/phone-logo.svg';
import { heroWordLetters, heroWordText, heroWordViewBox, mottoLetters, mottoText, mottoViewBox } from './mottoPaths.js';

const logoOfficial = '/logo_official.png';
const logoOfficialSrcSet = '/logo_official-512.png 512w, /logo_official-1024.png 1024w, /logo_official.png 1536w';

const navItems = [
  { href: '#work', label: 'Проекти' },
  { href: '#pricing', label: 'Цени' },
  { href: '#about', label: 'За мен' },
  { href: '#contact', label: 'Контакт' }
];

const pricingPlans = [
  {
    name: 'Лендинг страница',
    label: 'За услуга или кампания',
    price: '490 €',
    description: 'Фокусирана страница, която представя една ясна оферта и води посетителя към конкретно действие.',
    features: [
      'Индивидуален дизайн',
      'До 6 съдържателни секции',
      'Контактна форма или основен CTA',
      'Базова SEO и скоростна оптимизация'
    ]
  },
  {
    name: 'Бизнес уебсайт',
    label: 'Най-предпочитан',
    price: '890 €',
    featured: true,
    description: 'Завършено онлайн представяне за бизнес, който иска доверие, ясна структура и повече запитвания.',
    features: [
      'До 6 основни страници',
      'Custom responsive дизайн',
      'Форми, анимации и интеграции',
      'Базова SEO настройка и публикуване'
    ]
  },
  {
    name: 'Онлайн магазин',
    label: 'За продажби онлайн',
    price: '1 490 €',
    description: 'Функционален магазин с удобен продуктов каталог и ясен процес от разглеждането до поръчката.',
    features: [
      'Продуктов каталог и категории',
      'Количка и управление на поръчки',
      'Интеграции за плащане и доставка',
      'Административен панел и обучение'
    ]
  }
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  return reduced;
}

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setCoarse(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  return coarse;
}

function useReveal(reducedMotion, enabled) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));

    if (!enabled) {
      nodes.forEach((node) => {
        node.classList.remove('isIn');
        node.style.removeProperty('--reveal-delay');
      });
      return undefined;
    }

    if (reducedMotion) {
      nodes.forEach((node) => node.classList.add('isIn'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('isIn', entry.isIntersecting);
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -12% 0px' }
    );

    nodes.forEach((node, index) => {
      node.style.setProperty('--reveal-delay', `${Math.min(index * 28, 220)}ms`);
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [reducedMotion, enabled]);
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const page = document.documentElement;
        const max = page.scrollHeight - page.clientHeight;
        setProgress(max > 0 ? (page.scrollTop / max) * 100 : 0);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

function useAnimatedCounters(enabled) {
  const statsRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!enabled || !node || started) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, started]);

  return [statsRef, started];
}

function useCount(target, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    let frame = 0;
    const start = performance.now();
    const duration = 1700;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function Stat({ value, label, active }) {
  const count = useCount(value, active);

  return (
    <div className="stat">
      <div className="num">{count}</div>
      <div className="label">{label}</div>
    </div>
  );
}

function usePointerScene(enabled) {
  const bgRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const bg = bgRef.current;
    const b1 = bg?.querySelector('.b1');
    const b2 = bg?.querySelector('.b2');
    let frame = 0;
    let x = 0;
    let y = 0;

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cx = x / window.innerWidth - 0.5;
        const cy = y / window.innerHeight - 0.5;
        b1?.style.setProperty('--px', `${cx * 34}px`);
        b1?.style.setProperty('--py', `${cy * 24}px`);
        b2?.style.setProperty('--px', `${cx * -28}px`);
        b2?.style.setProperty('--py', `${cy * -22}px`);
      });
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
    };
  }, [enabled]);

  return bgRef;
}

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || '');
  const fadeTimerRef = useRef(0);

  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => () => {
    clearTimeout(fadeTimerRef.current);
  }, []);

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.add('themeFading');
    clearTimeout(fadeTimerRef.current);
    setTheme((current) => (current === 'light' ? '' : 'light'));
    fadeTimerRef.current = window.setTimeout(() => {
      document.documentElement.classList.remove('themeFading');
    }, 620);
  }, []);

  return { theme, toggleTheme };
}

function sanitizeEmail(raw) {
  if (!raw) return raw;

  const map = {
    а: 'a',
    А: 'A',
    е: 'e',
    Е: 'E',
    о: 'o',
    О: 'O',
    с: 'c',
    С: 'C',
    р: 'p',
    Р: 'P',
    х: 'x',
    Х: 'X',
    м: 'm',
    М: 'M',
    т: 't',
    Т: 'T',
    к: 'k',
    К: 'K',
    у: 'y',
    У: 'Y',
    в: 'b',
    В: 'B',
    н: 'h',
    Н: 'H'
  };

  return String(raw)
    .trim()
    .replace(/\s+/g, '')
    .replace(/[аАеЕоОсСрРхХмМтТкКуУвВнН]/g, (ch) => map[ch] || ch);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  return ok;
}

function Header({ onThemeToggle, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brandTapped, setBrandTapped] = useState(false);

  const navigate = (href) => {
    onNavigate(href);
    setMobileOpen(false);
  };

  const tapBrand = () => {
    setBrandTapped(true);
    window.setTimeout(() => setBrandTapped(false), 260);
  };

  return (
    <header className="header">
      <button className={`brand ${brandTapped ? 'isTapped' : ''}`} type="button" onClick={() => { tapBrand(); navigate('#top'); }}>
        <img
          src={logoOfficial}
          srcSet={logoOfficialSrcSet}
          sizes="220px"
          alt="ExcalForge logo"
          className="logo"
          width="1536"
          height="1024"
        />
      </button>

      <nav className="nav" aria-label="Основна навигация">
        {navItems.map((item) => (
          <button key={item.href} type="button" onClick={() => navigate(item.href)}>
            <strong>{item.label}</strong>
          </button>
        ))}
      </nav>

      <div className="headerActions">
        <button className="iconBtn themeTrigger" type="button" onClick={onThemeToggle} aria-label="Смяна на тема">
          <span className="wayIconNew"><img src={nightIcon} alt="" /></span>
        </button>
      </div>

      <button
        className="burger"
        type="button"
        aria-label="Меню"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
      >
        <span></span><span></span><span></span>
      </button>

      <div className={`mobileMenu ${mobileOpen ? 'show' : ''}`} aria-hidden={!mobileOpen}>
        {navItems.map((item) => (
          <button key={item.href} type="button" onClick={() => navigate(item.href)}>
            {item.label}
          </button>
        ))}
        <button className="mobileThemeBtn themeTrigger" type="button" onClick={onThemeToggle}>Смяна на тема</button>
      </div>
    </header>
  );
}

function LoadingIntro({ active, reducedMotion }) {
  return (
    <div className={`loadingIntro ${active ? '' : 'isLeaving'}`} aria-hidden={!active}>
      <div className="loadingAura"></div>
      <div className="loadingMark">
        <img
          src={logoOfficial}
          srcSet={logoOfficialSrcSet}
          sizes="(max-width: 548px) 84vw, 460px"
          alt="ExcalForge"
          width="1536"
          height="1024"
        />
      </div>
      <svg className="loadingMottoSvg" viewBox={mottoViewBox} role="img" aria-label={mottoText}>
        <defs>
          <linearGradient id="mottoFill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="48%" stopColor="#b8f3ff" />
            <stop offset="100%" stopColor="#b7f7cf" />
          </linearGradient>
          <filter id="mottoGlow" x="-20%" y="-50%" width="140%" height="200%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.24" />
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#06b6d4" floodOpacity="0.26" />
          </filter>
        </defs>
        <g filter="url(#mottoGlow)">
          {mottoLetters.map((letter) => (
            <path
              key={`${letter.char}-${letter.index}`}
              className="mottoLetter"
              d={letter.d}
              pathLength="1"
              style={{ '--letter-delay': reducedMotion ? '0ms' : `${340 + letter.index * 26}ms` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

function Hero({ animationsReady, reducedMotion, onNavigate }) {
  const [statsRef, active] = useAnimatedCounters(animationsReady);
  const [heroWordKey, setHeroWordKey] = useState(0);

  useEffect(() => {
    if (!animationsReady || reducedMotion) return undefined;

    setHeroWordKey((key) => key + 1);
    const timer = window.setInterval(() => {
      setHeroWordKey((key) => key + 1);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [animationsReady, reducedMotion]);

  return (
    <section className="hero section">
      <div className="container heroGrid">
        <div className="heroText">
          <div className="kicker reveal">
            <span>Дигитални решения, <strong><span className="grad"> съобразени с Вашите цели</span></strong></span>
          </div>

          <h1 className="headline reveal">
            Изработка на <span className="headlineFocus"><HeroWord animationKey={heroWordKey} /> <span className="grad">с фокус върху качество</span></span>
          </h1>

          <p className="sub reveal">
            Проектирам и разработвам бързи, модерни и надеждни уебсайтове - от лендинг страници до комплексни решения, с ясен
            фокус върху дизайн, производителност и реална стойност за клиента.
          </p>

          <div className="heroCtas reveal">
            <button className="cta primary magnetic" type="button" onClick={() => onNavigate('#contact')}>
              <span>Обсъди проект</span>
            </button>
            <button className="cta ghost magnetic" type="button" onClick={() => onNavigate('#work')}>
              <span>Виж пример</span>
            </button>
          </div>

          <div className="stats reveal" ref={statsRef}>
            <Stat value={100} label="% custom код" active={active} />
            <Stat value={3} label="год. опит" active={active} />
            <Stat value={100} label="% доволни" active={active} />
          </div>
        </div>

        <div className="heroCardWrap reveal">
          <TiltCard />
        </div>

        <Marquee className="onlyMobile" />
      </div>

      <div className="scrollHint" aria-hidden="true">
        <span>Scroll</span>
        <div className="mouse"><i></i></div>
      </div>
    </section>
  );
}

function HeroWord({ animationKey }) {
  const heroWordGradientEnd = heroWordViewBox.split(' ')[2];

  return (
    <span className="heroWord" aria-label={heroWordText} role="img">
      <span className="visuallyHidden">{heroWordText}</span>
      <svg key={animationKey} className="heroWordSvg" viewBox={heroWordViewBox} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="heroWordFill" x1="0" y1="0" x2={heroWordGradientEnd} y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="48%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="heroWordFillLight" x1="0" y1="0" x2={heroWordGradientEnd} y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5b21b6" />
            <stop offset="48%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>
        <g>
          {heroWordLetters.map((letter) => (
            <path
              key={`${letter.char}-${letter.index}`}
              className="heroWordLetter"
              d={letter.d}
              pathLength="1"
              style={{ '--hero-letter-delay': `${letter.index * 46}ms` }}
            />
          ))}
        </g>
      </svg>
    </span>
  );
}

function TiltCard() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const onPointerMove = (event) => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rx = (y / rect.height - 0.5) * -9;
    const ry = (x / rect.width - 0.5) * 11;

    node.style.setProperty('--rx', `${rx}deg`);
    node.style.setProperty('--ry', `${ry}deg`);
    node.style.setProperty('--gx', `${(x / rect.width) * 100}%`);
    node.style.setProperty('--gy', `${(y / rect.height) * 100}%`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="tiltCard" ref={ref} onPointerMove={onPointerMove} onPointerLeave={reset}>
      <div className="tiltGlow"></div>
      <div className="tiltInner">
        <div className="avatar">
          <HeroVisual />
        </div>

        <div className="mini">
          <div className="chip">Front-end</div>
          <div className="chip">Back-end</div>
          <div className="chip">UI/UX</div>
          <div className="chip">Анимации</div>
        </div>

        <div className="cardText">
          <h3><strong>Уебсайтове, изградени с внимание към детайла</strong></h3>
          <p>
            Работя с фокус върху плавни взаимодействия, ясна структура и изчистен визуален език. Всеки проект е оптимизиран за бързина,
            достъпност и отлично потребителско изживяване на всички устройства.
          </p>
        </div>
      </div>
    </div>
  );
}

function HeroVisual() {
  const codeLines = [
    'audit(site)',
    'animate(ui)',
    'optimize(img)',
    'deploy()'
  ];

  return (
    <div className="heroVisual" aria-label="Анимиран уеб проект">
      <div className="visualOrb visualOrbA"></div>
      <div className="visualOrb visualOrbB"></div>
      <div className="visualBrowser">
        <div className="visualTop">
          <span></span><span></span><span></span>
          <i>excalforge.com</i>
        </div>
        <div className="visualStage">
          <div className="visualCode">
            {codeLines.map((line, index) => (
              <p key={line} style={{ '--line-delay': `${index * 120}ms` }}>
                <em>{String(index + 1).padStart(2, '0')}</em>
                <span>{line}</span>
              </p>
            ))}
          </div>
          <div className="visualPreview">
            <div className="previewNav"></div>
            <div className="previewHero"></div>
            <div className="previewGrid">
              <span></span><span></span><span></span>
            </div>
            <div className="previewButton"></div>
          </div>
        </div>
      </div>
      <div className="visualCursor"></div>
    </div>
  );
}

function Marquee({ className = '' }) {
  const items = ['HTML', 'CSS', 'React', 'Animations', 'UX', 'Python', 'Performance'];
  return (
    <div className={`marquee reveal ${className}`} aria-hidden="true">
      <div className="track">
        {[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </div>
  );
}


function Work() {
  return (
    <section id="work" className="section projectSection">
      <div className="container">
        <header className="projectHead reveal">
          <p className="sectionEyebrow">Избрана работа · 01</p>
          <h2>Boutique е демо проект. <span className="grad">И да — работи.</span></h2>
          <p>
            Направих го като пример за малък моден бранд. Можете да го отворите, разгледате и
            натиснете — не е просто статична картинка.
          </p>
        </header>

        <article className="projectFeature reveal">
          <a
            className="projectPreview"
            href="projects/sample-website/index.html"
            aria-label="Отворете демо проекта Boutique"
          >
            <div className="projectFrame">
              <div className="projectFrameBar" aria-hidden="true">
                <span>ExcalForge / selected work</span>
                <span>boutique.demo ↗</span>
              </div>
              <div className="workMock mock1"></div>
            </div>
          </a>

          <div className="projectNotes">
            <div className="projectNotesTop">
              <span>Демо проект</span>
              <small>2026</small>
            </div>
            <h3>Boutique</h3>
            <p className="projectStatement">Спокойна визия и ясен път до заявка за личен стайлинг.</p>
            <p className="projectDescription">
              Идеята беше да оставя снимките и колекциите да водят, а всичко останало да бъде леко,
              четимо и удобно на телефон.
            </p>

            <dl className="projectDetails">
              <div><dt>Роля</dt><dd>Дизайн и разработка</dd></div>
              <div><dt>Фокус</dt><dd>Продукти и запитвания</dd></div>
              <div><dt>Тип</dt><dd>Работеща концепция</dd></div>
            </dl>

            <a className="projectLink" href="projects/sample-website/index.html">
              <span>Разгледайте сайта</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

function Pricing({ onNavigate }) {
  return (
    <section id="pricing" className="section pricingSection">
      <div className="container">
        <div className="sectionHead pricingHead reveal">
          <div>
            <p className="sectionEyebrow">Ориентировъчни пакети</p>
            <h2>Ясен старт за Вашия нов уебсайт</h2>
          </div>
          <p>Всеки проект е различен. Тези пакети дават реална начална рамка, а точната оферта се определя след кратко обсъждане.</p>
        </div>

        <div className="pricingGrid">
          {pricingPlans.map((plan) => (
            <article
              className={`priceCard reveal ${plan.featured ? 'isFeatured' : ''}`}
              key={plan.name}
            >
              <div className="priceCardTop">
                <span className="priceLabel">{plan.label}</span>
                {plan.featured && <span className="popularBadge">Препоръчан</span>}
              </div>
              <h3>{plan.name}</h3>
              <p className="priceDescription">{plan.description}</p>
              <div className="priceValue">
                <small>от</small>
                <strong>{plan.price}</strong>
              </div>
              <ul className="priceFeatures">
                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <button
                className={`cta priceCta ${plan.featured ? 'primary' : 'ghost'}`}
                type="button"
                onClick={() => onNavigate('#contact')}
              >
                <span>Изпратете запитване</span>
              </button>
            </article>
          ))}
        </div>

        <div className="pricingNote reveal">
          <span className="pricingNoteIcon" aria-hidden="true">+</span>
          <p>
            Нуждаете се от поддръжка след публикуването? Месечните планове започват от <strong>75 €</strong> и се определят според нужния обем работа.
          </p>
        </div>
        <p className="pricingFinePrint reveal">
          Посочените цени са ориентировъчни. Домейн, хостинг, платени лицензи, съдържание и допълнителни интеграции се уточняват отделно.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const [toast, setToast] = useState('');
  const [emailLabel, setEmailLabel] = useState('excalforge@gmail.com');
  const [copyMark, setCopyMark] = useState(false);
  const timerRef = useRef(0);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToast(''), 4200);
  };

  const copyEmail = async () => {
    try {
      const ok = await copyText('excalforge@gmail.com');
      if (!ok) throw new Error('copy_failed');
      setEmailLabel('Копирано!');
      setCopyMark(true);
      window.setTimeout(() => {
        setEmailLabel('excalforge@gmail.com');
        setCopyMark(false);
      }, 1500);
    } catch {
      setEmailLabel('Не успях да копирам');
      window.setTimeout(() => setEmailLabel('excalforge@gmail.com'), 1500);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.querySelector('input[name="email"]');
    if (emailInput) emailInput.value = sanitizeEmail(emailInput.value);

    showToast('Изпращам...');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.reset();
        showToast('Успешно изпратено! Ще се свържа с теб скоро.');
      } else {
        showToast('Не успях да изпратя. Пробвай пак или пиши директно на имейла.');
      }
    } catch {
      showToast('Няма връзка. Пробвай пак след малко.');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contactCard reveal">
          <div className="contactLeft">
            <h2>Нека работим заедно</h2>
            <p>
              Свържете се с мен, за да обсъдим Вашите цели и да преценим най-подходящото решение за <strong><span className="grad">Вашия уеб проект.</span></strong>
            </p>

            <div className="contactWays">
              <button className="way copyEmail" type="button" onClick={copyEmail}>
                <span className="wayIconNew"><img src={emailIcon} alt="" /></span>
                <span>
                  <strong>Имейл</strong>
                  <small>{emailLabel}</small>
                </span>
                <span className="copyIcon" aria-hidden="true">
                  {copyMark ? '✓' : <img src={copiedIcon} alt="" />}
                </span>
              </button>

              <a className="way" href="tel:+359878888727">
                <span className="wayIconNew"><img src={phoneIcon} alt="" /></span>
                <span>
                  <strong>Телефон за връзка</strong>
                  <small>+359 87 8888 727</small>
                </span>
              </a>
            </div>
          </div>

          <form id="contactForm" className="contactForm" action="https://formspree.io/f/xojevwzy" method="POST" onSubmit={submit}>
            <label>
              <span>Име</span>
              <input name="name" required />
            </label>

            <label>
              <span>Email</span>
              <input type="email" name="email" required onInput={(event) => { event.currentTarget.value = sanitizeEmail(event.currentTarget.value); }} />
            </label>

            <label>
              <span>Описание на проекта</span>
              <textarea name="message" rows="5" required></textarea>
            </label>

            <input type="hidden" name="_subject" value="Ново запитване от сайта" />
            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

            <button type="submit" className="cta primary">Изпрати запитване</button>
            <div id="toast" className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container foot">
        <div className="footBrand">
          <span>&copy; {new Date().getFullYear()} ExcalForge</span>
          <div className="footSocial" aria-label="Social links">
            <a href="https://www.instagram.com/excalforge/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src={instagramIcon} alt="" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61568043295265" target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src={facebookIcon} alt="" />
            </a>
          </div>
        </div>
        <button type="button" className="backTop" onClick={() => onNavigate('#top')} aria-label="Върни се в началото">
          <span className="backTopGlow" aria-hidden="true"></span>
          <span className="backTopText">Начало</span>
        </button>
      </div>
    </footer>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const coarsePointer = useCoarsePointer();
  const [introActive, setIntroActive] = useState(true);
  const animationsReady = !introActive;
  const progress = useScrollProgress();
  const bgRef = usePointerScene(!reducedMotion && !coarsePointer);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useReveal(reducedMotion, animationsReady);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroActive(false);
    }, reducedMotion ? 650 : 2400);

    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  const navigate = useCallback((href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, [reducedMotion]);

  return (
    <>
      <div id="top"></div>
      <div className="bg" ref={bgRef}>
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="grid"></div>
        <div className="noise"></div>
      </div>

      <LoadingIntro active={introActive} reducedMotion={reducedMotion} />

      <div className="progress" aria-hidden="true"><span className="bar" style={{ width: `${progress}%` }}></span></div>

      <Header onThemeToggle={toggleTheme} onNavigate={navigate} />

      <main className={introActive ? 'siteShell isWaiting' : 'siteShell isReady'}>
        <Hero animationsReady={animationsReady} reducedMotion={reducedMotion} onNavigate={navigate} />
        <About reducedMotion={reducedMotion} coarsePointer={coarsePointer} onNavigate={navigate} />
        <Work />
        <Pricing onNavigate={navigate} />
        <Contact />
        <Footer onNavigate={navigate} />
      </main>
    </>
  );
}
