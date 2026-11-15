/* Homepage content in German: page metadata, destination names, guest reviews
 * and the FAQ. Kept apart from ui.de.mjs, which holds the chrome and the
 * components shared with every route page.
 *
 * Guest names stay as written — they are the names of the people who travelled,
 * not copy. Place names follow local usage, so Bolzano is Bozen in German.
 */

/* Whole blocks replaced before the string walk, because the English is split
   across <strong> tags and the word order does not survive being translated
   fragment by fragment. */
export const html = [
  [`<p class="lede">The moment you land, your driver is already waiting — not on a schedule, but on <strong>your actual flight</strong>. ridetoalps runs <strong>Munich Airport into Tyrol, Salzburg and the Engadin</strong> as a <strong>licensed, fully insured carrier</strong>, with drivers who know <strong>every turn of these passes</strong> by heart — and who are still in touch long after we have dropped you at the hotel.</p>`,
   `<p class="lede">In dem Moment, in dem Sie landen, wartet Ihr Fahrer bereits — nicht nach Fahrplan, sondern nach <strong>Ihrem tatsächlichen Flug</strong>. ridetoalps fährt <strong>vom Flughafen München nach Tirol, Salzburg und ins Engadin</strong> — als <strong>lizenziertes, vollständig versichertes Unternehmen</strong>, mit Fahrern, die <strong>jede Kurve dieser Pässe</strong> im Kopf haben — und die noch lange erreichbar sind, nachdem wir Sie am Hotel abgesetzt haben.</p>`],
];

export default {
  /* ---------- page metadata ---------- */
  'Munich Airport Transfers to the Alps &amp; Tyrol | ridetoalps':
    'Flughafentransfer München in die Alpen &amp; nach Tirol | ridetoalps',
  'Munich Airport Transfers to the Alps &amp; Tyrol':
    'Flughafentransfer München in die Alpen &amp; nach Tirol',
  'Private door-to-door transfers from Munich Airport to Kitzbühel, Innsbruck, Ischgl and Sölden. Fixed prices per car, €30 or $35 deposit, flight tracking, 24/7.':
    'Private Haus-zu-Haus-Transfers vom Flughafen München nach Kitzbühel, Innsbruck, Ischgl und Sölden. Festpreise pro Fahrzeug, 30 € oder 35 $ Anzahlung, Flugverfolgung, 24/7.',
  'Private door-to-door transfers from Munich Airport to Kitzbühel, Innsbruck, Ischgl, Sölden and St. Anton. Fixed prices per car, €30 or $35 deposit, flight tracking, 24/7.':
    'Private Haus-zu-Haus-Transfers vom Flughafen München nach Kitzbühel, Innsbruck, Ischgl, Sölden und St. Anton. Festpreise pro Fahrzeug, 30 € oder 35 $ Anzahlung, Flugverfolgung, 24/7.',
  'Private door-to-door transfers from Munich Airport to Kitzbühel, Innsbruck, Ischgl, Sölden and St. Anton. Fixed prices, €30 or $35 deposit, 24/7.':
    'Private Haus-zu-Haus-Transfers vom Flughafen München nach Kitzbühel, Innsbruck, Ischgl, Sölden und St. Anton. Festpreise, 30 € oder 35 $ Anzahlung, 24/7.',
  'A black Mercedes V-Class on a snowy alpine road — ridetoalps transfers from Munich to the Alps':
    'Eine schwarze Mercedes V-Klasse auf einer schneebedeckten Alpenstraße — ridetoalps Transfers von München in die Alpen',
  'ridetoalps — private transfers from Munich to the Alps':
    'ridetoalps — private Transfers von München in die Alpen',

  /* ---------- destinations ---------- */
  'Marienplatz in central Munich on a winter evening':
    'Der Marienplatz in der Münchner Innenstadt an einem Winterabend',
  'Kitzbühel': 'Kitzbühel',
  'Salzburg': 'Salzburg',
  'Innsbruck': 'Innsbruck',
  'Ischgl': 'Ischgl',
  'Sölden': 'Sölden',
  'St. Anton am Arlberg': 'St. Anton am Arlberg',
  'St. Anton': 'St. Anton',
  'St. Moritz': 'St. Moritz',
  'Bolzano': 'Bozen',
  'Bolzano region': 'Region Bozen',
  'Bormio / Livigno': 'Bormio / Livigno',

  /* ---------- calculator, as first rendered ---------- */
  'Munich Airport (MUC) → Kitzbühel': 'Flughafen München (MUC) → Kitzbühel',
  'Daytime rate · 1 vehicle': 'Tagestarif · 1 Fahrzeug',
  '€30 or $35': '30 € oder 35 $',

  /* ---------- reviews ---------- */
  'Our flight from London was two hours late and I fully expected to be stranded. The driver was already tracking it and simply met us when we walked out. Straight to Kitzbühel, no fuss, no extra charge.':
    'Unser Flug aus London hatte zwei Stunden Verspätung und ich hatte uns schon gestrandet gesehen. Der Fahrer hatte den Flug längst im Blick und stand einfach da, als wir herauskamen. Direkt nach Kitzbühel, ohne Aufhebens, ohne Aufpreis.',
  'Paying only €30 up front made the decision easy — we booked in September for a February trip. The rest went to the driver at the hotel. Exactly as described.':
    'Nur 30 € im Voraus zu zahlen hat die Entscheidung leicht gemacht — wir haben im September für den Februar gebucht. Den Rest hat der Fahrer am Hotel erhalten. Genau wie beschrieben.',
  'Six of us with skis and boards. They put us in the extra-long V-Class with a roof box and everything fitted without anyone holding a bag on their lap.':
    'Wir waren sechs, mit Ski und Boards. Wir bekamen die extralange V-Klasse mit Dachbox und alles hat hineingepasst, ohne dass jemand eine Tasche auf dem Schoß hatte.',
  'Booked a 5am pick-up from our hotel in Sölden back to Munich. The car was outside at 4:55 and the driver had already cleared the snow off it.':
    'Wir hatten die Abholung um 5 Uhr früh von unserem Hotel in Sölden zurück nach München gebucht. Um 4:55 stand das Auto vor der Tür — und der Fahrer hatte es schon vom Schnee befreit.',
  'We asked for a coffee stop halfway and a short photo break at the pass. Not a problem at all — the driver actually suggested a better viewpoint.':
    'Wir haben nach einer Kaffeepause auf halber Strecke und einem kurzen Fotostopp am Pass gefragt. Überhaupt kein Problem — der Fahrer hat sogar einen schöneren Aussichtspunkt vorgeschlagen.',
  'Clear pricing to St. Anton, no surprise surcharges at the end. Wi-Fi in the car meant the kids were quiet the whole way.':
    'Klarer Preis nach St. Anton, am Ende keine überraschenden Zuschläge. Dank WLAN im Auto waren die Kinder die ganze Fahrt über still.',
  'Travelling with a toddler, so the child seat mattered. It was fitted and ready before we arrived. Second booking already made for next winter.':
    'Wir waren mit einem Kleinkind unterwegs, der Kindersitz war also wichtig. Er war eingebaut und bereit, bevor wir ankamen. Die zweite Buchung für den nächsten Winter steht schon.',
  'Roads to Ischgl were snowed in and the driver knew exactly which way to go. Calm, unhurried, clearly done it many times before.':
    'Die Straßen nach Ischgl waren eingeschneit und der Fahrer wusste genau, welchen Weg er nehmen musste. Ruhig, gelassen, offensichtlich schon viele Male gefahren.',
  'Changed our plans mid-trip and needed the return moved by a day. One WhatsApp message and it was handled the same evening.':
    'Wir haben unsere Pläne mitten in der Reise geändert und mussten die Rückfahrt um einen Tag verschieben. Eine WhatsApp-Nachricht und es war am selben Abend geregelt.',

  /* ---------- FAQ ---------- */
  'What happens if my flight is delayed?': 'Was passiert, wenn mein Flug Verspätung hat?',
  'Nothing to worry about. We track your flight and wait for the actual landing time rather than the scheduled one. There is no extra waiting fee.':
    'Kein Grund zur Sorge. Wir verfolgen Ihren Flug und richten uns nach der tatsächlichen Landezeit, nicht nach dem Flugplan. Eine zusätzliche Wartegebühr fällt nicht an.',
  'How does payment work?': 'Wie funktioniert die Bezahlung?',
  'You pay a €30 or $35 deposit to confirm the booking. The balance is paid only after the ride is completed — cash or card with the driver, or online.':
    'Sie zahlen eine Anzahlung von 30 € oder 35 $, um die Buchung zu bestätigen. Der Restbetrag wird erst nach der Fahrt bezahlt — bar oder mit Karte beim Fahrer oder online.',
  'Can I cancel or move my transfer?': 'Kann ich meinen Transfer stornieren oder verschieben?',
  'Yes. Cancel at least 48 hours before the booked date and the deposit is refunded in full. Later than that, the deposit is non-refundable.':
    'Ja. Bei Storno mindestens 48 Stunden vor dem gebuchten Termin wird die Anzahlung vollständig zurückerstattet. Danach ist die Anzahlung nicht erstattungsfähig.',
  'How many passengers and how much luggage fit in one car?':
    'Wie viele Personen und wie viel Gepäck passen in ein Fahrzeug?',
  'A Mercedes V-Class comfortably takes 5 to 7 passengers. Larger groups travel in several cars. Per passenger we plan for one cabin bag and one standard suitcase, plus sports luggage — one ski or board bag per two people. Many of our cars carry roof boxes for long bags; tell us in advance if your luggage is unusual so we can assign the right vehicle.':
    'In einer Mercedes V-Klasse reisen 5 bis 7 Personen bequem. Größere Gruppen fahren in mehreren Fahrzeugen. Pro Person rechnen wir mit einem Handgepäckstück und einem normalen Koffer, dazu Sportgepäck — eine Ski- oder Boardtasche je zwei Personen. Viele unserer Fahrzeuge haben Dachboxen für lange Taschen; sagen Sie uns vorab, wenn Ihr Gepäck ungewöhnlich ist, damit wir das passende Fahrzeug einteilen.',
  'Where does the driver meet us at the airport?': 'Wo treffen wir den Fahrer am Flughafen?',
  'In the arrivals hall, holding a sign with your name. You are in touch with us on WhatsApp or by phone from the moment your plane lands.':
    'In der Ankunftshalle, mit einem Schild mit Ihrem Namen. Ab dem Moment der Landung sind Sie über WhatsApp oder telefonisch mit uns in Kontakt.',
  'Which languages do the drivers speak?': 'Welche Sprachen sprechen die Fahrer?',
  'English and German fluently. Ukrainian and Russian are available on request.':
    'Englisch und Deutsch fließend. Ukrainisch und Russisch auf Anfrage.',
  'Can we stop on the way for fuel, a coffee or a photo?':
    'Können wir unterwegs zum Tanken, für einen Kaffee oder ein Foto anhalten?',
  'Yes, short stops along the route are included — just tell the driver. Additional pick-up or drop-off points are arranged and priced separately at booking.':
    'Ja, kurze Stopps entlang der Strecke sind inklusive — sagen Sie es einfach dem Fahrer. Zusätzliche Abhol- oder Zielorte werden bei der Buchung separat abgestimmt und berechnet.',
  'Are child seats available?': 'Gibt es Kindersitze?',
  "Yes, on request when you book. Let us know the child's age and weight so we can fit the correct seat.":
    'Ja, auf Wunsch bei der Buchung. Teilen Sie uns Alter und Gewicht des Kindes mit, damit wir den richtigen Sitz einbauen.',
  'What about night or very early morning transfers?':
    'Wie ist es mit Transfers nachts oder am frühen Morgen?',
  'We drive 24/7. Departures before 07:00 or after 22:00 are charged at the night rate, which the calculator applies automatically.':
    'Wir fahren rund um die Uhr. Abfahrten vor 07:00 oder nach 22:00 werden zum Nachttarif berechnet, den der Preisrechner automatisch anwendet.',
  'Can we travel with a pet?': 'Können wir mit einem Tier reisen?',
  'Yes, with advance notice so we can prepare the vehicle.':
    'Ja, mit Vorankündigung, damit wir das Fahrzeug entsprechend vorbereiten können.',
  'Is there Wi-Fi and charging in the car?': 'Gibt es WLAN und Lademöglichkeiten im Fahrzeug?',
  'Yes — Wi-Fi and USB charging are available on board.':
    'Ja — WLAN und USB-Ladeanschlüsse sind an Bord verfügbar.',
  'Is a private operator as safe as a large company?':
    'Ist ein privater Anbieter so sicher wie ein großes Unternehmen?',
  'We are a licensed carrier with fully prepared and insured vehicles and professional drivers who know these routes and have driven them many times.':
    'Wir sind ein lizenziertes Transportunternehmen mit vollständig gewarteten und versicherten Fahrzeugen und professionellen Fahrern, die diese Strecken kennen und viele Male gefahren sind.',

  /* ---------- legal page names stay in German in every language version: they
     are the titles of German legal documents, and the pages themselves are in
     German whichever version of the site you came from. ---------- */
  'Impressum': 'Impressum',
  'Datenschutz': 'Datenschutz',
};
