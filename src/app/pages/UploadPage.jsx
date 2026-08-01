import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText, X, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

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
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    }
  };

  const handleStartLearning = () => {
    setIsProcessing(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => navigate("/dashboard"), 500);
      }
    }, 200);
  };

  return (
    <div className="min-vh-100 bg-light p-4 p-md-5">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="mb-5">
          <h1 className="h1 fw-bold mb-3">ارفع مادة المذاكرة</h1>
          <p className="fs-5 text-secondary">
            ارفع ملف الـ PDF وخلي الذكاء الاصطناعي يحوله لتجربة تعليم تفاعلية
          </p>
        </div>

        {!isProcessing ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="d-flex flex-column gap-4"
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`position-relative border border-2 rounded-4 p-5 text-center transition-all ${
                isDragging
                  ? "border-primary text-primary"
                  : file
                  ? "border-success text-success"
                  : "border-secondary text-dark bg-white"
              }`}
              style={{
                borderStyle: "dashed",
                backgroundColor: isDragging ? "#EEF2FF" : file ? "#F0FDF4" : "#ffffff"
              }}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                style={{ cursor: "pointer" }}
              />

              {!file ? (
                <div>
                  <Upload size={64} className="mx-auto mb-4 text-primary" />
                  <h3 className="h3 fw-semibold mb-3">حط ملف الـ PDF هنا</h3>
                  <p className="text-secondary mb-4">أو اضغط عشان تختار من جهازك</p>
                  <div className="d-inline-block px-4 py-2 rounded-3 bg-primary text-white">
                    اختار ملف
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <CheckCircle2 size={48} className="text-success" />
                  <div className="text-start">
                    <h3 className="h5 fw-semibold mb-1">{file.name}</h3>
                    <p className="text-secondary mb-0">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="btn btn-light rounded-3 ms-3"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {file && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border rounded-4 p-4 p-md-5"
              >
                <h3 className="h4 fw-semibold mb-4">معاينة الملف</h3>
                <div className="d-flex align-items-start gap-3 p-4 bg-light rounded-3">
                  <div className="bg-white rounded-3 shadow-sm d-flex align-items-center justify-content-center border" style={{ width: '48px', height: '64px' }}>
                    <FileText size={24} className="text-primary" />
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="fw-semibold mb-1">{file.name}</h4>
                    <p className="small text-secondary mb-3">
                      ملف PDF • {(file.size / 1024 / 1024).toFixed(2)} ميجا
                    </p>
                    <div className="d-flex gap-2 small">
                      <span className="px-3 py-1 rounded-pill bg-primary bg-opacity-10 text-primary">
                        جاهز للمعالجة
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartLearning}
                  className="btn btn-primary w-100 mt-4 px-4 py-3 rounded-3 shadow-sm fs-5 fw-medium"
                >
                  ابدأ المذاكرة
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border rounded-4 p-5 text-center"
          >
            <Loader2 size={64} className="mx-auto mb-4 text-primary animate-spin" style={{ animation: "spin 1s linear infinite" }} />
            <h3 className="h3 fw-semibold mb-3">بنعالج الـ PDF بتاعك</h3>
            <p className="text-secondary mb-5">
              الذكاء الاصطناعي بيحلل المادة دلوقتي...
            </p>

            <div className="mx-auto" style={{ maxWidth: '400px' }}>
              <div className="progress rounded-pill bg-light" style={{ height: '12px' }}>
                <motion.div
                  className="progress-bar bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="small text-secondary mt-3">{progress}% اكتمل</p>
            </div>
          </motion.div>
        )}
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
