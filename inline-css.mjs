/* route.css, inlined into the <head> of every generated page.
 *
 * Why inline rather than link: the hand-written homepage has always carried
 * its CSS inline and the generated pages fetched route.css instead, and that
 * one difference was the largest single cost on a route page. The host speaks
 * HTTP/1.1, so the stylesheet cannot be multiplexed alongside the document —
 * it is a separate round trip that blocks the first paint, and the hero image
 * cannot start decoding until it resolves.
 *
 * Measured on localhost with the mobile profile (4x CPU, Slow 4G, median of
 * three passes), on /routes/kitzbuehel.html:
 *
 *            linked route.css     inlined
 *   FCP          1.84 s            1.26 s
 *   LCP          2.48 s            1.65 s
 *   Performance    96                99
 *
 * The cost is about 12 KB gzipped added to each page, and the loss of a shared
 * cache entry between pages. That is the right trade here: these are search
 * landing pages, so the common visit is a first visit from Google on a phone,
 * and that visit is exactly what the numbers above measure.
 *
 * route.css stays on disk as the single source of truth — every builder reads
 * it through this module, so there is still only one copy to edit.
 */
import fs from 'fs';

const css = fs.readFileSync(new URL('./route.css', import.meta.url), 'utf8');

/** The <style> element to drop in where the stylesheet <link> used to be. */
export const styleTag = `<style>\n${css}</style>`;
