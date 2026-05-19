"use client";

import { useState } from "react";
import { Card, Button, Input, Select, ListBox, Label } from "@heroui/react";
import toast from "react-hot-toast";

export default function BookingFormHandler({ facility, userEmail }) {
  const [hours, setHours] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState("");

  const totalPrice = facility.price_per_hour * hours;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bookingDate = formData.get("booking_date");

    if (!selectedSlot) {
      toast.error("Please select a time slot!");
      return;
    }

    const finalBookingPayload = {
      facility_id: facility._id,
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
    <Card className="border border-slate-200 shadow-xl rounded-[24px] bg-white p-6 md:p-8">
      <div className="mb-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
          SECURE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">SLOT</span>
        </h2>
        <p className="text-slate-500 text-xs font-semibold mt-0.5">Fill out the details to lock your setup.</p>
      </div>

      <form onSubmit={handleBookingSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Label className="text-xs font-bold text-black tracking-wide uppercase">Facility Name</Label>
          <Input 
            type="text" 
            value={facility.facility_name} 
            isReadOnly 
            className="border-slate-200 text-slate-800 font-bold bg-slate-50 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-xs font-bold text-black tracking-wide uppercase">Booking Date *</Label>
          <Input 
            name="booking_date" 
            type="date" 
            isRequired 
            className="border-slate-300 text-black focus-within:border-orange-500 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Select
            isRequired
            placeholder="Choose Available Slot"
            className="text-black"
            onSelectionChange={(keys) => setSelectedSlot(Array.from(keys))}
          >
            <Label className="text-xs font-bold text-black tracking-wide uppercase">Available Time Slot *</Label>
            <Select.Trigger className="mt-1 border-slate-300 text-black focus-within:border-orange-500 rounded-xl">
              <Select.Value>{selectedSlot || "Select Time Slot"}</Select.Value>
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox className="bg-white text-black">
                {facility.available_slots?.map((slot, idx) => (
                  <ListBox.Item id={slot} key={idx} textValue={slot} className="hover:bg-orange-50 focus:bg-orange-50">
                    {slot}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-xs font-bold text-black tracking-wide uppercase">Duration (Hours) *</Label>
          <Input 
            type="number" 
            min="1" 
            value={hours}
            onChange={(e) => setHours(Math.max(1, Number(e.target.value)))}
            isRequired 
            className="border-slate-300 text-black focus-within:border-orange-500 rounded-xl"
          />
        </div>

        <div className="bg-orange-50/60 border border-orange-100 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-orange-800 uppercase tracking-wider">Total Est. Price</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">৳{facility.price_per_hour} × {hours} Hour(s)</p>
          </div>
          <div className="text-2xl font-black text-orange-600">
            ${totalPrice}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold h-12 rounded-xl shadow-lg transition-all duration-300 mt-2"
        >
          Confirm Booking
        </Button>
      </form>
    </Card>
  );
}