"use client";

import { useState, useId } from "react";
import { Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface TooltipProps {
  content: string;
  className?: string;
}

export function Tooltip({ content, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className={cn("relative inline-flex", className)}>
      <button
        type="button"
        aria-describedby={id}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className="focus-ring inline-flex h-5 w-5 items-center justify-center rounded-full text-foreground-muted hover:text-brand-600"
      >
        <Info className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">More information</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-xl border border-border-subtle bg-surface p-3 text-xs leading-relaxed text-foreground shadow-premium-lg"
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
