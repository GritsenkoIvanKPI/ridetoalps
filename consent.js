/* ridetoalps — consent banner for Google Analytics 4 and Google Tag Manager.
 *
 * The tags themselves load from the snippet in <head>, so Google can detect
 * them. What makes that lawful is Consent Mode v2: every storage type starts
 * DENIED, which means GA4 and GTM write no cookies and send no identifiers
 * until this banner flips them to granted.
 *
 * § 25 TDDDG requires consent before anything is stored on or read from a
 * visitor's device, so the denied default is doing the legal work here — it
 * is not decoration. Deleting it, or auto-granting without a click, is what
 * would create exposure.
 *
 * The choice is kept in localStorage rather than a cookie, so declining
 * leaves nothing on the device at all.
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
    en: { body: 'We would like to measure how this site is used, with Google Analytics. ' +
                'That sets cookies and sends data to Google. Nothing is loaded unless you agree. ' +
                'More in our ',
          link: 'privacy notice', yes: 'Accept', no: 'Decline',
          label: 'Cookies and analytics' },
    de: { body: 'Wir würden gern mit Google Analytics messen, wie diese Website genutzt wird. ' +
                'Dabei werden Cookies gesetzt und Daten an Google übermittelt. Ohne Ihre ' +
                'Einwilligung wird nichts geladen. Mehr dazu in unserer ',
          link: 'Datenschutzerklärung', yes: 'Akzeptieren', no: 'Ablehnen',
          label: 'Cookies und Analyse' },
    ru: { body: 'Мы хотели бы измерять, как используется этот сайт, с помощью Google Analytics. ' +
                'Это устанавливает файлы cookie и передаёт данные в Google. Без вашего согласия ' +
                'ничего не загружается. Подробнее — в нашей ',
          link: 'политике конфиденциальности', yes: 'Принять', no: 'Отклонить',
          label: 'Cookie и аналитика' },
    uk: { body: 'Ми хотіли б вимірювати, як використовується цей сайт, за допомогою Google ' +
                'Analytics. Це встановлює файли cookie й передає дані до Google. Без вашої згоди ' +
                'нічого не завантажується. Докладніше — у нашій ',
          link: 'політиці конфіденційності', yes: 'Прийняти', no: 'Відхилити',
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
    if (read() === 'granted') grant();
    else if (read() !== 'denied') show();
    wireReopen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
