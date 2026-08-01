import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router";
import { ChevronLeft, Send, Sparkles, Lightbulb, Mic, Paperclip, MoreVertical, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../hooks/useToast";

export function ChatPage() {
  const { id } = useParams();
  const { showSuccess } = useToast();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "أهلاً! أنا مساعد المذاكرة بتاعك. حللت الـ PDF بتاعك عن ميكانيكا الكم. اسألني أي حاجة عن المادة!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generateResponse = (userMessage) => {
    const responses = [
      "ازدواجية الموجة-الجسيم من أهم المفاهيم في ميكانيكا الكم. بتقول إن كل جسيم أو كيان كمي ممكن يتوصف كجسيم أو كموجة. ده اتبرهن أول مرة في تجربة الشق المزدوج، لما الإلكترونات أظهرت أنماط تداخل (سلوك موجي) لحد ما يتراقبها، بس سلوك جسيمي لما تتقاس.",
      "سؤال ممتاز! الميكانيكا الكلاسيكية اللي طورها نيوتن بتشتغل كويس للأجسام الكبيرة اللي بتتحرك بسرعات عادية. بس على المستوى الذري وتحت الذري، الجسيمات بتتصرف مختلف جداً. ميكانيكا الكم بتقدم مفاهيم زي التراكب، عدم اليقين، وتكميم الطاقة اللي مش موجودة في الفيزياء الكلاسيكية.",
      "معادلة شرودنجر هي المعادلة الأساسية في ميكانيكا الكم. هي صيغة رياضية بتوصف إزاي الحالة الكمية لنظام فيزيائي بتتغير مع الوقت. افتكرها زي المعادل الكمي لقوانين نيوتن للحركة - بتقولنا الأنظمة الكمية بتتطور إزاي.",
      "التراكب الكمي معناه إن الجسيم ممكن يكون في حالات متعددة في نفس الوقت لحد ما يتقاس. المثال الشهير هو قطة شرودنجر - نظرياً حية وميتة في نفس الوقت لحد ما تتراقب. في التطبيقات الحقيقية، الكيوبتس في الكمبيوترات الكمية بتستخدم التراكب عشان تعالج حسابات متعددة في نفس الوقت.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(messageText);
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      showSuccess("التعرف على الصوت غير مدعوم", "جرب استخدام متصفح Chrome");
      return;
    }
    setIsRecording(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsRecording(false);
      setInput(prev => prev + " (نص من الصوت)");
      showSuccess("تم التعرف على الصوت", "النص اتكتب في خانة الإدخال");
    }, 2000);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="vh-100 bg-light d-flex flex-column">
      {/* Header */}
      <div className="border-bottom bg-white px-4 py-3 flex-shrink-0">
        <div className="container d-flex align-items-center justify-content-between" style={{ maxWidth: '900px' }}>
          <div className="d-flex align-items-center gap-3">
            <Link
              to="/dashboard"
              className="d-inline-flex align-items-center gap-2 text-secondary text-decoration-none link-dark"
            >
              <ChevronLeft size={16} />
              رجوع
            </Link>
            <motion.div
              className="d-flex align-items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="rounded-3 bg-gradient-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h2 className="h5 fw-semibold mb-0">مساعد المذاكرة AI</h2>
                <p className="small text-secondary mb-0">فيزياء: ميكانيكا الكم</p>
              </div>
            </motion.div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <motion.div
              className="d-flex align-items-center gap-2 px-3 py-1 rounded-3 bg-success bg-opacity-10 text-success"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="rounded-circle bg-success" style={{ width: '8px', height: '8px' }} />
              <span className="small fw-medium">متصل</span>
            </motion.div>
            <motion.button
              className="btn btn-light btn-sm rounded-3 border-0"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <MoreVertical size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow-1 overflow-auto px-4 py-4">
        <div className="container d-flex flex-column gap-4" style={{ maxWidth: '900px' }}>
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`d-flex gap-3 ${message.role === "user" ? "justify-content-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <motion.div
                    className="rounded-3 bg-gradient-primary d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '40px', height: '40px' }}
                    whileHover={{ rotate: 20 }}
                  >
                    <Sparkles size={20} className="text-white" />
                  </motion.div>
                )}
                <motion.div
                  className={`px-4 py-3 rounded-4 shadow-sm ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white border text-dark"
                  }`}
                  style={{ maxWidth: '75%' }}
                  whileHover={message.role === "assistant" ? { scale: 1.01 } : {}}
                >
                  <p className="mb-1 lh-lg">{message.content}</p>
                  <span className={`small ${message.role === "user" ? "text-white-50" : "text-secondary"}`}>
                    {formatTime(message.timestamp)}
                  </span>
                </motion.div>
                {message.role === "user" && (
                  <motion.div
                    className="rounded-3 bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '40px', height: '40px' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <User size={20} className="text-secondary" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="d-flex gap-3"
            >
              <div className="rounded-3 bg-gradient-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="bg-white border px-4 py-3 rounded-4 shadow-sm">
                <div className="d-flex gap-1 align-items-center h-100">
                  {[0, 150, 300].map((delay) => (
                    <motion.div
                      key={delay}
                      className="rounded-circle bg-secondary"
                      style={{ width: '8px', height: '8px' }}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: delay / 1000,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Suggested questions */}
          {messages.length === 1 && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
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
                      transition={{ delay: 0.6 + index * 0.1 }}
                      onClick={() => handleSend(question)}
                      className="btn w-100 h-100 p-3 rounded-4 bg-white border text-start btn-hover-primary-outline"
                      whileHover={{ scale: 1.02, borderColor: '#4F46E5' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {question}
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-top bg-white px-4 py-3 flex-shrink-0">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="d-flex gap-2 align-items-center">
            <motion.button
              className="btn btn-light rounded-3 border-0 px-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleVoiceInput}
            >
              <Mic size={20} className={isRecording ? "text-danger" : "text-secondary"} />
            </motion.button>
            <motion.button
              className="btn btn-light rounded-3 border-0 px-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Paperclip size={20} className="text-secondary" />
            </motion.button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اسألني أي حاجة عن مادة المذاكرة..."
              className="form-control px-4 py-3 rounded-3 bg-light border-0"
              style={{ boxShadow: 'none' }}
            />

            <motion.button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="btn btn-primary px-4 rounded-3 d-flex align-items-center justify-content-center shadow-sm"
              style={{ minWidth: '56px', height: '52px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={20} />
            </motion.button>
          </div>
          <p className="small text-secondary text-center mt-2 mb-0">
            إجابات الذكاء الاصطناعي مبنية على محتوى الـ PDF بتاعك
          </p>
        </div>
      </div>

      <style>{`
        .btn-hover-primary-outline:hover {
          border-color: var(--bs-primary) !important;
          background-color: var(--bs-light) !important;
        }
      `}</style>
    </div>
  );
}