/* ridetoalps — analytics notice for Google Analytics 4 and Google Tag Manager.
 *
 * This is an OPT-OUT notice, not a consent gate. Consent Mode defaults to
 * granted in the page head, so measurement begins with the first page view and
 * this banner offers a way to stop it. That was the operator's decision of
 * 18 November 2026, taken against the advice that § 25 TDDDG requires consent
 * before anything is stored on a visitor's device.
 *
 * What this file must therefore get right: the wording has to describe what
 * actually happens — the old text promised that nothing loaded until you
 * agreed, which would now be untrue — and "turn off" has to work, both
 * immediately and on every later visit. The decision is stored in
 * localStorage; the head script reads it before the first hit, and this file
 * sends the consent update for the current page.
 */
(function () {
  'use strict';

  var GA4_ID = 'G-39Y7WT9DKR';
  var GTM_ID = 'GTM-TC59WJXP';
  var KEY    = 'rta-consent';   // 'granted' | 'denied'
  // root-absolute: this script also runs from /routes/ and from /de/routes/,
  // where a bare 'datenschutz.html' would resolve against the wrong directory
  var PRIVACY = '/datenschutz.html';

  /* The banner asks for consent, so it has to be readable by the person giving
     it — an English dialogue on the Russian version of the site is not an
     informed choice. The wording is kept here rather than in the page's
     translation blob so that the banner never depends on another file having
     loaded first.

     The privacy notice itself stays German: it is a document under German law,
     and all four versions of the site link to the same copy. */
  var TEXT = {
    en: { body: 'We measure how this site is used with Google Analytics, which sets cookies ' +
                'and sends data to Google. Measurement starts when the page loads. You can ' +
                'turn it off here at any time. More in our ',
          link: 'privacy notice', yes: 'That is fine', no: 'Turn off analytics',
          label: 'Cookies and analytics' },
    de: { body: 'Wir messen mit Google Analytics, wie diese Website genutzt wird; dabei werden ' +
                'Cookies gesetzt und Daten an Google übermittelt. Die Messung beginnt mit dem ' +
                'Laden der Seite. Sie können sie hier jederzeit abschalten. Mehr dazu in unserer ',
          link: 'Datenschutzerklärung', yes: 'Einverstanden', no: 'Analyse abschalten',
          label: 'Cookies und Analyse' },
    ru: { body: 'Мы измеряем, как используется этот сайт, с помощью Google Analytics: ' +
                'устанавливаются файлы cookie и данные передаются в Google. Измерение ' +
                'начинается при загрузке страницы. Вы можете отключить его здесь в любой ' +
                'момент. Подробнее — в нашей ',
          link: 'политике конфиденциальности', yes: 'Хорошо', no: 'Отключить аналитику',
          label: 'Cookie и аналитика' },
    uk: { body: 'Ми вимірюємо, як використовується цей сайт, за допомогою Google Analytics: ' +
                'встановлюються файли cookie й дані передаються до Google. Вимірювання ' +
                'починається під час завантаження сторінки. Ви можете вимкнути його тут ' +
                'будь-коли. Докладніше — у нашій ',
          link: 'політиці конфіденційності', yes: 'Гаразд', no: 'Вимкнути аналітику',
          label: 'Cookie та аналітика' }
  };
  var T = TEXT[(document.documentElement.lang || 'en').slice(0, 2)] || TEXT.en;

  /* ---------- storage, defensive: Safari private mode throws ---------- */
  function read()      { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v)    { try { localStorage.setItem(KEY, v); } catch (e) {} }

  /* ---------- gtag handle ----------
     The <head> snippet already created window.dataLayer, the gtag() shim and
     the denied-by-default consent state. This file only flips it to granted.
  --------------------------------------------------------------------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  /* Declining sends an explicit update rather than relying on the default.
     The state is identical either way, but saying so closes the
     wait_for_update window immediately instead of letting it time out, and it
     puts the visitor's actual decision in the dataLayer where a tag or an
     audit can see it. */
  function deny() {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
  }

  var applied = false;
  function grant() {
    if (applied) return;
    applied = true;
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }

  /* ---------- banner ---------- */
  var CSS =
  '.rta-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;' +
    'max-width:680px;margin:0 auto;padding:20px 22px;border-radius:14px;' +
    'background:#0f1522;color:#dfe6f2;border:1px solid rgba(255,255,255,.12);' +
    'box-shadow:0 24px 60px -18px rgba(4,10,22,.85);' +
    'font-family:"Figtree",Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;' +
    'display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;' +
    'transform:translateY(12px);opacity:0;transition:transform .45s cubic-bezier(.22,1,.36,1),opacity .35s ease}' +
  '.rta-consent.is-in{transform:translateY(0);opacity:1}' +
  '.rta-consent p{margin:0;flex:1 1 320px;min-width:0}' +
  '.rta-consent a{color:#6ba8ff;text-decoration:underline;text-underline-offset:2px}' +
  '.rta-consent__row{display:flex;gap:10px;flex:0 0 auto;flex-wrap:wrap}' +
  '.rta-consent button{font:inherit;cursor:pointer;border-radius:8px;padding:0 20px;' +
    'min-height:44px;border:1px solid transparent;font-weight:500;' +
    'font-family:"Instrument Sans",Helvetica,Arial,sans-serif;' +
    'transition:background-color .2s ease,border-color .2s ease}' +
  '.rta-consent__yes{background:#0e63e4;color:#fff}' +
  '.rta-consent__yes:hover{background:#0a4bb0}' +
  '.rta-consent__no{background:transparent;color:#dfe6f2;border-color:rgba(255,255,255,.26)}' +
  '.rta-consent__no:hover{background:rgba(255,255,255,.08)}' +
  '.rta-consent button:focus-visible{outline:3px solid #6ba8ff;outline-offset:2px}' +
  '@media (max-width:560px){.rta-consent{padding:18px}.rta-consent__row{width:100%}' +
    '.rta-consent__row button{flex:1}}' +
  '@media (prefers-reduced-motion:reduce){.rta-consent{transition:none;transform:none;opacity:1}}';

  var box = null;

  function close() {
    if (!box) return;
    box.classList.remove('is-in');
    var el = box; box = null;
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
  }

  function show() {
    if (box) return;

    if (!document.getElementById('rta-consent-css')) {
      var s = document.createElement('style');
      s.id = 'rta-consent-css';
      s.textContent = CSS;
      document.head.appendChild(s);
    }

    box = document.createElement('div');
    box.className = 'rta-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', T.label);
    box.innerHTML =
      '<p>' + T.body + '<a href="' + PRIVACY + '">' + T.link + '</a>.</p>' +
      '<div class="rta-consent__row">' +
        '<button type="button" class="rta-consent__no">' + T.no + '</button>' +
        '<button type="button" class="rta-consent__yes">' + T.yes + '</button>' +
      '</div>';

    document.body.appendChild(box);
    requestAnimationFrame(function () { box.classList.add('is-in'); });

    box.querySelector('.rta-consent__yes').addEventListener('click', function () {
      write('granted'); grant(); close();
    });
    box.querySelector('.rta-consent__no').addEventListener('click', function () {
      write('denied'); deny(); close();
    });
  }

  /* Withdrawing must be as easy as giving it (Art. 7(3) GDPR), so any element
     with data-consent-reopen clears the choice and brings the banner back. */
  function wireReopen() {
    document.querySelectorAll('[data-consent-reopen]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        write('');
        show();
      });
    });
  }

  function start() {
    var choice = read();
    // The head has already applied the stored decision to the default, so this
    // is belt and braces for the case where localStorage was readable here but
    // not there — and it keeps the dataLayer honest for anything reading it.
    if (choice === 'denied') deny();
    else if (choice === 'granted') grant();
    else show();
    wireReopen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
