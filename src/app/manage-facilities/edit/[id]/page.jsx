
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import EditFacilityForm from "@/components/EditFacilityForm";
import { auth } from "@/lib/auth";


async function getFacilityDetails(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching facility details for edit:", error);
    return null;
  }
}

export default async function EditFacilityPage({ params }) {
  
  const { id } = await params;

  
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUserEmail = session?.user?.email || "";

  if (!currentUserEmail) {
    redirect("/login");
  }

 
  const facility = await getFacilityDetails(id);

  if (!facility) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white text-black">
        <p className="text-lg font-bold text-red-500">Facility not found!</p>
      </div>
    );
  }

  
  if (facility.owner_email !== currentUserEmail) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white text-black">
        <p className="text-lg font-bold text-red-500">Unauthorized! Only the owner can update this facility.</p>
      </div>
    );
  }

  
  return <EditFacilityForm facility={facility} />;
}
