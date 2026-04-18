const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const toastBox = document.querySelector("[data-toast-box]");
let lastScrollY = window.scrollY;
let isScrollingDown = true;

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
  isScrollingDown = window.scrollY >= lastScrollY;
  lastScrollY = window.scrollY;
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  header.classList.toggle("nav-active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    header.classList.remove("nav-active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        return;
      }

      entry.target.classList.remove("is-visible");
      entry.target.classList.toggle("from-above", !isScrollingDown);
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

let toastTimer;

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => {
    toastBox.textContent = button.dataset.toast;
    toastBox.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastBox.classList.remove("is-visible");
    }, 2400);
  });
});

document.querySelector(".booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  toastBox.textContent = "Заявката е изпратена. Ще се свържем с теб.";
  toastBox.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastBox.classList.remove("is-visible");
  }, 3000);
  event.currentTarget.reset();
});
