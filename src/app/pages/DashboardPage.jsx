import { Link } from "react-router";
import { BookOpen, Brain, Clock, Target, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { motion } from "motion/react";

export function DashboardPage() {
  const subjects = [
    { id: "1", name: "رياضيات متقدمة", progress: 75, lastStudied: "من ساعتين", color: "#4F46E5" },
    { id: "2", name: "فيزياء: ميكانيكا الكم", progress: 45, lastStudied: "من يوم", color: "#22C55E" },
    { id: "3", name: "خوارزميات علوم الحاسب", progress: 90, lastStudied: "من 3 ساعات", color: "#f59e0b" },
    { id: "4", name: "أحياء: التركيب الخلوي", progress: 30, lastStudied: "من يومين", color: "#ec4899" },
  ];

  const weeklyData = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.2 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 4.1 },
    { day: "Fri", hours: 3.5 },
    { day: "Sat", hours: 5.2 },
    { day: "Sun", hours: 2.9 },
  ];

  const performanceData = [
    { subject: "Math", score: 85 },
    { subject: "Physics", score: 72 },
    { subject: "CS", score: 95 },
    { subject: "Biology", score: 68 },
  ];

  return (
    <div className="min-vh-100 bg-light p-4 p-md-5">
      <div className="container-lg">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div>
            <h1 className="display-6 fw-bold mb-2">أهلاً بيك يا طالب!</h1>
            <p className="fs-5 text-secondary mb-0">
              دي نظرة عامة على تقدمك في المذاكرة
            </p>
          </div>
          <Link
            to="/upload"
            className="btn btn-primary rounded-3 px-4 py-2 shadow-sm"
          >
            ارفع مادة جديدة
          </Link>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-primary rounded-4 p-4 text-white shadow"
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Target size={40} className="opacity-75" />
                <span className="fs-1 fw-bold">75%</span>
              </div>
              <h3 className="h5 fw-medium opacity-100 mb-1">التقدم الكلي</h3>
              <p className="small opacity-75 mb-0">كمل كده، ماشي حلو!</p>
            </motion.div>
          </div>

          <div className="col-md-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border rounded-4 p-4 shadow-sm h-100"
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Clock size={40} className="text-success" />
                <span className="fs-1 fw-bold">23.2 ساعة</span>
              </div>
              <h3 className="h5 fw-medium mb-1">وقت المذاكرة الأسبوع ده</h3>
              <p className="small text-secondary mb-0">زيادة 12% عن الأسبوع اللي فات</p>
            </motion.div>
          </div>

          <div className="col-md-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border rounded-4 p-4 shadow-sm h-100"
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Brain size={40} className="text-warning" />
                <span className="fs-1 fw-bold">4</span>
              </div>
              <h3 className="h5 fw-medium mb-1">المواد النشطة</h3>
              <p className="small text-secondary mb-0">2 محتاجين تركيز</p>
            </motion.div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border rounded-4 p-4 shadow-sm"
            >
              <h3 className="h5 fw-semibold mb-4">ساعات المذاكرة الأسبوعية</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="hours" stroke="#4F46E5" strokeWidth={3} dot={{ fill: "#4F46E5", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white border rounded-4 p-4 shadow-sm"
            >
              <h3 className="h5 fw-semibold mb-4">الأداء حسب المادة</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="subject" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="score" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>

        <div className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="h3 fw-bold mb-0">موادك</h2>
            <Link to="/upload" className="text-primary text-decoration-none border-bottom border-primary">
              ضيف مادة جديدة
            </Link>
          </div>

          <div className="row g-4">
            {subjects.map((subject, index) => (
              <div key={subject.id} className="col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white border rounded-4 p-4 shadow-sm h-100 d-flex flex-column"
                >
                  <div className="d-flex align-items-start justify-content-between mb-4">
                    <div className="flex-grow-1">
                      <h3 className="h5 fw-semibold mb-2" style={{ transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = '#4F46E5'} onMouseLeave={(e) => e.target.style.color = ''}>
                        {subject.name}
                      </h3>
                      <p className="small text-secondary mb-0">
                        آخر مذاكرة: {subject.lastStudied}
                      </p>
                    </div>
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{ backgroundColor: `${subject.color}15`, width: '48px', height: '48px' }}
                    >
                      <BookOpen size={24} style={{ color: subject.color }} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="small text-secondary">التقدم</span>
                      <span className="small fw-semibold">{subject.progress}%</span>
                    </div>
                    <div className="progress bg-light" style={{ height: '8px' }}>
                      <div
                        className="progress-bar rounded-pill"
                        style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-auto">
                    <Link
                      to={`/summary/${subject.id}`}
                      className="btn btn-light flex-grow-1 border-0"
                    >
                      ملخص
                    </Link>
                    <Link
                      to={`/quiz/${subject.id}`}
                      className="btn btn-light flex-grow-1 border-0"
                    >
                      اختبار
                    </Link>
                    <Link
                      to={`/chat/${subject.id}`}
                      className="btn btn-light flex-grow-1 border-0"
                    >
                      دردشة
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-4 p-4"
          style={{ backgroundImage: 'linear-gradient(to right, #FEF3C7, #FDE68A)', border: '1px solid rgba(245, 158, 11, 0.2)' }}
        >
          <div className="d-flex align-items-start gap-3">
            <AlertCircle size={24} className="text-warning mt-1 flex-shrink-0" />
            <div className="flex-grow-1">
              <h3 className="h5 fw-semibold mb-2">لقينا نقاط ضعف</h3>
              <p className="text-secondary mb-3">
                عندك صعوبة في "الديناميكا الحرارية" في الفيزياء و"انقسام الخلايا" في الأحياء. ننصحك تراجع الموضوعات دي.
              </p>
              <Link
                to="/profile"
                className="btn btn-warning text-white rounded-3 px-4"
              >
                راجع نقاط الضعف
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
