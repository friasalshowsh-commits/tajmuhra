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
      // Limit to exactly 6 featured products on the homepage view as requested
      result = PRODUCTS.slice(0, 6);
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
    if (activeSection === "home") return "المجموعة المختارة | Featured Products";
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
    <section id="shop-section" className="py-24 md:py-32 bg-[#FAF8F4] select-none font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <span 
              className="inline-flex items-center gap-2 bg-transparent border border-[#C5A46D]/30 text-[#C5A46D] text-[10px] font-serif font-light px-4 py-1 uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              <Sparkles size={10} className="text-[#C5A46D]" />
              <span>L'ÉLÉGANCE INTEMPORELLE</span>
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light text-[#111111] tracking-tight leading-snug">
            {sectionTitle}
          </h2>
          
          <p className="text-xs md:text-sm text-[#6E6256] font-light leading-relaxed max-w-xl mx-auto opacity-90">
            {sectionSubtitle}
          </p>
        </div>

        {/* Filter Tab Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 border-b border-brand-border pb-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <button
              id="filter-all-btn"
              onClick={() => onNavigate("all")}
              className={`px-6 py-3 text-[11px] uppercase tracking-widest font-light transition-all duration-300 cursor-pointer rounded-none ${
                activeSection === "all" || activeSection === "home"
                  ? "bg-[#111111] text-white"
                  : "bg-transparent text-[#6E6256] border border-[#FAF8F4] hover:text-[#111111] hover:border-brand-border"
              }`}
            >
              كل القطع ({PRODUCTS.length})
            </button>

            {CATEGORIES.map((cat) => (
              <button
                id={`filter-${cat.id}-btn`}
                key={cat.id}
                onClick={() => onNavigate(cat.id)}
                className={`px-6 py-3 text-[11px] uppercase tracking-widest font-light whitespace-nowrap transition-all duration-300 cursor-pointer rounded-none ${
                  activeSection === cat.id
                    ? "bg-[#111111] text-white"
                    : "bg-transparent text-[#6E6256] border border-[#FAF8F4] hover:text-[#111111] hover:border-brand-border"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Quick Stats / Actions */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs font-light text-brand-black">
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => onNavigate("all")}
                className="flex items-center gap-1.5 bg-transparent border border-brand-border text-brand-black px-4 py-2 hover:bg-neutral-50"
              >
                <span>إلغاء البحث</span>
                <X size={11} />
              </button>
            )}

            <button
              id="open-size-guide-sidebar-btn"
              onClick={onOpenSizeGuide}
              className="flex items-center gap-2 text-[#111111] bg-transparent border border-[#111111] px-5 py-2.5 hover:bg-brand-black hover:text-white cursor-pointer transition-all duration-350 tracking-wide rounded-none text-[11px]"
            >
              <SlidersHorizontal size={12} />
              <span>دليل المقاسات والقياس</span>
            </button>
          </div>
        </div>

        {/* Products Grid Stack */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-12 md:gap-y-16"
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
