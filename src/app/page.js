

import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
     
      <Navbar></Navbar>

    
      <main>
        <h1 className="text-3xl font-bold mb-4">Welcome to the HomePage</h1>
        <p>This is the main content area.</p>
      </main>
    </div>
  );
}
