import { Radio, Search, Filter, Trash2, ChevronDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import type { EventDebuggerHeaderProps } from "../types";

export function EventDebuggerHeader({
  filteredCount,
  totalCount,
  showSearch,
  showFilters,
  activeFiltersCount,
  onToggleSearch,
  onToggleFilters,
  onClearLogs,
  onMinimize,
}: EventDebuggerHeaderProps) {
  return (
    <header className="bg-white/[0.03] border-b border-white/5 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20">
            <Radio size={15} className="text-emerald-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm leading-none">
              Event Stream
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Micro-frontend debugger
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Badge
            variant="secondary"
            className="text-[11px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg font-mono mr-1 border-0"
          >
            {filteredCount}
            {filteredCount !== totalCount && `/${totalCount}`}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSearch}
            title="Search events"
            className={`h-8 w-8 p-1.5 ${
              showSearch
                ? "text-emerald-400 bg-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Search size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFilters}
            title="Filter by category"
            className={`h-8 w-8 p-1.5 ${
              showFilters || activeFiltersCount > 0
                ? "text-emerald-400 bg-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Filter size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearLogs}
            title="Clear all events"
            className="h-8 w-8 p-1.5 text-slate-400 hover:text-white"
          >
            <Trash2 size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMinimize}
            title="Minimize"
            className="h-8 w-8 p-1.5 text-slate-400 hover:text-white"
          >
            <ChevronDown size={15} />
          </Button>
        </div>
      </div>
    </header>
  );
}
