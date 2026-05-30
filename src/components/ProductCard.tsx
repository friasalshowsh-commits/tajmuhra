/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Product } from "../types";
import { openWhatsApp } from "./WhatsAppButton";
import { motion } from "motion/react";
import { ShoppingBag, MessageCircle, Info, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, color: { name: string; hex: string }, size: string) => void;
  onViewDetails: (product: Product) => void;
  key?: React.Key;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: "أسود", hex: "#111111" });
  const [isHovered, setIsHovered] = useState(false);

  const handleInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsApp(product.name);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedSize);
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(product)}
      className="group relative bg-[#FFF] border border-brand-border overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
    >
      {/* Product Image Stack */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F6F1]">
        {/* Soft Gold border accent when card is focused or hovered */}
        <div className="absolute inset-0 border border-brand-gold/0 group-hover:border-brand-gold/15 transition-colors duration-300 pointer-events-none z-10" />

        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
        />

        {/* Categories / Tag Badges (e.g. Free shipping indicator, discount, or brand tag) */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <span className="bg-brand-black text-[#FFF] text-[9px] font-sans tracking-widest px-2.5 py-1 uppercase font-light">
            {product.category}
          </span>
          {product.price >= 170 && (
            <span className="bg-white text-brand-gold text-[8px] font-sans tracking-wide px-2 py-0.5 flex items-center gap-1 border border-brand-border font-medium">
              <Sparkles size={8} />
              <span>هدايا شاملة</span>
            </span>
          )}
        </div>

        {/* Info overlay button */}
        <button
          id={`view-details-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
          className="absolute bottom-4 left-4 z-10 bg-white/95 p-1.5 border border-brand-border text-brand-black transition-all hover:bg-brand-black hover:text-white cursor-pointer"
          title="تفاصيل سريعة"
        >
          <Info size={14} />
        </button>
      </div>

      {/* Content details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          {/* Brand & Price in a premium aligned row */}
          <div className="flex justify-between items-start gap-2">
            <div className="text-right">
              <span className="font-serif text-[10px] tracking-widest text-brand-taupe uppercase block font-light leading-relaxed">
                {product.nameEn}
              </span>
              <h3 className="font-sans text-xs md:text-sm font-medium text-brand-black leading-snug tracking-tight text-right line-clamp-1">
                {product.name}
              </h3>
            </div>
            
            <div className="text-left font-serif text-sm md:text-base font-bold text-brand-gold whitespace-nowrap pl-1 pt-0.5" style={{ fontFamily: "Georgia, serif" }}>
              {product.price} ر.س
            </div>
          </div>

          {/* Description */}
          <p className="font-sans text-xs text-[#9A8F86] font-light leading-relaxed text-right line-clamp-1 pt-1">
            {product.description}
          </p>
        </div>

        {/* Options Selection (Sizes & Swatches) */}
        <div className="space-y-2 pt-2 border-t border-brand-border/60">
          <div className="flex items-center justify-between text-xs">
            {/* Color Swatches selector (Square for Clean Minimalism look) */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((color) => (
                <button
                  id={`swatch-btn-${product.id}-${color.name}`}
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-4 h-4 border transition-all duration-200 cursor-pointer ${
                    selectedColor.name === color.name
                      ? "ring-1 ring-brand-gold ring-offset-1 scale-105 border-transparent"
                      : "border-neutral-300 hover:scale-110"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Custom Sizing list (Rectilinear for Clean Minimalism look) */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[150px]" onClick={(e) => e.stopPropagation()}>
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  id={`size-btn-${product.id}-${size}`}
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[9px] font-medium w-5 h-5 flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                    selectedSize === size
                      ? "bg-brand-black text-[#FFF] border-brand-black"
                      : "bg-[#F8F6F1] text-brand-black/70 border-brand-border hover:bg-neutral-100"
                  }`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[9px] text-[#9A8F86] font-light pr-1">
                  +{product.sizes.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Call buttons (Rectilinear shape) */}
        <div className="grid grid-cols-2 gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
          {/* Add to Cart */}
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="flex items-center justify-center gap-1.5 bg-white hover:bg-brand-black hover:text-white text-brand-black border border-brand-border px-2 py-2 text-[11px] font-sans font-medium cursor-pointer transition-all uppercase tracking-wide"
          >
            <ShoppingBag size={12} />
            <span>حقيبة التسوق</span>
          </button>

          {/* WhatsApp Direct Inquiry */}
          <button
            id={`whatsapp-inquiry-btn-${product.id}`}
            onClick={handleInquiry}
            className="flex items-center justify-center gap-1.5 bg-white text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-white px-2 py-2 text-[11px] font-sans font-medium cursor-pointer transition-all"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.584 3.914 1.517 5.514l-.947 3.46 3.568-.937z" />
            </svg>
            <span>طلب واتساب</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
