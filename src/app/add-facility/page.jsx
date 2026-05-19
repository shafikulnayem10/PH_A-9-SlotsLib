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

    try {
      const { data: session } = await authClient.getSession();
      const ownerEmail = session?.user?.email || "";

      if (!ownerEmail) {
        toast.error("You must be logged in to add a facility!");
        return;
      }

    
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

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-[85vh] flex flex-col justify-center bg-white text-black">
      
    
      <div className="mb-6">
        <h1 className="text-3xl font-black text-black tracking-tight">
          ADD NEW <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">FACILITY</span>
        </h1>
        <p className="text-slate-600 text-sm font-medium mt-1">
          List your sports venue for others to book.
        </p>
      </div>

      {/* Main Card */}
      <Card className="border border-slate-200 shadow-xl rounded-[24px] bg-white overflow-hidden">
        <form onSubmit={onSubmit} className="p-8 md:p-10 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
          
            <div>
              <TextField name="facility_name" isRequired className="w-full">
                <Label className="text-sm font-bold text-black tracking-wide uppercase">Facility Name *</Label>
                <Input placeholder="e.g. Red Turf Football Ground" className="mt-1.5 border-slate-300 text-black focus-within:border-orange-500 rounded-xl focus-within:ring-1 focus-within:ring-orange-500" />
                <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
              </TextField>
            </div>

          
            <div>
              <Select
                name="facility_type"
                isRequired
                className="w-full text-black"
                placeholder="Select Sport Type"
              >
                <Label className="text-sm font-bold text-black tracking-wide uppercase">Sport Type *</Label>
                <Select.Trigger className="mt-1.5 border-slate-300 text-black focus-within:border-orange-500 rounded-xl focus-within:ring-1 focus-within:ring-orange-500">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-white text-black">
                    <ListBox.Item id="Football" textValue="Football" className="hover:bg-orange-50 focus:bg-orange-50">Football</ListBox.Item>
                    <ListBox.Item id="Cricket" textValue="Cricket" className="hover:bg-orange-50 focus:bg-orange-50">Cricket</ListBox.Item>
                    <ListBox.Item id="Badminton" textValue="Badminton" className="hover:bg-orange-50 focus:bg-orange-50">Badminton</ListBox.Item>
                    <ListBox.Item id="Basketball" textValue="Basketball" className="hover:bg-orange-50 focus:bg-orange-50">Basketball</ListBox.Item>
                    <ListBox.Item id="Tennis" textValue="Tennis" className="hover:bg-orange-50 focus:bg-orange-50">Tennis</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

         
            <div>
              <TextField name="imageUrl" type="url" isRequired className="w-full">
                <Label className="text-sm font-bold text-black tracking-wide uppercase">Image URL *</Label>
                <Input placeholder="https://example.com/image.jpg" className="mt-1.5 border-slate-300 text-black focus-within:border-orange-500 rounded-xl focus-within:ring-1 focus-within:ring-orange-500" />
                <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
              </TextField>
            </div>

          
            <div>
              <TextField name="location" isRequired className="w-full">
                <Label className="text-sm font-bold text-black tracking-wide uppercase">Location *</Label>
                <Input placeholder="e.g. Gulshan, Dhaka" className="mt-1.5 border-slate-300 text-black focus-within:border-orange-500 rounded-xl focus-within:ring-1 focus-within:ring-orange-500" />
                <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
              </TextField>
            </div>

           
            <div>
              <TextField name="price_per_hour" type="number" isRequired className="w-full">
                <Label className="text-sm font-bold text-black tracking-wide uppercase">Price Per Hour ($) *</Label>
                <Input placeholder="1500" className="mt-1.5 border-slate-300 text-black focus-within:border-orange-500 rounded-xl focus-within:ring-1 focus-within:ring-orange-500" />
                <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
              </TextField>
            </div>

           
            <div>
              <TextField name="capacity" type="number" isRequired className="w-full">
                <Label className="text-sm font-bold text-black tracking-wide uppercase">Capacity (Players) *</Label>
                <Input placeholder="14" className="mt-1.5 border-slate-300 text-black focus-within:border-orange-500 rounded-xl focus-within:ring-1 focus-within:ring-orange-500" />
                <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
              </TextField>
            </div>

           
            <div className="md:col-span-2 flex flex-col gap-1">
              <Label className="text-sm font-bold text-black tracking-wide uppercase">Available Time Slots *</Label>
              <div className="flex gap-2 items-center mt-1">
                <Input 
                  value={currentSlot}
                  onChange={(e) => setCurrentSlot(e.target.value)}
                  placeholder="e.g. 08:00 AM - 09:00 AM" 
                  className="border-slate-300 text-black focus-within:border-orange-500 flex-1 rounded-xl focus-within:ring-1 focus-within:ring-orange-500"
                />
                <Button 
                  type="button"
                  onClick={handleAddSlot}
                  className="bg-gradient-to-r from-orange-500 to-red-600 min-w-12 h-12 rounded-xl text-white flex items-center justify-center hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-md shadow-orange-500/10"
                >
                  <FiPlus className="text-xl" />
                </Button>
              </div>

              
              <div className="flex flex-wrap gap-2 mt-2">
                {slots.map((slot, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-lg text-orange-700 font-bold text-xs"
                  >
                    <span>{slot}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSlot(slot)}
                      className="text-red-500 hover:text-red-700 focus:outline-none bg-orange-100 hover:bg-orange-200 p-0.5 rounded transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

           
            <div className="md:col-span-2">
              <TextField name="description" isRequired className="w-full">
                <Label className="text-sm font-bold text-black tracking-wide uppercase">Description *</Label>
                <TextArea
                  placeholder="Describe your facility..."
                  className="mt-1.5 border-slate-300 text-black focus-within:border-orange-500 rounded-xl focus-within:ring-1 focus-within:ring-orange-500"
                />
                <FieldError className="text-xs text-red-600 mt-1 font-semibold" />
              </TextField>
            </div>
          </div>

         
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold h-12 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 mt-4"
          >
            Add Facility
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddFacilityPage;
