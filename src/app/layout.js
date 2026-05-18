import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SlotsLib",
  description: "Book your premium sports facilities instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-black">
        
       
        <Toaster position="top-center" reverseOrder={false} />
        
        <Navbar />
        
        <main className="grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
