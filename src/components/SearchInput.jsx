"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SearchInput({ defaultValue }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  return (
    <input
      type="text"
      defaultValue={defaultValue}
      onChange={handleSearch}
      placeholder="Search facilities..."
      className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 font-medium text-slate-700 bg-white shadow-sm"
    />
  );
}