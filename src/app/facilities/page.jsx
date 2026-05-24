export const dynamic = "force-dynamic";

import { FacilityCard } from "@/components/FacilityCard";
import SearchInput from "@/components/SearchInput";
import Link from "next/link";

const SPORT_TYPES = [
  { label: "All", slug: "all" },
  { label: "Football", slug: "Football" },
  { label: "Tennis", slug: "Tennis" },
  { label: "Cricket", slug: "Cricket" },
  { label: "Basketball", slug: "Basketball" },
  { label: "Badminton", slug: "Badminton" },
];

async function getFacilities(search, sport) {
  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (sport && sport !== "all") params.set("sport", sport);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities?${params.toString()}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function FacilitiesPage({ searchParams }) {
  const params = await searchParams;
  const search = params.search || "";
  const sport = params.sport || "all";

  const facilities = await getFacilities(search, sport);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white max-w-7xl mx-auto px-6 py-12 transition-colors duration-300">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-black dark:text-white tracking-tight uppercase">
          OUR{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
            FACILITIES
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
          Discover our premium sports venues available for instant booking.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <aside className="w-full md:w-56 flex-shrink-0">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24">
            <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wide">
              Sport Type
            </h3>
            <div className="flex flex-col gap-2">
              {SPORT_TYPES.map((s) => (
                <Link
                  key={s.slug}
                  href={`?sport=${s.slug}${search ? `&search=${search}` : ""}`}
                  className={`px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all ${
                    sport === s.slug
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "text-slate-500 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500 dark:hover:text-orange-400"
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-grow">
          <div className="mb-8">
            <SearchInput defaultValue={search} />
          </div>

          {facilities.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-700 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50">
              <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">
                No facilities found{search ? ` for "${search}"` : ""}.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility) => (
                <FacilityCard key={facility._id} facility={facility} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
