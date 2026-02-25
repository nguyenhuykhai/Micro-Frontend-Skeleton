import { useEffect, useState } from "react";

const ClockWidget = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full justify-between glass-panel-lg bg-black/40 rounded-2xl p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start">
        <p className="text-sm text-white/60 font-medium">Time</p>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse delay-75"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse delay-150"></div>
        </div>
      </div>

      <div>
        <p className="text-5xl font-bold text-white mb-2">{currentTime}</p>
        <p className="text-base font-medium leading-6 text-yellow-400">
          Focus Block: 28m remaining
        </p>
      </div>
    </div>
  );
};

export default ClockWidget;
