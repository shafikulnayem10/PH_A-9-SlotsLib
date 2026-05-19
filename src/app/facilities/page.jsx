import { FacilityCard } from "@/components/FacilityCard";


async function getFacilities() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`, {
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch facilities");
    }

    return await res.json();
  } catch (error) {
    console.error("Error loading facilities:", error);
    return []; 
  }
}

export default async function FacilitiesPage() {
  
  const facilities = await getFacilities();

  return (
    <div className="min-h-screen bg-white text-black p-6 max-w-7xl mx-auto py-12">
      
    
      <div className="mb-12">
        <h1 className="text-3xl font-black text-black tracking-tight uppercase">
          OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">FACILITIES</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium mt-1">
          Discover our premium sports venues available for instant booking.
        </p>
      </div>

      
      {facilities.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
          <p className="text-slate-500 font-bold text-lg">No facilities available right now.</p>
        </div>
      ) : (
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      )}
    </div>
  );
}
