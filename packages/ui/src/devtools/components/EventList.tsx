import { ScrollArea } from "../../components/ui/scroll-area";
import { EventItem } from "./EventItem";
import { EmptyState } from "./EmptyState";
import type { EventListProps } from "../types";

export function EventList({ logs, searchTerm, hasFilters }: EventListProps) {
  if (logs.length === 0) {
    return <EmptyState hasSearchOrFilters={hasFilters} />;
  }

  return (
    <ScrollArea className="flex-1 scrollbar-thin">
      <div className="py-1">
        {logs.map((log, index) => (
          <EventItem
            key={log.id}
            log={log}
            index={index}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
