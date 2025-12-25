import type { NotificationPayload } from "../types";
import { publishEvent } from "../event-bus";

export class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  show(notification: NotificationPayload): void {
    publishEvent("notification:show", notification);
  }

  success(title: string, message: string, duration?: number): void {
    this.show({
      type: "success",
      title,
      message,
      duration: duration || 5000,
    });
  }

  error(title: string, message: string, duration?: number): void {
    this.show({
      type: "error",
      title,
      message,
      duration: duration || 7000,
    });
  }

  warning(title: string, message: string, duration?: number): void {
    this.show({
      type: "warning",
      title,
      message,
      duration: duration || 6000,
    });
  }

  info(title: string, message: string, duration?: number): void {
    this.show({
      type: "info",
      title,
      message,
      duration: duration || 4000,
    });
  }
}

export const notificationService = NotificationService.getInstance();
