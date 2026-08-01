import { Link } from "react-router";
import { BookOpen, Brain, MessageCircle, TrendingUp, Upload, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: "ملخصات ذكية",
      description: "تلخيص تلقائي للفصول بالذكاء الاصطناعي يجيب أهم النقاط في ثواني",
    },
    {
      icon: BookOpen,
      title: "اختبارات تلقائية",
      description: "تمرن بأسئلة ذكية متخصصة لمادتك اللي بتذاكرها",
    },
    {
      icon: MessageCircle,
      title: "مساعد مذاكرة AI",
      description: "اسأل أي سؤال وهيجاوبك فوراً من ملفاتك",
    },
    {
      icon: TrendingUp,
      title: "متابعة التقدم",
      description: "شوف تقدمك بالرسومات واعرف نقاط ضعفك",
    },
  ];

  return (
    <div className="min-vh-100 bg-gradient-light-purple">
      <nav className="border-bottom bg-glass sticky-top z-3">
        <div className="container-lg px-4 py-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-3 bg-gradient-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="fs-5 fw-semibold">رفيق المذاكرة</span>
          </div>
          <Link
            to="/dashboard"
            className="btn btn-primary rounded-3 px-4 py-2 shadow-sm"
          >
            ابدأ دلوقتي
          </Link>
        </div>
      </nav>

      <section className="container-lg px-4 pt-5 pb-5 text-center mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-primary bg-opacity-10 text-primary mb-4">
            <Sparkles size={16} />
            <span className="small fw-medium">تعليم بالذكاء الاصطناعي</span>
          </div>

          <h1 className="display-4 fw-bold mb-4 text-gradient-primary">
            حول ملفات المذاكرة<br />لتجربة تعليم ذكية
          </h1>

          <p className="fs-5 text-secondary mx-auto mb-5" style={{ maxWidth: '600px' }}>
            ارفع مذكراتك وخلي الذكاء الاصطناعي يعملك ملخصات واختبارات وشرح مخصص ليك. ذاكر بذكاء مش بمجهود.
          </p>

          <Link
            to="/upload"
            className="btn btn-primary rounded-3 px-5 py-3 shadow fs-5 d-inline-flex align-items-center gap-2"
          >
            <Upload size={20} />
            ارفع أول ملف PDF
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 rounded-4 border border-light bg-glass p-4 p-md-5 shadow-lg"
        >
          <div className="ratio ratio-21x9 rounded-3 bg-light d-flex align-items-center justify-content-center" style={{ backgroundColor: '#EEF2FF' }}>
            <div className="text-center d-flex flex-column align-items-center justify-content-center h-100 placeholder-glow">
              <BookOpen size={64} className="text-primary mb-3" />
              <p className="text-secondary mb-0">Interactive Study Dashboard Preview</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container-lg px-4 py-5 mb-5 mt-5">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">كل حاجة محتاجها عشان تتفوق</h2>
          <p className="fs-5 text-secondary">مميزات قوية مصممة للطلبة المعاصرين</p>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={feature.title} className="col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 p-lg-5 rounded-4 border bg-white shadow-sm h-100"
                style={{ transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div className="rounded-3 d-flex align-items-center justify-content-center mb-4" style={{ width: '56px', height: '56px', backgroundColor: '#EEF2FF' }}>
                  <feature.icon size={28} className="text-primary" />
                </div>
                <h3 className="h4 fw-semibold mb-3">{feature.title}</h3>
                <p className="text-secondary fs-5 mb-0">{feature.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      <section className="container px-4 py-5 text-center mb-5">
        <div className="rounded-4 bg-gradient-primary p-5 text-white shadow-lg">
          <h2 className="display-6 fw-bold mb-3">جاهز تغير طريقة مذاكرتك؟</h2>
          <p className="fs-5 opacity-75 mb-5">انضم لآلاف الطلاب اللي بيذاكروا بذكاء كل يوم</p>
          <Link
            to="/upload"
            className="btn btn-light text-primary rounded-3 px-5 py-3 fs-5 fw-medium shadow d-inline-flex align-items-center gap-2"
          >
            <Upload size={20} />
            ابدأ المذاكرة دلوقتي
          </Link>
        </div>
      </section>
    </div>
  );
}
