/* Translates a finished HTML page by walking it, rather than by running
 * search-and-replace over the raw source.
 *
 * Blind replacement is what breaks here: "About" is a heading, a nav label and
 * part of href="#about"; "To" is a <label> and the start of a dozen sentences.
 * So the page is split into tags and text, and only text nodes plus a short
 * whitelist of attributes are ever touched.
 *
 * <script> and <style> bodies are skipped entirely. The user-facing strings
 * inside the page script go through its own T() runtime, which reads the
 * window.RTA_I18N object this build injects — so there is exactly one copy of
 * each string in the source, and no JavaScript is ever rewritten.
 *
 * Anything that has no translation is collected in `missing`, and the build
 * refuses to write a page with gaps unless it is told otherwise. Silent
 * fallback to English is the one failure mode that would ship unnoticed.
 */

/* Attributes a human reads. `content` is handled separately: only the meta
   tags whose value is prose, never og:url or theme-color. */
const TEXT_ATTRS = ['alt', 'aria-label', 'placeholder', 'title',
                    'data-label-open', 'data-label-close'];

/* Text that carries no language, so asking for a translation would be noise:
   bare numbers and prices, punctuation, the brand, vehicle models, phone
   numbers and e-mail addresses. */
const NOT_TRANSLATABLE = new RegExp('^(?:' + [
  '[\\s\\d.,:;·×€$%+\\-–—/()|©]*',          // punctuation, digits, currency marks
  '&[a-z]+;',                                // a lone entity
  'ridetoalps',
  '(?:EN|DE|RU|UK|MUC)',
  'WhatsApp(?:\\s[+\\d\\s]+)?',
  'PayPal',
  '(?:Mercedes|Peugeot|Skoda|Škoda|Jeep|V250|V-Class)[\\s\\S]*',
  '[\\w.+-]+@[\\w.-]+',                      // e-mail address
  '\\+?[\\d\\s()+-]{6,}',                    // phone number
].join('|') + ')$', 'i');

const SKIP_TAGS = /^(script|style)$/i;

/**
 * @param {string} html   a complete page
 * @param {object} map    English source string → translation
 * @returns {{html:string, missing:string[], used:Set<string>}}
 */
export function localize(html, map) {
  const missing = new Set();
  const used = new Set();

  const t = (raw) => {
    const s = raw.trim();
    if (!s) return null;
    // an explicit translation wins over the "not language" test: "€300" looks
    // like pure punctuation and digits, but German and the Slavic languages
    // put the symbol after the number, so the map gets asked first
    if (Object.prototype.hasOwnProperty.call(map, s)) { used.add(s); return map[s]; }
    if (NOT_TRANSLATABLE.test(s)) return null;
    missing.add(s);
    return null;
  };

  /* Keep the original leading/trailing whitespace: it is significant between
     inline elements, where collapsing it would glue two words together. */
  const sub = (raw, translated) => {
    const lead = raw.match(/^\s*/)[0];
    const tail = raw.match(/\s*$/)[0];
    return lead + translated + tail;
  };

  const out = [];
  // comments and <!DOCTYPE>, then script/style with their whole body (so the
  // body is never mistaken for text), then any single tag
  const re = /<!--[\s\S]*?-->|<!\[[\s\S]*?\]>|<![^>]*>|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<\/?[a-zA-Z][^>]*>/g;
  let last = 0, m;

  while ((m = re.exec(html)) !== null) {
    // --- the text between the previous tag and this one ---
    const text = html.slice(last, m.index);
    if (text) {
      const tr = t(text);
      out.push(tr === null ? text : sub(text, tr));
    }
    last = m.index + m[0].length;

    const tag = m[0];

    // comments, doctype and skipped elements pass through untouched
    if (tag.startsWith('<!') || SKIP_TAGS.test(m[1] || '')) { out.push(tag); continue; }

    out.push(localizeAttrs(tag, t));
  }

  const tail = html.slice(last);
  if (tail) {
    const tr = t(tail);
    out.push(tr === null ? tail : sub(tail, tr));
  }

  return { html: out.join(''), missing: [...missing], used };
}

/** Rewrites the human-readable attributes of one tag. */
function localizeAttrs(tag, t) {
  let s = tag;

  for (const attr of TEXT_ATTRS) {
    s = s.replace(new RegExp(`(\\s${attr}=")([^"]*)(")`, 'gi'), (full, a, val, b) => {
      const tr = t(val);
      return tr === null ? full : a + escapeAttr(tr) + b;
    });
  }

  // <meta name="description"|"twitter:*"> and og:title / og:description /
  // og:image:alt carry prose; every other content="" is a URL, a size or a
  // colour and must survive verbatim.
  if (/^<meta\b/i.test(s) &&
      /(name|property)="(description|og:title|og:description|og:image:alt|twitter:title|twitter:description|twitter:image:alt)"/i.test(s)) {
    s = s.replace(/(\scontent=")([^"]*)(")/i, (full, a, val, b) => {
      const tr = t(val);
      return tr === null ? full : a + escapeAttr(tr) + b;
    });
  }

  // <input value="…"> on a submit button is a label; elsewhere it is data
  if (/^<input\b/i.test(s) && /type="(submit|button|reset)"/i.test(s)) {
    s = s.replace(/(\svalue=")([^"]*)(")/i, (full, a, val, b) => {
      const tr = t(val);
      return tr === null ? full : a + escapeAttr(tr) + b;
    });
  }

  return s;
}

const escapeAttr = (s) => String(s).replace(/"/g, '&quot;');

/**
 * localize() plus the whole-block substitutions a language needs.
 *
 * A block is swapped for an opaque placeholder first, so the walk never sees
 * either the English original (which would be reported as missing) or the
 * finished translation (whose fragments are not keys in the map either). The
 * placeholder is a comment, which the walk passes through untouched.
 *
 * @param {string} html
 * @param {{map: object, html?: [string,string][]}} lang
 */
export function localizePage(html, lang) {
  const blocks = lang.html || [];
  let s = html;

  blocks.forEach(([from], i) => {
    if (!s.includes(from)) {
      throw new Error(`block ${i} not found in the page — the source has drifted:\n  ${from.slice(0, 90)}…`);
    }
    s = s.split(from).join(`<!--i18n:${i}-->`);
  });

  const r = localize(s, lang.map);
  s = r.html;

  blocks.forEach(([, to], i) => { s = s.split(`<!--i18n:${i}-->`).join(to); });

  return { ...r, html: s };
}
