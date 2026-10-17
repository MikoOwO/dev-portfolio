/*
 * Textes du site en français (langue par défaut, servie sur /).
 * La version anglaise (en.ts) suit exactement la même forme.
 * Les champs `list` et `prize` contiennent du HTML (<strong>) rendu avec set:html.
 */
export const fr = {
  meta: {
    title: 'M-Solutions, par Mélik Zaanouni',
    description: 'M-Solutions, par Mélik Zaanouni : CapXValue, Ahla Cashflow, ArchiTech. Full-stack, IA et moteurs de calcul financier.',
    skip: 'Aller au contenu',
  },
  header: {
    brandLabel: 'M-Solutions, retour en haut',
    navLabel: 'Navigation principale',
    nav: { projects: 'Projets', background: 'Parcours', contact: 'Contact' },
    langLabel: 'Langue',
  },
  hero: {
    who: 'Mélik Zaanouni, développeur full-stack, MSc Data Science à l’EPFL',
    lines: ['Une idée d’une', 'solution digitale,', 'parlons en\u00a0!'],
    lede: 'Nous vous apportons le meilleur de l’IA pour vous accompagner depuis la conception jusqu’à la mise en production de solutions qui vous font gagner en efficacité avec des résultats mesurables.',
    ctaProjects: 'Voir les projets',
    ctaContact: 'Nous contacter',
  },
  projects: {
    title: 'Trois produits, du moteur de calcul à la façade 3D.',
    intro: 'Deux sont en production et utilisés tous les jours. Le troisième a remporté le premier prix du Talan Summer Camp.',
    titleTwo: 'Deux produits, du moteur de calcul à la trésorerie.',
    sourceCode: 'Code source',
  },
  capx: {
    tags: { live: 'En production', role: 'Full-stack', period: '2026 – aujourd’hui' },
    sub: 'Un business plan sur sept ans dont chaque montant renvoie à sa source.',
    list: [
      'Plateforme SaaS fintech de <strong>valorisation d’entreprise</strong> et de préparation à la levée de fonds.',
      '<strong>Ingestion OCR</strong> des états financiers certifiés, puis projection du compte de résultat, du bilan et de la trésorerie 2026–2032.',
      'Moteur de calcul financier en <strong>Python pur</strong>, séparé de la couche web et verrouillé par des tests automatisés.',
    ],
    open: 'Ouvrir capxvalue.com',
    tabsLabel: 'Écrans de CapXValue',
    views: {
      home: {
        tab: 'Le site', url: 'capxvalue',
        alt: 'Page d’accueil de CapXValue : « Votre conseil en corporate finance digital », avec un aperçu du compte de résultat.',
        cap: 'La promesse : un business plan sur sept ans dont chaque montant se justifie.',
      },
      hist: {
        tab: 'Importer', url: 'capxvalue / données historiques',
        alt: 'Étape Données historiques : dépôt des PDF d’états financiers et tableau des montants lus, vérifiables un par un.',
        cap: 'On dépose les PDF, l’OCR lit les montants, l’utilisateur vérifie ceux dont la lecture est incertaine.',
      },
      hyp: {
        tab: 'Hypothèses', url: 'capxvalue / hypothèses',
        alt: 'Étape Hypothèses : les six hypothèses principales par exercice projeté, avec la moyenne historique comme valeur par défaut.',
        cap: 'Chaque saisie recalcule le modèle. Une hypothèse vide vaut la moyenne historique du projet.',
      },
      model: {
        tab: 'Modèle', url: 'capxvalue / modèle financier',
        alt: 'Étape Modèle financier : compte de résultat de 2022 à 2032, exercices historiques et projetés, exportable en Excel.',
        cap: 'Compte de résultat, bilan et trésorerie de 2022 à 2032, exportables en Excel.',
      },
    },
  },
  trace: {
    title: 'D’où vient ce chiffre ?',
    intro: 'Choisissez un résultat : le moteur remonte son calcul, hypothèse par hypothèse, jusqu’à la ligne du rapport annuel.',
    picksLabel: 'Résultat à retracer',
    kinds: { real: 'Réel', hyp: 'Hypothèse', calc: 'Calcul' },
    nodes: {
      src: { title: 'Rapport annuel 2024', value: 'Note 6.1, page 3' },
      g: { title: 'Croissance', value: '8,5 % par an' },
      cost: { title: 'Coûts d’exploitation', value: '83,3 % du CA' },
      tax: { title: 'Taux d’impôt', value: '20 %' },
      ca25: { title: 'CA 2025', value: '46 250' },
      ca28: { title: 'CA 2028', value: '59 075' },
      ebitda: { title: 'EBITDA 2028', value: '9 866' },
      rn: { title: 'Résultat net 2028', value: '5 306' },
    },
    picks: {
      rn: 'Résultat net 2028',
      ebitda: 'EBITDA 2028',
      ca28: 'Chiffre d’affaires 2028',
    },
    formulas: {
      rn: 'Résultat net = EBIT + résultat financier − impôt. Huit éléments, dont trois hypothèses et une note du rapport annuel.',
      ebitda: 'EBITDA = chiffre d’affaires × (1 − coûts d’exploitation). Six éléments, dont deux hypothèses.',
      ca28: 'CA 2028 = CA 2025 × (1 + 8,5 %)³. Quatre éléments, dont une hypothèse et une note du rapport annuel.',
    },
  },
  ahla: {
    tags: { live: 'En production', role: 'Développeur unique', period: '2025 – 2026' },
    sub: 'Une trésorerie lisible pour une résidence étudiante, conçue et livrée seul.',
    list: [
      'SaaS B2B de gestion de trésorerie, du recueil des besoins jusqu’à la <strong>mise en production</strong>.',
      'Position de caisse sur n’importe quelle période et <strong>email quotidien au CEO</strong> résumant les dépenses de la veille.',
      'Tableaux de bord KPI qui comparent les mois et classent les dépenses récurrentes pour <strong>repérer les dépassements tôt</strong>.',
      'Assistant IA agentique (<strong>Mistral</strong>) et contrôle d’accès multi-niveaux.',
    ],
    open: 'Ouvrir ahlapp.com',
    tabsLabel: 'Écrans d’Ahla Cashflow',
    cards: {
      dash: {
        tab: 'Tableau de bord',
        alt: 'Tableau de bord Ahla Cashflow : caisse actuelle, recettes, dépenses, solde de la période et transactions récentes.',
        cap: 'Vue d’ensemble : caisse réelle, budgétée et projetée sur la période choisie.',
      },
      budget: {
        tab: 'Budget',
        alt: 'Écran Budget et prévisions : consommation globale du budget, graphique budget contre réel et répartition des dépenses par catégorie.',
        cap: 'Budget contre réel par catégorie, avec l’écart signalé ligne par ligne.',
      },
      portal: {
        tab: 'Portail',
        alt: 'Portail AHLA : choix de l’espace de travail entre Ahla Cashflow et Ahla Hospitality.',
        cap: 'Le portail AHLA : un écosystème, deux espaces de travail.',
      },
    },
  },
  game: {
    canvasLabel: 'Deux colonnes en 3D : à gauche la caisse avec son seuil de sécurité, à droite le budget dépenses du mois qui se remplit à chaque paiement.',
    legend: { cash: 'Caisse, 1 bloc = 2 000 €', jar: 'Budget dépenses du mois', warn: 'Seuil ou dépassement' },
    drag: 'Faites glisser pour tourner',
    title: 'Tenez la caisse d’octobre.',
    rules: 'Cinq transactions d’une résidence étudiante. Payez ou reportez chaque dépense : la caisse doit rester au-dessus de 15 000 € et les dépenses sous le budget de 45 000 €.',
    mailFrom: 'Ahla Cashflow, résumé envoyé au CEO à 08:00',
    replay: 'Rejouer le mois',
    stats: { cash: 'Caisse', budget: 'Budget consommé', deferred: 'Reporté' },
    /* textes utilisés par le script du jeu ; `{x}` est remplacé à l'exécution */
    client: {
      locale: 'fr-FR',
      // même ordre que EVENTS dans CashGame.astro
      events: [
        { date: '01/10/2026', desc: 'Loyers résidents, bâtiment A', cat: 'Loyers & Hébergement' },
        { date: '03/10/2026', desc: 'Salaires du personnel', cat: 'Personnel' },
        { date: '06/10/2026', desc: 'Réparation de la chaudière', cat: 'Services extérieurs' },
        { date: '10/10/2026', desc: 'Nouveau mobilier pour la salle commune', cat: 'Achats & Fournisseurs' },
        { date: '17/10/2026', desc: 'Loyers résidents, bâtiment B', cat: 'Loyers & Hébergement' },
      ],
      flags: {
        in: 'Recette : encaissée dès réception.',
        must: 'Non reportable : à payer ce mois-ci.',
        urgent: 'Urgent : la reporter coûte 30 % de plus le mois prochain.',
        opt: 'Reportable sans frais au mois prochain.',
      },
      actions: { collect: 'Encaisser', pay: 'Payer', defer: 'Reporter', deferUrgent: 'Reporter (+30 %)' },
      live: {
        collected: 'Encaissé {amount}.',
        paid: 'Payé {amount}.',
        deferred: 'Reporté : {amount} au mois prochain.',
        cash: 'Caisse : {amount}.',
        below: ' Sous le seuil de sécurité.',
      },
      checks: {
        cash: 'Caisse toujours au-dessus du seuil (point bas {amount})',
        budget: 'Dépenses dans le budget ({pct} consommé)',
        urgentKo: '{n} dépense urgente reportée avec pénalité',
        urgentOk: 'Aucune dépense urgente reportée',
      },
      verdicts: {
        3: 'Mois maîtrisé. C’est exactement ce qu’Ahla aide à voir chaque matin.',
        2: 'Presque : un point à surveiller avant le mois prochain.',
        low: 'Le mois a dérapé. Rejouez pour trouver le bon arbitrage.',
      },
      figs: { cash: 'Caisse finale', spent: 'Dépenses payées', deferred: 'Reporté au mois prochain', score: 'Score', scoreValue: '{n} / 3' },
      scene: { cash: 'Caisse', jar: 'Budget du mois', seuil: 'Seuil {amount}', budget: 'Budget {amount}' },
    },
  },
  architech: {
    tags: { context: 'Stage IA générative, Talan', team: 'Projet d’équipe', period: 'Juil. – août 2026' },
    sub: 'L’IA qui passe d’un programme architectural à un bâtiment posé sur sa carte.',
    list: [
      'Plateforme qui automatise la <strong>faisabilité réglementaire</strong>, les plans 2D/3D et l’estimation des coûts.',
      'Nous avons débloqué la <strong>génération de plans 3D</strong> : outils d’agent trouvés dans le logiciel open source Pascal, faisabilité prouvée avec Claude Code, puis intégration.',
      'Ajout de la <strong>génération de façades 3D</strong> à partir d’images (NanoBanana, API Meshy) et placement des bâtiments sur une carte 3D, dans leur environnement réel.',
    ],
    prize: '<strong>1er prix, Talan Summer Camp 2026</strong>Face à 10 équipes d’étudiants de l’EPFL, HEC et Centrale. Nous avons porté le pitch final.',
    demo: 'Voir la démo',
    canvasLabel: 'Plan d’un logement qui s’élève en volume 3D, inspiré du pipeline ArchiTech.',
    plan: { to3d: 'Passer en 3D', to2d: 'Revenir au plan 2D', drag: 'Faites glisser pour tourner', built: 'Volume généré depuis le plan' },
  },
  background: {
    title: 'Tunis, Lausanne, Valence, et retour.',
    intro: 'Des études en systèmes de communication puis en data science, et à chaque étape un projet concret mené en parallèle des cours.',
    steps: [
      {
        year: '2026', highlight: true,
        title: 'MSc Data Science à l’EPFL, et CapXValue',
        text: 'Master en cours depuis septembre, en parallèle du développement full-stack de CapXValue. Bachelor en Systèmes de communication obtenu en juin (moyenne 4,93/6).',
        place: 'EPFL, Lausanne',
      },
      {
        year: '2026', highlight: true,
        title: 'Stage IA générative chez Talan, 1er prix',
        text: 'Deux mois sur ArchiTech, conclus par le premier prix du Summer Camp.',
        place: 'Talan, juillet – août',
      },
      {
        year: '2025',
        title: 'Année d’échange et Ahla Cashflow',
        text: 'Troisième année de bachelor à l’UPV, en espagnol. Conception et mise en production d’Ahla Cashflow en solo.',
        place: 'Universitat Politècnica de València',
      },
      {
        year: '2025',
        title: 'Collaborateur chez Celestial Wave Design',
        text: 'Agence web et mobile pour le marché suisse. Statut de fournisseur agréé obtenu auprès d’un laboratoire de photonique de l’EPFL.',
      },
      {
        year: '2024',
        title: 'Enseigner le code',
        text: 'Assistant à l’EPFL pour des étudiants hors informatique, cours de programmation pour 30 filles de 9 à 11 ans, atelier sur les deepfakes à l’École internationale de Genève.',
      },
      {
        year: '2023',
        title: 'Bac mention très bien, premiers produits vendus',
        text: 'Baccalauréat français, 17,92/20, section européenne. Plus de 150 maillots de football personnalisés produits et vendus, et le best-seller de la marque Cailloux Athletics (plus de 200 pièces).',
        place: 'Lycée Gustave Flaubert, Tunis',
      },
    ] as { year: string; title: string; text: string; place?: string; highlight?: boolean }[],
  },
  tools: {
    title: 'Avec quoi nous travaillons.',
    intro: 'Python pour la data et les calculs, TypeScript pour les interfaces : les outils que nous utilisons au quotidien sur nos projets.',
    groups: [
      { title: 'Data et IA', text: 'Python, NumPy, Pandas, machine learning, intégration de LLM, RAG, agents IA.' },
      { title: 'Backend', text: 'FastAPI, Node.js, PostgreSQL, SQLAlchemy, Docker.' },
      { title: 'Frontend', text: 'React, TypeScript, Next.js, Tailwind CSS, Cesium.js pour la 3D géographique.' },
      { title: 'Reporting', text: 'Tableaux de bord KPI, rapports automatiques par email, agent IA sur Telegram.' },
      { title: 'Langages', text: 'Python, TypeScript et JavaScript, Java, Scala, C.' },
      { title: 'Langues', text: 'Français et arabe natifs, anglais B2, espagnol B1.' },
    ],
  },
  trust: {
    title: 'Ils nous font confiance',
  },
  capinvest: {
    title: 'Capinvest Partners',
    intro: 'Site de Capinvest Partners, conseil en finance d’entreprise en Europe, en Afrique et au Moyen-Orient.',
    open: 'Visiter capinvest-partners.com',
    alts: [
      'Page d’accueil de Capinvest Partners : « Optimisez les termes de vos opérations en capital ».',
      'Section expertise de Capinvest Partners : toute la chaîne du conseil, de la stratégie au closing.',
    ],
  },
  footer: {
    copy: '© 2026 M-Solutions, par Mélik Zaanouni',
  },
  contact: {
    title: 'Un produit à construire ? Parlons-en.',
    copy: 'Copier l’adresse',
    copied: 'Adresse copiée',
    copyFailed: 'Copie impossible ici : sélectionnez l’adresse à la main',
    phone: 'Téléphone',
    github: 'GitHub',
    basedIn: 'Basé à',
    city: 'Lausanne, Suisse',
  },
};

export type Dict = typeof fr;
export type GameStrings = Dict['game']['client'];
