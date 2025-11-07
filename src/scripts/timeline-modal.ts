export function initTimelineModal() {
  if (typeof window === "undefined") return;

  const timelineModal = document.getElementById("timelineModal") as HTMLElement | null;
  const closeTimelineBtn = document.getElementById("closeTimelineModal") as HTMLButtonElement | null;
  const openTimelineBtn = document.getElementById("openTimelineBtn") as HTMLButtonElement | null;
  const filterBtns = document.querySelectorAll(".filter-btn");
  const timelineItems = document.querySelectorAll(".timeline-item[data-era]");
  const filterAll = document.getElementById("filterAll") as HTMLButtonElement | null;

  if (!timelineModal || !openTimelineBtn || !closeTimelineBtn) {
    return;
  }

  let focusedElementBeforeModal: HTMLElement | null;
  let scrollPosition = 0;

  const openTimelineModal = () => {
    focusedElementBeforeModal = document.activeElement as HTMLElement;
    scrollPosition = window.pageYOffset;

    const url = new URL(window.location.href);
    if (!url.searchParams.has("timeline")) {
      url.searchParams.set("timeline", "true");
      window.history.pushState({}, "", url);
    }

    requestAnimationFrame(() => {
      timelineModal.classList.remove("opacity-0", "invisible");
      timelineModal.classList.add("opacity-100", "visible");
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";
    });

    closeTimelineBtn?.focus();
  };

  const closeTimelineModal = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("timeline");
    url.searchParams.delete("era");
    window.history.pushState({}, "", url);

    requestAnimationFrame(() => {
      timelineModal.classList.add("opacity-0", "invisible");
      timelineModal.classList.remove("opacity-100", "visible");

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollPosition);
    });

    focusedElementBeforeModal?.focus();
    filterByEra("all", false); // Reset filter visually without changing URL
  };

  const filterByEra = (selectedEra: string, updateHistory = true) => {
    if (updateHistory) {
      const url = new URL(window.location.href);
      if (selectedEra === "all") {
        url.searchParams.delete("era");
      } else {
        url.searchParams.set("era", selectedEra);
      }
      window.history.pushState({}, "", url);
    }

    requestAnimationFrame(() => {
      filterBtns.forEach((btn) => btn.classList.remove("ring-4", "ring-amarillo"));
      const activeBtn = document.querySelector(`[data-era="${selectedEra}"]`);
      activeBtn?.classList.add("ring-4", "ring-amarillo");

      let visibleCount = 0;
      timelineItems.forEach((item) => {
        const itemEl = item as HTMLElement;
        const itemEra = itemEl.dataset.era;
        if (selectedEra === "all" || itemEra === selectedEra) {
          itemEl.style.display = "flex";
          itemEl.style.animationDelay = `${visibleCount * 15}ms`;
          itemEl.classList.add("animate-fadeIn");
          visibleCount++;
        } else {
          itemEl.style.display = "none";
          itemEl.classList.remove("animate-fadeIn");
        }
      });
    });
  };

  openTimelineBtn.addEventListener("click", openTimelineModal);
  closeTimelineBtn.addEventListener("click", closeTimelineModal);
  timelineModal.addEventListener("click", (e) => {
    if (e.target === timelineModal) closeTimelineModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && timelineModal.classList.contains("visible")) {
      closeTimelineModal();
    }
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const era = (btn as HTMLElement).dataset.era;
      if (era) filterByEra(era);
    });
  });

  // Initialize from URL on page load
  const params = new URLSearchParams(window.location.search);
  const showTimeline = params.has("timeline");
  const initialEra = params.get("era") || "all";

  if (showTimeline) {
    // A slight delay to allow page transitions to finish
    setTimeout(openTimelineModal, 100);
  }
  
  // Apply initial filter state
  filterByEra(initialEra, false);
}

// Auto-initialize the script
document.addEventListener("astro:page-load", initTimelineModal);