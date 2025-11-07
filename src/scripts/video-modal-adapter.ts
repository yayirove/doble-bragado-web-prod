// src/scripts/video-modal-adapter.ts
// Reusa tu modal actual (recorrido.astro) para abrir videos de YouTube en esta página.

const MODAL_SEL  = '#video-modal';     // ⬅️ CAMBIAR si tu modal tiene otro id/clase
const PLAYER_SEL = '#video-modal-body';// ⬅️ CAMBIAR al contenedor donde va el iframe
const CLOSE_SEL  = '[data-close]';     // ⬅️ CAMBIAR a tu selector de cierre

function getEl<T extends Element>(sel: string): T | null {
  return document.querySelector<T>(sel);
}

function openModal(iframeHTML: string) {
  const modal  = getEl<HTMLElement>(MODAL_SEL);
  const player = getEl<HTMLElement>(PLAYER_SEL);
  if (!modal || !player) return;

  // Inyectar el reproductor
  player.innerHTML = iframeHTML;

  // Mostrar modal (ajusta según tus clases/atribs actuales)
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');

  // Foco en botón cerrar si existe
  const closer = modal.querySelector<HTMLButtonElement>(CLOSE_SEL);
  closer?.focus();

  // Esc para cerrar
  document.addEventListener('keydown', onKeydown);
}

function closeModal() {
  const modal  = getEl<HTMLElement>(MODAL_SEL);
  const player = getEl<HTMLElement>(PLAYER_SEL);
  if (!modal) return;

  // Ocultar modal (ajusta según tu implementación actual)
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');

  // Retirar iframe para parar audio
  if (player) player.innerHTML = '';

  document.removeEventListener('keydown', onKeydown);

  // Volver el foco al botón que abrió
  const last = document.querySelector<HTMLElement>('button[data-ytid][data-last-focus="1"]');
  if (last) {
    last.removeAttribute('data-last-focus');
    last.focus();
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal();
}

function buildYouTubeIframe(id: string) {
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  return `<iframe width="100%" height="100%" src="${src}"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

export function initVideoModalAdapter() {
  // Delegación: cualquier <button data-ytid="..."> abre el modal existente
  document.addEventListener('click', (ev) => {
    const btn = (ev.target as HTMLElement).closest<HTMLButtonElement>('button[data-ytid]');
    if (!btn) return;

    const id = btn.getAttribute('data-ytid') || '';
    if (!id) return;

    btn.setAttribute('data-last-focus', '1');
    openModal(buildYouTubeIframe(id));
  });

  // Cierre por backdrop/botón (usa tu selector de cierre)
  const modal = getEl<HTMLElement>(MODAL_SEL);
  modal?.addEventListener('click', (ev) => {
    const closer = (ev.target as HTMLElement).closest(CLOSE_SEL);
    if (closer) closeModal();
  });
}

// Auto-init
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoModalAdapter);
  } else {
    initVideoModalAdapter();
  }
}
