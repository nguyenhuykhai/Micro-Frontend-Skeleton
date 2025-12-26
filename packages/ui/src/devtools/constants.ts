export const EVENT_CATEGORIES = {
  notification: { color: "bg-blue-500/90", dotColor: "bg-blue-400" },
  theme: { color: "bg-violet-500/90", dotColor: "bg-violet-400" },
  modal: { color: "bg-amber-500/90", dotColor: "bg-amber-400" },
  user: { color: "bg-rose-500/90", dotColor: "bg-rose-400" },
  default: { color: "bg-slate-500/90", dotColor: "bg-slate-400" },
} as const;

export const CATEGORY_LABELS = {
  notification: "Notification",
  theme: "Theme",
  modal: "Modal",
  user: "User",
  default: "Other",
} as const;

export const MAX_LOGS = 100;
