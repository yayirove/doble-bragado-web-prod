// /public/scripts/yt-modal-adapter.js
(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  function ready(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 0);
    } else {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    }
  }

  ready(() => {
    const modal = document.getElementById("yt-modal");
    const overlay = document.getElementById("yt-overlay");
    const closeBtn = document.getElementById("yt-close");
    const iframe = document.getElementById("yt-iframe");

    if (!modal || !overlay || !closeBtn || !iframe) {
      // IDs no encontrados: no rompemos nada, solo salimos.
      return;
    }

    function openModal(ytid) {
      if (!ytid) return;
      const src =
        "https://www.youtube-nocookie.com/embed/" +
        encodeURIComponent(ytid) +
        "?autoplay=1&rel=0&playsinline=1&modestbranding=1&color=white";
      iframe.setAttribute("src", src);
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      iframe.setAttribute("src", "about:blank");
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }

    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    // Delegación global: cualquier botón/link con data-ytid abre el modal
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-ytid]");
      if (!btn) return;
      e.preventDefault();
      const ytid = btn.getAttribute("data-ytid");
      openModal(ytid);
    });
  });
})();
