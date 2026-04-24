// One-shot script: read raw .svg files from a source folder and emit a typed
// icon map consumable by LineIcon. Every icon is:
//   - normalised to a 24x24 viewBox (non-24 sources are wrapped in a centred
//     <g transform="translate(...) scale(...)">)
//   - stripped of hardcoded stroke/fill colours (both replaced with
//     "currentColor") so the component inherits `color` via CSS
//   - stripped of <defs> and unwrapped from <g clip-path="url(#...)"> since the
//     canvas already clips to the viewBox
//   - stripped of per-element stroke-width / stroke-linecap / stroke-linejoin /
//     stroke-miterlimit (root <svg> sets them uniformly)
//   - attribute names converted to JSX camelCase
//
// Run: node scripts/import-svg-icons.mjs [source-folder]
// Default source: /Users/christian/Desktop/icons

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = process.argv[2] ?? '/Users/christian/Desktop/icons';
const OUT = join(__dirname, '..', 'src', 'design-system', 'components', 'LineIcon', 'generatedIcons.tsx');

// Map SVG hyphenated attribute names to JSX camelCase equivalents.
const ATTR_CAMEL = {
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-opacity': 'strokeOpacity',
  'fill-rule': 'fillRule',
  'fill-opacity': 'fillOpacity',
  'clip-rule': 'clipRule',
  'clip-path': 'clipPath',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'xlink:href': 'xlinkHref',
};

// Manual overrides: slug from the filename-derived kebab → desired public name.
// Apply only after slugify, so the source files can stay untouched.
const NAME_OVERRIDES = {
  check: 'calendar-check',
  'check-1': 'check',
  'default-1': 'keyboard-default',
  'default-3': 'shield-empty',
  'direction-left-1': 'chevron-left',
  'direction-right-1': 'chevron-right',
  'direction-up-1': 'chevron-up',
  'direction-down-1': 'chevron-down',
  'group-1': 'gauge',
  'line-1': 'plus',
  'add-1': 'calendar-add',
};

// Slugs to drop from the final map entirely (applied after slugify, before override).
const NAME_EXCLUDE = new Set(['default-2']);

const slugify = (name) => {
  // Drop everything non-alphanumeric to hyphens, lowercase, collapse, trim.
  const cleaned = name
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');
  return cleaned || 'unnamed';
};

// Parse the opening <svg ...> tag to pull out the viewBox.
const parseViewBox = (raw) => {
  const m = raw.match(/<svg\b[^>]*\bviewBox=["']([^"']+)["']/i);
  return m ? m[1].trim() : '0 0 24 24';
};

// Return everything between <svg ...> and </svg>.
const innerBody = (raw) => {
  const open = raw.indexOf('<svg');
  if (open === -1) return null;
  const openEnd = raw.indexOf('>', open);
  const closeIdx = raw.lastIndexOf('</svg>');
  if (openEnd === -1 || closeIdx === -1) return null;
  return raw.slice(openEnd + 1, closeIdx);
};

// Strip <defs>...</defs> blocks entirely — the source files only use defs for
// clipPaths that match the full viewBox, which is redundant.
const stripDefs = (s) => s.replace(/<defs\b[\s\S]*?<\/defs>/gi, '');

// Unwrap any <g clip-path="url(#...)">...</g> that wraps the whole icon.
const unwrapClipGroups = (s) => {
  let prev;
  do {
    prev = s;
    s = s.replace(/<g\b[^>]*\bclip-path=["']url\(#[^)]+\)["'][^>]*>([\s\S]*?)<\/g>/gi, '$1');
  } while (s !== prev);
  return s;
};

// Replace any hex/named stroke or fill colours with currentColor, preserving
// fill="none", var(...) references (e.g. our inverted-icon backing), and the
// literal "currentColor".
const colourToCurrent = (s) => {
  return s
    .replace(/\sstroke=["'](?!none|currentColor|var\()[^"']+["']/gi, ' stroke="currentColor"')
    .replace(/\sfill=["'](?!none|currentColor|var\()[^"']+["']/gi, ' fill="currentColor"');
};

// "Inverted" icons use a single path with fill-rule="evenodd" and a hex fill
// to draw both the outer shape and inner cutouts. With cutouts transparent,
// the icon shows whatever's behind it — which looks wrong when placed on a
// matching surface. Duplicate these paths: a solid backing in `--bg-primary`
// (contrasts the primary content colour in both light and dark themes) behind
// the evenodd path, so the cutout reveals the backing instead of the parent.
const duplicateInvertedFills = (s) => {
  return s.replace(/<path\s([^>]*?)\/>/g, (match, attrs) => {
    const hasEvenOdd = /\bfill-rule\s*=\s*["']evenodd["']/.test(attrs);
    const hasHexFill = /\bfill\s*=\s*["']#[0-9a-fA-F]+["']/.test(attrs);
    const hasStroke = /\bstroke\s*=/.test(attrs);
    if (!hasEvenOdd || !hasHexFill || hasStroke) return match;
    const dMatch = attrs.match(/\bd\s*=\s*(["'])([^"']+)\1/);
    if (!dMatch) return match;
    const d = dMatch[2];
    // Force stroke="none" on both paths so the svg-root stroke doesn't fill
    // thin cutouts (e.g. the 1.5-unit-wide exclamation bars) and hide them.
    // Replace the hex fill on the foreground too, so colourToCurrent doesn't
    // need to touch it afterwards.
    const backing = `<path d="${d}" fill="var(--bg-primary)" stroke="none" />`;
    const foreground = `<path fill-rule="evenodd" clip-rule="evenodd" d="${d}" fill="currentColor" stroke="none" />`;
    return `${backing}${foreground}`;
  });
};

// Drop parent-controlled stroke attributes from individual elements.
const stripParentAttrs = (s) => {
  for (const prop of ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit']) {
    s = s.replace(new RegExp(`\\s${prop}=["'][^"']*["']`, 'gi'), '');
  }
  return s;
};

// Remove xmlns / xmlns:xlink / xml:space etc. from inner elements — react will
// warn if they appear inside JSX children.
const stripXmlns = (s) => s.replace(/\sxmlns(?::[a-zA-Z]+)?=["'][^"']*["']/gi, '').replace(/\sxml:space=["'][^"']*["']/gi, '');

// Convert hyphenated attribute names to JSX camelCase.
const toCamelAttrs = (s) => {
  return s.replace(/\s([a-zA-Z-:]+)=/g, (m, name) => {
    const camel = ATTR_CAMEL[name];
    return camel ? ` ${camel}=` : m;
  });
};

const normalizeToSquare24 = (viewBox, content) => {
  const [x, y, w, h] = viewBox.split(/\s+/).map(Number);
  const TARGET = 24;
  if (x === 0 && y === 0 && w === TARGET && h === TARGET) {
    return { content, strokeFactor: 1 };
  }
  const scale = TARGET / Math.max(w, h);
  const tx = (TARGET - w * scale) / 2 - x * scale;
  const ty = (TARGET - h * scale) / 2 - y * scale;
  const wrapped = `<g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(4)})">\n      ${content}\n    </g>`;
  return { content: wrapped, strokeFactor: scale };
};

const files = readdirSync(SRC).filter((f) => f.toLowerCase().endsWith('.svg'));
const seen = new Map(); // name -> source filename (for collision reporting)
const entries = [];
const skipped = [];

for (const file of files) {
  const raw = readFileSync(join(SRC, file), 'utf8');
  const base = file.replace(/\.svg$/i, '');
  const rawSlug = slugify(base);

  if (NAME_EXCLUDE.has(rawSlug)) {
    skipped.push({ file, reason: `excluded via NAME_EXCLUDE ("${rawSlug}")` });
    continue;
  }

  const name = NAME_OVERRIDES[rawSlug] ?? rawSlug;

  if (seen.has(name)) {
    skipped.push({ file, reason: `kebab name "${name}" collides with ${seen.get(name)}` });
    continue;
  }

  const viewBox = parseViewBox(raw);
  let inner = innerBody(raw);
  if (inner == null) {
    skipped.push({ file, reason: 'no <svg>...</svg> block' });
    continue;
  }

  inner = stripDefs(inner);
  inner = unwrapClipGroups(inner);
  inner = stripXmlns(inner);
  inner = stripParentAttrs(inner);
  inner = duplicateInvertedFills(inner);
  inner = colourToCurrent(inner);
  inner = toCamelAttrs(inner);
  inner = inner.trim().replace(/\n\s*/g, '\n      ');

  const { content, strokeFactor } = normalizeToSquare24(viewBox, inner);
  entries.push({ name, content, strokeFactor });
  seen.set(name, file);
}

entries.sort((a, b) => a.name.localeCompare(b.name));
const names = entries.map((e) => e.name);

const header = `// AUTO-GENERATED by scripts/import-svg-icons.mjs. Do not edit by hand.
// Source folder: ${SRC}
import type { ReactElement } from 'react';

export const generatedIconNames = ${JSON.stringify(names, null, 2)} as const;

export type GeneratedIconName = (typeof generatedIconNames)[number];

// All icons normalised to a 24x24 canvas. strokeFactor = scale applied to
// content from its original viewBox; LineIcon divides user-requested
// strokeWidth by this so rendered stroke thickness is visually consistent.
export type GeneratedIconDef = { content: ReactElement; strokeFactor: number };

export const generatedIcons: Record<GeneratedIconName, GeneratedIconDef> = {
`;

const body = entries
  .map(
    ({ name, content, strokeFactor }) =>
      `  '${name}': { strokeFactor: ${strokeFactor}, content: (\n    <>\n      ${content}\n    </>\n  ) },`,
  )
  .join('\n');

writeFileSync(OUT, header + body + '\n};\n', 'utf8');

console.log(`Wrote ${entries.length} icons to ${OUT}`);
if (skipped.length) {
  console.log(`Skipped ${skipped.length}:`);
  for (const s of skipped) console.log(`  - ${s.file}: ${s.reason}`);
}
