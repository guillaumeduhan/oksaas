"use client";

import { useMemo, useState } from "react";
import data from "../../data.json";
import Link from "./Link.tsx";

const List = () => {
  const [range, setRange] = useState<"week" | "month" | "year" | "all">("week");

  const lastUpdated = new Date("2025-12-03T20:48:00+01:00");

  const updatedAgo = useMemo(() => {
    const diff = Date.now() - lastUpdated.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);

    if (mins < 1) return "Updated just now";
    if (mins < 60) return `Updated ${mins} min ago`;
    return `Updated ${hours}h ago`;
  }, []);

  const filtered = useMemo(() => {
    const now = new Date();

    function inRange(dateString: string) {
      const d = new Date(dateString);
      if (range === "week") {
        return now.getTime() - d.getTime() <= 7 * 24 * 60 * 60 * 1000;
      }
      if (range === "month") {
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }
      if (range === "year") {
        return d.getFullYear() === now.getFullYear();
      }
      return true;
    }

    return [...data]
      .filter((a) => inRange(a.created_at))
      .filter((a) => !a.is_featured)
      .sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  }, [range]);

  return (
    <div className="grid gap-8">
      {/* Filters */}
      <header className="flex items-center justify-between gap-2 py-2 w-full">
        <div>
          <button onClick={() => setRange("week")} className={`cursor-pointer ${range === 'week' ? 'text-kiwi-600 font-[500]' : 'text-neutral-500'}`}>This week</button>
          {/* <button onClick={() => setRange("month")} className={`cursor-pointer ${range === 'month' ? 'text-kiwi-600 font-[500]' : 'text-neutral-500'}`}>This month</button>
        <button onClick={() => setRange("year")} className={`cursor-pointer ${range === 'year' ? 'text-kiwi-600 font-[500]' : 'text-neutral-500'}`}>This year</button>
        <button onClick={() => setRange("all")} className={`cursor-pointer ${range === 'all' ? 'text-kiwi-600 font-[500]' : 'text-neutral-500'}`}>All</button> */}
        </div>
        <p className="text-sm italic">{updatedAgo}.</p>
      </header>

      {/* Featured */}
      <div className="grid gap-1">
        {data.filter((product) => product.is_featured).map((product) => (
          <Link key={product.id} {...product} />
        ))}
      </div>

      {/* List */}
      <div className="grid gap-1">
        {filtered.map((product) => (
          <Link key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default List;
