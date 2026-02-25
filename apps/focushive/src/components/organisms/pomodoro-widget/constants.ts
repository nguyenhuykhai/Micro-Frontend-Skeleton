import type { Mode, ModeConfig } from "./types";

export const MODES: Record<Mode, ModeConfig> = {
  POMODORO: {
    name: "Pomodoro",
    duration: 25 * 60,
    colorCfg: {
      colors: ["#ffffff", "#facc15", "#ef4444"],
      colorsTime: [25 * 60, Math.round((25 * 60) / 2), 0],
    },
  },
  SHORT_BREAK: {
    name: "Short Break",
    duration: 5 * 60,
    colorCfg: {
      colors: ["#ffffff", "#86efac", "#4ade80"],
      colorsTime: [5 * 60, Math.round((5 * 60) / 2), 0],
    },
  },
  LONG_BREAK: {
    name: "Long Break",
    duration: 15 * 60,
    colorCfg: {
      colors: ["#ffffff", "#7dd3fc", "#38bdf8"],
      colorsTime: [15 * 60, Math.round((15 * 60) / 2), 0],
    },
  },
};

export const MODE_ORDER: Mode[] = ["POMODORO", "SHORT_BREAK", "LONG_BREAK"];
