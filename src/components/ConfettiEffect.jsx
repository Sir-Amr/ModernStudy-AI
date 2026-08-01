import { useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiEffect({ trigger = false, duration = 3000 }) {
  useEffect(() => {
    if (trigger) {
      const end = Date.now() + duration;
      const colors = ["#4F46E5", "#7C3AED", "#22C55E", "#f59e0b", "#ec4899"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [trigger, duration]);

  return null;
}