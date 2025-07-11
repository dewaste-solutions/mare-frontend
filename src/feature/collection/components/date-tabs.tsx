// src/feature/collection/components/date-tabs.tsx

"use client";

import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────── */
/* Single card – purely display; only the 3‑dot button routes  */
/* ──────────────────────────────────────────────────────────── */
interface DateTabProps {
  date: string;
  weight: string;
  type: string;
}

function DateTab({ date, weight, type }: DateTabProps) {
  return (
    <div
      className={cn(
        "flex min-w-[200px] flex-col justify-between rounded-xl border bg-white p-5 text-left shadow-sm",
        "flex-1" // let cards stretch evenly on large screens
      )}
    >
      {/* header row */}
      <div className="flex items-start justify-between gap-2">
        {/* bigger, bolder date */}
        <span className="text-3xl font-semibold leading-tight text-gray-900">
          {date}
        </span>

        {/* only clickable element in the card */}
        <button
          type="button"
          className="rounded p-1 text-gray-400 hover:bg-muted hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Open options"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* meta info */}
      <div className="mt-4 space-y-1 text-sm text-muted-foreground">
        <p>{weight}</p>
        <p>{type}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */
/* Tabs list wrapper – display only                            */
/* ──────────────────────────────────────────────────────────── */
interface DateTabsListProps {
  data: { date: string; weight: string; type: string }[];
}

export function DateTabsList({ data }: DateTabsListProps) {
  return (
    <div
      className={cn(
        "flex gap-4 overflow-x-auto pb-2 sm:pb-0",
        "lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible"
      )}
    >
      {data.map((tab) => (
        <DateTab
          key={tab.date}
          date={tab.date}
          weight={tab.weight}
          type={tab.type}
        />
      ))}
    </div>
  );
}
