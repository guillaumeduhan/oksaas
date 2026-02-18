"use client";

import { useMemo, useState } from "react";
import data from "../../data.json";
import Link from "./Link";

const FILTERS = ["This week", "Last week", "3 months ago", "A year ago"] as const;

type Filter = (typeof FILTERS)[number] | null;

function getFilterCutoff(label: Filter): Date | null {
  if (!label) return null;
  const now = new Date();
  // Start of current week (Monday)
  const daysFromMonday = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const startOfThisWeek = new Date(now);
  startOfThisWeek.setDate(now.getDate() - daysFromMonday);
  startOfThisWeek.setHours(0, 0, 0, 0);

  if (label === "This week") return startOfThisWeek;
  if (label === "Last week") {
    const d = new Date(startOfThisWeek);
    d.setDate(d.getDate() - 7);
    return d;
  }
  if (label === "3 months ago") {
    const d = new Date(now);
    d.setMonth(d.getMonth() - 3);
    return d;
  }
  if (label === "A year ago") {
    const d = new Date(now);
    d.setFullYear(d.getFullYear() - 1);
    return d;
  }
  return null;
}

const List = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("This week");

  const sorted = useMemo(() => {
    const cutoff = getFilterCutoff(activeFilter);

    const filtered = data.filter((item) => {
      if (item.is_promoted || item.is_featured) return true;
      if (!cutoff) return true;
      return new Date(item.created_at || "") >= cutoff;
    });

    return filtered.sort((a, b) => {
      if (a.is_promoted && !b.is_promoted) return -1;
      if (!a.is_promoted && b.is_promoted) return 1;
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return (b.created_at || "").localeCompare(a.created_at || "");
    });
  }, [activeFilter]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(activeFilter === f ? null : f)}
            className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${activeFilter === f
              ? "bg-primary-500 text-black"
              : "text-white/50 hover:text-white"
              }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-4 pb-128">
        {sorted.map((product) => (
          <div key={product.id} className={`transition-all duration-300 hover:z-[9999] w-full ${product.is_promoted ? 'lg:scale-110' : product.is_featured ? 'lg:scale-105' : 'hover:scale-105'}`}>
            <Link {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
