/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from "react";
import { Product } from "../types";
import { PRODUCTS, CATEGORIES } from "../data";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, Sparkles, Filter, X } from "lucide-react";

interface ProductGridProps {
  activeSection: string;
  searchQuery: string;
  onNavigate: (section: string) => void;
  onAddToCart: (product: Product, color: { name: string; hex: string }, size: string) => void;
  onViewDetails: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export default function ProductGrid({
  activeSection,
  searchQuery,
  onNavigate,
  onAddToCart,
  onViewDetails,
  onOpenSizeGuide,
}: ProductGridProps) {
  
  // Custom Filters mapping
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Filter by Section/Category
    if (activeSection === "abayas") {
      result = result.filter((p) => p.name.includes("عباءة") || p.category.includes("عباءات"));
    } else if (activeSection === "colors") {
      // "الألوان الهادئة" - calm soft tones like white, pale slate grey, navy
      result = result.filter((p) => 
        p.colors.some((c) => ["#8E8D8A", "#FAF7F2", "#F3F4F6", "#0B1F3A", "#A89F91"].includes(c.hex))
      );
    } else if (activeSection === "offers") {
      // "العروض" - products that are listed with highly attractive prices (e.g. 100 SAR)
      result = result.filter((p) => p.price <= 100);
    } else if (activeSection.startsWith("cat_")) {
      // Specific clicked category from homepage cards
      const catObj = CATEGORIES.find((c) => c.id === activeSection);
      if (catObj) {
        result = result.filter((p) => p.category === catObj.name);
      }
    } else if (activeSection === "home") {
      // By default home shows all selection, but we can limit or show the featured ones
      result = [...PRODUCTS];
    } else if (activeSection === "all") {
      result = [...PRODUCTS];
    }

    // 2. Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameEn.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeSection, searchQuery]);

  // Section heading and text
  const sectionTitle = useMemo(() => {
    if (searchQuery.trim()) return "نتائج البحث الخاص بكِ";
    if (activeSection === "abayas") return "مجموعة العباءات الفاخرة";
    if (activeSection === "colors") return "الألوان الهادئة والطبيعية";
    if (activeSection === "offers") return "العروض والأسعار المخفضة";
    if (activeSection.startsWith("cat_")) {
      const cat = CATEGORIES.find((c) => c.id === activeSection);
      return cat ? cat.name : "مختارات تاج مُهرة";
    }
    return "مختارات تاج مُهرة";
  }, [activeSection, searchQuery]);

  const sectionSubtitle = useMemo(() => {
    if (searchQuery.trim()) return `عثرنا على ${filteredProducts.length} تصاميم تتناسب مع بحثكِ.`;
    if (activeSection === "abayas") return "قصات وتفاصيل كلاسيكية معززة بجمال الدانتيل والشغل اليدوي المتقن.";
    if (activeSection === "colors") return "درجات ترابية ورمادية ناعمة مريحة للعين وتليق بإشراقة الصباح.";
    if (activeSection === "offers") return "قطع مميزة بأسعار تبدأ من ١٠٠ ريال فقط لحضور مميز ومريح.";
    if (activeSection.startsWith("cat_")) {
      const cat = CATEGORIES.find((c) => c.id === activeSection);
      return cat ? cat.description : "قطع مختارة بعناية للعباءات والجلابيات الكلاسيكية واليومية.";
    }
    return "قطع مختارة بعناية فائقة، بتصاميم ناعمة وخامات وارفة مريحة تليق بحضورك الأنيق.";
  }, [activeSection, searchQuery, filteredProducts.length]);

  return (
    <section id="shop-section" className="py-16 bg-brand-bg select-none font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 bg-transparent border border-brand-gold/25 text-brand-gold text-[9px] font-sans font-bold px-3 py-1 uppercase tracking-[0.2em]">
              <Sparkles size={11} />
              <span>أناقة تاج مُهرة الأصيلة</span>
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-light text-brand-black tracking-tight leading-tight">
            {sectionTitle}
          </h2>
          
          <p className="text-sm text-[#9A8F86] font-light leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Filter Tab Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              id="filter-all-btn"
              onClick={() => onNavigate("all")}
              className={`px-5 py-2.5 text-xs font-medium cursor-pointer transition-colors duration-200 ${
                activeSection === "all" || activeSection === "home"
                  ? "bg-brand-black text-white"
                  : "bg-white text-brand-black border border-brand-border hover:bg-neutral-50"
              }`}
            >
              كل التصاميم ({PRODUCTS.length})
            </button>

            {CATEGORIES.map((cat) => (
              <button
                id={`filter-${cat.id}-btn`}
                key={cat.id}
                onClick={() => onNavigate(cat.id)}
                className={`px-5 py-2.5 text-xs font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                  activeSection === cat.id
                    ? "bg-brand-black text-white"
                    : "bg-white text-brand-black border border-brand-border hover:bg-neutral-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Quick Stats / Actions */}
          <div className="flex items-center gap-4 text-xs font-medium text-brand-black">
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => onNavigate("all")}
                className="flex items-center gap-1 bg-white border border-brand-border text-brand-black px-3 py-1.5 hover:bg-neutral-50"
              >
                <span>إلغاء البحث</span>
                <X size={12} />
              </button>
            )}

            <button
              id="open-size-guide-sidebar-btn"
              onClick={onOpenSizeGuide}
              className="flex items-center gap-2 text-brand-black bg-white border border-brand-border px-4 py-2 hover:bg-neutral-50 cursor-pointer hover:text-brand-gold transition-colors duration-200"
            >
              <SlidersHorizontal size={13} />
              <span>جدول المقاسات الفاخرة</span>
            </button>
          </div>
        </div>

        {/* Products Grid Stack */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                   key={product.id}
                   product={product}
                   onAddToCart={onAddToCart}
                   onViewDetails={onViewDetails}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center py-20 bg-white border border-brand-border p-8 space-y-4 max-w-md mx-auto"
            >
              <div className="bg-[#F8F6F1] w-14 h-14 border border-brand-border flex items-center justify-center mx-auto text-brand-gold">
                <Filter size={20} />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-black">لم نجد أي قطع مطابقة للمرشحات</h3>
              <p className="text-xs text-[#9A8F86] leading-relaxed">
                قومي بتعديل أو تصفية تصنيفات البحث، أو استكشفي مراجعة كل المنتجات الفاخرة المتوفرة لدينا حالياً. يمكنك تصفح العباءة السوداء أو الجلابية دائمًا.
              </p>
              <button
                id="reset-filters-btn"
                onClick={() => onNavigate("all")}
                className="bg-brand-black text-white text-xs px-6 py-3 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                شاهدي كل المنتجات
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
