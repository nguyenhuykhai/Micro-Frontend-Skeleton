import { Search, Radio } from "lucide-react";
import type { EmptyStateProps } from "../types";

export function EmptyState({ hasSearchOrFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-52 text-slate-500 animate-fadeIn">
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
        {hasSearchOrFilters ? (
          <Search size={22} className="text-slate-600" />
        ) : (
          <Radio size={22} className="text-slate-600" />
        )}
      </div>
      <p className="text-sm font-medium text-slate-400">
        {hasSearchOrFilters ? "No matching events" : "No events yet"}
      </p>
      <p className="text-xs mt-1 text-slate-600 text-center max-w-[200px]">
        {hasSearchOrFilters
          ? "Try adjusting your search or filters"
          : "Events will appear here in real-time"}
      </p>
    </div>
  );
}
