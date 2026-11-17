/* Runs the reference solution of every lab against the course files.

     node labs/solutions/check.mjs            every lab
     node labs/solutions/check.mjs 1.4 2.2    some labs

   Node 22, no dependencies. Nothing is written to disk and no model is called.
   What runs for real: every figure of every text against the pilot report; every quotation
   against the approved-quotes record; the echo of the brief; the labels, licences and consent
   records of every picture; the parity of the Arabic and English versions fact by fact; each of
   the ten claims recomputed from the report's tables; the decision on each of the eight pictures
   derived from its evidence card and the registers; the rules of the reference workflow card and
   content log.
   What runs against a stand-in: the steps a participant does in a chat assistant. The drafts in
   labs/files/start/ and the replies in standin.json are written by hand with the mistakes a real
   assistant makes. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FILES = path.join(HERE, '..', 'files');
const read = (name) => fs.readFileSync(path.join(FILES, name), 'utf8');
const sol = (name) => fs.readFileSync(path.join(HERE, name), 'utf8');
const KEY = JSON.parse(sol('key.json'));
const STANDIN = JSON.parse(sol('standin.json'));

const text = (html) => html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<span class="tag">[^<]*<\/span>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
/* The inner HTML of the element <div ... id="ID">, nested divs counted. */
function block(html, id) {
  const open = html.search(new RegExp(`<div[^>]*id="${id}"[^>]*>`));
  if (open < 0) throw new Error(`no block with id ${id}`);
  const start = html.indexOf('>', open) + 1;
  const re = /<\/?div\b[^>]*>/g;
  re.lastIndex = start;
  let depth = 1, m;
  while ((m = re.exec(html))) { depth += m[0].startsWith('</') ? -1 : 1; if (depth === 0) return html.slice(start, m.index); }
  throw new Error(`block ${id} is not closed`);
}
function csv(raw) {
  const s = raw.replace(/^﻿/, '');
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (q) { if (ch === '"' && s[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') q = false; else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}
const numbers = (s) => (s.match(/\d+(?:[.,]\d+)*%?/g) || []);
const quotesAr = (s) => (s.match(/«[^«»]{25,}»/g) || []).map((q) => q.slice(1, -1).trim());
const quotesEn = (s) => (s.match(/"[^"]{25,}"/g) || []).map((q) => q.slice(1, -1).trim());
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const pct1 = (a, b) => (Math.round((a / b) * 1000) / 10).toFixed(1);
function equal(actual, expected, what) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${what}: expected ${e}, got ${a}`);
}
const ok = (cond, what) => { if (!cond) throw new Error(what); };

/* ---- the sources, read once */
const REPORT = text(read('pilot_report.html'));
const BRIEF_HTML = read('brief_launch.html');
const BRIEF_FACTS = text(BRIEF_HTML.split('ملاحظات داخلية ليست للنشر')[0]);
const QUOTES_DOC = text(read('approved_quotes.html'));
const STYLE = text(read('style_guide.html'));
const ASSETS = read('asset_register.html');
/* A figure is allowed when the pilot report or the facts of the brief carry it. */
const ALLOWED = new Set([...numbers(REPORT), ...numbers(BRIEF_FACTS)].flatMap((n) => [n, n.replace('%', '')]));
const strayNumbers = (s) => [...new Set(numbers(s).filter((n) => !ALLOWED.has(n) && !ALLOWED.has(n.replace('%', ''))))];
const APPROVED_AR = KEY.quotes.map((q) => q.ar), APPROVED_EN = KEY.quotes.map((q) => q.en);
for (const q of KEY.quotes) { ok(QUOTES_DOC.includes(q.ar), `the approved-quotes record lacks ${q.id}`); ok(QUOTES_DOC.includes(q.en), `the record lacks the English of ${q.id}`); }
const strayQuotes = (s) => quotesAr(s).filter((q) => !APPROVED_AR.includes(q));
const banned = (s) => KEY.banned.filter((b) => s.includes(b));
const assetRow = (name) => { const m = ASSETS.match(new RegExp(`<tr><td>${name}</td>([\\s\\S]*?)</tr>`)); ok(m, `no row for ${name} in the asset register`); return text(m[1]); };

const LABS = {};

LABS['1.1'] = () => {
  const pack = read('content_pack.html');
  const items = ['release', 'post1', 'post2', 'post3'].map((id) => text(block(pack, id)));
  const all = items.join(' ');
  const stray = strayNumbers(all);
  equal(stray.sort(), ['35', '40%', '5,000'], 'figures of the pack that no source carries');
  const sq = strayQuotes(all);
  equal(sq.length, 2, 'quotations of the pack that are not in the approved record');
  ok(sq.some((q) => q.startsWith(KEY.quotes[0].ar) && q.length > KEY.quotes[0].ar.length), 'one stray quotation is the chief executive\'s, lengthened');
  ok(sq.some((q) => !q.includes('جِوار')), 'one stray quotation has no record at all');
  const echoed = KEY.brief_notes.filter((n) => all.includes(n));
  equal(echoed.length, 2, 'internal notes of the brief repeated in the copy');
  ok(strayQuotes(items[3]).length === 0 && strayNumbers(items[3]).length === 0, 'post 3 is the clean item');
  const textFaults = KEY.faults.filter((f) => f.lab === '1.1');
  for (const f of textFaults) ok(all.includes(f.text), `fault ${f.id} is not in the pack as the key quotes it`);
  equal(textFaults.length, 5, 'text faults');
  return `5 text faults found mechanically: figures ${stray.join(' ')}; 2 quotations without a record or changed; 2 internal notes echoed`;
};

LABS['1.2'] = () => {
  const pack = read('content_pack.html');
  const start = csv(read('start/fault_log_text_done.csv'));
  equal(start.filter((r) => r['الخطأ كما وجدته']).length, 5, 'rows filled in the starting fault log');
  const m1 = assetRow('الصورة 1'), m2 = assetRow('الصورة 2'), m3 = assetRow('المقطع الصوتي');
  ok(m1.includes('ولّدها') && m1.endsWith('لا يوجد') && !text(block(pack, 'm1')).includes('مولّدة'), 'picture 1: generated, and neither the register nor the caption labels it');
  ok(m2.includes('عدسة') && m2.includes('تحريري') && text(block(pack, 'm2')).includes('تيم الدغمي'), 'picture 2: an agency picture credited to the staff photographer, on an editorial licence');
  ok(m3.includes('ولّد الصوت') && m3.includes('لا يوجد سجل موافقة') && text(block(pack, 'm3')).includes('بصوت الرئيس التنفيذي'), 'audio: a generated voice of a real person with no consent record');
  const ref = csv(sol('fault_log_reference.csv'));
  equal(ref.length, 8, 'rows of the reference fault log');
  const ruleIds = KEY.rules.map((r) => r.id);
  ref.forEach((r, i) => {
    equal(r['القاعدة'], KEY.faults[i].rule, `rule of fault ${i + 1}`);
    ok(ruleIds.includes(r['القاعدة']) && r['ما يصلحه'] && r['من يملك إصلاحه'] && r['الدليل من المصدر'], `row ${i + 1} is complete`);
  });
  const byRule = {};
  for (const f of KEY.faults) byRule[f.rule] = (byRule[f.rule] || 0) + 1;
  return `8 faults, each with its rule: ${Object.entries(byRule).map(([k, v]) => `${k} x${v}`).join(', ')}; pass mark 6 of 8`;
};

LABS['1.3'] = () => {
  const card = csv(sol('workflow_card_reference.csv'));
  equal(card.map((r) => r['الخطوة']), ['الصياغة', 'التحقق من الحقائق', 'مراجعة الحقوق', 'الاعتماد'], 'the four steps, in order');
  const who = card.map((r) => r['من يؤديها']);
  ok(!who[1].includes(who[0]) && !who[0].includes(who[1].split('،')[0]), 'the checker is not the drafter');
  equal(new Set(who.map((w) => w.split('،')[0])).size, 4, 'four different people');
  ok(who[3] === KEY.workflow_card[3].who && who[3] === 'جويرية الجريّد', 'sign-off is the director of communication, by name');
  ok(card[1]['وضع الذكاء الاصطناعي'].startsWith('دون') && card[0]['وضع الذكاء الاصطناعي'] === 'كامل', 'AI is full in drafting and off in the first pass of the check');
  card.forEach((r) => ok(r['دليل إنجازها في السجل'] && r['لا تبدأ قبل'], `step ${r['الخطوة']} has its proof and its gate`));
  const session = text(read('start/satr_session_drafting.html'));
  ok(session.includes('لا تضف رقمًا أو اقتباسًا ليس في المرفقات') && session.includes('الملاحظات الداخلية في الموجز'), 'the recorded session states what was given and what was kept out');
  const v1 = text(read('start/release_ar_v1.html'));
  ok(KEY.brief_notes.every((n) => !v1.includes(n)), 'the draft carries none of the brief\'s internal notes');
  const log = csv(read('start/content_log_drafting_done.csv')).filter((r) => r['الخطوة']);
  ok(log.length === 2 && log.every((r) => r['الخطوة'] === 'الصياغة' && r['وضع الذكاء الاصطناعي'] === 'كامل'), 'two drafting rows are logged');
  return 'reference card: 4 steps, 4 people, checker is not the drafter, sign-off by name; drafting session logged in 2 rows';
};

LABS['1.4'] = () => {
  const v1html = read('start/release_ar_v1.html'), finalHtml = read('release_ar_final.html');
  const body = (h) => text(h.split('للاستفسار')[0]);
  const v1 = body(v1html), fin = body(finalHtml);
  const found = { figures: strayNumbers(v1), quotes: strayQuotes(v1), voice: banned(v1), label: !/مولّدة بالذكاء الاصطناعي/.test(v1) };
  equal(found.figures.sort(), ['3,500', '87.6%'], 'figures of the first draft that the report does not carry');
  equal(found.quotes.length, 1, 'quotations of the first draft that differ from the record');
  equal(found.voice, ['الأولى من نوعها'], 'phrases the style guide bans');
  ok(found.label, 'the generated picture of the first draft has no label');
  equal(found.figures.length + found.quotes.length + found.voice.length + 1, KEY.v1_issues.length, 'issues of the first draft');
  equal(strayNumbers(fin), [], 'stray figures in the final release');
  equal(strayQuotes(fin), [], 'unchecked quotations in the final release');
  equal(banned(fin), [], 'banned phrases in the final release');
  ok(fin.includes(KEY.labels.generated.ar), 'the final caption carries the label');
  equal(quotesAr(fin), APPROVED_AR, 'the two quotations of the final release, word for word');
  ok(assetRow('الصورة 1').includes('LR-031'), 'the picture\'s licence is on record');
  const log = csv(sol('content_log_reference.csv'));
  equal(log.length, 8, 'rows of the reference content log');
  const errors = log.reduce((s, r) => s + Number(r['أخطاء مكتشفة'] || 0), 0);
  equal(errors, KEY.v1_issues.length, 'errors caught before sign-off, summed over the log');
  const last = log[log.length - 1];
  ok(last['الخطوة'] === 'الاعتماد' && last['من'] === 'جويرية الجريّد' && last['الحالة'] === 'معتمد', 'the last row is the named sign-off');
  ok(/اقتباسات غير متحقق منها: 0/.test(last['ما حدث']) && /عناصر اصطناعية غير موسومة: 0/.test(last['ما حدث']), 'the sign-off row states both counters at zero');
  ok(log.slice(0, -1).some((r) => r['الخطوة'] === 'مراجعة الحقوق') && log.filter((r) => r['الخطوة'] === 'التحقق من الحقائق').length >= 3, 'check and rights rows come before the sign-off');
  const drafter = log[0]['من'];
  ok(log.filter((r) => r['الخطوة'] === 'التحقق من الحقائق').every((r) => r['من'] !== drafter), 'nobody checks what they drafted');
  const minutes = log.reduce((s, r) => s + Number(r['الدقائق'] || 0), 0);
  const checkMinutes = log.filter((r) => r['الخطوة'] !== 'الصياغة' && r['الخطوة'] !== 'الاعتماد').reduce((s, r) => s + Number(r['الدقائق'] || 0), 0);
  const second = STANDIN.lab14_second_check;
  equal(second.map((s) => s.truth), ['صحيح', 'صحيح', 'إنذار كاذب', 'خطأ فائت'], 'the stand-in second check');
  ok(v1.includes('87.6%') && second[3].says.includes('87.6%'), 'the stand-in passes the transposed percentage');
  return `first draft: 5 issues (figures ${found.figures.join(' ')}, 1 quotation, 1 banned phrase, 1 missing label); final: 0 stray figures, 0 unchecked quotations, 0 unlabelled synthetic items; log: ${minutes} minutes, ${checkMinutes} of them checking and rights, ${errors} errors before sign-off, 0 corrections after; stand-in second check caught 2, missed 1, 1 false alarm`;
};

/* ---- parity: every fact an item must carry is in both versions */
const FACT = Object.fromEntries(KEY.facts.map((f) => [f.id, f]));
const missing = (txt, item, lang) => KEY.item_facts[item].filter((id) => !FACT[id][lang].every((s) => txt.includes(s)));
const numSet = (s) => [...new Set(numbers(s).map((n) => n.replace(/%$/, '')))].sort();
const arItems = () => {
  const posts = read('posts_ar.html');
  return { release: text(read('release_ar_final.html').split('<h2>الصورة المرافقة</h2>')[0]), post1: text(block(posts, 'post1')), post2: text(block(posts, 'post2')), post3: text(block(posts, 'post3')) };
};
const enItems = (html) => ({ release: text(block(html, 'release').split('<p id="caption">')[0]), post1: text(block(html, 'post1')), post2: text(block(html, 'post2')), post3: text(block(html, 'post3')) });

LABS['2.1'] = () => {
  const ar = arItems().release, en = enItems(sol('english_reference.html')).release;
  equal(missing(ar, 'release', 'ar'), [], 'facts missing from the Arabic release');
  equal(missing(en, 'release', 'en'), [], 'facts missing from the reference English release');
  equal(numSet(en), numSet(ar), 'the figures of the two releases');
  const sheet = csv(sol('fact_sheet_reference.csv'));
  equal(sheet.length, KEY.facts.length, 'rows of the reference fact sheet');
  sheet.forEach((r) => ok(r['القيمة بالعربية'] && r['القيمة بالإنجليزية'] && r['المصدر'], `fact ${r['الرقم']} has both values and a source`));
  const glossary = csv(read('glossary.csv'));
  for (const g of glossary.filter((r) => /مدينة|الرئيس التنفيذي|متطوع من أبها|لا يُترجم|الاسم الكامل/.test(r['ملاحظة']))) ok(en.includes(g['English']), `the English release writes "${g['English']}" as the glossary does`);
  ok(/\bmedian\b/.test(en) && !/\baverage\b/.test(en), 'the median stays a median');
  equal(quotesEn(en), APPROVED_EN, 'the two English quotations, word for word from the record');
  const draft = enItems(read('start/english_drafts.html')).release;
  equal(missing(draft, 'release', 'en'), ['ح06', 'ح11', 'ح17'], 'facts the prepared English draft of the release gets wrong');
  return `fact sheet of ${sheet.length} facts; the reference English release carries all of them and the same ${numSet(ar).length} figures; the prepared draft misses 3`;
};

LABS['2.2'] = () => {
  const ar = arItems(), draft = enItems(read('start/english_drafts.html')), ref = enItems(sol('english_reference.html'));
  const found = [];
  for (const item of Object.keys(KEY.item_facts)) {
    equal(missing(ar[item], item, 'ar'), [], `facts missing from the Arabic ${item}`);
    equal(missing(ref[item], item, 'en'), [], `facts missing from the reference English ${item}`);
    for (const id of missing(draft[item], item, 'en')) found.push(`${item}:${id}`);
  }
  equal(found.sort(), KEY.en_mismatches.map((m) => `${m.item}:${m.fact}`).sort(), 'the mismatches of the English drafts');
  for (const m of KEY.en_mismatches) ok(draft[m.item].includes(m.to) && ref[m.item].includes(m.from), `mismatch ${m.id} is planted as the key says`);
  const sheet = csv(sol('parity_check_reference.csv'));
  equal(sheet.length, 6, 'rows of the reference parity sheet');
  const figureDiffs = Object.keys(ar).filter((k) => JSON.stringify(numSet(ar[k])) !== JSON.stringify(numSet(draft[k])));
  equal(figureDiffs, ['release', 'post1'], 'items whose figures alone already differ');
  for (const k of Object.keys(ar)) equal(numSet(ref[k]), numSet(ar[k]), `figures of the reference ${k}`);
  const all = Object.values(draft).join(' ').toLowerCase(), allRef = Object.values(ref).join(' ').toLowerCase();
  equal(KEY.banned_en.filter((b) => all.includes(b)), ['revolutionary'], 'banned words in the English drafts');
  equal(KEY.banned_en.filter((b) => allRef.includes(b)), [], 'banned words in the reference English');
  equal(KEY.en_voice.map((v) => v.decision), ['يُصحَّح', 'يُقبل'], 'the two voice differences');
  equal(STANDIN.lab22_tutor.filter((t) => /\?|؟/.test(t)).length, 4, 'the stand-in tutor asks, it does not correct');
  return `6 planted mismatches found by the fact-by-fact check (${found.join(' ')}); comparing figures alone finds only ${figureDiffs.length} items; after correction 0 remain; 1 voice difference corrected, 1 accepted`;
};

LABS['2.3'] = () => {
  const P = KEY.pilot, claims = Object.fromEntries(KEY.claims.map((c) => [c.id, c]));
  const pack = text(read('claims_pack.html'));
  for (const c of KEY.claims) ok(pack.includes(c.text), `claim ${c.id} is in the pack`);
  const verdict = {};
  const says = (id, n) => claims[id].text.includes(n);
  verdict['د01'] = says('د01', pct1(P.completed, P.requests) + '%') ? 'يُنشر' : 'يُصحَّح';
  verdict['د02'] = says('د02', pct1(KEY.types[0].requests, P.requests) + '%') ? 'يُنشر' : 'يُصحَّح';
  verdict['د03'] = P.survey.replies === P.beneficiaries ? 'يُنشر' : 'يُصحَّح';
  verdict['د04'] = says('د04', pct1(P.active, P.registered) + '%') ? 'يُنشر' : 'يُصحَّح';
  const best = [...KEY.cities].sort((a, b) => b.completed / b.requests - a.completed / a.requests)[0];
  verdict['د05'] = says('د05', best.ar) ? 'يُنشر' : 'يُصحَّح';
  const q6 = quotesAr(claims['د06'].text)[0];
  verdict['د06'] = q6 === KEY.quotes[0].ar && claims['د06'].text.includes('مثنى') ? 'يُنشر' : (APPROVED_AR.includes(q6) ? 'يُصحَّح' : 'يُحذف');
  const q7 = quotesAr(claims['د07'].text)[0];
  verdict['د07'] = q7 === KEY.quotes[1].ar && claims['د07'].text.includes('براء') ? 'يُنشر' : 'يُصحَّح';
  ok(REPORT.includes('مستعدون') && text(read('news_item.html')).includes('يتطوعون'), 'the survey says willing, the news item says volunteer');
  equal(pct1(KEY.readiness.willing, KEY.readiness.adults), '24.0', 'the readiness survey percentage');
  verdict['د08'] = claims['د08'].text.includes('مستعدون') ? 'يُنشر' : 'يُصحَّح';
  verdict['د09'] = APPROVED_AR.some((q) => claims['د09'].text.includes(q)) ? 'يُنشر' : 'يُحذف';
  const lastMonth = KEY.months[KEY.months.length - 1].median;
  verdict['د10'] = says('د10', `إلى ${lastMonth} ساعة`) ? 'يُنشر' : 'يُصحَّح';
  for (const c of KEY.claims) equal(verdict[c.id], c.verdict, `verdict on ${c.id}`);
  for (const c of KEY.claims.filter((x) => x.fix)) {
    const derived = new Set(KEY.cities.map((x) => pct1(x.completed, x.requests) + '%'));
    equal(strayNumbers(c.fix.replace('24%', '24.0%')).filter((n) => !derived.has(n)), [], `figures of the corrected ${c.id}`);
    equal(strayQuotes(c.fix), [], `quotation of the corrected ${c.id}`);
  }
  const ref = csv(sol('factcheck_log_reference.csv')).filter((r) => r['المعرّف'].startsWith('د'));
  ref.forEach((r, i) => { equal(r['القرار'], KEY.claims[i].verdict, `reference verdict ${r['المعرّف']}`); ok(r['المصدر الأصلي'] && r['ما وجدته'], `row ${r['المعرّف']} names its primary source`); });
  const tally = {};
  for (const v of Object.values(verdict)) tally[v] = (tally[v] || 0) + 1;
  const rates = KEY.cities.map((c) => `${c.en} ${pct1(c.completed, c.requests)}%`).join(', ');
  return `10 claims recomputed: publish ${tally['يُنشر']}, correct ${tally['يُصحَّح']}, remove ${tally['يُحذف']}; completion by city: ${rates}; last month median ${lastMonth} h against ${P.medianHours} h for the whole pilot`;
};

LABS['2.4'] = () => {
  const cards = read('image_cards.html');
  const records = Object.fromEntries(KEY.records.map((r) => [r.id, r]));
  const register = text(read('consent_register.html'));
  for (const r of KEY.records) ok(register.includes(r.id) && register.includes(r.scope), `record ${r.id} is in the register`);
  const start = csv(read('start/factcheck_log_claims_done.csv'));
  ok(start.filter((r) => r['المعرّف'].startsWith('د')).every((r) => r['القرار']) && start.filter((r) => r['المعرّف'].startsWith('ص')).every((r) => !r['القرار']), 'the starting log has the claims done and the pictures open');
  const derived = [];
  for (const m of KEY.images) {
    const png = fs.readFileSync(path.join(FILES, 'images', m.file));
    ok(png.subarray(1, 4).toString() === 'PNG', `${m.file} is a PNG file`);
    const card = text(block(cards, m.file.replace('.png', '')));
    for (const part of [m.inspector, m.reverse, m.supplier, m.claim]) ok(card.includes(part), `the card of ${m.id} carries its evidence`);
    const generated = /وسائط مولّدة بخوارزمية/.test(m.inspector) || /ولّد/.test(m.supplier);
    const edited = /تعديل مسجّل/.test(m.inspector);
    const origin = generated ? 'مولّدة' : edited ? 'معدّلة' : 'ملتقطة';
    const label = origin === 'مولّدة' ? KEY.labels.generated.ar : origin === 'معدّلة' ? KEY.labels.edited.ar : 'لا وسم';
    const recs = m.records.map((id) => { ok(records[id], `record ${id} exists`); return records[id]; });
    const earlier = /أقدمها/.test(m.reverse);
    const consents = recs.filter((r) => r.type === 'موافقة'), licences = recs.filter((r) => r.type === 'ترخيص');
    const campaign = (r) => /الحملة العامة|الاتصال العام/.test(r.scope);
    let decision;
    if (earlier) decision = 'رفض';
    else if (origin === 'مولّدة') decision = licences.some(campaign) && /رسم توضيحي/.test(m.claim) ? 'نشر بوسم' : 'رفض';
    else if (!consents.length) decision = 'إيقاف';
    else if (!consents.every(campaign)) decision = 'إيقاف';
    else decision = origin === 'معدّلة' ? 'نشر بوسم' : 'نشر';
    equal([origin, label, decision], [m.origin, m.label, m.decision], `origin, label and decision of ${m.id}`);
    derived.push({ id: m.id, origin, label, decision });
  }
  const ref = csv(sol('factcheck_log_reference.csv')).filter((r) => r['المعرّف'].startsWith('ص'));
  ref.forEach((r, i) => equal([r['المنشأ'], r['الوسم المطلوب'], r['القرار']], [derived[i].origin, derived[i].label, derived[i].decision], `reference row ${r['المعرّف']}`));
  const published = derived.filter((d) => d.decision.startsWith('نشر'));
  const unlabelled = published.filter((d) => d.origin !== 'ملتقطة' && d.label === 'لا وسم').length;
  equal(unlabelled, 0, 'unlabelled synthetic items among the published');
  const tally = {}, origins = {};
  for (const d of derived) { tally[d.decision] = (tally[d.decision] || 0) + 1; origins[d.origin] = (origins[d.origin] || 0) + 1; }
  ok(/غير موجودة/.test(KEY.images[5].inspector) && KEY.images[5].origin === 'مولّدة', 'picture 6: no credentials and still generated');
  ok(/شارة/.test(KEY.images[4].inspector) && KEY.images[4].origin === 'ملتقطة', 'picture 5: a badge and still captured');
  return `8 pictures: captured ${origins['ملتقطة']}, generated ${origins['مولّدة']}, edited ${origins['معدّلة']}; publish ${tally['نشر']}, publish with a label ${tally['نشر بوسم']}, hold ${tally['إيقاف']}, reject ${tally['رفض']}; unlabelled synthetic items among the published: 0`;
};

const want = process.argv.slice(2);
let failed = 0;
for (const id of Object.keys(LABS)) {
  if (want.length && !want.includes(id)) continue;
  try { console.log(`lab ${id}: ${LABS[id]()}\nlab ${id}: PASS`); }
  catch (e) { failed++; console.log(`lab ${id}: FAIL: ${e.message}`); }
}
if (failed) { console.log(`${failed} lab(s) failed`); process.exit(1); }
console.log('all labs: PASS');
