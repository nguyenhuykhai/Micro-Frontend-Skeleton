import ClockWidget from "@/components/widgets/clock-widget";
import TasksWidget from "@/components/widgets/tasks-widget";
import StatsWidget from "@/components/widgets/stats-widget";

const Dashboard = () => {
  return (
    <div className="p-8 space-y-6">
      {/* Dashboard Header */}
      <header className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Good Afternoon, Alex
            </h1>
            <p className="text-base text-white/70">It's time for deep work.</p>
          </div>

          {/* Weather Widget (Header) */}
          <div className="glass-panel rounded-lg px-4 py-2 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-white font-medium">24°C Tokyo</span>
          </div>
        </div>
      </header>

      {/* Dashboard Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClockWidget />
        <TasksWidget />
      </div>

      {/* Bottom Stats Widget */}
      <StatsWidget />
    </div>
  );
};

export default Dashboard;
