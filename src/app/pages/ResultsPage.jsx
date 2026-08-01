import { useParams, Link } from "react-router";
import { Trophy, TrendingUp, AlertCircle, RotateCcw, Home } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export function ResultsPage() {
  const { id } = useParams();

  const score = 67;
  const totalQuestions = 10;
  const correctAnswers = 7;
  const incorrectAnswers = 3;

  useEffect(() => {
    if (score >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [score]);

  const pieData = [
    { name: "صحيح", value: correctAnswers, color: "#22C55E" },
    { name: "خطأ", value: incorrectAnswers, color: "#ef4444" },
  ];

  const weakAreas = [
    { topic: "التراكب الكمي", questionsWrong: 2 },
    { topic: "الدوال الموجية", questionsWrong: 1 },
  ];

  return (
    <div className="min-vh-100 bg-light p-4 p-md-5">
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <div className="mx-auto mb-4 rounded-circle bg-gradient-primary d-flex align-items-center justify-content-center" style={{ width: '96px', height: '96px' }}>
            <Trophy size={48} className="text-white" />
          </div>
          <h1 className="display-5 fw-bold mb-3">الاختبار اكتمل!</h1>
          <p className="fs-5 text-secondary">
            {score >= 70 ? "شغل رائع! كمل كده!" : "مجهود كويس! راجع المواضيع اللي تحت."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-primary rounded-4 p-5 text-white text-center mb-5 shadow-lg"
        >
          <h2 className="display-1 fw-bold mb-2">{score}%</h2>
          <p className="fs-5 opacity-75">درجتك</p>
          <div className="d-flex align-items-center justify-content-center gap-5 mt-4">
            <div>
              <p className="h2 fw-bold mb-1">{correctAnswers}/{totalQuestions}</p>
              <p className="opacity-75 mb-0">إجابات صحيحة</p>
            </div>
            <div className="bg-white opacity-25" style={{ width: '1px', height: '64px' }} />
            <div>
              <p className="h2 fw-bold mb-1">10:23</p>
              <p className="opacity-75 mb-0">الوقت المستغرق</p>
            </div>
          </div>
        </motion.div>

        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border rounded-4 p-4 shadow-sm h-100"
            >
              <h3 className="h5 fw-semibold mb-4">توزيع الإجابات</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <div className="col-md-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border rounded-4 p-4 shadow-sm h-100"
            >
              <h3 className="h5 fw-semibold mb-4">تحليل الأداء</h3>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-success bg-opacity-10">
                  <TrendingUp size={24} className="text-success" />
                  <div>
                    <p className="fw-medium mb-0">فهم قوي</p>
                    <p className="small text-secondary mb-0">مبدأ هايزنبرج</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-warning bg-opacity-10">
                  <AlertCircle size={24} className="text-warning" />
                  <div>
                    <p className="fw-medium mb-0">محتاج مراجعة</p>
                    <p className="small text-secondary mb-0">المؤثرات الكمية</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-primary bg-opacity-10">
                  <Trophy size={24} className="text-primary" />
                  <div>
                    <p className="fw-medium mb-0">السرعة</p>
                    <p className="small text-secondary mb-0">أسرع من 68% من المستخدمين</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border rounded-4 p-4 p-md-5 mb-5 shadow-sm"
        >
          <div className="d-flex align-items-center gap-3 mb-4">
            <AlertCircle size={24} className="text-danger" />
            <h3 className="h5 fw-semibold mb-0">مواضيع للمراجعة</h3>
          </div>

          <div className="d-flex flex-column gap-3 mb-4">
            {weakAreas.map((area, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between p-3 rounded-4 bg-light">
                <div>
                  <h4 className="fw-semibold h6 mb-1">{area.topic}</h4>
                  <p className="small text-secondary mb-0">
                    {area.questionsWrong} {area.questionsWrong === 1 ? "سؤال" : "أسئلة"} غلط
                  </p>
                </div>
                <Link
                  to={`/summary/${id}`}
                  className="btn btn-primary rounded-3 px-4"
                >
                  راجع
                </Link>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-4 border bg-primary bg-opacity-10 text-dark">
            <p className="small mb-0">
              💡 <strong>نصيحة:</strong> راجع الملخص للمواضيع دي وجرب الدردشة مع الـ AI عشان تسأل أسئلة محددة عن المفاهيم اللي كانت صعبة.
            </p>
          </div>
        </motion.div>

        <div className="row g-3">
          <div className="col-md-4">
            <Link
              to="/dashboard"
              className="btn w-100 bg-white border border-2 py-3 rounded-4 text-dark d-flex align-items-center justify-content-center gap-2 btn-hover-primary"
            >
              <Home size={20} />
              لوحة التحكم
            </Link>
          </div>
          <div className="col-md-4">
            <Link
              to={`/quiz/${id}`}
              className="btn w-100 bg-white border border-2 py-3 rounded-4 text-dark d-flex align-items-center justify-content-center gap-2 btn-hover-success"
            >
              <RotateCcw size={20} />
              أعد الاختبار
            </Link>
          </div>
          <div className="col-md-4">
            <Link
              to={`/summary/${id}`}
              className="btn btn-primary w-100 py-3 rounded-4 border-2 border-primary d-flex align-items-center justify-content-center gap-2 shadow-sm"
            >
              راجع نقاط الضعف
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        .btn-hover-primary:hover { border-color: var(--bs-primary) !important; background-color: #f8f9fa !important; }
        .btn-hover-success:hover { border-color: var(--bs-success) !important; background-color: #f8f9fa !important; }
      `}</style>
    </div>
  );
}
