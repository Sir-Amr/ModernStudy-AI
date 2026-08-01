import { useState } from "react";
import { useParams, Link } from "react-router";
import { ChevronLeft, BookOpen, Sparkles, ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export function SummaryPage() {
  const { id } = useParams();
  const [summaryMode, setSummaryMode] = useState("short");
  const [expandedChapters, setExpandedChapters] = useState(new Set([0]));

  const chapters = [
    {
      title: "الفصل 1: مقدمة في ميكانيكا الكم",
      shortSummary: [
        "ميكانيكا الكم بتوصف الطبيعة على أصغر مستويات الطاقة",
        "ازدواجية الموجة-الجسيم: الجسيمات بتظهر خصائص موجية وجسيمية",
        "مبدأ عدم اليقين لهايزنبرج بيحدد دقة القياسات",
      ],
      detailedSummary: [
        "ميكانيكا الكم هي نظرية أساسية في الفيزياء بتوصف الطبيعة على أصغر مستويات الطاقة للذرات والجسيمات تحت الذرية",
        "ازدواجية الموجة-الجسيم بتوضح إن الجسيمات الأولية بتظهر خصائص موجية وجسيمية حسب الظروف التجريبية",
        "مبدأ عدم اليقين لهايزنبرج بيقول إن أزواج معينة من الخصائص الفيزيائية مش ممكن تتعرف بدقة تعسفية",
        "التراكب الكمي بيسمح للجسيمات تكون في حالات متعددة في نفس الوقت لحد ما تتقاس",
        "التشابك الكمي بينشئ ارتباطات بين الجسيمات بتستمر بغض النظر عن المسافة",
      ],
      keywords: ["ازدواجية الموجة-الجسيم", "مبدأ عدم اليقين", "التراكب الكمي"],
    },
    {
      title: "الفصل 2: معادلة شرودنجر",
      shortSummary: [
        "معادلة رياضية بتوصف تطور الأنظمة الكمية مع الوقت",
        "الحلول بتوفر توزيعات احتمالية لمواضع الجسيمات",
        "أساس لفهم السلوك الذري والجزيئي",
      ],
      detailedSummary: [
        "معادلة شرودنجر هي معادلة تفاضلية جزئية خطية بتوصف إزاي الحالة الكمية لنظام فيزيائي بتتغير مع الزمن",
        "الحلول للمعادلة بتوفر دوال موجية بتحدد التوزيعات الاحتمالية لموضع وزخم الجسيم",
        "معادلة شرودنجر المستقلة عن الزمن بتستخدم للأنظمة في حالات ثابتة",
        "التطبيقات بتشمل تركيب ذرة الهيدروجين، النفق الكمي، والترابط الجزيئي",
      ],
      keywords: ["الدالة الموجية", "التوزيع الاحتمالي", "الحالات الثابتة"],
    },
    {
      title: "الفصل 3: الحالات الكمية والمؤثرات",
      shortSummary: [
        "الحالات الكمية بتمثل معلومات كاملة عن النظام",
        "المؤثرات بتمثل الكميات الفيزيائية القابلة للرصد",
        "القيم الذاتية بتمثل النتائج المحتملة للقياس",
      ],
      detailedSummary: [
        "الحالات الكمية بتتمثل بمتجهات في فضاء هلبرت المعقد",
        "الكميات القابلة للرصد بتتمثل بمؤثرات هيرميتية بتعمل على الحالات الكمية",
        "القيم الذاتية للمؤثرات بتمثل النتائج المحتملة للقياسات",
        "عملية القياس بتخلي الحالة الكمية تنهار لحالة ذاتية",
      ],
      keywords: ["فضاء هلبرت", "المؤثرات الهيرميتية", "القيم الذاتية"],
    },
  ];

  const toggleChapter = (index) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedChapters(newExpanded);
  };

  return (
    <div className="min-vh-100 bg-light p-4 p-md-5">
      <div className="container" style={{ maxWidth: "800px" }}>
        <Link
          to="/dashboard"
          className="d-inline-flex align-items-center gap-2 text-secondary text-decoration-none mb-4 link-dark"
          style={{ transition: "color 0.2s" }}
        >
          <ChevronLeft size={16} />
          رجوع للوحة التحكم
        </Link>

        <div className="d-flex align-items-start justify-content-between mb-5 flex-wrap gap-3">
          <div>
            <h1 className="h1 fw-bold mb-2">فيزياء: ميكانيكا الكم</h1>
            <p className="fs-5 text-secondary">ملخص بالذكاء الاصطناعي</p>
          </div>
          <div className="d-flex gap-2 bg-light border p-1 rounded-3 h-100">
            <button
              onClick={() => setSummaryMode("short")}
              className={`btn border-0 py-2 px-4 rounded-3 ${
                summaryMode === "short"
                  ? "bg-white shadow-sm text-dark"
                  : "text-secondary"
              }`}
            >
              مختصر
            </button>
            <button
              onClick={() => setSummaryMode("detailed")}
              className={`btn border-0 py-2 px-4 rounded-3 ${
                summaryMode === "detailed"
                  ? "bg-white shadow-sm text-dark"
                  : "text-secondary"
              }`}
            >
              تفصيلي
            </button>
          </div>
        </div>

        <div className="d-flex flex-column gap-3">
          {chapters.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border rounded-4 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleChapter(index)}
                className="btn w-100 border-0 p-4 d-flex align-items-center justify-content-between text-start"
                style={{ backgroundColor: "transparent" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", backgroundColor: "#EEF2FF" }}>
                    <BookOpen size={24} className="text-primary" />
                  </div>
                  <h3 className="h5 fw-semibold mb-0">{chapter.title}</h3>
                </div>
                {expandedChapters.has(index) ? (
                  <ChevronDown size={20} className="text-secondary" />
                ) : (
                  <ChevronRight size={20} className="text-secondary" />
                )}
              </button>

              {expandedChapters.has(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-top p-4"
                >
                  <div className="d-flex flex-column gap-3 mb-4">
                    {(summaryMode === "short" ? chapter.shortSummary : chapter.detailedSummary).map(
                      (point, pointIndex) => (
                        <div key={pointIndex} className="d-flex gap-3">
                          <div className="rounded-circle bg-primary flex-shrink-0 mt-2" style={{ width: "8px", height: "8px" }} />
                          <p className="text-dark mb-0 lh-lg">{point}</p>
                        </div>
                      )
                    )}
                  </div>

                  <div className="pt-3 border-top">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Sparkles size={16} className="text-primary" />
                      <span className="small fw-medium text-secondary">
                        المفاهيم الأساسية
                      </span>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {chapter.keywords.map((keyword, kwIndex) => (
                        <span
                          key={kwIndex}
                          className="badge rounded-pill px-3 py-2 fw-medium"
                          style={{ backgroundColor: "#EEF2FF", color: "#4F46E5" }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-5 d-flex gap-3">
          <Link
            to={`/quiz/${id}`}
            className="btn btn-primary flex-grow-1 px-4 py-3 rounded-3 shadow-sm"
          >
            ابدأ الاختبار
          </Link>
          <Link
            to={`/chat/${id}`}
            className="btn btn-success flex-grow-1 px-4 py-3 rounded-3 shadow-sm"
          >
            اسأل الذكاء الاصطناعي
          </Link>
        </div>
      </div>
    </div>
  );
}
