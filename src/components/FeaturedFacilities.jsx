import React from "react"
import { Button } from "@heroui/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { FacilityCard } from "./FacilityCard"

async function getFeaturedFacilities() {
  try {
   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured-facilities`, {
  next: { revalidate: 60 } 
})
    })
    if (!res.ok) throw new Error("Failed to fetch data from server")
    return res.json()
  } catch (error) {
    console.error("Error fetching facilities:", error)
    return []
  }
}

export async function FeaturedFacilities() {
  const facilities = await getFeaturedFacilities()

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 rounded-full border border-orange-100 dark:border-orange-800">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Top Picks</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Sports Facilities
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl font-medium">
              Explore the most popular and highly rated playgrounds, courts, and turfs available right now.
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/facilities">
              <Button className="font-bold rounded-xl px-5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-500 dark:hover:text-orange-400 transition-all flex items-center gap-1.5 text-sm">
                View All Facilities
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {facilities.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400 font-medium">
            No facilities found in database.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <FacilityCard key={facility._id} facility={facility} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}