/* The route-page template, in English.
 *
 * Everything the generator writes that is not prose from routes.data.mjs lives
 * here, so a language version is a sibling file rather than a second copy of
 * build-routes.mjs.
 *
 * The entries are functions because several of them need a declined form of the
 * place name — "цена до Кицбюэля", not "цена до Кицбюэль". Each language
 * receives the route object for its own language, which carries those forms.
 */
export default {
  /* ---------- <head> ---------- */
  title:   (r) => `${r.h1} — private transfer from €${r.price} | ridetoalps`,
  desc:    (r) => `Private door-to-door transfer from Munich Airport to ${r.dest}. ` +
                  `${r.km} km, about ${r.time}. Fixed price from €${r.price} per vehicle, ` +
                  `flight tracking and all tolls included.`,
  ogTitle: (r) => `${r.h1} — from €${r.price}`,

  /* ---------- hero ---------- */
  crumbHome:   'Home',
  crumbRoutes: 'Routes',

  /* ---------- sections ---------- */
  priceTo:   (r) => `Your price to ${r.destShort}`,
  checkDest: (r) => `Check ${r.destShort}`,
  driveHead: (r) => `Munich Airport to ${r.destShort}, ${r.km} km`,
  aboutDest: (r) => `About ${r.destShort}`,
  covers:    (r) => `What the €${r.price} covers`,
  bookSteps: (r) => `Book ${r.destShort} in 3 steps`,
  step1:     (r) => `${r.destShort} is already selected above. Add your date, time and ` +
                    `group size and the total appears — fixed, per vehicle.`,
  step2:     () => 'A deposit holds the date. Cancel at least 48 hours ahead and it is refunded in full.',
  step3:     () => 'We track your flight and meet you in arrivals with a name sign. ' +
                   'The balance is paid after the ride.',
  guests:    (r) => `Guests on the ${r.destShort} run`,
  questions: (r) => `${r.destShort} transfers — your questions`,
  waFastest: (r) => `Fastest for questions about ${r.destShort}`,
  callNum:   (n) => `Call ${n}`,

  /* ---------- the hub page ---------- */
  hubTitle: 'All routes from Munich Airport to the Alps | ridetoalps',
  hubDesc:  'Ten fixed-price private transfer routes from Munich Airport to Austria, ' +
            'Switzerland and Italy. Prices per vehicle, drive times and distances.',
  hubH1:    'Where we drive from Munich',
  hubLede:  'Ten fixed-price routes, each with its own road, drive time and conditions. ' +
            'Prices are per vehicle for up to four passengers between 07:00 and 22:00.',

  /** Currency is written before the number in English, after it elsewhere. */
  /** 'km' is the same abbreviation in German; Cyrillic uses 'км'. */
  dist: (km) => km + ' km',
  money: (n) => '€' + n,

  /* ---------- structured data ---------- */
  serviceType: 'Private airport transfer',
  offerDesc:   'Fixed price per vehicle for up to 4 passengers departing 07:00–22:00.',
};
