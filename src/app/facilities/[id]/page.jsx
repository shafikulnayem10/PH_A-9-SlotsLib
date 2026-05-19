// import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { MapPin, Users, Clock, DollarSign } from "lucide-react";
import BookingFormHandler from "@/components/BookingFormHandler";
import { auth } from "@/lib/auth";


async function getSingleFacility(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching single facility:", error);
    return null;
  }
}

export default async function FacilityDetailsPage({ params }) {
  const { id } =  await params;
  const facility = await getSingleFacility(id);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userEmail = session?.user?.email || "";

  if (!facility) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p className="text-xl font-bold text-slate-500">Facility not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black max-w-7xl mx-auto p-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
     
        <div className="lg:col-span-2 space-y-6">
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm">
            <Image
              src={facility.imageUrl || "/slotsliblogo.jpg"}
              alt={facility.facility_name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw" 
            />
            <div className="absolute top-4 left-4 bg-white text-orange-600 font-black text-xs px-4 py-2 rounded-xl uppercase shadow-md">
              {facility.facility_type}
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase">
              {facility.facility_name}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{facility.location}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                <Users className="w-4 h-4 text-orange-500" />
                <span>Capacity: {facility.capacity} Players</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                <DollarSign className="w-4 h-4 text-orange-500" />
                <span>৳{facility.price_per_hour} / Hour</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-2">
              <h3 className="text-lg font-extrabold uppercase text-slate-900">About This Venue</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                {facility.description}
              </p>
            </div>
          </div>
        </div>

       
        <div className="lg:col-span-1">
          <div className="sticky top-6">
           
            <BookingFormHandler 
              facility={facility} 
              userEmail={userEmail} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}

