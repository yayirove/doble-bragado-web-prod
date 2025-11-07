// src/scripts/countdown.ts
function initCountdown(rootSelector = "[data-countdown]") {
  if (typeof window === "undefined") return;
  const root = document.querySelector<HTMLElement>(rootSelector);
  if (!root) return;

  const targetStr = root.dataset.target;
  if (!targetStr) return;

  const dd = root.querySelector<HTMLElement>(".dd");
  const hh = root.querySelector<HTMLElement>(".hh");
  const mm = root.querySelector<HTMLElement>(".mm");
  const ss = root.querySelector<HTMLElement>(".ss");

  const target = new Date(targetStr).getTime();
  if (Number.isNaN(target)) return;

  const existingInterval = window.ldbCountdownInterval;
  if (existingInterval) {
    clearInterval(existingInterval);
  }

  const tick = () => {
    const now = Date.now();
    let diff = Math.max(0, target - now);

    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000);    diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);

    if (dd) dd.textContent = String(days).padStart(2, "0");
    if (hh) hh.textContent = String(hours).padStart(2, "0");
    if (mm) mm.textContent = String(mins).padStart(2, "0");
    if (ss) ss.textContent = String(secs).padStart(2, "0");
  };

  tick();
  window.ldbCountdownInterval = window.setInterval(tick, 1000);
  
  document.addEventListener("astro:before-swap", () => {
    clearInterval(window.ldbCountdownInterval);
  }, { once: true });
}

// Auto-inicialización del script
document.addEventListener("astro:page-load", () => initCountdown());