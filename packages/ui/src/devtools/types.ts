import type { EventLog } from "@repo/core";

export type CategoryKey = keyof typeof import("./constants").EVENT_CATEGORIES;

export interface EventItemProps {
  log: EventLog;
  index: number;
  searchTerm: string;
}

export interface EventDebuggerHeaderProps {
  filteredCount: number;
  totalCount: number;
  showSearch: boolean;
  showFilters: boolean;
  activeFiltersCount: number;
  onToggleSearch: () => void;
  onToggleFilters: () => void;
  onClearLogs: () => void;
  onMinimize: () => void;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  show: boolean;
}

export interface FilterBarProps {
  activeFilters: Set<CategoryKey>;
  onToggleFilter: (category: CategoryKey) => void;
  onClearFilters: () => void;
  show: boolean;
}

export interface EventListProps {
  logs: EventLog[];
  searchTerm: string;
  hasFilters: boolean;
}

export interface EmptyStateProps {
  hasSearchOrFilters: boolean;
}

export interface EventDebuggerToggleProps {
  eventCount: number;
  onExpand: () => void;
}
