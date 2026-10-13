import { reducedMotion } from './motion';

/** Même seuil que la mise en page sur deux colonnes (global.css) : en dessous, pas de défilement par étapes. */
const desktop = matchMedia('(min-width: 961px)');

/**
 * Expose la hauteur de l'élément en --sticky-h, pour le centrer sous l'en-tête (voir global.css).
 * On garde la plus grande hauteur vue (remise à zéro au redimensionnement) : une légende
 * plus courte ne doit pas faire sauter l'élément épinglé.
 */
export function observeStickyHeight(el: HTMLElement): void {
  let max = 0;
  const apply = () => {
    max = Math.max(max, el.offsetHeight);
    el.style.setProperty('--sticky-h', `${max}px`);
  };
  new ResizeObserver(apply).observe(el);
  addEventListener('resize', () => { max = 0; apply(); });
}

/**
 * Fait défiler des étapes au scroll : `sticky` reste épinglé pendant que
 * `track` défile, et la distance parcourue choisit l'étape affichée.
 * La hauteur ajoutée au rail vient de la variable CSS --steps (voir global.css).
 *
 * Sur téléphone le mécanisme est coupé : les onglets changent l'écran sans faire défiler.
 *
 * Renvoie `goTo(i)`, qui fait défiler la page jusqu'à l'étape i
 * (pour garder onglets et défilement synchronisés).
 */
export function initScrollSteps(
  track: HTMLElement,
  sticky: HTMLElement,
  count: number,
  onStep: (index: number) => void,
): (index: number) => void {
  let current = 0, programmatic = false, targetY = 0, releaseTimer = 0, ticking = false;

  observeStickyHeight(sticky);

  function geometry() {
    const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const distance = track.offsetHeight - sticky.offsetHeight;
    const travelled = stickyTop - track.getBoundingClientRect().top;
    return { stickyTop, distance, travelled };
  }

  function update(): void {
    ticking = false;
    if (!desktop.matches) return;
    if (programmatic) {
      if (Math.abs(scrollY - targetY) < 2) release();
      return;
    }
    const { distance, travelled } = geometry();
    if (distance <= 0) return;
    const p = Math.min(1, Math.max(0, travelled / distance));
    const i = Math.min(count - 1, Math.floor(p * count));
    if (i !== current) { current = i; onStep(i); }
  }
  function release(): void { programmatic = false; clearTimeout(releaseTimer); }
  function releaseLater(): void { release(); update(); }

  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  desktop.addEventListener('change', update);
  update();

  return (i: number) => {
    current = i;
    if (!desktop.matches) return;
    const { distance, travelled } = geometry();
    targetY = Math.round(scrollY - travelled + (i + .5) / count * distance);
    programmatic = true;
    clearTimeout(releaseTimer);
    releaseTimer = window.setTimeout(releaseLater, 1200);
    scrollTo({ top: targetY, behavior: reducedMotion ? 'auto' : 'smooth' });
  };
}
