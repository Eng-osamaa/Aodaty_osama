// src/components/ui/ThemeToggle.jsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const savedTheme = document.documentElement.getAttribute("data-theme");

    if (savedTheme) {
      setTheme(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = prefersDark ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", nextTheme);
    setTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    setTheme(nextTheme);
  };

  if (!isMounted) {
    return (
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
        aria-label="تبديل الثيم"
      >
        •
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-lg text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
