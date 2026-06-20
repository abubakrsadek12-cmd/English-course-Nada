import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SESSIONS = [
  // Level 1
  { id: 1, level: 1, topic: "All About Me", arabic: "التعريف بالنفس", keyLang: "My name is… / I love… / I hate… / My favorite … is", listening: "فيديو طفل يعرّف نفسه (1.5 دقيقة) → الطالب يحدد: الاسم، العمر، الهواية", speaking: "Introduce Yourself in 60 Seconds — بدون مساعدة", outcomes: ["يقدم نفسه بـ 5 جمل كاملة", "يذكر اسمه وعمره وهواياته", "يستخدم أفعال المضارع البسيط"], homework: "سجّل فيديو 1 دقيقة تعرّف فيه بنفسك" },
  { id: 2, level: 1, topic: "Daily Routines", arabic: "الروتين اليومي", keyLang: "I wake up at… / First I… then I… / Every day I… / I never…", listening: "صوت شخص يحكي يومه → الطالب يرتب الأنشطة على Jamboard", speaking: "My Morning vs. My Evening — 5 جمل مقارنة", outcomes: ["يصف روتينه اليومي", "يستخدم عبارات الوقت", "يرتب أحداث بشكل منطقي"], homework: "رسالة صوتية قبل النوم: صف روتين بكرة" },
  { id: 3, level: 1, topic: "Food & Eating Habits", arabic: "الطعام والعادات الغذائية", keyLang: "I'd like… / Can I have… / I prefer… to… / It tastes…", listening: "حوار صوتي في مطعم → الطالب يملأ order form", speaking: "Role Play: At the Restaurant — الطالب = العميل", outcomes: ["يعبر عن التفضيلات الغذائية", "يطلب طلبات في مطعم", "يصف مذاق الطعام"], homework: "فيلم نفسك بتطلب أكل بالإنجليزي (الكاميرا = النادل)" },
  { id: 4, level: 1, topic: "My Family & Home", arabic: "العائلة والبيت", keyLang: "My … is … years old / She works as… / We live in… / My favorite place is…", listening: "قصة صوتية عن عائلة → الطالب يرسم شجرة العائلة ويشاركها بالكاميرا", speaking: "Family Photo Show & Tell — صورة حقيقية أو مرسومة", outcomes: ["يصف أفراد عائلته", "يتكلم عن بيته", "يستخدم ضمائر الغائب صح"], homework: "فيديو: عرّف بأفراد عائلتك من صورة" },
  { id: 5, level: 1, topic: "Sports & Physical Activities", arabic: "الرياضة والنشاط البدني", keyLang: "You need to… / The aim is to… / I think … is better because… / In my opinion…", listening: "تعليق صوتي على مباراة (1 دقيقة) → يحدد الرياضة واللاعبين والنتيجة", speaking: "Sell Me Your Sport — اقنعيني إن رياضتك هي الأفضل في دقيقتين", outcomes: ["يتكلم عن رياضته المفضلة", "يصف قواعدها بشكل مبسط", "يعبر عن رأيه بالإنجليزي"], homework: "رسالة صوتية: اقنعني إن رياضتك هي الأفضل" },
  { id: 6, level: 1, topic: "School Life & Subjects", arabic: "الحياة المدرسية", keyLang: "My favorite subject is… because… / I find … difficult / My teacher always…", listening: "مقابلة صوتية مع طالب عن مدرسته → يجيب على 5 أسئلة شفهية", speaking: "My Best Subject & My Worst Subject — اشرح ليه", outcomes: ["يعبر عن تفضيلاته الدراسية", "يتكلم عن مشاكله في المدرسة", "يصف معلمه المفضل"], homework: "صوت: أحسن وأسوأ حاجة في مدرستك الأسبوع ده" },
  { id: 7, level: 1, topic: "Hobbies & Free Time", arabic: "الهوايات ووقت الفراغ", keyLang: "I started… when I was… / To do this you need… / The best thing about it is…", listening: "فيديو عن hobby غريبة → يكتب 3 facts سمعها ويقولها بصوته", speaking: "My Hobby Tutorial in 2 Minutes — اشرح هوايتك كأنك بتعلم حد", outcomes: ["يصف هوايته بالتفصيل", "يشرح كيف تعلمها", "يستخدم التسلسل الزمني"], homework: "فيديو: اعمل tutorial بسيط لهوايتك" },
  { id: 8, level: 1, topic: "Level 1 Review & Mini Presentation", arabic: "مراجعة المستوى الأول", keyLang: "Review of all Level 1 language", listening: "المدرسة تشغل تسجيل الطالب من Session 1 → يقيّم تطوره بنفسه", speaking: "My Mini Presentation — دقيقتين عن أي موضوع مر عليه، بدون أوراق", outcomes: ["يقدم عرض شخصي متكامل", "يلاحظ تطوره الذاتي", "يستخدم مفردات Level 1 بثقة"], homework: "استمع لتسجيلك من Session 1 وابعت رسالة صوتية بردة فعلك" },
  // Level 2
  { id: 9, level: 2, topic: "Technology & Gadgets", arabic: "التكنولوجيا والأجهزة", keyLang: "On one hand… / On the other hand… / I strongly believe… / Research shows…", listening: "بودكاست عن screen time للأطفال → يسجل رأيه: موافق ولا لأ؟", speaking: "Debate: Phones are good for kids — دفاع عن رأيه", outcomes: ["يتكلم عن استخدامه للتكنولوجيا", "يعبر عن الإيجابيات والسلبيات", "يبني رأياً منطقياً"], homework: "فيديو: إيه رأيك في الـ screen time؟ قول رأيك بالإنجليزي" },
  { id: 10, level: 2, topic: "Social Media & Online Safety", arabic: "السوشيال ميديا والأمان الإلكتروني", keyLang: "You should never… / It's important to… / If someone asks you… you must…", listening: "قصة صوتية عن online stranger danger → يحدد الأخطاء", speaking: "My Social Media Rules — 5 قواعد يصممها ويشرحها", outcomes: ["يتكلم عن تجربته مع السوشيال ميديا", "يعرف مصطلحات الأمان الإلكتروني", "يعطي نصائح بثقة"], homework: "فيديو: اشرح قواعد الأمان الإلكتروني اللي انت بتتبعها" },
  { id: 11, level: 2, topic: "Gaming & eSports", arabic: "الألعاب والرياضة الإلكترونية", keyLang: "The objective is… / You win by… / The best strategy is… / Gaming teaches us…", listening: "تعليق على match في لعبة شهيرة → يكتشف ويشرح المفردات الجديدة", speaking: "Explain Your Game to Someone Who's Never Played — تحدي الشرح البسيط", outcomes: ["يشرح لعبته المفضلة بالتفصيل", "يتكلم عن الـ eSports كمجال", "يبني حجة منطقية"], homework: "فيديو: اشرح لعبتك لحد عمره 60 سنة ومش عارف حاجة عن games" },
  { id: 12, level: 2, topic: "Movies, Music & Pop Culture", arabic: "الأفلام والموسيقى والثقافة الشعبية", keyLang: "I'd rate it… / The best part was… / The story is about… / I recommend it because…", listening: "review لفيلم مشهور → يحدد: هل الناقد بيحب الفيلم؟ ليه؟", speaking: "My Review in 2 Minutes — review لفيلم أو أغنية بيحبها", outcomes: ["يراجع فيلم أو أغنية", "يعبر عن رأيه بلغة نقدية", "يوصي بشيء ويبرر توصيته"], homework: "صوت: review 90 ثانية لأي فيلم أو أغنية بتحبها" },
  { id: 13, level: 2, topic: "Travel & Dream Destinations", arabic: "السفر والوجهات الحلمية", keyLang: "I've always wanted to… / Last time I… / The most amazing thing was… / I would…", listening: "وصف صوتي لمدينة بدون اسمها → يخمن المكان من التفاصيل", speaking: "Plan Your Dream Trip — وين، ليه، مع مين، هتعمل إيه", outcomes: ["يصف مكان بالتفصيل", "يستخدم الزمن الماضي بطلاقة", "يتكلم عن رحلة كاملة"], homework: "صوت: صف رحلة أحلامك كأنك موجود فيها دلوقتي" },
  { id: 14, level: 2, topic: "Problems & Solutions", arabic: "المشكلات والحلول", keyLang: "The main issue is… / One solution could be… / This would work because… / However…", listening: "سيناريو مسموع لمشكلة في المدرسة أو البيت → يقترح 3 حلول", speaking: "Solve It! — مشكلة مفاجئة، 3 دقائق يقترح حل كامل", outcomes: ["يحدد مشكلة بوضوح", "يقترح حلول منطقية", "يقنع الآخرين برأيه"], homework: "صوت: حدد مشكلة في حياتك واقترح 3 حلول" },
  { id: 15, level: 2, topic: "Future Plans & Dream Jobs", arabic: "الخطط المستقبلية والمهن", keyLang: "I'm going to… / I want to become… / My dream is to… / I believe I will…", listening: "مقابلة صوتية مع شخص يتكلم عن طموحاته → يحدد الأحلام والأسباب", speaking: "My Future in 5 Years — يتخيل ويشرح مستقبله بالكامل", outcomes: ["يتكلم عن مستقبله بثقة", "يصف وظيفة أحلامه", "يستخدم will / going to / want to بطلاقة"], homework: "فيديو: حياتك بعد 5 سنين — اشرحها كأنها بتحصل دلوقتي" },
  { id: 16, level: 2, topic: "Final Showcase — Grand Presentation", arabic: "العرض النهائي", keyLang: "Full language range from all 16 sessions", listening: "الطالب يسمع تسجيله من Session 1 ويحدد الفرق بصوت عالٍ", speaking: "Final Presentation — 3–5 دقائق، موضوع حر، الطالب يختار ويحضر ويقدم", outcomes: ["يقدم عرض احترافي من 3–5 دقائق", "يستخدم كل المهارات المكتسبة", "يلاحظ تطوره الكامل خلال الكورس"], homework: "🎉 لا واجب — حضّر الـ Final Presentation" },
];

const LESSON_STRUCTURE = [
  { phase: "Warm-Up", color: "#ef4444", duration: 8, teacherPct: 37, studentPct: 63, teacherDo: ["تفتح بسؤال واحد (question of the day)", "تشغل موسيقى هادئة 30 ثانية", "تديها للطالب فوراً"], studentDo: ["يجاوب بـ 3–5 جمل بدون توقف", "يحكي حاجة مرتبطة بالموضوع من الأسبوع", "مسموح يغلط — دي مرحلة تدفئة فقط"] },
  { phase: "Presentation", color: "#f59e0b", duration: 10, teacherPct: 70, studentPct: 30, teacherDo: ["تشرح Language Focus بأمثلة حية (مش قواعد جافة)", "تستخدم Google Slides محضّر مسبقاً", "تشغل الـ Listening Activity", "بعد الاستماع: سؤال واحد بس"], studentDo: ["يسمع ويسجل 3 كلمات جديدة على ورقة", "يجاوب سؤال الاستيعاب بجملة كاملة", "يكرر الجمل الجديدة بصوته مرة واحدة"] },
  { phase: "Practice", color: "#10b981", duration: 22, teacherPct: 23, studentPct: 77, teacherDo: ["Activity A: تسأل والطالب يجاوب ويطوّل (10 دقائق)", "تصحح فقط لو الغلط واضح جداً", "Activity B: تشغّل الأداة التفاعلية (12 دقيقة)"], studentDo: ["Activity A: يجاوب ويطوّل الإجابات (10 دقائق)", "Activity B: يستخدم Jamboard / Padlet / Whiteboard", "يشرح أفكاره بصوته طول الوقت"] },
  { phase: "Production", color: "#6366f1", duration: 15, teacherPct: 13, studentPct: 87, teacherDo: ["تقول التعليمات في جملتين بس", "تصمت وتسمع", "تسجّل ملاحظات للـ Feedback"], studentDo: ["Mini Presentation / Role Play / Storytelling", "يتكلم بشكل مستقل تماماً بدون مساعدة", "يستخدم كل اللغة اللي اتعلمها في الحصة"] },
  { phase: "Wrap-Up & Feedback", color: "#8b5cf6", duration: 5, teacherPct: 60, studentPct: 40, teacherDo: ["Feedback إيجابي أولاً: Today you did well in…", "نقطة واحدة فقط للتطوير (مش قائمة نقد)", "يعطي الواجب في جملة واحدة واضحة"], studentDo: ["يقول جملة: Today I learned…", "يكتب كلمتين جديدتين في دفتر المفردات"] },
];

const POLICY = `🌟 FOUNDATION ENGLISH COURSE
Course Terms & Conditions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. COURSE OVERVIEW
• Duration: 2 Months (8 Weeks)
• Total Sessions: 16 Sessions
• Session Length: 60 Minutes each
• Frequency: 2 Sessions per Week
• Platform: Google Meet
• Focus: Speaking & Listening (70% Student Activity)
• Age Group: 10–14 Years

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. PUNCTUALITY POLICY
✅ الدخول على Google Meet قبل الحصة بـ 3 دقائق على الأقل
⏰ التأخير حتى 10 دقائق: تكمل الحصة من حيث وصل
⚠️ التأخير أكثر من 15 دقيقة بدون إشعار: تُحسب "حاضر متأخر" ولا يتم تعويضها
📌 يرجى الإشعار قبل الحصة بـ 30 دقيقة على الأقل عبر واتساب

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. CANCELLATION & MAKE-UP POLICY
📋 من جانب الطالب:
• يحق تعويض حصة واحدة فقط طوال الكورس مع إشعار مسبق 24 ساعة
• الإلغاء في أقل من 24 ساعة = لا يوجد تعويض
• الغياب بدون إشعار = تُحسب حصة منتهية ولا تُعوَّض

📋 من جانب المدرسة:
• أي حصة تُلغى من جانب المدرسة تُعوَّض بالكامل

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. PAYMENT POLICY
💰 الرسوم تُدفع مقدماً شهرياً قبل بدء كل شهر
• الدفع المقدم هو ما يضمن حجز المقعد والموعد الثابت
• لا يبدأ الشهر الثاني إلا بعد تسديد رسومه
• لا يُسترد الرسوم بعد انعقاد أول حصتين من الشهر
• إنهاء الكورس قبل اكتماله يستوجب إشعاراً قبل 7 أيام

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. TECHNICAL REQUIREMENTS
☐ اتصال إنترنت مستقر
☐ ميكروفون وكاميرا يعملان
☐ مكان هادئ بعيد عن الضوضاء
☐ دفتر وقلم للكلمات الجديدة
☐ عدم استخدام الجهاز لأي شيء آخر خلال الحصة

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6. HOMEWORK & COMMITMENT
• واجب بسيط بعد كل حصة (تسجيل صوتي أو فيديو قصير)
• يُرسل عبر واتساب خلال 48 ساعة من الحصة
• الواجب جزء من المنهج وليس اختيارياً
• التقصير المتكرر يُذكر في تقرير التقدم الشهري

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

بتسجيل الطالب وسداد الرسوم، يُعتبر ولي الأمر موافقاً على جميع البنود أعلاه.

نتمنى لطالبنا رحلة تعلم ممتعة ومثمرة! 🌟`;

// ─── LOCAL STORAGE HELPERS ──────────────────────────────────────────────────

const ls = {
  get: (key, def) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};

// ─── ICONS ───────────────────────────────────────────────────────────────────

const Icon = ({ name, size = 18 }) => {
  const icons = {
    home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
    students: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
    book: "M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
    clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2",
    report: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
    policy: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    copy: "M20 9H11a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
    check: "M20 6L9 17l-5-5",
    plus: "M12 5v14 M5 12h14",
    trash: "M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6",
    download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
    upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    mic: "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v2a7 7 0 01-14 0v-2 M12 19v4 M8 23h8",
    video: "M23 7l-7 5 7 5V7z M1 5h15v14H1z",
    arrow: "M19 12H5 M12 19l-7-7 7-7",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]?.split(" M").map((d, i) => <path key={i} d={i === 0 ? d : "M" + d} />)}
    </svg>
  );
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Badge({ level }) {
  return (
    <span style={{ background: level === 1 ? "#dbeafe" : "#dcfce7", color: level === 1 ? "#1d4ed8" : "#15803d", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, letterSpacing: 0.5 }}>
      Level {level}
    </span>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", ...style }}>{children}</div>;
}

function Btn({ children, onClick, variant = "primary", small = false, icon }) {
  const styles = {
    primary: { background: "#4f46e5", color: "#fff" },
    ghost: { background: "#f1f5f9", color: "#334155" },
    danger: { background: "#fef2f2", color: "#dc2626" },
    green: { background: "#ecfdf5", color: "#059669" },
  };
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: small ? "6px 12px" : "10px 18px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: small ? 13 : 14, fontWeight: 600, transition: "opacity .15s", ...styles[variant] }}
      onMouseOver={e => e.currentTarget.style.opacity = ".85"}
      onMouseOut={e => e.currentTarget.style.opacity = "1"}>
      {icon && <Icon name={icon} size={small ? 14 : 16} />}{children}
    </button>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────────────────────

function Dashboard({ students, reports }) {
  const totalStudents = students.length;
  const level1 = students.filter(s => s.level === "1").length;
  const level2 = students.filter(s => s.level === "2").length;
  const thisMonth = reports.filter(r => { const d = new Date(r.date); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }).length;

  const stats = [
    { label: "إجمالي الطلاب", value: totalStudents, color: "#4f46e5", bg: "#eef2ff" },
    { label: "Level 1 — Foundation", value: level1, color: "#0891b2", bg: "#ecfeff" },
    { label: "Level 2 — Communication", value: level2, color: "#059669", bg: "#ecfdf5" },
    { label: "تقارير الشهر الحالي", value: thisMonth, color: "#d97706", bg: "#fffbeb" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e1b4b", margin: 0 }}>لوحة التحكم</h2>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Foundation English Course — Ages 10–14</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <Card key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <Card>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e1b4b" }}>نظرة سريعة على الحصص الـ 16</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
          {SESSIONS.map(s => (
            <div key={s.id} style={{ padding: "10px 12px", borderRadius: 10, background: s.level === 1 ? "#eff6ff" : "#f0fdf4", border: `1px solid ${s.level === 1 ? "#bfdbfe" : "#bbf7d0"}` }}>
              <div style={{ fontSize: 11, color: s.level === 1 ? "#3b82f6" : "#22c55e", fontWeight: 700 }}>Session {s.id}</div>
              <div style={{ fontSize: 12, color: "#334155", fontWeight: 600, marginTop: 2 }}>{s.topic}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── SYLLABUS ─────────────────────────────────────────────────────────────────

function Syllabus() {
  const [open, setOpen] = useState(null);
  const [filterLv, setFilterLv] = useState(0);
  const filtered = filterLv ? SESSIONS.filter(s => s.level === filterLv) : SESSIONS;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e1b4b", margin: 0 }}>الـ Syllabus — الـ 16 حصة</h2>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2].map(lv => (
            <Btn key={lv} variant={filterLv === lv ? "primary" : "ghost"} small onClick={() => setFilterLv(lv)}>
              {lv === 0 ? "الكل" : `Level ${lv}`}
            </Btn>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, padding: "12px 16px", borderRadius: 12, background: "#eff6ff", border: "1px solid #bfdbfe", fontSize: 13, color: "#1d4ed8" }}>
          <strong>Level 1 — Foundation (Sessions 1–8):</strong> بناء الأساس اللغوي من خلال مواضيع حياتية تناسب 10–14 سنة
        </div>
        <div style={{ flex: 1, padding: "12px 16px", borderRadius: 12, background: "#f0fdf4", border: "1px solid #bbf7d0", fontSize: 13, color: "#15803d" }}>
          <strong>Level 2 — Communication (Sessions 9–16):</strong> تطوير الطلاقة والتفكير النقدي واللغة في سياقات أكثر تعقيداً
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(s => (
          <Card key={s.id} style={{ cursor: "pointer", border: open === s.id ? "2px solid #4f46e5" : "2px solid transparent", transition: "border .2s" }}>
            <div onClick={() => setOpen(open === s.id ? null : s.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: s.level === 1 ? "#eff6ff" : "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: s.level === 1 ? "#3b82f6" : "#22c55e", fontSize: 14 }}>{s.id}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#1e1b4b" }}>{s.topic} <span style={{ color: "#94a3b8", fontWeight: 400 }}>— {s.arabic}</span></div>
                  <Badge level={s.level} />
                </div>
              </div>
              <span style={{ color: "#94a3b8", fontSize: 20 }}>{open === s.id ? "▲" : "▼"}</span>
            </div>
            {open === s.id && (
              <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
                <div style={{ padding: 16, borderRadius: 12, background: "#f8fafc" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#4f46e5", marginBottom: 8, letterSpacing: 0.5 }}>🎯 LEARNING OUTCOMES</div>
                  {s.outcomes.map((o, i) => <div key={i} style={{ fontSize: 13, color: "#334155", display: "flex", gap: 8, marginBottom: 4 }}><span style={{ color: "#10b981" }}>✓</span>{o}</div>)}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ padding: 14, borderRadius: 12, background: "#fffbeb" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#d97706", marginBottom: 8 }}>🎧 LISTENING ACTIVITY</div>
                    <div style={{ fontSize: 13, color: "#334155" }}>{s.listening}</div>
                  </div>
                  <div style={{ padding: 14, borderRadius: 12, background: "#f0fdf4" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#059669", marginBottom: 8 }}>🗣️ SPEAKING ACTIVITY</div>
                    <div style={{ fontSize: 13, color: "#334155" }}>{s.speaking}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ padding: 14, borderRadius: 12, background: "#faf5ff" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", marginBottom: 8 }}>🔑 KEY LANGUAGE</div>
                    <div style={{ fontSize: 13, color: "#334155", fontFamily: "monospace" }}>{s.keyLang}</div>
                  </div>
                  <div style={{ padding: 14, borderRadius: 12, background: "#fff1f2" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#e11d48", marginBottom: 8 }}>📱 HOMEWORK</div>
                    <div style={{ fontSize: 13, color: "#334155" }}>{s.homework}</div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── LESSON TIMER ─────────────────────────────────────────────────────────────

function LessonTimer() {
  const [active, setActive] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const startPhase = (idx) => { setActive(idx); setSeconds(0); setRunning(true); };
  const stopPhase = () => setRunning(false);
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const total = LESSON_STRUCTURE.reduce((a, p) => a + p.duration, 0);
  let cumulative = 0;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e1b4b", margin: 0 }}>هيكل الحصة — 60 دقيقة</h2>
        <div style={{ padding: "8px 16px", borderRadius: 10, background: "#4f46e5", color: "#fff", fontSize: 13, fontWeight: 700 }}>
          70% طالب / 30% مدرسة ✓
        </div>
      </div>

      {/* Timeline bar */}
      <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", marginBottom: 24, height: 12 }}>
        {LESSON_STRUCTURE.map((p, i) => (
          <div key={i} style={{ flex: p.duration, background: p.color, opacity: active === i ? 1 : 0.7 }} title={`${p.phase}: ${p.duration} min`} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {LESSON_STRUCTURE.map((p, i) => { const start = cumulative; cumulative += p.duration; return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
            {p.phase} ({start}–{start + p.duration} min)
          </div>
        ); })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {LESSON_STRUCTURE.map((p, i) => (
          <Card key={i} style={{ border: active === i ? `2px solid ${p.color}` : "2px solid transparent" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: p.color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="clock" size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: "#1e1b4b", fontSize: 16 }}>{p.phase}</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>{p.duration} دقيقة</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {active === i && (
                  <div style={{ fontSize: 24, fontWeight: 900, color: p.color, fontFamily: "monospace" }}>{fmt(seconds)}</div>
                )}
                {active === i && running
                  ? <Btn small variant="ghost" onClick={stopPhase}>⏸ إيقاف</Btn>
                  : <Btn small onClick={() => startPhase(i)} style={{ background: p.color, color: "#fff" }}>▶ ابدأ</Btn>
                }
              </div>
            </div>
            {/* Percentage bars */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[["🧑‍🏫 المدرسة", p.teacherPct, "#f59e0b"], ["🧑‍🎓 الطالب", p.studentPct, p.color]].map(([label, pct, color]) => (
                <div key={label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 4 }}>
                    <span>{label}</span><span style={{ fontWeight: 700, color }}>{pct}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 10, background: "#f1f5f9" }}>
                    <div style={{ height: "100%", borderRadius: 10, background: color, width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["🧑‍🏫 المدرسة تعمل:", p.teacherDo, "#fffbeb"], ["🧑‍🎓 الطالب يعمل:", p.studentDo, "#f0fdf4"]].map(([label, items, bg]) => (
                <div key={label} style={{ padding: 12, borderRadius: 10, background: bg }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8 }}>{label}</div>
                  {items.map((item, j) => (
                    <div key={j} style={{ fontSize: 12, color: "#334155", display: "flex", gap: 6, marginBottom: 4 }}>
                      <span>•</span>{item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── STUDENTS ─────────────────────────────────────────────────────────────────

function Students({ students, setStudents }) {
  const [form, setForm] = useState({ name: "", level: "1", startDate: new Date().toISOString().split("T")[0], phone: "" });
  const [adding, setAdding] = useState(false);

  const add = () => {
    if (!form.name.trim()) return;
    const updated = [...students, { ...form, id: Date.now(), sessions: {} }];
    setStudents(updated);
    ls.set("students", updated);
    setForm({ name: "", level: "1", startDate: new Date().toISOString().split("T")[0], phone: "" });
    setAdding(false);
  };

  const remove = (id) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    ls.set("students", updated);
  };

  const toggleSession = (studentId, sessionId) => {
    const updated = students.map(s => {
      if (s.id !== studentId) return s;
      const sessions = { ...s.sessions, [sessionId]: !s.sessions[sessionId] };
      return { ...s, sessions };
    });
    setStudents(updated);
    ls.set("students", updated);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e1b4b", margin: 0 }}>الطلاب</h2>
        <Btn icon="plus" onClick={() => setAdding(!adding)}>طالب جديد</Btn>
      </div>

      {adding && (
        <Card style={{ marginBottom: 20, border: "2px dashed #c7d2fe" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["اسم الطالب", "name", "text"], ["واتساب ولي الأمر", "phone", "text"], ["تاريخ البدء", "startDate", "date"]].map(([label, key, type]) => (
              <div key={key}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>المستوى</label>
              <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}>
                <option value="1">Level 1 — Foundation</option>
                <option value="2">Level 2 — Communication</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <Btn onClick={add} icon="check">حفظ</Btn>
            <Btn variant="ghost" onClick={() => setAdding(false)}>إلغاء</Btn>
          </div>
        </Card>
      )}

      {students.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>👩‍🎓</div>
          <div style={{ fontWeight: 600 }}>لا يوجد طلاب بعد</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>ابدأ بإضافة أول طالب</div>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {students.map(s => {
            const done = Object.values(s.sessions).filter(Boolean).length;
            const pct = Math.round((done / 16) * 100);
            return (
              <Card key={s.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 17, color: "#1e1b4b" }}>{s.name}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                      <Badge level={parseInt(s.level)} />
                      {s.phone && <span style={{ fontSize: 12, color: "#64748b" }}>📱 {s.phone}</span>}
                      <span style={{ fontSize: 12, color: "#64748b" }}>📅 {s.startDate}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#4f46e5" }}>{done}/16</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>حصة</div>
                    </div>
                    <Btn small variant="danger" icon="trash" onClick={() => remove(s.id)} />
                  </div>
                </div>
                <div style={{ height: 6, borderRadius: 10, background: "#f1f5f9", marginBottom: 12 }}>
                  <div style={{ height: "100%", borderRadius: 10, background: "#4f46e5", width: `${pct}%`, transition: "width .3s" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(16, 1fr)", gap: 4 }}>
                  {SESSIONS.map(sess => (
                    <button key={sess.id} onClick={() => toggleSession(s.id, sess.id)} title={`Session ${sess.id}: ${sess.topic}`}
                      style={{ aspectRatio: "1", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, background: s.sessions[sess.id] ? (sess.level === 1 ? "#3b82f6" : "#22c55e") : "#f1f5f9", color: s.sessions[sess.id] ? "#fff" : "#94a3b8", transition: "background .2s" }}>
                      {sess.id}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>اضغط على رقم الحصة لتسجيل الحضور ✓</div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── REPORTS ──────────────────────────────────────────────────────────────────

const REPORT_FIELDS = {
  attendance: ["حضر الحصتين ✅", "حضر حصة واحدة ⚠️", "غاب 🔴"],
  participation: ["Excellent — spoke confidently throughout", "Good — participated with minor hesitation", "Needs Encouragement — hesitant to speak"],
  fluency: ["Speaks smoothly with few pauses", "Some pauses but manages to communicate", "Struggles to express ideas verbally"],
  vocabulary: ["Used new vocabulary correctly", "Used some new words with guidance", "Relied mostly on familiar words"],
  pronunciation: ["Clear and easy to understand", "Understandable with some effort", "Needs focused practice"],
  listening: ["Understood audio/video without support", "Understood with some teacher help", "Had difficulty following spoken English"],
  homework: ["Submitted on time ✅", "Submitted late ⚠️", "Not submitted 🔴"],
};

function Reports({ students, reports, setReports }) {
  const [sel, setSel] = useState("");
  const [week, setWeek] = useState(1);
  const [form, setForm] = useState({ attendance: "", participation: "", fluency: "", vocabulary: "", pronunciation: "", listening: "", homework: "", highlight: "", focus: "" });
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState("");

  const generate = () => {
    const student = students.find(s => s.id === parseInt(sel));
    if (!student) return;
    const text = `════════════════════════════════════
WEEKLY PROGRESS REPORT
Foundation English Course
════════════════════════════════════

Student   : ${student.name}
Week      : Week ${week} / 8
Date      : ${new Date().toLocaleDateString("ar-EG")}

────────────────────────────────────
ATTENDANCE & PARTICIPATION
────────────────────────────────────
Attendance         : ${form.attendance}
Participation      : ${form.participation}

────────────────────────────────────
SPEAKING SKILLS
────────────────────────────────────
Fluency            : ${form.fluency}
Vocabulary         : ${form.vocabulary}
Pronunciation      : ${form.pronunciation}

────────────────────────────────────
LISTENING SKILLS
────────────────────────────────────
Comprehension      : ${form.listening}

────────────────────────────────────
THIS WEEK'S HIGHLIGHT ⭐
────────────────────────────────────
${form.highlight || "—"}

────────────────────────────────────
FOCUS FOR NEXT WEEK
────────────────────────────────────
${form.focus || "—"}

────────────────────────────────────
HOMEWORK
────────────────────────────────────
${form.homework}

════════════════════════════════════`;
    setGenerated(text);
    const newReport = { id: Date.now(), studentId: parseInt(sel), studentName: student.name, week, date: new Date().toISOString(), ...form, text };
    const updated = [...reports, newReport];
    setReports(updated);
    ls.set("reports", updated);
  };

  const copy = () => { navigator.clipboard.writeText(generated); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e1b4b", marginBottom: 20 }}>تقارير التقدم</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <Card>
            <h3 style={{ margin: "0 0 16px", fontWeight: 700, color: "#1e1b4b" }}>📝 إنشاء تقرير أسبوعي</h3>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>الطالب</label>
              <select value={sel} onChange={e => setSel(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}>
                <option value="">اختر الطالب</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>رقم الأسبوع</label>
              <input type="number" min={1} max={8} value={week} onChange={e => setWeek(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            {Object.entries(REPORT_FIELDS).map(([key, options]) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>
                  {key === "attendance" ? "الحضور" : key === "participation" ? "المشاركة" : key === "fluency" ? "Fluency" : key === "vocabulary" ? "Vocabulary" : key === "pronunciation" ? "Pronunciation" : key === "listening" ? "Listening" : "Homework"}
                </label>
                <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }}>
                  <option value="">اختر...</option>
                  {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            {[["highlight", "This Week's Highlight ⭐ (اكتبي جملة إيجابية)"], ["focus", "Focus for Next Week (نقطة تطوير واحدة)"]].map(([key, label]) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>{label}</label>
                <textarea value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} rows={2}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, resize: "vertical", boxSizing: "border-box" }} />
              </div>
            ))}
            <Btn onClick={generate} icon="report">إنشاء التقرير</Btn>
          </Card>
        </div>

        <div>
          {generated ? (
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontWeight: 700, color: "#1e1b4b" }}>التقرير جاهز ✅</h3>
                <Btn small icon={copied ? "check" : "copy"} variant={copied ? "green" : "primary"} onClick={copy}>
                  {copied ? "تم النسخ!" : "نسخ للواتساب"}
                </Btn>
              </div>
              <pre style={{ fontFamily: "monospace", fontSize: 12, color: "#334155", background: "#f8fafc", padding: 16, borderRadius: 10, whiteSpace: "pre-wrap", lineHeight: 1.7, maxHeight: 480, overflowY: "auto" }}>{generated}</pre>
            </Card>
          ) : (
            <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, color: "#94a3b8", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
              <div style={{ fontWeight: 600 }}>اختر الطالب واملأ البيانات</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>التقرير هيظهر هنا جاهز للنسخ والبعت</div>
            </Card>
          )}

          {reports.length > 0 && (
            <Card style={{ marginTop: 16 }}>
              <h3 style={{ margin: "0 0 12px", fontWeight: 700, color: "#1e1b4b", fontSize: 15 }}>التقارير السابقة ({reports.length})</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 200, overflowY: "auto" }}>
                {[...reports].reverse().map(r => (
                  <div key={r.id} style={{ padding: "8px 12px", borderRadius: 8, background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: 13, color: "#1e1b4b" }}>{r.studentName}</span>
                      <span style={{ fontSize: 12, color: "#94a3b8", marginRight: 8 }}>Week {r.week}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{new Date(r.date).toLocaleDateString("ar-EG")}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ── POLICY ───────────────────────────────────────────────────────────────────

function Policy() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(POLICY); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e1b4b", margin: 0 }}>وثيقة الشروط والقواعد</h2>
        <Btn icon={copied ? "check" : "copy"} variant={copied ? "green" : "primary"} onClick={copy}>
          {copied ? "تم النسخ!" : "نسخ للواتساب"}
        </Btn>
      </div>
      <Card>
        <pre style={{ fontFamily: "monospace", fontSize: 13, color: "#334155", whiteSpace: "pre-wrap", lineHeight: 1.8, margin: 0 }}>{POLICY}</pre>
      </Card>
    </div>
  );
}

// ── BACKUP ───────────────────────────────────────────────────────────────────

function BackupBar({ students, reports, setStudents, setReports }) {
  const exportAll = () => {
    const data = { students, reports, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `english-course-backup-${new Date().toISOString().split("T")[0]}.json`; a.click();
  };
  const importAll = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.students) { setStudents(data.students); ls.set("students", data.students); }
        if (data.reports) { setReports(data.reports); ls.set("reports", data.reports); }
        alert("✅ تم استيراد البيانات بنجاح!");
      } catch { alert("❌ الملف غلط"); }
    };
    reader.readAsText(file);
  };
  return (
    <div style={{ display: "flex", gap: 10, padding: "10px 24px", background: "#1e1b4b", alignItems: "center" }}>
      <span style={{ color: "#a5b4fc", fontSize: 12, marginLeft: "auto" }}>💾 بياناتك محفوظة محلياً</span>
      <Btn small variant="ghost" icon="download" onClick={exportAll}>Export Backup</Btn>
      <label style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10, background: "#f1f5f9", color: "#334155", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
        <Icon name="upload" size={14} />Import
        <input type="file" accept=".json" onChange={importAll} style={{ display: "none" }} />
      </label>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [students, setStudents] = useState(() => ls.get("students", []));
  const [reports, setReports] = useState(() => ls.get("reports", []));

  const tabs = [
    { id: "dashboard", label: "الرئيسية", icon: "home" },
    { id: "syllabus", label: "المنهج", icon: "book" },
    { id: "lesson", label: "هيكل الحصة", icon: "clock" },
    { id: "students", label: "الطلاب", icon: "students" },
    { id: "reports", label: "التقارير", icon: "report" },
    { id: "policy", label: "الشروط", icon: "policy" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", direction: "rtl" }}>
      {/* Header */}
      <div style={{ background: "#1e1b4b", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid #312e81" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎓</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>Foundation English Course</div>
            <div style={{ color: "#a5b4fc", fontSize: 12 }}>Professional Teaching Management System • Ages 10–14</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, padding: "8px 0", overflowX: "auto" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", background: tab === t.id ? "#4f46e5" : "transparent", color: tab === t.id ? "#fff" : "#a5b4fc", transition: "all .2s" }}>
              <Icon name={t.icon} size={15} />{t.label}
            </button>
          ))}
        </div>
      </div>

      <BackupBar students={students} reports={reports} setStudents={setStudents} setReports={setReports} />

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
        {tab === "dashboard" && <Dashboard students={students} reports={reports} />}
        {tab === "syllabus" && <Syllabus />}
        {tab === "lesson" && <LessonTimer />}
        {tab === "students" && <Students students={students} setStudents={setStudents} />}
        {tab === "reports" && <Reports students={students} reports={reports} setReports={setReports} />}
        {tab === "policy" && <Policy />}
      </div>
    </div>
  );
}
