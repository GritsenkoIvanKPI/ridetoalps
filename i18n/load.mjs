/* Loads one language's translation map.
 *
 * A map is assembled from three places, each with a different job:
 *   ui.<lang>.mjs    the chrome and the components every page shares
 *   home.<lang>.mjs  homepage-only content: metadata, reviews, the FAQ
 *   keep.mjs         strings that are identical in every language, on purpose
 *
 * English has no files: it is the source the keys are written in, so its map
 * is empty and localize() is a no-op.
 */
import { keepMap } from './keep.mjs';

const cache = new Map();

export async function loadMap(code) {
  if (code === 'en') return { map: {}, html: [] };
  if (cache.has(code)) return cache.get(code);

  const ui   = (await import(`./ui.${code}.mjs`)).default;
  const home = await import(`./home.${code}.mjs`);

  const entry = {
    map: { ...keepMap(), ...ui, ...home.default },
    html: home.html || [],
  };
  cache.set(code, entry);
  return entry;
}

/** The UI subset, for the window.RTA_I18N blob a localized page carries. */
export async function loadUi(code) {
  if (code === 'en') return {};
  return (await import(`./ui.${code}.mjs`)).default;
}
