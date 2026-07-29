import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-500 z-50 origin-left shadow-[0_0_12px_rgba(56,189,248,0.8)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
