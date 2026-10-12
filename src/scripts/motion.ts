/** Préférence lue une fois au chargement, comme dans le prototype. */
export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Valeur d'une variable CSS déclarée sur :root (palette « Abysse »). */
export function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Récupère un élément par id, en échouant clairement s'il manque dans le balisage. */
export function byId<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Élément #${id} introuvable`);
  return el as T;
}
