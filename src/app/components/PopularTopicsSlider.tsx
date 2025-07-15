"use client";
import { useId } from "react";

interface PopularTopicsSliderProps {
  topics: string[];
  onSelect: (topic: string) => void;
}

const ROWS = 3;

function getRows(topics: string[], rows: number) {
  const perRow = Math.ceil(topics.length / rows);
  return Array.from({ length: rows }, (_, i) =>
    topics.slice(i * perRow, (i + 1) * perRow)
  );
}

export default function PopularTopicsSlider({ topics, onSelect }: PopularTopicsSliderProps) {
  const rows = getRows(topics, ROWS);
  const id = useId();
  return (
    <div className="w-full overflow-hidden flex flex-col gap-4 py-4">
      {rows.map((row, i) => {
        const isReverse = i % 2 === 1;
        // Repeat topics enough to fill the row and ensure seamless loop
        const repeatCount = 8; // Large enough for all screens
        const rowTopics = Array.from({ length: repeatCount }, () => isReverse ? [...row].reverse() : row).flat();
        const animName = `${id}-slide-${i}`;
        const speed = [32, 24, 36][i % 3];
        return (
          <div
            key={i}
            className="flex gap-3 whitespace-nowrap relative"
            style={{ flexDirection: isReverse ? "row-reverse" : "row" }}
          >
            <style>{`
              @keyframes ${animName} {
                0% { transform: translateX(0); }
                100% { transform: translateX(${isReverse ? "100%" : "-100%"}); }
              }
            `}</style>
            <div
              className="flex gap-3 min-w-full"
              style={{
                animation: `${animName} ${speed}s linear infinite`,
                animationDirection: isReverse ? "reverse" : "normal",
              }}
            >
              {rowTopics.map((topic, idx) => (
                <button
                  key={topic + idx}
                  type="button"
                  onClick={() => onSelect(topic)}
                  className="px-5 py-2 rounded-full bg-white/90 border border-primary/30 shadow-md hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary font-medium text-primary transition-all duration-200 cursor-pointer text-sm sm:text-base mx-1 min-w-[110px]"
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