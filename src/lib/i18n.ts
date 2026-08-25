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
  },
};
