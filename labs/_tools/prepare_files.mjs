/* Writes the file pack of the course into labs/files/ and the key and reference sheets into
   labs/solutions/. Node 22, no dependencies, no randomness: the same bytes on every run.
   The pictures are drawn by render.mjs (once, with Chrome) and committed; this file does not
   touch them.   Run from anywhere:  node labs/_tools/prepare_files.mjs */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as W from './world.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FILES = path.join(HERE, '..', 'files');
const SOL = path.join(HERE, '..', 'solutions');
for (const d of [FILES, path.join(FILES, 'start'), path.join(FILES, 'images'), SOL]) fs.mkdirSync(d, { recursive: true });
const put = (dir, name, text) => fs.writeFileSync(path.join(dir, name), text.replace(/\r\n/g, '\n'), 'utf8');
const write = (name, text) => put(FILES, name, text);
const solve = (name, text) => put(SOL, name, text);
const { fmt, pct1, PILOT: P, LAUNCH: L, PEOPLE: H } = W;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const STYLE = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: "IBM Plex Sans Arabic", "Segoe UI", Tahoma, sans-serif; background: #f6f4ef; color: #1c2330; line-height: 1.8; }
  main { max-width: 820px; margin: 0 auto; padding: 18px 16px 48px; }
  .doc { background: #fff; border: 1px solid #d9d5cb; border-radius: 12px; padding: 20px 22px; }
  .kicker { color: #0a7c72; font-weight: 700; font-size: .9rem; }
  h1 { margin: 2px 0 10px; font-size: 1.45rem; color: #14213d; }
  h2 { margin: 18px 0 6px; font-size: 1.08rem; color: #14213d; }
  h3 { margin: 12px 0 4px; font-size: 1rem; color: #14213d; }
  p { margin: 6px 0; }
  ul, ol { margin: 6px 0; padding-inline-start: 22px; }
  .scroll { overflow-x: auto; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: .95rem; }
  th, td { border: 1px solid #d9d5cb; padding: 7px 9px; text-align: start; vertical-align: top; }
  th { background: #eef1f6; }
  td.num, th.num { text-align: end; }
  td.fill { background: #fffbe8; height: 3em; min-width: 7em; }
  .note { color: #5b6270; font-size: .9rem; border-top: 1px solid #d9d5cb; margin-top: 16px; padding-top: 8px; }
  .item { border: 1px solid #c9ced8; border-radius: 10px; padding: 12px 16px; margin: 10px 0 18px; background: #fbfcfe; }
  .item h3 { margin-top: 0; }
  .internal { border-inline-start: 5px solid #c0392b; background: #fdf0ee; padding: 8px 12px; border-radius: 8px; }
  .tag { display: inline-block; background: #14213d; color: #fff; border-radius: 999px; padding: 0 10px; font-size: .82rem; }
  .ltr { direction: ltr; unicode-bidi: isolate; display: inline-block; }
  img { max-width: 100%; height: auto; border: 1px solid #d9d5cb; border-radius: 8px; }
  .en { direction: ltr; text-align: left; font-family: "IBM Plex Sans", "Segoe UI", sans-serif; }
`;
function doc(title, kicker, body, lang = 'ar') {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>${STYLE}</style>
</head>
<body>
<main>
<div class="doc">
<div class="kicker">${esc(kicker)}</div>
<h1>${esc(title)}</h1>
${body}
<p class="note">${lang === 'ar' ? 'هيئة عَضُد الوطنية للعمل التطوعي جهة افتراضية. كل الأسماء والأرقام والاقتباسات في هذا الملف مختلقة لأغراض التدريب.' : 'The Adud National Volunteering Authority is fictional. Every name, figure and quotation in this file is invented for training.'}</p>
</div>
</main>
</body>
</html>
`;
}
const table = (head, rows, cls = []) => `<div class="scroll"><table>
<tr>${head.map((h, i) => `<th${cls[i] ? ` class="${cls[i]}"` : ''}>${h}</th>`).join('')}</tr>
${rows.map((r) => `<tr>${r.map((v, i) => (v === null ? '<td class="fill"></td>' : `<td${cls[i] ? ` class="${cls[i]}"` : ''}>${v}</td>`)).join('')}</tr>`).join('\n')}
</table></div>`;
const ltr = (s) => `<span class="ltr">${s}</span>`;
const csv = (rows) => '﻿' + rows.map((r) => r.map((v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}).join(',')).join('\n') + '\n';
const person = (k) => `${H[k].ar}، ${H[k].role}`;

/* ------------------------------------------------------------------ the sources */
write('brief_launch.html', doc('موجز إطلاق خدمة «مُؤنِس»', 'إدارة الاتصال · موجز التكليف', `
<h2>المطلوب</h2>
<p>مواد الإطلاق الوطني لخدمة «مُؤنِس»: بيان صحفي بالعربية والإنجليزية، وثلاثة منشورات بالعربية والإنجليزية، وصورة مرافقة، ومقطع صوتي من 20 ثانية.</p>
<h2>الحقائق</h2>
${table(['الحقيقة', 'القيمة', 'مالكها'], [
    ['الخدمة', `«مُؤنِس»: تربط المتطوعين بطلبات كبار السن ممن بلغوا ${L.ageBeneficiary} عامًا فأكثر والأشخاص ذوي الإعاقة في أحيائهم`, person('director')],
    ['تاريخ الإطلاق', L.date.ar, person('director')],
    ['مدن الإطلاق', `${L.cities} مدينة`, person('director')],
    ['المرحلة التجريبية', `ستة أشهر، من ${P.from.ar} إلى ${P.to.ar}، في الرياض وجدة وأبها`, person('data')],
    ['أرقام المرحلة التجريبية', 'من تقرير المرحلة التجريبية وحده: لا رقم من خارج جداوله', person('data')],
    ['أنواع المساعدة', W.TYPES.map((t) => t.ar).join('، '), person('data')],
    ['المستهدف', `${fmt(L.target)} متطوع قبل نهاية 2027`, person('director')],
    ['شرط التطوع', `${L.ageVolunteer} عامًا فأكثر`, person('director')],
    ['التسجيل', `تطبيق «مُؤنِس» والموقع ${ltr(W.SITE)}`, person('director')],
    ['الاقتباسات', 'من سجل الاقتباسات المعتمدة وحده، حرفيًا', person('rights')]
  ])}
<h2>الأدوار</h2>
<ul>
<li>${person('editorAr')}: يصوغ النسخة العربية.</li>
<li>${person('editorEn')}: تصوغ النسخة الإنجليزية، وتتحقق من النسخة العربية التي لم تكتبها.</li>
<li>${person('data')}: يجيب عن كل سؤال في الأرقام.</li>
<li>${person('rights')}: تراجع الحقوق والموافقات والوسم.</li>
<li>${person('director')}: لا يُنشر شيء قبل اعتمادها باسمها.</li>
</ul>
<h2>المساعد</h2>
<p>المساعد المعتمد في الإدارة اسمه «قِرطاس». يدخله ما في هذا الموجز عدا الملاحظات الداخلية، ودليل الأسلوب، وتقرير المرحلة التجريبية، وسجل الاقتباسات. لا تدخله سجلات الموافقات ولا أسماء المستفيدين.</p>
<h2>ملاحظات داخلية ليست للنشر</h2>
<div class="internal">
<ul>${W.BRIEF_NOTES.map((n) => `<li>${n}</li>`).join('')}</ul>
</div>`));

write('style_guide.html', doc('دليل الأسلوب لمحتوى هيئة عَضُد', 'إدارة الاتصال · دليل الأسلوب', `
<h2>صوت الهيئة</h2>
<ul>
<li>واضح وعملي ودافئ. جمل قصيرة، وفعل قبل الوصف.</li>
<li>عبارات لا تُكتب: ${W.BANNED.map((b) => `«${b}»`).join('، ')}. وبالإنجليزية: ${W.BANNED_EN.map((b) => ltr(b)).join('، ')}.</li>
<li>لا تفضيل ولا مقارنة بغير الهيئة إلا بمصدر مسمّى.</li>
<li>النص يخاطب القارئ: ماذا يحدث، ومتى، وماذا يفعل.</li>
</ul>
<h2>الأرقام والتواريخ</h2>
<ul>
<li>الأرقام كما في مصدرها: ${ltr('4,860')} لا «قرابة خمسة آلاف».</li>
<li>النسب بدقة مصدرها: ${ltr('86.7%')} و${ltr('91%')}. لا تُقرَّب مرة ثانية.</li>
<li>الوسيط يُسمّى وسيطًا. ليس متوسطًا.</li>
<li>التاريخ: اليوم ثم الشهر باسمه ثم السنة: 10 يناير 2027. لا يُكتب التاريخ أرقامًا بينها شرطات مائلة.</li>
</ul>
<h2>الأسماء</h2>
<ul>
<li>كل اسم ومصطلح كما في المسرد. اسم الخدمة «مُؤنِس» لا يُترجم: ${ltr('Muanis')}.</li>
</ul>
<h2>الاقتباسات</h2>
<ul>
<li>الاقتباس من سجل الاقتباسات المعتمدة، حرفيًا، باسم صاحبه وصفته.</li>
<li>لا يُحسَّن اقتباس، ولا يُختصر من وسطه، ولا يُنسب إلى «أحد المستفيدين».</li>
</ul>
<h2>الوسم</h2>
${table(['العنصر', 'الوسم بالعربية', 'الوسم بالإنجليزية'], [
    ['صورة ولّدها الذكاء الاصطناعي', W.LABELS.generated.ar, ltr(W.LABELS.generated.en)],
    ['صورة حقيقية عُدّلت بأداة توليدية', W.LABELS.edited.ar, ltr(W.LABELS.edited.en)],
    ['صوت ولّده الذكاء الاصطناعي', W.LABELS.voice.ar, ltr(W.LABELS.voice.en)]
  ])}
<p>الوسم في التعليق تحت العنصر، وفي بياناته الوصفية، وفي صفه في سجل المحتوى.</p>`));

write('rule_card.html', doc('بطاقة القواعد التحريرية', 'إدارة الاتصال · ثماني قواعد', `
<p>كل خطأ في محتوى يخالف قاعدة من هذه الثماني. سجّل الخطأ برقم قاعدته.</p>
${table(['القاعدة', 'نصها'], W.RULES.map((r) => [r.id, r.text]))}`));

const rate = (c) => pct1(c.completed, c.requests);
write('pilot_report.html', doc('تقرير المرحلة التجريبية لخدمة «مُؤنِس»', 'المصدر الأصلي للأرقام · مالكه عوض الشهري', `
<p>المرحلة التجريبية: من ${P.from.ar} إلى ${P.to.ar}، في الرياض وجدة وأبها.</p>
<h2>الجدول 1: الطلبات والمتطوعون بحسب المدينة</h2>
${table(['المدينة', 'الطلبات المستقبلة', 'الطلبات المنجزة', 'المتطوعون المسجلون', 'المتطوعون النشطون'],
    [...W.CITIES.map((c) => [c.ar, fmt(c.requests), fmt(c.completed), fmt(c.registered), fmt(c.active)]),
      ['<b>المجموع</b>', `<b>${fmt(P.requests)}</b>`, `<b>${fmt(P.completed)}</b>`, `<b>${fmt(P.registered)}</b>`, `<b>${fmt(P.active)}</b>`]],
    ['', 'num', 'num', 'num', 'num'])}
<p>نسبة الإنجاز في المرحلة كلها: ${P.completionPct}%. عدد المستفيدين الذين خُدموا: ${fmt(P.beneficiaries)}.</p>
<h2>الجدول 2: الطلبات بحسب نوع المساعدة</h2>
${table(['نوع المساعدة', 'الطلبات'], [...W.TYPES.map((t) => [t.ar, fmt(t.requests)]), ['<b>المجموع</b>', `<b>${fmt(P.requests)}</b>`]], ['', 'num'])}
<h2>الجدول 3: وسيط المدة من تقديم الطلب إلى إسناده إلى متطوع</h2>
${table(['الشهر', 'الوسيط بالساعات'], [...W.MONTHS.map((m) => [`${m.ar} 2026`, m.median]), ['<b>المرحلة كلها</b>', `<b>${P.medianHours}</b>`]], ['', 'num'])}
<p>الوسيط يُحسب على كل طلبات الفترة. وسيط المرحلة كلها ليس متوسط الأشهر.</p>
<h2>استطلاع المستفيدين</h2>
<p>أُرسل الاستطلاع إلى كل المستفيدين في نوفمبر 2026. أجاب عنه ${fmt(P.survey.replies)} مستفيدًا من ${fmt(P.beneficiaries)}. قال ${fmt(P.survey.satisfied)} منهم إنهم راضون أو راضون جدًّا عن الخدمة، أي ${P.satisfiedPct}% من المجيبين.</p>
<h2>مسح الاستعداد للتطوع 2026</h2>
<p>مسح أجرته الهيئة في مدن الإطلاق الاثنتي عشرة قبل المرحلة التجريبية. شمل ${fmt(W.READINESS.adults)} بالغًا. قال ${fmt(W.READINESS.willing)} منهم، أي 24.0%، إنهم <b>مستعدون</b> للتطوع إذا أتيحت لهم فرصة قريبة من سكنهم. المسح لم يسأل عمّن تطوع فعلًا.</p>`));

write('approved_quotes.html', doc('سجل الاقتباسات المعتمدة', 'المصدر الأصلي للاقتباسات · مسؤولته لجينة الغفيص', `
<p>لا يُنشر اقتباس ليس له صف هنا. النص يُنقل حرفيًا.</p>
${table(['الرقم', 'صاحب الاقتباس', 'النص المعتمد بالعربية', 'النص المعتمد بالإنجليزية', 'تاريخ الموافقة'],
    W.QUOTES.map((q) => [q.id, `${H[q.who].ar}، ${H[q.who].role}`, `«${q.ar}»`, `<span class="ltr">"${q.en}"</span>`, q.approved]))}`));

write('glossary.csv', csv([
  ['العربية', 'English', 'ملاحظة'],
  [W.ORG.ar, W.ORG.en, 'الاسم الكامل في أول ذكر'],
  ['مُؤنِس', 'Muanis', 'اسم الخدمة: لا يُترجم'],
  [H.ceo.ar, H.ceo.en, 'الرئيس التنفيذي'],
  ['الرئيس التنفيذي', 'Chief Executive', ''],
  [H.volunteer.ar, H.volunteer.en, 'متطوع من أبها'],
  [H.director.ar, H.director.en, 'مديرة إدارة الاتصال'],
  ['المرحلة التجريبية', 'pilot', ''],
  ['متطوع', 'volunteer', ''],
  ['مستفيد', 'beneficiary', ''],
  ['وسيط', 'median', 'ليس average'],
  ['كبار السن', 'older people', ''],
  ['الأشخاص ذوو الإعاقة', 'people with disabilities', ''],
  ...W.TYPES.map((t) => [t.ar, t.en, 'نوع مساعدة']),
  ...W.CITIES.map((c) => [c.ar, c.en, 'مدينة'])
]));

/* ------------------------------------------------------------------ day 1: the faulty pack */
const F = Object.fromEntries(W.FAULTS.map((f) => [f.id, f]));
const R = W.RELEASE_AR;
const packRelease = [
  R.paras[0],
  R.paras[1] + ' ' + F['خ2'].text,
  `وقال الرئيس التنفيذي للهيئة ${H.ceo.ar}: «${W.QUOTES[0].ar} ${F['خ5'].text}»`,
  F['خ1'].text,
  R.paras[5]
];
const packPosts = [
  `«مُؤنِس» ينطلق في ${L.cities} مدينة يوم ${L.date.ar}. ${F['خ3'].text} في الرياض وجدة وأبها، والآن دور مدينتك.`,
  `«مُؤنِس» قريب منك. ${F['خ4'].text} سجّل الآن: ${W.SITE}`,
  `«${W.QUOTES[1].ar}» ${H.volunteer.ar}، متطوع من أبها. نشط في المرحلة التجريبية ${fmt(P.active)} متطوعًا.`
];
write('content_pack.html', doc('حزمة محتوى الإطلاق: المسودة الأولى', 'للمراجعة · فيها ثمانية أخطاء مزروعة', `
<p>أعدّ المساعد «قِرطاس» هذه الحزمة من موجز الإطلاق، وأضاف إليها فريق الوسائط صورتين ومقطعًا صوتيًا. لم يراجعها أحد بعد.</p>
<div class="item" id="release"><h3>البيان الصحفي</h3>
<p><b>${R.title}</b></p>
${packRelease.map((p, i) => `<p><span class="tag">الفقرة ${i + 1}</span> ${p}</p>`).join('\n')}
</div>
<div class="item" id="post1"><h3>المنشور 1</h3><p>${packPosts[0]}</p></div>
<div class="item" id="post2"><h3>المنشور 2</h3><p>${packPosts[1]}</p></div>
<div class="item" id="post3"><h3>المنشور 3</h3><p>${packPosts[2]}</p></div>
<div class="item" id="m1"><h3>الصورة 1</h3>
<p><img src="pack_m1.png" width="520" alt="رسم: متطوع يحمل كيسي مشتريات إلى باب منزل يقف عنده رجل مسن"></p>
<p>التعليق: ${F['خ6'].text}</p></div>
<div class="item" id="m2"><h3>الصورة 2</h3>
<p><img src="pack_m2.png" width="520" alt="رسم: مجموعة متطوعين بسترات موحدة يوزعون صناديق في ساحة"></p>
<p>التعليق: متطوعو «مُؤنِس» في الميدان. ${F['خ7'].text}</p></div>
<div class="item" id="m3"><h3>المقطع الصوتي: النص</h3>
<p>المدة 20 ثانية. ${F['خ8'].text}.</p>
<p>النص: مُؤنِس قريب منك. جارك يحتاج إلى ساعتين من وقتك. سجّل اليوم عبر التطبيق.</p></div>`));

write('asset_register.html', doc('سجل الأصول والحقوق: حزمة الإطلاق', 'مسؤولته لجينة الغفيص', `
<p>لكل صورة ومقطع في الحزمة صف: من أين جاء، وكيف صُنع، وما الذي يجيز استخدامه.</p>
${table(['الأصل', 'المصدر وطريقة الصنع', 'أشخاص حقيقيون', 'الموافقة أو الترخيص', 'الوسم عند التسليم'], [
    ['الصورة 1', 'المصمم الداخلي. ولّدها كاملة بأداة التوليد المعتمدة في 12 نوفمبر 2026. ليست من أبها ولا من أي مكان', 'لا', 'LR-031: مخرجات الأداة يجوز استخدامها في الاتصال العام للهيئة', 'لا يوجد'],
    ['الصورة 2', 'وكالة «عدسة» للصور، الصورة AD-88213. التُقطت في فعالية خيرية خارج المملكة في مارس 2023. المصوّر من الوكالة', 'نعم، غير معروفين للهيئة', 'LR-027: استخدام تحريري فقط، لا يشمل الحملات، وتُنسب إلى الوكالة', 'لا يلزم'],
    ['المقطع الصوتي', 'منسق الفيديو. ولّد الصوت بأداة توليد صوت من تسجيلات كلمة الرئيس التنفيذي في ملتقى المتطوعين', 'نعم: صوت الرئيس التنفيذي', 'لا يوجد سجل موافقة على توليد صوته', 'لا يوجد']
  ])}`));

const faultHead = ['الرقم', 'العنصر وموضعه', 'الخطأ كما وجدته', 'نوعه', 'الدليل من المصدر', 'القاعدة', 'ما يصلحه', 'من يملك إصلاحه'];
write('fault_log.csv', csv([faultHead, ...Array.from({ length: 8 }, (_, i) => [i + 1, '', '', '', '', '', '', ''])]));
const textFaults = W.FAULTS.filter((f) => f.lab === '1.1');
write('start/fault_log_text_done.csv', csv([faultHead,
  ...textFaults.map((f, i) => [i + 1, f.item, f.text, f.kind, f.evidence, '', '', '']),
  ...[6, 7, 8].map((n) => [n, '', '', '', '', '', '', ''])]));
solve('fault_log_reference.csv', csv([faultHead, ...W.FAULTS.map((f, i) => [i + 1, f.item, f.text, f.kind, f.evidence, f.rule, f.fix, f.owner])]));

/* ------------------------------------------------------------------ day 1: the logged release */
const STEPS = ['الصياغة', 'التحقق من الحقائق', 'مراجعة الحقوق', 'الاعتماد'];
write('workflow_card.html', doc('بطاقة مسار العمل', 'نموذج فارغ · المختبر 1.3', `
<p>المهمة: <b>بيان إطلاق خدمة «مُؤنِس»</b>. لكل خطوة شخص مسمّى. لا يتحقق أحد مما كتبه هو.</p>
${table(['الخطوة', 'من يؤديها', 'وضع الذكاء الاصطناعي: دون، معلِّم، كامل', 'ما يدخلها', 'دليل إنجازها في السجل', 'لا تبدأ قبل'], STEPS.map((s) => [s, null, null, null, null, null]))}
<h2>ما لا يدخل المساعد</h2>
${table(['المادة', 'السبب'], [[null, null], [null, null]])}
<h2>شرط النشر</h2>
<p>عدد الاقتباسات غير المتحقق منها في الإصدار النهائي: <b>صفر</b>. عدد العناصر الاصطناعية غير الموسومة: <b>صفر</b>.</p>`));

const CARD = [
  { step: 'الصياغة', who: H.editorAr.ar, mode: 'كامل', inputs: 'موجز الإطلاق عدا ملاحظاته الداخلية، ودليل الأسلوب، وتقرير المرحلة التجريبية، وسجل الاقتباسات', proof: 'صف لكل جلسة مع المساعد: الأداة، وما أُعطي، وما خرج', before: 'اكتمال الموجز' },
  { step: 'التحقق من الحقائق', who: `${H.editorEn.ar}، ومرجعها في الأرقام ${H.data.ar}`, mode: 'دون في المحاولة الأولى، ثم المساعد فاحصًا ثانيًا', inputs: 'المسودة، وتقرير المرحلة التجريبية، وسجل الاقتباسات', proof: 'صف لكل رقم واقتباس: مصدره وموضعه وما صُحّح', before: 'تسليم المسودة' },
  { step: 'مراجعة الحقوق', who: H.rights.ar, mode: 'دون', inputs: 'كل صورة وصوت، وسجل الأصول، وسجل الموافقات والتراخيص', proof: 'صف لكل أصل: المنشأ، والوسم، والموافقة، والترخيص', before: 'تحديد الأصول المرافقة' },
  { step: 'الاعتماد', who: H.director.ar, mode: 'دون', inputs: 'النسخة المصحّحة والسجل', proof: 'صف اعتماد باسمها، وفيه العدّادان صفرًا', before: 'اكتمال صفوف التحقق والحقوق' }
];
solve('workflow_card_reference.csv', csv([['الخطوة', 'من يؤديها', 'وضع الذكاء الاصطناعي', 'ما يدخلها', 'دليل إنجازها في السجل', 'لا تبدأ قبل'], ...CARD.map((r) => [r.step, r.who, r.mode, r.inputs, r.proof, r.before])]));

const logHead = ['الرقم', 'الخطوة', 'العنصر', 'من', 'وضع الذكاء الاصطناعي', 'الأداة أو المصدر', 'ما حدث', 'أخطاء مكتشفة', 'الدقائق', 'الحالة'];
const V = Object.fromEntries(W.V1_ISSUES.map((v) => [v.id, v]));
const LOG = [
  [1, 'الصياغة', 'البيان، المسودة الأولى', H.editorAr.ar, 'كامل', 'المساعد «قِرطاس»', 'جلسة واحدة: أُعطي الموجز عدا ملاحظاته الداخلية ودليل الأسلوب والتقرير وسجل الاقتباسات', 0, 9, 'تمت'],
  [2, 'الصياغة', 'الصورة المرافقة', 'المصمم الداخلي', 'كامل', 'أداة التوليد المعتمدة', 'رسم توضيحي مولّد كاملًا', 0, 5, 'تمت'],
  [3, 'التحقق من الحقائق', 'أرقام البيان', H.editorEn.ar, 'دون', 'تقرير المرحلة التجريبية، الجدول 1', '3,500 صُحّحت إلى 3,150، و87.6% صُحّحت إلى 86.7%', 2, 7, 'تمت'],
  [4, 'التحقق من الحقائق', 'اقتباسا البيان', H.editorEn.ar, 'دون', 'سجل الاقتباسات المعتمدة، Q1 وQ2', 'اقتباس الرئيس التنفيذي أعيدت صياغته: أعيد إلى نصه المعتمد. اقتباس المتطوع مطابق', 1, 3, 'تمت'],
  [5, 'التحقق من الحقائق', 'أسلوب البيان', H.editorEn.ar, 'دون', 'دليل الأسلوب', 'حُذفت عبارة «الأولى من نوعها في المنطقة»: ممنوعة ولا مصدر لها', 1, 2, 'تمت'],
  [6, 'مراجعة الحقوق', 'الصورة المرافقة', H.rights.ar, 'دون', 'سجل الأصول، LR-031', 'مولّدة وبلا وسم: أضيف الوسم إلى التعليق. لا أشخاص حقيقيون. الترخيص يغطي', 1, 5, 'تمت'],
  [7, 'التحقق من الحقائق', 'فحص ثانٍ للمسودة', H.editorEn.ar, 'كامل', 'المساعد «قِرطاس»', 'كشف خطأين مما وجدناه، وفاته خطأ النسبة، وادّعى خطأ في تاريخ الإطلاق وهو صحيح', 0, 6, 'تمت'],
  [8, 'الاعتماد', 'البيان النهائي وصورته', H.director.ar, 'دون', 'السجل، الصفوف 3 إلى 7', 'اقتباسات غير متحقق منها: 0. عناصر اصطناعية غير موسومة: 0. تصحيحات بعد الاعتماد: 0', 0, 4, 'معتمد']
];
write('content_log.csv', csv([logHead, ...Array.from({ length: 8 }, (_, i) => [i + 1, '', '', '', '', '', '', '', '', ''])]));
write('start/content_log_drafting_done.csv', csv([logHead, ...LOG.slice(0, 2), ...[3, 4, 5, 6, 7, 8].map((n) => [n, '', '', '', '', '', '', '', '', ''])]));
solve('content_log_reference.csv', csv([logHead, ...LOG]));

const v1 = [...R.paras];
v1[0] = v1[0].replace(V['م4'].from, V['م4'].to);
v1[1] = v1[1].replace(V['م1'].from, V['م1'].to).replace(V['م2'].from, V['م2'].to);
v1[2] = v1[2].replace(V['م3'].from, V['م3'].to);
for (const [i, k] of [[0, 'م4'], [1, 'م1'], [1, 'م2'], [2, 'م3']]) if (!v1[i].includes(V[k].to)) throw new Error('v1 planting failed: ' + k);
const releaseDoc = (title, kicker, paras, caption, img = 'pack_m1.png', up = '') => doc(title, kicker, `
${paras.map((p, i) => `<p><span class="tag">الفقرة ${i + 1}</span> ${p}</p>`).join('\n')}
<h2>الصورة المرافقة</h2>
<p><img src="${up}${img}" width="520" alt="رسم: متطوع يحمل كيسي مشتريات إلى باب منزل يقف عنده رجل مسن"></p>
<p id="caption">التعليق: ${caption}</p>
<p>للاستفسار: إدارة الاتصال في الهيئة، <span class="ltr">media@adud.example</span></p>`);
write('start/release_ar_v1.html', releaseDoc(R.title, 'المسودة الأولى من المساعد «قِرطاس» · لم تُراجع', v1, V['م5'].to, 'pack_m1.png', '../'));
write('release_ar_final.html', releaseDoc(R.title, 'النسخة العربية المعتمدة · اعتمدتها جويرية الجريّد', R.paras, R.caption));

write('start/satr_session_drafting.html', doc('جلسة الصياغة مع المساعد «قِرطاس»', 'مخرج معدّ لمن لا يتاح له مساعد · المختبر 1.3', `
<p>هذا ما كتبه محرر المحتوى العربي للمساعد، وما أعطاه معه. المخرج في الملف <span class="ltr">release_ar_v1.html</span>.</p>
<h2>الأمر</h2>
<div class="item"><p>أنت تساعد إدارة الاتصال في هيئة عَضُد. اكتب بيانًا صحفيًا بالعربية عن إطلاق خدمة «مُؤنِس» من ست فقرات قصيرة. التزم دليل الأسلوب المرفق. خذ كل رقم من تقرير المرحلة التجريبية المرفق، وكل اقتباس حرفيًا من سجل الاقتباسات المرفق. لا تضف رقمًا أو اقتباسًا ليس في المرفقات. إن احتجت إلى معلومة ليست فيها فاسألني.</p></div>
<h2>ما أُعطي للمساعد</h2>
<ul><li>جدول الحقائق من موجز الإطلاق، دون الملاحظات الداخلية.</li><li>دليل الأسلوب.</li><li>تقرير المرحلة التجريبية.</li><li>سجل الاقتباسات المعتمدة.</li></ul>
<h2>ما لم يُعطَ له</h2>
<ul><li>الملاحظات الداخلية في الموجز.</li><li>سجل الموافقات والتراخيص وأسماء المستفيدين.</li></ul>
<h2>ملاحظة</h2>
<p>المخرج مكتوب باليد بصيغة ما يكتبه مساعد، وفيه ما يقع فيه مساعد حقيقي مع أن الأمر منعه. لهذا يأتي التحقق خطوة مستقلة يؤديها غير من صاغ.</p>`));

/* ------------------------------------------------------------------ day 2: two versions */
write('posts_ar.html', doc('المنشورات العربية المعتمدة', 'النسخة العربية المعتمدة · اعتمدتها جويرية الجريّد',
  W.POSTS_AR.map((p, i) => `<div class="item" id="post${i + 1}"><h3>المنشور ${i + 1}</h3><p>${p}</p></div>`).join('\n')));

const factHead = ['الرقم', 'الحقيقة', 'القيمة بالعربية', 'القيمة بالإنجليزية', 'المصدر'];
write('fact_sheet.csv', csv([factHead, ...W.FACTS.map((f) => [f.id, f.name, '', '', ''])]));
solve('fact_sheet_reference.csv', csv([factHead, ...W.FACTS.map((f) => [f.id, f.name, f.ar.join(' | '), f.en.join(' | '), f.source])]));

const plant = (text, item) => {
  let t = text;
  for (const m of W.EN_MISMATCHES.filter((x) => x.item === item)) {
    if (!t.includes(m.from)) throw new Error('mismatch planting failed: ' + m.id);
    t = t.replace(m.from, m.to);
  }
  for (const v of W.EN_VOICE.filter((x) => x.item === item)) {
    if (!t.includes(v.from)) throw new Error('voice planting failed: ' + v.item);
    t = t.replace(v.from, v.to);
  }
  return t;
};
const enDoc = (title, kicker, E, paras, posts) => doc(title, kicker, `
<div class="en">
<div class="item" id="release"><h3>Press release</h3>
<p><b>${E.title}</b></p>
${paras.map((p, i) => `<p><span class="tag">${i + 1}</span> ${p}</p>`).join('\n')}
<p id="caption">Caption: ${E.caption}</p></div>
${posts.map((p, i) => `<div class="item" id="post${i + 1}"><h3>Post ${i + 1}</h3><p>${p}</p></div>`).join('\n')}
</div>`, 'en');
const E = W.RELEASE_EN;
const draftParas = plant(E.paras.join('\n@@\n'), 'release').split('\n@@\n');
const draftPosts = W.POSTS_EN.map((p, i) => plant(p, 'post' + (i + 1)));
write('start/english_drafts.html', enDoc('English drafts from the assistant Qirtas', 'Not reviewed · labs 2.1 and 2.2', E, draftParas, draftPosts));
solve('english_reference.html', enDoc('English versions: reference', 'Reference solution · labs 2.1 and 2.2', E, E.paras, W.POSTS_EN));

const parityHead = ['الرقم', 'العنصر', 'الحقيقة', 'في العربية', 'في المسودة الإنجليزية', 'نوع الفرق', 'التصحيح'];
const itemName = { release: 'البيان', post1: 'المنشور 1', post2: 'المنشور 2', post3: 'المنشور 3' };
const factOf = Object.fromEntries(W.FACTS.map((f) => [f.id, f]));
write('parity_check.csv', csv([parityHead, ...Array.from({ length: 8 }, (_, i) => [i + 1, '', '', '', '', '', ''])]));
solve('parity_check_reference.csv', csv([parityHead, ...W.EN_MISMATCHES.map((m, i) => [i + 1, itemName[m.item], factOf[m.fact].name, factOf[m.fact].ar.join(' | '), m.to, m.kind, m.from])]));

/* ------------------------------------------------------------------ day 2: claims and images */
write('claims_pack.html', doc('ادعاءات أسبوع الإطلاق', 'للتحقق · عشرة ادعاءات أعدّها المساعد «قِرطاس» لورقة الأسئلة والأجوبة', `
<p>طُلب من المساعد أن يجمع عشر جمل تصلح للنشر في أسبوع الإطلاق. لم يتحقق منها أحد.</p>
${table(['الرقم', 'النوع', 'الادعاء', 'المصدر كما ذكره المساعد'], W.CLAIMS.map((c) => [c.id, c.type, c.text, c.cited]))}`));

write('news_item.html', doc('خبر: هيئة عَضُد تستعد لإطلاق خدمة تطوعية', 'صحيفة المدار (افتراضية) · مصدر ثانوي', `
<p>تستعد هيئة عَضُد الوطنية للعمل التطوعي لإطلاق خدمة جديدة تربط المتطوعين بجيرانهم من كبار السن.</p>
<p>وكان مسح أجرته الهيئة هذا العام قد أظهر أن 24% من البالغين في مدن الإطلاق يتطوعون مرة واحدة في السنة على الأقل.</p>
<p>ولم تذكر الهيئة موعد الإطلاق بعد.</p>`));

const factHeadLog = ['المعرّف', 'العنصر', 'النوع', 'المصدر الأصلي', 'ما وجدته', 'المنشأ', 'الوسم المطلوب', 'الموافقة والترخيص', 'القرار', 'النص المصحّح'];
const claimRow = (c) => [c.id, c.text, c.type, c.primary, c.finding, '', '', '', c.verdict, c.fix || ''];
const imageRow = (m) => [m.id, m.file, 'صورة', `بطاقة الأدلة، السجلات: ${m.records.join(' و') || 'لا شيء'}`, m.why, m.origin, m.label, m.consent, m.decision, ''];
write('factcheck_log.csv', csv([factHeadLog, ...W.CLAIMS.map((c) => [c.id, c.text, c.type, '', '', '', '', '', '', '']), ...W.IMAGES.map((m) => [m.id, m.file, 'صورة', '', '', '', '', '', '', ''])]));
write('start/factcheck_log_claims_done.csv', csv([factHeadLog, ...W.CLAIMS.map(claimRow), ...W.IMAGES.map((m) => [m.id, m.file, 'صورة', '', '', '', '', '', '', ''])]));
solve('factcheck_log_reference.csv', csv([factHeadLog, ...W.CLAIMS.map(claimRow), ...W.IMAGES.map(imageRow),
  ['التوقيع', `${H.rights.ar} للصور، و${H.editorEn.ar} للادعاءات`, '', '', 'عناصر اصطناعية غير موسومة في ما يُنشر: 0. اقتباسات غير متحقق منها في ما يُنشر: 0', '', '', '', '', '']]));

write('image_cards.html', doc('بطاقات أدلة الصور الثماني', 'للتحقق · المختبر 2.4', `
<p>الصور رسوم مبسطة تمثّل صورًا وصلت إلى المكتب. ما يُفحص هو بطاقة كل صورة: من أين وصلت، وما قرأته أداة فحص بيانات اعتماد المحتوى، وما وجده البحث العكسي، وما قاله من سلّمها.</p>
${W.IMAGES.map((m) => `<div class="item" id="${m.file.replace('.png', '')}"><h3>${m.id} · <span class="ltr">${m.file}</span></h3>
<p><img src="images/${m.file}" width="420" alt="${esc(m.claim)}"></p>
${table(['البند', 'ما في البطاقة'], [
    ['وصلت من', m.from],
    ['التعليق المقترح', m.claim],
    ['قراءة أداة الفحص', m.inspector],
    ['البحث العكسي عن الصورة', m.reverse],
    ['مذكرة من سلّمها', m.supplier]
  ])}</div>`).join('\n')}`));

write('consent_register.html', doc('سجل الموافقات والتراخيص', 'مسؤولته لجينة الغفيص · لا يدخل أي مساعد', `
<p>الموافقة تُقرأ بغرضها: موافقة على غرض لا تغطي غرضًا آخر. والترخيص يُقرأ بنطاقه.</p>
${table(['الرقم', 'النوع', 'صاحبها أو مانحها', 'الغرض أو النطاق', 'التاريخ'], W.RECORDS.map((r) => [ltr(r.id), r.type, r.who, r.scope, r.date]))}
<p>ما لا صف له هنا لا موافقة عليه ولا ترخيص له.</p>`));

write('label_consent_guide.html', doc('دليل الوسم والموافقة', 'إدارة الاتصال · يُقرأ مع مبادئ التزييف العميق', `
<p>يُطبَّق بهذا الترتيب: المنشأ أولًا، ثم الوسم، ثم الموافقة والترخيص، ثم القرار.</p>
<h2>1 · المنشأ</h2>
${table(['المنشأ', 'ما يثبته', 'ما لا يثبته'], [
    ['ملتقطة', 'بيانات اعتماد موقّعة نوع مصدرها التقاط رقمي، أو ملف أصلي في مكتبة الهيئة، أو إقرار مصوّر الهيئة', 'غياب بيانات الاعتماد، أو غياب العلامة المائية، أو «تبدو حقيقية»'],
    ['مولّدة', 'بيانات اعتماد نوع مصدرها وسائط مولّدة، أو إقرار من صنعها', 'شارة أو علامة مائية في الزاوية وحدها'],
    ['معدّلة', 'تعديل توليدي مسجّل في بيانات الاعتماد، أو إقرار من عدّلها', 'القص وضبط الإضاءة: تعديلات اعتيادية لا توسم'],
    ['غير ثابت', 'لا شيء مما سبق', 'لا تُنشر على أنها من الهيئة حتى يثبت منشؤها']
  ])}
<h2>2 · الوسم</h2>
<ul>
<li>مولّدة: «${W.LABELS.generated.ar}» في التعليق والبيانات الوصفية والسجل.</li>
<li>معدّلة تعديلًا توليديًا: «${W.LABELS.edited.ar}».</li>
<li>ملتقطة: لا وسم.</li>
</ul>
<h2>3 · الموافقة والترخيص</h2>
<ul>
<li>شخص حقيقي يمكن تعرّفه: موافقة مسجّلة لهذا الغرض. غرض جديد يحتاج إلى موافقة جديدة، ولصاحبها أن يسحبها.</li>
<li>هيئة شخص حقيقي أو صوته مولّدان: موافقة صريحة منه على التوليد نفسه.</li>
<li>أصل من خارج الهيئة: ترخيص يغطي هذا الاستخدام، ونسبة صادقة.</li>
</ul>
<h2>4 · القرار</h2>
${table(['القرار', 'متى'], [
    ['نشر', 'ملتقطة ثابتة المنشأ، وموافقاتها وترخيصها مكتملة'],
    ['نشر بوسم', 'مولّدة أو معدّلة، لا تقدَّم على أنها شخص حقيقي أو حدث حقيقي، وموافقاتها وترخيصها مكتملة'],
    ['إيقاف', 'ينقصها شيء يمكن استكماله: موافقة لغرض جديد، أو ترخيص'],
    ['رفض', 'منسوبة إلى غير مصدرها، أو عنصر اصطناعي يقدَّم على أنه شخص حقيقي أو حدث وقع، أو هيئة شخص حقيقي مولّدة بلا موافقته']
  ])}`));

/* ------------------------------------------------------------------ LO5: baseline and card */
write('prework_baseline.html', doc('ورقة خط الأساس', 'العمل التحضيري · قبل اليوم الأول', `
<p>اختر مهمة محتوى واحدة تتكرر في عملك كل أسبوع أو كل شهر: بيان، أو منشورات، أو نشرة، أو رد على استفسارات إعلامية. نفّذها مرة واحدة بطريقتك المعتادة، وسجّل ما يلي. لا تُدخل في هذه الورقة أي محتوى غير منشور أو مصنّف.</p>
${table(['البند', 'ما تسجّله'], [
    ['المهمة وتكرارها', null], ['من يصوغ، ومن يتحقق، ومن يعتمد اليوم', null],
    ['الدقائق: الصياغة', null], ['الدقائق: التحقق من الأرقام والاقتباسات', null], ['الدقائق: مراجعة الصور والحقوق', null], ['الدقائق: الاعتماد', null],
    ['أخطاء اكتُشفت قبل الاعتماد، وعددها', null], ['تصحيحات طُلبت بعد الاعتماد أو بعد النشر، وعددها', null],
    ['هل استُخدم مساعد ذكي؟ في أي خطوة؟', null]
  ])}
<p>أحضر الورقة معك: التنفيذان بمساعدة الذكاء الاصطناعي في نهاية اليومين يقاسان عليها.</p>`));

write('redesign_card.html', doc('بطاقة إعادة التصميم', 'نموذج فارغ · المشروع الختامي', `
<p>مهمة واحدة متكررة من عملك، قبل وبعد. كل رقم من سجل المحتوى، لا من الذاكرة.</p>
${table(['', 'خط الأساس', 'التنفيذ 1', 'التنفيذ 2'], [
    ['الدقائق كلها', null, null, null], ['منها دقائق التحقق ومراجعة الحقوق', null, null, null],
    ['أخطاء اكتُشفت قبل الاعتماد', null, null, null], ['تصحيحات بعد الاعتماد', null, null, null],
    ['اقتباسات غير متحقق منها في النهائي', null, null, null], ['عناصر اصطناعية غير موسومة في النهائي', null, null, null]
  ])}
<h2>ما تغيّر في المسار</h2>
${table(['الخطوة', 'قبل: من وبأي وضع', 'بعد: من وبأي وضع', 'لماذا'], STEPS.map((s) => [s, null, null, null]))}
<h2>ما أبقيه وما أغيّره بعد التنفيذين</h2>
${table(['قرار', 'الدليل من السجل'], [[null, null], [null, null], [null, null]])}
<p>في المراجعة المباشرة يختار المقيِّم اقتباسًا واحدًا وصورة واحدة من إصدارك، وتعيد التحقق منهما أمامه من سجلك.</p>`));

/* ------------------------------------------------------------------ the key */
const key = {
  pilot: P, launch: L, quotes: W.QUOTES, rules: W.RULES, faults: W.FAULTS, v1_issues: W.V1_ISSUES,
  facts: W.FACTS, item_facts: W.ITEM_FACTS, en_mismatches: W.EN_MISMATCHES, en_voice: W.EN_VOICE,
  claims: W.CLAIMS, images: W.IMAGES, records: W.RECORDS, labels: W.LABELS, banned: W.BANNED, banned_en: W.BANNED_EN,
  cities: W.CITIES, types: W.TYPES, months: W.MONTHS, readiness: W.READINESS, brief_notes: W.BRIEF_NOTES,
  release_ar: W.RELEASE_AR, release_en: W.RELEASE_EN, posts_ar: W.POSTS_AR, posts_en: W.POSTS_EN,
  workflow_card: CARD
};
solve('key.json', JSON.stringify(key, null, 2) + '\n');
solve('standin.json', JSON.stringify(W.STANDIN, null, 2) + '\n');
const count = (d) => fs.readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(path.join(d, e.name)) : 1), 0);
console.log(`wrote the file pack: ${count(FILES)} files under labs/files, ${count(SOL)} under labs/solutions`);
