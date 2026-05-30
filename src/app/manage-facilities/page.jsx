import { headers } from "next/headers";
import { Card, Button } from "@heroui/react";
import { MapPin, Users, DollarSign, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteFacilityButton from "@/components/DeleteFacilityButton";
import { auth } from "@/lib/auth";

async function getMyFacilities(ownerEmail, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-facilities?email=${ownerEmail}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching owner facilities:", error);
    return [];
  }
}

export default async function ManageFacilitiesPage() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });
  const ownerEmail = session?.user?.email || "";

  if (!ownerEmail) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        <p className="text-lg font-bold text-red-500">
          Please log in to manage your facilities.
        </p>
      </div>
    );
  }

  const tokenResponse = await auth.api.getToken({
    headers: headersList,
  });
  const token = tokenResponse?.token;

  const facilities = await getMyFacilities(ownerEmail, token);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-6 py-12">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              MANAGE MY{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                FACILITIES
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-1">
              Update info or remove your listed sports arenas.
            </p>
          </div>
          <Link href="/add-facility">
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold h-11 px-6 rounded-xl shadow-lg uppercase text-xs tracking-wider">
              + Add New Facility
            </Button>
          </Link>
        </div>

        {/* Empty State */}
        {facilities.length === 0 ? (
          <Card className="p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900 shadow-none">
            <p className="text-xl font-extrabold text-slate-400 dark:text-slate-600 uppercase tracking-wide">
              No Facilities Listed!
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              You haven't added any facility under your profile yet.
            </p>
          </Card>
        ) : (
          /* Facilities Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <Card
                key={facility._id}
                className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm dark:shadow-none hover:shadow-xl dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
                  <Image
                    src={facility.imageUrl || "/slotsliblogo.jpg"}
                    alt={facility.facility_name}
                    fill
                    className="object-cover"
                  />
                  {/* Sport Type Badge */}
                  <div className="absolute top-3 left-3 bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 font-black text-[10px] px-3 py-1.5 rounded-xl uppercase shadow-md border border-orange-100 dark:border-orange-950/60">
                    {facility.facility_type}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4 bg-white dark:bg-slate-900">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-500 transition-colors line-clamp-1 uppercase">
                      {facility.facility_name}
                    </h3>

                    {/* Info Blocks Grid */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-bold pt-1">
                      {/* Location Box */}
                      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-2.5 py-1.5 rounded-xl col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="truncate text-slate-700 dark:text-slate-300">{facility.location}</span>
                      </div>
                      
                      {/* Capacity Box */}
                      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-2.5 py-1.5 rounded-xl">
                        <Users className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">Cap: {facility.capacity}</span>
                      </div>

                      {/* Price Box */}
                      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-2.5 py-1.5 rounded-xl">
                        <DollarSign className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="text-orange-600 dark:text-orange-400 font-extrabold">
                          ${facility.price_per_hour}/h
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={`/manage-facilities/edit/${facility._id}`}
                      className="w-full"
                    >
                      <Button className="w-full bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold h-10 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wide">
                        <Edit className="w-3.5 h-3.5" />
                        Update
                      </Button>
                    </Link>

                    <DeleteFacilityButton facilityId={facility._id} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

