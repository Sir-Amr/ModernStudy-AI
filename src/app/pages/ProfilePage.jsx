import { Link } from "react-router";
import { User, Trophy, TrendingUp, AlertCircle, Calendar, Target, Award } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { motion } from "motion/react";

export function ProfilePage() {
  const weeklyProgress = [
    { week: "أسبوع 1", hours: 12, quizScore: 65 },
    { week: "أسبوع 2", hours: 15, quizScore: 72 },
    { week: "أسبوع 3", hours: 18, quizScore: 78 },
    { week: "أسبوع 4", hours: 23, quizScore: 85 },
  ];

  const strengthsWeaknesses = [
    { subject: "رياضيات", strength: 90, weakness: 40 },
    { subject: "فيزياء", strength: 70, weakness: 65 },
    { subject: "حاسب", strength: 95, weakness: 30 },
    { subject: "أحياء", strength: 60, weakness: 70 },
  ];

  const radarData = [
    { skill: "الفهم", value: 85 },
    { skill: "الذاكرة", value: 75 },
    { skill: "حل المشاكل", value: 90 },
    { skill: "السرعة", value: 70 },
    { skill: "الاستمرارية", value: 80 },
  ];

  const achievements = [
    { icon: Trophy, title: "أول اختبار", description: "خلصت أول اختبار ليك", color: "#f59e0b" },
    { icon: Target, title: "5 أيام متتالية", description: "ذاكرت 5 أيام على التوالي", color: "#22C55E" },
    { icon: Award, title: "درجة 90%", description: "حققت 90% أو أكتر في اختبار", color: "#4F46E5" },
  ];

  return (
    <div className="min-vh-100 bg-light p-4 p-md-5">
      <div className="container-lg">
        <div className="d-flex align-items-start justify-content-between mb-5 flex-wrap gap-4">
          <div className="d-flex align-items-center gap-4">
            <div className="rounded-4 bg-gradient-primary d-flex align-items-center justify-content-center" style={{ width: '96px', height: '96px' }}>
              <User size={48} className="text-white" />
            </div>
            <div>
              <h1 className="h2 fw-bold mb-1">الملف الشخصي</h1>
              <p className="fs-6 text-secondary mb-3">عضو من يناير 2026</p>
              <div className="d-flex gap-2">
                <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 fw-medium">
                  المستوى 5
                </span>
                <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2 fw-medium">
                  5 أيام متتالية 🔥
                </span>
              </div>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="btn btn-outline-secondary bg-white px-4 py-2 rounded-3"
          >
            رجوع للوحة التحكم
          </Link>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border rounded-4 p-4 shadow-sm h-100"
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Trophy size={40} className="text-warning" />
                <span className="fs-2 fw-bold">156</span>
              </div>
              <h3 className="h5 fw-medium mb-1">مجموع النقاط</h3>
              <p className="small text-secondary mb-0">أفضل 15% من الطلاب</p>
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
                <Calendar size={40} className="text-primary" />
                <span className="fs-2 fw-bold">68 ساعة</span>
              </div>
              <h3 className="h5 fw-medium mb-1">إجمالي وقت المذاكرة</h3>
              <p className="small text-secondary mb-0">في كل المواد</p>
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
                <Target size={40} className="text-success" />
                <span className="fs-2 fw-bold">82%</span>
              </div>
              <h3 className="h5 fw-medium mb-1">متوسط درجات الاختبارات</h3>
              <p className="small text-secondary mb-0">زيادة 8% عن الشهر اللي فات</p>
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
              <h3 className="h5 fw-semibold mb-4">التقدم الأسبوعي</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="hours" stroke="#4F46E5" strokeWidth={3} name="Study Hours" dot={{ fill: "#4F46E5", r: 4 }} />
                  <Line type="monotone" dataKey="quizScore" stroke="#22C55E" strokeWidth={3} name="Quiz Score %" dot={{ fill: "#22C55E", r: 4 }} />
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
              <h3 className="h5 fw-semibold mb-4">تحليل مهارات التعلم</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="skill" stroke="#6b7280" />
                  <PolarRadiusAxis stroke="#6b7280" />
                  <Radar name="Your Skills" dataKey="value" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border rounded-4 p-4 shadow-sm mb-5"
        >
          <h3 className="h5 fw-semibold mb-4">نقاط القوة والضعف حسب المادة</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={strengthsWeaknesses}>
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
              <Legend />
              <Bar dataKey="strength" fill="#22C55E" radius={[8, 8, 0, 0]} name="Strength Score" />
              <Bar dataKey="weakness" fill="#ef4444" radius={[8, 8, 0, 0]} name="Weakness Score" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white border rounded-4 p-4 shadow-sm mb-5"
        >
          <h3 className="h5 fw-semibold mb-4">مجالات الضعف للتركيز عليها</h3>
          <div className="d-flex flex-column gap-3">
            <div className="p-4 rounded-4 bg-danger bg-opacity-10 border border-danger border-opacity-25">
              <div className="d-flex align-items-start gap-3">
                <AlertCircle size={24} className="text-danger flex-shrink-0 mt-1" />
                <div className="flex-grow-1">
                  <h4 className="fw-semibold h6 mb-2">أحياء: انقسام الخلايا</h4>
                  <p className="small text-secondary mb-3">
                    جاوبت غلط على 65% من الأسئلة في الموضوع ده في 3 اختبارات
                  </p>
                  <Link
                    to="/summary/4"
                    className="btn btn-danger btn-sm px-3 rounded-3"
                  >
                    راجع الموضوع
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-4 bg-warning bg-opacity-10 border border-warning border-opacity-25">
              <div className="d-flex align-items-start gap-3">
                <AlertCircle size={24} className="text-warning flex-shrink-0 mt-1" />
                <div className="flex-grow-1">
                  <h4 className="fw-semibold h6 mb-2">فيزياء: الديناميكا الحرارية</h4>
                  <p className="small text-secondary mb-3">
                    صعوبة متوسطة - دقة 55% في الأسئلة المتعلقة
                  </p>
                  <Link
                    to="/summary/2"
                    className="btn btn-warning btn-sm text-white px-3 rounded-3"
                  >
                    راجع الموضوع
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white border rounded-4 p-4 shadow-sm"
        >
          <h3 className="h5 fw-semibold mb-4">الإنجازات</h3>
          <div className="row g-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="col-md-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="p-4 rounded-4 border border-2 transition-all group h-100 btn-hover-primary-outline text-start"
                >
                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center mb-3"
                    style={{ backgroundColor: `${achievement.color}15`, width: '56px', height: '56px' }}
                  >
                    <achievement.icon size={28} style={{ color: achievement.color }} />
                  </div>
                  <h4 className="fw-semibold h6 mb-2">{achievement.title}</h4>
                  <p className="small text-secondary mb-0">{achievement.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <style>{`
        .btn-hover-primary-outline:hover {
          border-color: var(--bs-primary) !important;
          transform: translateY(-5px);
        }
        .btn-hover-primary-outline {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}
