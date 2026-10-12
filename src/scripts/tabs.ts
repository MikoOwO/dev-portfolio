/**
 * Comportement commun des listes d'onglets (role="tablist") :
 * aria-selected, tabindex itinérant et flèches gauche/droite.
 */
export function initTabs(
  tabs: HTMLElement[],
  onSelect: (index: number, tab: HTMLElement) => void,
): (index: number, focus?: boolean) => void {
  function select(i: number, focus = false): void {
    tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', String(i === j));
      t.tabIndex = i === j ? 0 : -1;
    });
    onSelect(i, tabs[i]);
    if (focus) tabs[i].focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
    });
  });
  return select;
}
