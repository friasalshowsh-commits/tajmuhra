/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Product } from "../types";
import { openWhatsApp } from "./WhatsAppButton";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Truck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Ruler,
  PhoneCall,
  Calendar,
} from "lucide-react";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, color: { name: string; hex: string }, size: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export default function ProductDetails({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: "أسود", hex: "#111111" });
  const [quantity, setQuantity] = useState(1);

  // Accordion Toggles
  const [expandedSection, setExpandedSection] = useState<string | null>("fabric");

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleInquiry = () => {
    const text = `مرحبًا تاج مُهرة، أرغب بطلب القطعة: [${product.name}] بمقاس: ${selectedSize} ولون: ${selectedColor.name}`;
    openWhatsApp(undefined, text);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
  };

  return (
    <div className="bg-brand-bg py-10 border-b border-brand-border select-none font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Back control */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border/60">
          <button
            id="back-to-shop-btn"
            onClick={onClose}
            className="flex items-center gap-2 text-brand-black hover:text-brand-gold font-medium transition-colors duration-200 cursor-pointer text-sm"
          >
            <span>عُودة إلى كل المنتجات</span>
            <span className="font-serif">←</span>
          </button>

          <span className="text-xs text-[#9A8F86]">
            تصنيف المنتج: <strong className="text-brand-black font-medium">{product.category}</strong>
          </span>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Right Column: Premium Product Image Gallery (RTL: right Column) */}
          <div className="lg:col-span-6 space-y-4">
            <motion.div
              id={`details-image-container-${product.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] bg-[#F8F6F1] border border-brand-border p-1 group overflow-hidden"
            >
              {/* Gold visual overlay banner */}
              <div className="absolute inset-2 border border-brand-gold/10 pointer-events-none z-10" />

              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              <span className="absolute bottom-6 right-6 bg-brand-black text-white text-[9px] uppercase tracking-widest px-3 py-1 border border-white/10">
                خامات معتمدة وتفاصيل يدوية
              </span>
            </motion.div>

            {/* Micro thumbnail strip */}
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-[3/4] border border-brand-gold p-1 bg-white overflow-hidden cursor-pointer">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] border border-brand-border p-1 bg-white/40 opacity-60 hover:opacity-100 transition-opacity overflow-hidden cursor-pointer flex items-center justify-center">
                <span className="text-[10px] text-brand-taupe font-medium text-center">تفاصيل الأكمام</span>
              </div>
              <div className="aspect-[3/4] border border-brand-border p-1 bg-white/40 opacity-60 hover:opacity-100 transition-opacity overflow-hidden cursor-pointer flex items-center justify-center">
                <span className="text-[10px] text-brand-taupe font-medium text-center">الخلف والقصّة</span>
              </div>
              <div className="aspect-[3/4] border border-brand-border p-1 bg-white/40 opacity-60 hover:opacity-100 transition-opacity override overflow-hidden cursor-pointer flex items-center justify-center">
                <span className="text-[10px] text-brand-taupe font-medium text-center">الطرحة والملحقات</span>
              </div>
            </div>
          </div>

          {/* Left Column: Product Info & Selectors (RTL: left Column) */}
          <div className="lg:col-span-6 space-y-8 text-right">
            
            {/* Title Block */}
            <div className="space-y-2">
              <span className="font-serif text-[10px] tracking-widest text-brand-gold font-bold uppercase block">
                {product.nameEn}
              </span>
              <h1 className="text-2xl md:text-3xl font-light text-brand-black leading-normal tracking-tight font-sans">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 justify-start pt-1">
                <span className="text-2xl md:text-3xl font-serif font-bold text-brand-black" style={{ fontFamily: "Georgia, serif" }}>
                  {product.price} ر.س
                </span>
                <span className="text-xs text-brand-gold pr-1 font-sans">
                  {product.unit} شامل الضريبة ومجاني الطرحة
                </span>
              </div>
            </div>

            {/* Sizing & Core Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-black">نبذة الأناقة والمظهر</h3>
              <p className="text-sm text-[#9A8F86] leading-relaxed font-sans font-light">
                {product.longDescription}
              </p>
            </div>

            {/* Swatch Selectors */}
            <div className="space-y-4 pt-4 border-t border-brand-border/60">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-black">الألوان المتوفرة:</span>
                <span className="text-xs text-brand-gold font-medium">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    id={`details-color-swatch-${color.name}`}
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-4 py-2 bg-white border text-xs font-medium cursor-pointer transition-all duration-200 ${
                      selectedColor.name === color.name
                        ? "border-brand-gold font-bold"
                        : "border-brand-border hover:border-brand-gold"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 border border-black/10 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Selectors */}
            <div className="space-y-4 pt-4 border-t border-brand-border/60">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-black">اختيار مقاسكِ الملائم:</span>
                <button
                  id="guide-trigger-btn-details"
                  onClick={onOpenSizeGuide}
                  className="flex items-center gap-1.5 text-xs text-brand-gold font-semibold hover:text-brand-black transition-colors cursor-pointerSB"
                >
                  <Ruler size={13} />
                  <span>دليل المقاسات والقياسات الرسمية</span>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    id={`details-size-btn-${size}`}
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 text-xs font-medium flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? "bg-brand-black text-[#FFF] border-brand-black scale-102"
                        : "bg-white text-brand-black border-brand-border hover:bg-neutral-50 hover:border-brand-gold"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Quantity and Checkout Actions */}
            <div className="space-y-4 pt-4 border-t border-brand-border/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-black block">الكمية:</span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity adjuster */}
                <div className="flex items-center justify-between border border-brand-border bg-white w-32 px-2 py-2">
                  <button
                    id="quantity-decrease-btn"
                    onClick={handleDecrement}
                    className="p-1 text-brand-taupe hover:text-brand-black cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="font-medium text-sm w-8 text-center">{quantity}</span>
                  <button
                    id="quantity-increase-btn"
                    onClick={handleIncrement}
                    className="p-1 text-brand-taupe hover:text-brand-black cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Submitting Actions */}
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {/* Shopping cart */}
                  <button
                    id="details-add-to-cart-btn"
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 bg-brand-black hover:bg-brand-navy text-[#FFF] px-6 py-3.5 text-xs font-medium transition-all duration-300 scale-100 active:scale-98 cursor-pointer uppercase tracking-wider"
                  >
                    <ShoppingBag size={14} />
                    <span>إضافة إلى الحقيبة</span>
                  </button>

                  {/* Direct checkout via WhatsApp */}
                  <button
                    id="details-whatsapp-buy-btn"
                    onClick={handleInquiry}
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#FFF] px-6 py-3.5 text-xs font-medium transition-all duration-300 scale-100 active:scale-98 font-sans cursor-pointer tracking-wider"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.584 3.914 1.517 5.514l-.947 3.46 3.568-.937z" />
                    </svg>
                    <span>شراء عبر واتساب</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Accordion List details (Clean Minimalism split grid) */}
            <div className="border-t border-b border-brand-border mt-8 bg-transparent divide-y divide-brand-border">
              {/* Product Sizing Details */}
              <div className="py-2">
                <button
                  id="accordion-fabric-trigger"
                  onClick={() => toggleSection("fabric")}
                  className="w-full flex items-center justify-between p-3 text-right text-xs md:text-sm font-semibold text-brand-black hover:bg-neutral-50 transition-colors"
                >
                  <span className="flex items-center gap-2 font-sans font-medium text-xs md:text-sm text-brand-black">
                    <Sparkles size={12} className="text-brand-gold" />
                    تفاصيل ومكونات المنتج
                  </span>
                  {expandedSection === "fabric" ? <ChevronUp size={14} className="text-[#9A8F86]" /> : <ChevronDown size={14} className="text-[#9A8F86]" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === "fabric" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="p-4 bg-[#F8F6F1]/40 text-xs md:text-sm text-[#9A8F86] space-y-2 font-sans font-light list-disc list-inside">
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

              {/* Fabric care instructions */}
              <div className="py-2">
                <button
                  id="accordion-care-trigger"
                  onClick={() => toggleSection("care")}
                  className="w-full flex items-center justify-between p-3 text-right text-xs md:text-sm font-semibold text-brand-black hover:bg-neutral-50 transition-colors"
                >
                  <span className="flex items-center gap-2 font-sans font-medium text-xs md:text-sm text-brand-black">
                    <Calendar size={12} className="text-brand-gold" />
                    طريقة الغسيل والعناية بالقماش
                  </span>
                  {expandedSection === "care" ? <ChevronUp size={14} className="text-[#9A8F86]" /> : <ChevronDown size={14} className="text-[#9A8F86]" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === "care" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="p-4 bg-[#F8F6F1]/40 text-xs md:text-sm text-[#9A8F86] space-y-2 font-sans font-light list-disc list-inside">
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

              {/* Shipping, Returns and exchanges info */}
              <div className="py-2">
                <button
                  id="accordion-shipping-trigger"
                  onClick={() => toggleSection("shipping")}
                  className="w-full flex items-center justify-between p-3 text-right text-xs md:text-sm font-semibold text-brand-black hover:bg-neutral-50 transition-colors"
                >
                  <span className="flex items-center gap-2 font-sans font-medium text-xs md:text-sm text-brand-black">
                    <Truck size={12} className="text-brand-gold" />
                    خدمات الشحن وسياسة الاستبدال
                  </span>
                  {expandedSection === "shipping" ? <ChevronUp size={14} className="text-[#9A8F86]" /> : <ChevronDown size={14} className="text-[#9A8F86]" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === "shipping" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="p-4 bg-[#F8F6F1]/40 text-xs md:text-sm text-[#9A8F86] space-y-2 font-sans font-light list-disc list-inside">
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
      </div>

      {/* Sticky Bottom buying bar on Mobile screens */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-brand-border p-4 z-30 lg:hidden flex items-center justify-between gap-4 font-sans max-w-full">
        <div className="text-right">
          <span className="block text-[9px] text-[#9A8F86]">السعر الإجمالي</span>
          <span className="block font-serif text-base font-bold text-brand-black leading-tight" style={{ fontFamily: "Georgia, serif" }}>
            {product.price * quantity} ر.س
          </span>
        </div>
        
        <div className="flex items-center gap-2 flex-1 justify-end max-w-[70%]">
          {/* Quick Add To cart */}
          <button
            id="mobile-sticky-add-cart-btn"
            onClick={handleAdd}
            className="flex-1 bg-brand-black hover:bg-brand-navy text-white py-3 px-2 rounded-none text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer uppercase"
          >
            <ShoppingBag size={13} />
            <span>الحقيبة</span>
          </button>

          {/* Direct WhatsApp check */}
          <button
            id="mobile-sticky-whatsapp-btn"
            onClick={handleInquiry}
            className="flex-1 bg-white text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-white py-3 px-2 rounded-none text-xs font-medium flex items-center justify-center gap-1.5 font-sans cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.584 3.914 1.517 5.514l-.947 3.46 3.568-.937z" />
            </svg>
            <span>واتساب</span>
          </button>
        </div>
      </div>
    </div>
  );
}
