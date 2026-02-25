import ClockWidget from "@/components/organisms/clock-widget";
import TasksWidget from "@/components/organisms/tasks-widget";
import StatsWidget from "@/components/organisms/stats-widget";
import PomodoroWidget from "@/components/organisms/pomodoro-widget";

const Dashboard = () => {
  return (
    <div className="space-y-4 sm:mb-24 mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-full">
          <ClockWidget />
        </div>
        <div className="lg:col-span-2 h-full">
          <TasksWidget />
        </div>
      </div>

      {/* Pomodoro Timer + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-full">
          <PomodoroWidget />
        </div>
        <div className="lg:col-span-2 h-full">
          <StatsWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
