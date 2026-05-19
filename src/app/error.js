"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] gap-4">
      <h1 className="text-8xl font-black text-orange-500">Oops!</h1>
      <p className="text-xl font-bold text-slate-700">Something went wrong</p>
      <p className="text-slate-500 text-center max-w-md">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="border border-orange-500 text-orange-500 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}