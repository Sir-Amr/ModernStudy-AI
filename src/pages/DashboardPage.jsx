import { Link } from "react-router";
import { BookOpen, Brain, Clock, Target, AlertCircle, TrendingUp, Sparkles, ChevronRight, PlusCircle, Rocket } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { SkeletonCard } from "../components/SkeletonCard";
import { useData } from "../contexts/DataContext";
import { useToast } from "../hooks/useToast";

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("أسبوع");
  const { showSuccess } = useToast();
  
  const {
    subjects,
    weeklyData,
    activities,
    totalProgress,
    activeSubjects,
    completedSubjects,
    totalStudyTime,
    weakAreas,
    isNewUser,
    addStudyTime,
  } = useData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // بيانات الرسم البياني للتوزيع (تتغير حسب المواد)
  const getPieData = () => {
    if (subjects.length === 0) {
      return [
        { name: "مفيش مواد", value: 100, color: "#e5e7eb" },
      ];
    }
    return [
      { name: "مذاكرة نشطة", value: Math.min(70, totalProgress + 10), color: "#4F46E5" },
      { name: "مراجعة", value: Math.min(30, 100 - totalProgress), color: "#22C55E" },
      { name: "اختبارات", value: Math.min(20, Math.round(totalProgress / 5)), color: "#f59e0b" },
    ];
  };

  const pieData = getPieData();

  // رسالة ترحيبية حسب حالة المستخدم
  const getWelcomeMessage = () => {
    if (isNewUser) {
      return {
        title: "👋 أهلاً بيك في رفيق المذاكرة!",
        subtitle: "ابدأ برفع أول ملف PDF عشان نبدأ الرحلة",
        action: "ارفع أول مادة",
        showAction: true,
      };
    } else if (subjects.length > 0 && totalProgress < 30) {
      return {
        title: "🚀 بداية موفقة!",
        subtitle: `عندك ${subjects.length} مواد، خلينا نبدأ المذاكرة`,
        action: "ذاكر دلوقتي",
        showAction: true,
      };
    } else if (totalProgress > 80 && completedSubjects < subjects.length) {
      return {
        title: "🎯 كمل كده! قربت تخلص!",
        subtitle: `خلصت ${completedSubjects} من ${subjects.length} مواد، كمل الباقي`,
        action: "كمل المذاكرة",
        showAction: true,
      };
    } else if (totalProgress === 100 && subjects.length > 0) {
      return {
        title: "🎉 مبروك! خلصت كل المواد!",
        subtitle: "أنت بطل! جهز نفسك لمادة جديدة",
        action: "ضيف مادة جديدة",
        showAction: true,
      };
    } else {
      return {
        title: "📚 كمل كده!",
        subtitle: `تقدمك ${totalProgress}%، استمر بنفس الحماس`,
        action: "ذاكر",
        showAction: false,
      };
    }
  };

  const welcome = getWelcomeMessage();

  if (isLoading) {
    return (
      <div className="min-vh-100 bg-light p-4 p-md-5">
        <div className="container-lg">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <div>
              <SkeletonCard className="w-75" />
              <SkeletonCard className="w-50 mt-2" />
            </div>
            <SkeletonCard className="w-25" />
          </div>
          <div className="row g-4 mb-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="col-md-4">
                <SkeletonCard />
              </div>
            ))}
          </div>
          <div className="row g-4">
            {[1, 2].map(i => (
              <div key={i} className="col-lg-6">
                <SkeletonCard className="h-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light p-4 p-md-5">
      <div className="container-lg">
        {/* Welcome Banner - ديناميكي حسب حالة المستخدم */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-4 p-4 mb-5 ${
            isNewUser 
              ? "bg-gradient-primary text-white" 
              : "bg-white border shadow-sm"
          }`}
        >
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <h2 className={`h3 fw-bold ${isNewUser ? 'text-white' : ''}`}>
                {welcome.title}
              </h2>
              <p className={isNewUser ? 'text-white-50' : 'text-secondary'}>
                {welcome.subtitle}
              </p>
            </div>
            {welcome.showAction && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={isNewUser ? "/upload" : "/upload"}
                  className={`btn rounded-3 px-4 py-2 ${
                    isNewUser 
                      ? "btn-light text-primary" 
                      : "btn-primary"
                  }`}
                >
                  {welcome.action} 🚀
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Stats Cards - تظهر فقط لو فيه مواد */}
        {subjects.length > 0 ? (
          <>
            <div className="row g-4 mb-5">
              {[
                {
                  icon: Target,
                  label: "التقدم الكلي",
                  value: `${totalProgress}%`,
                  sub: completedSubjects > 0 ? `خلصت ${completedSubjects} مواد` : "لسه في الأول",
                  color: "bg-gradient-primary text-white",
                  delay: 0.1
                },
                {
                  icon: Clock,
                  label: "وقت المذاكرة",
                  value: `${totalStudyTime.toFixed(1)} ساعة`,
                  sub: activities.length > 0 ? `${activities.length} نشاط` : "لسه مبدأتش",
                  color: "bg-white border text-dark",
                  delay: 0.2
                },
                {
                  icon: Brain,
                  label: "المواد",
                  value: subjects.length,
                  sub: `${activeSubjects} جاري • ${completedSubjects} مكتملة`,
                  color: "bg-white border text-dark",
                  delay: 0.3
                },
              ].map((stat, index) => (
                <div key={index} className="col-md-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: stat.delay }}
                    className={`rounded-4 p-4 shadow-sm ${stat.color}`}
                    whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <stat.icon size={40} className={stat.color.includes('text-white') ? 'opacity-75' : ''} />
                      <motion.span
                        className="fs-1 fw-bold"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: stat.delay + 0.3, type: "spring", stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.span>
                    </div>
                    <h3 className="h5 fw-medium mb-1">{stat.label}</h3>
                    <p className="small opacity-75 mb-0">{stat.sub}</p>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="row g-4 mb-5">
              <div className="col-lg-7">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white border rounded-4 p-4 shadow-sm"
                >
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h3 className="h5 fw-semibold mb-0">ساعات المذاكرة الأسبوعية</h3>
                    <div className="d-flex gap-2">
                      {["أسبوع", "شهر"].map(tab => (
                        <motion.button
                          key={tab}
                          className={`btn btn-sm border-0 rounded-3 px-3 ${activeTab === tab ? 'bg-primary text-white' : 'bg-light text-secondary'}`}
                          onClick={() => setActiveTab(tab)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tab}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          direction: 'rtl',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="hours"
                        stroke="#4F46E5"
                        strokeWidth={3}
                        fill="url(#colorHours)"
                        dot={{ fill: "#4F46E5", r: 4 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              <div className="col-lg-5">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white border rounded-4 p-4 shadow-sm h-100"
                >
                  <h3 className="h5 fw-semibold mb-4">توزيع وقت المذاكرة</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          direction: 'rtl',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="d-flex justify-content-center gap-4 mt-2">
                    {pieData.map(item => (
                      <div key={item.name} className="d-flex align-items-center gap-2">
                        <div className="rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: item.color }} />
                        <span className="small text-secondary">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          // Empty state - لو مفيش مواد
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-5"
          >
            <Rocket size={80} className="text-primary mb-4" />
            <h3 className="h3 fw-bold mb-3">مفيش مواد لسه!</h3>
            <p className="text-secondary mb-4">
              ارفع أول ملف PDF عشان نبدأ رحلة المذاكرة مع بعض
            </p>
            <Link to="/upload" className="btn btn-primary btn-lg rounded-3 px-5 py-3">
              <PlusCircle size={24} className="me-2" />
              ارفع أول مادة
            </Link>
          </motion.div>
        )}

        {/* Subjects Grid - تتغير حسب المواد */}
        {subjects.length > 0 && (
          <div className="mb-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="h3 fw-bold mb-0">موادك</h2>
              <motion.div whileHover={{ x: 5 }}>
                <Link to="/upload" className="text-primary text-decoration-none border-bottom border-primary d-flex align-items-center gap-1">
                  ضيف مادة جديدة
                  <ChevronRight size={16} />
                </Link>
              </motion.div>
            </div>

            <div className="row g-4">
              {subjects.map((subject, index) => (
                <div key={subject.id} className="col-md-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white border rounded-4 p-4 shadow-sm h-100 d-flex flex-column"
                    whileHover={{
                      y: -6,
                      boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                      borderColor: subject.color,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <div className="d-flex align-items-start justify-content-between mb-4">
                      <div className="flex-grow-1">
                        <h3 className="h5 fw-semibold mb-2 d-flex align-items-center gap-2">
                          <span>{subject.icon}</span>
                          <span>{subject.name}</span>
                          {subject.progress === 100 && (
                            <span className="badge bg-success">✅ مكتملة</span>
                          )}
                        </h3>
                        <p className="small text-secondary mb-0">
                          آخر مذاكرة: {subject.lastStudied} • {subject.topics} موضوع
                          {subject.quizScore > 0 && ` • درجة: ${subject.quizScore}%`}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="rounded-3 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: `${subject.color}15`, width: '48px', height: '48px' }}
                      >
                        <BookOpen size={24} style={{ color: subject.color }} />
                      </motion.div>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="small text-secondary">التقدم</span>
                        <motion.span
                          className="small fw-semibold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {subject.progress}%
                        </motion.span>
                      </div>
                      <div className="progress bg-light" style={{ height: '8px' }}>
                        <motion.div
                          className="progress-bar rounded-pill"
                          style={{ backgroundColor: subject.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.progress}%` }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-auto">
                      {[
                        { to: `/summary/${subject.id}`, label: "ملخص", color: "btn-light" },
                        { to: `/quiz/${subject.id}`, label: "اختبار", color: "btn-light" },
                        { to: `/chat/${subject.id}`, label: "دردشة", color: "btn-primary" },
                      ].map((action) => (
                        <motion.div key={action.to} className="flex-grow-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Link
                            to={action.to}
                            className={`btn ${action.color} w-100 border-0 rounded-3 py-2`}
                            style={action.color === 'btn-primary' ? { backgroundColor: subject.color, color: 'white' } : {}}
                          >
                            {action.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity & Weakness Detection - تظهر فقط لو في نشاطات أو نقاط ضعف */}
        {(activities.length > 0 || weakAreas.length > 0) && (
          <div className="row g-4">
            {activities.length > 0 && (
              <div className={`col-md-${weakAreas.length > 0 ? '6' : '12'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white border rounded-4 p-4 shadow-sm"
                >
                  <h3 className="h5 fw-semibold mb-4">آخر النشاطات</h3>
                  <div className="d-flex flex-column gap-3">
                    {activities.slice(0, 5).map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="d-flex align-items-center gap-3 p-3 rounded-4 bg-light"
                        whileHover={{ backgroundColor: '#f0f0f5' }}
                      >
                        <div className={`rounded-3 p-2 ${
                          activity.type === 'quiz' ? 'bg-success bg-opacity-10' :
                          activity.type === 'summary' ? 'bg-primary bg-opacity-10' :
                          activity.type === 'upload' ? 'bg-warning bg-opacity-10' :
                          'bg-info bg-opacity-10'
                        }`}>
                          {activity.type === 'quiz' && <Target size={20} className="text-success" />}
                          {activity.type === 'summary' && <BookOpen size={20} className="text-primary" />}
                          {activity.type === 'upload' && <TrendingUp size={20} className="text-warning" />}
                          {activity.type === 'chat' && <Brain size={20} className="text-info" />}
                          {!['quiz', 'summary', 'upload', 'chat'].includes(activity.type) && <Sparkles size={20} className="text-secondary" />}
                        </div>
                        <div className="flex-grow-1">
                          <p className="fw-medium mb-0">{activity.action}</p>
                          <span className="small text-secondary">{activity.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {weakAreas.length > 0 && (
              <div className={`col-md-${activities.length > 0 ? '6' : '12'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="rounded-4 p-4"
                  style={{ backgroundImage: 'linear-gradient(to right, #FEF3C7, #FDE68A)', border: '1px solid rgba(245, 158, 11, 0.2)' }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AlertCircle size={24} className="text-warning mt-1 flex-shrink-0" />
                    </motion.div>
                    <div className="flex-grow-1">
                      <h3 className="h5 fw-semibold mb-2">لقينا نقاط ضعف 💪</h3>
                      <p className="text-secondary mb-3">
                        {weakAreas.slice(0, 2).map((area, i) => (
                          <span key={i}>
                            {i > 0 && ' و '}
                            <strong>"{area.topic}"</strong> في {area.subject} (دقة {area.accuracy}%)
                          </span>
                        ))}
                      </p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          to="/profile"
                          className="btn btn-warning text-white rounded-3 px-4"
                        >
                          راجع نقاط الضعف
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}