/*
 * English copy of the site, served on /en/.
 * Same shape as fr.ts; `list` and `prize` fields contain HTML (<strong>).
 */
import type { Dict } from './fr';

export const en: Dict = {
  meta: {
    title: 'M-Solutions, by Mélik Zaanouni',
    description: 'M-Solutions, by Mélik Zaanouni: CapXValue, Ahla Cashflow, ArchiTech. Full-stack development, AI and financial calculation engines.',
    skip: 'Skip to content',
  },
  header: {
    brandLabel: 'M-Solutions, back to top',
    brandBy: 'by Mélik Zaanouni',
    navLabel: 'Main navigation',
    nav: { projects: 'Projects', background: 'Background', contact: 'Contact' },
    langLabel: 'Language',
  },
  hero: {
    who: 'Mélik Zaanouni, full-stack developer, MSc Data Science at EPFL',
    lines: ['An idea for a', 'digital solution?', 'Let’s talk!'],
    lede: 'We bring the best of AI to support you from design through to production, with solutions that make your teams more efficient and deliver measurable results.',
    ctaProjects: 'See the projects',
    ctaContact: 'Get in touch',
    hint: 'Hover over the city: each column is a data point.',
  },
  projects: {
    title: 'Three products, from calculation engine to 3D facade.',
    intro: 'Two are in production and used every day. The third won first prize at the Talan Summer Camp.',
    sourceCode: 'Source code',
  },
  capx: {
    tags: { live: 'In production', role: 'Full-stack', period: '2026 – present' },
    sub: 'A seven-year business plan in which every figure links back to its source.',
    list: [
      'Fintech SaaS platform for <strong>business valuation</strong> and fundraising preparation.',
      '<strong>OCR ingestion</strong> of audited financial statements, then projection of the income statement, balance sheet and cash flow for 2026–2032.',
      'Financial calculation engine in <strong>pure Python</strong>, kept separate from the web layer and locked down by automated tests.',
    ],
    open: 'Open capxvalue.com',
    tabsLabel: 'CapXValue screens',
    views: {
      home: {
        tab: 'The site', url: 'capxvalue',
        alt: 'CapXValue home page, headed “Le business plan dont chaque chiffre se justifie” (the business plan where every figure is justified).',
        cap: 'The promise: a seven-year business plan in which every amount can be justified.',
      },
      hist: {
        tab: 'Import', url: 'capxvalue / historical data',
        alt: 'Historical data step: uploading financial statement PDFs and the table of extracted amounts, each of which can be checked.',
        cap: 'You upload the PDFs, OCR reads the amounts, and the user checks the ones it is unsure about.',
      },
      hyp: {
        tab: 'Assumptions', url: 'capxvalue / assumptions',
        alt: 'Assumptions step: the six main assumptions for each projected year, with the historical average as the default value.',
        cap: 'Every entry recalculates the model. An empty assumption defaults to the project’s historical average.',
      },
      model: {
        tab: 'Model', url: 'capxvalue / financial model',
        alt: 'Financial model step: income statement from 2022 to 2032, historical and projected years, exportable to Excel.',
        cap: 'Income statement, balance sheet and cash flow from 2022 to 2032, exportable to Excel.',
      },
    },
  },
  trace: {
    title: 'Where does this figure come from?',
    intro: 'Pick a result: the engine traces its calculation back, assumption by assumption, to the line in the annual report.',
    picksLabel: 'Result to trace',
    kinds: { real: 'Actual', hyp: 'Assumption', calc: 'Calculated' },
    nodes: {
      src: { title: '2024 annual report', value: 'Note 6.1, page 3' },
      g: { title: 'Growth', value: '8.5% per year' },
      cost: { title: 'Operating costs', value: '83.3% of revenue' },
      tax: { title: 'Tax rate', value: '20%' },
      ca25: { title: 'Revenue 2025', value: '46,250' },
      ca28: { title: 'Revenue 2028', value: '59,075' },
      ebitda: { title: 'EBITDA 2028', value: '9,866' },
      rn: { title: 'Net income 2028', value: '5,306' },
    },
    picks: {
      rn: 'Net income 2028',
      ebitda: 'EBITDA 2028',
      ca28: 'Revenue 2028',
    },
    formulas: {
      rn: 'Net income = EBIT + financial result − tax. Eight items, including three assumptions and a note from the annual report.',
      ebitda: 'EBITDA = revenue × (1 − operating costs). Six items, including two assumptions.',
      ca28: 'Revenue 2028 = Revenue 2025 × (1 + 8.5%)³. Four items, including one assumption and a note from the annual report.',
    },
  },
  ahla: {
    tags: { live: 'In production', role: 'Sole developer', period: '2025 – 2026' },
    sub: 'Clear cash management for a student residence, designed and delivered on my own.',
    list: [
      'B2B cash management SaaS, from gathering requirements to <strong>going live</strong>.',
      'Cash position over any period and a <strong>daily email to the CEO</strong> summarising the previous day’s spending.',
      'KPI dashboards that compare months and sort recurring expenses to <strong>catch overspending early</strong>.',
      'Agentic AI assistant (<strong>Mistral</strong>) and multi-level access control.',
    ],
    open: 'Open ahlapp.com',
    tabsLabel: 'Ahla Cashflow screens',
    cards: {
      dash: {
        tab: 'Dashboard',
        alt: 'Ahla Cashflow dashboard: current cash, income, expenses, balance for the period and recent transactions.',
        cap: 'Overview: actual, budgeted and projected cash over the chosen period.',
      },
      budget: {
        tab: 'Budget',
        alt: 'Budget and forecasts screen: overall budget use, budget versus actual chart and breakdown of expenses by category.',
        cap: 'Budget versus actual by category, with the gap flagged line by line.',
      },
      portal: {
        tab: 'Portal',
        alt: 'AHLA portal: choosing a workspace between Ahla Cashflow and Ahla Hospitality.',
        cap: 'The AHLA portal: one ecosystem, two workspaces.',
      },
    },
  },
  game: {
    canvasLabel: 'Two 3D columns: on the left the cash balance with its safety threshold, on the right the month’s spending budget, which fills up with each payment.',
    legend: { cash: 'Cash, 1 block = €2,000', jar: 'Monthly spending budget', warn: 'Threshold or overrun' },
    drag: 'Drag to rotate',
    title: 'Keep October’s cash in check.',
    rules: 'Five transactions from a student residence. Pay or defer each expense: cash must stay above €15,000 and spending must stay within the €45,000 budget.',
    mailFrom: 'Ahla Cashflow, summary sent to the CEO at 08:00',
    replay: 'Replay the month',
    stats: { cash: 'Cash', budget: 'Budget used', deferred: 'Deferred' },
    client: {
      locale: 'en-GB',
      // same order as EVENTS in CashGame.astro
      events: [
        { date: '1 Oct 2026', desc: 'Residents’ rent, building A', cat: 'Rent & Housing' },
        { date: '3 Oct 2026', desc: 'Staff salaries', cat: 'Staff' },
        { date: '6 Oct 2026', desc: 'Boiler repair', cat: 'External services' },
        { date: '10 Oct 2026', desc: 'New furniture for the common room', cat: 'Purchases & Suppliers' },
        { date: '17 Oct 2026', desc: 'Residents’ rent, building B', cat: 'Rent & Housing' },
      ],
      flags: {
        in: 'Income: collected on receipt.',
        must: 'Cannot be deferred: due this month.',
        urgent: 'Urgent: deferring it costs 30% more next month.',
        opt: 'Can be deferred to next month at no extra cost.',
      },
      actions: { collect: 'Collect', pay: 'Pay', defer: 'Defer', deferUrgent: 'Defer (+30%)' },
      live: {
        collected: 'Collected {amount}.',
        paid: 'Paid {amount}.',
        deferred: 'Deferred: {amount} to next month.',
        cash: 'Cash: {amount}.',
        below: ' Below the safety threshold.',
      },
      checks: {
        cash: 'Cash always above the threshold (low point {amount})',
        budget: 'Spending within budget ({pct} used)',
        urgentKo: '{n} urgent expense deferred with a penalty',
        urgentOk: 'No urgent expense deferred',
      },
      verdicts: {
        3: 'Month under control. That is exactly what Ahla helps you see every morning.',
        2: 'Almost: one thing to watch before next month.',
        low: 'The month went off track. Play again to find the right trade-off.',
      },
      figs: { cash: 'Closing cash', spent: 'Expenses paid', deferred: 'Deferred to next month', score: 'Score', scoreValue: '{n} / 3' },
      scene: { cash: 'Cash', jar: 'Monthly budget', seuil: 'Threshold {amount}', budget: 'Budget {amount}' },
    },
  },
  architech: {
    tags: { context: 'Generative AI internship, Talan', team: 'Team project', period: 'Jul – Aug 2026' },
    sub: 'AI that goes from an architectural brief to a building placed on its map.',
    list: [
      'Platform that automates <strong>regulatory feasibility</strong>, 2D/3D plans and cost estimates.',
      'We unblocked <strong>3D floor plan generation</strong>: we found agent tools in the open-source software Pascal, proved feasibility with Claude Code, then integrated it.',
      'Added <strong>3D facade generation</strong> from images (NanoBanana, Meshy API) and placed the buildings on a 3D map, in their real surroundings.',
    ],
    prize: '<strong>1st prize, Talan Summer Camp 2026</strong>Against 10 teams of students from EPFL, HEC and Centrale. We gave the final pitch.',
    demo: 'Watch the demo',
    canvasLabel: 'Floor plan of a home rising into a 3D volume, inspired by the ArchiTech pipeline.',
    plan: { to3d: 'Switch to 3D', to2d: 'Back to the 2D plan', drag: 'Drag to rotate', built: 'Volume generated from the plan' },
  },
  background: {
    title: 'Tunis, Lausanne, Valencia, and back.',
    intro: 'Studies in communication systems, then data science, with a hands-on project running alongside my courses at every stage.',
    steps: [
      {
        year: '2026', highlight: true,
        title: 'MSc Data Science at EPFL, and CapXValue',
        text: 'Master’s in progress since September, alongside the full-stack development of CapXValue. Bachelor’s in Communication Systems completed in June (GPA 4.93/6).',
        place: 'EPFL, Lausanne',
      },
      {
        year: '2026', highlight: true,
        title: 'Generative AI internship at Talan, 1st prize',
        text: 'Two months on ArchiTech, ending with first prize at the Summer Camp.',
        place: 'Talan, July – August',
      },
      {
        year: '2025',
        title: 'Exchange year and Ahla Cashflow',
        text: 'Third year of my bachelor’s at UPV, taught in Spanish. Designed and shipped Ahla Cashflow on my own.',
        place: 'Universitat Politècnica de València',
      },
      {
        year: '2025',
        title: 'Collaborator at Celestial Wave Design',
        text: 'Web and mobile agency for the Swiss market. Obtained approved supplier status with an EPFL photonics lab.',
      },
      {
        year: '2024',
        title: 'Teaching code',
        text: 'Teaching assistant at EPFL for non-computer-science students, programming classes for 30 girls aged 9 to 11, and a workshop on deepfakes at the International School of Geneva.',
      },
      {
        year: '2023',
        title: 'Baccalaureate with highest honours, first products sold',
        text: 'French baccalaureate, 17.92/20, European section. More than 150 custom football jerseys produced and sold, including the best-seller of the Cailloux Athletics brand (more than 200 pieces).',
        place: 'Lycée Gustave Flaubert, Tunis',
      },
    ],
  },
  tools: {
    title: 'What we work with.',
    intro: 'Python for data and calculations, TypeScript for interfaces: the tools we use every day on our projects.',
    groups: [
      { title: 'Data and AI', text: 'Python, NumPy, Pandas, machine learning, LLM integration, RAG, AI agents.' },
      { title: 'Backend', text: 'FastAPI, Node.js, PostgreSQL, SQLAlchemy, Docker.' },
      { title: 'Frontend', text: 'React, TypeScript, Next.js, Tailwind CSS, Cesium.js for geospatial 3D.' },
      { title: 'Reporting', text: 'KPI dashboards, automated email reports, AI agent on Telegram.' },
      { title: 'Programming languages', text: 'Python, TypeScript and JavaScript, Java, Scala, C.' },
      { title: 'Languages', text: 'French and Arabic (native), English B2, Spanish B1.' },
    ],
  },
  trust: {
    title: 'They trust us',
  },
  capinvest: {
    title: 'Capinvest Partners',
    intro: 'Website of Capinvest Partners, corporate finance advisory in Europe, Africa and the Middle East.',
    open: 'Visit capinvest-partners.com',
    alts: [
      'Capinvest Partners home page, headline “Optimisez les termes de vos opérations en capital” (optimise the terms of your capital operations).',
      'Capinvest Partners expertise section: the full advisory chain, from strategy to closing.',
    ],
  },
  footer: {
    copy: '© 2026 M-Solutions, by Mélik Zaanouni',
    site: 'capinvest-partners.com',
  },
  contact: {
    title: 'A product to build? Let’s talk.',
    copy: 'Copy address',
    copied: 'Address copied',
    copyFailed: 'Can’t copy here: please select the address manually',
    phone: 'Phone',
    github: 'GitHub',
    basedIn: 'Based in',
    city: 'Lausanne, Switzerland',
    nationality: 'Nationalities',
    nationalities: 'French and Tunisian',
  },
};
