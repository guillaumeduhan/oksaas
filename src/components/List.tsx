"use client";

import { useMemo, useState } from "react";
import data from "../../data.json";
import Link from "./Link";

const FILTERS = ["Last week", "Last 3 months", "Last 6 months", "From beginning"] as const;

type Filter = (typeof FILTERS)[number] | null;

function getFilterRange(label: Filter): { start: Date; end: Date } | null {
  if (!label || label === "From beginning") return null;
  const now = new Date();

  if (label === "Last week") {
    const start = new Date(now);
    start.setDate(start.getDate() - 7);
    start.setHours(0, 0, 0, 0);
    return { start, end: now };
  }
  if (label === "Last 3 months") return { start: new Date(now.getFullYear(), now.getMonth() - 3, 1), end: now };
  if (label === "Last 6 months") return { start: new Date(now.getFullYear(), now.getMonth() - 6, 1), end: now };
  return null;
}

const List = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("Last 6 months");

  const sorted = useMemo(() => {
    const range = getFilterRange(activeFilter);

    const filtered = data.filter((item) => {
      if (item.is_promoted || item.is_featured) return true;
      if (!range) return true;
      const d = new Date(item.created_at || "");
      return d >= range.start && d < range.end;
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
