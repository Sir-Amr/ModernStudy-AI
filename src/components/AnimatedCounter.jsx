import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export function AnimatedCounter({ value, duration = 1000, prefix = "", suffix = "", className = "" }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  const displayValue = useTransform(spring, (v) => Math.round(v));

  return (
    <motion.span className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}