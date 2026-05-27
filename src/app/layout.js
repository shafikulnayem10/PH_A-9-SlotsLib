import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import HeroUIThemeProvider from "@/providers/HeroUIThemeProvider";
// import ChatbotWrapper from "@/components/ChatbotWrapper";

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
  icons: {
    icon: "/slotsliblogo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased bg-white dark:bg-slate-950 text-black dark:text-white transition-colors duration-300">
        <HeroUIThemeProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
          {/* <ChatbotWrapper /> */}
        </HeroUIThemeProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              zIndex: 99999,
            },
          }}
        />
      </body>
    </html>
  );
}