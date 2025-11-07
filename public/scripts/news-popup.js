// Ventana de vigencia (zona horaria AR -03:00)
const START_ISO = "2025-10-28T00:00:00-03:00";
const END_ISO   = "2025-11-28T23:59:59-03:00";

const STORAGE_KEY = "ldb_news_popup_last_dismiss";     // persistente (evita re-mostrar por X horas)
const SESSION_KEY = "ldb_news_popup_seen_session";     // solo por pestaña/sesión (mostrar 1 sola vez)
const DISMISS_HOURS = 0; // 0 = se puede volver a mostrar en otra sesión; cambiar a 24 si querés 24h

function inWindow(now = new Date()) {
  const start = new Date(START_ISO).getTime();
  const end = new Date(END_ISO).getTime();
  const t = now.getTime();
  return t >= start && t <= end;
}

function shouldShow() {
  if (!inWindow()) return false;

  // Si ya se mostró en esta sesión (pestaña), no volver a mostrar hasta que el usuario cierre la pestaña
  try {
    if (sessionStorage.getItem(SESSION_KEY) === "1") return false;
  } catch {}

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

function initNewsPopup() {
  const root = document.querySelector("[data-news-popup]");
  if (!root) return;

  const panel = root.querySelector("[data-news-panel]");
  const overlay = root.querySelector("[data-news-overlay]");
  const viewAnnounce = root.querySelector('[data-news-view="announce"]');
  const viewForm = root.querySelector('[data-news-view="form"]');
  const iframe = root.querySelector("[data-news-iframe]");
  const formSrc = root.dataset.formSrc || "";

  const onEsc = (e) => { if (e.key === "Escape") close(); };

  const showAnnounce = () => {
    viewAnnounce.classList.remove("hidden");
    viewForm.classList.add("hidden");
  };
  const showForm = () => {
    if (formSrc) iframe.src = formSrc;
    viewAnnounce.classList.add("hidden");
    viewForm.classList.remove("hidden");
  };

  const open = () => {
    // Marcar visto en esta sesión (solo una vez por primera carga/ingreso)
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}

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
      if (iframe && iframe.src) iframe.src = "";
      showAnnounce();
      document.removeEventListener("keydown", onEsc);
    }, 180);
  };

  root.addEventListener("click", (e) => {
    const t = e.target;
    if (t === overlay) close();
    const act = t.closest?.("[data-action]");
    if (!act) return;

    const action = act.dataset.action;
    if (action === "close") { markDismissed(); close(); }
    if (action === "dismiss-today") { markDismissed(); close(); }
    if (action === "open-form") { showForm(); }
    if (action === "back-to-announce") { showAnnounce(); }
  });

  if (shouldShow()) {
    (window.requestIdleCallback?.(() => open())) ?? setTimeout(open, 300);
  }
}

if (typeof window !== "undefined") {
  // Ayuda para testing manual desde consola:
  // localStorage.removeItem(STORAGE_KEY);
  // sessionStorage.removeItem(SESSION_KEY);
  initNewsPopup();
}
