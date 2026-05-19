import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] gap-4">
      <h1 className="text-8xl font-black text-orange-500">404</h1>
      <p className="text-xl font-bold text-slate-700">Page Not Found</p>
      <p className="text-slate-500">The page you are looking for does not exist.</p>
      <Link 
        href="/" 
        className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all"
      >
        Go Home
      </Link>
    </div>
  );
}