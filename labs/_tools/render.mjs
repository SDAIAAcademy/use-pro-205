// Draws the picture props of the file pack and writes them as PNG files into labs/files/.
//
//   node labs/_tools/render.mjs          every picture
//   node labs/_tools/render.mjs I4 I5    some pictures
//
// Run by the course author, once, on a computer with Chrome: each picture is an SVG drawn from
// the specs below and photographed by headless Chrome. The PNG files are committed. No model
// draws anything here: these are props that play the part of photographs and generated images.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FILES = path.join(HERE, '..', 'files');
const CHROME = process.env.CHROME || [
  path.join(process.env.PROGRAMFILES || '', 'Google/Chrome/Application/chrome.exe'),
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].find((p) => fs.existsSync(p));

const PHOTO = { sky: '#CFE0EA', wall: '#E7DCC8', wall2: '#D8C9AE', ground: '#BFB39C', ink: '#2A2E35', thobe: '#F4F1EA', abaya: '#23262B', vest: '#1F7A6C', skin: '#C99772', skin2: '#B88563', bag: '#B5793F', door: '#7A5A3C', accent: '#C9772B' };
const ILLUS = { sky: '#DFF3F0', wall: '#FFF4DC', wall2: '#FFE2A8', ground: '#9ED9CF', ink: '#14213D', thobe: '#FFFFFF', abaya: '#3A2F6B', vest: '#0A9C8C', skin: '#F0B58A', skin2: '#E0A070', bag: '#FF8A4C', door: '#14213D', accent: '#FF5A5F' };

const house = (p, x, w = 260) => `<rect x="${x}" y="150" width="${w}" height="280" fill="${p.wall}"/><rect x="${x}" y="150" width="${w}" height="26" fill="${p.wall2}"/>
<rect x="${x + w - 110}" y="250" width="80" height="180" rx="6" fill="${p.door}"/><circle cx="${x + w - 96}" cy="345" r="5" fill="${p.wall2}"/>
<rect x="${x + 30}" y="215" width="70" height="70" fill="${p.sky}" stroke="${p.wall2}" stroke-width="8"/>`;
const ground = (p) => `<rect width="800" height="520" fill="${p.sky}"/><rect y="430" width="800" height="90" fill="${p.ground}"/>`;
// a standing figure: kind 'man' (thobe and ghutra), 'woman' (abaya and scarf), 'vest' adds the volunteer vest
const figure = (p, x, o = {}) => {
  const body = o.kind === 'woman' ? p.abaya : p.thobe, head = o.kind === 'woman' ? p.abaya : '#FFFFFF', skin = o.old ? p.skin2 : p.skin;
  const h = o.h || 230, top = 430 - h;
  return `<g>
  <path d="M${x - 38} 430 L${x - 30} ${top + 70} Q${x} ${top + 40} ${x + 30} ${top + 70} L${x + 38} 430 Z" fill="${body}" stroke="${p.ink}" stroke-width="2.5"/>
  ${o.vest ? `<path d="M${x - 30} ${top + 74} Q${x} ${top + 50} ${x + 30} ${top + 74} L${x + 32} ${top + 160} L${x - 32} ${top + 160} Z" fill="${p.vest}"/><rect x="${x - 6}" y="${top + 96}" width="12" height="12" fill="#fff"/>` : ''}
  <circle cx="${x}" cy="${top + 34}" r="30" fill="${head}" stroke="${p.ink}" stroke-width="2.5"/>
  <ellipse cx="${x}" cy="${top + 38}" rx="19" ry="21" fill="${skin}"/>
  ${o.kind === 'woman' ? '' : `<rect x="${x - 30}" y="${top + 8}" width="60" height="8" rx="3" fill="${p.ink}"/>`}
  ${o.old && o.kind !== 'woman' ? `<path d="M${x - 14} ${top + 50} Q${x} ${top + 66} ${x + 14} ${top + 50}" fill="#EDEDED"/>` : ''}
  ${o.old ? `<line x1="${x + 46}" y1="${top + 120}" x2="${x + 52}" y2="430" stroke="${p.door}" stroke-width="7" stroke-linecap="round"/>` : ''}
  ${o.bags ? `<rect x="${x - 70}" y="${top + 150}" width="36" height="46" rx="5" fill="${p.bag}" stroke="${p.ink}" stroke-width="2"/><rect x="${x + 34}" y="${top + 150}" width="36" height="46" rx="5" fill="${p.bag}" stroke="${p.ink}" stroke-width="2"/>` : ''}
  ${o.tool ? `<rect x="${x + 30}" y="${top + 160}" width="52" height="30" rx="4" fill="${p.accent}" stroke="${p.ink}" stroke-width="2"/><rect x="${x + 46}" y="${top + 150}" width="20" height="10" fill="none" stroke="${p.ink}" stroke-width="3"/>` : ''}
  ${o.shield ? `<path d="M${x + 36} ${top + 120} h34 v26 q-17 20 -34 0 Z" fill="${p.accent}" stroke="${p.ink}" stroke-width="2"/>` : ''}
  </g>`;
};
const box = (p, x, y) => `<rect x="${x}" y="${y}" width="56" height="42" fill="${p.bag}" stroke="${p.ink}" stroke-width="2"/><line x1="${x}" y1="${y + 14}" x2="${x + 56}" y2="${y + 14}" stroke="${p.ink}" stroke-width="2"/>`;
const grain = `<filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .10 0"/></filter><rect width="800" height="520" filter="url(#g)"/><radialGradient id="v" cx="50%" cy="50%" r="75%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".28"/></radialGradient><rect width="800" height="520" fill="url(#v)"/>`;
const badge = `<g><rect x="690" y="446" width="92" height="54" rx="10" fill="#111" opacity=".82"/><text x="736" y="484" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#fff">AI ✦</text></g>`;
const stage = (p) => `<rect x="60" y="150" width="680" height="190" fill="${p.wall}"/><rect x="60" y="150" width="680" height="30" fill="${p.vest}"/><rect x="120" y="200" width="560" height="60" rx="8" fill="#fff" opacity=".8"/><rect x="150" y="222" width="320" height="16" fill="${p.vest}"/>`;

const SCENES = {
  // day 1 pack: a generated illustration and an agency photograph
  pack_m1: (p = ILLUS) => ground(p) + house(p, 440) + figure(p, 330, { vest: true, bags: true }) + figure(p, 610, { old: true, h: 205 }),
  pack_m2: (p = PHOTO) => ground(p) + `<rect x="0" y="210" width="800" height="220" fill="${p.wall2}" opacity=".5"/>` + [150, 290, 430, 570, 690].map((x, i) => figure({ ...p, vest: '#B33A3A' }, x, { vest: true, kind: i % 2 ? 'woman' : 'man', h: 210 + (i % 3) * 10 })).join('') + box(p, 205, 388) + box(p, 480, 388) + box(p, 345, 392) + grain,
  // day 2: the eight pictures
  I1: (p = PHOTO) => ground(p) + house(p, 440) + figure(p, 330, { vest: true, bags: true }) + figure(p, 610, { old: true, h: 205 }) + grain,
  I2: (p = ILLUS) => ground(p) + house(p, 60, 220) + house(p, 520, 220) + figure(p, 330, { vest: true }) + figure(p, 430, { kind: 'woman', vest: true }) + `<path d="M380 130 q-22 -30 0 -44 q22 14 0 44 Z" fill="${p.accent}"/>`,
  I3: (p = PHOTO) => ground(p) + house(p, 380, 330) + figure(p, 300, { kind: 'woman', vest: true, tool: true }) + `<rect x="60" y="200" width="150" height="230" fill="${p.wall}"/>` + grain,
  I4: (p = { ...PHOTO, vest: '#B33A3A', sky: '#C9D3C0', wall2: '#9BAA8C' }) => ground(p) + `<rect x="0" y="210" width="800" height="220" fill="${p.wall2}" opacity=".6"/><path d="M40 210 L160 120 L280 210 Z" fill="#6E8A5B"/><path d="M520 210 L640 110 L770 210 Z" fill="#6E8A5B"/>` + [200, 340, 480, 620].map((x, i) => figure(p, x, { vest: true, kind: i % 2 ? 'woman' : 'man', h: 215 })).join('') + box(p, 250, 388) + box(p, 530, 388) + grain,
  I5: (p = PHOTO) => ground(p) + house(p, 60, 240) + figure(p, 430, { vest: true }) + figure(p, 540, { old: true, h: 205 }) + `<rect x="610" y="360" width="150" height="70" rx="12" fill="#8A9AA8"/><circle cx="640" cy="432" r="16" fill="${p.ink}"/><circle cx="730" cy="432" r="16" fill="${p.ink}"/>` + grain + badge,
  I6: (p = PHOTO) => `<rect width="800" height="520" fill="${p.wall}"/><circle cx="400" cy="250" r="150" fill="${p.abaya}"/><ellipse cx="400" cy="270" rx="96" ry="112" fill="${p.skin2}"/><path d="M350 310 Q400 350 450 310" fill="none" stroke="${p.ink}" stroke-width="5" stroke-linecap="round"/><circle cx="365" cy="250" r="8" fill="${p.ink}"/><circle cx="435" cy="250" r="8" fill="${p.ink}"/><path d="M250 520 Q400 380 550 520 Z" fill="${p.abaya}"/>` + grain,
  I7: (p = PHOTO) => ground(p) + stage(p) + figure(p, 400, { kind: 'woman', vest: true }) + [130, 230, 570, 670].map((x) => `<circle cx="${x}" cy="470" r="34" fill="${p.ink}" opacity=".75"/>`).join('') + grain,
  I8: (p = { ...PHOTO, wall: '#EFE6D2' }) => ground(p) + stage(p) + figure(p, 340, { shield: true, h: 240 }) + figure(p, 470, { kind: 'woman', old: true, h: 200 }) + `<path d="M150 130 l10 22 l24 2 l-18 16 l6 24 l-22 -13 l-22 13 l6 -24 l-18 -16 l24 -2 Z" fill="${p.accent}"/><path d="M650 130 l10 22 l24 2 l-18 16 l6 24 l-22 -13 l-22 13 l6 -24 l-18 -16 l24 -2 Z" fill="${p.accent}"/>` + grain
};
const TARGET = (name) => (name.startsWith('pack_') ? path.join(FILES, name + '.png') : path.join(FILES, 'images', name + '.png'));

if (!CHROME) { console.error('Chrome was not found: set CHROME to its path'); process.exit(2); }
const want = process.argv.slice(2);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pro205-'));
fs.mkdirSync(path.join(FILES, 'images'), { recursive: true });
for (const name of Object.keys(SCENES)) {
  if (want.length && !want.includes(name)) continue;
  const html = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff}svg{display:block}</style><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">${SCENES[name]()}</svg>`;
  const page = path.join(tmp, name + '.html');
  fs.writeFileSync(page, html, 'utf8');
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=800,520', '--user-data-dir=' + path.join(tmp, 'profile'), '--screenshot=' + TARGET(name), pathToFileURL(page).href], { stdio: 'ignore' });
  console.log('drew', name, fs.statSync(TARGET(name)).size, 'bytes');
}
fs.rmSync(tmp, { recursive: true, force: true });
