

import { Banner } from "@/components/Banner";
import { FeaturedFacilities } from "@/components/FeaturedFacilities";
import { Testimonials } from "@/components/Testimonials";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
     
    

    
      <main>
        <Banner></Banner>
        <FeaturedFacilities></FeaturedFacilities>
        <Testimonials></Testimonials>
      </main>
    </div>
  );
}
