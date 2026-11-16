/* Blog articles in German.
 *
 * The body is a block list with exactly the same shape as the English one in
 * blog.data.mjs — same kinds, same order, same list lengths, same table
 * dimensions. build-blog.mjs checks that and refuses to build if it drifts,
 * because a dropped block makes the German article quietly shorter and only a
 * German reader would ever see it.
 *
 * Search terms are translated for the German market rather than transliterated:
 * someone in Munich searches "Vignette Österreich" and "Schneeketten Pflicht",
 * not the English equivalents.
 */

export const categories = {
  all:      'Alle Artikel',
  planning: 'Reiseplanung',
  airport:  'Am Flughafen',
  roads:    'Bergstraßen',
};

export default {

  'munich-airport-to-alps-transport-options': {
    title: 'Vom Flughafen München in die Alpen: Zug, Bus, Mietwagen oder Privattransfer',
    description: 'Vier Wege vom Flughafen München (MUC) in die österreichischen, Schweizer ' +
                 'und italienischen Alpen im Vergleich: Kosten, Tür-zu-Tür-Zeit, Skigepäck ' +
                 'und was passiert, wenn der Flug Verspätung hat.',
    lede: 'München ist der Zubringerflughafen für die halben Ostalpen, und der Flughafen ist ' +
          'der einfache Teil. Vom Terminal zu einem Chalet 200 km weiter südlich zu kommen, ' +
          'mit Ski, im Februar — da fängt die Planung erst an.',
    imageAlt: 'Verschneite Alpenstraße in der Dämmerung, der Weg nach Süden aus München',

    body: [
      ['p', 'Der Flughafen München liegt 30 km nordöstlich der Stadt — aus Sicht der Berge auf der falschen Seite. Was Sie auch wählen: die erste Stunde vergeht damit, um München herumzukommen, nicht Richtung Alpen. Deshalb führen Vergleiche, die von der Luftlinie ausgehen, meist in die Irre.'],
      ['p', 'Es gibt vier realistische Möglichkeiten. Keine ist für alle die beste; sie scheitern an unterschiedlichen Stellen.'],

      ['h2', 'Die Bahn: günstig, schön und dreimal umsteigen'],
      ['p', 'Es gibt keine direkte Bahnverbindung vom Flughafen München zu einem Skiort. Jede Fahrt beginnt mit der S1 oder S8 in die Stadt — etwa 45 Minuten bis zum Hauptbahnhof — und geht von dort weiter.'],
      ['p', 'Ab dem Hauptbahnhof ist die Bahn wirklich gut. Innsbruck ist mit dem ÖBB-Railjet in unter zwei Stunden erreichbar, Salzburg in anderthalb. Beides ist bequem, häufig und kostet einen Bruchteil von allem anderen auf dieser Liste.'],
      ['p', 'Schwierig wird die letzte Etappe. Kitzbühel, Sölden, Ischgl und St. Anton liegen nicht an einer Hauptstrecke, oder der Bahnhof liegt weit unterhalb des Orts. Eine typische Fahrt vom Flughafen zum Chalet bedeutet S-Bahn, Fernzug, Regionalzug und Bus oder Taxi — viermal umsteigen, jedes Mal mit Gepäck, jedes Mal mit einem Anschluss, den man verpassen kann.'],
      ['ul', [
        'Am besten für: Alleinreisende und Paare mit leichtem Gepäck, nach Innsbruck oder Salzburg.',
        'Am schlechtesten für: Familien, Gruppen, alle mit Skitaschen und alle, die nach etwa 20:00 Uhr ankommen.',
        'Rechnen Sie mit 4–6 Stunden von Tür zu Tür bis zu einem Skiort, 2,5–3 Stunden bis in die Innsbrucker Innenstadt.',
      ]],

      ['h2', 'Der Skibus: günstig pro Platz, feste Abfahrten'],
      ['p', 'An Wintersamstagen fahren saisonale Buslinien vom Flughafen München zu den größeren Tiroler Skiorten. Pro Person sind sie der günstigste Weg bis vor die Haustür des Orts, und das Gepäck wird für Sie verladen.'],
      ['p', 'Der Haken ist der Fahrplan. Ein Bus fährt, wenn er fährt. Landet Ihr Flug 90 Minuten später — im Januar keine Seltenheit —, ist der Bus weg, und der nächste fährt womöglich erst am Folgetag. Außerdem konzentrieren sich die Verbindungen auf Samstage, was nichts nützt, wenn Ihre Reise unter der Woche beginnt.'],
      ['note', 'Busse halten außerdem nacheinander an mehreren Orten. Als Letzter auf der Route angefahren zu werden, kostet schnell eine ungeplante Stunde.'],

      ['h2', 'Mietwagen: Freiheit und eine längere Liste, als man denkt'],
      ['p', 'Ein Mietwagen ist die naheliegende Antwort — bis man alles zusammenrechnet. Die Miete selbst ist nur die erste Zeile.'],
      ['ul', [
        'Winterreifen sind in Österreich bei winterlichen Verhältnissen Pflicht, und Vermieter berechnen sie.',
        'Auf gekennzeichneten Abschnitten können Schneeketten vorgeschrieben sein; sie mitzuführen ist Ihre Sache.',
        'Eine österreichische Autobahnvignette brauchen Sie ab dem Grenzübertritt.',
        'Parken im Ort kostet häufig und ist in manchen Dörfern stark begrenzt.',
        'Bei Abholung in Deutschland und Fahrt in die Schweiz oder nach Italien fallen Auslandsgebühren an.',
      ]],
      ['p', 'Zusammengerechnet kostet eine Woche Mietwagen häufig mehr als ein Hin- und Rücktransfer für vier Personen — und das, bevor jemand nach einem 6-Uhr-Flug im Dunkeln ein fremdes Auto eine vereiste Talstraße hinaufgefahren hat.'],
      ['p', 'Ein Auto lohnt sich, wenn Sie zwischen Skiorten wechseln wollen oder Ihre Unterkunft wirklich abgelegen liegt. Für eine Woche an einem Ort ist es meist eine teure Art, ein Fahrzeug sechs Tage auf einem Parkplatz stehen zu lassen.'],

      ['h2', 'Privattransfer: der teuer aussehende, der es oft nicht ist'],
      ['p', 'Ein Privattransfer wird pro Fahrzeug berechnet, nicht pro Person. Diese eine Tatsache ändert die Rechnung vollständig — und sie ist das, was die meisten Vergleiche falsch machen.'],
      ['p', 'Ein Festpreis von 300 € nach Kitzbühel sind 300 €, ob eine Person mitfährt oder vier. Durch vier geteilt sind das 75 € pro Kopf — vergleichbar mit der Bahn, sobald das Anschlusstaxi dazukommt, und ohne Umsteigen.'],
      ['p', 'Der andere Unterschied zeigt sich bei Verspätung. Ein Transfer, der auf Ihre Flugnummer gebucht ist, wird verfolgt; der Fahrer wartet auf die tatsächliche Landezeit. Ein Bus wartet nicht, und ein Mietwagenschalter hat womöglich schon geschlossen.'],
      ['ul', [
        'Am besten für: Gruppen ab drei Personen, Familien, alle mit Skiausrüstung, späte Ankünfte und abgelegene Unterkünfte.',
        'Am schlechtesten für: Alleinreisende mit knappem Budget auf dem Weg in eine Stadt an der Hauptstrecke.',
      ]],

      ['h2', 'Ein grober Vergleich'],
      ['table',
        ['', 'Bahn', 'Skibus', 'Mietwagen', 'Privattransfer'],
        [
          ['Abgerechnet pro', 'Person', 'Person', 'Fahrzeug + Extras', 'Fahrzeug'],
          ['Tür zu Tür', 'nein', 'Ortszentrum', 'ja', 'ja'],
          ['Wartet bei Verspätung', 'nächster Zug', 'nein', 'Schalterzeiten', 'ja'],
          ['Skigepäck', 'tragen Sie selbst', 'inklusive', 'Ihr Kofferraum', 'inklusive'],
          ['Gut für Gruppen', 'nein', 'brauchbar', 'ja', 'ja'],
        ],
      ],

      ['h2', 'In einer Minute entschieden'],
      ['p', 'Zählen Sie Personen und Gepäckstücke. Ein bis zwei Personen, leichtes Gepäck, Ziel Innsbruck oder Salzburg: nehmen Sie die Bahn. Ankunft an einem Samstag, großer Skiort, knappes Budget: der Bus lohnt die Prüfung. Die ganze Woche von Tal zu Tal: mieten Sie ein Auto. Ab drei Personen, mit Ski oder bei einer Landung nach Einbruch der Dunkelheit: ein Transfer ist günstiger, als er aussieht, und deutlich weniger Arbeit.'],
      ['p', 'Unsere Preise sind pro Fahrzeug festgelegt und je Strecke veröffentlicht — Sie können diese Rechnung also aufmachen, bevor Sie irgendetwas buchen.'],
    ],

    faqs: [
      ['Gibt es einen direkten Zug vom Flughafen München zu den Skiorten?',
       'Nein. Jede Bahnfahrt beginnt mit der S1 oder S8 zum Münchner Hauptbahnhof, etwa 45 Minuten, und geht von dort weiter. Innsbruck und Salzburg sind dann unkompliziert; die Skiorte erfordern mindestens einmal Umsteigen und meist einen Bus.'],
      ['Wie lange dauert es vom Flughafen München in die Alpen?',
       'Auf der Straße zwischen 1,5 und 4 Stunden, je nach Tal — Salzburg und Kitzbühel sind am nächsten, St. Moritz und Livigno am weitesten. Mit Bahn und Bus sollten Sie 4 bis 6 Stunden bis zur Unterkunft einplanen.'],
      ['Ist ein Transfer günstiger als ein Mietwagen für eine Skiwoche?',
       'Ab drei Personen häufig ja. Ein Mietwagen muss Winterreifen, Vignette, Auslandsgebühren und Parkgebühren für die ganze Woche tragen, während ein Hin- und Rücktransfer aus zwei Festpreisen besteht und sonst nichts.'],
      ['Was passiert, wenn mein Flug Verspätung hat?',
       'Bei einem verfolgten Privattransfer nichts: Der Fahrer richtet sich nach der tatsächlichen Landezeit. Ein Bus ist dann abgefahren, und ein Mietwagenschalter am späten Abend womöglich geschlossen.'],
    ],
  },

  'munich-airport-ski-luggage-arrivals': {
    title: 'Mit Ski am Flughafen München: Terminals, Sperrgepäck und wie lange die Ankunft wirklich dauert',
    description: 'Wo am Flughafen München die Skitaschen herauskommen, der Unterschied ' +
                 'zwischen Ankunft in Terminal 1 und Terminal 2, wo man den Fahrer trifft ' +
                 'und wie viel Zeit Sie einplanen sollten.',
    lede: 'Ski kommen nicht auf dem Gepäckband. Dieses eine Detail erklärt den größten Teil ' +
          'der Verwirrung — und der verlorenen halben Stunden — zu Beginn einer Alpenreise.',
    imageAlt: 'Fahrer lädt Skitaschen vor der Ankunftshalle des Flughafens München in eine Mercedes V-Klasse',

    body: [
      ['p', 'Der Flughafen München (MUC) ist effizient und gut ausgeschildert, aber Skiausrüstung nimmt einen anderen Weg durch ihn als das übrige Gepäck, und die beiden Terminals funktionieren unterschiedlich. Zu wissen, in welche Ankunftshalle Sie laufen, spart mehr Zeit als alles andere, was Sie planen können.'],

      ['h2', 'Terminal 1 oder Terminal 2: bei der Ankunft macht es einen Unterschied'],
      ['p', 'Terminal 2 bedient Lufthansa, Swiss, Austrian und den Rest der Star Alliance sowie Eurowings. Terminal 1 bedient die meisten übrigen Fluggesellschaften, darunter British Airways, easyJet, Ryanair und Wizz Air, und ist in die Module A bis E mit getrennten Ausgängen unterteilt.'],
      ['p', 'In Terminal 2 münden die Ankünfte in eine breite, offensichtliche Halle. In Terminal 1 nicht: Jedes Modul hat seinen eigenen Ausgang, und ein Fahrer, der an Modul D wartet, ist zehn Gehminuten von einem Fahrgast an Modul B entfernt. Wenn Sie abgeholt werden, lohnt es sich, das Modul zu kennen; es steht auf Ihrer Bordkarte.'],
      ['note', 'Beide Terminals sind mit dem zentralen MAC-Forum verbunden, wo S-Bahn, Parkhäuser und die meisten Abholbereiche liegen. Im Zweifel treffen Sie sich am Terminal, nicht am MAC.'],

      ['h2', 'Wo Ski- und Boardtaschen tatsächlich ankommen'],
      ['p', 'Sperr- und Sondergepäck läuft nicht über die normalen Bänder. In München wird es an einem eigenen Sperrgepäckschalter in derselben Gepäckhalle ausgegeben, meist an einem Ende, ausgeschildert als „Sperrgepäck“ oder „Bulky Baggage“.'],
      ['p', 'Zwei praktische Folgen. Erstens sollte jemand aus der Gruppe direkt dorthin gehen, statt dass alle am Band warten. Zweitens ist Sperrgepäck häufig langsamer als die Koffer — 10 bis 25 Minuten nach dem ersten Koffer ist normal, an einem vollen Samstag auch länger.'],
      ['ul', [
        'Prüfen Sie den Sperrgepäckschalter, bevor Sie eine Tasche für verloren halten; das ist der häufigste Fehlalarm überhaupt.',
        'Weiche Skitaschen werden härter behandelt als Hartschalen. Packen Sie die Schuhe nach Möglichkeit separat.',
        'Fotografieren Sie Ihr Gepäck beim Check-in. Das beschleunigt eine Reklamation erheblich, falls doch etwas fehlt.',
      ]],

      ['h2', 'Wie viel Zeit Sie nach der Landung einplanen sollten'],
      ['p', 'Vom Aufsetzen bis zum Stehen draußen mit dem gesamten Gepäck, an einem normalen Wintertag unter der Woche:'],
      ['table',
        ['', 'Ankunft Schengen', 'Ankunft Nicht-Schengen'],
        [
          ['Rollen zur Position, Aussteigen', '10–15 Min.', '10–15 Min.'],
          ['Weg zur Gepäckhalle', '5–10 Min.', '10–15 Min.'],
          ['Passkontrolle', 'entfällt', '15–40 Min.'],
          ['Koffer auf dem Band', '15–25 Min.', '15–25 Min.'],
          ['Skitaschen am Sperrgepäck', '+10–25 Min.', '+10–25 Min.'],
          ['Realistisch insgesamt', '40–60 Min.', '60–95 Min.'],
        ],
      ],
      ['p', 'Samstage im Januar und Februar sind die anstrengendsten der Saison: Die ganzen Alpen wechseln am selben Tag die Gäste, und sowohl die Gepäckhalle als auch die Straßen nach Süden bekommen das zu spüren. Rechnen Sie auf alles Geplante eine halbe Stunde drauf.'],

      ['h2', 'Den Fahrer treffen'],
      ['p', 'Private Fahrer warten in der Ankunftshalle mit einem Namensschild, nach dem Zoll. Das ist die einfachste Variante und die, auf der Sie bestehen sollten — Abholung am Straßenrand bedeutet in München Kurzzeitparkplatz und Telefonat, also genau das, was nach einem 6-Uhr-Flug mit drei Kindern niemand will.'],
      ['p', 'Geben Sie bei der Buchung die Flugnummer an, nicht nur eine Uhrzeit. Ein Fahrer, der mit der Flugnummer arbeitet, sieht die Verspätung, bevor Sie gelandet sind; einer mit einer Uhrzeit sitzt im Parkhaus und rätselt.'],

      ['h2', 'Bevor Sie die Halle verlassen'],
      ['ul', [
        'Kaufen Sie hier die österreichische oder Schweizer Vignette, falls Sie selbst fahren — die Flughafenläden verkaufen sie, und an der ersten Tankstelle hinter der Grenze steht eine Schlange.',
        'Gehen Sie noch einmal auf die Toilette. Der nächste verlässliche Halt ist 90 Minuten entfernt.',
        'Wenn Sie im Ort Ausrüstung leihen, bestätigen Sie jetzt die Abholzeit — bevor Sie in einem Tal ohne Empfang sitzen.',
      ]],
    ],

    faqs: [
      ['Wo kommen die Skitaschen am Flughafen München heraus?',
       'Am separaten Sperrgepäckschalter in derselben Gepäckhalle, ausgeschildert als „Sperrgepäck“ oder „Bulky Baggage“ — nicht auf dem normalen Band. Meist 10 bis 25 Minuten nach den Koffern.'],
      ['Wie lange dauert es, mit Ski durch den Flughafen München zu kommen?',
       'Rechnen Sie bei einer Schengen-Ankunft mit 40 bis 60 Minuten von der Landung bis vor die Tür, bei einer Ankunft von außerhalb des Schengen-Raums mit 60 bis 95 Minuten. An einem Samstag in der Hochsaison eine halbe Stunde mehr.'],
      ['An welchem Terminal komme ich an?',
       'Terminal 2 bei Lufthansa, Swiss, Austrian und Eurowings; Terminal 1 bei den meisten anderen Fluggesellschaften, unterteilt in die Module A bis E. Das Modul steht auf der Bordkarte und sollten Sie Ihrem Fahrer nennen.'],
      ['Wo trifft man den Transferfahrer?',
       'In der Ankunftshalle mit einem Namensschild, nach dem Zoll. Vereinbaren Sie das so und nicht am Straßenrand, und geben Sie Ihre Flugnummer an, damit der Fahrer die Verspätung verfolgen kann.'],
    ],
  },

  'alpine-winter-driving-vignettes-chains': {
    title: 'Im Winter durch die Alpen fahren: Vignetten, Maut, Schneeketten und wann die Pässe schließen',
    description: 'Was Sie rechtlich brauchen, um im Winter von Deutschland nach Österreich, ' +
                 'in die Schweiz und nach Italien zu fahren — Vignetten, Passmaut, Winterreifen- ' +
                 'und Schneekettenpflicht und welche Pässe über die Saison geschlossen sind.',
    lede: 'Drei Länder, drei Regelwerke und ein Bußgeld an der Grenze, wenn man beim ' +
          'billigsten davon danebenliegt. Kompliziert ist nichts davon, aber fast alles ' +
          'davon ist unsichtbar, bis man schon auf der Autobahn steht.',
    imageAlt: 'Von Schneewänden gesäumte Talstraße, die im Hochwinter ins Gebirge führt',

    body: [
      ['p', 'Wenn Sie von München aus selbst in die Alpen fahren, zählen Papiere und Reifen mehr als die Route. Die österreichischen, Schweizer und italienischen Regeln unterscheiden sich von den deutschen und voneinander, und im Winter wird tatsächlich kontrolliert, nicht nur theoretisch.'],

      ['h2', 'Autobahnvignetten: Österreich und die Schweiz'],
      ['p', 'Deutschland hat keine Pkw-Maut. Österreich und die Schweiz haben beide eine, und beide arbeiten mit einer Klebevignette statt mit einer Schranke.'],
      ['ul', [
        'Österreich: Auf jeder Autobahn und Schnellstraße ist eine Vignette Pflicht. Es gibt sie für zehn Tage, zwei Monate und ein Jahr; die digitale Variante ist an das Kennzeichen gebunden.',
        'Schweiz: nur eine Jahresvignette, gültig für das Kalenderjahr plus den Dezember davor und danach. Eine Kurzzeitvariante gibt es nicht, eine einzelne Durchfahrt kostet also den vollen Preis.',
        'Italien: keine Vignette. Die Autobahnen sind an Schranken bemautet — Ticket ziehen, bei der Ausfahrt zahlen.',
      ]],
      ['note', 'Kaufen Sie die österreichische Vignette vor der Grenze — am Flughafen, an einer deutschen Tankstelle oder online. Die digitale muss mindestens 18 Tage vorher gekauft werden, wenn Sie nicht auf die sofortige Gültigkeit verzichten wollen; lassen Sie es also nicht bis zur Auffahrt liegen.'],

      ['h2', 'Maut zusätzlich zur Vignette'],
      ['p', 'Eine österreichische Vignette deckt nicht alles ab. Mehrere Alpenrouten kosten extra, und der Brenner ist der, den die meisten treffen.'],
      ['ul', [
        'Brennerautobahn (A13): eine eigene Maut je Richtung, zusätzlich zur Vignette.',
        'Tauern-, Karawanken- und Arlbergtunnel: jeweils einzeln bemautet.',
        'Italien: Die A22 südlich des Brenners ist eine normale Autostrada mit Ticket.',
        'Schweiz: keine zusätzliche Maut, aber der Autoverlad Vereina ins Engadin kostet pro Fahrzeug.',
      ]],

      ['h2', 'Winterreifen: die Regel, die kein Datum ist'],
      ['p', 'Deutschland und Österreich arbeiten beide mit einer situativen Regel statt einer festen Saison, und das wird regelmäßig falsch verstanden.'],
      ['p', 'In Deutschland sind Winterreifen immer dann Pflicht, wenn winterliche Verhältnisse herrschen — Eis, Schnee, Schneematsch, Reifglätte. Nicht „im Winter“, sondern bei diesen Verhältnissen. Österreich ist strenger: Vom 1. November bis 15. April müssen Pkw bei winterlichen Verhältnissen entweder Winterreifen an allen vier Rädern haben oder Ketten auf der Antriebsachse.'],
      ['p', 'Die Reifen müssen das Alpine-Symbol tragen (Bergpiktogramm mit Schneeflocke). Die ältere M+S-Kennzeichnung allein genügt in beiden Ländern nicht mehr. Ohne sie im Schnee zu fahren riskiert ein Bußgeld — und, teurer, das Interesse Ihrer Versicherung nach einem Schaden.'],

      ['h2', 'Schneeketten'],
      ['p', 'Ketten sind nicht überall und nicht immer vorgeschrieben. Sie sind dort vorgeschrieben, wo ein blaues Schild mit Reifen-und-Ketten-Symbol es sagt, und diese Schilder stehen an bestimmten Tal- und Passstraßen, wenn es die Verhältnisse verlangen.'],
      ['ul', [
        'Führen Sie einen passenden Satz für Ihren Mietwagen mit, wenn Sie über etwa 1.200 m fahren.',
        'Legen Sie sie vor dem Anstieg an, in einer Haltebucht, nicht auf halber Höhe in der Steigung.',
        'Üben Sie es einmal bei Tageslicht. Der erste Versuch im Dunkeln, im Schnee, mit kalten Händen dauert dreimal so lang.',
        'Für Ketten gilt ein Tempolimit, meist 50 km/h. Nehmen Sie sie ab, sobald die Straße frei ist, sonst ruinieren Sie Ketten und Fahrbahn.',
      ]],

      ['h2', 'Welche Pässe schließen, und wann'],
      ['p', 'Hohe Pässe schließen über die Saison. Das ist das Detail, das jeden erwischt, der eine Route nach einer Sommerkarte plant.'],
      ['table',
        ['Pass', 'Status im Winter'],
        [
          ['Brenner (1.370 m)', 'Ganzjährig offen — der niedrigste große Übergang und eine Güterverkehrsader'],
          ['Reschen (1.504 m)', 'Ganzjährig offen, wird mit Priorität geräumt'],
          ['Arlberg-Passstraße (1.793 m)', 'Schließt bei schwerem Wetter; der Tunnel darunter bleibt offen'],
          ['Flexen (nach Lech und Zürs)', 'Schließt für Lawinensprengungen, manchmal für Stunden'],
          ['Timmelsjoch (2.474 m)', 'Etwa von Ende Oktober bis Ende Mai geschlossen'],
          ['Stilfser Joch (2.757 m)', 'Etwa von November bis Ende Mai geschlossen'],
          ['Foscagno (nach Livigno, 2.291 m)', 'Offen, aber hoch, exponiert und zeitweise für die Räumung gesperrt'],
        ],
      ],
      ['p', 'Ein Navigationsgerät schickt Sie im Januar bereitwillig über das Stilfser Joch. Prüfen Sie die nationalen Straßendienste — ASFINAG in Österreich, TCS in der Schweiz — am Morgen der Fahrt, nicht in der Woche davor.'],

      ['h2', 'Eine kurze Liste vor der Abfahrt'],
      ['ul', [
        'Vignette gekauft und angebracht, oder die digitale auf das Kennzeichen registriert.',
        'Winterreifen mit Alpine-Symbol an allen vier Rädern.',
        'Ketten im Kofferraum, und Sie haben sie einmal angelegt.',
        'Reisepass oder Personalausweis für alle — Schengen-Grenzen sind offen, Stichproben gibt es trotzdem.',
        'Voller Tank. Sprit im Skital kostet mehr, und die Tankstellen schließen früh.',
        'Ein Routenplan auf Papier, der nicht davon abhängt, dass ein Pass offen ist.',
      ]],
      ['p', 'Wenn das nach viel Arbeit für eine Fahrt klingt: Genau das ist das ehrliche Argument dafür, gefahren zu werden. All das Obige ist im Transferpreis enthalten, und die Ketten legt jemand anderes an.'],
    ],

    faqs: [
      ['Brauche ich eine Vignette, um von München nach Österreich zu fahren?',
       'Ja, für jede österreichische Autobahn und Schnellstraße. Kaufen Sie sie vor der Grenze — am Flughafen, an einer deutschen Tankstelle oder online. Die digitale Vignette wird auf das Kennzeichen registriert.'],
      ['Sind Winterreifen in Österreich Pflicht?',
       'Vom 1. November bis 15. April muss ein Pkw bei winterlichen Verhältnissen Winterreifen an allen vier Rädern oder Ketten auf der Antriebsachse haben. Die Reifen müssen das Alpine-Symbol tragen; M+S allein reicht nicht mehr.'],
      ['Wann ist das Stilfser Joch gesperrt?',
       'Etwa von November bis Ende Mai. Im Winter ist es nie eine Option, was auch immer Karte oder Navi vorschlagen. Der Reschenpass ist die ganzjährige Alternative in den Vinschgau.'],
      ['Ist der Brenner im Winter offen?',
       'Ja. Mit 1.370 m ist er der niedrigste der großen Alpenübergänge und eine zentrale Güterroute, also wird er durchgehend geräumt. Schwerverkehr verzögert eher als Schnee.'],
      ['Brauche ich zusätzlich zu Winterreifen auch Schneeketten?',
       'Nur dort, wo ein blaues Kettenschild sie vorschreibt — aber führen Sie einen Satz mit, wenn Sie über etwa 1.200 m fahren. Legen Sie sie in einer Haltebucht vor dem Anstieg an und bleiben Sie unter dem Kettentempolimit von 50 km/h.'],
    ],
  },

};
