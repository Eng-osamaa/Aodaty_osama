// src/components/catalog/ProductCard.jsx
"use client";

import { Plus } from "lucide-react";

export default function ProductCard({ product, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className="group relative flex flex-col text-right w-full overflow-hidden rounded-[1.25rem] bg-white border border-zinc-200/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 active:scale-[0.97]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.isFeatured && (
            <span className="rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold text-zinc-900 shadow-sm backdrop-blur-md dark:bg-zinc-900/90 dark:text-white">
              ⭐ مميز
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="mb-1">
          <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mb-0.5 line-clamp-1">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-[10px] sm:text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 hidden sm:block">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-sm sm:text-base font-black text-zinc-900 dark:text-white">
            ${product.price}
          </span>
          
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform duration-300 group-hover:rotate-90 group-hover:bg-amber-600 dark:bg-white dark:text-zinc-900 dark:group-hover:bg-amber-500">
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    </button>
  );
}
