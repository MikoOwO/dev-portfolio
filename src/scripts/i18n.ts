/** Remplace les `{clé}` d'un texte traduit par leurs valeurs. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ''));
}

/** Lit un objet de textes sérialisé en JSON dans un attribut data-*. */
export function readStrings<T>(el: HTMLElement, key = 'strings'): T {
  return JSON.parse(el.dataset[key] ?? '{}') as T;
}
