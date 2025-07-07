"use client";
import { useTheme } from "./theme-provider";
import { SunIcon, MoonIcon, LaptopIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const themes = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: LaptopIcon },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [animating, setAnimating] = useState<string | null>(null);

  const handleToggle = (value: string) => {
    setAnimating(value);
    setTheme(value);
    setTimeout(() => setAnimating(null), 400);
  };

  return (
    <div role="group" aria-label="Theme toggle" className="flex gap-1">
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={`Switch to ${label} mode`}
          className={`p-2 rounded-full border border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary transition-colors ${theme === value ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-accent"}`}
          onClick={() => handleToggle(value)}
        >
          <span className={`inline-block ${animating === value ? "animate-theme-toggle" : ""}`}>
            <Icon className="w-5 h-5" />
          </span>
        </button>
      ))}
      <style jsx global>{`
        @keyframes theme-toggle {
          0% { transform: scale(1) rotate(0deg); opacity: 1; }
          40% { transform: scale(1.3) rotate(20deg); opacity: 0.7; }
          60% { transform: scale(0.9) rotate(-20deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-theme-toggle {
          animation: theme-toggle 0.4s cubic-bezier(.4,2,.6,1) both;
        }
      `}</style>
    </div>
  );
} 