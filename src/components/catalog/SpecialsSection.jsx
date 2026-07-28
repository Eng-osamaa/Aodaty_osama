// src/components/catalog/SpecialsSection.jsx
"use client";

import SectionContainer from "@/components/ui/SectionContainer";

export default function SpecialsSection({ products, onOpenProduct }) {
  if (!products.length) return null;

  return (
    <section id="المختارات" className="py-16 bg-zinc-50 dark:bg-zinc-950/50">
      <SectionContainer>
        <div className="mb-10 flex flex-col items-center text-center gap-3">
          <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-500/10 dark:text-amber-400">
            ✨ مختارات الكافيه
          </span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            مُصممة خصيصاً لك
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {products.slice(0, 4).map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onOpenProduct(product)}
              className="group relative flex flex-col text-right overflow-hidden rounded-[1.25rem] bg-white transition-transform active:scale-[0.97] shadow-sm hover:shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-x-2 bottom-2 p-3 sm:p-4 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-sm border border-white/50 dark:border-zinc-700/50">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-500">
                      ${product.price}
                    </span>
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform duration-300 group-hover:rotate-90 group-hover:bg-amber-600 dark:bg-white dark:text-zinc-900 dark:group-hover:bg-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
