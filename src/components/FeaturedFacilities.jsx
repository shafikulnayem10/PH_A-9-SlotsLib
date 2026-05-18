import React from "react";
import { Button } from "@heroui/react";
import { MapPin, Users, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


async function getFeaturedFacilities() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/featured-facilities`, {
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data from server");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return [];
  }
}


export async function FeaturedFacilities() {
  
  const facilities = await getFeaturedFacilities();

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
      
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full border border-orange-100">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Top Picks</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Sports Facilities
            </h2>
            <p className="text-sm md:text-base text-slate-500 max-w-xl font-medium">
              Explore the most popular and highly rated playgrounds, courts, and turfs available right now.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/facilities">
              <Button className="font-bold rounded-xl px-5 bg-white text-slate-700 border border-slate-200 hover:border-orange-500 hover:text-orange-500 transition-all flex items-center gap-1.5 text-sm">
                View All Facilities
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

      
        {facilities.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-medium">
            No facilities found in database.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <div 
                key={facility._id} 
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-500/20 transition-all duration-300 overflow-hidden flex flex-col group"
              >
               
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-orange-600 font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm z-10 border border-slate-100">
                    {facility.facilityType}
                  </div>
                  <Image
                    src={facility.imageUpload || "/placeholder-facility.jpg"}
                    alt={facility.facilityName}
                    fill
                    sizes="(max-w-7xl) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

              
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="space-y-1.5 flex-grow">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-1">
                      {facility.facilityName}
                    </h3>
                  
                  </div>

                
                
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Per Hour</p>
                      <p className="text-xl font-black text-slate-900">
                        ৳{facility.pricePerHour}
                      </p>
                    </div>

                    <Link href={`/facilities/${facility._id}`}>
                      <Button className="font-bold rounded-xl px-5 bg-orange-500 text-white shadow-md shadow-orange-500/10 hover:bg-orange-600 transition-colors text-sm">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}