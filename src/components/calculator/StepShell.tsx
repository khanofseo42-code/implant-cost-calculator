"use client";

import { motion } from "framer-motion";

interface StepShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function StepShell({ title, description, children }: StepShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-7">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
          {title}
        </h2>
        <p className="mt-2 text-[15px] text-foreground-muted">{description}</p>
      </div>
      {children}
    </motion.div>
  );
}
