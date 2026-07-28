// src/lib/filterProducts.js

import { ALL_CATEGORY } from "@/constants/categories";

// دالة تصفية المنتجات حسب نص البحث والقسم المختار
export function filterProducts(products, query = "", activeCategory = ALL_CATEGORY) {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      activeCategory === ALL_CATEGORY || product.category === activeCategory;

    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const searchableText = [
      product.name,
      product.description,
      product.category,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
