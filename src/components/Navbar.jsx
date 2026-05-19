"use client";

import { useState, useEffect } from "react";
import { Menu, X, Calendar, PlusCircle, FolderOpen, LogOut, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    await authClient.signOut();
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    router.push("/");
  };

  const navLink = (href, label) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`font-semibold text-sm lg:text-base transition-colors relative ${
          isActive
            ? "text-orange-500 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-orange-500 after:rounded-full"
            : "text-slate-700 hover:text-orange-500"
        }`}
      >
        {label}
      </Link>
    );
  };

  const mobileNavLink = (href, label) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setIsMenuOpen(false)}
        className={`block px-4 py-2.5 text-base font-semibold rounded-xl transition-colors ${
          isActive
            ? "bg-orange-50 text-orange-500 border border-orange-100"
            : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-white py-4"
    } border-b border-slate-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
                <Image
                  src="/slotsliblogo.jpg"
                  alt="SlotsLib Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full ring-2 ring-orange-500/10"
                  priority
                />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-black">
                Slots<span className="text-orange-500">Lib</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex gap-4 lg:gap-6 items-center mx-auto">
            {navLink("/", "Home")}
            {navLink("/facilities", "All Facilities")}
            {mounted && !isPending && session && (
              <>
                {navLink("/my-bookings", "My Bookings")}
                {navLink("/add-facility", "Add Facility")}
                {navLink("/manage-facilities", "Manage Facilities")}
              </>
            )}
          </div>

          <div className="hidden md:flex items-center min-w-[100px] justify-end">
            {mounted && !isPending && (
              !session ? (
                <Link href="/login">
                  <Button className="font-bold rounded-xl px-6 bg-orange-500 text-white shadow-md shadow-orange-500/10 hover:bg-orange-600 transition-colors">
                    Login
                  </Button>
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50/30 transition-all duration-200"
                  >
                    <Image
                      width={32}
                      height={32}
                      src={session?.user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400"}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/10"
                    />
                    <span className="text-sm font-bold text-slate-800 max-w-[120px] truncate">{session?.user?.name}</span>
                    {isDropdownOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-12 w-60 bg-white border border-slate-200 rounded-xl shadow-xl flex flex-col py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Signed in as</p>
                        <p className="text-xs font-bold text-slate-700 truncate">{session?.user?.email}</p>
                      </div>

                      <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)} className={`px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors font-medium ${pathname === "/my-bookings" ? "text-orange-600 bg-orange-50" : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"}`}>
                        <Calendar className="w-4 h-4 text-slate-400" /> My Bookings
                      </Link>
                      <Link href="/add-facility" onClick={() => setIsDropdownOpen(false)} className={`px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors font-medium ${pathname === "/add-facility" ? "text-orange-600 bg-orange-50" : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"}`}>
                        <PlusCircle className="w-4 h-4 text-slate-400" /> Add Facility
                      </Link>
                      <Link href="/manage-facilities" onClick={() => setIsDropdownOpen(false)} className={`px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors font-medium ${pathname === "/manage-facilities" ? "text-orange-600 bg-orange-50" : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"}`}>
                        <FolderOpen className="w-4 h-4 text-slate-400" /> Manage Facilities
                      </Link>

                      <button
                        onClick={handleLogOut}
                        className="px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/60 flex items-center gap-2.5 transition-colors text-left border-t border-slate-100 mt-1 w-full font-semibold"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-1.5 bg-white border-b border-slate-200 animate-in slide-in-from-top duration-200">
          {mobileNavLink("/", "Home")}
          {mobileNavLink("/facilities", "All Facilities")}

          {mounted && !isPending && session && (
            <>
              {mobileNavLink("/my-bookings", "My Bookings")}
              {mobileNavLink("/add-facility", "Add Facility")}
              {mobileNavLink("/manage-facilities", "Manage Facilities")}
            </>
          )}

          <div className="pt-4 border-t border-slate-100 mt-3">
            {mounted && !isPending && (
              !session ? (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full font-bold rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/10 py-5">
                    Login
                  </Button>
                </Link>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 rounded-xl">
                    <Image
                      width={36}
                      height={36}
                      src={session?.user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400"}
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="truncate">
                      <p className="text-sm font-bold text-slate-800 truncate">{session?.user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{session?.user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="block w-full text-left px-4 py-2.5 text-base font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
