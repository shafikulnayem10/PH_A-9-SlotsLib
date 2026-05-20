"use client";

import { useState } from "react";
import { Card, Button, Input } from "@heroui/react";
import toast from "react-hot-toast";

export default function BookingFormHandler({ facility, userEmail, token }) {
  const [hours, setHours] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState("");

  const totalPrice = facility.price_per_hour * hours;
  const today = new Date().toISOString().split("T")[0];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bookingDate = formData.get("booking_date");

    if (!bookingDate) {
      toast.error("Please select a booking date!");
      return;
    }

    if (!selectedSlot || selectedSlot.length === 0) {
      toast.error("Please select a time slot!");
      return;
    }

    if (!hours || hours < 1) {
      toast.error("Duration must be at least 1 hour!");
      return;
    }

    const finalBookingPayload = {
      facility_id: facility._id,
      facility_name: facility.facility_name,
      user_email: userEmail,
      booking_date: bookingDate,
      time_slot: selectedSlot,
      hours: Number(hours),
      total_price: Number(totalPrice),
      status: "pending",
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalBookingPayload),
      });

      if (res.ok) {
        toast.success("Booking placed successfully! Waiting for approval.");
        e.target.reset();
        setSelectedSlot("");
        setHours(1);
      } else {
        toast.error("Failed to process booking. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server.");
    }
  };

  return (
    <Card className="rounded-[28px] bg-white overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/60 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-slate-900 px-6 py-5">
        <p className="text-orange-400 text-[10px] font-bold tracking-[0.18em] uppercase mb-1">Sports Booking</p>
        <h2 className="text-xl font-black text-white tracking-tight">
          Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Slot</span>
        </h2>
        <p className="text-slate-400 text-xs mt-1 font-medium">Fill out the details to lock your setup.</p>
      </div>

      <form onSubmit={handleBookingSubmit} className="px-6 py-6 space-y-4">

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">Facility</label>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shrink-0" />
            <span className="text-slate-800 font-bold text-sm">{facility.facility_name}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">
            Date <span className="text-red-500">*</span>
          </label>
          <Input
            name="booking_date"
            type="date"
            isRequired
            min={today}
            className="border-slate-200 text-black focus-within:border-orange-500 rounded-2xl bg-slate-50 text-sm w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">
            Duration (hrs) <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden focus-within:border-orange-500 transition-colors">
            <button
              type="button"
              onClick={() => setHours(h => Math.max(1, h - 1))}
              className="px-5 py-3 text-slate-500 hover:text-orange-500 hover:bg-orange-50 transition-colors font-black text-lg leading-none"
            >
              −
            </button>
            <span className="flex-1 text-center font-black text-slate-900 text-sm">{hours}</span>
            <button
              type="button"
              onClick={() => setHours(h => h + 1)}
              className="px-5 py-3 text-slate-500 hover:text-orange-500 hover:bg-orange-50 transition-colors font-black text-lg leading-none"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">
            Time Slot <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {facility.available_slots?.map((slot, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-2 rounded-xl text-xs font-black border transition-all duration-200 ${
                  selectedSlot === slot
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-md shadow-orange-200"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-red-50 p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-orange-700 tracking-[0.15em] uppercase">Total Est. Price</p>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              ${facility.price_per_hour} × {hours} Hour{hours > 1 ? "s" : ""}
            </p>
          </div>
          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
            ${totalPrice}
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black h-12 rounded-2xl shadow-lg shadow-orange-200 transition-all duration-300 text-sm tracking-wide uppercase"
        >
          Confirm Booking 
        </Button>
      </form>
    </Card>
  );
}

