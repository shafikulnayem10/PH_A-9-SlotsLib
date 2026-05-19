"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { Trash2, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function CancelBookingButton({ bookingId, token }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenModal = async () => {
    try {
      const { data: session } = await authClient.getSession();

      if (!session || !session.user) {
        toast.error("You must be logged in to cancel a booking!");
        return;
      }

      setIsOpen(true);
    } catch (error) {
      console.error("Session check error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleCancelConfirm = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Booking cancelled successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to cancel booking. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Connection error!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
    
      <Button
        onClick={handleOpenModal}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold h-11 rounded-xl shadow-md shadow-red-600/10 transition-all duration-200 flex items-center justify-center gap-2 text-xs"
      >
        <Trash2 className="w-4 h-4" />
        Cancel Booking
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="bg-white border border-slate-200 rounded-[24px] max-w-md p-6 shadow-2xl">
              <Modal.CloseTrigger className="text-slate-400 hover:text-black transition-colors" />
              
              <Modal.Header className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 shadow-sm animate-bounce">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <Modal.Heading className="text-xl font-black text-slate-900 tracking-tight uppercase">
                    Cancel Reservation?
                  </Modal.Heading>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    This action cannot be undone. Your slot will be released.
                  </p>
                </div>
              </Modal.Header>

              <Modal.Body className="py-4 text-center">
                <p className="text-sm font-medium text-slate-600">
                  Are you absolutely sure you want to cancel this booking? Other players might grab this slot instantly.
                </p>
              </Modal.Body>

              <Modal.Footer className="flex gap-3 mt-2">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold h-11 rounded-xl transition-all"
                >
                  No, Keep It
                </Button>
                
                <Button
                  isLoading={isDeleting}
                  onClick={handleCancelConfirm}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold h-11 rounded-xl shadow-md shadow-orange-500/10 transition-all"
                >
                  {isDeleting ? "Cancelling..." : "Yes, Cancel"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}