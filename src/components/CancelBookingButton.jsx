"use client";

import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function CancelBookingButton({ bookingId }) {
  const router = useRouter();

  const handleCancel = async () => {
    try {
   
      const { data: session } = await authClient.getSession();

      
      if (!session || !session.user) {
        toast.error("You must be logged in to cancel a booking!");
        return;
      }

      
      const proceed = window.confirm("Are you sure you want to cancel this booking?");
      if (!proceed) return;

    
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Booking cancelled successfully!");
        
        router.refresh();
      } else {
        toast.error("Failed to cancel booking. Try again.");
      }
    } catch (error) {
      console.error("Error during cancellation session check:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Button
      onClick={handleCancel}
      className="w-full bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-600 font-extrabold h-11 rounded-xl border border-slate-100 hover:border-red-200/60 transition-all duration-200 flex items-center justify-center gap-2 text-xs"
    >
      <Trash2 className="w-4 h-4" />
      Cancel Booking
    </Button>
  );
}