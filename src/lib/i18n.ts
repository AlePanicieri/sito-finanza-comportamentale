// i18n leggero: traduce solo i passaggi principali (disclaimer, spiegazioni
// delle funzionalità, il monito sul rischio). Il resto del sito resta in
// italiano (base per la SEO). La lingua è una preferenza lato client.

export const LANGS = [
  { code: "it", name: "Italiano" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
] as const;

export type Lang = (typeof LANGS)[number]["code"];

export interface Translations {
  disclaimer: {
    title: string;
    p1: string;
    quote: string;
    quoteAttr: string;
    p2: string;
  };
  howLabel: string;
  howLumpSum: string;
  lumpGuide: {
    title: string;
    amount: string;
    date: string;
    inflation: string;
    calculate: string;
  };
  howDca: { pre: string; highlight: string; post: string };
  dcaGuide: {
    title: string;
    monthly: string;
    startDate: string;
    dayOfMonth: string;
    inflation: string;
    endDate: string;
    calculate: string;
  };
  howDistortion: string;
  cautionLabel: string;
  distortionMarathon: string;
  ui: {
    tagline: string;
    navSimulator: string;
    navTitles: string;
    navCrashes: string;
    navGuides: string;
    navAbout: string;
    footerMission: string;
    footerNav: string;
    footerCrashes: string;
    footerNotices: string;
    footerNoticesText: string;
    footerRights: string;
    heroTitle: string;
    heroIntro: string;
    heroSearchLead: string;
    heroSearchSub: string;
    searchPlaceholder: string;
    analyze: string;
    c1t: string; c1d: string;
    c2t: string; c2d: string;
    c3t: string; c3d: string;
    c4t: string; c4d: string;
    mostSearched: string;
    beforeStart: string;
    allGuides: string;
    crashTitle: string;
    crashDesc: string;
    crashCta: string;
    loading: string;
    daysOfData: string;
    lastPrice: string;
    errTitle: string;
    tabDistortion: string;
    tabLumpSum: string;
    tabDca: string;
    tabCompare: string;
    compareEmptyTitle: string;
    compareEmptyPre: string;
    compareOr: string;
    compareEnd: string;
  };
}

export const TRANSLATIONS: Record<Lang, Translations> = {
  it: {
    disclaimer: {
      title: "Non è un invito a investire",
      p1: "La finanza è rischio. Esistono titoli che falliscono, che vengono delistati e semplicemente spariscono — e mostrarlo è uno degli obiettivi di questo sito. Qui trovi i titoli più riconosciuti di ogni mercato, ma non è detto che ci siano tutti. È più che plausibile che un titolo ad altissimo rischio si riveli molto più remunerativo di questi… così come è altrettanto possibile che si riveli deleterio.",
      quote:
        "«Giocare in borsa vuol dire saper accettare che, quando le cose vanno male, perdi; e quando vanno bene, puoi perdere lo stesso.»",
      quoteAttr: "— un professore, all'università",
      p2: "Per questo questo sito non è un invito a investire. È un invito a riflettere: se, per te, abbia più senso investire il tuo denaro oppure spenderlo — o risparmiarlo — in un altro modo.",
    },
    howLabel: "Come si usa",
    howLumpSum:
      "il Lump Sum risponde a «e se avessi messo una cifra tutta insieme, in un certo giorno?». Cambia l'importo e la data d'acquisto e guarda quanto avrebbe oscillato — e per quanto tempo saresti stato in perdita prima di (forse) recuperare.",
    lumpGuide: {
      title: "Cosa inserire",
      amount: "Importo: quanto avresti investito in un'unica soluzione (es. 1.000, 10.000).",
      date: "Data di acquisto: il giorno in cui saresti entrato. È la variabile che cambia tutto — provala.",
      inflation: "Inflazione annua: mostra anche il valore «reale», al netto del carovita.",
      calculate: "Poi premi «Calcola».",
    },
    howDca: {
      pre: "il PAC è la strategia di chi versa un po' ogni mese, come con lo stipendio. Comprando a più riprese, ",
      highlight: "statisticamente",
      post: " riduci il rischio di entrare tutto nel momento sbagliato: quando il prezzo scende compri di più a poco e il prezzo medio si abbassa. Ma non è magia: se il prezzo sale a lungo e poi crolla, avrai comprato molto a caro prezzo e resterai comunque esposto.",
    },
    dcaGuide: {
      title: "Cosa inserire",
      monthly: "Versamento mensile: quanto metteresti da parte ogni mese (es. 100, 300, 500).",
      startDate: "Data di inizio: da quando avresti cominciato a versare.",
      dayOfMonth: "Giorno del mese: in che giorno compri ogni mese. Cambia il prezzo pagato — prova a variarlo.",
      inflation: "Inflazione annua: mostra anche il valore «reale», al netto del carovita.",
      endDate: "Data di fine (opzionale): se a un certo punto avresti smesso di versare. Il grafico prosegue comunque fino a oggi.",
      calculate: "Poi premi «Calcola».",
    },
    howDistortion:
      "scegli un orizzonte (5, 10, 20 anni…). La prima barra è la finestra più recente, quella che finisce oggi; la seconda copre lo stesso numero di anni appena prima, la terza quelli ancora prima, e così via indietro nel tempo. Confronta le barre: lo stesso identico titolo ha reso in modo molto diverso a seconda dell'epoca — ecco perché la performance che vedi «oggi» può ingannarti sulle attese future.",
    cautionLabel: "Attenzione",
    distortionMarathon:
      "Il fatto che un titolo sia sempre salito non significa che salirà per sempre — né che accada nell'immediato. Gli investimenti che diventano redditizi sono una maratona, non uno sprint. E il rischio non scompare mai: esistono titoli rimasti in perdita per dieci anni di fila. Saresti disposto a vedere la tua liquidità dimezzata per anni? L'investimento è un rischio da soppesare con attenzione. È vero, però, che statisticamente alcuni titoli hanno meno probabilità di altri di crollare.",
    ui: {
      tagline: "Simula, capisci, non farti fregare",
      navSimulator: "Simulatore",
      navTitles: "Titoli",
      navCrashes: "Crolli",
      navGuides: "Guide",
      navAbout: "Chi siamo",
      footerMission:
        "Uno strumento educativo per capire come i bias mentali distorcono le decisioni di investimento. Simula, confronta, ragiona.",
      footerNav: "Naviga",
      footerCrashes: "I grandi crolli",
      footerNotices: "Avvertenze",
      footerNoticesText:
        "Contenuto a solo scopo educativo. Non è consulenza finanziaria né un invito a investire. La finanza è rischio: i titoli possono perdere valore, fallire o essere delistati. I rendimenti storici non garantiscono risultati futuri. Dati di mercato forniti da Yahoo Finance.",
      footerRights: "Tutti i diritti riservati.",
      heroTitle: "«Se avessi investito 500€ al mese, oggi avrei…»",
      heroIntro:
        "Forse una fortuna. Forse molto meno di quanto ti raccontano. Qui non trovi promesse: scegli un titolo vero e guarda come sarebbe andato davvero il tuo investimento, giorno per giorno, sui dati storici reali. Poi impara a riconoscere i bias — e i fuffaguru — che ti fanno vedere guadagni che non esistono.",
      heroSearchLead: "Scrivi il nome o il ticker di un titolo — ti guidiamo noi passo passo",
      heroSearchSub: "Scelto il titolo, ti spieghiamo passo dopo passo come leggere ogni sezione.",
      searchPlaceholder: "Es. Apple, AAPL, Bitcoin, ENI.MI…",
      analyze: "Analizza",
      c1t: "Distorsione Temporale",
      c1d: "Vedi come il titolo performava nel passato, non solo oggi",
      c2t: "Simulazione Lump Sum",
      c2d: "Investimento unico: come avrei oscillato giornalmente?",
      c3t: "PAC Mensile",
      c3d: "Versamento ricorrente: quale giorno del mese scegliere?",
      c4t: "Confronto Strategie",
      c4d: "Lump Sum vs DCA: chi avrebbe vinto nel tuo caso?",
      mostSearched: "Simula i titoli più cercati:",
      beforeStart: "Prima di iniziare, leggi",
      allGuides: "Tutte le guide",
      crashTitle: "I grandi crolli — quando c'era da piangere",
      crashDesc:
        "Titoli crollati dell'80-99%, alcuni mai più tornati al picco. Rivivi dot-com, Lehman e i disastri single-stock con le date vere fissate.",
      crashCta: "Guarda i crolli",
      loading: "Recupero {years} anni di dati per {ticker}…",
      daysOfData: "giorni di dati storici",
      lastPrice: "Ultimo prezzo disponibile",
      errTitle: "Impossibile caricare i dati",
      tabDistortion: "Distorsione Temporale",
      tabLumpSum: "Lump Sum",
      tabDca: "PAC Mensile",
      tabCompare: "Confronto",
      compareEmptyTitle: "Nessuna simulazione da confrontare",
      compareEmptyPre: "Esegui prima almeno una simulazione nella scheda",
      compareOr: "o",
      compareEnd: ".",
    },
  },
  en: {
    disclaimer: {
      title: "This is not an invitation to invest",
      p1: "Finance is risk. There are stocks that fail, that get delisted and simply vanish — and showing this is one of the goals of this site. Here you'll find the best-known names in every market, but not necessarily all of them. It's entirely plausible that a very high-risk stock turns out far more rewarding than these… just as it's equally possible that it turns out ruinous.",
      quote:
        "«Playing the market means being able to accept that when things go badly, you lose; and when they go well, you can still lose.»",
      quoteAttr: "— a university professor",
      p2: "That's why this site is not an invitation to invest. It's an invitation to reflect: whether, for you, it makes more sense to invest your money or to spend it — or save it — in another way.",
    },
    howLabel: "How to use it",
    howLumpSum:
      "the lump sum answers: «what if I'd put in a single amount all at once, on a given day?». Change the amount and the purchase date and see how much it would have swung — and how long you'd have been underwater before (maybe) recovering.",
    lumpGuide: {
      title: "What to enter",
      amount: "Amount: how much you'd have invested in one go (e.g. 1,000, 10,000).",
      date: "Purchase date: the day you'd have entered. It's the variable that changes everything — try it.",
      inflation: "Annual inflation: also shows the «real» value, adjusted for the cost of living.",
      calculate: "Then press «Calcola» (Calculate).",
    },
    howDca: {
      pre: "dollar-cost averaging is the strategy of investing a little every month, like from a salary. By buying in several steps, ",
      highlight: "statistically",
      post: " you cut the risk of putting everything in at the wrong moment: when the price falls you buy more for less and your average price drops. But it's no magic: if the price climbs for a long time and then crashes, you'll have bought a lot at high prices and you're still exposed.",
    },
    dcaGuide: {
      title: "What to enter",
      monthly: "Monthly contribution: how much you'd set aside each month (e.g. 100, 300, 500).",
      startDate: "Start date: when you'd have started contributing.",
      dayOfMonth: "Day of the month: which day you buy each month. It changes the price you pay — try varying it.",
      inflation: "Annual inflation: also shows the «real» value, adjusted for the cost of living.",
      endDate: "End date (optional): if at some point you'd have stopped contributing. The chart still runs to today.",
      calculate: "Then press «Calcola» (Calculate).",
    },
    howDistortion:
      "pick a horizon (5, 10, 20 years…). The first bar is the most recent window, the one ending today; the second covers the same number of years just before, the third the ones before that, and so on back in time. Compare the bars: the very same stock performed very differently depending on the era — which is why the return you see «today» can mislead you about the future.",
    cautionLabel: "A word of caution",
    distortionMarathon:
      "The fact that a stock has always gone up doesn't mean it always will — nor that it will happen any time soon. Investments that become profitable are a marathon, not a sprint. And the risk never disappears: some stocks have stayed at a loss for ten years straight. Would you be willing to watch your money cut in half for years? Investing is a risk to weigh carefully. It's true, though, that statistically some stocks are less likely than others to collapse.",
    ui: {
      tagline: "Simulate, understand, don't get fooled",
      navSimulator: "Simulator",
      navTitles: "Stocks",
      navCrashes: "Crashes",
      navGuides: "Guides",
      navAbout: "About",
      footerMission:
        "An educational tool to see how mental biases distort investment decisions. Simulate, compare, think.",
      footerNav: "Explore",
      footerCrashes: "The great crashes",
      footerNotices: "Disclaimer",
      footerNoticesText:
        "Educational content only. Not financial advice nor an invitation to invest. Finance is risk: stocks can lose value, fail or be delisted. Past returns don't guarantee future results. Market data provided by Yahoo Finance.",
      footerRights: "All rights reserved.",
      heroTitle: "«If I'd invested €500 a month, today I'd have…»",
      heroIntro:
        "Maybe a fortune. Maybe far less than they tell you. No promises here: pick a real stock and see how your investment would actually have gone, day by day, on real historical data. Then learn to spot the biases — and the hype-gurus — that make you see gains that aren't there.",
      heroSearchLead: "Type the name or ticker of a stock — we'll guide you step by step",
      heroSearchSub: "Once you pick a stock, we explain step by step how to read each section.",
      searchPlaceholder: "e.g. Apple, AAPL, Bitcoin, ENI.MI…",
      analyze: "Analyze",
      c1t: "Time Distortion",
      c1d: "See how the stock performed in the past, not just today",
      c2t: "Lump Sum Simulation",
      c2d: "A single investment: how would it have swung day to day?",
      c3t: "Monthly Plan (DCA)",
      c3d: "Recurring contribution: which day of the month to choose?",
      c4t: "Strategy Comparison",
      c4d: "Lump sum vs DCA: which would have won in your case?",
      mostSearched: "Simulate the most-searched stocks:",
      beforeStart: "Before you start, read",
      allGuides: "All guides",
      crashTitle: "The great crashes — when it really hurt",
      crashDesc:
        "Stocks down 80-99%, some never back to their peak. Relive dot-com, Lehman and single-stock disasters with the real dates locked in.",
      crashCta: "See the crashes",
      loading: "Fetching {years} years of data for {ticker}…",
      daysOfData: "days of historical data",
      lastPrice: "Last available price",
      errTitle: "Couldn't load the data",
      tabDistortion: "Time Distortion",
      tabLumpSum: "Lump Sum",
      tabDca: "Monthly (DCA)",
      tabCompare: "Compare",
      compareEmptyTitle: "No simulation to compare",
      compareEmptyPre: "Run at least one simulation first in the",
      compareOr: "or",
      compareEnd: "tab.",
    },
  },
  fr: {
    disclaimer: {
      title: "Ceci n'est pas une invitation à investir",
      p1: "La finance, c'est le risque. Il existe des titres qui font faillite, qui sont retirés de la cote et disparaissent tout simplement — et le montrer est l'un des objectifs de ce site. Vous trouvez ici les titres les plus connus de chaque marché, mais pas forcément tous. Il est tout à fait plausible qu'un titre à très haut risque se révèle bien plus rentable que ceux-ci… tout comme il peut se révéler désastreux.",
      quote:
        "«Jouer en bourse, c'est savoir accepter que, quand les choses tournent mal, on perd ; et quand elles tournent bien, on peut perdre quand même.»",
      quoteAttr: "— un professeur, à l'université",
      p2: "C'est pourquoi ce site n'est pas une invitation à investir. C'est une invitation à réfléchir : si, pour vous, il est plus sensé d'investir votre argent ou de le dépenser — ou de l'épargner — autrement.",
    },
    howLabel: "Comment l'utiliser",
    howLumpSum:
      "l'investissement unique répond à : «et si j'avais placé une somme d'un coup, un jour donné ?». Change le montant et la date d'achat et regarde l'ampleur des variations — et combien de temps tu serais resté en perte avant de (peut-être) récupérer.",
    lumpGuide: {
      title: "Que saisir",
      amount: "Montant : combien tu aurais investi en une fois (ex. 1 000, 10 000).",
      date: "Date d'achat : le jour où tu serais entré. C'est la variable qui change tout — essaie-la.",
      inflation: "Inflation annuelle : montre aussi la valeur « réelle », hors coût de la vie.",
      calculate: "Puis appuie sur « Calcola » (Calculer).",
    },
    howDca: {
      pre: "l'investissement programmé, c'est verser un peu chaque mois, comme avec un salaire. En achetant en plusieurs fois, ",
      highlight: "statistiquement",
      post: " tu réduis le risque de tout placer au mauvais moment : quand le prix baisse, tu achètes plus pour moins cher et ton prix moyen diminue. Mais ce n'est pas magique : si le prix monte longtemps puis s'effondre, tu auras beaucoup acheté cher et tu restes exposé.",
    },
    dcaGuide: {
      title: "Que saisir",
      monthly: "Versement mensuel : combien tu mettrais de côté chaque mois (ex. 100, 300, 500).",
      startDate: "Date de début : à partir de quand tu aurais commencé à verser.",
      dayOfMonth: "Jour du mois : quel jour tu achètes chaque mois. Cela change le prix payé — essaie de le varier.",
      inflation: "Inflation annuelle : montre aussi la valeur « réelle », hors coût de la vie.",
      endDate: "Date de fin (facultative) : si à un moment tu aurais cessé de verser. Le graphique continue jusqu'à aujourd'hui.",
      calculate: "Puis appuie sur « Calcola » (Calculer).",
    },
    howDistortion:
      "choisis un horizon (5, 10, 20 ans…). La première barre est la fenêtre la plus récente, celle qui se termine aujourd'hui ; la deuxième couvre le même nombre d'années juste avant, la troisième celles d'encore avant, et ainsi de suite en remontant le temps. Compare les barres : le même titre a rendu très différemment selon l'époque — d'où le fait que la performance vue «aujourd'hui» peut t'induire en erreur sur l'avenir.",
    cautionLabel: "Attention",
    distortionMarathon:
      "Le fait qu'un titre ait toujours monté ne signifie pas qu'il montera toujours — ni que cela arrivera tout de suite. Les investissements qui deviennent rentables sont un marathon, pas un sprint. Et le risque ne disparaît jamais : certains titres sont restés en perte pendant dix ans d'affilée. Serais-tu prêt à voir ton capital réduit de moitié pendant des années ? Investir est un risque à peser avec soin. Il est vrai, cependant, que statistiquement certains titres ont moins de probabilité que d'autres de s'effondrer.",
    ui: {
      tagline: "Simule, comprends, ne te fais pas avoir",
      navSimulator: "Simulateur",
      navTitles: "Titres",
      navCrashes: "Krachs",
      navGuides: "Guides",
      navAbout: "À propos",
      footerMission:
        "Un outil éducatif pour voir comment les biais mentaux faussent les décisions d'investissement. Simule, compare, réfléchis.",
      footerNav: "Explorer",
      footerCrashes: "Les grands krachs",
      footerNotices: "Avertissement",
      footerNoticesText:
        "Contenu éducatif uniquement. Pas un conseil financier ni une invitation à investir. La finance, c'est le risque : les titres peuvent perdre de la valeur, faire faillite ou être retirés de la cote. Les performances passées ne garantissent pas les résultats futurs. Données de marché fournies par Yahoo Finance.",
      footerRights: "Tous droits réservés.",
      heroTitle: "«Si j'avais investi 500 € par mois, j'aurais aujourd'hui…»",
      heroIntro:
        "Peut-être une fortune. Peut-être bien moins qu'on ne le raconte. Ici, pas de promesses : choisis un vrai titre et regarde comment ton investissement aurait réellement évolué, jour après jour, sur des données historiques réelles. Puis apprends à repérer les biais — et les gourous — qui te font voir des gains qui n'existent pas.",
      heroSearchLead: "Saisis le nom ou le symbole d'un titre — on te guide pas à pas",
      heroSearchSub: "Une fois le titre choisi, on t'explique pas à pas comment lire chaque section.",
      searchPlaceholder: "ex. Apple, AAPL, Bitcoin, ENI.MI…",
      analyze: "Analyser",
      c1t: "Distorsion temporelle",
      c1d: "Vois comment le titre a performé dans le passé, pas seulement aujourd'hui",
      c2t: "Simulation investissement unique",
      c2d: "Un seul investissement : quelles variations au jour le jour ?",
      c3t: "Plan mensuel (DCA)",
      c3d: "Versement récurrent : quel jour du mois choisir ?",
      c4t: "Comparaison des stratégies",
      c4d: "Investissement unique vs DCA : qui aurait gagné dans ton cas ?",
      mostSearched: "Simule les titres les plus recherchés :",
      beforeStart: "Avant de commencer, lis",
      allGuides: "Tous les guides",
      crashTitle: "Les grands krachs — quand ça faisait vraiment mal",
      crashDesc:
        "Des titres en baisse de 80 à 99 %, certains jamais revenus à leur sommet. Revis la bulle Internet, Lehman et les désastres d'actions isolées, avec les vraies dates figées.",
      crashCta: "Voir les krachs",
      loading: "Récupération de {years} ans de données pour {ticker}…",
      daysOfData: "jours de données historiques",
      lastPrice: "Dernier cours disponible",
      errTitle: "Impossible de charger les données",
      tabDistortion: "Distorsion",
      tabLumpSum: "Invest. unique",
      tabDca: "Mensuel (DCA)",
      tabCompare: "Comparer",
      compareEmptyTitle: "Aucune simulation à comparer",
      compareEmptyPre: "Lance d'abord au moins une simulation dans l'onglet",
      compareOr: "ou",
      compareEnd: ".",
    },
  },
  de: {
    disclaimer: {
      title: "Dies ist keine Aufforderung zu investieren",
      p1: "Finanzen bedeuten Risiko. Es gibt Aktien, die pleitegehen, von der Börse genommen werden und einfach verschwinden — und das zu zeigen ist eines der Ziele dieser Seite. Hier findest du die bekanntesten Werte jedes Marktes, aber nicht unbedingt alle. Es ist durchaus möglich, dass sich eine hochriskante Aktie als weit lohnender erweist als diese… genauso gut kann sie sich als verheerend erweisen.",
      quote:
        "«An der Börse zu spielen heißt akzeptieren zu können, dass man verliert, wenn es schlecht läuft; und dass man auch verlieren kann, wenn es gut läuft.»",
      quoteAttr: "— ein Professor, an der Universität",
      p2: "Deshalb ist diese Seite keine Aufforderung zu investieren. Sie ist eine Einladung zum Nachdenken: ob es für dich sinnvoller ist, dein Geld zu investieren oder es anders auszugeben — oder zu sparen.",
    },
    howLabel: "So funktioniert's",
    howLumpSum:
      "die Einmalanlage beantwortet die Frage: «Was, wenn ich an einem bestimmten Tag alles auf einmal angelegt hätte?». Ändere Betrag und Kaufdatum und sieh, wie stark es geschwankt hätte — und wie lange du im Minus gewesen wärst, bevor du dich (vielleicht) erholst.",
    lumpGuide: {
      title: "Was eingeben",
      amount: "Betrag: wie viel du auf einmal angelegt hättest (z. B. 1.000, 10.000).",
      date: "Kaufdatum: der Tag, an dem du eingestiegen wärst. Die Variable, die alles verändert — probiere sie aus.",
      inflation: "Jährliche Inflation: zeigt auch den «realen» Wert, bereinigt um die Teuerung.",
      calculate: "Dann drücke «Calcola» (Berechnen).",
    },
    howDca: {
      pre: "der Sparplan bedeutet, jeden Monat etwas anzulegen, wie vom Gehalt. Wenn du in mehreren Schritten kaufst, senkst du ",
      highlight: "statistisch",
      post: " das Risiko, alles zum falschen Zeitpunkt anzulegen: Fällt der Kurs, kaufst du mehr für weniger und dein Durchschnittspreis sinkt. Aber es ist keine Zauberei: Steigt der Kurs lange und stürzt dann ab, hast du viel teuer gekauft und bist trotzdem exponiert.",
    },
    dcaGuide: {
      title: "Was eingeben",
      monthly: "Monatliche Rate: wie viel du jeden Monat zurücklegen würdest (z. B. 100, 300, 500).",
      startDate: "Startdatum: ab wann du eingezahlt hättest.",
      dayOfMonth: "Tag im Monat: an welchem Tag du jeden Monat kaufst. Das ändert den gezahlten Preis — probiere es aus.",
      inflation: "Jährliche Inflation: zeigt auch den «realen» Wert, bereinigt um die Teuerung.",
      endDate: "Enddatum (optional): falls du irgendwann aufgehört hättest einzuzahlen. Der Chart läuft trotzdem bis heute.",
      calculate: "Dann drücke «Calcola» (Berechnen).",
    },
    howDistortion:
      "wähle einen Zeitraum (5, 10, 20 Jahre…). Der erste Balken ist das jüngste Fenster, das heute endet; der zweite deckt genauso viele Jahre unmittelbar davor ab, der dritte die davor, und so weiter zurück in die Zeit. Vergleiche die Balken: dieselbe Aktie hat sich je nach Epoche sehr unterschiedlich entwickelt — deshalb kann dich die «heute» sichtbare Rendite über die Zukunft täuschen.",
    cautionLabel: "Achtung",
    distortionMarathon:
      "Dass eine Aktie immer gestiegen ist, heißt nicht, dass sie immer steigen wird — und schon gar nicht sofort. Investments, die sich lohnen, sind ein Marathon, kein Sprint. Und das Risiko verschwindet nie: Manche Aktien lagen zehn Jahre am Stück im Minus. Wärst du bereit, dein Vermögen jahrelang halbiert zu sehen? Investieren ist ein Risiko, das sorgfältig abzuwägen ist. Es stimmt allerdings, dass statistisch manche Aktien seltener einbrechen als andere.",
    ui: {
      tagline: "Simulieren, verstehen, sich nicht täuschen lassen",
      navSimulator: "Simulator",
      navTitles: "Aktien",
      navCrashes: "Crashs",
      navGuides: "Ratgeber",
      navAbout: "Über uns",
      footerMission:
        "Ein Lernwerkzeug, um zu sehen, wie mentale Verzerrungen Anlageentscheidungen verfälschen. Simulieren, vergleichen, nachdenken.",
      footerNav: "Entdecken",
      footerCrashes: "Die großen Crashs",
      footerNotices: "Hinweis",
      footerNoticesText:
        "Nur zu Bildungszwecken. Keine Finanzberatung und keine Aufforderung zu investieren. Finanzen bedeuten Risiko: Aktien können an Wert verlieren, pleitegehen oder delistet werden. Vergangene Renditen garantieren keine künftigen Ergebnisse. Marktdaten von Yahoo Finance.",
      footerRights: "Alle Rechte vorbehalten.",
      heroTitle: "«Hätte ich 500 € im Monat angelegt, hätte ich heute…»",
      heroIntro:
        "Vielleicht ein Vermögen. Vielleicht viel weniger, als man dir erzählt. Keine Versprechen hier: Wähle eine echte Aktie und sieh, wie sich deine Anlage wirklich entwickelt hätte, Tag für Tag, auf echten historischen Daten. Dann lerne, die Denkfehler — und die Schwätzer — zu erkennen, die dich Gewinne sehen lassen, die es nicht gibt.",
      heroSearchLead: "Gib den Namen oder das Kürzel einer Aktie ein — wir führen dich Schritt für Schritt",
      heroSearchSub: "Ist die Aktie gewählt, erklären wir dir Schritt für Schritt, wie du jeden Abschnitt liest.",
      searchPlaceholder: "z. B. Apple, AAPL, Bitcoin, ENI.MI…",
      analyze: "Analysieren",
      c1t: "Zeitliche Verzerrung",
      c1d: "Sieh, wie sich die Aktie früher entwickelt hat, nicht nur heute",
      c2t: "Einmalanlage-Simulation",
      c2d: "Eine einzige Anlage: wie hätte sie täglich geschwankt?",
      c3t: "Monatlicher Sparplan (DCA)",
      c3d: "Regelmäßige Rate: welchen Tag im Monat wählen?",
      c4t: "Strategie-Vergleich",
      c4d: "Einmalanlage vs. Sparplan: wer hätte in deinem Fall gewonnen?",
      mostSearched: "Simuliere die meistgesuchten Aktien:",
      beforeStart: "Bevor du startest, lies",
      allGuides: "Alle Ratgeber",
      crashTitle: "Die großen Crashs — als es richtig wehtat",
      crashDesc:
        "Aktien mit 80-99 % Minus, manche nie wieder am Hoch. Erlebe Dotcom, Lehman und Einzelaktien-Desaster mit den echten, fixierten Daten.",
      crashCta: "Crashs ansehen",
      loading: "Lade {years} Jahre Daten für {ticker}…",
      daysOfData: "Tage historischer Daten",
      lastPrice: "Letzter verfügbarer Kurs",
      errTitle: "Daten konnten nicht geladen werden",
      tabDistortion: "Verzerrung",
      tabLumpSum: "Einmalanlage",
      tabDca: "Sparplan (DCA)",
      tabCompare: "Vergleich",
      compareEmptyTitle: "Keine Simulation zum Vergleichen",
      compareEmptyPre: "Führe zuerst mindestens eine Simulation im Tab",
      compareOr: "oder",
      compareEnd: "aus.",
    },
  },
  es: {
    disclaimer: {
      title: "No es una invitación a invertir",
      p1: "Las finanzas son riesgo. Hay valores que quiebran, que se retiran de cotización y simplemente desaparecen — y mostrarlo es uno de los objetivos de este sitio. Aquí encuentras los valores más conocidos de cada mercado, pero no necesariamente todos. Es más que plausible que un valor de altísimo riesgo resulte mucho más rentable que estos… igual que es posible que resulte desastroso.",
      quote:
        "«Jugar en bolsa significa saber aceptar que, cuando las cosas van mal, pierdes; y cuando van bien, puedes perder igualmente.»",
      quoteAttr: "— un profesor, en la universidad",
      p2: "Por eso este sitio no es una invitación a invertir. Es una invitación a reflexionar: si, para ti, tiene más sentido invertir tu dinero o gastarlo — o ahorrarlo — de otra manera.",
    },
    howLabel: "Cómo se usa",
    howLumpSum:
      "la inversión única responde a: «¿y si hubiera metido una cantidad de golpe, un día concreto?». Cambia el importe y la fecha de compra y observa cuánto habría oscilado — y cuánto tiempo habrías estado en pérdidas antes de (quizás) recuperar.",
    lumpGuide: {
      title: "Qué introducir",
      amount: "Importe: cuánto habrías invertido de una vez (p. ej. 1.000, 10.000).",
      date: "Fecha de compra: el día en que habrías entrado. Es la variable que lo cambia todo — pruébala.",
      inflation: "Inflación anual: muestra también el valor «real», descontada la carestía.",
      calculate: "Luego pulsa «Calcola» (Calcular).",
    },
    howDca: {
      pre: "la aportación periódica es la estrategia de invertir un poco cada mes, como con el sueldo. Comprando en varias veces, ",
      highlight: "estadísticamente",
      post: " reduces el riesgo de meterlo todo en el momento equivocado: cuando el precio baja compras más por menos y tu precio medio baja. Pero no es magia: si el precio sube mucho tiempo y luego se desploma, habrás comprado mucho caro y sigues expuesto.",
    },
    dcaGuide: {
      title: "Qué introducir",
      monthly: "Aportación mensual: cuánto apartarías cada mes (p. ej. 100, 300, 500).",
      startDate: "Fecha de inicio: desde cuándo habrías empezado a aportar.",
      dayOfMonth: "Día del mes: qué día compras cada mes. Cambia el precio pagado — prueba a variarlo.",
      inflation: "Inflación anual: muestra también el valor «real», descontada la carestía.",
      endDate: "Fecha de fin (opcional): si en algún momento habrías dejado de aportar. El gráfico continúa hasta hoy.",
      calculate: "Luego pulsa «Calcola» (Calcular).",
    },
    howDistortion:
      "elige un horizonte (5, 10, 20 años…). La primera barra es la ventana más reciente, la que termina hoy; la segunda cubre el mismo número de años justo antes, la tercera los anteriores, y así hacia atrás en el tiempo. Compara las barras: el mismo valor rindió de forma muy distinta según la época — por eso la rentabilidad que ves «hoy» puede engañarte sobre el futuro.",
    cautionLabel: "Atención",
    distortionMarathon:
      "Que un valor haya subido siempre no significa que subirá para siempre — ni que ocurra de inmediato. Las inversiones que se vuelven rentables son una maratón, no un esprint. Y el riesgo nunca desaparece: hay valores que han estado en pérdidas diez años seguidos. ¿Estarías dispuesto a ver tu dinero reducido a la mitad durante años? Invertir es un riesgo que hay que sopesar con cuidado. Es cierto, eso sí, que estadísticamente algunos valores tienen menos probabilidad que otros de desplomarse.",
    ui: {
      tagline: "Simula, entiende, que no te engañen",
      navSimulator: "Simulador",
      navTitles: "Valores",
      navCrashes: "Desplomes",
      navGuides: "Guías",
      navAbout: "Quiénes somos",
      footerMission:
        "Una herramienta educativa para ver cómo los sesgos mentales distorsionan las decisiones de inversión. Simula, compara, razona.",
      footerNav: "Explorar",
      footerCrashes: "Los grandes desplomes",
      footerNotices: "Aviso",
      footerNoticesText:
        "Contenido solo educativo. No es asesoramiento financiero ni una invitación a invertir. Las finanzas son riesgo: los valores pueden perder valor, quebrar o ser excluidos de cotización. Las rentabilidades pasadas no garantizan resultados futuros. Datos de mercado de Yahoo Finance.",
      footerRights: "Todos los derechos reservados.",
      heroTitle: "«Si hubiera invertido 500 € al mes, hoy tendría…»",
      heroIntro:
        "Quizás una fortuna. Quizás mucho menos de lo que te cuentan. Aquí no hay promesas: elige un valor real y observa cómo habría ido de verdad tu inversión, día a día, con datos históricos reales. Luego aprende a reconocer los sesgos — y a los gurús de humo — que te hacen ver ganancias que no existen.",
      heroSearchLead: "Escribe el nombre o el símbolo de un valor — te guiamos paso a paso",
      heroSearchSub: "Una vez elegido el valor, te explicamos paso a paso cómo leer cada sección.",
      searchPlaceholder: "ej. Apple, AAPL, Bitcoin, ENI.MI…",
      analyze: "Analizar",
      c1t: "Distorsión temporal",
      c1d: "Mira cómo rindió el valor en el pasado, no solo hoy",
      c2t: "Simulación de inversión única",
      c2d: "Una sola inversión: ¿cómo habría oscilado día a día?",
      c3t: "Plan mensual (DCA)",
      c3d: "Aportación periódica: ¿qué día del mes elegir?",
      c4t: "Comparación de estrategias",
      c4d: "Inversión única vs DCA: ¿cuál habría ganado en tu caso?",
      mostSearched: "Simula los valores más buscados:",
      beforeStart: "Antes de empezar, lee",
      allGuides: "Todas las guías",
      crashTitle: "Los grandes desplomes — cuando de verdad dolía",
      crashDesc:
        "Valores hundidos un 80-99%, algunos nunca de vuelta a su máximo. Revive las puntocom, Lehman y los desastres de valores concretos, con las fechas reales fijadas.",
      crashCta: "Ver los desplomes",
      loading: "Recuperando {years} años de datos de {ticker}…",
      daysOfData: "días de datos históricos",
      lastPrice: "Último precio disponible",
      errTitle: "No se pudieron cargar los datos",
      tabDistortion: "Distorsión",
      tabLumpSum: "Inversión única",
      tabDca: "Mensual (DCA)",
      tabCompare: "Comparar",
      compareEmptyTitle: "Ninguna simulación para comparar",
      compareEmptyPre: "Ejecuta primero al menos una simulación en la pestaña",
      compareOr: "o",
      compareEnd: ".",
    },
  },
};
