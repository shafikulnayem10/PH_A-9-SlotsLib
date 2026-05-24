"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="p-2 rounded-xl border border-slate-200 hover:border-orange-400 hover:bg-orange-50 dark:border-slate-700 dark:hover:border-orange-500 dark:hover:bg-orange-900/20 transition-all duration-200 text-slate-600 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
};