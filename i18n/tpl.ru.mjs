/* The route-page template in Russian. Same keys as tpl.en.mjs.
 *
 * The headings are built with a colon rather than a preposition — «Ваша цена:
 * Кицбюэль», not «Ваша цена до Кицбюэля» — so a place name is always used in
 * the nominative. Otherwise every route would need four declined forms, and
 * indeclinable names such as Больцано and Ливиньо would still break the
 * agreement in half of them.
 */
export default {
  title:   (r) => `${r.h1} — частный трансфер от ${r.price} € | ridetoalps`,
  desc:    (r) => `Частный трансфер от двери до двери из аэропорта Мюнхена: ${r.dest}. ` +
                  `${r.km} км, около ${r.time}. Фиксированная цена от ${r.price} € за автомобиль, ` +
                  `отслеживание рейса и все дорожные сборы включены.`,
  ogTitle: (r) => `${r.h1} — от ${r.price} €`,

  crumbHome:   'Главная',
  crumbRoutes: 'Маршруты',

  priceTo:   (r) => `Ваша цена: ${r.destShort}`,
  checkDest: (r) => `Рассчитать: ${r.destShort}`,
  driveHead: (r) => `Аэропорт Мюнхена — ${r.destShort}, ${r.km} км`,
  aboutDest: (r) => `${r.destShort}: что вас ждёт`,
  covers:    (r) => `Что входит в ${r.price} €`,
  bookSteps: (r) => `${r.destShort} — бронирование в 3 шага`,
  step1:     (r) => `Направление ${r.destShort} уже выбрано выше. Добавьте дату, время и ` +
                    `размер группы — и появится итоговая сумма: фиксированная, за автомобиль.`,
  step2:     () => 'Депозит закрепляет дату. При отмене не позднее чем за 48 часов он ' +
                   'возвращается полностью.',
  step3:     () => 'Мы отслеживаем ваш рейс и встречаем вас в зоне прилёта с табличкой. ' +
                   'Остаток оплачивается после поездки.',
  guests:    (r) => `Отзывы о поездках: ${r.destShort}`,
  questions: (r) => `${r.destShort}: частые вопросы`,
  waFastest: (r) => `Вопросы по маршруту: ${r.destShort}`,
  callNum:   (n) => `Звонок ${n}`,

  hubTitle: 'Все маршруты из аэропорта Мюнхена в Альпы | ridetoalps',
  hubDesc:  'Десять частных трансферных маршрутов с фиксированной ценой из аэропорта ' +
            'Мюнхена в Австрию, Швейцарию и Италию. Цены за автомобиль, время в пути и расстояния.',
  hubH1:    'Куда мы возим из Мюнхена',
  hubLede:  'Десять маршрутов с фиксированной ценой, у каждого своя дорога, время в пути и ' +
            'условия. Цены указаны за автомобиль для четырёх пассажиров при выезде с 07:00 до 22:00.',

  /** В русском знак валюты пишется после числа. */
  dist: (km) => km + ' км',
  money: (n) => n + ' €',

  serviceType: 'Частный трансфер из аэропорта',
  offerDesc:   'Фиксированная цена за автомобиль для 1–4 пассажиров при выезде с 07:00 до 22:00.',
};
