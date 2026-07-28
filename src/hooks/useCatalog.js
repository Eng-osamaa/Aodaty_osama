// src/hooks/useCatalog.js
"use client";

import { useCallback, useMemo, useState } from "react";
import { products } from "@/data/products";
import { categories, ALL_CATEGORY } from "@/constants/categories";
import { filterProducts } from "@/lib/filterProducts";

// هذا الـ hook يجمع منطق البحث والفلترة واختيار المنتج
export function useCatalog() {
  // قيمة البحث المكتوبة في الحقل
  const [query, setQuery] = useState("");

  // القسم النشط الحالي
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  // المنتج المحدد لعرضه داخل النافذة المنبثقة
  const [selectedProduct, setSelectedProduct] = useState(null);

  // المنتجات الناتجة بعد تطبيق الفلاتر
  const filteredProducts = useMemo(() => {
    return filterProducts(products, query, activeCategory);
  }, [query, activeCategory]);

  // المنتجات المميزة
  const featuredProducts = useMemo(() => {
    return products.filter((product) => product.isFeatured);
  }, []);

  // المنتجات الشائعة
  const popularProducts = useMemo(() => {
    return products.filter((product) => product.isPopular);
  }, []);

  // عدد النتائج الحالية
  const resultsCount = filteredProducts.length;

  // فتح تفاصيل منتج
  const openProduct = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  // إغلاق النافذة المنبثقة
  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // إعادة تعيين البحث والفلاتر للوضع الافتراضي
  const resetFilters = useCallback(() => {
    setQuery("");
    setActiveCategory(ALL_CATEGORY);
  }, []);

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    selectedProduct,
    openProduct,
    closeProduct,
    resetFilters,
    filteredProducts,
    featuredProducts,
    popularProducts,
    resultsCount,
    categories,
  };
}
