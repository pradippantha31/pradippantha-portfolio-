import { useEffect, useState } from "react";

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const isDesktop = window.innerWidth >= 900;

    if (reduceMotionQuery.matches || coarsePointerQuery.matches || !isDesktop) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 200, y: e.clientY - 200 });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-radial from-sky-500/15 via-teal-500/5 to-transparent blur-3xl z-30"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      aria-hidden="true"
    />
  );
}
