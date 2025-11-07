export function setupVideoModal() {
  if (typeof window === "undefined") return;

  const videoModal = document.getElementById("video-modal");
  const iframe = document.getElementById("youtube-iframe") as HTMLIFrameElement | null;
  const openBtns = document.querySelectorAll<HTMLButtonElement>(".open-video-modal");
  const closeBtn = document.getElementById("close-video-modal");

  if (!videoModal || !iframe) return;

  function openModal(videoId: string) {
    if (!videoId || videoId === "PENDIENTE_VIDEO_FEMENINO") return;
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    videoModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    iframe.src = "";
    videoModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.videoid;
      if (id) openModal(id);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  videoModal.addEventListener("click", (ev) => {
    if (ev.target === videoModal) closeModal();
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !videoModal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

// Auto-inicialización para cuando el script se carga globalmente
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", setupVideoModal);
  // Soporte para View Transitions de Astro
  document.addEventListener("astro:page-load", setupVideoModal);
}