// import { auth } from "@/src/lib/auth"; 
import { headers } from "next/headers";
import { Card, Button } from "@heroui/react";
import { MapPin, Users, DollarSign, Edit, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteFacilityButton from "@/components/DeleteFacilityButton";
import { auth } from "@/lib/auth";


async function getMyFacilities(ownerEmail) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-facilities?email=${ownerEmail}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching owner facilities:", error);
    return [];
  }
}

export default async function ManageFacilitiesPage() {
 
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const ownerEmail = session?.user?.email || "";

  if (!ownerEmail) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white text-black">
        <p className="text-lg font-bold text-red-500">Please log in to manage your facilities.</p>
      </div>
    );
  }

  
  const facilities = await getMyFacilities(ownerEmail);

  return (
    <div className="min-h-screen bg-white text-black max-w-6xl mx-auto p-6 py-12">
      
     
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black tracking-tight uppercase">
            MANAGE MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">FACILITIES</span>
          </h1>
          <p className="text-slate-600 text-sm font-medium mt-1">
            Update info or remove your listed sports arenas.
          </p>
        </div>
        <Link href="/add-facility">
          <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold h-11 px-6 rounded-xl shadow-lg uppercase text-xs tracking-wider">
            + Add New Facility
          </Button>
        </Link>
      </div>

      {facilities.length === 0 ? (
        <Card className="p-12 text-center border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 shadow-none">
          <p className="text-xl font-extrabold text-slate-400 uppercase tracking-wide">No Facilities Listed!</p>
          <p className="text-slate-500 text-sm mt-1">You haven't added any facility under your profile yet.</p>
        </Card>
      ) : (
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <Card 
              key={facility._id} 
              className="border border-slate-200 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
             
              <div className="relative w-full aspect-[16/10] bg-slate-100 border-b border-slate-100">
                <Image
                  src={facility.imageUrl || "/slotsliblogo.jpg"}
                  alt={facility.facility_name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-white text-orange-600 font-black text-[10px] px-3 py-1.5 rounded-xl uppercase shadow-md border border-orange-100">
                  {facility.facility_type}
                </div>
              </div>

           
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-1 uppercase">
                    {facility.facility_name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-xl col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="truncate">{facility.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-xl">
                      <Users className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>Cap: {facility.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-xl">
                      <DollarSign className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="text-orange-600 font-extrabold">৳{facility.price_per_hour}/h</span>
                    </div>
                  </div>
                </div>

               
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                 
                  <Link href={`/manage-facilities/edit/${facility._id}`} className="w-full">
                    <Button className="w-full bg-slate-900 hover:bg-black text-white font-extrabold h-10 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 text-xs">
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
  );
}
