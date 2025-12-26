import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactJson from "react-json-view";
import { useEventSpy, type EventLog } from "@repo/core";
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  Radio,
  Search,
  X,
  Filter,
} from "lucide-react";

const EVENT_CATEGORIES = {
  notification: { color: "bg-blue-500/90", dotColor: "bg-blue-400" },
  theme: { color: "bg-violet-500/90", dotColor: "bg-violet-400" },
  modal: { color: "bg-amber-500/90", dotColor: "bg-amber-400" },
  user: { color: "bg-rose-500/90", dotColor: "bg-rose-400" },
  default: { color: "bg-slate-500/90", dotColor: "bg-slate-400" },
} as const;

type CategoryKey = keyof typeof EVENT_CATEGORIES;

const getEventCategory = (eventName: string): CategoryKey => {
  const prefix = eventName.split(":")[0];
  return (prefix in EVENT_CATEGORIES ? prefix : "default") as CategoryKey;
};

const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });
};

interface EventItemProps {
  log: EventLog;
  index: number;
  searchTerm: string;
}

const highlightText = (text: string, search: string) => {
  if (!search.trim()) return text;

  const regex = new RegExp(
    `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-amber-500/30 text-amber-200 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const EventItem: React.FC<EventItemProps> = ({ log, index, searchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryKey = getEventCategory(log.eventName);
  const category = EVENT_CATEGORIES[categoryKey];

  return (
    <div
      className="group border-b border-white/5 px-4 py-3 hover:bg-white/[0.02] transition-all duration-200 animate-slideIn"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div
          className={`w-2 h-2 rounded-full ${category.dotColor} animate-pulse`}
        />
        <time className="text-[11px] text-slate-500 font-mono tabular-nums">
          {formatTimestamp(log.timestamp)}
        </time>
        <span
          className={`${category.color} text-white text-[11px] font-medium px-2 py-0.5 rounded-md transition-transform duration-200 hover:scale-105`}
        >
          {highlightText(log.eventName, searchTerm)}
        </span>
        {log.origin && (
          <span className="text-[11px] text-slate-600 ml-auto">
            ← {highlightText(log.origin, searchTerm)}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`text-slate-500 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-5 border-l-2 border-white/10 ml-1">
          <ReactJson
            src={log.payload}
            theme="monokai"
            collapsed={2}
            displayDataTypes={false}
            enableClipboard
            displayObjectSize={false}
            name={null}
            iconStyle="triangle"
            style={{
              backgroundColor: "transparent",
              fontSize: "11px",
              lineHeight: "1.5",
            }}
          />
        </div>
      </div>
    </div>
  );
};

interface IconButtonProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  active?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  title,
  children,
  active,
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded-md transition-all duration-200 ${
      active
        ? "text-emerald-400 bg-emerald-500/20"
        : "text-slate-400 hover:text-white hover:bg-white/10"
    }`}
  >
    {children}
  </button>
);

interface FilterChipProps {
  label: string;
  category: CategoryKey;
  active: boolean;
  onClick: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  category,
  active,
  onClick,
}) => {
  const { dotColor } = EVENT_CATEGORIES[category];

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 ${
        active
          ? "bg-white/10 text-white ring-1 ring-white/20"
          : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {label}
    </button>
  );
};

export const EventDebugger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<CategoryKey>>(
    new Set()
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { logs, clearLogs } = useEventSpy({ maxLogs: 100 });

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    if (listRef.current && logs.length > 0) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [logs.length]);

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
    searchInputRef.current?.focus();
  };

  const categoryLabels: Record<CategoryKey, string> = {
    notification: "Notification",
    theme: "Theme",
    modal: "Modal",
    user: "User",
    default: "Other",
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] font-sans">
      {/* CSS for animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Main Panel */}
      <div
        className={`transform transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none absolute"
        }`}
      >
        <div className="bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 w-[520px] max-h-[560px] flex flex-col overflow-hidden">
          {/* Header */}
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
                <span className="text-[11px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg font-mono mr-1">
                  {filteredLogs.length}
                  {filteredLogs.length !== logs.length && `/${logs.length}`}
                </span>
                <IconButton
                  onClick={() => setShowSearch(!showSearch)}
                  title="Search events"
                  active={showSearch}
                >
                  <Search size={15} />
                </IconButton>
                <IconButton
                  onClick={() => setShowFilters(!showFilters)}
                  title="Filter by category"
                  active={showFilters || activeFilters.size > 0}
                >
                  <Filter size={15} />
                </IconButton>
                <IconButton onClick={clearLogs} title="Clear all events">
                  <Trash2 size={15} />
                </IconButton>
                <IconButton onClick={() => setIsOpen(false)} title="Minimize">
                  <ChevronDown size={15} />
                </IconButton>
              </div>
            </div>

            {/* Search Bar */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                showSearch ? "max-h-16 opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events, origins, or payload..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-9 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Chips */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                showFilters ? "max-h-16 opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-wrap gap-2">
                {(Object.keys(EVENT_CATEGORIES) as CategoryKey[]).map((key) => (
                  <FilterChip
                    key={key}
                    label={categoryLabels[key]}
                    category={key}
                    active={activeFilters.has(key)}
                    onClick={() => toggleFilter(key)}
                  />
                ))}
                {activeFilters.size > 0 && (
                  <button
                    onClick={() => setActiveFilters(new Set())}
                    className="text-[11px] text-slate-500 hover:text-white transition-colors px-2"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* Event List */}
          <div ref={listRef} className="overflow-y-auto flex-1 scrollbar-thin">
            {filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-52 text-slate-500 animate-fadeIn">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                  {searchTerm || activeFilters.size > 0 ? (
                    <Search size={22} className="text-slate-600" />
                  ) : (
                    <Radio size={22} className="text-slate-600" />
                  )}
                </div>
                <p className="text-sm font-medium text-slate-400">
                  {searchTerm || activeFilters.size > 0
                    ? "No matching events"
                    : "No events yet"}
                </p>
                <p className="text-xs mt-1 text-slate-600 text-center max-w-[200px]">
                  {searchTerm || activeFilters.size > 0
                    ? "Try adjusting your search or filters"
                    : "Events will appear here in real-time"}
                </p>
              </div>
            ) : (
              <div className="py-1">
                {filteredLogs.map((log, index) => (
                  <EventItem
                    key={log.id}
                    log={log}
                    index={index}
                    searchTerm={searchTerm}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer Status */}
          <footer className="bg-white/[0.02] border-t border-white/5 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] text-slate-500">Listening...</span>
            </div>
            <span className="text-[10px] text-slate-600">Max: 100 events</span>
          </footer>
        </div>
      </div>

      {/* Collapsed Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`transform transition-all duration-300 ease-out origin-bottom-right ${
          !isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none absolute"
        } bg-slate-950/95 backdrop-blur-xl text-white pl-3 pr-4 py-2.5 rounded-xl shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/40 hover:bg-slate-900 border border-white/10 flex items-center gap-3 group`}
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-all duration-200">
          <Radio
            size={15}
            className="text-emerald-400 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
        </div>
        <span className="font-medium text-sm">Event Stream</span>
        {logs.length > 0 && (
          <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full min-w-[26px] text-center shadow-lg shadow-emerald-500/30">
            {logs.length}
          </span>
        )}
        <ChevronUp
          size={14}
          className="text-slate-400 group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-200"
        />
      </button>
    </div>
  );
};
