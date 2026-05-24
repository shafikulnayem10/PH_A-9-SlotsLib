import { headers } from "next/headers";
import Image from "next/image";
import { MapPin, Users, DollarSign } from "lucide-react";
import BookingFormHandler from "@/components/BookingFormHandler";
import { auth } from "@/lib/auth";

async function getSingleFacility(id, token) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching single facility:", error);
    return null;
  }
}

export default async function FacilityDetailsPage({ params }) {
  const { id } = await params;
  const headersList = await headers();

  const { token } = await auth.api.getToken({
    headers: headersList,
  });

  const session = await auth.api.getSession({
    headers: headersList,
  });
  const userEmail = session?.user?.email || "";

  const facility = await getSingleFacility(id, token);

  if (!facility) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 text-black dark:text-white transition-colors duration-300">
        <p className="text-xl font-bold text-slate-500 dark:text-slate-400">Facility not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white max-w-7xl mx-auto p-6 py-12 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 space-y-6">
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
            <Image
              src={facility.imageUrl || "/slotsliblogo.jpg"}
              alt={facility.facility_name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4 bg-white dark:bg-slate-900 text-orange-600 font-black text-xs px-4 py-2 rounded-xl uppercase shadow-md">
              {facility.facility_type}
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              {facility.facility_name}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-1.5 rounded-xl">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{facility.location}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-1.5 rounded-xl">
                <Users className="w-4 h-4 text-orange-500" />
                <span>Capacity: {facility.capacity} Players</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-1.5 rounded-xl">
                <DollarSign className="w-4 h-4 text-orange-500" />
                <span>${facility.price_per_hour} / Hour</span>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            <div className="space-y-2">
              <h3 className="text-lg font-extrabold uppercase text-slate-900 dark:text-white">About This Venue</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
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
              token={token}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
