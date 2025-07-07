"use client";
import { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";

interface InputFormProps {
  onSubmit: (topic: string) => void;
  loading?: boolean;
}

export default function InputForm({ onSubmit, loading }: InputFormProps) {
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }
    setError("");
    onSubmit(topic.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto" aria-label="Quote topic form">
      <Label htmlFor="topic-input" className="block text-lg font-medium">
        Topic
      </Label>
      <Input
        id="topic-input"
        name="topic"
        type="text"
        placeholder="Enter a topic (e.g., motivation, love, success)"
        value={topic}
        onChange={e => setTopic(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? "topic-error" : undefined}
        className="bg-background text-foreground focus-visible:ring-2 focus-visible:ring-primary"
        autoComplete="off"
      />
      {error && (
        <div id="topic-error" role="alert" className="text-red-600 text-sm">
          {error}
        </div>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Loading..." : "Get Quotes"}
      </Button>
    </form>
  );
} 