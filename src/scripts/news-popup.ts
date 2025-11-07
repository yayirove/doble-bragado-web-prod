// Ventana de vigencia (zona horaria AR -03:00)
const START_ISO = "2025-10-28T00:00:00-03:00";
const END_ISO   = "2025-11-28T23:59:59-03:00";

const STORAGE_KEY = "ldb_news_popup_last_dismiss";
const DISMISS_HOURS = 24; // no volver a mostrar por 24h

function inWindow(now = new Date()): boolean {
  const start = new Date(START_ISO).getTime();
  const end = new Date(END_ISO).getTime();
  const t = now.getTime();
  return t >= start && t <= end;
}

function shouldShow(): boolean {
  if (!inWindow()) return false;
  try {
    const ts = Number(localStorage.getItem(STORAGE_KEY) || "0");
    if (!ts) return true;
    const diffH = (Date.now() - ts) / 36e5;
    return diffH >= DISMISS_HOURS;
  } catch {
    return true;
  }
}

function markDismissed() {
  try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
}

export default function initNewsPopup() {
  const root = document.querySelector<HTMLElement>("[data-news-popup]");
  if (!root) return;

  const panel = root.querySelector<HTMLElement>("[data-news-panel]")!;
  const overlay = root.querySelector<HTMLElement>("[data-news-overlay]")!;
  const viewAnnounce = root.querySelector<HTMLElement>('[data-news-view="announce"]')!;
  const viewForm = root.querySelector<HTMLElement>('[data-news-view="form"]')!;
  const iframe = root.querySelector<HTMLIFrameElement>("[data-news-iframe]")!;
  const formSrc = root.dataset.formSrc || "";

  // helpers
  const open = () => {
    root.classList.remove("hidden");
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      panel.style.opacity = "1";
      panel.style.transform = "translateY(0)";
    });
    document.addEventListener("keydown", onEsc);
  };
  const close = () => {
    overlay.style.opacity = "0";
    panel.style.opacity = "0";
    panel.style.transform = "translateY(1rem)";
    setTimeout(() => {
      root.classList.add("hidden");
      // limpiar iframe si estaba abierto
      if (iframe?.src) iframe.src = "";
      showAnnounce();
      document.removeEventListener("keydown", onEsc);
    }, 180);
  };
  const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };

  const showAnnounce = () => {
    viewAnnounce.classList.remove("hidden");
    viewForm.classList.add("hidden");
  };
  const showForm = () => {
    if (formSrc) iframe.src = formSrc;
    viewAnnounce.classList.add("hidden");
    viewForm.classList.remove("hidden");
  };

  // wire events
  root.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t === overlay) close();
    const act = t.closest<HTMLElement>("[data-action]");
    if (!act) return;

    const action = act.dataset.action;
    if (action === "close") { markDismissed(); close(); }
    if (action === "dismiss-today") { markDismissed(); close(); }
    if (action === "open-form") { showForm(); }
    if (action === "back-to-announce") { showAnnounce(); }
  });

  // auto-open si corresponde
  if (shouldShow()) {
    (window as any).requestIdleCallback?.(() => open()) ?? setTimeout(open, 300);
  }
}
