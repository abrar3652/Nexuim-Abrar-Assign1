"use client";
import { motion, AnimatePresence } from "framer-motion";
import { QuoteIcon } from "@radix-ui/react-icons";

interface Quote {
  text: string;
  author?: string;
  topic?: string;
}

interface QuoteListProps {
  quotes: Quote[];
  emptyState?: string;
}

export default function QuoteList({ quotes, emptyState }: QuoteListProps) {
  return (
    <section
      aria-live="polite"
      aria-atomic="true"
      className={`mt-8 w-full max-w-2xl mx-auto ${quotes.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'flex flex-col items-center justify-center'}`}
    >
      <AnimatePresence>
        {quotes.length > 0 ? (
          quotes.map((quote, idx) => (
            <motion.div
              key={quote.text}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative overflow-hidden rounded-3xl bg-card border-2 border-primary/20 shadow-2xl hover:shadow-[0_8px_32px_0_rgba(80,80,200,0.15)] transition-all duration-300 p-10 flex flex-col gap-6 group focus-within:ring-2 focus-within:ring-accent min-h-[240px] max-w-xl mx-auto scale-100 hover:scale-[1.025]"
              role="region"
              aria-label={`Quote ${idx + 1}`}
              tabIndex={0}
            >
              <div className="absolute -top-6 -left-6 bg-primary rounded-full w-24 h-24 blur-2xl opacity-30 pointer-events-none" />
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg dark:bg-[#fbbf24] dark:text-[#0a1833]">
                  <QuoteIcon className="w-6 h-6" />
                </span>
                <span className="uppercase text-xs font-bold tracking-widest text-primary/80">{quote.topic}</span>
              </div>
              <blockquote className="text-xl font-semibold text-foreground leading-snug text-balance">
                “{quote.text}”
              </blockquote>
              {quote.author && (
                <footer className="mt-2 text-sm text-right text-primary font-medium">
                  — {quote.author}
                </footer>
              )}
            </motion.div>
          ))
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-base-content/70 py-8"
            role="alert"
          >
            {emptyState || "No quotes found for this topic."}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 