"use client";
import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface FramerProps {
  children: ReactNode;
}

const Framer: React.FC<FramerProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [shake, setShake] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (ref.current) {
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);

      // Calculate shake effect
      const shakeX = (Math.random() - 0.5) * 10; // random shake on x-axis
      const shakeY = (Math.random() - 0.5) * 10; // random shake on y-axis

      setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
      setShake({ x: shakeX, y: shakeY });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setShake({ x: 0, y: 0 });
  };

  const { x, y } = position;
  const { x: shakeX, y: shakeY } = shake;

  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: x + shakeX, y: y + shakeY }}
      transition={{ type: "spring", stiffness: 350, damping: 5, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Framer;
