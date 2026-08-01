import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useData } from "../contexts/DataContext";
import { useToast } from "../hooks/useToast";

export function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateQuizScore, addActivity, subjects } = useData();
  const { showSuccess } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // جلب اسم المادة
  const subject = subjects.find(s => s.id === id);
  const subjectName = subject?.name || "المادة";

  // أسئلة المادة (محاكاة)
  const questions = [
    {
      question: "إيه المبدأ الأساسي في ميكانيكا الكم اللي بيقول إن الجسيمات ممكن تكون في حالات متعددة في نفس الوقت؟",
      options: [
        "ازدواجية الموجة-الجسيم",
        "التراكب الكمي",
        "التشابك الكمي",
        "مبدأ عدم اليقين لهايزنبرج",
      ],
      correctAnswer: 1,
      explanation: "التراكب الكمي بيسمح للجسيمات تكون في حالات متعددة في نفس الوقت لحد ما تتقاس.",
    },
    {
      question: "أنهي معادلة بتوصف إزاي الحالات الكمية بتتطور مع الوقت؟",
      options: [
        "معادلات أينشتاين الحقلية",
        "معادلات ماكسويل",
        "معادلة شرودنجر",
        "معادلة ديراك",
      ],
      correctAnswer: 2,
      explanation: "معادلة شرودنجر هي المعادلة الأساسية اللي بتوصف تطور الحالة الكمية.",
    },
    {
      question: "مبدأ عدم اليقين لهايزنبرج بيقول إيه؟",
      options: [
        "الطاقة والزمن ممكن يتقاسوا بدقة",
        "الموضع والزخم مش ممكن يتعرفوا بدقة في نفس الوقت",
        "الجسيمات دايماً بتتصرف كموجات",
        "الحالات الكمية أبداً ما بتنهار",
      ],
      correctAnswer: 1,
      explanation: "مبدأ عدم اليقين بيحدد دقة القياسات المتزامنة للمتغيرات المكملة.",
    },
    {
      question: "التشابك الكمي بيوصف إيه؟",
      options: [
        "ارتباط الجسيمات بغض النظر عن المسافة",
        "انفصال الجسيمات عن بعضها",
        "تحول الطاقة لكتلة",
        "تأثير الجاذبية على الكم",
      ],
      correctAnswer: 0,
      explanation: "التشابك الكمي بينشئ ارتباطات بين الجسيمات بتستمر حتى لو كانوا بعيدين عن بعض.",
    },
    {
      question: "أنهي تجربة أثبتت ازدواجية الموجة-الجسيم؟",
      options: [
        "تجربة الشق المزدوج",
        "تجربة كافنديش",
        "تجربة ميكلسون-مورلي",
        "تجربة مليكان",
      ],
      correctAnswer: 0,
      explanation: "تجربة الشق المزدوج أظهرت أن الإلكترونات تظهر سلوك موجي وجسيمي.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(newAnswers[currentQuestion + 1] ?? null);
      setShowFeedback(false);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleCheckAnswer = () => {
    setShowFeedback(true);
  };

  const handleSubmitQuiz = () => {
    setIsSubmitting(true);

    // حساب النتيجة
    const correctCount = answers.filter((ans, idx) => {
      if (ans === undefined || ans === null) return false;
      return ans === questions[idx].correctAnswer;
    }).length;

    const score = Math.round((correctCount / questions.length) * 100);

    // تحديث درجة المادة في الـ Context
    updateQuizScore(id, score);
    addActivity(`خلصت اختبار في ${subjectName} وحصلت على ${score}%`, "quiz");

    if (score >= 70) {
      showSuccess("🎉 أداء رائع!", `حصلت على ${score}% في اختبار ${subjectName}`);
    } else {
      showSuccess("💪 كمل كده!", `حصلت على ${score}% في اختبار ${subjectName}، راجع نقاط الضعف`);
    }

    setTimeout(() => {
      navigate(`/results/${id}`, {
        state: { score, correctCount, totalQuestions: questions.length }
      });
    }, 1500);
  };

  const currentQuestionData = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQuestionData.correctAnswer;

  if (isSubmitting) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-5 rounded-4 border shadow-sm"
        >
          <Loader2 size={64} className="mx-auto mb-4 text-primary animate-spin" style={{ animation: "spin 1s linear infinite" }} />
          <h3 className="h3 fw-semibold">بنحسب نتيجتك...</h3>
          <p className="text-secondary">هتظهر النتيجة خلال ثواني</p>
        </motion.div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const getOptionClass = (index) => {
    let baseClass = "btn w-100 p-4 rounded-4 border border-2 text-start d-flex justify-content-between align-items-center transition-all mb-3 ";

    if (selectedAnswer === index) {
      if (showFeedback) {
        if (index === currentQuestionData.correctAnswer) {
          return baseClass + "border-success bg-success bg-opacity-10 text-dark";
        } else {
          return baseClass + "border-danger bg-danger bg-opacity-10 text-dark";
        }
      } else {
        return baseClass + "border-primary text-primary fw-medium";
      }
    } else if (showFeedback && index === currentQuestionData.correctAnswer) {
      return baseClass + "border-success bg-success bg-opacity-10 text-dark";
    }

    return baseClass + "border-secondary border-opacity-25 bg-white text-dark hover-bg-light";
  };

  return (
    <div className="min-vh-100 bg-light p-4 p-md-5">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="d-flex align-items-center justify-content-between mb-5">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-link text-secondary text-decoration-none d-inline-flex align-items-center gap-2 p-0"
          >
            <ChevronLeft size={16} />
            خروج من الاختبار
          </button>

          <div className="d-flex align-items-center gap-3">
            <div className="px-3 py-2 rounded-3 bg-white border">
              <span className="small text-secondary me-2">المادة:</span>
              <span className="fw-medium">{subjectName}</span>
            </div>
            <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 bg-white border">
              <Clock size={20} className="text-primary" />
              <span className="fw-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="h4 fw-bold mb-0">سؤال {currentQuestion + 1} من {questions.length}</h2>
            <span className="text-secondary small">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% مكتمل
            </span>
          </div>
          <div className="progress bg-secondary bg-opacity-25" style={{ height: "8px" }}>
            <motion.div
              className="progress-bar bg-gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border rounded-4 p-4 p-md-5 mb-4 shadow-sm"
        >
          <h3 className="h4 fw-semibold mb-5 lh-base">{currentQuestionData.question}</h3>

          <div className="d-flex flex-column">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={getOptionClass(index)}
                style={{ backgroundColor: selectedAnswer === index && !showFeedback ? '#EEF2FF' : undefined }}
              >
                <span>{option}</span>
                {showFeedback && index === currentQuestionData.correctAnswer && (
                  <CheckCircle2 size={24} className="text-success ms-2 flex-shrink-0" />
                )}
                {showFeedback && selectedAnswer === index && index !== currentQuestionData.correctAnswer && (
                  <XCircle size={24} className="text-danger ms-2 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>

          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-4 border ${
                isCorrect ? "bg-success bg-opacity-10 border-success border-opacity-25" : "bg-danger bg-opacity-10 border-danger border-opacity-25"
              }`}
            >
              <div className="d-flex align-items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 size={24} className="text-success flex-shrink-0 mt-1" />
                ) : (
                  <XCircle size={24} className="text-danger flex-shrink-0 mt-1" />
                )}
                <div>
                  <h4 className="h5 fw-semibold mb-2">
                    {isCorrect ? "صح! 🎉" : "غلط ❌"}
                  </h4>
                  <p className="small text-dark mb-0 opacity-75">{currentQuestionData.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="d-flex gap-3 mt-4">
          {!showFeedback ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className="btn btn-primary flex-grow-1 py-3 px-4 rounded-3 fw-medium shadow-sm"
            >
              تحقق من الإجابة
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn btn-success flex-grow-1 py-3 px-4 rounded-3 fw-medium shadow-sm"
            >
              {currentQuestion < questions.length - 1 ? "السؤال التالي" : "تسليم الاختبار"}
            </button>
          )}
        </div>

        <div className="mt-3 text-center">
          <span className="small text-secondary">
            تم إجابة {answers.filter(a => a !== undefined && a !== null).length} من {questions.length} أسئلة
          </span>
        </div>
      </div>
      <style>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa !important;
        }
      `}</style>
    </div>
  );
}