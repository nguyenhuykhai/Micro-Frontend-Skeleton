import { useState } from "react";
import { CountdownCircleTimer } from "@/components/molecules/CountdownCircleTimer";
import { MODE_ORDER, MODES } from "./constants";
import type { Mode } from "./types";
import { endMode, formatTime, skipMode } from "./utils";

const PomodoroWidget = () => {
  const [currentMode, setCurrentMode] = useState<Mode>("POMODORO");
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [remainingTime, setRemainingTime] = useState(MODES.POMODORO.duration);

  const cfg = MODES[currentMode];

  // Handlers
  const switchMode = (next: Mode) => {
    setCurrentMode(next);
    setIsPlaying(false);
    setTimerKey((k) => k + 1);
    setRemainingTime(MODES[next].duration);
  };

  const toggle = () => setIsPlaying((p) => !p);

  const reset = () => {
    setIsPlaying(false);
    setTimerKey((k) => k + 1);
    setRemainingTime(cfg.duration);
  };

  const skip = () => switchMode(skipMode(currentMode));

  return (
    <div className="glass-panel-lg bg-black/40 rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow select-none">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4">
        <p className="text-sm text-white/60 font-medium">Focus Timer</p>
        <div className="flex items-center gap-1">
          {isPlaying && (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse delay-75" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse delay-150" />
            </>
          )}
        </div>
      </div>

      {/* Countdown Ring */}
      <CountdownCircleTimer
        key={timerKey}
        isPlaying={isPlaying}
        duration={cfg.duration}
        {...cfg.colorCfg}
        trailColor="rgba(255,255,255,0.12)"
        strokeWidth={6}
        trailStrokeWidth={6}
        size={240}
        strokeLinecap="round"
        isSmoothColorTransition={true}
        onUpdate={(t) => setRemainingTime(t)}
        onComplete={() => {
          switchMode(endMode(currentMode));
        }}
      >
        {() => (
          <div className="text-center">
            <div
              className="font-semibold text-white leading-none"
              style={{
                fontSize: 48,
                letterSpacing: "-2px",
                textShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              {formatTime(remainingTime)}
            </div>
            <div
              className="text-white/70 font-bold uppercase mt-1"
              style={{ fontSize: 10, letterSpacing: "2.5px" }}
            >
              {cfg.name}
            </div>
          </div>
        )}
      </CountdownCircleTimer>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-6">
        {/* Start / Pause */}
        <button
          onClick={toggle}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all active:scale-95 hover:opacity-90"
          style={{
            background: "#ffffff",
            color: "#5d4037",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            fontSize: 15,
          }}
          aria-label={isPlaying ? "Pause timer" : "Start timer"}
        >
          <span>{isPlaying ? "⏸" : "▶"}</span>
          <span>{isPlaying ? "Pause" : "Start"}</span>
        </button>

        {/* Reset */}
        <button
          onClick={reset}
          className="flex items-center justify-center w-11 h-11 rounded-xl text-white transition-all active:scale-95 text-lg"
          style={{ background: "rgba(93,64,55,0.65)" }}
          title="Reset"
          aria-label="Reset timer"
        >
          ↺
        </button>

        {/* Skip */}
        <button
          onClick={skip}
          className="flex items-center justify-center w-11 h-11 rounded-xl text-white transition-all active:scale-95 text-lg"
          style={{ background: "rgba(93,64,55,0.65)" }}
          title="Skip Session"
          aria-label="Skip session"
        >
          ⏭
        </button>
      </div>

      {/* Mode pills */}
      <div className="flex gap-2 mt-4">
        {MODE_ORDER.map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className="text-xs px-2 py-0.5 rounded-full transition-colors"
            style={{
              background:
                currentMode === m
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(255,255,255,0.06)",
              color: currentMode === m ? "#ffffff" : "rgba(255,255,255,0.4)",
              border:
                currentMode === m
                  ? "1px solid rgba(255,255,255,0.3)"
                  : "1px solid transparent",
            }}
            aria-label={`Switch to ${MODES[m].name}`}
          >
            {MODES[m].name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PomodoroWidget;
