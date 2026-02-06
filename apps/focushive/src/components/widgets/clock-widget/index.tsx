const ClockWidget = () => {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="glass-panel-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-6">
        <p className="text-sm text-white/60 font-medium">Time</p>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse delay-75"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse delay-150"></div>
        </div>
      </div>

      <div>
        <p className="text-5xl font-bold text-white mb-2">{currentTime}</p>
        <p className="text-sm text-blue-400">Focus Block: 28m remaining</p>
      </div>
    </div>
  );
};

export default ClockWidget;
