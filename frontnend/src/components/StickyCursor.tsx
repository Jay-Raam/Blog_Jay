"use client";
import { useEffect, useState, RefObject } from "react";
import styles from "@/components/styles/styles.module.css";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface IndexProps {
  stickyElement: RefObject<HTMLElement>;
}

const CustomCursor: React.FC<IndexProps> = ({ stickyElement }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cursorSize = isHovered ? 50 : 15;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    if (!stickyElement.current) return;

    const { left, top, height, width } =
      stickyElement.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };

    if (isHovered) {
      const distance = { x: clientX - center.x, y: clientY - center.y };
      mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
      mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
    } else {
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    }
  };

  const manageMouseOver = () => setIsHovered(true);
  const manageMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    if (!stickyElement.current) return;

    stickyElement.current.addEventListener("mouseenter", manageMouseOver);
    stickyElement.current.addEventListener("mouseleave", manageMouseLeave);
    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      stickyElement.current?.removeEventListener("mouseenter", manageMouseOver);
      stickyElement.current?.removeEventListener(
        "mouseleave",
        manageMouseLeave
      );
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [isHovered, stickyElement]);

  return (
    <div className={styles.cursorContainer}>
      <motion.div
        style={{ left: smoothMouse.x, top: smoothMouse.y }}
        animate={{ width: cursorSize, height: cursorSize }}
        className={styles.cursor}
      />
    </div>
  );
};

export default CustomCursor;
