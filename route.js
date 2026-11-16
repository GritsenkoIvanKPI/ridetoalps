/* ridetoalps — behaviour for the per-route landing pages.
 *
 * The calculator, fleet slider, reviews slider, FAQ accordion and reveal
 * animation are the same components as the homepage. They are duplicated here
 * rather than shared because index.html is live and working, and refactoring
 * its inline script would put that at risk for no benefit on these pages.
 */
(function(){
  'use strict';

  /* ---------- translation runtime ----------
     A localized page injects window.RTA_I18N (generated from i18n/ui.<lang>.mjs)
     before this script runs. On the English page the object is absent, T() is
     the identity and nothing changes — so the source below stays readable and
     there is only ever one copy of each string in the markup.

     F() is the same lookup with {placeholders} filled in, for the sentences
     whose word order differs between languages. */
  var I18N   = window.RTA_I18N || {};
  var LOCALE = window.RTA_LOCALE || 'en-GB';
  function T(s){ return Object.prototype.hasOwnProperty.call(I18N, s) ? I18N[s] : s; }
  function F(s, vars){
    return T(s).replace(/\{(\w+)\}/g, function(_, k){ return vars[k] == null ? '' : vars[k]; });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e, i){
        if (e.isIntersecting) {
          e.target.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('visible'); });
  }

  /* ---------- fleet carousel ---------- */
  (function(){
    var track = document.getElementById('fleetTrack');
    var prev = document.getElementById('fleetPrev');
    var next = document.getElementById('fleetNext');
    var index = 0;
    // routes.html reuses this script but has no fleet slider
    if (!track || !prev || !next) return;

    var viewport = track.parentElement;

    // below 900px the viewport scrolls natively with snap points, which feels
    // better under a thumb than a transform slider; the arrows drive scrollLeft.
    function isNative(){ return window.matchMedia('(max-width:900px)').matches; }
    function perView(){ return isNative() ? 1 : 2; }
    function maxIndex(){ return Math.max(0, track.children.length - perView()); }
    function stepPx(){
      var card = track.children[0];
      if (!card) return 0;
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return card.getBoundingClientRect().width + gap;
    }

    function render(){
      if (!track.children.length) return;
      if (isNative()) {
        track.style.transform = '';
        // scroll-snap parks the last card on its snap point, short of the raw
        // scroll maximum, so measure against the card itself instead.
        var vpLeft = viewport.getBoundingClientRect().left;
        var lastLeft = track.lastElementChild.getBoundingClientRect().left;
        prev.disabled = viewport.scrollLeft < 8;
        next.disabled = (lastLeft - vpLeft) <= 8;
      } else {
        index = Math.min(index, maxIndex());
        track.style.transform = 'translateX(' + (-index * stepPx()) + 'px)';
        prev.disabled = index === 0;
        next.disabled = index >= maxIndex();
      }
    }

    function go(dir){
      if (isNative()) {
        viewport.scrollBy({ left: dir * stepPx(), behavior: 'smooth' });
      } else {
        index = Math.min(maxIndex(), Math.max(0, index + dir));
        render();
      }
    }
    prev.addEventListener('click', function(){ go(-1); });
    next.addEventListener('click', function(){ go(1); });

    var scrollTick;
    viewport.addEventListener('scroll', function(){
      clearTimeout(scrollTick);
      scrollTick = setTimeout(render, 80);
    }, { passive: true });

    window.addEventListener('resize', function(){ index = 0; viewport.scrollLeft = 0; render(); });
    render();

  })();

  /* ---------- reviews slider ----------
     Native scroll with snap points, so a trackpad or thumb swipes it directly
     and the arrows just nudge scrollLeft. One card of nine is on screen at a
     time on a phone instead of a 2,600px stack.
  ------------------------------------------------------------------- */
  (function(){
    var vp = document.getElementById('reviewsTrack');
    var rPrev = document.getElementById('reviewPrev'), rNext = document.getElementById('reviewNext');
    if (!vp || !rPrev || !rNext) return;

    function cardStep(){
      var card = vp.querySelector('.review');
      if (!card) return 0;
      var cs = getComputedStyle(vp);
      var gap = parseFloat(cs.columnGap || cs.gap) || 0;
      return card.getBoundingClientRect().width + gap;
    }
    function sync(){
      var maxScroll = vp.scrollWidth - vp.clientWidth;
      // a route page carries three reviews, which all fit on a wide screen —
      // arrows with nothing to scroll are just noise, so hide the row entirely
      var nav = rPrev.parentElement;
      if (nav) nav.style.display = maxScroll > 8 ? '' : 'none';
      // mandatory snapping can park short of maxScroll, so also treat "last
      // card sitting at the left edge" as the end of the track
      var lastLeft = vp.lastElementChild.getBoundingClientRect().left - vp.getBoundingClientRect().left;
      rPrev.disabled = vp.scrollLeft < 8;
      rNext.disabled = vp.scrollLeft >= maxScroll - 8 || lastLeft <= 8;
    }
    rPrev.addEventListener('click', function(){ vp.scrollBy({ left: -cardStep(), behavior: 'smooth' }); });
    rNext.addEventListener('click', function(){ vp.scrollBy({ left:  cardStep(), behavior: 'smooth' }); });

    var tick;
    vp.addEventListener('scroll', function(){ clearTimeout(tick); tick = setTimeout(sync, 80); }, { passive: true });
    window.addEventListener('resize', function(){ vp.scrollLeft = 0; sync(); });
    sync();
  })();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.qa').forEach(function(qa){
    var btn = qa.querySelector('.qa__q');
    var panel = qa.querySelector('.qa__a');
    btn.addEventListener('click', function(){
      var open = qa.classList.contains('is-open');
      document.querySelectorAll('.qa.is-open').forEach(function(other){
        other.classList.remove('is-open');
        other.querySelector('.qa__a').style.maxHeight = null;
        other.querySelector('.qa__q').setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        qa.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  window.addEventListener('resize', function(){
    var open = document.querySelector('.qa.is-open .qa__a');
    if (open) open.style.maxHeight = open.scrollHeight + 'px';
  });

  /* ---------- price calculator + booking ----------
     Brief rules:
       • fixed route rates are per vehicle, for 1–4 passengers, departing 07:00–22:00
       • departures outside 07:00–22:00, or groups of 5–7, use the 1.7 rate instead
         of the 1.5 rate → a factor of 1.7/1.5 on the fixed rate
       • groups above 7 travel in additional vehicles
     The card appears twice on the page, so every hook is scoped to its own root.
  ------------------------------------------------------------------- */
  var DAY_RATE = 1.5, NIGHT_RATE = 1.7, DEPOSIT = 30, SEATS_PER_CAR = 7;

  /* '€300' in English, '300 €' in German, Russian and Ukrainian. The pattern
     comes from the page, so the rule lives next to the other translations. */
  var MONEY = window.RTA_MONEY || '€{n}';
  function money(n){ return MONEY.replace('{n}', n.toLocaleString(LOCALE)); }

  function carFor(pax){
    // The Mercedes V-Class is the standard vehicle on every booking, whatever
    // the group size. The smaller cars in the fleet are substitutes assigned
    // when needed, not what the quote leads with.
    return pax <= 6 ? 'Mercedes V-Class Lang' : 'Mercedes V-Class Extra Lang';
  }

  function initCalc(root){
    var el = function(name){ return root.querySelector('[data-el="' + name + '"]'); };

    var fromSel = el('from'), toSel = el('to'), dateInp = el('date'),
        timeInp = el('time'), paxSel = el('pax'), swapBtn = el('swap');
    var priceValue = el('price'), priceNote = el('note'), routeLabel = el('route'),
        bdBase = el('base'), bdCars = el('cars'), bdSurcharge = el('surcharge'), bdRest = el('rest');
    var otherRow = el('otherRow'), otherDest = el('otherDest'),
        priceUnit = el('priceUnit'), bookLabel = el('bookLabel');
    var returnBtn = el('returnBtn'), returnRow = el('returnRow'), returnLabel = el('returnLabel'),
        retDate = el('retDate'), retTime = el('retTime'),
        rowReturn = el('rowReturn'), returnPrice = el('returnPrice'), baseLabel = el('baseLabel');

    var reversed = false;
    var hasReturn = false;

    // default the date to tomorrow
    var t = new Date(); t.setDate(t.getDate() + 1);
    dateInp.value = t.toISOString().slice(0, 10);
    dateInp.min = new Date().toISOString().slice(0, 10);

    function calc(){
      var opt  = toSel.options[toSel.selectedIndex];
      // "Other destination" carries no data-price — it is quoted by hand.
      var custom = opt.getAttribute('data-price') === null;
      var base = custom ? 0 : parseInt(opt.getAttribute('data-price'), 10);
      var pax  = parseInt(paxSel.value, 10);
      var cars = Math.max(1, Math.ceil(pax / SEATS_PER_CAR));
      var isBigGroup = pax >= 5;

      otherRow.hidden = !custom;
      bookLabel.textContent = custom ? T('Request a price') : T('Book for €30 or $35');

      // A return is a second transfer, so each leg is priced on its own
      // departure time — an evening flight back can be a night rate even when
      // the outbound was not.
      function leg(timeStr){
        var hour = parseInt((timeStr || '10:00').split(':')[0], 10);
        var night = hour < 7 || hour >= 22;
        var uplift = (night || isBigGroup) ? (NIGHT_RATE / DAY_RATE) : 1;
        return { night: night, price: Math.round((base * uplift * cars) / 5) * 5 };
      }

      var out = leg(timeInp.value);
      var ret = hasReturn ? leg(retTime.value) : null;
      var total = out.price + (ret ? ret.price : 0);

      var typed  = custom ? otherDest.value.trim() : '';
      var endpoint = custom ? (typed || T('Other destination')) : opt.text;
      var origin = reversed ? endpoint : fromSel.options[fromSel.selectedIndex].text;
      var dest   = reversed ? fromSel.options[fromSel.selectedIndex].text : endpoint;
      routeLabel.textContent = origin + (hasReturn ? ' ⇄ ' : ' → ') + dest;

      priceValue.textContent = custom ? T('On request') : money(total);
      priceValue.classList.toggle('price__value--request', custom);
      priceUnit.textContent = custom ? T('we reply within a couple of hours') : T('total, per booking');
      baseLabel.textContent = hasReturn ? T('Outbound journey') : T('Base route rate');
      bdBase.textContent = custom ? T('Quoted by hand')
                                  : (hasReturn ? money(out.price)
                                               : money(base) + (cars > 1 ? ' ' + T('per car') : ''));
      rowReturn.hidden = !hasReturn;
      if (ret) returnPrice.textContent = custom ? T('Quoted by hand') : money(ret.price);
      bdCars.textContent = cars + ' × ' + carFor(cars > 1 ? SEATS_PER_CAR : pax);

      var anyNight = out.night || (ret && ret.night);
      var reasons = [];
      if (out.night && ret && ret.night) reasons.push(T('night departures'));
      else if (out.night) reasons.push(hasReturn ? T('night outbound') : T('night departure'));
      else if (ret && ret.night) reasons.push(T('night return'));
      if (isBigGroup) reasons.push(T('5+ passengers'));
      bdSurcharge.textContent = reasons.length ? T('Applied —') + ' ' + reasons.join(' + ') : T('Not applied');

      priceNote.textContent = (anyNight || isBigGroup ? T('Night / large-group rate') : T('Daytime rate'))
        + ' · ' + cars + ' ' + T(cars > 1 ? 'vehicles' : 'vehicle')
        + (hasReturn ? ' · ' + T('return included') : '');

      bdRest.textContent = custom ? '—' : money(Math.max(0, total - DEPOSIT));
    }

    /* return journey toggle */
    function syncReturnMin(){
      if (dateInp.value) retDate.min = dateInp.value;
      if (retDate.value && dateInp.value && retDate.value < dateInp.value) retDate.value = dateInp.value;
    }

    returnBtn.addEventListener('click', function(){
      hasReturn = !hasReturn;
      returnRow.hidden = !hasReturn;
      returnBtn.setAttribute('aria-pressed', String(hasReturn));
      returnBtn.setAttribute('aria-expanded', String(hasReturn));
      returnLabel.textContent = hasReturn ? T('Remove return journey') : T('Add return journey');
      if (hasReturn) {
        if (!retDate.value) {                       // default to a week later
          var d = new Date(dateInp.value || Date.now());
          d.setDate(d.getDate() + 7);
          retDate.value = d.toISOString().slice(0, 10);
        }
        syncReturnMin();
        retDate.focus();
      }
      calc();
    });

    otherDest.addEventListener('input', calc);

    [retDate, retTime].forEach(function(node){
      node.addEventListener('change', function(){ syncReturnMin(); calc(); });
      node.addEventListener('input', calc);
    });

    [toSel, fromSel, timeInp, paxSel, dateInp].forEach(function(node){
      node.addEventListener('change', function(){ syncReturnMin(); calc(); });
      node.addEventListener('input', calc);
    });

    /* Reversing has to move the selects themselves, not just relabel the quote:
       the From column must always hold the origin. The nodes are reordered
       rather than flipped with CSS order so tab order matches what you see. */
    var routeRow    = fromSel.closest('.calc__row');
    var munichField = fromSel.closest('.field');
    var resortField = toSel.closest('.field');
    var munichLabel = munichField.querySelector('label');
    var resortLabel = resortField.querySelector('label');

    /* T(), not the bare strings: this runs once on init as well as on every
       click, so hard-coded labels here silently overwrote the translated ones
       the page was served with — leaving FROM and TO in English on the German,
       Russian and Ukrainian versions while every other label around them was
       translated. */
    function applyDirection(){
      if (reversed) {
        routeRow.appendChild(munichField);   // resort first, Munich second
        resortLabel.textContent = T('From');
        munichLabel.textContent = T('To');
      } else {
        routeRow.appendChild(resortField);   // Munich first, resort second
        munichLabel.textContent = T('From');
        resortLabel.textContent = T('To');
      }
    }

    swapBtn.addEventListener('click', function(){
      reversed = !reversed;
      applyDirection();
      calc();
    });

    applyDirection();
    calc();

    /* booking */
    var bookBtn = el('bookBtn'), bookingForm = el('form'), bookingOk = el('ok');
    var bkName = el('name'), bkPhone = el('phone'), bkMail = el('mail');

    bookBtn.addEventListener('click', function(){
      bookingForm.classList.add('is-open');
      bookBtn.style.display = 'none';
      bkName.focus();
    });

    /* The endpoint answers {ok:true} or {ok:false, error:'…'}; the bot token never
       leaves the server, so the page only ever sees an error code. */
    var DEPOSIT_LABEL = '€30 or $35';
    var MESSAGES = {
      sending:               T('Sending…'),
      validation_failed:     T('Please check the highlighted fields.'),
      rate_limited:          T('Too many attempts in a row. Please try again later, or message us on WhatsApp.'),
      server_not_configured: T('The form is temporarily unavailable. Please message us on WhatsApp or call.'),
      delivery_failed:       T('We could not send your request. Please message us on WhatsApp or call.'),
      server_error:          T('We could not send your request. Please message us on WhatsApp or call.'),
      method_not_allowed:    T('We could not send your request. Please message us on WhatsApp or call.'),
      network:               T('No connection to the server. Check your internet and try again.')
    };
    var skiSel      = el('ski');
    var trapInput   = el('trap');
    var submitBtn   = bookingForm.querySelector('button[type="submit"]');
    var submitLabel = el('submitLabel');
    var idleLabel   = submitLabel.textContent;
    var FIELDS      = { name: bkName, phone: bkPhone, email: bkMail };

    function showError(message, fields){
      Object.keys(FIELDS).forEach(function(k){ FIELDS[k].classList.remove('is-invalid'); });
      var first = null;
      Object.keys(fields || {}).forEach(function(k){
        if (FIELDS[k]) { FIELDS[k].classList.add('is-invalid'); first = first || FIELDS[k]; }
      });
      bookingOk.textContent = message;
      bookingOk.classList.add('is-open', 'booking__ok--error');
      if (first) first.focus();
    }

    bookingForm.addEventListener('submit', function(e){
      e.preventDefault();
      bookingOk.classList.remove('is-open', 'booking__ok--error');
      Object.keys(FIELDS).forEach(function(k){ FIELDS[k].classList.remove('is-invalid'); });

      var name = bkName.value.trim(), phone = bkPhone.value.trim(), mail = bkMail.value.trim();
      var isCustom = toSel.options[toSel.selectedIndex].getAttribute('data-price') === null;

      submitBtn.disabled = true;
      submitLabel.textContent = MESSAGES.sending;

      // the quote travels with the enquiry, so it arrives already priced
      var body = {
        name: name, phone: phone, email: mail,
        route: routeLabel.textContent,
        date: dateInp.value, time: timeInp.value,
        returnDate: hasReturn ? retDate.value : '',
        returnTime: hasReturn ? retTime.value : '',
        passengers: paxSel.value,
        skiBags: skiSel ? skiSel.options[skiSel.selectedIndex].text : '',
        vehicles: bdCars.textContent,
        price: priceValue.textContent,
        website: trapInput ? trapInput.value : '',
        page: location.pathname
      };

      fetch('send-form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then(function(res){
        return res.json().catch(function(){ return {}; }).then(function(payload){
          return { ok: res.ok, payload: payload };
        });
      }).then(function(r){
        if (r.ok && r.payload.ok) {
          bookingForm.classList.remove('is-open');
          var safe = function(v){ return String(v == null ? '' : v).replace(/[<>&"]/g, ''); };
          var ref  = safe(r.payload.ref);
          var pay  = r.payload.pay_url || '';

          var html = F('Thank you, {name}. We have your request for <b>{route}</b> on {date} at {time}', {
            name: safe(name), route: routeLabel.textContent,
            date: dateInp.value, time: timeInp.value
          })
            + (hasReturn ? F(', returning {date} at {time}', { date: retDate.value, time: retTime.value }) : '')
            + (isCustom
                ? T('. We will price this route and get back to you within a couple of hours.')
                : T('. We will be in touch shortly to confirm.'));

          if (ref) {
            html += '<span class="booking__ref">'
                 +  F('Your reference <b>{ref}</b>', { ref: ref })
                 +  '</span>';
          }

          // Only offered once the price is settled — there is nothing to pay a
          // deposit against while a route is still "on request".
          if (pay && !isCustom) {
            html += '<a class="booking__pay" href="' + pay.replace(/"/g, '&quot;') + '"'
                 +  ' target="_blank" rel="noopener">'
                 +  '<span>' + F('Pay the {amount} deposit', { amount: DEPOSIT_LABEL }) + '</span>'
                 +  '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>'
                 +  '</a>'
                 +  '<span class="booking__payhint">'
                 +  F('Please quote <b>{ref}</b> in the payment note so we can match it to your booking. ' +
                      'Your date is held once the deposit arrives.', { ref: ref })
                 +  '</span>';
          }

          bookingOk.innerHTML = html;
          bookingOk.classList.add('is-open');
          return;
        }
        showError(MESSAGES[r.payload.error] || MESSAGES.delivery_failed, r.payload.fields);
      }).catch(function(){
        showError(MESSAGES.network);
      }).then(function(){
        submitBtn.disabled = false;
        submitLabel.textContent = idleLabel;
      });
    });
  }

  document.querySelectorAll('[data-calc]').forEach(initCalc);


  /* ---------- header navigation ----------
     The burger panel and the Routes dropdown. Both are progressive: the links
     exist in the markup and work without any of this running — this only
     controls when they are on screen. */
  (function(){
    var toggle = document.getElementById('rnavToggle');
    var nav    = document.getElementById('rnav');
    if (!toggle || !nav) return;

    var OPEN  = toggle.getAttribute('data-label-open')  || toggle.getAttribute('aria-label');
    var CLOSE = toggle.getAttribute('data-label-close') || OPEN;

    function setNav(open){
      nav.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? CLOSE : OPEN);
    }
    function closeNav(){ setNav(false); }

    toggle.addEventListener('click', function(e){
      e.stopPropagation();
      setNav(!nav.classList.contains('is-open'));
    });

    // a tap on a link is a navigation, so the panel should not linger
    nav.addEventListener('click', function(e){
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('click', function(e){
      if (!nav.contains(e.target) && !toggle.contains(e.target)) closeNav();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeNav();
    });
    window.addEventListener('resize', function(){
      if (!window.matchMedia('(max-width:900px)').matches) closeNav();
    });

    /* Routes dropdown. Below 900px the button is hidden and the panel is always
       open, so this does nothing there. */
    var menu = nav.querySelector('[data-menu]');
    if (!menu) return;
    var btn = menu.querySelector('.menu__btn');

    function setMenu(open){
      if (open) menu.setAttribute('data-open', ''); else menu.removeAttribute('data-open');
      btn.setAttribute('aria-expanded', String(open));
    }
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      setMenu(!menu.hasAttribute('data-open'));
    });
    document.addEventListener('click', function(e){
      if (!menu.contains(e.target)) setMenu(false);
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') setMenu(false);
    });
    // opening one dropdown closes the other, so they never overlap
    var lang = nav.querySelector('.lang .lang__btn');
    if (lang) lang.addEventListener('click', function(){ setMenu(false); });
    btn.addEventListener('click', function(){
      var box = nav.querySelector('.lang');
      if (box) { box.removeAttribute('data-open'); }
      if (lang) lang.setAttribute('aria-expanded', 'false');
    });
  })();

  /* ---------- language selector ----------
     Only English is active today. The menu is wired so that adding a locale is
     a data change rather than a header rewrite. */
  (function(){
    var box = document.querySelector('.lang');
    if (!box) return;
    var btn = box.querySelector('.lang__btn');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = box.hasAttribute('data-open');
      if (open) box.removeAttribute('data-open'); else box.setAttribute('data-open','');
      btn.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('click', function(){
      box.removeAttribute('data-open');
      btn.setAttribute('aria-expanded','false');
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') { box.removeAttribute('data-open'); btn.setAttribute('aria-expanded','false'); }
    });
  })();

})();
