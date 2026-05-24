import React from "react";
import { Button } from "@heroui/react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function FacilityCard({ facility }) {
  const {
    _id,
    facility_name,
    facility_type,
    imageUrl,
    location,
    price_per_hour,
  } = facility;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/40 transition-all duration-300 overflow-hidden flex flex-col group">
      
      {/* Image Section */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-orange-600 dark:text-orange-400 font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm z-10 border border-slate-100 dark:border-slate-800 uppercase">
          {facility_type}
        </div>
        <Image
          src={imageUrl && imageUrl.trim() !== "" ? imageUrl : "/slotsliblogo.jpg"}
          alt={facility_name || "Facility Image"}
          fill
          sizes="(max-w-7xl) 100vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        
        <div className="space-y-1.5 flex-grow">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
            {facility_name}
          </h3>
        </div>

        {/* Location */}
        <div className="space-y-2 pt-2 border-t border-slate-50 dark:border-slate-800/50 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Per Hour</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">${price_per_hour}</p>
          </div>

          <Link href={`/facilities/${_id}`}>
            <Button className="font-bold rounded-xl px-5 bg-orange-500 text-white shadow-md shadow-orange-500/10 hover:bg-orange-600 transition-colors text-sm">
              Book Now
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}