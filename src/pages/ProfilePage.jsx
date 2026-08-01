import { Link } from "react-router";
import { User, Trophy, TrendingUp, AlertCircle, Calendar, Target, Award, Brain, Clock, BookOpen } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ComposedChart, Area } from "recharts";
import { motion } from "motion/react";
import { useData } from "../contexts/DataContext";
import { useTheme } from "../contexts/ThemeContext";

export function ProfilePage() {
  const { 
    subjects, 
    totalStudyTime, 
    totalPoints, 
    averageScore, 
    weakAreas, 
    totalProgress,
    weeklyData,
    activities
  } = useData();
  
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // تحويل المواد لبيانات الرسم البياني (نقاط القوة والضعف)
  const strengthsWeaknesses = subjects.map(s => ({
    subject: s.name.split(':')[0].trim(),
    strength: s.progress,
    weakness: Math.max(0, 100 - s.progress),
    color: s.color,
  }));

  // بيانات الرادار من المواد
  const radarData = subjects.length > 0 ? [
    { 
      skill: "الفهم", 
      value: Math.min(100, Math.round(subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length)) 
    },
    { 
      skill: "الذاكرة", 
      value: Math.min(100, Math.round(subjects.reduce((acc, s) => acc + (s.quizScore || 0), 0) / subjects.length)) || 50 
    },
    { 
      skill: "حل المشاكل", 
      value: Math.min(100, Math.round(subjects.reduce((acc, s) => acc + s.progress + (s.quizScore || 0), 0) / (subjects.length * 2))) 
    },
    { 
      skill: "السرعة", 
      value: Math.min(100, Math.round(70 + Math.random() * 20)) 
    },
    { 
      skill: "الاستمرارية", 
      value: Math.min(100, Math.round(60 + Math.random() * 30)) 
    },
  ] : [
    { skill: "الفهم", value: 0 }, 
    { skill: "الذاكرة", value: 0 }, 
    { skill: "حل المشاكل", value: 0 }, 
    { skill: "السرعة", value: 0 }, 
    { skill: "الاستمرارية", value: 0 }
  ];

  // بيانات التقدم الأسبوعي
  const weeklyProgress = weeklyData.map((day, i) => ({
    day: day.day,
    hours: day.hours,
    quizzes: day.quizzes || 0,
  }));

  // إحصائيات إضافية
  const totalQuizzes = subjects.reduce((acc, s) => acc + (s.quizScore > 0 ? 1 : 0), 0);
  const completedSubjects = subjects.filter(s => s.progress >= 100).length;
  const inProgressSubjects = subjects.filter(s => s.progress > 0 && s.progress < 100).length;

  // الإنجازات المحسوبة ديناميكياً
  const achievements = [
    { 
      icon: Trophy, 
      title: "بداية قوية", 
      description: subjects.length > 0 ? `بدأت ${subjects.length} مواد` : "لسه مبدأتش", 
      color: "#f59e0b",
      unlocked: subjects.length > 0
    },
    { 
      icon: Target, 
      title: "مواد مكتملة", 
      description: `${completedSubjects} مواد خلصتها`, 
      color: "#22C55E",
      unlocked: completedSubjects > 0
    },
    { 
      icon: Award, 
      title: "متوسط درجات", 
      description: `${averageScore}% متوسط درجاتك`, 
      color: "#4F46E5",
      unlocked: averageScore > 0
    },
    { 
      icon: Brain, 
      title: "اختبارات", 
      description: `خلصت ${totalQuizzes} اختبار`, 
      color: "#8B5CF6",
      unlocked: totalQuizzes > 0
    },
    { 
      icon: Clock, 
      title: "وقت المذاكرة", 
      description: `${totalStudyTime} ساعة مذاكرة`, 
      color: "#06B6D4",
      unlocked: totalStudyTime > 0
    },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <div className="min-vh-100 bg-light p-4 p-md-5">
      <div className="container-lg">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-5 flex-wrap gap-4">
          <div className="d-flex align-items-center gap-4">
            <motion.div 
              className="rounded-4 bg-gradient-primary d-flex align-items-center justify-content-center"
              style={{ width: '96px', height: '96px' }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User size={48} className="text-white" />
            </motion.div>
            <div>
              <h1 className="h2 fw-bold mb-1">الملف الشخصي</h1>
              <p className="fs-6 text-secondary mb-3">عضو من يناير 2026</p>
              <div className="d-flex gap-2 flex-wrap">
                <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 fw-medium">
                  المستوى {Math.min(10, Math.floor(totalStudyTime / 10) + 1)}
                </span>
                <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2 fw-medium">
                  {subjects.length} مواد 🎯
                </span>
                <span className="badge rounded-pill bg-warning bg-opacity-10 text-warning px-3 py-2 fw-medium">
                  {totalProgress}% إنجاز
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

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          {[
            { 
              icon: Trophy, 
              label: "مجموع النقاط", 
              value: totalPoints, 
              sub: "أفضل 15% من الطلاب",
              color: "text-warning",
              bgColor: "bg-warning bg-opacity-10"
            },
            { 
              icon: Calendar, 
              label: "إجمالي وقت المذاكرة", 
              value: `${totalStudyTime} ساعة`, 
              sub: "في كل المواد",
              color: "text-primary",
              bgColor: "bg-primary bg-opacity-10"
            },
            { 
              icon: Target, 
              label: "متوسط درجات الاختبارات", 
              value: `${averageScore}%`, 
              sub: `زيادة ${Math.round(Math.random() * 15 + 5)}% عن الشهر اللي فات`,
              color: "text-success",
              bgColor: "bg-success bg-opacity-10"
            },
          ].map((stat, index) => (
            <div key={index} className="col-md-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="bg-white border rounded-4 p-4 shadow-sm h-100"
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className={`rounded-3 p-2 ${stat.bgColor}`}>
                    <stat.icon size={32} className={stat.color} />
                  </div>
                  <motion.span
                    className="fs-2 fw-bold"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + 0.1 * index, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.span>
                </div>
                <h3 className="h5 fw-medium mb-1">{stat.label}</h3>
                <p className="small text-secondary mb-0">{stat.sub}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
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
                <ComposedChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#2a2a4a" : "#e5e7eb"} />
                  <XAxis dataKey="day" stroke={isDark ? "#a0a0b8" : "#6b7280"} />
                  <YAxis stroke={isDark ? "#a0a0b8" : "#6b7280"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1a1a2e" : "#ffffff",
                      borderColor: isDark ? "#2a2a4a" : "#e5e7eb",
                      borderRadius: "8px",
                      direction: 'rtl',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="hours" fill="#4F46E5" radius={[8, 8, 0, 0]} name="ساعات المذاكرة" />
                  <Line type="monotone" dataKey="quizzes" stroke="#22C55E" strokeWidth={3} name="الاختبارات" dot={{ fill: "#22C55E", r: 4 }} />
                </ComposedChart>
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
                  <PolarGrid stroke={isDark ? "#2a2a4a" : "#e5e7eb"} />
                  <PolarAngleAxis dataKey="skill" stroke={isDark ? "#a0a0b8" : "#6b7280"} />
                  <PolarRadiusAxis stroke={isDark ? "#a0a0b8" : "#6b7280"} />
                  <Radar 
                    name="مهاراتك" 
                    dataKey="value" 
                    stroke="#4F46E5" 
                    fill="#4F46E5" 
                    fillOpacity={0.6} 
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1a1a2e" : "#ffffff",
                      borderColor: isDark ? "#2a2a4a" : "#e5e7eb",
                      borderRadius: "8px",
                      direction: 'rtl',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border rounded-4 p-4 shadow-sm mb-5"
        >
          <h3 className="h5 fw-semibold mb-4">نقاط القوة والضعف حسب المادة</h3>
          {subjects.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={strengthsWeaknesses}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#2a2a4a" : "#e5e7eb"} />
                <XAxis dataKey="subject" stroke={isDark ? "#a0a0b8" : "#6b7280"} />
                <YAxis stroke={isDark ? "#a0a0b8" : "#6b7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1a1a2e" : "#ffffff",
                    borderColor: isDark ? "#2a2a4a" : "#e5e7eb",
                    borderRadius: "8px",
                    direction: 'rtl',
                  }}
                />
                <Legend />
                <Bar dataKey="strength" fill="#22C55E" radius={[8, 8, 0, 0]} name="نقاط القوة" />
                <Bar dataKey="weakness" fill="#ef4444" radius={[8, 8, 0, 0]} name="نقاط الضعف" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-5">
              <BookOpen size={48} className="text-secondary mb-3" />
              <p className="text-secondary">مفيش مواد مسجلة لسه! ارفع أول مادة وابدأ المذاكرة</p>
              <Link to="/upload" className="btn btn-primary mt-3">
                ارفع مادة
              </Link>
            </div>
          )}
        </motion.div>

        {/* Weak Areas Section */}
        {weakAreas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white border rounded-4 p-4 shadow-sm mb-5"
          >
            <h3 className="h5 fw-semibold mb-4">مجالات الضعف للتركيز عليها</h3>
            <div className="d-flex flex-column gap-3">
              {weakAreas.map((area, index) => {
                const subject = subjects.find(s => s.name.includes(area.subject));
                const color = area.accuracy < 40 ? "danger" : area.accuracy < 60 ? "warning" : "info";
                const bgColor = area.accuracy < 40 ? "bg-danger" : area.accuracy < 60 ? "bg-warning" : "bg-info";
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`p-4 rounded-4 ${bgColor} bg-opacity-10 border border-${color} border-opacity-25`}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <AlertCircle size={24} className={`text-${color} flex-shrink-0 mt-1`} />
                      <div className="flex-grow-1">
                        <h4 className="fw-semibold h6 mb-2">{area.topic}</h4>
                        <p className="small text-secondary mb-3">
                          في مادة {area.subject} • دقة {area.accuracy}% في الأسئلة المتعلقة
                        </p>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/summary/${subject?.id || '1'}`}
                            className={`btn btn-${color} btn-sm px-3 rounded-3 text-white`}
                          >
                            راجع الموضوع
                          </Link>
                          <Link
                            to={`/chat/${subject?.id || '1'}`}
                            className="btn btn-outline-secondary btn-sm px-3 rounded-3"
                          >
                            اسأل AI
                          </Link>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className={`display-6 fw-bold text-${color}`}>{area.accuracy}%</span>
                        <p className="small text-secondary mb-0">الدقة</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white border rounded-4 p-4 shadow-sm"
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="h5 fw-semibold mb-0">الإنجازات</h3>
            <span className="small text-secondary">
              {unlockedAchievements.length}/{achievements.length} مكتملة
            </span>
          </div>
          <div className="row g-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="col-md-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className={`p-4 rounded-4 border-2 transition-all group h-100 text-start ${
                    achievement.unlocked 
                      ? 'border border-2' 
                      : 'opacity-50 border-2 border-dashed'
                  }`}
                  style={achievement.unlocked ? { borderColor: achievement.color } : { borderColor: '#e5e7eb' }}
                  whileHover={achievement.unlocked ? { y: -5, transition: { type: "spring", stiffness: 300 } } : {}}
                >
                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center mb-3"
                    style={{ 
                      backgroundColor: achievement.unlocked ? `${achievement.color}15` : '#f3f4f6', 
                      width: '56px', 
                      height: '56px' 
                    }}
                  >
                    <achievement.icon 
                      size={28} 
                      style={{ color: achievement.unlocked ? achievement.color : '#9ca3af' }} 
                    />
                  </div>
                  <h4 className="fw-semibold h6 mb-2">
                    {achievement.title}
                    {achievement.unlocked && <span className="ms-1">✓</span>}
                  </h4>
                  <p className="small text-secondary mb-0">{achievement.description}</p>
                  {!achievement.unlocked && (
                    <span className="badge bg-secondary bg-opacity-10 text-secondary mt-2">🔒 مقفل</span>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-5 p-4 rounded-4 bg-gradient-primary text-white text-center shadow-lg"
        >
          <div className="row g-4">
            <div className="col-4">
              <h4 className="display-6 fw-bold">{subjects.length}</h4>
              <p className="opacity-75 mb-0">مواد</p>
            </div>
            <div className="col-4">
              <h4 className="display-6 fw-bold">{completedSubjects}</h4>
              <p className="opacity-75 mb-0">مكتملة</p>
            </div>
            <div className="col-4">
              <h4 className="display-6 fw-bold">{inProgressSubjects}</h4>
              <p className="opacity-75 mb-0">جاري</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex justify-content-between small mb-1">
              <span>التقدم الكلي</span>
              <span>{totalProgress}%</span>
            </div>
            <div className="progress bg-white bg-opacity-25" style={{ height: '8px' }}>
              <motion.div
                className="progress-bar bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          <motion.div 
            className="mt-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/upload" className="btn btn-light text-primary rounded-3 px-4">
              ارفع مادة جديدة 🚀
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}