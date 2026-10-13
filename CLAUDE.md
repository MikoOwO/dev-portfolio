# Portfolio de Mélik Zaanouni

Site portfolio d'un développeur full-stack (MSc Data Science, EPFL). Bilingue : français sur `/` (langue par défaut), anglais sur `/en/`, sélecteur FR/EN dans l'en-tête.
Point de départ : `prototype/index.html`, un prototype autonome (CSS et JS inline, images en data URI, three.js r128 chargé depuis cdnjs), conservé comme référence visuelle.
Les captures d'écran existent aussi en fichiers dans `public/images/`.
La migration vers Astro est faite : le rendu du build a été comparé pixel par pixel au prototype (voir `src/scripts/three-compat.ts` pour l'éclairage).

## Objectif
Transformer le prototype en projet Astro statique, maintenable, déployé sur Vercel, sans perdre le design ni les interactions.

## Contenu (ne pas inventer de chiffres ni de liens)
- Hero : ville 3D de colonnes (three.js, InstancedMesh) qui réagit au curseur.
- CapXValue (projet principal, capxvalue.com) : navigateur incliné avec 4 écrans en onglets qui défilent au scroll, graphe de traçabilité interactif (Résultat net 2028 = 5 306, EBITDA = 9 866, CA 2028 = 59 075, CA 2025 = 46 250, note 6.1 du rapport annuel 2024).
- Ahla Cashflow : pile 3D de 3 captures qui défilent au scroll + jeu « Tenez la caisse d'octobre » (5 transactions, seuil 15 000 €, budget 45 000 €, 1 bloc = 2 000 €).
- Tous les montants affichés sur le site sont en euros.
- ArchiTech : plan 2D qui s'élève en 3D (three.js), lien vers la démo vidéo (Google Drive). Captures à venir.
- Parcours (frise), outils, contact.

## Design system (à respecter)
- Palette « Abysse », variables CSS sur :root : --bg #050E1F, --bg-deep #020815, --surface #0A1931, --surface-2 #10264A, --line #1C3558, --ink #DDE8F6, --ink-soft #91A7C6, --ink-faint #6E86A9, --accent #7FD6FF, --warn #FFA26B.
- Police unique : Schibsted Grotesk (Google Fonts), titres en 700 avec letter-spacing négatif. Pas d'Inter, Roboto, Arial ni Space Grotesk.
- Pas de dégradés décoratifs, pas d'emoji, pas de labels en majuscules espacées.
- Accessibilité : vrais <button>/<a>, focus visible, aria sur les onglets, contraste AA, `prefers-reduced-motion` respecté (animations coupées, scènes 3D figées).
- Responsive jusqu'à 360 px de large. Les scènes 3D se mettent en pause hors écran.

## Conventions techniques
- Astro + TypeScript. Un composant par section dans `src/components/`, qui reçoit `lang` en prop.
- Tous les textes sont dans `src/i18n/fr.ts` et `src/i18n/en.ts` (même structure, typée depuis fr.ts) : toute modification de texte se fait dans les deux. Les textes utilisés par les scripts client passent par un attribut `data-strings` (JSON). Les scènes three.js dans `src/scripts/` et chargées côté client uniquement.
- three.js installé via npm (version récente). Attention : depuis r155 l'éclairage est physiquement correct, il faut réajuster les intensités des lumières pour retrouver le rendu du prototype.
- Images dans `public/images/` (WebP), avec width/height et loading="lazy" sous la ligne de flottaison.
- Avant chaque commit : `npm run build` doit passer.
