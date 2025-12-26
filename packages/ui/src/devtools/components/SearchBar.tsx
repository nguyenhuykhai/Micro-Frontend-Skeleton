import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Input } from "../../components/input";
import type { SearchBarProps } from "../types";

export function SearchBar({
  searchTerm,
  onSearchChange,
  onClear,
  show,
}: SearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [show]);

  return (
    <Collapsible.Root open={show}>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        <div className="mt-3 relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10"
          />
          <Input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events, origins, or payload..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-9 py-2 text-sm text-white placeholder-slate-500"
          />
          {searchTerm && (
            <button
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors z-10"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
