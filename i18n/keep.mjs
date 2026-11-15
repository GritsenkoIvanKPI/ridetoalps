/* Strings that are deliberately identical in every language, listed once so
 * the build can tell "left alone on purpose" apart from "nobody translated it".
 *
 * The guest names belong to the people who travelled; transliterating them
 * would invent nine different people per language version.
 */
export const KEEP = [
  'Mark Stevens',
  'Lisa Anderson',
  'Brian Tomlin',
  'Emma Johnson',
  'Jessica Ramirez',
  'Laura Jenkins',
  'Daniel Lee',
  'Kevin Thompson',
  'Chris Palmer',
];

/** KEEP as an identity map, ready to merge into a translation map. */
export const keepMap = () => Object.fromEntries(KEEP.map(s => [s, s]));
