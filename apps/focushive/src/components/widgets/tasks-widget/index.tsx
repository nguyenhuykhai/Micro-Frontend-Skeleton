const TasksWidget = () => {
  const tasks = [
    {
      id: 1,
      title: "Review Q3 design system updates",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      title: "Draft newsletter content",
      priority: "Medium",
      completed: true,
    },
    {
      id: 3,
      title: "Weekly sync with engineering",
      priority: "Medium",
      completed: true,
    },
  ];

  return (
    <div className="glass-panel-lg rounded-2xl overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-white/60 font-medium">Priority Tasks</p>
          <button className="w-6 h-6 rounded bg-blue-500/20 hover:bg-blue-500/30 transition-colors flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-3 hover:bg-white/10 transition-colors"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                task.completed
                  ? "border-white/40 bg-white/40"
                  : "border-white/20"
              }`}
            ></div>

            <p
              className={`flex-1 text-sm ${
                task.completed ? "text-white/50 line-through" : "text-white"
              }`}
            >
              {task.title}
            </p>

            {task.priority === "High" && !task.completed && (
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400">
                High
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksWidget;
