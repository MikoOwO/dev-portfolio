/**
 * Comportement commun des listes d'onglets (role="tablist") :
 * aria-selected, tabindex itinérant et flèches gauche/droite.
 *
 * `render` affiche l'onglet actif ; `onUserSelect` n'est appelé que pour un
 * choix de l'utilisateur (clic, clavier), pas pour `setActive` appelé par le code.
 */
export function initTabs(
  tabs: HTMLElement[],
  render: (index: number, tab: HTMLElement) => void,
  onUserSelect?: (index: number) => void,
): (index: number) => void {
  let current = -1;
  function setActive(i: number): void {
    if (i === current) return;
    current = i;
    tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', String(i === j));
      t.tabIndex = i === j ? 0 : -1;
    });
    render(i, tabs[i]);
  }
  function choose(i: number, focus = false): void {
    setActive(i);
    if (focus) tabs[i].focus();
    onUserSelect?.(i);
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => choose(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); choose((i + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); choose((i - 1 + tabs.length) % tabs.length, true); }
    });
  });
  current = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
  return setActive;
}
