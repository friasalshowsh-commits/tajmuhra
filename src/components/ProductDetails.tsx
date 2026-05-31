/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import { openWhatsApp } from "./WhatsAppButton";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Ruler,
  PhoneCall,
  Calendar,
  Truck,
  Maximize2,
  Eye,
  Heart,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, color: { name: string; hex: string }, size: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
  onViewProduct?: (p: Product) => void;
}

export default function ProductDetails({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
  onViewProduct,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: "أسود", hex: "#111111" });
  const [quantity, setQuantity] = useState(1);

  // Gallery and Zoom status
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [activeViewIndex, setActiveViewIndex] = useState(0);

  // Accordions status
  const [expandedSection, setExpandedSection] = useState<string | null>("fabric");

  // Local storage for Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Simulation of Dior-like couture macro-detailed closeups from the single premium image
  const alternateViews = [
    { label: "الإطلالة الرئيسية", scale: "scale-100", origin: "center center", tag: "Campaign Model" },
    { label: "تفاصيل حياكة الأكمام", scale: "scale-[1.8]", origin: "bottom left", tag: "Sleeves Focus" },
    { label: "الخلف والقصّة الهدلة", scale: "scale-[1.4]", origin: "top center", tag: "Back Silhouette" },
    { label: "الطرحة والملحقات واللمسات", scale: "scale-[2.1]", origin: "center right", tag: "Lace details" },
  ];

  // Store in Recently Viewed list
  useEffect(() => {
    if (!product) return;
    try {
      const key = "tajmuhra_recently_viewed";
      const stored = localStorage.getItem(key);
      let list: string[] = stored ? JSON.parse(stored) : [];
      
      // Filter out duplicate if exists and prepend current
      list = list.filter((id) => id !== product.id);
      list.unshift(product.id);
      
      // Limit to max 6 recently viewed
      list = list.slice(0, 6);
      localStorage.setItem(key, JSON.stringify(list));

      // Resolve items
      const resolved = list
        .filter((id) => id !== product.id) // Exclude current piece from recommendation list
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter(Boolean) as Product[];

      setRecentlyViewed(resolved);
    } catch (e) {
      console.error("Local storage error tracking recently viewed items:", e);
    }

    // Reset some states on product change
    setSelectedSize(product.sizes[0] || "M");
    setSelectedColor(product.colors[0] || { name: "أسود", hex: "#111111" });
    setQuantity(1);
    setActiveViewIndex(0);
    setIsZooming(false);
  }, [product.id]);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleInquiry = () => {
    const text = `مرحبًا تاج مُهرة، أرغب بطلب القطعة الفاخرة: [${product.name}] بمقاس: ${selectedSize} ولون: ${selectedColor.name}`;
    openWhatsApp(undefined, text);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
  };

  // Hover magnifier coordinates calculator
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Resolving Related Products ("You May Also Like") from the same category or brand list
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || PRODUCTS.indexOf(p) % 2 === PRODUCTS.indexOf(product) % 2)
  ).slice(0, 4);

  return (
    <div className="bg-[#FAF8F4] py-16 md:py-24 select-none font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Back navigation control */}
        <div className="flex items-center justify-between mb-16 pb-6 border-b border-[#E7E2DA]">
          <button
            id="back-to-shop-btn"
            onClick={onClose}
            className="group flex items-center gap-2 text-[#111111] hover:text-[#C5A46D] transition-all duration-300 cursor-pointer text-xs uppercase tracking-[0.2em] font-light"
          >
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            <span>العودة إلى صالة المجموعات</span>
          </button>

          <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E6256] font-light self-center">
            {product.category}
          </span>
        </div>

        {/* ----------------- CORE EXCLUSIVE GRID ----------------- */}
        {/* Apple/Dior split screen layout with extreme white space and gorgeous padding */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start pb-24 border-b border-[#E7E2DA]">
          
          {/* LEFT COLUMN: GIGANTIC COUTURE PREVIEWS & INTERACTIVE GALLERY VIEWPORTS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Very large primary image viewer with dynamic micro-textured cursor scanner */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              className="relative aspect-[3/4.2] w-full bg-white border border-[#E7E2DA] p-2 overflow-hidden cursor-crosshair group shadow-sm"
            >
              {/* Luxury gold couture guidelines frame */}
              <div className="absolute inset-4 border border-[#C5A46D]/15 pointer-events-none z-10 group-hover:border-[#C5A46D]/30 transition-colors duration-500" />
              
              {/* Overlay indicating interactive zoom feature */}
              <div className="absolute top-6 left-6 z-20 bg-black/85 backdrop-blur-sm text-white px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] font-light transition-opacity duration-300 pointer-events-none flex items-center gap-1.5">
                <Maximize2 size={9} className="text-[#C5A46D]" />
                <span>مرري الماوس للتكبير المجهري للنسيج</span>
              </div>

              {/* Angle Tag indicator */}
              <div className="absolute bottom-6 left-6 z-20 bg-[#FAF8F4] text-[#111111] border border-[#E7E2DA]/65 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.15em] font-light font-sans">
                {alternateViews[activeViewIndex].tag}
              </div>

              {/* Master Image Scaler with smooth transition alignment */}
              <div className="w-full h-full overflow-hidden">
                <motion.img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[8%] group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                  style={{
                    transformOrigin: isZooming 
                      ? `${zoomPos.x}% ${zoomPos.y}%` 
                      : alternateViews[activeViewIndex].origin,
                    transform: isZooming 
                      ? "scale(2.2)" 
                      : `scale(1) ${alternateViews[activeViewIndex].scale.replace("scale-", "") === "100" ? "" : alternateViews[activeViewIndex].scale}`,
                    transition: isZooming ? "none" : "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
                  }}
                />
              </div>
            </div>

            {/* Micro details thumbnail strip */}
            <div className="grid grid-cols-4 gap-4 pt-2">
              {alternateViews.map((view, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveViewIndex(idx)}
                  className={`relative aspect-[3/4] border transition-all duration-500 overflow-hidden cursor-pointer p-1.5 bg-white ${
                    activeViewIndex === idx
                      ? "border-[#C5A46D] shadow-sm"
                      : "border-[#E7E2DA] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={product.imageUrl}
                    alt={view.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[10%]"
                    style={{
                      transformOrigin: view.origin,
                      transform: view.scale,
                    }}
                  />
                  
                  {/* Subtle caption bottom */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1 text-center text-[7px] text-white font-light tracking-wide truncate">
                    {view.label}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center pt-2 text-[#6E6256] text-[10px] tracking-widest uppercase font-light">
              تصاميم مخصصة تحافظ على الهوية والوقار الكلاسيكي للدار
            </div>

          </div>

          {/* RIGHT COLUMN: PRECISE LITERALLY COMPOSING PRODUCT SPEC DETAILS */}
          <div className="lg:col-span-5 space-y-10 text-right">
            
            {/* 1. Name (اسم القطعة) */}
            <div className="space-y-4">
              <span 
                className="font-serif text-[11px] tracking-[0.25em] text-[#C5A46D] uppercase block font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {product.nameEn}
              </span>
              <h1 className="text-3xl md:text-4.5xl font-light text-[#111111] leading-snug tracking-tight font-sans">
                {product.name}
              </h1>
              
              <div className="w-12 h-[1px] bg-[#C5A46D] mt-2" />
            </div>

            {/* 2. Price (السعر) */}
            <div className="bg-[#FAF8F4] border-y border-[#E7E2DA]/60 py-5 flex items-baseline gap-3.5 justify-start">
              <span 
                className="text-3xl md:text-4xl font-serif text-[#111111] font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {product.price} {product.unit}
              </span>
              <span className="text-xs text-[#C5A46D] pr-2 font-light font-sans tracking-widest uppercase">
                شامل الضريبة المضافة لجميع خدمات الطلبات
              </span>
            </div>

            {/* 3. Sizes Selection (المقاسات) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-light tracking-wide text-[#6E6256]">
                <span className="uppercase text-[#111111] font-medium tracking-widest">اختيار مقاسكِ الملائم:</span>
                <button
                  id="guide-trigger-btn-details"
                  onClick={onOpenSizeGuide}
                  className="flex items-center gap-1.5 text-[#C5A46D] hover:text-[#111111] transition-colors cursor-pointer text-xs border-b border-[#C5A46D] pb-0.5"
                >
                  <Ruler size={11} />
                  <span>دليل القياسات والمقاسات السعودية</span>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    id={`details-size-btn-${size}`}
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-xs font-light flex items-center justify-center border transition-all duration-300 cursor-pointer rounded-none ${
                      selectedSize === size
                        ? "bg-[#111111] text-[#FAF8F4] border-[#111111] scale-102"
                        : "bg-white text-[#6E6256] border-[#E7E2DA] hover:border-[#C5A46D] hover:text-[#111111]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Swatch Color Alignment */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-light">
                <span className="uppercase text-[#111111] font-medium tracking-widest">الألوان والنقوش المتوفرة:</span>
                <span className="text-[#C5A46D] font-mono text-[11px]">{selectedColor.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    id={`details-color-swatch-${color.name}`}
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2.5 px-4.5 py-2.5 bg-white border text-[11px] font-light cursor-pointer transition-all duration-300 rounded-none ${
                      selectedColor.name === color.name
                        ? "border-[#C5A46D] text-[#111111] font-medium"
                        : "border-[#E7E2DA] text-[#6E6256] hover:border-[#C5A46D]/60"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 border border-neutral-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Sizing quantity and Order Buttons (زر الطلب) */}
            <div className="space-y-5 pt-4">
              <span className="text-xs font-light uppercase tracking-widest text-[#111111] block">الكمية المطلوبة للقطعة:</span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                
                {/* Quantity adjuster */}
                <div className="flex items-center justify-between border border-[#E7E2DA] bg-white w-32 px-3.5 py-3.5 rounded-none">
                  <button
                    id="quantity-decrease-btn"
                    onClick={handleDecrement}
                    className="p-1 text-[#6E6256] hover:text-[#111111] cursor-pointer"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="text-xs font-light w-8 text-center">{quantity}</span>
                  <button
                    id="quantity-increase-btn"
                    onClick={handleIncrement}
                    className="p-1 text-[#6E6256] hover:text-[#111111] cursor-pointer"
                  >
                    <Plus size={11} />
                  </button>
                </div>

                {/* Submitting Checkout Action Blocks */}
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {/* Shopping cart */}
                  <button
                    id="details-add-to-cart-btn"
                    onClick={handleAdd}
                    className="flex justify-center items-center gap-2.5 bg-[#111111] hover:bg-neutral-800 text-white px-6 py-4 text-xs font-light transition-all duration-350 cursor-pointer uppercase tracking-[0.18em] rounded-none shadow-sm"
                  >
                    <ShoppingBag size={13} className="text-[#C5A46D]" />
                    <span>إضافة للحقيبة</span>
                  </button>

                  {/* Direct checkout via WhatsApp */}
                  <button
                    id="details-whatsapp-buy-btn"
                    onClick={handleInquiry}
                    className="flex justify-center items-center gap-2.5 bg-transparent text-[#111111] border border-[#E7E2DA] hover:bg-[#111111] hover:text-[#FAF8F4] hover:border-[#111111] px-6 py-4 text-xs font-light transition-all duration-350 cursor-pointer uppercase tracking-[0.18em] rounded-none"
                  >
                    <PhoneCall size={12} className="text-[#C5A46D]" />
                    <span>طلب فوري واتساب</span>
                  </button>
                </div>

              </div>
            </div>

            {/* 5. Description (الوصف) */}
            <div className="space-y-3 pt-6 border-t border-[#E7E2DA]/65">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#111111]">مفهوم التصميم والمظهر</h3>
              <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-sans font-light">
                {product.longDescription}
              </p>
            </div>

            {/* 6, 7, 8. Fabric, Care & Shipping Accordions (الخامة والعناية والشحن) */}
            <div className="border-t border-[#E7E2DA] pt-2 divide-y divide-[#E7E2DA]">
              
              {/* Fabric Specs (الخامة) */}
              <div className="py-3">
                <button
                  id="accordion-fabric-trigger"
                  onClick={() => toggleSection("fabric")}
                  className="w-full flex items-center justify-between p-2 text-right hover:bg-[#FAF8F4] transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-sans font-light text-xs md:text-sm text-[#111111]">
                    <Sparkles size={11} className="text-[#C5A46D]" />
                    <span>مكونات وتفاصيل الخامة والنسيج</span>
                  </span>
                  {expandedSection === "fabric" ? <ChevronUp size={13} className="text-[#6E6256]" /> : <ChevronDown size={13} className="text-[#6E6256]" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === "fabric" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="p-4 bg-white/40 text-xs md:text-sm text-[#6E6256] space-y-2.5 font-sans font-light list-disc list-inside">
                        {product.fabricDetails.map((det, index) => (
                          <li key={index} className="leading-relaxed">
                            {det}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Care Instructions (العناية) */}
              <div className="py-3">
                <button
                  id="accordion-care-trigger"
                  onClick={() => toggleSection("care")}
                  className="w-full flex items-center justify-between p-2 text-right hover:bg-[#FAF8F4] transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-sans font-light text-xs md:text-sm text-[#111111]">
                    <Calendar size={11} className="text-[#C5A46D]" />
                    <span>طريقة الغسيل والعناية بالعباءة</span>
                  </span>
                  {expandedSection === "care" ? <ChevronUp size={13} className="text-[#6E6256]" /> : <ChevronDown size={13} className="text-[#6E6256]" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === "care" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="p-4 bg-white/40 text-xs md:text-sm text-[#6E6256] space-y-2.5 font-sans font-light list-disc list-inside">
                        {product.careInstructions.map((ins, index) => (
                          <li key={index} className="leading-relaxed">
                            {ins}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping Instructions (الشحن) */}
              <div className="py-3">
                <button
                  id="accordion-shipping-trigger"
                  onClick={() => toggleSection("shipping")}
                  className="w-full flex items-center justify-between p-2 text-right hover:bg-[#FAF8F4] transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-sans font-light text-xs md:text-sm text-[#111111]">
                    <Truck size={11} className="text-[#C5A46D]" />
                    <span>خدمات التوصيل والشحن وسياسة الاستبدال</span>
                  </span>
                  {expandedSection === "shipping" ? <ChevronUp size={13} className="text-[#6E6256]" /> : <ChevronDown size={13} className="text-[#6E6256]" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === "shipping" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="p-4 bg-white/40 text-xs md:text-sm text-[#6E6256] space-y-2.5 font-sans font-light list-disc list-inside">
                        {product.shippingDetails.map((ship, index) => (
                          <li key={index} className="leading-relaxed">
                            {ship}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>

        {/* ----------------- YOU MAY ALSO LIKE SECTION ----------------- */}
        <section className="py-20 select-none text-right space-y-10 border-b border-[#E7E2DA]/50">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <span 
              className="text-[#C5A46D] text-[10px] uppercase tracking-[0.22em] font-serif font-light block"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              TAJMUHRA SELECTIONS
            </span>
            <div className="space-y-1.5 md:text-right">
              <h2 className="text-2xl md:text-3.5xl font-light text-[#111111] tracking-tight">
                You May Also Like • قد ينال إعجابكِ أيضاً
              </h2>
              <p className="text-xs text-[#6E6256] font-light leading-relaxed">
                عباءات وأثواب منسوجة ببراعة تكمّل مجموعتك المظهرية الفاخرة للدار.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => onViewProduct && onViewProduct(p)}
                className="group cursor-pointer space-y-4 text-right bg-[#FAF8F4] border border-[#E7E2DA]/50 p-2 hover:border-[#C5A46D] transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden p-1 bg-[#FAF8F4]">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[8%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
                  />
                  <div className="absolute inset-2 border border-[#C5A46D]/10 pointer-events-none" />
                </div>
                <div className="px-1 space-y-2">
                  <span className="text-[9px] uppercase tracking-widest text-[#C5A46D] block font-light">
                    {p.nameEn.split(" ")[0]}
                  </span>
                  <h3 className="text-sm font-light text-[#111111] group-hover:text-[#C5A46D] transition-colors duration-200 truncate">
                    {p.name}
                  </h3>
                  <p 
                    className="text-xs text-[#111111] font-serif" 
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {p.price} ر.س
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------- RECENTLY VIEWED SECTION ----------------- */}
        {recentlyViewed.length > 0 && (
          <section className="py-20 select-none text-right space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <span 
                className="text-[#C5A46D] text-[10px] uppercase tracking-[0.22em] font-serif font-light block"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                YOUR SESSION LOGS
              </span>
              <div className="space-y-1.5 md:text-right">
                <h2 className="text-2xl md:text-3.5xl font-light text-[#111111] tracking-tight">
                  Recently Viewed • قطع شاهدتها مؤخراً
                </h2>
                <p className="text-xs text-[#6E6256] font-light leading-relaxed">
                  تصفّحي القطع والمطرزات التي نالت اهتمامكِ من قبل للوصول السريع ومقارنة القياسات.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {recentlyViewed.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => onViewProduct && onViewProduct(p)}
                  className="group cursor-pointer space-y-3 text-right bg-[#FAF8F4] border border-[#E7E2DA]/40 p-1.5 hover:border-neutral-400 transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-white">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>
                  <div className="px-1 space-y-1">
                    <h3 className="text-xs font-light text-[#111111] truncate">
                      {p.name}
                    </h3>
                    <p 
                      className="text-xs text-[#6E6256] font-serif"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {p.price} ر.س
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Sticky Bottom buying bar on Mobile screens */}
      <div className="fixed bottom-0 inset-x-0 bg-[#FAF8F4]/98 backdrop-blur-md border-t border-[#E7E2DA] p-4 z-30 lg:hidden flex items-center justify-between gap-4 font-sans max-w-full">
        <div className="text-right">
          <span className="block text-[9px] text-[#6E6256]">السعر الإجمالي</span>
          <span 
            className="block font-serif text-base text-[#111111] leading-tight" 
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {product.price * quantity} ر.س
          </span>
        </div>
        
        <div className="flex items-center gap-2 flex-1 justify-end max-w-[70%]">
          {/* Quick Add To cart */}
          <button
            id="mobile-sticky-add-cart-btn"
            onClick={handleAdd}
            className="flex-1 bg-[#111111] hover:bg-neutral-800 text-white py-3 px-2 rounded-none text-xs font-light flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider h-11"
          >
            <ShoppingBag size={12} />
            <span>الحقيبة</span>
          </button>

          {/* Direct WhatsApp check */}
          <button
            id="mobile-sticky-whatsapp-btn"
            onClick={handleInquiry}
            className="flex-1 bg-transparent text-[#6E6256] border border-[#E7E2DA] hover:bg-[#111111] hover:text-[#FAF8F4] py-3 px-2 rounded-none text-xs font-light flex items-center justify-center gap-1.5 font-sans cursor-pointer h-11"
          >
            <PhoneCall size={12} className="text-[#C5A46D]" />
            <span>طلب فوري</span>
          </button>
        </div>
      </div>
    </div>
  );
}
