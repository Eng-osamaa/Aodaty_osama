// src/components/catalog/ProductGrid.jsx

import ProductCard from "@/components/catalog/ProductCard";

export default function ProductGrid({ products, onOpenProduct }) {
  if (!products.length) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
        <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
          لا توجد نتائج
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          جرّب البحث باسم مختلف أو اختر قسمًا آخر.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpen={onOpenProduct}
        />
      ))}
    </div>
  );
}
