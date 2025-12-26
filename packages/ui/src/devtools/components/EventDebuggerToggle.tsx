import { Radio, ChevronUp } from "lucide-react";
import { Button } from "../../components/button";
import { Badge } from "../../components/badge";
import type { EventDebuggerToggleProps } from "../types";

export function EventDebuggerToggle({
  eventCount,
  onExpand,
}: EventDebuggerToggleProps) {
  return (
    <Button
      variant="ghost"
      onClick={onExpand}
      className="bg-slate-950/95 backdrop-blur-xl text-white pl-3 pr-4 py-2.5 rounded-xl shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/40 hover:bg-slate-900 border border-white/10 flex items-center gap-3 group h-auto"
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-all duration-200">
        <Radio
          size={15}
          className="text-emerald-400 group-hover:scale-110 transition-transform duration-200"
        />
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
      </div>
      <span className="font-medium text-sm">Event Stream</span>
      {eventCount > 0 && (
        <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full min-w-[26px] text-center shadow-lg shadow-emerald-500/30 border-0">
          {eventCount}
        </Badge>
      )}
      <ChevronUp
        size={14}
        className="text-slate-400 group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-200"
      />
    </Button>
  );
}
