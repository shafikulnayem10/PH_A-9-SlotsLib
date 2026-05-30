import { headers } from "next/headers";
import { redirect } from "next/navigation";
import EditFacilityForm from "@/components/EditFacilityForm";
import { auth } from "@/lib/auth";

async function getFacilityDetails(id, token) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`, {
      next: { revalidate: 60 },
      headers: {
        authorization: `Bearer ${token}`,
      },
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

  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });
  const currentUserEmail = session?.user?.email || "";

  if (!currentUserEmail) {
    redirect("/login");
  }

  const tokenResponse = await auth.api.getToken({
    headers: headersList,
  });
  const token = tokenResponse?.token;

  const facility = await getFacilityDetails(id, token);

  
  if (!facility) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        <p className="text-lg font-bold text-red-500 uppercase tracking-wide">
          Facility not found!
        </p>
      </div>
    );
  }

  
  if (facility.owner_email !== currentUserEmail) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        <p className="text-lg font-bold text-red-500 uppercase tracking-wide px-4 text-center">
          Unauthorized! Only the owner can update this facility.
        </p>
      </div>
    );
  }

  return <EditFacilityForm facility={facility} />;
}
