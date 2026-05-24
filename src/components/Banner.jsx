import Link from "next/link"
import { Button } from "@heroui/react"
import { ChevronRight, Star } from "lucide-react"
import Image from "next/image"

export function Banner() {
  return (
    <div className="relative bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 right-0 -z-10 w-[50%] h-[600px] bg-gradient-to-b from-orange-50/50 dark:from-orange-900/10 to-transparent rounded-bl-[120px] hidden md:block" />
      <div className="absolute -top-40 -left-40 -z-10 w-96 h-96 bg-orange-100/30 dark:bg-orange-900/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 rounded-full border border-orange-100 dark:border-orange-800">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
                Instant Slot Booking 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Book Your Premium <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Sports Facilities
              </span> <br />
              Instantly Today
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Discover, check real-time availability, and secure your favorite playground, court, or turf without any double-booking hassles. Play your game whenever you want.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
              <Link href="/facilities" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto font-bold rounded-xl px-8 py-6 bg-orange-500 text-white shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/30 transition-all flex items-center gap-2 group text-base">
                  Explore Facilities
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">10+</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Venues</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">3k+</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Bookings</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1">
                  <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">4.9</p>
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Rating</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative hidden md:block">
            <div className="relative mx-auto w-full max-w-[440px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 ring-1 ring-slate-100 dark:ring-slate-700 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-600/40 z-10" />
              <Image
                src="/bannerpic.jpg"
                alt="Sports Arena Grid"
                className="w-full h-full object-cover"
                fill
                priority
                sizes="(max-w-7xl) 100vw, 50vw"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-700 z-20 shadow-lg">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">Featured Ground</p>
                <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">Arena,Dhaka</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}