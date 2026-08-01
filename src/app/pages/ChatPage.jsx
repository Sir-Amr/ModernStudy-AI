import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router";
import { ChevronLeft, Send, Sparkles, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

export function ChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "أهلاً! أنا مساعد المذاكرة بتاعك. حللت الـ PDF بتاعك عن ميكانيكا الكم. اسألني أي حاجة عن المادة!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "اشرحلي ازدواجية الموجة-الجسيم بطريقة بسيطة",
    "إيه الفرق بين الميكانيكا الكلاسيكية والكمية؟",
    "معادلة شرودنجر بتشتغل إزاي؟",
    "ممكن تديني أمثلة على التراكب الكمي؟",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    setMessages([...messages, { role: "user", content: messageText }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "ازدواجية الموجة-الجسيم من أهم المفاهيم في ميكانيكا الكم. بتقول إن كل جسيم أو كيان كمي ممكن يتوصف كجسيم أو كموجة. ده اتبرهن أول مرة في تجربة الشق المزدوج، لما الإلكترونات أظهرت أنماط تداخل (سلوك موجي) لما محدش يراقبها، بس سلوك جسيمي لما تتقاس.",
        "سؤال ممتاز! الميكانيكا الكلاسيكية اللي طورها نيوتن بتشتغل كويس للأجسام الكبيرة اللي بتتحرك بسرعات عادية. بس على المستوى الذري وتحت الذري، الجسيمات بتتصرف مختلف جداً. ميكانيكا الكم بتقدم مفاهيم زي التراكب، عدم اليقين، وتكميم الطاقة اللي مش موجودة في الفيزياء الكلاسيكية.",
        "معادلة شرودنجر هي المعادلة الأساسية في ميكانيكا الكم. هي صيغة رياضية بتوصف إزاي الحالة الكمية لنظام فيزيائي بتتغير مع الوقت. افتكرها زي المعادل الكمي لقوانين نيوتن للحركة - بتقولنا الأنظمة الكمية بتتطور إزاي.",
        "التراكب الكمي معناه إن الجسيم ممكن يكون في حالات متعددة في نفس الوقت لحد ما يتقاس. المثال الشهير هو قطة شرودنجر - نظرياً حية وميتة في نفس الوقت لحد ما تتراقب. في التطبيقات الحقيقية، الكيوبتس في الكمبيوترات الكمية بتستخدم التراكب عشان تعالج حسابات متعددة في نفس الوقت.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: randomResponse },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="vh-100 bg-light d-flex flex-column">
      <div className="border-bottom bg-white px-4 py-3">
        <div className="container d-flex align-items-center justify-content-between" style={{ maxWidth: '800px' }}>
          <div className="d-flex align-items-center gap-3">
            <Link
              to="/dashboard"
              className="d-inline-flex align-items-center gap-2 text-secondary text-decoration-none link-dark"
            >
              <ChevronLeft size={16} />
              رجوع
            </Link>
            <div>
              <h2 className="h5 fw-semibold mb-0">مساعد المذاكرة AI</h2>
              <p className="small text-secondary mb-0">فيزياء: ميكانيكا الكم</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-3 bg-success bg-opacity-10 text-success">
            <div className="rounded-circle bg-success mt-1" style={{ width: '8px', height: '8px', animation: 'pulse 2s infinite' }} />
            <span className="small fw-medium">متصل</span>
          </div>
        </div>
      </div>

      <div className="flex-grow-1 overflow-auto px-4 py-4">
        <div className="container d-flex flex-column gap-4" style={{ maxWidth: '800px' }}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`d-flex gap-3 ${message.role === "user" ? "justify-content-end" : ""}`}
            >
              {message.role === "assistant" && (
                <div className="rounded-3 bg-gradient-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                  <Sparkles size={20} className="text-white" />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-4 shadow-sm ${
                  message.role === "user"
                    ? "bg-primary text-white"
                    : "bg-white border text-dark"
                }`}
                style={{ maxWidth: '600px' }}
              >
                <p className="mb-0 lh-lg">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="rounded-3 bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                  <span className="fs-5">👤</span>
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="d-flex gap-3"
            >
              <div className="rounded-3 bg-gradient-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="bg-white border px-4 py-3 rounded-4">
                <div className="d-flex gap-1 align-items-center h-100">
                  <div className="rounded-circle bg-secondary" style={{ width: '8px', height: '8px', animation: 'bounce 1.4s infinite ease-in-out both' }} />
                  <div className="rounded-circle bg-secondary" style={{ width: '8px', height: '8px', animation: 'bounce 1.4s infinite ease-in-out both 150ms' }} />
                  <div className="rounded-circle bg-secondary" style={{ width: '8px', height: '8px', animation: 'bounce 1.4s infinite ease-in-out both 300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          {messages.length === 1 && (
            <div className="mt-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Lightbulb size={20} className="text-warning" />
                <h3 className="h6 fw-semibold text-secondary mb-0">أسئلة مقترحة</h3>
              </div>
              <div className="row g-2">
                {suggestedQuestions.map((question, index) => (
                  <div key={index} className="col-md-6">
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSend(question)}
                      className="btn w-100 h-100 p-3 rounded-4 bg-white border text-start btn-hover-primary-outline"
                    >
                      {question}
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-top bg-white px-4 py-3">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="d-flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اسألني أي حاجة عن مادة المذاكرة..."
              className="form-control px-4 py-3 rounded-3 bg-light border-0"
              style={{ boxShadow: 'none' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="btn btn-primary px-4 rounded-3 d-flex align-items-center justify-content-center shadow-sm"
              style={{ minWidth: '64px' }}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="small text-secondary text-center mt-2 mb-0">
            إجابات الذكاء الاصطناعي مبنية على محتوى الـ PDF بتاعك
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .btn-hover-primary-outline:hover {
          border-color: var(--bs-primary) !important;
          background-color: var(--bs-light) !important;
        }
      `}</style>
    </div>
  );
}
