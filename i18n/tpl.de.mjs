/* The route-page template in German. Same keys as tpl.en.mjs. */
export default {
  title:   (r) => `${r.h1} — Privattransfer ab ${r.price} € | ridetoalps`,
  desc:    (r) => `Privater Haus-zu-Haus-Transfer vom Flughafen München nach ${r.dest}. ` +
                  `${r.km} km, etwa ${r.time}. Festpreis ab ${r.price} € pro Fahrzeug, ` +
                  `Flugverfolgung und alle Mautgebühren inklusive.`,
  ogTitle: (r) => `${r.h1} — ab ${r.price} €`,

  crumbHome:   'Start',
  crumbRoutes: 'Strecken',

  priceTo:   (r) => `Ihr Preis nach ${r.destShort}`,
  checkDest: (r) => `${r.destShort} prüfen`,
  driveHead: (r) => `Flughafen München nach ${r.destShort}, ${r.km} km`,
  aboutDest: (r) => `Über ${r.destShort}`,
  covers:    (r) => `Was die ${r.price} € abdecken`,
  bookSteps: (r) => `${r.destShort} in 3 Schritten buchen`,
  step1:     (r) => `${r.destShort} ist oben bereits ausgewählt. Ergänzen Sie Datum, Uhrzeit ` +
                    `und Gruppengröße, und der Gesamtpreis erscheint — fest, pro Fahrzeug.`,
  step2:     () => 'Die Anzahlung sichert den Termin. Bei Storno mindestens 48 Stunden vorher ' +
                   'wird sie vollständig erstattet.',
  step3:     () => 'Wir verfolgen Ihren Flug und empfangen Sie in der Ankunftshalle mit ' +
                   'Namensschild. Der Restbetrag wird nach der Fahrt bezahlt.',
  guests:    (r) => `Gäste auf der Strecke nach ${r.destShort}`,
  questions: (r) => `Transfers nach ${r.destShort} — Ihre Fragen`,
  waFastest: (r) => `Am schnellsten für Fragen zu ${r.destShort}`,
  callNum:   (n) => `Anruf ${n}`,

  hubTitle: 'Alle Strecken vom Flughafen München in die Alpen | ridetoalps',
  hubDesc:  'Zehn private Transferstrecken zum Festpreis vom Flughafen München nach ' +
            'Österreich, in die Schweiz und nach Italien. Preise pro Fahrzeug, Fahrzeiten und Entfernungen.',
  hubH1:    'Wohin wir von München aus fahren',
  hubLede:  'Zehn Strecken zum Festpreis, jede mit ihrer eigenen Straße, Fahrzeit und ihren ' +
            'eigenen Bedingungen. Die Preise gelten pro Fahrzeug für bis zu vier Personen ' +
            'zwischen 07:00 und 22:00 Uhr.',

  /** Im Deutschen steht das Währungszeichen hinter dem Betrag. */
  dist: (km) => km + ' km',
  money: (n) => n + ' €',

  serviceType: 'Privater Flughafentransfer',
  offerDesc:   'Festpreis pro Fahrzeug für bis zu 4 Personen bei Abfahrt zwischen 07:00 und 22:00 Uhr.',
};
