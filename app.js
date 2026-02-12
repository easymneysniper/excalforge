const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = $(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobileMenu();
  });
});

const revealEls = document.querySelectorAll('.reveal');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('isIn', entry.isIntersecting);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

revealEls.forEach(el => io.observe(el));


const bar = $('.progress .bar');
const onScroll = () => {
  if (!bar) return;
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const max = h.scrollHeight - h.clientHeight;
  const pct = max > 0 ? (scrolled / max) * 100 : 0;
  bar.style.width = `${pct}%`;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const themeBtn = $('#themeBtn');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

themeBtn?.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'light' ? '' : 'light';
  if (next) document.documentElement.setAttribute('data-theme', next);
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('theme', next);
});

const burger = $('#burger');
const menu = $('#mobileMenu');

function closeMobileMenu(){
  if (!menu || !burger) return;
  menu.classList.remove('show');
  burger.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
}
burger?.addEventListener('click', () => {
  if (!menu) return;
  const isOpen = menu.classList.toggle('show');
  burger.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-hidden', String(!isOpen));
});
window.addEventListener('resize', closeMobileMenu);

document.addEventListener('click', (e) => {
  if (!menu || !burger) return;

  if (!menu.classList.contains('show')) return;

  const target = e.target;

  if (menu.contains(target) || burger.contains(target)) return;

  closeMobileMenu();
});


const tabs = $$('.tab');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.tab;
    if (!targetId) return;

    tabs.forEach(t => {
      t.classList.toggle('isActive', t === btn);
      t.setAttribute('aria-selected', t === btn ? 'true' : 'false');
    });

    $$('.panel').forEach(p => p.classList.toggle('isActive', p.id === targetId));
  });
});

function animateCount(el, to){
  const start = performance.now();
  const dur = 2200;
  const from = 0;

  const tick = (t) => {
    const progress = Math.min(1, (t - start) / dur);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = String(Math.floor(from + (to - from) * eased));
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = String(to);
  };

  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    $$('.num', entry.target).forEach(n => {
      const to = Number(n.dataset.count || '0');
      animateCount(n, to);
    });
    statObserver.unobserve(entry.target);
  });
}, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

const stats = $('.stats');
if (stats) statObserver.observe(stats);

if (!reduceMotion) {
  $$('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      el.style.setProperty('--mx', `${(x / r.width) * 100}%`);
      el.style.setProperty('--my', `${(y / r.height) * 100}%`);

      const dx = (x - r.width / 2) / r.width;
      const dy = (y - r.height / 2) / r.height;
      el.style.transform = `translate(${dx * 10}px, ${dy * 10}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  const tilt = $('[data-tilt]');
  tilt?.addEventListener('mousemove', (e) => {
    const r = tilt.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const rx = ((y / r.height) - 0.5) * -10;
    const ry = ((x / r.width) - 0.5) * 12;

    tilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    tilt.style.setProperty('--gx', `${(x / r.width) * 100}%`);
    tilt.style.setProperty('--gy', `${(y / r.height) * 100}%`);
  });

  tilt?.addEventListener('mouseleave', () => {
    tilt.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });

  $$('[data-hover]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--hx', `${(x / r.width) * 100}%`);
      card.style.setProperty('--hy', `${(y / r.height) * 100}%`);
    });
  });

  const b1 = document.querySelector('.b1');
  const b2 = document.querySelector('.b2');
  let lastX = 0, lastY = 0, scheduled = false;

  window.addEventListener('mousemove', (e) => {
    lastX = e.clientX;
    lastY = e.clientY;
    if (scheduled) return;
    scheduled = true;

    requestAnimationFrame(() => {
      scheduled = false;
      if (!b1 || !b2) return;
      const cx = (lastX / window.innerWidth) - 0.5;
      const cy = (lastY / window.innerHeight) - 0.5;
      b1.style.transform = `translate(${cx * 30}px, ${cy * 20}px)`;
      b2.style.transform = `translate(${cx * -22}px, ${cy * -18}px)`;
    });
  }, { passive: true });
}

const form = $('#contactForm');
const toast = $('#toast');

const emailEl = form?.querySelector('input[name="email"]');

emailEl?.addEventListener('input', () => {
  emailEl.value = sanitizeEmail(emailEl.value);
});
emailEl?.addEventListener('blur', () => {
  emailEl.value = sanitizeEmail(emailEl.value);
});


function sanitizeEmail(raw) {
  if (!raw) return raw;

  // маха интервали и невидими whitespace
  let v = String(raw).trim().replace(/\s+/g, '');

  // заменя най-честите кирилски "двойници" с латински
  const map = {
    'а':'a','А':'A',
    'е':'e','Е':'E',
    'о':'o','О':'O',
    'с':'c','С':'C',
    'р':'p','Р':'P',
    'х':'x','Х':'X',
    'м':'m','М':'M',
    'т':'t','Т':'T',
    'к':'k','К':'K',
    'у':'y','У':'Y',
    'в':'b','В':'B',
    'н':'h','Н':'H'
  };

  v = v.replace(/[аАеЕоОсСрРхХмМтТкКуУвВнН]/g, (ch) => map[ch] || ch);

  return v;
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!toast) return;

  const emailInput = form.querySelector('input[name="email"]');
  if (emailInput) emailInput.value = sanitizeEmail(emailInput.value);

  toast.textContent = '✅ Изпращам…';
  toast.classList.add('show');

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      toast.textContent = '✅ Успешно изпратено! Ще се свържа с теб скоро.';
      form.reset();
    } else {
      toast.textContent = '❌ Не успях да изпратя. Пробвай пак или пиши директно на имейла.';
    }
  } catch {
    toast.textContent = '❌ Няма връзка. Пробвай пак след малко.';
  }

  setTimeout(() => toast.classList.remove('show'), 4200);
});

const year = $('#year');
if (year) year.textContent = String(new Date().getFullYear());

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    const f = document.querySelector(".contactForm");
    if (f) f.reset();
  }
});

// const copyEmailEl = document.querySelector(".copyEmail");
// const iconEl = copyEmailEl?.querySelector(".copyIcon");

// let copyTimer = null;

// copyEmailEl?.addEventListener("click", async () => {
//   const email = copyEmailEl.dataset.email;
//   const small = copyEmailEl.querySelector("small");
//   if (!email || !small || !iconEl) return;

//   if (!small.dataset.original) small.dataset.original = small.textContent;

//   if (copyTimer) {
//     clearTimeout(copyTimer);
//     copyTimer = null;
//   }

//   try {
//     await navigator.clipboard.writeText(email);

//     small.textContent = "Копирано!";
//     iconEl.classList.add("isCopied");
//     iconEl.innerHTML = "✅";

//     copyTimer = setTimeout(() => {
//       small.textContent = small.dataset.original;
//       iconEl.classList.remove("isCopied");
//       iconEl.innerHTML = `<img src="copied.svg" alt="">`;
//       copyTimer = null;
//     }, 1500);

//   } catch {
//     small.textContent = "Не успях да копирам";
//     copyTimer = setTimeout(() => {
//       small.textContent = small.dataset.original;
//       copyTimer = null;
//     }, 1500);
//   }
// });
const copyEmailEl = document.querySelector(".copyEmail");
let copyTimer = null;

async function copyText(text) {
  // Modern clipboard (работи най-добре на HTTPS)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  // Fallback за мобилни / HTTP / file://
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "-9999px";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);

  // важно за iOS
  ta.focus();
  ta.select();
  ta.setSelectionRange(0, ta.value.length);

  const ok = document.execCommand("copy");
  document.body.removeChild(ta);

  return ok;
}

copyEmailEl?.addEventListener("click", async () => {
  const email = copyEmailEl.dataset.email;
  const small = copyEmailEl.querySelector("small");
  const iconEl = copyEmailEl.querySelector(".copyIcon");

  if (!email || !small || !iconEl) return;
  if (!small.dataset.original) small.dataset.original = small.textContent;

  if (copyTimer) clearTimeout(copyTimer);

  try {
    const ok = await copyText(email);
    if (!ok) throw new Error("copy_failed");

    small.textContent = "Копирано!";
    iconEl.innerHTML = "✅";

    copyTimer = setTimeout(() => {
      small.textContent = small.dataset.original;
      iconEl.innerHTML = `<img src="copied.svg" alt="">`;
    }, 1500);
  } catch {
    small.textContent = "Не успях да копирам";
    copyTimer = setTimeout(() => {
      small.textContent = small.dataset.original;
    }, 1500);
  }
});
