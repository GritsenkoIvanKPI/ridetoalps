/* Route prose in German, keyed by slug.
 *
 * Only the fields that contain language are here; the price, distance, drive
 * time, images and calculator key stay in routes.data.mjs and are merged in by
 * the build, so a price change is made in one place and reaches all four
 * language versions.
 *
 * Place names follow local usage — Bozen, not Bolzano — and guest names are
 * left as written.
 */
export default {

  'munich-city': {
    time: '45 Min.',
    dest: 'München Stadt', destShort: 'München', region: 'Bayern, Deutschland',
    heroAlt: 'Mercedes V-Klasse vor einem Hoteleingang in der Münchner Innenstadt',
    townAlt: 'Der Marienplatz in der Münchner Innenstadt an einem Winterabend',
    h1: 'Flughafen München in die Münchner Innenstadt',
    lede: 'Der kurze Sprung in die Stadt — feste 100 €, ob Sie zu einem Hotel in der Altstadt, ' +
          'einer Wohnung in Schwabing oder zur Messe wollen.',
    road: 'Der Flughafen liegt rund 30 km nordöstlich der Stadt, und die Fahrt führt fast ' +
          'vollständig über die Autobahn: die A92 nach Westen, dann die A99 nach Süden, bevor es ' +
          'in die Stadt hineingeht. Außerhalb der Stoßzeiten sind es bequeme 40 Minuten. Etwa ' +
          'zwischen 07:00 und 09:30 Uhr und noch einmal von 16:00 bis 18:30 Uhr kann die A9 ins ' +
          'Zentrum zwanzig Minuten oder mehr kosten — das planen wir ein, statt Sie auf die Uhr ' +
          'schauen zu lassen.',
    roadNote: 'Keine Pässe, keine Maut, keine saisonalen Sperrungen — das ist die eine Strecke, ' +
              'die im Januar genauso läuft wie im Juli.',
    resort: 'München belohnt den frühen Start. Die Altstadt ist kompakt genug, um sie in einer ' +
            'halben Stunde zu durchqueren: vom Marienplatz und dem Viktualienmarkt bis zum ' +
            'Hofbräuhaus und zur Residenz. Wenn Sie am nächsten Morgen weiter in die Alpen ' +
            'fahren, liegt alles nah beieinander, wenn Sie am Hauptbahnhof oder am Sendlinger ' +
            'Tor übernachten. Viele unserer Gäste nutzen diesen Transfer als erste oder letzte ' +
            'Etappe einer längeren Reise — bei der Ankunft vom Flughafen zum Hotel, auf dem ' +
            'Rückweg vom Hotel zum Flughafen, in beide Richtungen zum selben Festpreis.',
    faqs: [
      ['Gelten die 100 € für jede Adresse in München?',
       'Ja — für jedes Hotel und jede Privatadresse innerhalb der Stadt. Der Festpreis gilt für ' +
       'die Fahrt in beide Richtungen. Bei Adressen deutlich außerhalb des Autobahnrings sagen ' +
       'Sie uns Bescheid, und wir bestätigen den Preis vor der Buchung.'],
      ['Was ist, wenn mein Flug im Berufsverkehr landet?',
       'Damit rechnen wir. Ihr Fahrer verfolgt den Flug bereits und kalkuliert ein, dass sich die ' +
       'A9 zwischen 07:00–09:30 und 16:00–18:30 Uhr staut. Eine Wartegebühr fällt in keinem Fall an.'],
      ['Holen Sie auch von der Messe oder einem Konferenzzentrum ab?',
       'Ja. Geben Sie bei der Buchung die Halle oder den Eingang an — die Messe München hat ' +
       'mehrere, und am falschen zu landen kostet alle Beteiligten Zeit.'],
      ['Ist das günstiger als ein Taxi?',
       'Auf dem Taxameter ungefähr vergleichbar, aber eben fest. Ein Münchner Taxi vom Flughafen ' +
       'kostet je nach Verkehr typischerweise 75–110 €, und der Verkehr ist genau das, was sich ' +
       'nicht vorhersagen lässt. Unser Preis bewegt sich nicht.'],
    ],
    reviews: [
      ['Um 07:40 mitten im Berufsverkehr gelandet und trotzdem pünktlich zu einem Termin um ' +
       '10:00 Uhr in Schwabing. Der Fahrer hatte den Verkehr sichtbar eingerechnet.', 'Martin Brenner', 5],
      ['Für eine Konferenz auf der Messe in beide Richtungen genutzt. Direkt am richtigen Eingang ' +
       'abgesetzt zu werden statt am Haupttor hat uns einen langen Weg mit Koffern erspart.', 'Sophie Lambert', 5],
      ['Einfach, Festpreis, keine Taxameter-Sorgen nach einem langen Flug. Genau das, was ich ' +
       'wollte.', 'Tomasz Zieliński', 4],
    ],
  },

  'kitzbuehel': {
    time: '1 Std. 50',
    dest: 'Kitzbühel', destShort: 'Kitzbühel', region: 'Tirol, Österreich',
    heroAlt: 'Mercedes V-Klasse auf der verschneiten Zufahrtsstraße nach Kitzbühel',
    townAlt: 'Die Hauptstraße von Kitzbühel im tiefen Winter',
    h1: 'Flughafen München nach Kitzbühel',
    lede: 'Eine der einfachsten Alpenfahrten ab München — fast bis zum Talboden Autobahn, dann ' +
          'ein kurzer Anstieg in einen der bekanntesten Skiorte Tirols.',
    road: 'Vom Flughafen geht es auf der A8 nach Südosten Richtung Salzburg, dann bei Rosenheim ' +
          'auf die A93 hinunter ins Inntal. Bei Kufstein überqueren Sie die Grenze nach ' +
          'Österreich, und die Straße folgt dem Fluss bis Wörgl, von wo die B170 und die B161 ' +
          'das letzte Stück über die Seite des Pass Thurn nach Kitzbühel hinaufführen. Eine ' +
          'wirklich unkomplizierte Fahrt — rund 155 km, bei guten Bedingungen etwa 1 Std. 50.',
    roadNote: 'Der letzte Anstieg wird die ganze Saison über durchgehend geräumt, aber nach ' +
              'starkem Schneefall ist das der eine Abschnitt, auf dem wir langsamer werden. ' +
              'Planen Sie an einem Samstag im Januar etwas mehr Zeit ein, wenn ganz Tirol ' +
              'gleichzeitig die Chalets wechselt.',
    resort: 'Kitzbühel ist zuerst eine mittelalterliche Stadt und erst danach ein Skiort — ' +
            'deshalb fühlt es sich anders an als die am Reißbrett entstandenen Täler weiter ' +
            'westlich. Die bemalten Fassaden entlang der Vorderstadt sind echt, und die Stadt ' +
            'bleibt abends lange lebendig, nachdem die Lifte schließen. Das Hahnenkamm braucht ' +
            'keine Vorstellung — die Streif ist die gefürchtetste Abfahrt im Weltcup-Kalender, ' +
            'und Ende Januar ist die ganze Stadt auf den Beinen. Für alle anderen gibt es 230 km ' +
            'Pisten, eine Gondel direkt am Ortsrand und den KitzSki-Verbund hinüber nach ' +
            'Kirchberg und zum Pass Thurn.',
    faqs: [
      ['Wie lange dauert die Fahrt im Winter wirklich?',
       'Rund 1 Std. 50 auf freier Strecke. An einem Spitzensamstag im Januar, mit ' +
       'Wechselverkehr durch Wörgl und Neuschnee auf dem letzten Anstieg, sind 2 Std. 15 ' +
       'realistischer. Wir planen den schlechteren Fall ein, nicht den Prospektwert.'],
      ['Setzen Sie am Chalet oder im Ortszentrum ab?',
       'An der Tür. Kitzbühel hat in der Altstadt viele enge Einbahnstraßen — nennen Sie uns bei ' +
       'der Buchung die Adresse, und wir klären die Zufahrt, statt Sie mit Koffern über das ' +
       'Kopfsteinpflaster zu schicken.'],
      ['Ist die österreichische Vignette inbegriffen?',
       'Ja. Die Autobahnvignette und jede Maut auf der Strecke sind in den 300 € enthalten. Der ' +
       'Preis, den Sie sehen, ist der Preis, den Sie zahlen.'],
      ['Können Sie uns zum Hahnenkamm-Rennen bringen?',
       'Ja, und wir würden früh buchen. Das Rennwochenende Ende Januar ist der mit Abstand ' +
       'meistgefragte Termin des Tiroler Jahres, und unsere Regel von einer Buchung pro Tag ' +
       'bedeutet: Der Termin geht an den, der zuerst bestätigt.'],
      ['Und Ski- und Boardtaschen?',
       'Eine Tasche je zwei Personen passt bequem in eine V-Klasse. Bei größeren Gruppen oder ' +
       'ungewöhnlichem Gepäck sagen Sie uns Bescheid, und wir stellen ein Fahrzeug mit Dachbox.'],
    ],
    reviews: [
      ['Unser Flug aus London hatte zwei Stunden Verspätung und ich hatte mich auf einen Albtraum ' +
       'eingestellt. Der Fahrer verfolgte ihn längst und stand einfach da, als wir herauskamen. ' +
       'Um acht waren wir in Kitzbühel.', 'Mark Stevens', 5],
      ['Wir waren sechs, mit Ski und Boards. Die extralange V-Klasse mit Dachbox hat alles ' +
       'geschluckt — zwei Stunden lang hatte niemand eine Tasche auf dem Schoß.', 'Brian Tomlin', 5],
      ['Monate im Voraus für das Hahnenkamm-Wochenende gebucht. Sofort bestätigt, und der Fahrer ' +
       'wusste genau, welche Straßensperren am Renntag galten.', 'Henrik Olsen', 5],
    ],
  },

  'salzburg': {
    time: '1 Std. 30',
    dest: 'Salzburg', destShort: 'Salzburg', region: 'Salzburger Land, Österreich',
    heroAlt: 'Mercedes V-Klasse überquert im Winter die Salzach in Salzburg',
    townAlt: 'Die Salzburger Altstadt unterhalb der Festung Hohensalzburg im Winter',
    h1: 'Flughafen München nach Salzburg',
    lede: 'Die schnellste Fahrt in eine Alpenstadt ab München — geradeaus über die A8, keine ' +
          'Pässe, keine Anstiege, und in neunzig Minuten stehen Sie in Mozarts Altstadt.',
    road: 'Das ist die einfachste Fahrt, die wir anbieten. Die A8 führt fast die ganze Strecke ' +
          'nach Südosten vom Flughafen weg, am Chiemsee vorbei und über die Grenze bei ' +
          'Walserberg nach Salzburg. 145 km, etwa 1 Std. 30, und praktisch durchgehend flache ' +
          'Autobahn. Weil es keinen Gebirgsabschnitt gibt, ist diese Strecke von allen in unserer ' +
          'Liste am wenigsten vom Winterwetter betroffen.',
    roadNote: 'Gut zu wissen: Die A8 rund um den Chiemsee ist in der Skisaison an ' +
              'Freitagnachmittagen und Sonntagabenden ein bekannter Engpass. Wo der Flug es ' +
              'zulässt, legen wir die Fahrt darum herum.',
    resort: 'Salzburg funktioniert als Ziel und als Ausgangspunkt. Die Altstadt ist ' +
            'UNESCO-Welterbe und komplett zu Fuß zu erschließen — Getreidegasse, Residenz, ' +
            'Mozarts Geburtshaus, und die Festung darüber erreicht man mit der Standseilbahn. Im ' +
            'Winter läuft der Christkindlmarkt auf dem Domplatz den ganzen Dezember, und die ' +
            'Stadt ist spürbar ruhiger als Wien. Sie ist zugleich das Tor zum Salzburger Land: ' +
            'Zell am See, Saalbach und das Gasteinertal liegen alle innerhalb einer Stunde — ' +
            'etliche unserer Gäste fliegen nach München, fahren für eine Nacht nach Salzburg und ' +
            'ziehen dann weiter in die Berge.',
    faqs: [
      ['Warum ist Salzburg teurer als Kitzbühel, obwohl es näher liegt?',
       'Die Fahrt ist kürzer, der Tag für das Fahrzeug aber länger — Abholungen und Zustellungen ' +
       'in Salzburg konzentrieren sich auf die Innenstadt, wo Zufahrt und Warten länger dauern ' +
       'als an einer Chalet-Tür. Der Preis bildet die gesamte Tour ab, nicht nur die Kilometer.'],
      ['Können Sie weiter nach Zell am See oder Saalbach fahren?',
       'Ja — das sind eigene Strecken, die wir einzeln kalkulieren. Wählen Sie im Preisrechner ' +
       '„Anderes Ziel“ und sagen Sie uns, wohin, und wir melden uns mit einem Festpreis.'],
      ['Ist die Altstadt mit dem Auto erreichbar?',
       'Teilweise. Ein großer Teil des Zentrums ist Fußgängerzone, und manche Hotels sind nur zu ' +
       'Fuß von einem nahegelegenen Haltepunkt zu erreichen. Wir wissen, welche das sind, und ' +
       'sagen es Ihnen vorher statt bei der Ankunft.'],
      ['Überquert die Strecke eine Grenze?',
       'Ja, von Deutschland nach Österreich bei Walserberg. Es ist ein Schengen-Übergang ohne ' +
       'regelmäßige Kontrollen, gelegentliche Stichproben kommen aber vor. Bringen Sie Reisepass ' +
       'oder Personalausweis mit.'],
    ],
    reviews: [
      ['Neunzig Minuten von Tür zu Tür, vom Terminal bis zu einem Hotel hinter der Getreidegasse. ' +
       'Der Fahrer wusste genau, wo das Auto hinkommt und wo nicht.', 'Claire Dubois', 5],
      ['Wir haben Salzburg als Zwischenstopp vor Zell am See genutzt. Beide Etappen zusammen ' +
       'gebucht, beide pünktlich.', 'Jan Pedersen', 5],
      ['Sonntagabend im Februar und die A8 war rund um den Chiemsee dicht. Wir kamen trotzdem ' +
       'an, wann er gesagt hatte — er hatte es eingeplant.', 'Rebecca Hall', 4],
    ],
  },

  'innsbruck': {
    time: '1 Std. 45',
    dest: 'Innsbruck', destShort: 'Innsbruck', region: 'Tirol, Österreich',
    heroAlt: 'Mercedes V-Klasse auf der Inntalautobahn kurz vor Innsbruck',
    townAlt: 'Das Goldene Dachl in Innsbruck mit der Nordkette im Hintergrund',
    h1: 'Flughafen München nach Innsbruck',
    lede: 'Das ganze Inntal hinunter auf der Autobahn, in die einzige Stadt der Alpen, in der die ' +
          'Berge am Ende der Straße beginnen.',
    road: 'A8 nach Südosten bis Rosenheim, A93 hinunter nach Kufstein und zur österreichischen ' +
          'Grenze, dann folgt die A12 Inntalautobahn dem Fluss bis nach Innsbruck. Rund 160 km ' +
          'und 1 Std. 45. Weil die gesamte Strecke Autobahn auf dem Talboden ist, bleibt sie bei ' +
          'fast jedem Wetter offen und zügig — eine der verlässlichsten Winterfahrten in den Alpen.',
    roadNote: 'Die A12 ist die Hauptschlagader zu der Hälfte der Tiroler Skigebiete, deshalb ist ' +
              'an Samstagvormittagen in der Hochsaison viel Verkehr Richtung Westen. Nichts ' +
              'Dramatisches, aber der Grund, warum wir 1 Std. 45 nennen und nicht die 1 Std. 30, ' +
              'die eine Karte verspricht.',
    resort: 'Innsbruck ist ungewöhnlich: eine richtige Stadt mit 130.000 Einwohnern, hinter deren ' +
            'Altstadt die Nordkette 2.000 Meter aufragt. Die Hungerburgbahn fährt mitten aus dem ' +
            'Zentrum und setzt Sie in zwanzig Minuten auf dem Berg ab — Sie können vormittags ' +
            'Ski fahren und mittags unter dem Goldenen Dachl im Café sitzen. Zweimal war die ' +
            'Stadt Austragungsort der Olympischen Winterspiele, und die Schanze am Bergisel ' +
            'gehört weiterhin zur Vierschanzentournee. Für Skifahrer ist die Stadt außerdem ein ' +
            'Standquartier: Der Skipass Olympia SkiWorld umfasst neun Gebiete, darunter die ' +
            'Axamer Lizum und den Stubaier Gletscher, alle innerhalb von vierzig Minuten.',
    faqs: [
      ['Ist Innsbruck ein guter Ausgangspunkt für mehrere Skigebiete?',
       'Der beste in Tirol. Der Olympia-SkiWorld-Pass deckt neun Skigebiete mit kostenlosen ' +
       'Skibussen ab der Stadt ab — Sie wohnen in einem Hotel und fahren jeden Tag woanders.'],
      ['Holen Sie auch vom Innsbrucker Bahnhof oder Flughafen ab?',
       'Ja — der Festpreis gilt für die Fahrt Flughafen München–Innsbruck, und wir holen an jeder ' +
       'Adresse in der Stadt ab oder setzen dort ab, einschließlich Hauptbahnhof und Flughafen ' +
       'Innsbruck.'],
      ['Wie verhält sich diese Strecke bei starkem Schneefall?',
       'Besser als die meisten. Die A12 ist eine Talautobahn, die mit nationaler Priorität ' +
       'geräumt wird — es gibt keinen Pass. Auf dieser Strecke sind Verzögerungen am ' +
       'unwahrscheinlichsten.'],
      ['Können wir unterwegs bei den Swarovski Kristallwelten halten?',
       'Ja, die liegen direkt an der A12 bei Wattens. Ein kurzer Stopp ist kein Problem — sagen ' +
       'Sie es bei der Buchung, damit der Fahrer die Zeit einplant.'],
    ],
    reviews: [
      ['Es schneite das ganze Inntal hinunter und es machte keinen Unterschied — die Autobahn war ' +
       'frei und wir kamen auf die Minute an.', 'Andrew Fitzgerald', 5],
      ['Wir haben in Innsbruck gewohnt und jeden Tag ein anderes Gebiet befahren. Der Transfer ' +
       'war der einfache Teil; der Fahrer hat uns sogar erklärt, wie der Skibus-Pass funktioniert.', 'Marta Kowalczyk', 5],
      ['Wir wollten unterwegs in Wattens halten. Kein Problem, kein Aufpreis für die zwanzig ' +
       'Minuten.', 'Nils Bergström', 5],
    ],
  },

  'ischgl': {
    time: '2 Std. 45',
    dest: 'Ischgl', destShort: 'Ischgl', region: 'Paznauntal, Tirol, Österreich',
    heroAlt: 'Mercedes V-Klasse auf der schneeummauerten Paznauntalstraße nach Ischgl',
    townAlt: 'Das Skigebiet Ischgl mit der Silvretta-Bahn über den Pisten',
    h1: 'Flughafen München nach Ischgl',
    lede: 'Autobahn bis Landeck, dann vierzig Minuten hinauf ins Paznaun — eine Talstraße mit ' +
          'Schneewänden, die im Hochwinter höher sind als das Auto.',
    road: 'Die ersten zwei Stunden sind einfach: A8, A93 und die A12 durchs Inntal an Innsbruck ' +
          'vorbei bis Landeck. Von dort biegt die B188 nach Süden ins Paznaun ab und steigt über ' +
          '30 km durch Kappl und See stetig nach Ischgl auf 1.377 m. Insgesamt rund 250 km, etwa ' +
          '2 Std. 45. Entscheidend ist die Talstraße — einspurig je Richtung, durchgehend ' +
          'geräumt und wirklich spektakulär, wenn die Schneewände am höchsten stehen.',
    roadNote: 'Das Paznaun ist ein Sackgassental mit einer einzigen Zufahrt. Nach außergewöhnlich ' +
              'starkem Schneefall kann sie kurz für Lawinensprengungen gesperrt werden, ' +
              'üblicherweise für ein bis zwei Stunden. Wir verfolgen die Tiroler Straßenberichte ' +
              'und sagen Ihnen vorher Bescheid, nicht erst, wenn Sie darin stehen.',
    resort: 'In Ischgl trifft ernsthaftes Skifahren auf einen Nachtleben-Ruf, den der Ort nie ' +
            'loswerden wollte. Die Silvretta Arena verbindet 239 Pistenkilometer mit Samnaun ' +
            'jenseits der Schweizer Grenze — Sie fahren zum Mittagessen und zum zollfreien ' +
            'Einkauf in die Schweiz und wieder zurück. Dank der Höhe ist die Saison lang: Der ' +
            'größte Teil des Geländes liegt zwischen 2.000 und 2.900 m, die Schneelage ist von ' +
            'Ende November bis in den Mai verlässlich. Die Top-of-the-Mountain-Konzerte zum ' +
            'Saisonstart und -ende hatten schon Elton John und Robbie Williams zu Gast, was das ' +
            'Selbstbild des Orts recht gut beschreibt.',
    faqs: [
      ['Kann die Straße nach Ischgl gesperrt werden?',
       'Gelegentlich, ja. Das Paznaun hat eine einzige Zufahrt, und nach sehr starkem Schneefall ' +
       'sperren die Behörden sie für kontrollierte Lawinensprengungen, typischerweise für ein ' +
       'bis zwei Stunden. Wir beobachten den Tiroler Straßendienst und halten Sie auf dem ' +
       'Laufenden — genau deshalb nehmen wir eine Buchung pro Tag an, statt Aufträge zu stapeln.'],
      ['Können Sie uns stattdessen nach Samnaun bringen?',
       'Samnaun liegt in der Schweiz und wird über eine andere Straße erreicht, daher wird es ' +
       'separat berechnet. Wählen Sie „Anderes Ziel“, und wir nennen Ihnen den Preis.'],
      ['Gibt es einen Zuschlag für eine späte Ankunft?',
       'Abfahrten vor 07:00 oder nach 22:00 Uhr werden zum Nachttarif berechnet, den der ' +
       'Preisrechner automatisch anwendet, sobald Sie die Uhrzeit wählen. Keine Überraschungen ' +
       'am Ende.'],
      ['Wie viel Gepäck passt für eine Gruppe von sechs Personen?',
       'Sechs Personen mit Skitaschen brauchen eine V-Klasse Extra Lang mit Dachbox, die wir ' +
       'automatisch einteilen, sobald Sie uns Gruppengröße und Gepäckmenge nennen.'],
      ['Ist die Fahrt für Kinder anstrengend?',
       'Der Anstieg durchs Tal ist kurvig, aber sanft — keine Kehren. Kinder, denen leicht ' +
       'übel wird, sitzen besser in der mittleren Reihe, und wir halten an, wann immer Sie wollen.'],
    ],
    reviews: [
      ['Die Straßen hinauf ins Paznaun waren eingeschneit, und der Fahrer wusste genau, welchen ' +
       'Weg er nehmen und wann er warten musste. Die ganze Fahrt über ruhig.', 'Kevin Thompson', 5],
      ['Schneewände links und rechts, höher als der Van. Allein dafür lohnt sich die Fahrt. Wir ' +
       'waren rechtzeitig zur ersten Bahn am nächsten Morgen da.', 'Lucia Ferrari', 5],
      ['Unser Flug kam um 23:30 an. Der Nachttarif stand vorab im Preisrechner, kein Feilschen am ' +
       'Ende, der Fahrer wartete wie versprochen.', 'Stuart McKenzie', 4],
    ],
  },

  'soelden': {
    time: '2 Std. 45',
    dest: 'Sölden', destShort: 'Sölden', region: 'Ötztal, Tirol, Österreich',
    heroAlt: 'Mercedes V-Klasse auf der Ötztaler Talstraße kurz vor Sölden',
    townAlt: 'Gletscherpisten in Sölden mit Gondelbahn über dem Tal',
    h1: 'Flughafen München nach Sölden',
    lede: 'Das Inntal hinunter, dann dreißig Kilometer hinauf ins Ötztal — zu zwei Gletschern und ' +
          'einer der verlässlichsten Schneelagen der Alpen.',
    road: 'A8 und A93 bis Kufstein, A12 an Innsbruck vorbei, dann bei Ötztal-Bahnhof ab auf die ' +
          'B186, die das Ötztal hinauf nach Sölden auf 1.368 m führt. Etwa 245 km und 2 Std. 45. ' +
          'Die Talstraße ist für alpine Verhältnisse breit und gut instand gehalten — das hier ' +
          'ist ein großes Skigebiet, und die Zufahrt zeigt das.',
    roadNote: 'Sölden liegt am oberen Ende eines langen Tals, die letzten 35 km gehen also ' +
              'durchgehend bergauf. Bei Schneefall wird dieser Abschnitt für alle langsamer; uns ' +
              'ist es lieber, 3 Stunden zu nennen und früher anzukommen, als 2 Std. 30 zu ' +
              'versprechen und Sie warten zu lassen.',
    resort: 'Sölden ist einer der wenigen Orte Österreichs mit zwei Gletschern — deshalb öffnet ' +
            'es im September und deshalb startet der Weltcup traditionell hier im Oktober. Der ' +
            'Rettenbach- und der Tiefenbachferner sind durch Österreichs höchsten Straßentunnel ' +
            'verbunden, und alle drei „Big 3“-Aussichtsplattformen liegen über 3.000 m. Unter den ' +
            'Gletschern warten 144 Pistenkilometer, und die Gaislachkoglbahn aus dem Ort ist die, ' +
            'die im Bond-Film *Spectre* vorkommt — das Restaurant ice Q oben war die Klinik des ' +
            'Bösewichts. Der Ort selbst ist eher zweckmäßig als malerisch, aber wegen der ' +
            'Architektur kommt niemand nach Sölden.',
    faqs: [
      ['Wann beginnt die Saison in Sölden?',
       'Die Gletscher öffnen im September, damit gehört Sölden zu den frühesten Gebieten der ' +
       'Alpen. Der Weltcup-Auftakt ist üblicherweise das dritte Oktoberwochenende. Wir fahren ' +
       'vom ersten Gletscherwochenende bis in den Mai.'],
      ['Setzen Sie auch an einem Hotel oben an der Gletscherstraße ab?',
       'Ja, so weit die Straße für den Verkehr offen ist. Ein Teil der höher gelegenen Unterkünfte ' +
       'ist im tiefen Winter nur per Skibus oder Pistenraupe erreichbar — nennen Sie uns das ' +
       'Hotel, und wir bestätigen, wie nah wir herankommen.'],
      ['Ist das derselbe Preis wie Ischgl? Die Entfernung sieht ähnlich aus.',
       'Sölden kostet 450 € und Ischgl 400 €. Die Entfernungen liegen nah beieinander, aber der ' +
       'Anstieg ins Ötztal ist länger und höher, was mehr Zeit und mehr Winterreifenverschleiß ' +
       'bedeutet. Der Preis bildet die tatsächliche Fahrt ab.'],
      ['Was passiert bei einer Straßensperrung?',
       'Die Ötztalstraße ist die Lebensader mehrerer Dörfer und wird mit Priorität geräumt, ' +
       'vollständige Sperrungen sind selten. Falls doch, wissen wir es, bevor Sie landen, und ' +
       'sagen es Ihnen sofort.'],
    ],
    reviews: [
      ['Wir hatten die Abholung um 5 Uhr früh von unserem Hotel in Sölden zurück nach München ' +
       'gebucht. Um 04:55 stand das Auto davor, und der Fahrer hatte es schon vom Schnee befreit.', 'Emma Johnson', 5],
      ['Zum Weltcup-Auftakt im Oktober eingeflogen. Auf der Gletscherstraße war viel los und er ' +
       'hatte es eingeplant — wir haben den Start erreicht.', 'Pierre Lacroix', 5],
      ['Langer Anstieg durchs Tal mit zwei kleinen Kindern. Der Fahrer hat zweimal angehalten, ' +
       'ohne dass wir zweimal fragen mussten.', 'Hanna Virtanen', 5],
    ],
  },

  'st-anton': {
    time: '2 Std. 30',
    dest: 'St. Anton am Arlberg', destShort: 'St. Anton', region: 'Arlberg, Tirol, Österreich',
    heroAlt: 'Mercedes V-Klasse auf der Arlbergstraße bei St. Anton im Winter',
    townAlt: 'Das Ortszentrum von St. Anton am Arlberg unter tiefem Schnee',
    h1: 'Flughafen München nach St. Anton am Arlberg',
    lede: 'Die Inntalautobahn bis Landeck, dann die S16 hinauf zum Arlberg — die Geburtsstätte ' +
          'des alpinen Skilaufs und bis heute seine ernsthafteste Adresse.',
    road: 'A8, A93 und A12 bis Landeck, dann steigt die S16 Arlberg-Schnellstraße nach Westen ' +
          'hinauf nach St. Anton auf 1.304 m. Rund 230 km, etwa 2 Std. 30. Die S16 ist eine ' +
          'moderne Straße mit Tunneln und kein Gebirgssträßchen, was dies zu einer der einfacheren ' +
          'Ankünfte in großer Höhe in Österreich macht.',
    roadNote: 'Die Arlberg-Passstraße über die Höhe kann bei schwerem Wetter gesperrt werden, ' +
              'aber die Ausfahrt St. Anton liegt darunter, und der Straßentunnel hält das Tal ' +
              'offen. Nach St. Anton zu kommen ist selten das Problem — westwärts über den Pass ' +
              'nach Lech weiterzufahren manchmal schon.',
    resort: 'In St. Anton hat Hannes Schneider in den 1920er-Jahren die Arlberg-Technik erfunden, ' +
            'und der Ort hat seine Lust auf Schwierigkeit nie verloren. Das Skigebiet Ski Arlberg ' +
            'verbindet St. Anton, Lech, Zürs, Stuben und Warth zu 305 Pistenkilometern und rund ' +
            '200 km markierten Varianten — das größte zusammenhängende Gebiet Österreichs. Die ' +
            'Valluga ist der Name, den jeder kennt: Die oberste Seilbahn nimmt nur Gäste mit ' +
            'Bergführer mit, weil es auf der anderen Seite nur eine ernsthafte Abfahrt nach Zürs ' +
            'gibt. Das Dorf hat seinen alten Kern behalten — und einen Après-Ski-Ruf, der ' +
            'nachmittags im Mooserwirt beginnt und keine Pause macht.',
    faqs: [
      ['Können Sie weiter nach Lech oder Zürs fahren?',
       'Ja, das sind eigene Strecken über den Flexenpass, die einzeln berechnet werden. Wählen ' +
       'Sie im Preisrechner „Anderes Ziel“, nennen Sie den Ort, und wir machen Ihnen einen Preis.'],
      ['Ist der Arlbergpass jemals gesperrt?',
       'Die hohe Passstraße wird bei schwerem Wetter gesperrt, St. Anton selbst wird aber ' +
       'unterhalb des Passes über die S16 und ihren Tunnel erreicht — Ankünfte sind daher selten ' +
       'betroffen. Die Weiterfahrt nach Lech ist die Etappe, die aufgehalten werden kann.'],
      ['Warum kostet St. Anton mehr als Sölden, obwohl es näher liegt?',
       'Höhe und Straßenverschleiß. Der Anstieg über die S16 und die Arlberg-Bedingungen ' +
       'strapazieren ein Fahrzeug stärker als die Ötztalfahrt, und bei einer Fahrt nach St. Anton ' +
       'kehrt der Fahrer oft im Dunkeln über dieselbe Straße zurück.'],
      ['Fahren Sie auch während des Arlberg-Marathons oder der Rennwochen?',
       'Ja, und diese Termine sind früh ausgebucht. Eine Buchung pro Tag bedeutet, dass ein ' +
       'gefragter Termin an den geht, der zuerst bestätigt — warten Sie also nicht bis zur ' +
       'Woche davor.'],
    ],
    reviews: [
      ['Der Fahrer ist die Arlbergstraße hunderte Male gefahren und man hat es gemerkt — starker ' +
       'Schneefall, völlig gelassen, früher angekommen als geplant.', 'Chris Palmer', 5],
      ['Wir waren eine Gruppe von sieben mit Boards. Extralange V-Klasse, Dachbox, alles passte, ' +
       'und der Preis hat sich nie verändert.', 'Isabelle Moreau', 5],
      ['Für eine Rennwoche im März gebucht. In Minuten bestätigt, und der Fahrer hat uns vor der ' +
       'Flexenstraße gewarnt, bevor wir überhaupt gefragt haben.', 'Daniel Richter', 4],
    ],
  },

  'st-moritz': {
    time: '3 Std. 45',
    dest: 'St. Moritz', destShort: 'St. Moritz', region: 'Engadin, Schweiz',
    heroAlt: 'Mercedes V-Klasse am zugefrorenen See von St. Moritz',
    townAlt: 'St. Moritz und der zugefrorene See im Engadin',
    h1: 'Flughafen München nach St. Moritz',
    lede: 'Die längste und wohl schönste unserer Strecken — das Inntal hinunter, über den ' +
          'Reschenpass und hinein ins Engadin.',
    road: 'A8, A93 und A12 bis Landeck, dann nach Süden auf der B180 über den Reschenpass auf ' +
          '1.504 m, vorbei am berühmten versunkenen Kirchturm im Reschensee, weiter durch den ' +
          'Vinschgau und ins Engadin nach St. Moritz auf 1.822 m. Etwa 330 km und 3 Std. 45, mit ' +
          'Grenzübertritten von Deutschland nach Österreich, kurz nach Italien und schließlich in ' +
          'die Schweiz.',
    roadNote: 'Drei Grenzen und zwei Pässe machen diese Strecke am anfälligsten für Winterwetter. ' +
              'Der Reschen ist ganzjährig offen, aber bei starkem Schneefall planen wir mehr Zeit ' +
              'ein, statt ein Risiko einzugehen — und wir sagen Ihnen immer vorher Bescheid, wenn ' +
              'die Bedingungen eine spätere Ankunft bedeuten.',
    resort: 'St. Moritz ist länger im Wintertourismus als jeder andere Ort — die Saison wurde ' +
            'hier 1864 praktisch per Wette erfunden. Der Ort hat zweimal die Olympischen ' +
            'Winterspiele ausgerichtet und veranstaltet bis heute den Cresta Run und im Februar ' +
            'das White-Turf-Pferderennen auf dem zugefrorenen See. Das Skigebiet ist weitläufig ' +
            'und hoch: Corviglia über dem Ort, Corvatsch auf der anderen Talseite und insgesamt ' +
            '350 Pistenkilometer im Engadin, mit einer der beständigsten Sonnenscheindauer der ' +
            'Alpen. Der Ort teilt sich in Dorf, das elegante Viertel über dem See, und Bad, ' +
            'weiter unten bei den Thermalquellen.',
    faqs: [
      ['Brauche ich für die Schweizer Grenze etwas Besonderes?',
       'Nur Reisepass oder Personalausweis. Die Schweiz gehört zum Schengen-Raum, es gibt also ' +
       'keine regelmäßigen Kontrollen, Stichproben sind hier aber häufiger als an der ' +
       'österreichischen Grenze. Die Schweizer Autobahnvignette ist auf unseren Fahrzeugen bereits ' +
       'vorhanden und im Preis enthalten.'],
      ['Ist der Reschenpass im Winter offen?',
       'Ja, ganzjährig — er ist eine Hauptroute und wird mit Priorität geräumt. Er ist nicht das ' +
       'Stilfser Joch, das über den Winter schließt. Bei starkem Schneefall wird der Reschen ' +
       'langsamer, aber er sperrt in der Regel nicht.'],
      ['Sind fast vier Stunden zu lang für einen Fahrer?',
       'Nein. Es ist eine durchgehende Fahrt mit Pausen nach Bedarf, und weil wir nur eine ' +
       'Buchung pro Tag annehmen, gibt es keinen Druck, für einen zweiten Auftrag umzudrehen. ' +
       'Kurze Pausen sind inbegriffen — fragen Sie einfach.'],
      ['Können Sie uns stattdessen nach Pontresina oder Celerina bringen?',
       'Ja, beide liegen wenige Minuten von St. Moritz entfernt und sind zum gleichen Preis ' +
       'abgedeckt. Nennen Sie den Ort bei der Buchung.'],
      ['Was ist die schnellste Alternative bei schlechtem Wetter?',
       'Über Chur und die A13 — in Kilometern länger, dafür durchgehend Autobahn. Wir entscheiden ' +
       'am Tag selbst nach den tatsächlichen Bedingungen, ohne Änderung an Ihrem Preis.'],
    ],
    reviews: [
      ['Drei Grenzen, zwei Pässe, vier Stunden, und mittendrin der Kirchturm im Reschensee. Mit ' +
       'Abstand die schönste Fahrt der Reise.', 'Alexandra Weiss', 5],
      ['Starker Schneefall angekündigt, und er rief am Abend vorher an, um zu sagen, dass er ' +
       'stattdessen über Chur fahren würde. Pünktlich angekommen, zum selben Preis wie angeboten.', 'Graham Whitfield', 5],
      ['Lange Fahrt mit zwei Teenagern und niemand hat sich beschwert. Das WLAN hat viel davon ' +
       'übernommen.', 'Ingrid Solberg', 5],
    ],
  },

  'bolzano': {
    time: '3 Std. 15',
    dest: 'Region Bozen', destShort: 'Bozen', region: 'Südtirol, Italien',
    heroAlt: 'Mercedes V-Klasse auf der Abfahrt vom Brenner Richtung Bozen',
    townAlt: 'Der Waltherplatz in Bozen mit den Dolomiten im Hintergrund',
    h1: 'Flughafen München nach Bozen und Südtirol',
    lede: 'Über den Brenner und hinunter in die eine Ecke Italiens, in der die Straßenschilder ' +
          'zuerst auf Deutsch stehen — Weinberge, Dolomiten und eine ganz eigene alpin-italienische ' +
          'Mischung.',
    road: 'A8, A93 und A12 bis Innsbruck, dann steigt die A13 zum Brennerpass auf 1.370 m und ' +
          'wird auf der anderen Seite zur italienischen A22. Von dort führt eine lange Abfahrt ' +
          'durch das Eisacktal über Brixen und Klausen nach Bozen auf nur 262 m. Rund 300 km, ' +
          'etwa 3 Std. 15, fast durchgehend Autobahn.',
    roadNote: 'Der Brenner ist der niedrigste der großen Alpenübergänge und die verkehrsreichste ' +
              'Güterroute der Alpen. Er bleibt praktisch bei allen Bedingungen offen, aber der ' +
              'Schwerverkehr kann den Anstieg verlangsamen — deshalb nennen wir 3 Std. 15 und ' +
              'nicht die 2 Std. 45, die die Entfernung nahelegt.',
    resort: 'Südtirol ist italienisch im Pass und österreichisch in fast allem anderen — 1919 ' +
            'abgetreten und bis heute zuerst deutschsprachig. Bozen liegt in einem Talkessel ' +
            'voller Weinberge, wo drei Täler zusammentreffen, mit Palmen auf dem Platz und den ' +
            'Dolomiten eine halbe Stunde entfernt. Die Stadt ist der Ausgangspunkt für die ganze ' +
            'Region: Gröden, Alta Badia und Kronplatz liegen alle innerhalb von anderthalb ' +
            'Stunden, und der Dolomiti-Superski-Pass deckt zwölf Gebiete mit einem Ticket ab. ' +
            'Bozen selbst lohnt einen Tag — Waltherplatz, die Lauben und Ötzi im ' +
            'Archäologiemuseum.',
    faqs: [
      ['Welche Orte deckt dieser Preis ab?',
       'Die 550 € gelten für Bozen und die nähere Umgebung. Gröden, Alta Badia, Kronplatz und die ' +
       'übrigen Dolomitentäler liegen weiter und werden einzeln berechnet — wählen Sie „Anderes ' +
       'Ziel“ und nennen Sie den Ort.'],
      ['Sind die Brennermaut und die Autobahngebühren enthalten?',
       'Ja. Die österreichische Vignette, die Brennermaut und die Gebühren der italienischen A22 ' +
       'sind alle im Preis enthalten.'],
      ['Wird der Brenner im Winter gesperrt?',
       'Sehr selten. Mit 1.370 m ist er der niedrigste große Alpenübergang und eine zentrale ' +
       'Güterroute, er wird also durchgehend geräumt. Die wahrscheinlichere Verzögerung ist der ' +
       'Verkehr, nicht der Schnee.'],
      ['Überqueren wir zwei Grenzen?',
       'Ja — von Deutschland nach Österreich bei Kufstein, dann von Österreich nach Italien am ' +
       'Brenner. Beides sind Schengen-Übergänge; bringen Sie Reisepass oder Personalausweis mit.'],
    ],
    reviews: [
      ['Vom Brenner herunterzufahren, während sich die Dolomiten rosa färbten, war der Moment, in ' +
       'dem der Urlaub begann. Die ganze Fahrt lief rund.', 'Thomas Reinhardt', 5],
      ['Wir wollten weiter nach Gröden, und er hat uns die Möglichkeiten erklärt, statt uns ' +
       'einfach abzusetzen und zu fahren.', 'Elena Rossi', 5],
      ['Viel Schwerverkehr am Brenneranstieg, und wir kamen trotzdem in dem Zeitfenster an, das ' +
       'er uns am Flughafen genannt hatte.', 'Paul Jennings', 4],
    ],
  },

  'bormio-livigno': {
    time: '4 Std.',
    dest: 'Bormio und Livigno', destShort: 'Bormio / Livigno',
    region: 'Veltlin und Obervinschgau, Italien',
    heroAlt: 'Mercedes V-Klasse auf einer verschneiten Bergstraße kurz vor Bormio',
    townAlt: 'Die Altstadt von Bormio in den italienischen Alpen im Winter',
    h1: 'Flughafen München nach Bormio und Livigno',
    lede: 'Unsere längste Strecke — über den Reschen, durch den Vinschgau hinunter und hinein ins ' +
          'obere Veltlin, zu einem römischen Thermalort und einem zollfreien Tal auf 1.800 m.',
    road: 'A8, A93 und A12 bis Landeck, dann die B180 über den Reschenpass nach Italien und durch ' +
          'den Vinschgau am Meraner Land vorbei bis zur Abzweigung ins obere Veltlin. Bormio ' +
          'liegt auf 1.225 m; Livigno folgt weitere 40 Minuten später, über den Foscagnopass auf ' +
          '2.291 m. Rund 340 km und vier Stunden bis Bormio, eher 4 Std. 45 bis Livigno.',
    roadNote: 'Das Stilfser Joch — die auf der Karte naheliegende Linie — ist von etwa November ' +
              'bis Ende Mai gesperrt. Wir nutzen es im Winter nie. Die Foscagno-Straße nach ' +
              'Livigno bleibt offen, ist aber hoch, exponiert und wird gelegentlich für die ' +
              'Schneeräumung angehalten.',
    resort: 'Bormio ist ein alter Thermalort; schon die Römer badeten in denselben Quellen, die ' +
            'heute die Bagni Nuovi speisen. Hier findet eine Herren-Weltcupabfahrt auf der Piste ' +
            'Stelvio statt — einer der steilsten Starts im Zirkus — und 2026 werden hier die ' +
            'alpinen Wettbewerbe der Olympischen Winterspiele von Mailand-Cortina ausgetragen. ' +
            'Livigno, oben jenseits des Foscagno, ist wieder etwas ganz anderes: ein langes ' +
            'Hochtal mit jahrhundertealtem zollfreiem Status, 115 Pistenkilometern und dank der ' +
            'Höhe verlässlichem Schnee. Beide werden oft auf einem Skipass mit Santa Caterina ' +
            'kombiniert.',
    faqs: [
      ['Können Sie über das Stilfser Joch fahren?',
       'Im Winter nicht — es ist von etwa November bis Ende Mai gesperrt und kommt für einen ' +
       'Skitransfer nie infrage. Wir fahren über den Reschen und den Vinschgau, die ganzjährig ' +
       'offen sind.'],
      ['Kostet Livigno dasselbe wie Bormio?',
       'Livigno liegt weitere 40 Minuten über den Foscagnopass entfernt und wird daher separat ' +
       'berechnet. Wählen Sie „Anderes Ziel“, nennen Sie Livigno, und wir bestätigen den Betrag ' +
       'vor der Buchung.'],
      ['Was gilt bei den zollfreien Mengen in Livigno?',
       'Livigno liegt außerhalb des EU-Zollgebiets, es gibt also Grenzen für die Ausfuhr — ' +
       'typischerweise ein Liter Spirituosen und 200 Zigaretten pro Erwachsenem. Auf dem Weg ' +
       'hinunter gibt es eine Zollstelle; unsere Rolle beschränkt sich darauf, anzuhalten, wenn ' +
       'wir dazu aufgefordert werden.'],
      ['Sind vier Stunden nicht zu weit für einen Transfer?',
       'Es ist ein langer Tag, und wir kalkulieren ihn als einen. Weil wir nur eine Buchung pro ' +
       'Tag annehmen, gibt es an keinem Ende Hektik, und wir halten an, wann Sie möchten.'],
      ['Und die Olympischen Spiele 2026?',
       'Bormio richtet die alpinen Wettbewerbe von Mailand-Cortina 2026 aus. Die Nachfrage nach ' +
       'Transfers im Februar 2026 wird außergewöhnlich sein, und unsere Regel von einer Buchung ' +
       'pro Tag gilt auch dann — buchen Sie so früh wie irgend möglich.'],
    ],
    reviews: [
      ['Vier Stunden, und es fühlte sich nie so an. Er hat uns erklärt, dass das Stilfser Joch ' +
       'gesperrt ist und warum wir den langen Weg nehmen, was ich zu schätzen wusste.', 'Fiona Alexander', 5],
      ['Im Dunkeln über den Foscagno weiter nach Livigno. Völlig unbeeindruckt, und er wusste, wo ' +
       'die Zollstelle ist.', 'Marco Bianchi', 5],
      ['Lange im Voraus für die Olympiasaison gebucht. Sofort bestätigt — gut, dass wir nicht ' +
       'gewartet haben.', 'Katrin Hofer', 4],
    ],
  },

};
