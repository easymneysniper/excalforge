import { useCallback, useEffect, useRef, useState } from 'react';

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
  { href: '#about', label: 'За мен' },
  { href: '#contact', label: 'Контакт' }
];

const skills = [
  ['Back-end', 92],
  ['Front-end', 85],
  ['UI/UX', 85],
  ['Motion / Interactions', 90]
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

function About() {
  const [activeTab, setActiveTab] = useState('t1');
  const [skillWaveKey, setSkillWaveKey] = useState(0);

  const selectTab = (id) => {
    setActiveTab(id);
    if (id === 't3') setSkillWaveKey((key) => key + 1);
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="sectionHead reveal">
          <h2>За мен</h2>
        </div>

        <div className="aboutGrid">
          <div className="aboutCard reveal">
            <div className="aboutSignal" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <div className="tabs" role="tablist" aria-label="Табове за описание">
              {[
                ['t1', 'Кой съм'],
                ['t2', 'Как работя'],
                ['t3', 'Умения']
              ].map(([id, label]) => (
                <button
                  key={id}
                  className={`tab ${activeTab === id ? 'isActive' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === id}
                  onClick={() => selectTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="tabPanels">
              <div className={`panel ${activeTab === 't1' ? 'isActive' : ''}`} id="t1" role="tabpanel">
                <h3><span className="grad"><strong>ExcalForge</strong></span></h3>
                <p>
                  Разработвам уебсайтове за бизнеси и брандове, които търсят яснота, стабилност и дългосрочна стойност.
                  Работя с фокус върху изчистен дизайн, логична структура и прецизна техническа реализация.
                </p>
                <p>
                  За мен добрият сайт не е само красива визия. Той трябва да зарежда бързо, да води потребителя естествено и да бъде лесен
                  за надграждане, когато бизнесът расте.
                </p>
                <p className="panelNote">
                  Подхождам индивидуално към всеки проект, за да изградя решение, което изглежда професионално, работи стабилно и носи реална полза.
                </p>
                <ul className="bullets">
                  <li>Сертифицирано обучение в елитна академия</li>
                  <li>Бакалавър по "Софтуерно инженерство"</li>
                  <li>Постоянно развитие и работа с актуални технологии и практики</li>
                </ul>
              </div>

              <div className={`panel ${activeTab === 't2' ? 'isActive' : ''}`} id="t2" role="tabpanel">
                <h3>Процесът ми включва следните стъпки:</h3>
                <ol className="steps">
                  <li><strong>Бриф</strong> - дефиниране на целите, аудиторията и изискванията</li>
                  <li><strong>План</strong> - изграждане на ясна структура и технически план</li>
                  <li><strong>Разработка</strong> - реализация с фокус върху качество и стабилност</li>
                  <li><strong>Deploy</strong> - настройка на хостинг и пускане на проекта</li>
                  <li><strong>Поддръжка</strong> - редовни обновления, техническа грижа и съдействие при нужда от промени или надграждане</li>
                </ol>
                <div className="note">Предлагам качествена изработка и постоянна поддръжка на Вашия сайт</div>
              </div>

              <div className={`panel ${activeTab === 't3' ? 'isActive' : ''}`} id="t3" role="tabpanel">
                <h3>Умения</h3>
                <p className="skillCopy">
                  Комбинирам техническа разработка, визуален усет и внимание към детайла, за да превърна идеята в завършен уеб продукт.
                  Работя така, че сайтът да бъде едновременно бърз, удобен и лесен за поддръжка.
                </p>
                <div className="skillGrid" key={skillWaveKey}>
                  {skills.map(([name, pct], index) => (
                    <div className="skill" key={name}>
                      <div className="skillTop">
                        <span>{name}</span><span className="pct">{pct}%</span>
                      </div>
                      <div
                        className="meter"
                        style={{
                          '--skill-target': `${pct}%`,
                          '--skill-delay': `${index * 120}ms`
                        }}
                      >
                        <i></i>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="skillNotes">
                  <span>Responsive layout</span>
                  <span>Clean code</span>
                  <span>Performance</span>
                  <span>Animations</span>
                </div>
              </div>
            </div>
          </div>

          <aside className="aboutAside reveal">
            <div className="glass">
              <h3>Накратко</h3>
              <p className="asideLead">Сайтове с ясна структура, бързо зареждане и лесна поддръжка.</p>
              <div className="asideStats" aria-label="Кратки показатели">
                <span>
                  <strong>3+</strong>
                  <small>год. опит</small>
                </span>
                <span>
                  <strong>100%</strong>
                  <small>custom код</small>
                </span>
              </div>

              <p className="asideLabel">Мога да помогна с:</p>
              <div className="pillRow">
                <span className="pill">Цялостен сайт</span>
                <span className="pill">Портфолио</span>
                <span className="pill">Поддръжка на Вашия сайт</span>
              </div>

              <div className="divider"></div>

              <div className="trust">
                <Trust icon="time" title="Навреме" text="Ясно договорени срокове" />
                <Trust icon="flex" title="Гъвкаво" text="Лесно надграждане" />
                <Trust icon="stable" title="Стабилно" text="За всички устройства" />
              </div>
            </div>
          </aside>
        </div>

        <Marquee className="onlyDesktop" />
      </div>
    </section>
  );
}

function Trust({ icon, title, text }) {
  return (
    <div className="trustItem">
      <AnimatedTrustIcon type={icon} />
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

function AnimatedTrustIcon({ type }) {
  if (type === 'time') {
    return (
      <span className="trustAnimIcon trustTime" aria-hidden="true">
        <svg className="trustSvg" viewBox="0 0 40 40" focusable="false">
          <circle className="trustLine" cx="18.5" cy="21" r="10.5" />
          <path className="trustLine trustHand" d="M18.5 14.5v7l5.2 3" />
          <circle className="trustBadge" cx="28.5" cy="12" r="6.2" />
          <path className="trustAccent trustCheck" d="m25.6 12.1 2 2 4-4.2" />
        </svg>
      </span>
    );
  }

  if (type === 'flex') {
    return (
      <span className="trustAnimIcon trustFlex" aria-hidden="true">
        <svg className="trustSvg" viewBox="0 0 40 40" focusable="false">
          <path className="trustLayer trustLayerBottom" d="M10 25.5 20 31l10-5.5" />
          <path className="trustLayer trustLayerMiddle" d="M10 20.5 20 26l10-5.5" />
          <path className="trustLayer trustLayerTop" d="M10 15.5 20 10l10 5.5-10 5.5-10-5.5Z" />
          <path className="trustAccent trustPlus" d="M29.5 8.5v7M26 12h7" />
        </svg>
      </span>
    );
  }

  return (
    <span className="trustAnimIcon trustStable" aria-hidden="true">
      <svg className="trustSvg" viewBox="0 0 40 40" focusable="false">
        <rect className="trustShape trustDeviceDesktop" x="6.5" y="12" width="19" height="14.5" rx="3" />
        <rect className="trustShape trustDevicePhone" x="28" y="14.5" width="6.8" height="13.8" rx="2.2" />
        <path className="trustLine" d="M12.5 30.5h8.5" />
        <path className="trustAccent trustCheck" d="m11.8 19.5 3.1 3.1 6.1-6.4" />
      </svg>
    </span>
  );
}

function Work() {
  const ref = useRef(null);

  const onPointerMove = (event) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty('--hx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--hy', `${(y / rect.height) * 100}%`);
  };

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="sectionHead reveal">
          <div>
            <p className="sectionEyebrow">Избран проект</p>
            <h2>Портфолио с усещане за реален бранд</h2>
          </div>
          <p>Един примерен сайт, показан като case study - с визуален фокус, ясна структура и завършен потребителски поток.</p>
        </div>

        <div className="cards premiumCase">
          <a className="workCard caseStudy reveal" href="projects/sample-website/index.html" ref={ref} onPointerMove={onPointerMove}>
            <div className="workMedia caseMedia">
              <div className="caseBrowser">
                <div className="caseTop">
                  <span></span><span></span><span></span>
                  <i>boutique.demo</i>
                </div>
                <div className="workMock mock1"></div>
              </div>
              <div className="workGlow"></div>
            </div>
            <div className="workBody">
              <p className="caseEyebrow">Fashion Boutique</p>
              <h3>Boutique</h3>
              <p>Елегантен бутик за дрехи с подбрани колекции, модерна визия и удобна заявка за личен стайлинг.</p>
              <div className="caseHighlights">
                <span>
                  <strong>Визия</strong>
                  <small>голям първи екран</small>
                </span>
                <span>
                  <strong>Заявка</strong>
                  <small>за личен стайлинг</small>
                </span>
                <span>
                  <strong>Мобилно</strong>
                  <small>удобно на телефон</small>
                </span>
              </div>
              <div className="workTags">
                <span>Бутик</span><span>Мода</span><span>Стайлинг</span>
              </div>
              <span className="caseLink">Разгледай проекта</span>
            </div>
          </a>
        </div>
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
        <About />
        <Work />
        <Contact />
        <Footer onNavigate={navigate} />
      </main>
    </>
  );
}
