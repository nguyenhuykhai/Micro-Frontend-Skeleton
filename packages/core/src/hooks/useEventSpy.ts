import { useEffect, useState, useCallback } from "react";
import type { AppEventMap } from "../event-bus";

export interface EventLog {
  id: string;
  timestamp: Date;
  eventName: keyof AppEventMap;
  payload: any;
  origin?: string;
}

interface UseEventSpyOptions {
  maxLogs?: number;
}

export const useEventSpy = (options: UseEventSpyOptions = {}) => {
  const { maxLogs = 100 } = options;
  const [logs, setLogs] = useState<EventLog[]>([]);

  useEffect(() => {
    const eventTypes: (keyof AppEventMap)[] = [
      "notification:show",
      "theme:change",
      "modal:open",
      "user:session-expired",
      "task:created",
      "task:updated",
      "task:deleted",
    ];

    const handlers: Array<{ event: string; handler: EventListener }> = [];

    eventTypes.forEach((eventType) => {
      const handler = (e: Event) => {
        const customEvent = e as CustomEvent<AppEventMap[typeof eventType]>;

        const log: EventLog = {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          timestamp: new Date(),
          eventName: eventType,
          payload: customEvent.detail,
          origin: (e.target as any)?.origin || undefined,
        };

        setLogs((prevLogs) => {
          const newLogs = [log, ...prevLogs];
          return newLogs.slice(0, maxLogs);
        });
      };

      window.addEventListener(eventType, handler);
      handlers.push({ event: eventType, handler });
    });

    return () => {
      handlers.forEach(({ event, handler }) => {
        window.removeEventListener(event, handler);
      });
    };
  }, [maxLogs]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return { logs, clearLogs };
};
