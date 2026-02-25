import type { Mode } from "./types";
import { MODE_ORDER } from "./constants";

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function skipMode(current: Mode): Mode {
  const idx = MODE_ORDER.indexOf(current);
  return MODE_ORDER[(idx + 1) % MODE_ORDER.length];
}

export function endMode(current: Mode): Mode {
  return current === "POMODORO" ? "SHORT_BREAK" : "POMODORO";
}
