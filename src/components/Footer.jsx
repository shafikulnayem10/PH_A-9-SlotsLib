import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Slots<span className="text-orange-500">Lib</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The ultimate platform to discover and book your favorite premium sports venues instantly. Play your game without any double-booking hassle.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-xl hover:text-orange-500 hover:bg-slate-700/80 transition-colors flex items-center justify-center">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-xl hover:text-orange-500 hover:bg-slate-700/80 transition-colors flex items-center justify-center">
                <FaXTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-xl hover:text-orange-500 hover:bg-slate-700/80 transition-colors flex items-center justify-center">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-xl hover:text-orange-500 hover:bg-slate-700/80 transition-colors flex items-center justify-center">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link href="/facilities" className="hover:text-orange-500 transition-colors">All Facilities</Link></li>
              <li><Link href="/my-bookings" className="hover:text-orange-500 transition-colors">My Bookings</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-3.5 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-slate-400">123 Sports Arena Road, Sector 10, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="tel:+880123456789" className="hover:text-orange-500 transition-colors">+880 1234-567890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="mailto:support@slotslib.com" className="hover:text-orange-500 transition-colors">support@slotslib.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} SlotsLib. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}