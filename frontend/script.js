const header = document.getElementById("siteHeader");
const burger = document.getElementById("burger");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 50);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

burger.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll(".site-header__menu a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  });
});

const heroVideo = document.querySelector(".hero__video-media");

if (heroVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVideo.removeAttribute("autoplay");
  heroVideo.pause();
}

const footer = document.getElementById("siteFooter");

footer.addEventListener("mousemove", (event) => {
  const rect = footer.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  footer.style.setProperty("--mouse-x", `${x}%`);
  footer.style.setProperty("--mouse-y", `${y}%`);
});

const postTrack = document.getElementById("postTrack");
postTrack.innerHTML += postTrack.innerHTML;

const navLinks = Array.from(document.querySelectorAll(".site-header__menu a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateCurrentNav() {
  let activeIndex = 0;
  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= 120) {
      activeIndex = index;
    }
  });
  navLinks.forEach((link, index) => {
    link.parentElement.classList.toggle("is-current", index === activeIndex);
  });
}

window.addEventListener("scroll", updateCurrentNav, { passive: true });
updateCurrentNav();

document.querySelectorAll("form[data-demo]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (status) {
      status.textContent = "Thanks! Your message is on its way.";
      status.classList.add("is-success");
      status.classList.remove("is-error");
    }
    form.reset();
  });
});
