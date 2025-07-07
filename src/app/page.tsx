"use client";
import { useState, useTransition, useEffect } from "react";
import InputForm from "./components/InputForm";
import QuoteList from "./components/QuoteList";
import { quotes } from "./lib/quotes";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "@radix-ui/react-icons";
import PopularTopicsSlider from "./components/PopularTopicsSlider";

const allTopics = [
  "Motivation", "Success", "Love", "Mindfulness", "Happiness", "Confidence", "Leadership", "Wisdom", "Friendship", "Life", "Courage", "Perseverance", "Gratitude", "Change", "Creativity", "Kindness", "Hope", "Freedom", "Passion", "Resilience", "Determination", "Integrity", "Compassion", "Adventure", "Purpose", "Optimism", "Trust", "Growth", "Peace", "Faith", "Ambition", "Balance", "Curiosity", "Empathy", "Forgiveness", "Honesty", "Inspiration", "Joy", "Patience", "Strength", "Dreams", "Belief", "Self-Love", "Authenticity", "Simplicity", "Unity", "Vision", "Acceptance", "Service", "Humor"
];
const popularTopics = allTopics.slice(0, 40);

function getRandomQuotes(topic: string, count = 3) {
  const filtered = quotes.filter(q => q.topic.toLowerCase() === topic.toLowerCase());
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function HomePage() {
  const [results, setResults] = useState<typeof quotes>([]);
  const [loading, startTransition] = useTransition();
  const [searched, setSearched] = useState(false);
  const [finding, setFinding] = useState(false);
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const handleSearch = (topic: string) => {
    setFinding(true);
    setSearched(false);
    setResults([]);
    setTimeout(() => {
      startTransition(() => {
        if (clientReady) {
          setResults(getRandomQuotes(topic, 3));
        }
        setSearched(true);
        setFinding(false);
      });
    }, 1200);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-0 px-2">
      {/* Hero Input Section */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl mx-auto text-center pt-12 pb-6"
      >
        <div className="flex flex-col items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-2 text-2xl font-bold text-primary drop-shadow-sm">
            <StarIcon className="w-7 h-7 animate-pulse text-accent" />
            Quote Generator
          </span>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">Find inspiration, wisdom, and motivation. Search by topic or pick from popular themes below.</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-full max-w-lg mx-auto"
        >
          <InputForm onSubmit={handleSearch} loading={loading || finding} />
        </motion.div>
      </motion.section>
      {/* Popular Topics Section (to be replaced with animated sliding window) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="w-full max-w-4xl mx-auto mb-10"
      >
        <h2 className="text-lg font-semibold mb-3 text-left pl-2">Popular Topics</h2>
        <PopularTopicsSlider topics={allTopics} onSelect={clientReady ? handleSearch : () => {}} />
      </motion.section>
      {/* Quotes Section or Finding Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="w-full max-w-2xl mx-auto min-h-[260px] flex items-center justify-center"
      >
        {finding ? (
          <motion.div
            key="finding"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex gap-2">
              <span className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.2s]" />
              <span className="w-4 h-4 rounded-full bg-accent animate-bounce [animation-delay:.1s]" />
              <span className="w-4 h-4 rounded-full bg-secondary animate-bounce [animation-delay:.3s]" />
            </div>
            <span className="text-primary font-semibold text-lg animate-pulse">Finding quotes...</span>
          </motion.div>
        ) : (
          <QuoteList
            quotes={results}
            emptyState={searched ? "No quotes found for this topic." : undefined}
          />
        )}
      </motion.div>
    </main>
  );
}
