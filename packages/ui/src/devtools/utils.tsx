import { EVENT_CATEGORIES } from "./constants";
import type { CategoryKey } from "./types";

export const getEventCategory = (eventName: string): CategoryKey => {
  const prefix = eventName.split(":")[0];
  return (prefix in EVENT_CATEGORIES ? prefix : "default") as CategoryKey;
};

export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });
};

export const highlightText = (text: string, search: string) => {
  if (!search.trim()) return text;

  const regex = new RegExp(
    `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-amber-500/30 text-amber-200 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  );
};
