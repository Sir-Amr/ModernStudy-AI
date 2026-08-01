import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export function ProgressRing({ value = 0, max = 100, size = 120, strokeWidth = 8, color = "#4F46E5", label }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);

  const springValue = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    springValue.set(progress);
  }, [progress, springValue]);

  const strokeDashoffset = useTransform(
    springValue,
    (v) => circumference * (1 - v)
  );

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="position-relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{ strokeDashoffset, strokeDasharray: circumference }}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <motion.span
            className="display-6 fw-bold"
            style={{ color }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {Math.round(progress * 100)}%
          </motion.span>
        </div>
      </div>
      {label && <p className="mt-2 text-secondary small">{label}</p>}
    </div>
  );
}