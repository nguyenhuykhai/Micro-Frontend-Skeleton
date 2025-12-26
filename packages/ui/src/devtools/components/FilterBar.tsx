import * as Collapsible from "@radix-ui/react-collapsible";
import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import { EVENT_CATEGORIES, CATEGORY_LABELS } from "../constants";
import type { FilterBarProps, CategoryKey } from "../types";

export function FilterBar({
  activeFilters,
  onToggleFilter,
  onClearFilters,
  show,
}: FilterBarProps) {
  return (
    <Collapsible.Root open={show}>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(EVENT_CATEGORIES) as CategoryKey[]).map((key) => {
            const { dotColor } = EVENT_CATEGORIES[key];
            const isActive = activeFilters.has(key);

            return (
              <Badge
                key={key}
                onClick={() => onToggleFilter(key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white/10 text-white ring-1 ring-white/20"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                } border-0`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                {CATEGORY_LABELS[key]}
              </Badge>
            );
          })}
          {activeFilters.size > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-[11px] text-slate-500 hover:text-white h-auto px-2 py-1"
            >
              Clear all
            </Button>
          )}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
