import { useState } from "react";
import ReactJson from "react-json-view";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { Badge } from "../../components/badge";
import { ScrollArea } from "../../components/scroll-area";
import type { EventItemProps } from "../types";
import { EVENT_CATEGORIES } from "../constants";
import { getEventCategory, formatTimestamp, highlightText } from "../utils";

export function EventItem({ log, index, searchTerm }: EventItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryKey = getEventCategory(log.eventName);
  const category = EVENT_CATEGORIES[categoryKey];

  return (
    <Collapsible.Root
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="group border-b border-white/5 px-4 py-3 hover:bg-white/[0.02] transition-all duration-200 animate-slideIn"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <Collapsible.Trigger asChild>
        <div className="flex items-center gap-3 cursor-pointer w-full">
          <div
            className={`w-2 h-2 rounded-full ${category.dotColor} animate-pulse`}
          />
          <time className="text-[11px] text-slate-500 font-mono tabular-nums">
            {formatTimestamp(log.timestamp)}
          </time>
          <Badge
            className={`${category.color} text-white text-[11px] font-medium px-2 py-0.5 rounded-md transition-transform duration-200 hover:scale-105 border-0`}
          >
            {highlightText(log.eventName, searchTerm)}
          </Badge>
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
      </Collapsible.Trigger>

      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        <div className="mt-3">
          <ScrollArea className="max-h-96 pl-5 border-l-2 border-white/10 ml-1">
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
          </ScrollArea>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
