import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  asDiv?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  ariaLabel,
  type = "button",
  disabled = false,
  asDiv = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({ x: distanceX * 0.2, y: distanceY * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>,
  ) => {
    if (disabled) return;
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipples((prev) => [...prev, { x, y, id: Date.now() }]);
      setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
    }
    if (onClick) onClick(e);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      className="relative overflow-hidden w-full h-full"
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{ left: r.x, top: r.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full animate-ping pointer-events-none"
        />
      ))}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={handleClick}
        className={`inline-block ${className}`}
      >
        {content}
      </a>
    );
  }

  if (asDiv) {
    return (
      <div aria-label={ariaLabel} onClick={handleClick} className={`inline-block ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      className={`inline-block bg-transparent p-0 border-none cursor-pointer ${className}`}
    >
      {content}
    </button>
  );
}
