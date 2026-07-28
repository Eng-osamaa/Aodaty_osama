// src/components/catalog/ProductModal.jsx
"use client";

import { useEffect } from "react";

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden z-10 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          ✕
        </button>
        <div className="aspect-square w-full bg-zinc-100 dark:bg-zinc-800">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <p className="text-sm font-bold text-amber-600 mb-1">{product.category}</p>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">{product.name}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{product.description}</p>
          <div className="flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-2xl font-black text-amber-600 dark:text-amber-500">${product.price}</span>
            <button onClick={onClose} className="px-6 py-3 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-full font-bold transition hover:opacity-90">
              إضافة للسلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
