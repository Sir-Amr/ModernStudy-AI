import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText, X, Loader2, CheckCircle2, AlertCircle, File } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../hooks/useToast";
import { useData } from "../contexts/DataContext";

export function UploadPage() {
  const navigate = useNavigate();
  const { showSuccess, showError, showLoading } = useToast();
  const { addSubject, addActivity } = useData();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      showError("نوع الملف غير مدعوم", "يرجى رفع ملف بصيغة PDF فقط");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      showError("الملف كبير جداً", "الحد الأقصى لحجم الملف هو 20 ميجابايت");
      return;
    }

    setFile(selectedFile);
    setUploadStatus("idle");
    showSuccess("تم رفع الملف بنجاح", `${selectedFile.name} جاهز للمعالجة`);
  };

  // ✅ دالة handleStartLearning المطلوبة
  const handleStartLearning = () => {
    setIsProcessing(true);
    setUploadStatus("uploading");

    let currentProgress = 0;
    showLoading("جاري رفع الملف...", "الرجاء الانتظار");

    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setUploadStatus("processing");

        setTimeout(() => {
          setUploadStatus("complete");

          const colors = ["#4F46E5", "#22C55E", "#f59e0b", "#ec4899", "#8B5CF6", "#06B6D4"];
          const icons = ["📐", "⚛️", "💻", "🧬", "📊", "🎯", "📈", "🔬"];
          
          const newSubject = {
            name: file.name.replace('.pdf', '').replace(/_/g, ' '),
            progress: Math.floor(Math.random() * 15) + 5, // ✅ يبدأ بـ 5-20% مش 0%
            lastStudied: "الآن",
            color: colors[Math.floor(Math.random() * colors.length)],
            icon: icons[Math.floor(Math.random() * icons.length)],
            topics: Math.floor(Math.random() * 12) + 3,
            quizScore: 0,
          };
          
          addSubject(newSubject);
          addActivity(`رفعت مادة جديدة: ${newSubject.name}`, "upload");
          
          showSuccess("تمت المعالجة بنجاح!", "ملفك جاهز للمذاكرة");
          setTimeout(() => navigate("/dashboard"), 800);
        }, 1500);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 150);
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    setUploadStatus("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-vh-100 bg-light p-4 p-md-5">
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <h1 className="h1 fw-bold mb-3">ارفع مادة المذاكرة</h1>
          <p className="fs-5 text-secondary">
            ارفع ملف الـ PDF وخلي الذكاء الاصطناعي يحوله لتجربة تعليم تفاعلية
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isProcessing ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="d-flex flex-column gap-4"
            >
              {/* Drop Zone */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`position-relative border border-2 rounded-4 p-5 text-center transition-all ${
                  isDragging
                    ? "border-primary text-primary"
                    : file
                    ? "border-success text-success"
                    : "border-secondary text-dark bg-white"
                }`}
                style={{
                  borderStyle: "dashed",
                  backgroundColor: isDragging ? "#EEF2FF" : file ? "#F0FDF4" : "#ffffff",
                  transition: "all 0.3s ease",
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                  style={{ cursor: "pointer" }}
                />

                {!file ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Upload size={64} className="mx-auto mb-4 text-primary" />
                    </motion.div>
                    <h3 className="h3 fw-semibold mb-3">حط ملف الـ PDF هنا</h3>
                    <p className="text-secondary mb-4">أو اضغط عشان تختار من جهازك</p>
                    <motion.div
                      className="d-inline-block px-4 py-2 rounded-3 bg-primary text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      اختار ملف
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="d-flex align-items-center justify-content-center gap-3"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 size={48} className="text-success" />
                    </motion.div>
                    <div className="text-start">
                      <h3 className="h5 fw-semibold mb-1">{file.name}</h3>
                      <p className="text-secondary mb-0">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="btn btn-light rounded-3 ms-3"
                    >
                      <X size={20} />
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>

              {/* File Preview & Actions */}
              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border rounded-4 p-4 p-md-5 shadow-sm"
                >
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h3 className="h4 fw-semibold mb-0">معاينة الملف</h3>
                    <motion.span
                      className="badge rounded-pill px-3 py-2 bg-success bg-opacity-10 text-success"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      ✓ جاهز للمعالجة
                    </motion.span>
                  </div>

                  <div className="d-flex align-items-start gap-3 p-4 bg-light rounded-3">
                    <motion.div
                      className="bg-white rounded-3 shadow-sm d-flex align-items-center justify-content-center border"
                      style={{ width: '48px', height: '64px' }}
                      whileHover={{ rotate: 5 }}
                    >
                      <FileText size={24} className="text-primary" />
                    </motion.div>
                    <div className="flex-grow-1">
                      <h4 className="fw-semibold mb-1">{file.name}</h4>
                      <p className="small text-secondary mb-3">
                        ملف PDF • {(file.size / 1024 / 1024).toFixed(2)} ميجا
                      </p>
                      <div className="d-flex gap-2 small flex-wrap">
                        <span className="px-3 py-1 rounded-pill bg-primary bg-opacity-10 text-primary">
                          🧠 معالج بالذكاء الاصطناعي
                        </span>
                        <span className="px-3 py-1 rounded-pill bg-success bg-opacity-10 text-success">
                          📊 تحليل تلقائي
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartLearning}
                    className="btn btn-primary w-100 mt-4 px-4 py-3 rounded-3 shadow-sm fs-5 fw-medium"
                  >
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🚀 ابدأ المذاكرة
                    </motion.span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border rounded-4 p-5 text-center shadow-lg"
            >
              <div className="d-flex flex-column align-items-center">
                {uploadStatus === "uploading" && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 size={64} className="text-primary" />
                    </motion.div>
                    <h3 className="h3 fw-semibold mt-4 mb-2">جاري رفع الملف...</h3>
                    <p className="text-secondary">الرجاء الانتظار، الملف بيتحمل</p>
                  </>
                )}
                {uploadStatus === "processing" && (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <File size={64} className="text-warning" />
                    </motion.div>
                    <h3 className="h3 fw-semibold mt-4 mb-2">بنحلل الملف...</h3>
                    <p className="text-secondary">الذكاء الاصطناعي بيستخرج المعلومات</p>
                  </>
                )}
                {uploadStatus === "complete" && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 size={64} className="text-success" />
                    </motion.div>
                    <h3 className="h3 fw-semibold mt-4 mb-2">تمت المعالجة!</h3>
                    <p className="text-secondary">ملفك جاهز للمذاكرة 🎉</p>
                  </>
                )}
                {uploadStatus === "error" && (
                  <>
                    <AlertCircle size={64} className="text-danger" />
                    <h3 className="h3 fw-semibold mt-4 mb-2">حدث خطأ</h3>
                    <p className="text-secondary">حاول مرة أخرى أو تواصل مع الدعم</p>
                  </>
                )}

                {/* Progress Bar */}
                <div className="w-100 mt-4" style={{ maxWidth: '400px' }}>
                  <div className="progress rounded-pill bg-light" style={{ height: '8px' }}>
                    <motion.div
                      className="progress-bar bg-gradient-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span className="small text-secondary">{Math.round(progress)}%</span>
                    <motion.span
                      className="small text-secondary"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {uploadStatus === "uploading" && "رفع..."}
                      {uploadStatus === "processing" && "تحليل..."}
                      {uploadStatus === "complete" && "✓ مكتمل"}
                    </motion.span>
                  </div>
                </div>

                {/* Processing steps */}
                <div className="d-flex gap-3 mt-4 flex-wrap justify-content-center">
                  {[
                    { label: "رفع الملف", status: uploadStatus !== "idle" && uploadStatus !== "error" },
                    { label: "استخراج النص", status: uploadStatus === "processing" || uploadStatus === "complete" },
                    { label: "تحليل الذكاء", status: uploadStatus === "complete" },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      className="d-flex align-items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center ${
                          step.status ? "bg-success" : "bg-secondary bg-opacity-25"
                        }`}
                        style={{ width: "24px", height: "24px" }}
                      >
                        {step.status && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className={`small ${step.status ? "text-dark" : "text-secondary"}`}>
                        {step.label}
                      </span>
                      {i < 2 && <span className="text-secondary">→</span>}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}