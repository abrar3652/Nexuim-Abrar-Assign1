"use client";
import { useId, useMemo, useRef, useEffect, useState } from "react";

interface PopularTopicsSliderProps {
  topics: string[];
  onSelect: (topic: string) => void;
}

const ROWS = 3;
const SPEEDS = [32, 24, 36]; // seconds per loop for each row

function shuffle(array: string[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function PopularTopicsSlider({ topics, onSelect }: PopularTopicsSliderProps) {
  const rows = useMemo(() => {
    // Shuffle and split topics for each row independently
    const shuffled = shuffle(topics);
    const perRow = Math.ceil(shuffled.length / ROWS);
    return Array.from({ length: ROWS }, (_, i) => {
      const chunk = shuffled.slice(i * perRow, (i + 1) * perRow);
      return chunk.length > 0 ? chunk : shuffled;
    });
  }, [topics]);
  const id = useId();
  // --- Robust marquee logic ---
  const duration = 36; // seconds, same for all rows
  return (
    <div className="w-full overflow-hidden flex flex-col gap-4 py-4">
      {rows.map((row, i) => {
        const isReverse = i % 2 === 1;
        const animName = `${id}-slide-${i}`;
        // Duplicate row 3x for seamless infinite scroll
        const fullRow = [...row, ...row, ...row];
        return (
          <div
            key={i}
            className="flex gap-3 whitespace-nowrap relative"
            style={{ flexDirection: isReverse ? "row-reverse" : "row" }}
          >
            <style>{`
              @keyframes ${animName} {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.333%); }
              }
            `}</style>
            <div
              className="flex gap-3"
              style={{
                width: '300%',
                animation: `${animName} ${duration}s linear infinite`,
                animationDirection: isReverse ? "reverse" : "normal",
              }}
            >
              {fullRow.map((topic, idx) => (
                <button
                  key={topic + idx}
                  type="button"
                  onClick={() => onSelect(topic)}
                  className="flex items-center justify-center px-8 py-2 rounded-full bg-card border border-primary/30 shadow-md font-medium text-primary transition-all duration-200 transition-[border] duration-[1ms] cursor-pointer text-sm sm:text-base mx-1
                    hover:text-[#1e3a8a] hover:border-[#1e3a8a] hover:border-2 hover:font-bold
                    dark:hover:text-[#fbbf24] dark:hover:border-[#fbbf24] dark:hover:border-2 dark:hover:font-bold"
                  aria-label={`Search quotes for ${topic}`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
} 