# Portfolio Mélik Zaanouni

Site statique Astro + TypeScript, déployé sur Vercel.
Contexte et règles pour Claude Code : voir `CLAUDE.md`.

## Commandes

| Commande          | Action                                                   |
| ----------------- | -------------------------------------------------------- |
| `npm install`     | Installe les dépendances (Node 22.12 ou plus récent)     |
| `npm run dev`     | Serveur de développement sur `http://localhost:4321`     |
| `npm run build`   | Vérifie les types (`astro check`) puis génère `dist/`    |
| `npm run preview` | Sert le build localement                                 |

## Structure

```
public/images/        captures d'écran (WebP)
src/layouts/          BaseLayout : <head>, polices, apparition au défilement
src/pages/index.astro assemble les sections
src/components/       un composant par section
  Header, Hero, Projects (CapXValue + Traceability, AhlaCashflow + CashGame, ArchiTech),
  Parcours, Outils, Contact, Footer
src/scripts/          code client
  city.ts, cash-scene.ts, plan.ts   scènes three.js
  three-compat.ts                    réglages pour retrouver le rendu de three r128
  motion.ts, tabs.ts, reveal.ts      utilitaires partagés
src/styles/global.css palette « Abysse », typographie, gabarits communs
prototype/index.html  prototype autonome d'origine, conservé comme référence visuelle
```

## Déploiement

Vercel détecte Astro : commande `npm run build`, dossier de sortie `dist/`.
