/* The blog: categories and articles, in English.
 *
 * Translations live in i18n/blog.<lang>.mjs and are merged in by build-blog.mjs,
 * exactly as routes.data.mjs and i18n/routes.<lang>.mjs work.
 *
 * ---------------------------------------------------------------------------
 * KEYWORD MAP — read this before adding an article
 * ---------------------------------------------------------------------------
 * The ten route pages already own the transactional queries: "Munich Airport to
 * <resort> transfer", the price, the distance, the drive time. An article that
 * also tried to rank for those would not add a second listing, it would split
 * the signals between two of our own pages and both would sit lower. That is
 * what cannibalisation costs, and it is easy to do by accident because the
 * subject matter overlaps completely.
 *
 * So every article here targets a question someone asks *before* they know
 * which route they want, and each one owns a different question:
 *
 *   transport-options   "how do I get from Munich Airport to the Alps"
 *                       comparison intent — train vs bus vs car vs transfer.
 *                       Never quotes a per-route price; links to the route page
 *                       instead, which is the page that should rank for it.
 *
 *   ski-luggage         "Munich Airport with skis" — terminals, oversized
 *                       baggage, how long arrivals really takes. Airport
 *                       logistics only. Says nothing about routes or prices.
 *
 *   winter-driving      "Austrian vignette", "snow chains law", "when do the
 *                       passes close". Rules of the road, for people driving
 *                       themselves. Mentions no resort as a destination.
 *
 * The three overlap on the word "Munich" and nothing else. Before adding a
 * fourth, write its primary query here and check no existing page answers it.
 */

export const CATEGORIES = [
  ['all',      'All articles'],
  ['planning', 'Planning your trip'],
  ['airport',  'At the airport'],
  ['roads',    'Mountain roads'],
];

export const ARTICLES = [

  {
    slug: 'munich-airport-to-alps-transport-options',
    category: 'planning',
    date: '2026-11-04',
    readMins: 7,
    image: 'images/blog/munich-airport-to-alps-transport-options',
    imageAlt: 'Snowy alpine valley road at dusk, the way south from Munich',

    /* primary query: how to get from Munich Airport to the Alps */
    title: 'Munich Airport to the Alps: train, bus, rental car or private transfer',
    description: 'Four ways to get from Munich Airport (MUC) to the Austrian, Swiss and ' +
                 'Italian Alps compared on cost, door-to-door time, ski luggage and what ' +
                 'happens when your flight is late.',
    lede: 'Munich is the gateway airport for half the Eastern Alps, and the airport is the ' +
          'easy part. Getting from the terminal to a chalet 200 km south, with skis, in ' +
          'February, is where the planning actually starts.',

    body: [
      ['p', 'Munich Airport sits 30 km north-east of the city, on the wrong side of it for the mountains. Whatever you choose, the first hour is spent getting around Munich rather than towards the Alps — which is why comparisons based on map distance tend to mislead.'],
      ['p', 'There are four realistic options. None of them is best for everyone; they fail in different ways.'],

      ['h2', 'The train: cheap, scenic, and three changes'],
      ['p', 'There is no direct rail link from Munich Airport to any alpine resort. Every journey starts with the S1 or S8 S-Bahn into the city — about 45 minutes to the Hauptbahnhof — and continues from there.'],
      ['p', 'From the Hauptbahnhof the railway is genuinely good. Innsbruck is under two hours by ÖBB Railjet. Salzburg is an hour and a half. Both are comfortable, frequent and cost a fraction of anything else on this list.'],
      ['p', 'The difficulty is the last leg. Kitzbühel, Sölden, Ischgl and St. Anton are not on a main line, or the station is a long way below the village. A typical airport-to-chalet journey means the S-Bahn, a long-distance train, a regional train and a bus or taxi — four changes, each with luggage, each with a connection to miss.'],
      ['ul', [
        'Best for: solo travellers and couples travelling light, to Innsbruck or Salzburg.',
        'Worst for: families, groups, anyone with ski bags, and anyone arriving after about 20:00.',
        'Plan for 4–6 hours door to door to a resort, 2.5–3 hours to Innsbruck city.',
      ]],

      ['h2', 'The scheduled ski bus: cheap per seat, fixed departures'],
      ['p', 'Seasonal coach services run from Munich Airport to the larger Tyrolean resorts on winter Saturdays. Per person they are the cheapest way to reach a resort door, and the luggage is handled for you.'],
      ['p', 'The catch is the timetable. A coach leaves when it leaves. If your flight lands 90 minutes late — common enough in January — the coach has gone, and the next one may be the following day. Services also concentrate on Saturdays, which is useless if your trip starts midweek.'],
      ['note', 'Coaches also stop at several resorts in turn. Being last on the route can add an hour you did not plan for.'],

      ['h2', 'Rental car: freedom, and a longer to-do list than people expect'],
      ['p', 'A rental car is the obvious answer until you price the whole thing. The rental itself is only the first line.'],
      ['ul', [
        'Winter tyres are a legal requirement in Austria in wintry conditions, and rental companies charge for them.',
        'Snow chains may be required on marked sections; carrying them is on you.',
        'An Austrian motorway vignette is needed the moment you cross the border.',
        'Resort parking is often paid, and in some villages severely limited.',
        'Cross-border fees apply if you pick up in Germany and drive into Switzerland or Italy.',
      ]],
      ['p', 'Add those up and a week\'s rental frequently costs more than a return private transfer for four people — before anyone has driven an unfamiliar car up an iced valley road in the dark after a 6am flight.'],
      ['p', 'A car does make sense if you plan to move between resorts, or if your accommodation is genuinely remote. For a single-resort week it is usually an expensive way to leave a vehicle in a car park for six days.'],

      ['h2', 'Private transfer: the expensive-looking one that often is not'],
      ['p', 'A private transfer is quoted per vehicle, not per person. That single fact changes the arithmetic completely, and it is the thing most comparisons get wrong.'],
      ['p', 'A fixed fare of €300 to Kitzbühel is €300 whether one person travels or four. Split four ways it is €75 each — comparable to the train once you add the connecting taxi, and without the changes.'],
      ['p', 'The other difference is what happens when the flight is late. A transfer booked against your flight number is tracked; the driver waits for the actual landing time. A coach does not wait, and a rental desk may well be closed.'],
      ['ul', [
        'Best for: groups of three or more, families, anyone with ski equipment, late arrivals, and remote accommodation.',
        'Worst for: a single traveller on a tight budget heading to a city on a main line.',
      ]],

      ['h2', 'A rough comparison'],
      ['table',
        ['', 'Train', 'Ski coach', 'Rental car', 'Private transfer'],
        [
          ['Priced by', 'person', 'person', 'vehicle + extras', 'vehicle'],
          ['Door to door', 'no', 'resort centre', 'yes', 'yes'],
          ['Waits for a late flight', 'next train', 'no', 'desk hours', 'yes'],
          ['Ski luggage', 'you carry it', 'included', 'your boot', 'included'],
          ['Good for groups', 'no', 'reasonable', 'yes', 'yes'],
        ],
      ],

      ['h2', 'How to decide in one minute'],
      ['p', 'Count your party and your bags. One or two people, light luggage, heading to Innsbruck or Salzburg: take the train. A Saturday arrival, a big resort, and a tight budget: the coach is worth checking. Moving between valleys all week: rent a car. Three or more people, skis, or a flight landing after dark: a transfer will be cheaper than it looks and considerably less work.'],
      ['p', 'Our own prices are fixed per vehicle and published per route, so you can do that arithmetic before booking anything.'],
    ],

    faqs: [
      ['Is there a direct train from Munich Airport to the ski resorts?',
       'No. Every rail journey starts with the S1 or S8 into Munich Hauptbahnhof, about 45 minutes, and continues from there. Innsbruck and Salzburg are then straightforward; the resorts need at least one further change and usually a bus.'],
      ['How long does it take to get from Munich Airport to the Alps?',
       'By road, between 1.5 and 4 hours depending on the valley — Salzburg and Kitzbühel are the closest, St. Moritz and Livigno the furthest. By train and bus, allow 4 to 6 hours to a resort door.'],
      ['Is a transfer cheaper than a rental car for a ski week?',
       'Often, for three or more people. A rental has to carry winter tyres, a vignette, cross-border fees and resort parking for the whole week, while a return transfer is two fixed fares and nothing else.'],
      ['What happens if my flight is delayed?',
       'With a tracked private transfer, nothing: the driver works from the actual landing time. A coach will have left, and a late-evening rental desk may be shut.'],
    ],
  },

  {
    slug: 'munich-airport-ski-luggage-arrivals',
    category: 'airport',
    date: '2026-10-21',
    readMins: 6,
    image: 'images/blog/munich-airport-ski-luggage-arrivals',
    imageAlt: 'Driver loading ski bags into a Mercedes V-Class outside Munich Airport arrivals',

    /* primary query: Munich Airport with skis / ski luggage */
    title: 'Munich Airport with skis: terminals, oversized baggage and how long arrivals really takes',
    description: 'Where ski bags come out at Munich Airport, the difference between Terminal 1 ' +
                 'and Terminal 2 arrivals, where to meet a driver, and how much time to allow ' +
                 'before anyone expects you.',
    lede: 'Skis do not come out on the carousel. That one detail accounts for most of the ' +
          'confusion — and most of the lost half-hours — at the start of an alpine trip.',

    body: [
      ['p', 'Munich Airport (MUC) is efficient and well signed, but ski equipment takes a different path through it from the rest of your luggage, and the two terminals behave differently. Knowing which arrivals hall you will walk into saves more time than anything else you can plan.'],

      ['h2', 'Terminal 1 or Terminal 2: it matters on arrival'],
      ['p', 'Terminal 2 handles Lufthansa, Swiss, Austrian and the rest of the Star Alliance, plus Eurowings. Terminal 1 handles most other carriers, including British Airways, easyJet, Ryanair and Wizz Air, and is divided into modules A to E with separate exits.'],
      ['p', 'Terminal 2 arrivals funnel into one broad, obvious hall. Terminal 1 does not: each module has its own exit, and a driver waiting at module D is a ten-minute walk from a passenger standing at module B. If you are being met, the module is worth knowing; it is on your boarding pass.'],
      ['note', 'Both terminals connect to the central MAC forum, which is where the S-Bahn, the car parks and most pick-up areas are. If in doubt, meet at the terminal, not at the MAC.'],

      ['h2', 'Where ski and board bags actually appear'],
      ['p', 'Oversized and special baggage does not use the standard carousels. At Munich it is released at a separate bulky baggage point in the same baggage hall, usually at one end, signed "Sperrgepäck" or "Bulky Baggage".'],
      ['p', 'Two practical consequences. First, someone in the party should go straight there rather than everyone waiting at the carousel. Second, bulky baggage is frequently slower than the suitcases — 10 to 25 minutes after the first case appears is normal, and on a busy Saturday it can be longer.'],
      ['ul', [
        'Check the bulky baggage point before assuming a bag is lost; it is the single most common false alarm.',
        'Soft ski bags are handled more roughly than hard cases. Pack boots separately if you can.',
        'Photograph your bags at check-in. It makes a claim much faster if one does go missing.',
      ]],

      ['h2', 'How much time to allow after landing'],
      ['p', 'From wheels down to standing outside with all your luggage, on a normal winter weekday:'],
      ['table',
        ['', 'Schengen arrival', 'Non-Schengen arrival'],
        [
          ['Taxi to stand, disembark', '10–15 min', '10–15 min'],
          ['Walk to baggage hall', '5–10 min', '10–15 min'],
          ['Passport control', 'none', '15–40 min'],
          ['Suitcases on the belt', '15–25 min', '15–25 min'],
          ['Ski bags at bulky baggage', '+10–25 min', '+10–25 min'],
          ['Realistic total', '40–60 min', '60–95 min'],
        ],
      ],
      ['p', 'Saturdays in January and February are the worst of the season: the whole of the Alps changes over on the same day, and both the baggage hall and the roads south feel it. Add half an hour to anything you have planned.'],

      ['h2', 'Meeting a driver'],
      ['p', 'Private drivers wait inside the arrivals hall with a name sign, after customs. That is the simplest arrangement and the one to insist on — kerbside pick-up at Munich means a short-stay car park and a phone call, which is exactly what nobody wants after a 6am flight with three children.'],
      ['p', 'Give the flight number when you book, not just a time. A driver working from a flight number sees the delay before you have landed; one working from a clock time is sitting in a car park wondering.'],

      ['h2', 'Before you leave the hall'],
      ['ul', [
        'Buy any Austrian or Swiss motorway vignette here if you are driving yourself — the airport shops sell them, and the first petrol station over the border will have a queue.',
        'Use the washrooms. The next reliable stop is 90 minutes away.',
        'If you are hiring equipment at the resort, this is the moment to confirm your collection time, before you are in a valley with no signal.',
      ]],
    ],

    faqs: [
      ['Where do ski bags come out at Munich Airport?',
       'At the separate bulky baggage point in the same baggage hall, signed "Sperrgepäck" or "Bulky Baggage" — not on the normal carousel. It is usually 10 to 25 minutes behind the suitcases.'],
      ['How long does it take to get through Munich Airport with skis?',
       'Allow 40 to 60 minutes from landing to standing outside for a Schengen arrival, and 60 to 95 minutes from outside Schengen. Add half an hour on a Saturday in high season.'],
      ['Which terminal will I arrive at?',
       'Terminal 2 for Lufthansa, Swiss, Austrian and Eurowings; Terminal 1 for most other airlines, split into modules A to E. The module is printed on your boarding pass and is worth telling your driver.'],
      ['Where does a transfer driver meet you?',
       'Inside the arrivals hall with a name sign, after customs. Confirm that rather than a kerbside arrangement, and give your flight number so the driver can track the delay.'],
    ],
  },

  {
    slug: 'alpine-winter-driving-vignettes-chains',
    category: 'roads',
    date: '2026-10-07',
    readMins: 8,
    image: 'images/blog/alpine-winter-driving-vignettes-chains',
    imageAlt: 'Snow-walled valley road climbing into the mountains in midwinter',

    /* primary query: Austrian vignette / snow chains rules / pass closures */
    title: 'Winter driving in the Alps: vignettes, tolls, snow chains and when the passes close',
    description: 'What you legally need to drive from Germany into Austria, Switzerland and ' +
                 'Italy in winter — motorway vignettes, pass tolls, winter tyre and snow chain ' +
                 'rules, and which passes shut for the season.',
    lede: 'Three countries, three sets of rules, and a fine at the border for getting the ' +
          'cheapest one wrong. None of it is complicated, but almost all of it is invisible ' +
          'until you are already on the motorway.',

    body: [
      ['p', 'If you are driving yourself into the Alps from Munich, the paperwork and the tyres matter more than the route. Austrian, Swiss and Italian rules differ from German ones and from each other, and enforcement in winter is real rather than theoretical.'],

      ['h2', 'Motorway vignettes: Austria and Switzerland'],
      ['p', 'Germany has no car toll. Austria and Switzerland both do, and both work on a windscreen sticker rather than a barrier.'],
      ['ul', [
        'Austria: a vignette is required on every motorway and expressway. Ten-day, two-month and annual versions are sold; a digital vignette is available and is tied to the number plate.',
        'Switzerland: one annual vignette only, valid for the calendar year plus the December either side. There is no short-stay option, so a single crossing costs the full price.',
        'Italy: no vignette. Motorways are tolled at barriers, so you take a ticket and pay on exit.',
      ]],
      ['note', 'Buy the Austrian vignette before the border — at the airport, a German petrol station or online. The digital one needs to be bought at least 18 days ahead unless you accept immediate validity, so do not leave it to the slip road.'],

      ['h2', 'Tolls on top of the vignette'],
      ['p', 'An Austrian vignette does not cover everything. Several alpine routes carry a separate charge, and the Brenner is the one most people meet.'],
      ['ul', [
        'Brenner motorway (A13): a separate toll each way, on top of the vignette.',
        'Tauern, Karawanken and Arlberg road tunnels: individually tolled.',
        'Italy: the A22 south of the Brenner is a normal ticketed autostrada.',
        'Switzerland: no additional tolls, but the Vereina car-train through to the Engadin is charged per vehicle.',
      ]],

      ['h2', 'Winter tyres: the rule that is not a date'],
      ['p', 'Germany and Austria both use a conditional rule rather than a fixed season, and people routinely misread it.'],
      ['p', 'In Germany, winter tyres are required whenever conditions are wintry — ice, snow, slush, frost. Not "in winter": in those conditions. Austria is stricter: from 1 November to 15 April, in wintry conditions, cars must either have winter tyres on all four wheels or chains fitted to the driven axle.'],
      ['p', 'Tyres must carry the alpine symbol (a three-peak mountain with a snowflake). The older M+S marking alone is no longer sufficient in either country. Driving without them in snow risks a fine, and — more expensively — your insurer taking an interest after a claim.'],

      ['h2', 'Snow chains'],
      ['p', 'Chains are not required everywhere, all the time. They are required where a blue sign with a tyre-and-chain symbol says so, and those signs appear on specific valley and pass roads when conditions demand.'],
      ['ul', [
        'Carry a set that fits your rental if you are going above about 1,200 m.',
        'Fit them before the climb, in a lay-by, not halfway up on a gradient.',
        'Practise once in daylight. The first attempt in the dark, in snow, with cold hands, takes three times as long.',
        'Chains have a speed limit, usually 50 km/h. Remove them once the road is clear or you will ruin them and the road surface.',
      ]],

      ['h2', 'Which passes close, and when'],
      ['p', 'High passes shut for the season. This is the detail that catches out anyone planning a route from a summer map.'],
      ['table',
        ['Pass', 'Winter status'],
        [
          ['Brenner (1,370 m)', 'Open all year — the lowest major crossing and a freight artery'],
          ['Reschen (1,504 m)', 'Open all year, cleared as a priority'],
          ['Arlberg road pass (1,793 m)', 'Closes in severe weather; the tunnel below stays open'],
          ['Flexen (to Lech and Zürs)', 'Closes for avalanche control, sometimes for hours'],
          ['Timmelsjoch (2,474 m)', 'Closed roughly late October to late May'],
          ['Stelvio (2,757 m)', 'Closed roughly November to late May'],
          ['Foscagno (to Livigno, 2,291 m)', 'Open, but exposed and held for snow clearance'],
        ],
      ],
      ['p', 'A satellite navigation system will happily route you over the Stelvio in January. Check the national road services — ASFINAG in Austria, TCS in Switzerland — on the morning you travel, not the week before.'],

      ['h2', 'A short pre-departure list'],
      ['ul', [
        'Vignette bought and displayed, or the digital one registered to the plate.',
        'Alpine-symbol winter tyres on all four wheels.',
        'Chains in the boot, and you have fitted them once.',
        'Passport or ID card for everyone — Schengen crossings are open, but spot checks happen.',
        'A full tank. Fuel in a resort valley costs more and the stations close early.',
        'A physical route plan that does not rely on a pass being open.',
      ]],
      ['p', 'If that list reads like a lot of work for one journey, that is the honest case for being driven instead. All of the above is included in a transfer fare, and someone else fits the chains.'],
    ],

    faqs: [
      ['Do I need a vignette to drive from Munich to Austria?',
       'Yes, for any Austrian motorway or expressway. Buy it before the border — at the airport, a German petrol station, or online. A digital vignette is registered to the number plate.'],
      ['Are winter tyres compulsory in Austria?',
       'From 1 November to 15 April, in wintry conditions, a car must have winter tyres on all four wheels or chains on the driven axle. The tyres must carry the alpine three-peak-and-snowflake symbol; M+S alone is no longer enough.'],
      ['When does the Stelvio Pass close?',
       'Roughly November to late May. It is never a winter option, whatever a map or a satnav suggests. The Reschen Pass is the year-round alternative into the Vinschgau.'],
      ['Is the Brenner Pass open in winter?',
       'Yes. At 1,370 m it is the lowest of the major alpine crossings and a critical freight route, so it is cleared continuously. Heavy-goods traffic is a more likely delay than snow.'],
      ['Do I need snow chains as well as winter tyres?',
       'Only where a blue chain sign requires them, but carry a set if you are going above about 1,200 m. Fit them in a lay-by before the climb, and keep below the 50 km/h chain speed limit.'],
    ],
  },

];
