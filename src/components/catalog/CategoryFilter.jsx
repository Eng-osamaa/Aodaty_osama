// src/components/catalog/CategoryFilter.jsx
"use client";

import { Sparkles, Coffee, CupSoda, Leaf, CakeSlice } from "lucide-react";

const icons = {
    Sparkles,
    Coffee,
    CupSoda,
    Leaf,
    CakeSlice,

};

export default function CategoryFilter({
    categories,
    activeCategory,
    setActiveCategory,
}) {
    return (
        <div className="w-full mx-auto">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
                {categories.map((category) => {
                    const isActive = activeCategory === category.value;
                    const Icon = icons[category.iconName] || Coffee;

                    return (
                        <button
                            key={category.value}
                            type="button"
                            onClick={() => setActiveCategory(category.value)}
                            className={`flex flex-col items-center justify-center gap-1.5 h-[4.5rem] w-[4.5rem] sm:h-[5rem] sm:w-[5rem] rounded-[1rem] transition-all duration-300 active:scale-95 border ${isActive
                                ? "bg-zinc-900 border-zinc-900 text-white shadow-md dark:bg-white dark:border-white dark:text-zinc-900"
                                : "bg-white border-zinc-200/60 text-zinc-500 shadow-sm hover:border-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400"
                                }`}
                        >
                            <Icon
                                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
                                strokeWidth={isActive ? 2.5 : 1.5}
                            />
                            <span className={`text-[10px] sm:text-[11px] tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`}>
                                {category.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
