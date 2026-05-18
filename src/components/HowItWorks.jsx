import React from "react";
import { Search, CalendarCheck, Trophy } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <Search className="w-8 h-8 text-orange-500" />,
    title: "Find Your Arena",
    description: "Explore near-by premium football turfs, cricket pitches, and multi-sports courts effortlessly.",
  },
  {
    id: 2,
    icon: <CalendarCheck className="w-8 h-8 text-orange-500" />,
    title: "Book Desired Slot",
    description: "Select your preferred date, choose from available time slots, and confirm your booking instantly.",
  },
  {
    id: 3,
    icon: <Trophy className="w-8 h-8 text-orange-500" />,
    title: "Gear Up & Play",
    description: "Show up at the venue with your team, skip the long queues, and enjoy your match seamlessly.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-50 text-slate-900 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
      
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full border border-orange-100">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Process</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            HOW IT <span className="text-orange-500">WORKS</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto font-medium">
            Book your favorite sports facility in 3 simple steps without any coordination hassle.
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mt-2"></div>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl group">
              
            
              <div className="absolute top-4 right-4 text-xs font-black bg-slate-100 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors w-7 h-7 flex items-center justify-center rounded-full">
                0{step.id}
              </div>

            
              <div className="p-4 bg-orange-50 rounded-2xl mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <div className="group-hover:scale-110 group-hover:text-white transition-transform duration-300">
                  {React.cloneElement(step.icon, {
                    className: "w-8 h-8 text-orange-500 group-hover:text-white transition-colors"
                  })}
                </div>
              </div>

          
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}