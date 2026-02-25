export type Mode = "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";

export type MultiColorConfig = {
  colors: [`#${string}`, `#${string}`, ...`#${string}`[]];
  colorsTime: [number, number, ...number[]];
};

export interface ModeConfig {
  name: string;
  duration: number; // seconds
  colorCfg: MultiColorConfig;
}
