import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { publishEvent, subscribeEvent } from "@repo/core/event-bus";
import type { Task, CreateTaskInput } from "@/types/task";

// Initial dummy tasks
const initialTasks: Task[] = [];

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
}

interface TaskContextType {
  tasks: Task[];
  taskStats: TaskStats;
  createTask: (input: CreateTaskInput) => void;
  updateTaskStatus: (taskId: number, newStatus: Task["status"]) => void;
  deleteTask: (taskId: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Generate unique instance ID to prevent event loops (useState lazy initialization)
  const [instanceId] = useState(
    () => `task-provider-${Math.random().toString(36).substring(2, 11)}`,
  );

  const taskStats: TaskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    todo: tasks.filter((t) => t.status === "todo").length,
  };

  const createTask = (input: CreateTaskInput) => {
    const newId = Math.max(...tasks.map((t) => t.id), 0) + 1;

    const newTask: Task = {
      id: newId,
      ...input,
      status: "todo",
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);

    // Broadcast event to other apps
    publishEvent("task:created", {
      task: newTask,
      sourceInstanceId: instanceId,
    });

    // Notify host app via event bus
    publishEvent("notification:show", {
      title: "Tạo nhiệm vụ thành công! 🎉",
      message: `Nhiệm vụ "${input.title}" đã được tạo thành công`,
      type: "success",
      duration: 3000,
    });
  };

  const updateTaskStatus = (taskId: number, newStatus: Task["status"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    // Broadcast event to other apps
    publishEvent("task:updated", {
      taskId,
      status: newStatus,
      sourceInstanceId: instanceId,
    });

    // Find the task to get its title for the notification
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const statusText =
        newStatus === "completed"
          ? "Hoàn thành"
          : newStatus === "in-progress"
            ? "Đang tiến hành"
            : "Chưa hoàn thành";

      publishEvent("notification:show", {
        title: "Cập nhật trạng thái thành công! ✅",
        message: `Nhiệm vụ "${task.title}" đã được chuyển sang trạng thái: ${statusText}`,
        type: "success",
        duration: 3000,
      });
    }
  };

  const deleteTask = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    // Broadcast event to other apps
    publishEvent("task:deleted", {
      taskId,
      sourceInstanceId: instanceId,
    });

    if (task) {
      publishEvent("notification:show", {
        title: "Xóa nhiệm vụ thành công! 🗑️",
        message: `Nhiệm vụ "${task.title}" đã được xóa`,
        type: "success",
        duration: 3000,
      });
    }
  };

  // Subscribe to task events from other apps
  useEffect(() => {
    const unsubscribeCreated = subscribeEvent("task:created", (payload) => {
      // Ignore events from self to prevent loops
      if (payload.sourceInstanceId === instanceId) {
        return;
      }
      setTasks((prevTasks) => [payload.task, ...prevTasks]);
    });

    const unsubscribeUpdated = subscribeEvent("task:updated", (payload) => {
      // Ignore events from self to prevent loops
      if (payload.sourceInstanceId === instanceId) {
        return;
      }
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === payload.taskId
            ? { ...task, status: payload.status }
            : task,
        ),
      );
    });

    const unsubscribeDeleted = subscribeEvent("task:deleted", (payload) => {
      // Ignore events from self to prevent loops
      if (payload.sourceInstanceId === instanceId) {
        return;
      }
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== payload.taskId),
      );
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeCreated();
      unsubscribeUpdated();
      unsubscribeDeleted();
    };
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, taskStats, createTask, updateTaskStatus, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
