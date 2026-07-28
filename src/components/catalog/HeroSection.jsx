// src/components/catalog/HeroSection.jsx

import SectionContainer from "@/components/ui/SectionContainer";

export default function HeroSection() {
  return (
    <section id="الرئيسية" className="relative pt-8 pb-12 overflow-hidden">
      <SectionContainer className="flex flex-col items-center text-center">
        <div className="mb-8 space-y-4">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-zinc-900 dark:text-white">
            <span className="font-serif italic font-light text-amber-600 dark:text-amber-500 pr-2">Velvet</span>
            Café
          </h1>
          <p className="max-w-md mx-auto text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            القهوة ليست مجرد مشروب، بل هي تجربة فاخرة ولحظة هدوء تستحقها كل يوم.
          </p>
        </div>

        <div className="w-full max-w-5xl aspect-video sm:h-[55vh] sm:aspect-auto rounded-[2.5rem] overflow-hidden relative shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1600&auto=format&fit=crop"
            alt="أجواء الكافيه"
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <a
              href="#الأصناف"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-8 text-sm font-bold text-white transition hover:bg-white/30 active:scale-95 shadow-lg"
            >
              تصفح القائمة
            </a>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}