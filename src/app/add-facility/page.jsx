"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { 
  FieldError, 
  Input, 
  Label, 
  TextField, 
  Select, 
  ListBox, 
  TextArea, 
  Button, 
  Card 
} from "@heroui/react";
import toast from "react-hot-toast";
import { FiPlus, FiX } from "react-icons/fi"; 

const AddFacilityPage = () => {
  const [slots, setSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState(""); 
  
  const { data: session, isPending } = authClient.useSession();

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
    const formData = new FormData(e.currentTarget);
    const facilityData = Object.fromEntries(formData.entries());

    if (slots.length === 0) {
      toast.error("Please add at least one available time slot!");
      return;
    }

    const ownerEmail = session?.user?.email || "";

    if (!ownerEmail) {
      toast.error("You must be logged in to add a facility!");
      return;
    }

    try {
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Failed to retrieve authentication token!");
        return;
      }

      const token = data.token;

      const finalFacilityPayload = {
        facility_name: facilityData.facility_name,
        facility_type: facilityData.facility_type,
        imageUrl: facilityData.imageUrl,
        location: facilityData.location,
        price_per_hour: Number(facilityData.price_per_hour),
        capacity: Number(facilityData.capacity),
        available_slots: slots, 
        description: facilityData.description,
        owner_email: ownerEmail, 
        booking_count: 0 
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalFacilityPayload),
      });

      if (res.ok) {
        toast.success("Facility added successfully!");
        e.target.reset(); 
        setSlots([]);
      } else {
        toast.error("Failed to add facility. Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong connecting to backend.");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        <p className="font-bold text-slate-500 animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  
  const uiInputStyles = {
    input: "text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium",
    inputWrapper: [
      "bg-white dark:bg-slate-950",
      "border border-slate-300 dark:border-slate-800",
      "hover:border-slate-400 dark:hover:border-slate-700",
      "focus-within:!border-orange-500 dark:focus-within:!border-orange-500",
      "rounded-xl transition-all duration-200"
    ].join(" ")
  };

 
  const uiSelectStyles = {
    value: "text-slate-900 dark:text-white font-medium",
    trigger: [
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
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            ADD NEW <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">FACILITY</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-1">
            List your sports venue for others to book.
          </p>
        </div>

        {/* Form Card */}
        <Card className="border border-slate-200 dark:border-slate-800 rounded-[24px] bg-white dark:bg-slate-900 overflow-hidden shadow-none transition-colors duration-300">
          <form onSubmit={onSubmit} className="p-8 md:p-10 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Facility Name */}
              <div>
                <TextField name="facility_name" isRequired className="w-full">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Facility Name *</Label>
                  <Input placeholder="e.g. Red Turf Football Ground" classNames={uiInputStyles} />
                  <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
                </TextField>
              </div>

              {/* Sport Type */}
              <div>
                <Select
                  name="facility_type"
                  isRequired
                  className="w-full"
                  placeholder="Select Sport Type"
                  classNames={uiSelectStyles}
                >
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Sport Type *</Label>
                  <Select.Popover>
                    <ListBox className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1">
                      <ListBox.Item id="Football" textValue="Football" className="px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/40 focus:bg-orange-50 dark:focus:bg-orange-950/40 cursor-pointer">Football</ListBox.Item>
                      <ListBox.Item id="Cricket" textValue="Cricket" className="px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/40 focus:bg-orange-50 dark:focus:bg-orange-950/40 cursor-pointer">Cricket</ListBox.Item>
                      <ListBox.Item id="Badminton" textValue="Badminton" className="px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/40 focus:bg-orange-50 dark:focus:bg-orange-950/40 cursor-pointer">Badminton</ListBox.Item>
                      <ListBox.Item id="Basketball" textValue="Basketball" className="px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/40 focus:bg-orange-50 dark:focus:bg-orange-950/40 cursor-pointer">Basketball</ListBox.Item>
                      <ListBox.Item id="Tennis" textValue="Tennis" className="px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/40 focus:bg-orange-50 dark:focus:bg-orange-950/40 cursor-pointer">Tennis</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Image URL */}
              <div>
                <TextField name="imageUrl" type="url" isRequired className="w-full">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Image URL *</Label>
                  <Input placeholder="https://example.com/image.jpg" classNames={uiInputStyles} />
                  <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
                </TextField>
              </div>

              {/* Location */}
              <div>
                <TextField name="location" isRequired className="w-full">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Location *</Label>
                  <Input placeholder="e.g. Gulshan, Dhaka" classNames={uiInputStyles} />
                  <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
                </TextField>
              </div>

              {/* Price Per Hour */}
              <div>
                <TextField name="price_per_hour" type="number" isRequired className="w-full">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase mb-1.5 block">Price Per Hour ($) *</Label>
                  <Input placeholder="1500" classNames={uiInputStyles} />
                  <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
                </TextField>
              </div>

              {/* Capacity */}
              <div>
                <TextField name="capacity" type="number" isRequired className="w-full">
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
                <TextField name="description" isRequired className="w-full">
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
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold h-12 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 mt-4"
            >
              Add Facility
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddFacilityPage;