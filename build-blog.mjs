/* Builds the blog — an index page and one page per article, in every language.
 *
 *   node build-blog.mjs
 *
 *   blog.html             English index
 *   blog/<slug>.html      English article
 *   de/blog.html          and the same for ru/ and uk/
 *
 * Both page types have the structure asked for: header, filters, article cards,
 * a calculate-the-fare call to action, footer. An article page puts its own
 * text above that, so a reader who finishes one piece lands on the other
 * articles and then on the price, rather than on nothing.
 *
 * The body of an article is data, not markup: a list of [kind, …] blocks that
 * this file renders. That keeps the prose translatable string by string, the
 * same way route descriptions are, and stops hand-written HTML drifting
 * between four language versions.
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { ARTICLES, CATEGORIES } from './blog.data.mjs';
import { SITE, LANGS, byCode, urlFor } from './i18n/config.mjs';
import { alternates } from './i18n/picker.mjs';
import { header } from './i18n/nav.mjs';
import { languageContext } from './build-routes.mjs';

const home = fs.readFileSync('index.html', 'utf8');
const GTAG = (() => {
  const a = home.indexOf('<!-- Google tag');
  const end = home.indexOf('</script>', home.indexOf('gtag/js?id=', a));
  return home.slice(a, end + '</script>'.length);
})();

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;

/* A card is at most ~420px wide, so the 1200px original is four times more
   image than it can show. */
const CARD_SIZES = '(min-width:1180px) 420px, (min-width:700px) 45vw, 90vw';
const srcset = (base, ext, widths) => widths.map(w => `/${base}-${w}.${ext} ${w}w`).join(', ');

function cardPicture(a, eager) {
  const widths = a.widths || [600, 800, 1200];
  return `<picture>` +
    `<source type="image/avif" sizes="${CARD_SIZES}" srcset="${srcset(a.image, 'avif', widths)}">` +
    `<source type="image/webp" sizes="${CARD_SIZES}" srcset="${srcset(a.image, 'webp', widths)}">` +
    `<img src="/${a.image}-${widths[0]}.jpg" sizes="${CARD_SIZES}" srcset="${srcset(a.image, 'jpg', widths)}" ` +
    `alt="${esc(a.imageAlt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} width="1200" height="800"></picture>`;
}

/** One article's body, from its block list. */
function renderBody(blocks) {
  return blocks.map((block) => {
    const [kind] = block;
    if (kind === 'h2')   return `      <h2>${esc(block[1])}</h2>`;
    if (kind === 'p')    return `      <p>${esc(block[1])}</p>`;
    if (kind === 'note') return `      <div class="rnote">${esc(block[1])}</div>`;
    if (kind === 'ul')   return `      <ul class="article__list">\n` +
                                block[1].map(li => `        <li>${esc(li)}</li>`).join('\n') +
                                `\n      </ul>`;
    if (kind === 'table') {
      const [, head, rows] = block;
      return `      <div class="article__tablewrap">\n        <table class="article__table">\n` +
        `          <thead><tr>${head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>\n` +
        `          <tbody>\n` +
        rows.map(r => `            <tr>${r.map((c, i) =>
          i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('\n') +
        `\n          </tbody>\n        </table>\n      </div>`;
    }
    throw new Error('unknown body block: ' + kind);
  }).join('\n');
}

/* ---------- the pieces both page types share ---------- */

function filters(cats, t) {
  return `    <div class="filters reveal" role="group" aria-label="${esc(t.filterLabel)}">
${cats.map(([key, label], i) =>
  `      <button class="chip${i === 0 ? ' is-on' : ''}" type="button" data-filter="${key}"` +
  `${i === 0 ? ' aria-pressed="true"' : ' aria-pressed="false"'}>${esc(label)}</button>`).join('\n')}
    </div>`;
}

function cards(articles, b, t, { eagerFirst = false, skip = null } = {}) {
  const list = articles.filter(a => a.slug !== skip);
  return `    <div class="posts" id="posts">
${list.map((a, i) => `      <a class="post" href="${b}/blog/${a.slug}.html" data-category="${a.category}">
        <div class="post__media">${cardPicture(a, eagerFirst && i === 0)}</div>
        <div class="post__body">
          <span class="post__cat">${esc(a.categoryLabel)}</span>
          <h2 class="post__title">${esc(a.title)}</h2>
          <p class="post__lede">${esc(a.lede)}</p>
          <div class="post__foot">
            <time datetime="${a.date}">${esc(a.dateLabel)}</time>
            <span>${esc(t.readTime(a.readMins))}</span>
          </div>
        </div>
      </a>`).join('\n')}
    </div>
    <p class="posts__empty" hidden>${esc(t.noArticles)}</p>`;
}

function ctaBlock(b, t) {
  return `<!-- call to action: the price, which is what every article is upstream of -->
<section class="section-spacing--tight">
  <div class="container">
    <div class="cta grain reveal">
      <picture><source srcset="/images/cta.avif" type="image/avif"><source srcset="/images/cta.webp" type="image/webp"><img src="/images/cta.jpg" alt="" loading="lazy" width="1376" height="768"></picture>
      <div class="cta__inner">
        <h2>${esc(t.blogCtaHead)}</h2>
        <p>${esc(t.blogCtaText)}</p>
        <div class="cta__actions">
          <a class="btn" href="${b}/#calculator"><span>${esc(t.blogCtaBtn)}</span><i>${ARROW}</i></a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function shell({ L, url, title, desc, ogImage, ld, main, extraHead = '' }) {
  const { lang, map, ui, t } = L;
  const code = lang.code;
  const blob = code === 'en' ? '' : `<script>
  window.RTA_LOCALE = ${JSON.stringify(lang.intl)};
  window.RTA_MONEY = ${JSON.stringify(t.money(0).replace('0', '{n}'))};
  window.RTA_I18N = ${JSON.stringify(ui)};
</script>
`;
  return `<!DOCTYPE html>
<html lang="${code}">
<head>
<!-- charset first: the declaration must fall inside the first 1024 bytes,
     and the Google tag alone is longer than that -->
<meta charset="utf-8">
<script>document.documentElement.className+=" js";</script>
${GTAG}
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${url(code)}">
${alternates(url)}
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="theme-color" content="#0e63e4">
<meta property="og:type" content="${extraHead ? 'article' : 'website'}">
<meta property="og:site_name" content="ridetoalps">
<meta property="og:locale" content="${lang.locale}">
<meta property="og:url" content="${SITE}${url(code)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}/${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/route.css">
<script src="/consent.js" defer></script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
${extraHead}</head>
<body>

${header({ code, routes: L.routes, map, t, urlFor: () => url(code) })}

<main>
${main}
</main>

${L.foot}

${blob}<script src="/route.js" defer></script>
</body>
</html>
`;
}

/* ---------- the index ---------- */

function indexPage(L, articles, cats) {
  const { lang, t, map } = L;
  const code = lang.code;
  const b = code === 'en' ? '' : '/' + code;
  const url = (c) => urlFor(c, 'blog.html');
  const M = (k) => map[k] || k;

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Blog', '@id': SITE + url(code) + '#blog',
        name: t.blogH1, description: t.blogDesc, inLanguage: lang.intl,
        publisher: { '@id': SITE + '/#business' },
        blogPost: articles.map(a => ({
          '@type': 'BlogPosting',
          headline: a.title,
          datePublished: a.date,
          url: `${SITE}${b}/blog/${a.slug}.html`,
        })) },
      { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.crumbHome, item: SITE + b + '/' },
          { '@type': 'ListItem', position: 2, name: t.blogCrumb } ] },
    ],
  };

  const main = `<section class="section-spacing">
  <div class="container">
    <nav class="crumb" aria-label="${esc(M('Breadcrumb'))}">
      <a href="${b}/">${esc(t.crumbHome)}</a> <span aria-hidden="true">›</span> <span aria-current="page">${esc(t.blogCrumb)}</span>
    </nav>
    <h1 class="head-center" style="margin-bottom:14px">${esc(t.blogH1)}</h1>
    <p class="lede" style="text-align:center;max-width:62ch;margin:0 auto 10px">${esc(t.blogLede)}</p>

${filters(cats, t)}
${cards(articles, b, t, { eagerFirst: true })}
  </div>
</section>

${ctaBlock(b, t)}`;

  return shell({ L, url, title: t.blogTitle, desc: t.blogDesc,
                 ogImage: articles[0].image + '-1200.jpg', ld, main });
}

/* ---------- one article ---------- */

function articlePage(a, L, articles, cats) {
  const { lang, t, map } = L;
  const code = lang.code;
  const b = code === 'en' ? '' : '/' + code;
  const url = (c) => urlFor(c, `blog/${a.slug}.html`);
  const M = (k) => map[k] || k;

  const graph = [
    { '@type': 'BlogPosting',
      '@id': SITE + url(code) + '#article',
      headline: a.title,
      description: a.description,
      inLanguage: lang.intl,
      datePublished: a.date,
      dateModified: a.date,
      image: `${SITE}/${a.image}-1200.jpg`,
      author:    { '@id': SITE + '/#business' },
      publisher: { '@id': SITE + '/#business' },
      mainEntityOfPage: SITE + url(code) },
    { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.crumbHome,  item: SITE + b + '/' },
        { '@type': 'ListItem', position: 2, name: t.blogCrumb,  item: SITE + b + '/blog.html' },
        { '@type': 'ListItem', position: 3, name: a.title } ] },
  ];
  if (a.faqs && a.faqs.length) {
    graph.push({ '@type': 'FAQPage', mainEntity: a.faqs.map(([q, ans]) => ({
      '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } })) });
  }

  const main = `<!-- introduction -->
<article class="article">
  <div class="container">
    <nav class="crumb crumb--left" aria-label="${esc(M('Breadcrumb'))}">
      <a href="${b}/">${esc(t.crumbHome)}</a> <span aria-hidden="true">›</span>
      <a href="${b}/blog.html">${esc(t.blogCrumb)}</a> <span aria-hidden="true">›</span>
      <span aria-current="page">${esc(a.categoryLabel)}</span>
    </nav>

    <header class="article__head">
      <span class="post__cat">${esc(a.categoryLabel)}</span>
      <h1>${esc(a.title)}</h1>
      <p class="article__lede">${esc(a.lede)}</p>
      <div class="article__meta">
        <time datetime="${a.date}">${esc(a.dateLabel)}</time>
        <span>${esc(t.readTime(a.readMins))}</span>
      </div>
    </header>

    <div class="article__media">${cardPicture(a, true)}</div>

    <div class="article__body">
${renderBody(a.body)}
    </div>
${a.faqs && a.faqs.length ? `
    <section class="article__faq" id="faq">
      <h2>${esc(t.articleFaq)}</h2>
      <div class="faq">
        ${a.faqs.map(([q, ans]) => `<div class="qa">
          <button class="qa__q" type="button" aria-expanded="false">${esc(q)}
            <span class="qa__ic"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></span>
          </button>
          <div class="qa__a"><p>${esc(ans)}</p></div>
        </div>`).join('\n        ')}
      </div>
    </section>` : ''}
  </div>
</article>

<!-- filters and the other articles -->
<section class="section-spacing">
  <div class="container">
    <h2 class="head-center reveal" style="margin-bottom:10px">${esc(t.moreArticles)}</h2>
${filters(cats, t)}
${cards(articles, b, t, { skip: a.slug })}
  </div>
</section>

${ctaBlock(b, t)}`;

  return shell({ L, url, title: `${a.title} | ridetoalps`, desc: a.description,
                 ogImage: `${a.image}-1200.jpg`, ld: { '@context': 'https://schema.org', '@graph': graph },
                 main, extraHead: `<meta property="article:published_time" content="${a.date}">\n` });
}

/* ---------- per-language data ---------- */

async function blogFor(code, L) {
  const fmt = new Intl.DateTimeFormat(byCode(code).intl, { year: 'numeric', month: 'long', day: 'numeric' });

  let cats = CATEGORIES, text = null;
  if (code !== 'en') {
    const mod = await import(`./i18n/blog.${code}.mjs`);
    text = mod.default;
    cats = CATEGORIES.map(([key, label]) => {
      if (!mod.categories || !mod.categories[key]) throw new Error(`i18n/blog.${code}.mjs: no label for category "${key}"`);
      return [key, mod.categories[key]];
    });
  }

  const articles = ARTICLES.map((a) => {
    const tr = text ? text[a.slug] : null;
    if (code !== 'en' && !tr) throw new Error(`i18n/blog.${code}.mjs: no entry for ${a.slug}`);
    if (tr) {
      /* A translated body is a whole replacement array, so a missing or
         reordered block drops a section of the article without any error —
         the page just comes out shorter in one language and nobody notices.
         The shape has to match the English block for block. */
      const shape = (blocks) => blocks.map(x =>
        x[0] + (x[0] === 'ul' ? ':' + x[1].length
              : x[0] === 'table' ? ':' + x[1].length + 'x' + x[2].length : '')).join(',');
      if (!tr.body) throw new Error(`i18n/blog.${code}.mjs: ${a.slug} has no body`);
      if (shape(tr.body) !== shape(a.body)) {
        throw new Error(`i18n/blog.${code}.mjs: ${a.slug} body does not match the English structure\n` +
                        `  en: ${shape(a.body)}\n  ${code}: ${shape(tr.body)}`);
      }
      if ((tr.faqs || []).length !== (a.faqs || []).length) {
        throw new Error(`i18n/blog.${code}.mjs: ${a.slug} has ${(tr.faqs || []).length} FAQs, English has ${(a.faqs || []).length}`);
      }
      for (const k of ['title', 'description', 'lede']) {
        if (!tr[k]) throw new Error(`i18n/blog.${code}.mjs: ${a.slug} is missing "${k}"`);
      }
    }
    const merged = { ...a, ...(tr || {}) };
    merged.categoryLabel = cats.find(([k]) => k === a.category)[1];
    merged.dateLabel = fmt.format(new Date(a.date + 'T12:00:00Z'));
    // the widest variant a source photograph could supply
    merged.widths = fs.existsSync(`${a.image}-1200.jpg`) ? [600, 800, 1200] : [600, 800];
    return merged;
  });

  return { articles, cats };
}

export async function buildBlog(code) {
  const L = await languageContext(code);
  const { articles, cats } = await blogFor(code, L);

  const indexOut = code === 'en' ? 'blog.html' : `${code}/blog.html`;
  fs.mkdirSync(path.dirname(indexOut) === '.' ? '.' : path.dirname(indexOut), { recursive: true });
  fs.writeFileSync(indexOut, indexPage(L, articles, cats));

  const dir = code === 'en' ? 'blog' : `${code}/blog`;
  fs.mkdirSync(dir, { recursive: true });
  for (const a of articles) {
    fs.writeFileSync(path.join(dir, `${a.slug}.html`), articlePage(a, L, articles, cats));
  }
  return { indexOut, count: articles.length };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  let total = 0;
  for (const lang of LANGS) {
    if (lang.code !== 'en' && !fs.existsSync(`i18n/blog.${lang.code}.mjs`)) {
      console.log(`${lang.code}: skipped — i18n/blog.${lang.code}.mjs not written yet`);
      continue;
    }
    const r = await buildBlog(lang.code);
    console.log(`${r.indexOut.padEnd(16)} + ${r.count} articles`);
    total += r.count + 1;
  }
  console.log(`\nbuilt ${total} blog pages`);
}
