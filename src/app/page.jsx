// src/app/page.js
"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/catalog/HeroSection";
import SearchBar from "@/components/catalog/SearchBar";
import CategoryFilter from "@/components/catalog/CategoryFilter";
import ProductGrid from "@/components/catalog/ProductGrid";
import ProductModal from "@/components/catalog/ProductModal";
import SpecialsSection from "@/components/catalog/SpecialsSection";
import SectionContainer from "@/components/ui/SectionContainer";
import { useCatalog } from "@/hooks/useCatalog";

export default function HomePage() {
  const {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    selectedProduct,
    openProduct,
    closeProduct,
    filteredProducts,
    featuredProducts,
    resultsCount,
    categories,
  } = useCatalog();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-zinc-50/50 text-zinc-900 dark:bg-[#09090b] dark:text-white pt-24">

        <HeroSection />

        {/* Category Nav - Not Sticky */}
        <div className="py-6 sm:py-10">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        <section id="الأصناف" className="py-12">
          <SectionContainer className="space-y-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <SearchBar query={query} setQuery={setQuery} />
            </div>

            <ProductGrid products={filteredProducts} onOpenProduct={openProduct} />
          </SectionContainer>
        </section>

        <SpecialsSection products={featuredProducts} onOpenProduct={openProduct} />
      </main>

      <Footer />

      <ProductModal product={selectedProduct} onClose={closeProduct} />
    </>
  );
}