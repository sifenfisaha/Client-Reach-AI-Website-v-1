"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  viewport?: { once?: boolean; margin?: string };
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  viewport = { once: true, margin: "-100px" },
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: viewport.once, margin: viewport.margin as any });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: delay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.21, 0.47, 0.32, 0.98]
            }
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
