import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

// ✅ البيانات الافتراضية تكون فارغة أو ترحيبية
const defaultData = {
  subjects: [],
  weeklyData: [
    { day: "Mon", hours: 0, quizzes: 0 },
    { day: "Tue", hours: 0, quizzes: 0 },
    { day: "Wed", hours: 0, quizzes: 0 },
    { day: "Thu", hours: 0, quizzes: 0 },
    { day: "Fri", hours: 0, quizzes: 0 },
    { day: "Sat", hours: 0, quizzes: 0 },
    { day: "Sun", hours: 0, quizzes: 0 },
  ],
  activities: [],
  totalStudyTime: 0,
  totalPoints: 0,
  averageScore: 0,
  weakAreas: [],
  lastVisit: new Date().toISOString(),
};

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("studyData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // لو البيانات قديمة، ندمجها مع الـ default عشان نضمن وجود كل الحقول
        return { ...defaultData, ...parsed };
      } catch {
        return defaultData;
      }
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem("studyData", JSON.stringify(data));
  }, [data]);

  // === دوال التعديل ===

  // إضافة مادة جديدة
  const addSubject = (newSubject) => {
    const subject = {
      id: Date.now().toString(),
      progress: 0,
      lastStudied: "الآن",
      topics: Math.floor(Math.random() * 8) + 2,
      quizScore: 0,
      createdAt: new Date().toISOString(),
      ...newSubject,
    };
    
    setData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, subject],
      activities: [
        { 
          action: `📚 أضفت مادة جديدة: ${subject.name}`, 
          time: "الآن", 
          type: "upload" 
        },
        ...prev.activities.slice(0, 4),
      ],
    }));
  };

  // تحديث تقدم مادة (بيزيد تدريجياً)
  const updateProgress = (subjectId, increment = 5) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) => {
        if (s.id === subjectId) {
          const newProgress = Math.min(s.progress + increment, 100);
          return { 
            ...s, 
            progress: newProgress,
            lastStudied: "الآن",
            // لو المادة كملت 100%، نضيف نقاط إضافية
            ...(newProgress === 100 && { completedAt: new Date().toISOString() })
          };
        }
        return s;
      }),
    }));
  };

  // تحديث درجة اختبار
  const updateQuizScore = (subjectId, score) => {
    setData((prev) => {
      // حساب متوسط الدرجات الجديد
      const updatedSubjects = prev.subjects.map((s) =>
        s.id === subjectId ? { ...s, quizScore: score } : s
      );
      
      const scores = updatedSubjects.filter(s => s.quizScore > 0).map(s => s.quizScore);
      const newAverage = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
        : 0;

      // تحديث نقاط الضعف بناءً على الدرجات المنخفضة
      const weakAreas = updatedSubjects
        .filter(s => s.quizScore > 0 && s.quizScore < 60)
        .map(s => ({
          topic: s.name,
          subject: s.name.split(':')[0].trim(),
          accuracy: s.quizScore,
        }));

      return {
        ...prev,
        subjects: updatedSubjects,
        averageScore: newAverage,
        weakAreas: weakAreas,
        totalPoints: prev.totalPoints + Math.round(score / 2),
        activities: [
          { 
            action: `📝 خلصت اختبار في ${prev.subjects.find(s => s.id === subjectId)?.name || 'مادة'} وحصلت على ${score}%`, 
            time: "الآن", 
            type: "quiz" 
          },
          ...prev.activities.slice(0, 4),
        ],
      };
    });
  };

  // إضافة وقت مذاكرة
  const addStudyTime = (hours) => {
    const today = new Date().getDay();
    setData((prev) => ({
      ...prev,
      totalStudyTime: prev.totalStudyTime + hours,
      weeklyData: prev.weeklyData.map((day, index) => {
        if (index === today) {
          return { ...day, hours: day.hours + hours };
        }
        return day;
      }),
      totalPoints: prev.totalPoints + Math.round(hours * 2),
    }));
  };

  // إضافة نشاط جديد
  const addActivity = (action, type = "general") => {
    setData((prev) => ({
      ...prev,
      activities: [
        { action, time: "الآن", type },
        ...prev.activities.slice(0, 4),
      ],
    }));
  };

  // تحديث نقاط الضعف يدوياً
  const updateWeakAreas = (newWeakAreas) => {
    setData((prev) => ({
      ...prev,
      weakAreas: newWeakAreas,
    }));
  };

  // إعادة تعيين البيانات
  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem("studyData");
  };

  // حساب التقدم الكلي
  const totalProgress = data.subjects.length > 0
    ? Math.round(data.subjects.reduce((acc, s) => acc + s.progress, 0) / data.subjects.length)
    : 0;

  // عدد المواد النشطة
  const activeSubjects = data.subjects.filter((s) => s.progress > 0 && s.progress < 100).length;
  const completedSubjects = data.subjects.filter((s) => s.progress === 100).length;

  // هل المستخدم جديد؟
  const isNewUser = data.subjects.length === 0 && data.activities.length === 0;

  const value = {
    ...data,
    totalProgress,
    activeSubjects,
    completedSubjects,
    isNewUser,
    addSubject,
    updateProgress,
    updateQuizScore,
    addActivity,
    addStudyTime,
    updateWeakAreas,
    resetData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);