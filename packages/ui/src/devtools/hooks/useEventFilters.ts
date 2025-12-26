import { useState, useMemo } from "react";
import type { EventLog } from "@repo/core";
import type { CategoryKey } from "../types";
import { getEventCategory } from "../utils";

export function useEventFilters(logs: EventLog[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<CategoryKey>>(
    new Set()
  );

  const filteredLogs = useMemo(() => {
    let result = [...logs].reverse();

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (log) =>
          log.eventName.toLowerCase().includes(term) ||
          log.origin?.toLowerCase().includes(term) ||
          JSON.stringify(log.payload).toLowerCase().includes(term)
      );
    }

    if (activeFilters.size > 0) {
      result = result.filter((log) => {
        const category = getEventCategory(log.eventName);
        return activeFilters.has(category);
      });
    }

    return result;
  }, [logs, searchTerm, activeFilters]);

  const toggleFilter = (category: CategoryKey) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setActiveFilters(new Set());
  };

  return {
    searchTerm,
    setSearchTerm,
    activeFilters,
    toggleFilter,
    clearSearch,
    clearFilters,
    filteredLogs,
  };
}
