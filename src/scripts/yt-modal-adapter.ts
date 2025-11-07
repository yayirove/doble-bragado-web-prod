// src/scripts/yt-modal-adapter.ts

// Utilidad segura: corre el callback cuando el DOM está listo (y sólo en browser)
function onReady(cb: () => void) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cb, { once: true });
  } else {
    cb();
  }
}

// Inicialización del modal de YouTube
export default function init() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  onReady(() => {
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("modal-iframe") as HTMLIFrameElement | null;
    if (!modal || !iframe) return;

    // Botones que abren el modal (cualquier elemento con data-ytid)
    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-ytid]"));

    // Cerrar: click en overlay o botón con data-close-modal
    const closeEls = Array.from(modal.querySelectorAll<HTMLElement>("[data-close-modal]"));

    let lastFocused: HTMLElement | null = null;

    const openModal = (ytid: string) => {
      lastFocused = (document.activeElement as HTMLElement) || null;

      const url = new URL("https://www.youtube-nocookie.com/embed/" + ytid);
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("rel", "0");
      url.searchParams.set("playsinline", "1");

      iframe.src = url.toString();
      modal.classList.remove("hidden");
      modal.classList.add("flex");

      // focus management
      (modal.querySelector('[data-close-modal]') as HTMLElement | null)?.focus();

      // bloquear scroll del body si querés
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    };

    const closeModal = () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      iframe.src = ""; // detiene reproducción
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
      // devolver focus
      if (lastFocused) lastFocused.focus();
    };

    // Delegación de apertura
    triggers.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const ytid = el.getAttribute("data-ytid") || "";
        if (!ytid) return;
        openModal(ytid);
      });
      el.addEventListener("keydown", (e) => {
        if ((e as KeyboardEvent).key === "Enter" || (e as KeyboardEvent).key === " ") {
          e.preventDefault();
          const ytid = el.getAttribute("data-ytid") || "";
          if (!ytid) return;
          openModal(ytid);
        }
      });
    });

    // Cierres
    closeEls.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
      });
    });

    // Cerrar con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    });

    // Cerrar al clickear fuera del contenedor (overlay tiene data-close-modal)
    // Ya cubierto por [data-close-modal] en el overlay del HTML.

    // Prevención básica de scroll background en iOS
    modal.addEventListener(
      "touchmove",
      (e) => {
        if (!modal.classList.contains("hidden")) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  });
}
