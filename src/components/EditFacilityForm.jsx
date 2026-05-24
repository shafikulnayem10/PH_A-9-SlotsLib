"use client";

import { useState } from "react";
import { 
  FieldError, 
  Input, 
  Label, 
  TextField, 
  TextArea, 
  Button, 
  Card 
} from "@heroui/react";
import toast from "react-hot-toast";
import { FiPlus, FiX } from "react-icons/fi"; 
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function EditFacilityForm({ facility }) {
  const router = useRouter();
  
  const [slots, setSlots] = useState(facility.available_slots || []);
  const [currentSlot, setCurrentSlot] = useState(""); 
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAddSlot = () => {
    const trimmed = currentSlot.trim();
    if (!trimmed) return;
    
    if (slots.includes(trimmed)) {
      toast.error("This time slot is already added!");
      return;
    }

    setSlots([...slots, trimmed]);
    setCurrentSlot(""); 
  };

  const handleRemoveSlot = (slotToRemove) => {
    setSlots(slots.filter(slot => slot !== slotToRemove));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    const formData = new FormData(e.currentTarget);
    const facilityData = Object.fromEntries(formData.entries());

    if (slots.length === 0) {
      toast.error("Please add at least one available time slot!");
      setIsUpdating(false);
      return;
    }

    try {
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Failed to retrieve authentication token!");
        setIsUpdating(false);
        return;
      }

      const updatedFacilityPayload = {
        facility_name: facilityData.facility_name,
        facility_type: facilityData.facility_type || facility.facility_type,
        imageUrl: facilityData.imageUrl,
        location: facilityData.location,
        price_per_hour: Number(facilityData.price_per_hour),
        capacity: Number(facilityData.capacity),
        available_slots: slots,
        description: facilityData.description,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${facility._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(updatedFacilityPayload),
      });

      if (res.ok) {
        toast.success("Facility updated successfully!");
        router.push("/manage-facilities"); 
        router.refresh();
      } else {
        toast.error("Failed to update facility. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong connecting to backend.");
    } finally {
      setIsUpdating(false);
    }
  };

 
  const uiInputStyles = {
    input: "text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium",
    inputWrapper: [
      "bg-white dark:bg-slate-955",
      "border border-slate-300 dark:border-slate-800",
      "hover:border-slate-400 dark:hover:border-slate-700",
      "focus-within:!border-orange-500 dark:focus-within:!border-orange-500",
      "rounded-xl transition-all duration-200"
    ].join(" ")
  };

  return (
    <div className="w-full min-h-[85vh] bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="p-6 max-w-5xl mx-auto flex flex-col justify-center">
        
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            UPDATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">FACILITY</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-1">
            Modify your sports venue information and available schedules.
          </p>
        </div>

        {/* Form Card */}
        <Card className="border border-slate-200 dark:border-slate-800 rounded-[24px] bg-white dark:bg-slate-900 overflow-hidden shadow-none transition-colors duration-300">
          <form onSubmit={onSubmit} className="p-8 md:p-10 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Facility Name */}
              <div>
                <TextField name="facility_name" isRequired defaultValue={facility.facility_name} className="w-full">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Facility Name *</Label>
                  <Input placeholder="e.g. Red Turf Football Ground" classNames={uiInputStyles} />
                  <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
                </TextField>
              </div>

              {/* Sport Type  */}
              <div className="flex flex-col">
                <label htmlFor="facility_type" className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5">
                  Sport Type *
                </label>
                <select
                  id="facility_type"
                  name="facility_type"
                  required
                  defaultValue={facility.facility_type || ""}
                  className="w-full h-[44px] px-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-all duration-200 cursor-pointer"
                >
                  <option value="" disabled hidden>Select Sport Type</option>
                  <option value="Football" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Football</option>
                  <option value="Cricket" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Cricket</option>
                  <option value="Badminton" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Badminton</option>
                  <option value="Basketball" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Basketball</option>
                  <option value="Tennis" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tennis</option>
                </select>
              </div>

              {/* Image URL */}
              <div>
                <TextField name="imageUrl" type="url" isRequired defaultValue={facility.imageUrl} className="w-full">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Image URL *</Label>
                  <Input placeholder="https://example.com/image.jpg" classNames={uiInputStyles} />
                  <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
                </TextField>
              </div>

              {/* Location */}
              <div>
                <TextField name="location" isRequired defaultValue={facility.location} className="w-full">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Location *</Label>
                  <Input placeholder="e.g. Gulshan, Dhaka" classNames={uiInputStyles} />
                  <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
                </TextField>
              </div>

              {/* Price Per Hour */}
              <div>
                <TextField name="price_per_hour" type="number" isRequired defaultValue={facility.price_per_hour} className="w-full">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Price Per Hour ($) *</Label>
                  <Input placeholder="1500" classNames={uiInputStyles} />
                  <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
                </TextField>
              </div>

              {/* Capacity */}
              <div>
                <TextField name="capacity" type="number" isRequired defaultValue={facility.capacity} className="w-full">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Capacity (Players) *</Label>
                  <Input placeholder="14" classNames={uiInputStyles} />
                  <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
                </TextField>
              </div>

              {/* Time Slots */}
              <div className="md:col-span-2 flex flex-col gap-1">
                <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Available Time Slots *</Label>
                <div className="flex gap-2 items-center">
                  <Input 
                    value={currentSlot}
                    onChange={(e) => setCurrentSlot(e.target.value)}
                    placeholder="e.g. 08:00 AM - 09:00 AM" 
                    classNames={uiInputStyles}
                  />
                  <Button 
                    type="button"
                    onClick={handleAddSlot}
                    className="bg-gradient-to-r from-orange-500 to-red-600 min-w-12 h-10 rounded-xl text-white flex items-center justify-center hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-md shadow-orange-500/10"
                  >
                    <FiPlus className="text-xl" />
                  </Button>
                </div>

                {/* Added Slots Badges */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {slots.map((slot, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 px-3 py-1.5 rounded-lg text-orange-700 dark:text-orange-400 font-bold text-xs"
                    >
                      <span>{slot}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveSlot(slot)}
                        className="text-red-500 hover:text-red-700 focus:outline-none bg-orange-100 dark:bg-orange-900/60 hover:bg-orange-200 dark:hover:bg-orange-800 p-0.5 rounded transition-colors"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <TextField name="description" isRequired defaultValue={facility.description} className="w-full">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Description *</Label>
                  <TextArea
                    placeholder="Describe your facility..."
                    classNames={uiInputStyles}
                  />
                  <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
                </TextField>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isUpdating}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold h-12 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 mt-4 uppercase text-xs tracking-wider"
            >
              {isUpdating ? "Updating Info..." : "Save Changes"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}