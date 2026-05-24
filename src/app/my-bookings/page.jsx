import { headers } from "next/headers";
import { Card } from "@heroui/react";
import { Calendar, Clock, DollarSign, Activity } from "lucide-react";
import CancelBookingButton from "@/components/CancelBookingButton";
import { auth } from "@/lib/auth";

async function getMyBookings(email, token) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings?email=${email}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`, 
      },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching bookings on server:", error);
    return [];
  }
}

export default async function MyBookingsPage() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  const { token } = await auth.api.getToken({
    headers: headersList,
  });

  const userEmail = session?.user?.email || "";

  if (!userEmail) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        <p className="text-lg font-bold text-red-500">Please log in to view your bookings.</p>
      </div>
    );
  }

  const bookings = await getMyBookings(userEmail, token); 

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-6 py-12">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
            MY RESERVED <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">SLOTS</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-1">
            Review status or cancel your pending slot reservations.
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <Card className="p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/30 shadow-none">
            <p className="text-xl font-extrabold text-slate-400 dark:text-slate-600 uppercase tracking-wide">No Bookings Found!</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">You haven't booked any arenas yet.</p>
          </Card>
        ) : (
          /* Bookings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <Card 
                key={booking._id} 
                className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between gap-5 group shadow-none"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-xl border ${
                      booking.status === "pending" 
                        ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-900/50" 
                        : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-900/50"
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-1 uppercase">
                    {booking.facility_name || "Sports Facility"}
                  </h3>

                  <hr className="border-slate-100 dark:border-slate-800/60" />

                  {/* Booking Details */}
                  <div className="space-y-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span>Date: <span className="text-slate-900 dark:text-slate-200">{booking.booking_date}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span>Slot: <span className="text-slate-900 dark:text-slate-200">{booking.time_slot}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span>Duration: <span className="text-slate-900 dark:text-slate-200">{booking.hours} Hour(s)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span>Paid Total: <span className="text-orange-600 dark:text-orange-400 font-extrabold">${booking.total_price}</span></span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <CancelBookingButton bookingId={booking._id} token={token} />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
