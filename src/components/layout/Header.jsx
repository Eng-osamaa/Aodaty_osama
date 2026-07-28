// src/components/layout/Header.jsx

import SectionContainer from "@/components/ui/SectionContainer";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-4 left-0 right-0 z-40 mx-4 lg:mx-auto max-w-7xl">
      <div className="flex min-h-16 items-center justify-between gap-4 rounded-full border border-white/20 bg-white/70 px-6 backdrop-blur-xl shadow-lg shadow-black/5 dark:border-white/10 dark:bg-zinc-900/70 dark:shadow-black/20">
        <a
          href="#الرئيسية"
          className="text-xl font-black tracking-wide text-zinc-900 dark:text-white flex items-center gap-2"
        >
          <span className="text-amber-600 dark:text-amber-500">☕</span> Velvet
        </a>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
