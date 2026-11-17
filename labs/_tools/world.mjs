/* The world of the case study: every fact of the Adud launch is written once, here.
   The documents, the planted faults, the key and the checker all read this module. */

export const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const pct1 = (a, b) => (Math.round((a / b) * 1000) / 10).toFixed(1);

export const ORG = { ar: 'هيئة عَضُد الوطنية للعمل التطوعي', en: 'Adud National Volunteering Authority' };
export const SERVICE = { ar: '«مُؤنِس»', en: 'Muanis' };
export const SITE = 'muanis.adud.example';

export const PEOPLE = {
  director: { ar: 'جويرية الجريّد', en: 'Juwairiyah Al-Jurayyid', role: 'مديرة إدارة الاتصال، صاحبة الاعتماد' },
  editorAr: { ar: 'نمر المطرف', en: 'Nimr Al-Mutrif', role: 'محرر المحتوى العربي' },
  editorEn: { ar: 'مياسم الخويطر', en: 'Mayasim Al-Khuwaiter', role: 'محررة المحتوى الإنجليزي' },
  data: { ar: 'عوض الشهري', en: 'Awad Al-Shihri', role: 'مالك بيانات المرحلة التجريبية' },
  rights: { ar: 'لجينة الغفيص', en: 'Lujaina Al-Ghufais', role: 'مسؤولة الحقوق والموافقات' },
  ceo: { ar: 'الدكتور مثنى الحلوة', en: 'Dr. Muthanna Al-Hulwah', role: 'الرئيس التنفيذي' },
  volunteer: { ar: 'براء المشوّح', en: 'Baraa Al-Mushawwah', role: 'متطوع من أبها' },
  volunteer2: { ar: 'رفل الهليّل', en: 'Rafal Al-Hulayyil', role: 'متطوعة من جدة' },
  photographer: { ar: 'تيم الدغمي', en: 'Taim Al-Daghmi', role: 'مصوّر الهيئة' }
};

export const CITIES = [
  { ar: 'الرياض', en: 'Riyadh', requests: 2140, completed: 1872, registered: 1420, active: 880 },
  { ar: 'جدة', en: 'Jeddah', requests: 1730, completed: 1494, registered: 1090, active: 660 },
  { ar: 'أبها', en: 'Abha', requests: 990, completed: 846, registered: 640, active: 400 }
];
const sum = (k) => CITIES.reduce((s, c) => s + c[k], 0);

export const TYPES = [
  { ar: 'قضاء الحاجات اليومية', en: 'daily errands', requests: 2268 },
  { ar: 'المرافقة إلى المواعيد', en: 'accompaniment to appointments', requests: 1566 },
  { ar: 'الصيانة المنزلية البسيطة', en: 'simple home maintenance', requests: 1026 }
];

export const MONTHS = [
  { ar: 'يونيو', median: 41 }, { ar: 'يوليو', median: 36 }, { ar: 'أغسطس', median: 31 },
  { ar: 'سبتمبر', median: 27 }, { ar: 'أكتوبر', median: 24 }, { ar: 'نوفمبر', median: 22 }
];

export const PILOT = {
  from: { ar: '1 يونيو', en: '1 June' }, to: { ar: '30 نوفمبر 2026', en: '30 November 2026' },
  requests: sum('requests'), completed: sum('completed'), registered: sum('registered'), active: sum('active'),
  beneficiaries: 2305, medianHours: 26,
  survey: { replies: 1120, satisfied: 1019 }
};
PILOT.completionPct = pct1(PILOT.completed, PILOT.requests);
PILOT.satisfiedPct = String(Math.round((PILOT.survey.satisfied / PILOT.survey.replies) * 100));
PILOT.activePct = pct1(PILOT.active, PILOT.registered);

export const LAUNCH = {
  date: { ar: '10 يناير 2027', en: '10 January 2027' }, cities: 12, target: 15000,
  ageVolunteer: 18, ageBeneficiary: 60
};

export const READINESS = { year: 2026, adults: 6400, willing: 1536 }; // 24.0% said they are willing to volunteer

export const QUOTES = [
  { id: 'Q1', who: 'ceo', approved: '2 ديسمبر 2026',
    ar: 'مُؤنِس يجعل مساعدة الجار خدمة منظمة: طلب واضح، ومتطوع موثَّق، ومتابعة حتى يُنجز الطلب.',
    en: 'Muanis turns helping a neighbour into an organised service: a clear request, a verified volunteer, and follow-up until the request is done.' },
  { id: 'Q2', who: 'volunteer', approved: '3 ديسمبر 2026',
    ar: 'أعطي ساعتين في الأسبوع، وأعرف قبل أن أخرج من بيتي من سأساعد وبماذا.',
    en: 'I give two hours a week, and before I leave home I know whom I will help and with what.' }
];

export const BRIEF_NOTES = [
  'الجمهور المستهدف: كبار السن وذووهم، والمتطوعون المحتملون من 18 إلى 35 سنة.',
  'النبرة: دافئة وعملية، بلا مبالغة.',
  'تأخرت المرحلة التجريبية في أبها ستة أسابيع لنقص المنسقين. لا يُذكر ذلك في المواد.'
];

export const BANNED = ['ثورة', 'ثوري', 'غير مسبوق', 'الأولى من نوعها', 'الأول من نوعه', 'الأفضل'];
export const BANNED_EN = ['revolutionary', 'unprecedented', 'first of its kind', 'the best'];

export const LABELS = {
  generated: { ar: 'صورة مولّدة بالذكاء الاصطناعي', en: 'AI-generated image' },
  edited: { ar: 'صورة معدّلة بالذكاء الاصطناعي', en: 'AI-edited image' },
  voice: { ar: 'صوت مولّد بالذكاء الاصطناعي', en: 'AI-generated voice' }
};

export const RULES = [
  { id: 'ق1', text: 'كل رقم في النص له مصدر أصلي مسمّى، ويطابقه حرفيًا: الجدول، والفترة، والنطاق.' },
  { id: 'ق2', text: 'كل اقتباس منقول حرفيًا من سجل الاقتباسات المعتمدة، باسم صاحبه. لا اقتباس بلا سجل، ولا تحسين لاقتباس معتمد.' },
  { id: 'ق3', text: 'النص يخاطب القارئ. عبارات الموجز وملاحظاته الداخلية لا تظهر في المحتوى.' },
  { id: 'ق4', text: 'كل عنصر ولّده الذكاء الاصطناعي أو عدّله تعديلًا توليديًا يحمل وسمًا ظاهرًا وصفًّا في سجل المحتوى.' },
  { id: 'ق5', text: 'صورة أي شخص حقيقي وصوته لا يُستخدمان ولا يولَّدان إلا بموافقة مسجّلة منه لهذا الغرض.' },
  { id: 'ق6', text: 'لكل أصل ترخيص يغطي هذا الاستخدام، ونسبته إلى مصدره صادقة.' },
  { id: 'ق7', text: 'النسختان العربية والإنجليزية تحملان الحقائق والأسماء والأرقام نفسها.' },
  { id: 'ق8', text: 'الصياغة والتحقق ومراجعة الحقوق والاعتماد خطوات منفصلة مسجّلة. لا يتحقق أحد مما كتبه هو، ولا يُنشر شيء قبل اعتماد مديرة الاتصال باسمها.' }
];

/* ---- the canonical texts ---- */
const P = PILOT, L = LAUNCH;
export const RELEASE_AR = {
  title: `هيئة عَضُد تطلق خدمة ${SERVICE.ar} في ${L.cities} مدينة يوم ${L.date.ar}`,
  paras: [
    `تطلق ${ORG.ar} خدمة ${SERVICE.ar} في ${L.cities} مدينة يوم ${L.date.ar}، بعد مرحلة تجريبية استمرت ستة أشهر في الرياض وجدة وأبها. تربط الخدمة المتطوعين بطلبات كبار السن ممن بلغوا ${L.ageBeneficiary} عامًا فأكثر والأشخاص ذوي الإعاقة في أحيائهم.`,
    `استقبلت المرحلة التجريبية، من ${P.from.ar} إلى ${P.to.ar}، ${fmt(P.requests)} طلبًا أُنجز منها ${fmt(P.completed)} طلبًا، أي ${P.completionPct}%. وسجّل فيها ${fmt(P.registered)} متطوعًا، نشط منهم ${fmt(P.active)}، وخدموا ${fmt(P.beneficiaries)} مستفيدين. وبلغ وسيط المدة من تقديم الطلب إلى إسناده إلى متطوع ${P.medianHours} ساعة.`,
    `وقال الرئيس التنفيذي للهيئة ${PEOPLE.ceo.ar}: «${QUOTES[0].ar}»`,
    `وتقدّم الخدمة ثلاثة أنواع من المساعدة: ${TYPES[0].ar}، و${TYPES[1].ar}، و${TYPES[2].ar}. وأفاد ${P.satisfiedPct}% ممن أجابوا عن استطلاع المستفيدين، وعددهم ${fmt(P.survey.replies)}، بأنهم راضون عن الخدمة.`,
    `وقال المتطوع ${PEOPLE.volunteer.ar} من أبها: «${QUOTES[1].ar}»`,
    `وتستهدف الهيئة تسجيل ${fmt(L.target)} متطوع قبل نهاية 2027. التسجيل متاح لمن بلغ ${L.ageVolunteer} عامًا فأكثر عبر تطبيق ${SERVICE.ar} والموقع ${SITE}.`
  ],
  caption: `رسم توضيحي لخدمة ${SERVICE.ar}. ${LABELS.generated.ar}.`
};

export const RELEASE_EN = {
  title: `Adud launches ${SERVICE.en} in ${L.cities} cities on ${L.date.en}`,
  paras: [
    `The ${ORG.en} will launch ${SERVICE.en} in ${L.cities} cities on ${L.date.en}, after a six-month pilot in Riyadh, Jeddah and Abha. The service matches volunteers with requests from people aged ${L.ageBeneficiary} or more and people with disabilities in their own neighbourhoods.`,
    `Between ${P.from.en} and ${P.to.en} the pilot received ${fmt(P.requests)} requests, of which ${fmt(P.completed)} were completed (${P.completionPct}%). It registered ${fmt(P.registered)} volunteers, ${fmt(P.active)} of them active, who served ${fmt(P.beneficiaries)} beneficiaries. The median time from a request to its assignment to a volunteer was ${P.medianHours} hours.`,
    `${PEOPLE.ceo.en}, the Authority's Chief Executive, said: "${QUOTES[0].en}"`,
    `The service offers three kinds of help: ${TYPES[0].en}, ${TYPES[1].en} and ${TYPES[2].en}. Of the ${fmt(P.survey.replies)} beneficiaries who answered the survey, ${P.satisfiedPct}% said they were satisfied with the service.`,
    `${PEOPLE.volunteer.en}, a volunteer from Abha, said: "${QUOTES[1].en}"`,
    `The Authority aims to register ${fmt(L.target)} volunteers by the end of 2027. Registration is open to anyone aged ${L.ageVolunteer} or more through the ${SERVICE.en} app and ${SITE}.`
  ],
  caption: `An illustration of the ${SERVICE.en} service. ${LABELS.generated.en}.`
};

export const POSTS_AR = [
  `${SERVICE.ar} ينطلق في ${L.cities} مدينة يوم ${L.date.ar}. طلب واضح، ومتطوع موثَّق، ومتابعة حتى يُنجز الطلب. سجّل الآن: ${SITE}`,
  `في ستة أشهر: ${fmt(P.requests)} طلبًا أُنجز منها ${fmt(P.completed)}. ${fmt(P.registered)} متطوعًا سجّلوا، و${fmt(P.beneficiaries)} مستفيدين خُدموا. شكرًا لكم في الرياض وجدة وأبها.`,
  `«${QUOTES[1].ar}» ${PEOPLE.volunteer.ar}، متطوع من أبها. التطوع في ${SERVICE.ar} لمن بلغ ${L.ageVolunteer} عامًا فأكثر.`
];
export const POSTS_EN = [
  `${SERVICE.en} launches in ${L.cities} cities on ${L.date.en}. A clear request, a verified volunteer, and follow-up until the request is done. Sign up now: ${SITE}`,
  `In six months: ${fmt(P.requests)} requests, ${fmt(P.completed)} of them completed. ${fmt(P.registered)} volunteers signed up and ${fmt(P.beneficiaries)} beneficiaries were served. Thank you, Riyadh, Jeddah and Abha.`,
  `"${QUOTES[1].en}" ${PEOPLE.volunteer.en}, a volunteer from Abha. Volunteering with ${SERVICE.en} is open to anyone aged ${L.ageVolunteer} or more.`
];

/* ---- the facts both versions must carry: what the parity check compares ---- */
export const FACTS = [
  { id: 'ح01', name: 'تاريخ الإطلاق', ar: ['10 يناير 2027'], en: ['10 January 2027'], source: 'موجز الإطلاق' },
  { id: 'ح02', name: 'عدد مدن الإطلاق', ar: ['12 مدينة'], en: ['12 cities'], source: 'موجز الإطلاق' },
  { id: 'ح03', name: 'مدن المرحلة التجريبية', ar: ['الرياض', 'جدة', 'أبها'], en: ['Riyadh', 'Jeddah', 'Abha'], source: 'تقرير المرحلة التجريبية' },
  { id: 'ح04', name: 'فترة المرحلة التجريبية', ar: ['1 يونيو', '30 نوفمبر 2026'], en: ['1 June', '30 November 2026'], source: 'تقرير المرحلة التجريبية' },
  { id: 'ح05', name: 'الطلبات المستقبلة', ar: ['4,860'], en: ['4,860'], source: 'تقرير المرحلة التجريبية، الجدول 1' },
  { id: 'ح06', name: 'الطلبات المنجزة', ar: ['4,212'], en: ['4,212'], source: 'تقرير المرحلة التجريبية، الجدول 1' },
  { id: 'ح07', name: 'نسبة الإنجاز', ar: ['86.7%'], en: ['86.7%'], source: 'تقرير المرحلة التجريبية، الجدول 1' },
  { id: 'ح08', name: 'المتطوعون المسجلون', ar: ['3,150'], en: ['3,150'], source: 'تقرير المرحلة التجريبية، الجدول 1' },
  { id: 'ح09', name: 'المتطوعون النشطون', ar: ['1,940'], en: ['1,940'], source: 'تقرير المرحلة التجريبية، الجدول 1' },
  { id: 'ح10', name: 'المستفيدون', ar: ['2,305'], en: ['2,305'], source: 'تقرير المرحلة التجريبية، الجدول 1' },
  { id: 'ح11', name: 'وسيط مدة الإسناد', ar: ['وسيط', '26 ساعة'], en: ['median', '26 hours'], source: 'تقرير المرحلة التجريبية، الجدول 3' },
  { id: 'ح12', name: 'المجيبون عن الاستطلاع', ar: ['1,120'], en: ['1,120'], source: 'تقرير المرحلة التجريبية، الاستطلاع' },
  { id: 'ح13', name: 'نسبة الراضين من المجيبين', ar: ['91%'], en: ['91%'], source: 'تقرير المرحلة التجريبية، الاستطلاع' },
  { id: 'ح14', name: 'المستهدف من المتطوعين', ar: ['15,000', 'نهاية 2027'], en: ['15,000', 'end of 2027'], source: 'موجز الإطلاق' },
  { id: 'ح15', name: 'سن التطوع', ar: ['18 عامًا'], en: ['aged 18'], source: 'موجز الإطلاق' },
  { id: 'ح16', name: 'سن المستفيد', ar: ['60 عامًا'], en: ['aged 60'], source: 'موجز الإطلاق' },
  { id: 'ح17', name: 'اسم الرئيس التنفيذي', ar: [PEOPLE.ceo.ar], en: [PEOPLE.ceo.en], source: 'المسرد' },
  { id: 'ح18', name: 'اسم المتطوع', ar: [PEOPLE.volunteer.ar], en: [PEOPLE.volunteer.en], source: 'المسرد' },
  { id: 'ح19', name: 'اسم الخدمة', ar: ['مُؤنِس'], en: ['Muanis'], source: 'المسرد' },
  { id: 'ح20', name: 'اسم الهيئة', ar: [ORG.ar], en: [ORG.en], source: 'المسرد' },
  { id: 'ح21', name: 'اقتباس الرئيس التنفيذي', ar: [QUOTES[0].ar], en: [QUOTES[0].en], source: 'سجل الاقتباسات، Q1' },
  { id: 'ح22', name: 'اقتباس المتطوع', ar: [QUOTES[1].ar], en: [QUOTES[1].en], source: 'سجل الاقتباسات، Q2' }
];
export const ITEM_FACTS = {
  release: FACTS.map((f) => f.id),
  post1: ['ح01', 'ح02', 'ح19'],
  post2: ['ح05', 'ح06', 'ح08', 'ح10', 'ح03'],
  post3: ['ح22', 'ح18', 'ح15', 'ح19']
};

/* ---- planted: the six mismatches of the English drafts (lab 2.2) ---- */
export const EN_MISMATCHES = [
  { id: 'ف1', item: 'release', fact: 'ح17', kind: 'اسم', from: PEOPLE.ceo.en, to: 'Dr. Muthana Al-Helwa', note: 'كتابة الاسم تخالف المسرد' },
  { id: 'ف2', item: 'release', fact: 'ح06', kind: 'رقم', from: '4,212 were completed', to: '4,221 were completed', note: 'رقمان تبادلا موضعيهما' },
  { id: 'ف3', item: 'release', fact: 'ح11', kind: 'مصطلح', from: 'The median time', to: 'The average time', note: 'الوسيط صار متوسطًا: حقيقة أخرى' },
  { id: 'ف4', item: 'post1', fact: 'ح01', kind: 'تاريخ', from: 'on 10 January 2027', to: 'on 1 October 2027', note: 'قراءة 10/1 بترتيب الشهر ثم اليوم' },
  { id: 'ف5', item: 'post3', fact: 'ح19', kind: 'اسم', from: `Volunteering with ${SERVICE.en}`, to: 'Volunteering with Good Companion', note: 'اسم الخدمة تُرجم والمسرد يمنع ترجمته' },
  { id: 'ف6', item: 'post3', fact: 'ح22', kind: 'اقتباس', from: 'two hours a week', to: 'two hours a day', note: 'الاقتباس تغيّر: الأسبوع صار يومًا' }
];
export const EN_VOICE = [
  { item: 'post1', from: `${SERVICE.en} launches`, to: `The revolutionary ${SERVICE.en} service launches`, decision: 'يُصحَّح', why: 'كلمة يمنعها دليل الأسلوب' },
  { item: 'post2', from: 'Thank you, Riyadh, Jeddah and Abha.', to: 'Thank you, Riyadh, Jeddah and Abha!', decision: 'يُقبل', why: 'علامة تعجب: فرق في الأسلوب لا يمس حقيقة ولا يخالف الدليل' }
];

/* ---- planted: the eight faults of the content pack (labs 1.1 and 1.2) ---- */
export const FAULTS = [
  { id: 'خ1', item: 'البيان، الفقرة 4', kind: 'اقتباس مختلق', rule: 'ق2', lab: '1.1',
    text: 'وقالت أم هارون، وهي مستفيدة من جدة: «لم أعد أحتاج إلى أحد من أبنائي ليأخذني إلى موعدي.»',
    evidence: 'لا صف لأم هارون في سجل الاقتباسات المعتمدة: فيه اقتباسان فقط، Q1 وQ2', fix: 'يُحذف، أو يُطلب اقتباس حقيقي بموافقة صاحبه', owner: 'محرر المحتوى، ثم مسؤولة الحقوق إن طُلب اقتباس جديد' },
  { id: 'خ2', item: 'البيان، الفقرة 2', kind: 'إحصائية مختلقة', rule: 'ق1', lab: '1.1',
    text: 'وانخفض متوسط انتظار المستفيد بنسبة 40% مقارنة ببداية التجربة.',
    evidence: 'لا نسبة 40% في تقرير المرحلة التجريبية، والتقرير يقيس الوسيط لا المتوسط', fix: 'تُحذف الجملة، أو يُسأل مالك البيانات عن رقم يسنده الجدول 3', owner: 'مالك بيانات المرحلة التجريبية' },
  { id: 'خ3', item: 'المنشور 1', kind: 'رقم تغيّر عن مصدره', rule: 'ق1', lab: '1.1',
    text: 'أكثر من 5,000 طلب في ستة أشهر',
    evidence: 'الجدول 1: الطلبات 4,860، وهي أقل من 5,000', fix: 'يُكتب 4,860 طلبًا', owner: 'محرر المحتوى' },
  { id: 'خ4', item: 'المنشور 2', kind: 'نص يردد الموجز', rule: 'ق3', lab: '1.1',
    text: 'الجمهور المستهدف: كبار السن وذووهم، والمتطوعون المحتملون من 18 إلى 35 سنة. النبرة: دافئة وعملية، بلا مبالغة.',
    evidence: 'السطران منقولان حرفيًا من ملاحظات الموجز الداخلية', fix: 'يُعاد كتابة المنشور للقارئ', owner: 'محرر المحتوى' },
  { id: 'خ5', item: 'البيان، الفقرة 3', kind: 'اقتباس معدَّل', rule: 'ق2', lab: '1.1',
    text: 'وسنصل إلى كل حي في المملكة خلال عام واحد.',
    evidence: 'الجملة ليست في Q1 المعتمد: أضيفت إلى اقتباس الرئيس التنفيذي وعد لم يقله', fix: 'يعاد الاقتباس إلى نصه المعتمد حرفيًا', owner: 'محرر المحتوى' },
  { id: 'خ6', item: 'الصورة 1', kind: 'وسيط اصطناعي غير موسوم', rule: 'ق4', lab: '1.2',
    text: 'من المرحلة التجريبية في أبها: متطوع يوصل مشتريات أحد المستفيدين.',
    evidence: 'سجل الأصول: الصورة ولّدها المصمم بأداة التوليد، ولا وسم عليها، والتعليق يقدّمها مشهدًا من أبها', fix: 'يُضاف الوسم ويُكتب تعليق صادق: رسم توضيحي', owner: 'مسؤولة الحقوق والمحرر' },
  { id: 'خ7', item: 'الصورة 2', kind: 'صورة منسوبة إلى غير مصدرها', rule: 'ق6', lab: '1.2',
    text: 'تصوير: تيم الدغمي، هيئة عَضُد.',
    evidence: 'سجل الأصول: الصورة من وكالة «عدسة»، التُقطت خارج المملكة في مارس 2023، وترخيصها تحريري لا يشمل الحملات', fix: 'تُستبدل بصورة من مكتبة الهيئة، أو يُشترى ترخيص يغطي الحملة وتُنسب إلى الوكالة', owner: 'مسؤولة الحقوق' },
  { id: 'خ8', item: 'المقطع الصوتي', kind: 'صوت شخص حقيقي مولّد بلا موافقة ولا وسم', rule: 'ق5', lab: '1.2',
    text: 'بصوت الرئيس التنفيذي',
    evidence: 'سجل الأصول: الصوت مولّد من تسجيلات كلمته، ولا سجل موافقة على توليد صوته، ولا وسم', fix: 'يسجّل الرئيس التنفيذي النص بصوته، أو يقرؤه معلّق ويُذكر ذلك', owner: 'مسؤولة الحقوق، والقرار للرئيس التنفيذي' }
];

/* ---- planted: the five issues of the assistant's first draft (lab 1.4) ---- */
export const V1_ISSUES = [
  { id: 'م1', kind: 'رقم', from: `${fmt(PILOT.registered)} متطوعًا`, to: '3,500 متطوعًا', source: 'الجدول 1: 3,150' },
  { id: 'م2', kind: 'رقم', from: `${PILOT.completionPct}%`, to: '87.6%', source: 'الجدول 1: 4,212 من 4,860 تساوي 86.7%' },
  { id: 'م3', kind: 'اقتباس', from: QUOTES[0].ar, to: 'مُؤنِس يحوّل مساعدة الجار إلى خدمة منظمة ومتكاملة، من الطلب الواضح إلى المتطوع الموثَّق.', source: 'سجل الاقتباسات، Q1: النص المعتمد غير هذا' },
  { id: 'م4', kind: 'أسلوب', from: 'بعد مرحلة تجريبية', to: 'وهي الأولى من نوعها في المنطقة، بعد مرحلة تجريبية', source: 'دليل الأسلوب: عبارة ممنوعة، ولا مصدر لها' },
  { id: 'م5', kind: 'وسم', from: RELEASE_AR.caption, to: `متطوع يوصل مشتريات أحد المستفيدين.`, source: 'سجل الأصول: الصورة مولّدة، والوسم ناقص' }
];

/* ---- planted: the ten claims (lab 2.3) ---- */
const C = CITIES, rate = (c) => pct1(c.completed, c.requests);
export const CLAIMS = [
  { id: 'د01', type: 'إحصائية', text: `أنجزت المرحلة التجريبية ${PILOT.completionPct}% من الطلبات.`, cited: 'تقرير المرحلة التجريبية',
    primary: 'تقرير المرحلة التجريبية، الجدول 1', verdict: 'يُنشر', finding: `${fmt(PILOT.completed)} من ${fmt(PILOT.requests)} تساوي ${PILOT.completionPct}%` },
  { id: 'د02', type: 'إحصائية', text: `قرابة نصف الطلبات (${pct1(TYPES[0].requests, PILOT.requests)}%) كانت لقضاء الحاجات اليومية.`, cited: 'تقرير المرحلة التجريبية',
    primary: 'تقرير المرحلة التجريبية، الجدول 2', verdict: 'يُنشر', finding: `${fmt(TYPES[0].requests)} من ${fmt(PILOT.requests)} تساوي ${pct1(TYPES[0].requests, PILOT.requests)}%` },
  { id: 'د03', type: 'إحصائية', text: 'تسعة من كل عشرة مستفيدين راضون عن الخدمة.', cited: 'استطلاع المستفيدين',
    primary: 'تقرير المرحلة التجريبية، الاستطلاع', verdict: 'يُصحَّح', finding: `النسبة ${PILOT.satisfiedPct}% من ${fmt(PILOT.survey.replies)} أجابوا عن الاستطلاع، لا من ${fmt(PILOT.beneficiaries)} مستفيدين`, fix: `${PILOT.satisfiedPct}% ممن أجابوا عن الاستطلاع، وعددهم ${fmt(PILOT.survey.replies)}، راضون عن الخدمة.` },
  { id: 'د04', type: 'إحصائية', text: `نشط ${fmt(PILOT.active)} متطوعًا من ${fmt(PILOT.registered)} مسجلًا، أي ${PILOT.activePct}%.`, cited: 'تقرير المرحلة التجريبية',
    primary: 'تقرير المرحلة التجريبية، الجدول 1', verdict: 'يُنشر', finding: `${fmt(PILOT.active)} من ${fmt(PILOT.registered)} تساوي ${PILOT.activePct}%` },
  { id: 'د05', type: 'إحصائية', text: 'سجّلت أبها أعلى نسبة إنجاز بين المدن الثلاث.', cited: 'تقرير المرحلة التجريبية',
    primary: 'تقرير المرحلة التجريبية، الجدول 1', verdict: 'يُصحَّح', finding: `الرياض ${rate(C[0])}%، وجدة ${rate(C[1])}%، وأبها ${rate(C[2])}%: الأعلى الرياض`, fix: `سجّلت الرياض أعلى نسبة إنجاز بين المدن الثلاث: ${rate(C[0])}%.` },
  { id: 'د06', type: 'اقتباس', text: `قالت مديرة إدارة الاتصال ${PEOPLE.director.ar}: «${QUOTES[0].ar}»`, cited: 'سجل الاقتباسات',
    primary: 'سجل الاقتباسات المعتمدة، Q1', verdict: 'يُصحَّح', finding: 'النص صحيح، وصاحبه الرئيس التنفيذي لا مديرة الاتصال', fix: `قال الرئيس التنفيذي ${PEOPLE.ceo.ar}: «${QUOTES[0].ar}»` },
  { id: 'د07', type: 'اقتباس', text: `قال المتطوع ${PEOPLE.volunteer.ar}: «${QUOTES[1].ar}»`, cited: 'سجل الاقتباسات',
    primary: 'سجل الاقتباسات المعتمدة، Q2', verdict: 'يُنشر', finding: 'مطابق حرفيًا، والموافقة مسجّلة' },
  { id: 'د08', type: 'إحصائية', text: 'يتطوع 24% من البالغين في مدن الإطلاق مرة واحدة في السنة على الأقل.', cited: 'صحيفة المدار',
    primary: 'مسح الاستعداد للتطوع 2026، الهيئة', verdict: 'يُصحَّح', finding: `المسح: ${fmt(READINESS.willing)} من ${fmt(READINESS.adults)} بالغًا، أي 24.0%، قالوا إنهم مستعدون للتطوع. الخبر نقلها «يتطوعون»`, fix: 'قال 24% من البالغين الذين شملهم مسح الاستعداد للتطوع 2026 إنهم مستعدون للتطوع.' },
  { id: 'د09', type: 'اقتباس', text: 'قال أحد المستفيدين: «مُؤنِس أعاد إليّ استقلالي.»', cited: 'غير مذكور',
    primary: 'لا مصدر', verdict: 'يُحذف', finding: 'لا صف له في سجل الاقتباسات، ولا اسم لصاحبه ولا موافقة' },
  { id: 'د10', type: 'إحصائية', text: 'انخفض وسيط مدة الإسناد من 41 ساعة في الشهر الأول إلى 26 ساعة في الشهر الأخير.', cited: 'تقرير المرحلة التجريبية',
    primary: 'تقرير المرحلة التجريبية، الجدول 3', verdict: 'يُصحَّح', finding: 'الشهر الأخير 22 ساعة. و26 ساعة وسيط المرحلة كلها', fix: 'انخفض وسيط مدة الإسناد من 41 ساعة في الشهر الأول إلى 22 ساعة في الشهر الأخير.' }
];

/* ---- planted: the eight images (lab 2.4) ---- */
export const IMAGES = [
  { id: 'ص1', file: 'I1.png', from: 'مكتبة صور الهيئة', claim: `${PEOPLE.volunteer.ar} يوصل مشتريات أحد المستفيدين في أبها. تصوير: ${PEOPLE.photographer.ar}.`,
    inspector: 'بيانات اعتماد المحتوى: موجودة، وتوقيعها سليم. الموقِّع: كاميرا الهيئة. نوع المصدر الرقمي: التقاط رقمي. لا تعديلات مسجّلة.',
    reverse: 'لا نتائج مطابقة.', supplier: 'من جلسة تصوير المرحلة التجريبية في أبها، 9 نوفمبر 2026.',
    records: ['CR-014', 'CR-015'], origin: 'ملتقطة', label: 'لا وسم', consent: 'مكتملة', decision: 'نشر',
    why: 'منشأ ثابت بتوقيع، وموافقتا الشخصين تغطيان مواد الحملة العامة' },
  { id: 'ص2', file: 'I2.png', from: 'المصمم الداخلي', claim: `رسم توضيحي لخدمة ${SERVICE.ar}.`,
    inspector: 'بيانات اعتماد المحتوى: موجودة، وتوقيعها سليم. الموقِّع: أداة التوليد المعتمدة. نوع المصدر الرقمي: وسائط مولّدة بخوارزمية مدرَّبة.',
    reverse: 'لا نتائج مطابقة.', supplier: 'ولّدتُها بأداة التوليد المعتمدة في 12 نوفمبر 2026. لا تمثّل أشخاصًا حقيقيين.',
    records: ['LR-031'], origin: 'مولّدة', label: LABELS.generated.ar, consent: 'لا تلزم، والترخيص يغطي', decision: 'نشر بوسم',
    why: 'مولّدة بإقرار صانعها وبيانات اعتمادها، ولا شخص حقيقي فيها، وشروط الأداة تجيز الاتصال العام' },
  { id: 'ص3', file: 'I3.png', from: 'مكتبة صور الهيئة', claim: 'متطوعة تساعد في صيانة منزلية بسيطة في الرياض.',
    inspector: 'بيانات اعتماد المحتوى: موجودة، وتوقيعها سليم. نوع المصدر الرقمي: التقاط رقمي. تعديل مسجّل: إزالة عناصر من الخلفية بأداة توليدية (مركَّبة مع وسائط مولّدة).',
    reverse: 'لا نتائج مطابقة.', supplier: 'أزلنا من الخلفية لوحة محل تجاري بأداة التعبئة التوليدية.',
    records: ['CR-016'], origin: 'معدّلة', label: LABELS.edited.ar, consent: 'مكتملة', decision: 'نشر بوسم',
    why: 'صورة حقيقية عُدّلت تعديلًا توليديًا: توسم بأنها معدّلة، وموافقة المتطوعة تغطي الحملة' },
  { id: 'ص4', file: 'I4.png', from: 'منسق إحدى المدن، عبر تطبيق مراسلة', claim: 'من المرحلة التجريبية في أبها.',
    inspector: 'بيانات اعتماد المحتوى: غير موجودة. البيانات الوصفية: محذوفة (تحذفها تطبيقات المراسلة).',
    reverse: 'ثلاث نتائج مطابقة. أقدمها: موقع وكالة «عدسة»، 14 مارس 2023، بعنوان «فعالية خيرية» خارج المملكة.',
    supplier: 'وصلتني في مجموعة المنسقين، وأظنها من أبها.',
    records: [], origin: 'ملتقطة', label: 'لا وسم', consent: 'لا ترخيص ولا موافقة', decision: 'رفض',
    why: 'منسوبة إلى غير مصدرها: البحث العكسي يسبق المرحلة التجريبية بثلاث سنوات، ولا ترخيص عند الهيئة' },
  { id: 'ص5', file: 'I5.png', from: 'مكتب الهيئة في جدة', claim: 'متطوع يرافق مستفيدًا إلى موعده في جدة.',
    inspector: 'بيانات اعتماد المحتوى: غير موجودة. في الزاوية شارة «AI» أضافها تطبيق تصميم عند التصدير.',
    reverse: 'لا نتائج مطابقة. في مكتبة صور الهيئة ملف أصلي للمشهد نفسه: بيانات اعتماده موقّعة، ونوع مصدره التقاط رقمي.',
    supplier: 'قصصنا الصورة في تطبيق تصميم، وهو يضيف الشارة لأنه يستخدم القص الذكي.',
    records: ['CR-018', 'CR-019'], origin: 'ملتقطة', label: 'لا وسم', consent: 'مكتملة', decision: 'نشر',
    why: 'الشارة لا تثبت التوليد: الأصل في المكتبة ملتقط وموقّع. يُنشر الأصل من المكتبة لا النسخة ذات الشارة' },
  { id: 'ص6', file: 'I6.png', from: 'وكالة التصميم المتعاقدة', claim: 'أم هارون، مستفيدة من جدة.',
    inspector: 'بيانات اعتماد المحتوى: غير موجودة. لا علامة مائية.',
    reverse: 'لا نتائج مطابقة.', supplier: 'ولّدها مصممنا لأن تصوير المستفيدين صعب. تصلح مع قصة المستفيدة.',
    records: [], origin: 'مولّدة', label: LABELS.generated.ar, consent: 'لا تلزم لوجه مولّد', decision: 'رفض',
    why: 'وجه مولّد يُقدَّم على أنه مستفيدة حقيقية باسمها: الوسم لا يصلح ذلك. غياب بيانات الاعتماد لم يثبت أنها حقيقية' },
  { id: 'ص7', file: 'I7.png', from: 'مكتبة صور الهيئة', claim: `${PEOPLE.volunteer2.ar} في لقاء تعريفي للمتطوعين في جدة.`,
    inspector: 'بيانات اعتماد المحتوى: موجودة، وتوقيعها سليم. الموقِّع: كاميرا الهيئة. نوع المصدر الرقمي: التقاط رقمي.',
    reverse: 'لا نتائج مطابقة.', supplier: 'من لقاء المتطوعين في جدة، 20 يونيو 2026.',
    records: ['CR-009'], origin: 'ملتقطة', label: 'لا وسم', consent: 'ناقصة: الغرض تقرير داخلي فقط', decision: 'إيقاف',
    why: 'الموافقة المسجّلة لغرض التقرير الداخلي. الحملة العامة غرض جديد يحتاج إلى موافقة جديدة' },
  { id: 'ص8', file: 'I8.png', from: 'أحد موظفي الهيئة', claim: 'الرئيس التنفيذي يكرّم إحدى المستفيدات في حفل الإطلاق.',
    inspector: 'بيانات اعتماد المحتوى: موجودة، وتوقيعها سليم. الموقِّع: أداة توليد صور عامة. نوع المصدر الرقمي: وسائط مولّدة بخوارزمية مدرَّبة.',
    reverse: 'لا نتائج مطابقة.', supplier: 'ولّدتُها من صور الرئيس التنفيذي المنشورة لنجهّز مواد الحفل مبكرًا.',
    records: [], origin: 'مولّدة', label: LABELS.generated.ar, consent: 'لا موافقة من صاحب الهيئة', decision: 'رفض',
    why: 'صورة شخص حقيقي مولّدة بلا موافقته، وتصوّر حدثًا لم يقع: الحفل يوم 10 يناير 2027' }
];

export const RECORDS = [
  { id: 'CR-009', type: 'موافقة', who: PEOPLE.volunteer2.ar, scope: 'التقرير الداخلي للمرحلة التجريبية فقط', date: '20 يونيو 2026' },
  { id: 'CR-014', type: 'موافقة', who: PEOPLE.volunteer.ar, scope: 'مواد الحملة العامة لخدمة مُؤنِس: صور واقتباس', date: '9 نوفمبر 2026' },
  { id: 'CR-015', type: 'موافقة', who: 'مستفيد من أبها، الاسم محفوظ في السجل', scope: 'مواد الحملة العامة لخدمة مُؤنِس: صور', date: '9 نوفمبر 2026' },
  { id: 'CR-016', type: 'موافقة', who: 'متطوعة من الرياض، الاسم محفوظ في السجل', scope: 'مواد الحملة العامة لخدمة مُؤنِس: صور', date: '2 نوفمبر 2026' },
  { id: 'CR-018', type: 'موافقة', who: 'متطوع من جدة، الاسم محفوظ في السجل', scope: 'مواد الحملة العامة لخدمة مُؤنِس: صور', date: '15 أكتوبر 2026' },
  { id: 'CR-019', type: 'موافقة', who: 'مستفيد من جدة، الاسم محفوظ في السجل', scope: 'مواد الحملة العامة لخدمة مُؤنِس: صور', date: '15 أكتوبر 2026' },
  { id: 'LR-027', type: 'ترخيص', who: 'وكالة «عدسة» للصور، الصورة AD-88213', scope: 'استخدام تحريري فقط، لا يشمل الحملات، وتُنسب إلى الوكالة', date: '5 أكتوبر 2026' },
  { id: 'LR-031', type: 'ترخيص', who: 'أداة التوليد المعتمدة', scope: 'مخرجات الأداة يجوز استخدامها في الاتصال العام للهيئة', date: '1 سبتمبر 2026' }
];

/* The scripted second check of the stand-in assistant in lab 1.4, and its tutor turn in lab 2.2. */
export const STANDIN = {
  lab14_second_check: [
    { says: 'عدد المتطوعين المسجلين في المسودة 3,500 والتقرير يقول 3,150.', truth: 'صحيح', issue: 'م1' },
    { says: 'عبارة «الأولى من نوعها في المنطقة» لا مصدر لها في المواد.', truth: 'صحيح', issue: 'م4' },
    { says: 'تاريخ الإطلاق 10 يناير 2027 يبدو خاطئًا: المرحلة التجريبية انتهت في نوفمبر.', truth: 'إنذار كاذب', issue: null },
    { says: 'نسبة الإنجاز 87.6% صحيحة.', truth: 'خطأ فائت', issue: 'م2' }
  ],
  lab22_tutor: [
    'قبل أن أشير إلى شيء: ما الأنواع التي ستقارنها بين النسختين؟ اذكرها ثم قارن نوعًا نوعًا.',
    'في الفقرة الثانية رقمان يتشابهان. ماذا تجد إن قرأتهما رقمًا رقمًا بصوت مسموع في النسختين؟',
    'التاريخ المكتوب أرقامًا يُقرأ بترتيبين. كيف كُتب في مصدرك؟',
    'هل في المسرد ما يقول إن اسمًا لا يُترجم؟ ابحث عنه في المنشور الثالث.'
  ]
};
