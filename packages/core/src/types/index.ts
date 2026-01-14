import React from "react";

export interface NotificationPayload {
  id?: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ThemePayload {
  theme: "light" | "dark" | "system";
}

export interface ModalPayload {
  id: string;
  type: "confirm" | "alert" | "custom";
  title: string;
  content: string | React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Task types for cross-app synchronization
export interface Task {
  id: number;
  title: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  assignee: string;
  dueDate: string;
}

export interface TaskCreatedPayload {
  task: Task;
  sourceInstanceId: string;
}

export interface TaskUpdatedPayload {
  taskId: number;
  status: Task["status"];
  sourceInstanceId: string;
}

export interface TaskDeletedPayload {
  taskId: number;
  sourceInstanceId: string;
}
