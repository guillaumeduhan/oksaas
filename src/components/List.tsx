"use client";

import { useMemo } from "react";
import data from "../../data.json";
import Link from "./Link";

const List = () => {
  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      // 1. promoted first
      if (a.is_promoted && !b.is_promoted) return -1;
      if (!a.is_promoted && b.is_promoted) return 1;

      // 2. featured second
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;

      // 3. newest last
      return (b.created_at || "").localeCompare(a.created_at || "");
    });
  }, []);

  return (
    <div className="grid gap-4 mx-auto pb-128">
      {sorted.map((product) => (
        <div key={product.id} className={`transition-all duration-300 hover:z-[9999] ${product.is_promoted ? 'lg:scale-110' : product.is_featured ? 'lg:scale-105' : 'hover:scale-105'}`}>
          <Link {...product} />
        </div>
      ))
      }
    </div >
  );
};

export default List;
