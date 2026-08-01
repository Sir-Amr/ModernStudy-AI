import { motion } from "motion/react";

export function SkeletonCard({ className = "" }) {
  return (
    <div className={`bg-white rounded-4 p-4 shadow-sm ${className}`}>
      <div className="d-flex align-items-center gap-3 mb-3">
        <motion.div
          className="rounded-3 bg-secondary bg-opacity-25"
          style={{ width: "48px", height: "48px" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="flex-grow-1">
          <motion.div
            className="bg-secondary bg-opacity-25 rounded-3"
            style={{ height: "16px", width: "60%" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="bg-secondary bg-opacity-25 rounded-3 mt-2"
            style={{ height: "12px", width: "40%" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
      <motion.div
        className="bg-secondary bg-opacity-25 rounded-3"
        style={{ height: "8px", width: "100%" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
    </div>
  );
}