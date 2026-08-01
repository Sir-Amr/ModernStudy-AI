import { Link } from "react-router";
import { BookOpen, Brain, MessageCircle, TrendingUp, Upload, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

export function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const features = [
    {
      icon: Brain,
      title: "ملخصات ذكية",
      description: "تلخيص تلقائي للفصول بالذكاء الاصطناعي يجيب أهم النقاط في ثواني",
      color: "#4F46E5",
      delay: 0.1,
    },
    {
      icon: BookOpen,
      title: "اختبارات تلقائية",
      description: "تمرن بأسئلة ذكية متخصصة لمادتك اللي بتذاكرها",
      color: "#22C55E",
      delay: 0.2,
    },
    {
      icon: MessageCircle,
      title: "مساعد مذاكرة AI",
      description: "اسأل أي سؤال وهيجاوبك فوراً من ملفاتك",
      color: "#f59e0b",
      delay: 0.3,
    },
    {
      icon: TrendingUp,
      title: "متابعة التقدم",
      description: "شوف تقدمك بالرسومات واعرف نقاط ضعفك",
      color: "#ec4899",
      delay: 0.4,
    },
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prev => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-vh-100 bg-gradient-light-purple" ref={containerRef}>
      {/* Navbar with glass effect */}
      <motion.nav
        className="border-bottom bg-glass sticky-top z-3"
        style={{ backdropFilter: 'blur(12px)' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container-lg px-4 py-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
              className="rounded-3 bg-gradient-primary d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
            >
              <Sparkles size={20} className="text-white" />
            </motion.div>
            <span className="fs-5 fw-semibold">رفيق المذاكرة</span>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/dashboard"
              className="btn btn-primary rounded-3 px-4 py-2 shadow-sm"
            >
              ابدأ دلوقتي
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="container-lg px-4 pt-5 pb-5 text-center mt-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity, scale }}
        >
          <motion.div
            className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-primary bg-opacity-10 text-primary mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={16} />
            </motion.span>
            <span className="small fw-medium">تعليم بالذكاء الاصطناعي</span>
          </motion.div>

          <h1 className="display-4 fw-bold mb-4 text-gradient-primary">
            حول ملفات المذاكرة<br />لتجربة تعليم ذكية
          </h1>

          <p className="fs-5 text-secondary mx-auto mb-5" style={{ maxWidth: '600px' }}>
            ارفع مذكراتك وخلي الذكاء الاصطناعي يعملك ملخصات واختبارات وشرح مخصص ليك. ذاكر بذكاء مش بمجهود.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/upload"
              className="btn btn-primary rounded-3 px-5 py-3 shadow fs-5 d-inline-flex align-items-center gap-2"
            >
              <Upload size={20} />
              ارفع أول ملف PDF
            </Link>
          </motion.div>

          {/* Counter stats */}
          <motion.div
            className="d-flex justify-content-center gap-5 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div>
              <motion.span
                className="display-6 fw-bold text-primary"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {counter}%
              </motion.span>
              <p className="text-secondary small">سرعة الفهم</p>
            </div>
            <div>
              <span className="display-6 fw-bold text-success">4.8</span>
              <p className="text-secondary small">تقييم المستخدمين</p>
            </div>
            <div>
              <span className="display-6 fw-bold text-warning">10K+</span>
              <p className="text-secondary small">ملفات تمت معالجتها</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-5 rounded-4 border border-light bg-glass p-4 p-md-5 shadow-lg position-relative overflow-hidden"
        >
          <div className="ratio ratio-21x9 rounded-3 bg-light d-flex align-items-center justify-content-center position-relative" style={{ backgroundColor: '#EEF2FF' }}>
            <motion.div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(124, 58, 237, 0.05))',
                zIndex: 1
              }}
            />
            <div className="text-center d-flex flex-column align-items-center justify-content-center h-100 position-relative" style={{ zIndex: 2 }}>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <BookOpen size={64} className="text-primary mb-3" />
              </motion.div>
              <p className="text-secondary mb-0">معاينة لوحة المذاكرة التفاعلية</p>
              <motion.div
                className="mt-3 d-flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="rounded-3 bg-primary bg-opacity-10"
                    style={{ width: '12px', height: '12px' }}
                    animate={{
                      scale: [1, 1.5, 1],
                      backgroundColor: ['rgba(79,70,229,0.1)', 'rgba(79,70,229,0.3)', 'rgba(79,70,229,0.1)']
                    }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section with Interactive Cards */}
      <section className="container-lg px-4 py-5 mb-5 mt-5">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="display-6 fw-bold mb-3">كل حاجة محتاجها عشان تتفوق</h2>
          <p className="fs-5 text-secondary">مميزات قوية مصممة للطلبة المعاصرين</p>
        </motion.div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={feature.title} className="col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 p-lg-5 rounded-4 border bg-white shadow-sm h-100 position-relative overflow-hidden"
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 60px rgba(79,70,229,0.15)',
                  transition: { type: "spring", stiffness: 300 }
                }}
                onMouseEnter={(e) => {
                  const icon = e.currentTarget.querySelector('.feature-icon');
                  if (icon) icon.style.transform = 'scale(1.2) rotate(10deg)';
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.querySelector('.feature-icon');
                  if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <motion.div
                  className="feature-icon rounded-3 d-flex align-items-center justify-content-center mb-4"
                  style={{ width: '56px', height: '56px', backgroundColor: `${feature.color}15`, transition: 'transform 0.3s' }}
                  whileHover={{ scale: 1.1 }}
                >
                  <feature.icon size={28} style={{ color: feature.color }} />
                </motion.div>
                <h3 className="h4 fw-semibold mb-3">{feature.title}</h3>
                <p className="text-secondary fs-5 mb-0">{feature.description}</p>

                {/* Animated gradient border on hover */}
                <motion.div
                  className="position-absolute bottom-0 start-0 h-1"
                  style={{ backgroundColor: feature.color, height: '3px' }}
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section with Parallax */}
      <section className="container px-4 py-5 text-center mb-5">
        <motion.div
          className="rounded-4 bg-gradient-primary p-5 text-white shadow-lg position-relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="position-absolute rounded-circle bg-white"
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                opacity: 0.1 + Math.random() * 0.2,
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <div className="position-relative" style={{ zIndex: 1 }}>
            <motion.h2
              className="display-6 fw-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              جاهز تغير طريقة مذاكرتك؟
            </motion.h2>
            <motion.p
              className="fs-5 opacity-75 mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              انضم لآلاف الطلاب اللي بيذاكروا بذكاء كل يوم
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/upload"
                className="btn btn-light text-primary rounded-3 px-5 py-3 fs-5 fw-medium shadow d-inline-flex align-items-center gap-2"
              >
                <Upload size={20} />
                ابدأ المذاكرة دلوقتي
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}