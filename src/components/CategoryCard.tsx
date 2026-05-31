/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles } from "lucide-react";

interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  imageUrl: string;
}

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  isActive: boolean;
  key?: React.Key;
}

export default function CategoryCard({ category, onClick, isActive }: CategoryCardProps) {
  return (
    <motion.div
      id={`cat-card-${category.id}`}
      onClick={onClick}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={`relative cursor-pointer h-[420px] md:h-[500px] overflow-hidden select-none transition-all duration-500 group rounded-none ${
        isActive
          ? "border-2 border-[#C5A46D]"
          : "border border-neutral-200 hover:border-[#C5A46D]/60"
      }`}
    >
      {/* Editorial Slow Zoom Zoom background */}
      <motion.div
        variants={{
          rest: { scale: 1, filter: "grayscale(12%)" },
          hover: { scale: 1.05, filter: "grayscale(2%)" }
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={category.imageUrl}
          alt={category.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

      {/* Luxury Gradient Overlay - darker at bottom for superior legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/30 transition-all duration-700" />

      {/* Thin elegant inside double frame representing luxury clothing label design */}
      <div className="absolute inset-4 border border-white/10 pointer-events-none group-hover:border-[#C5A46D]/30 transition-all duration-700 z-10" />

      {/* Flag indicating active category filter */}
      {isActive && (
        <div className="absolute top-6 left-6 bg-[#C5A46D] text-white text-[9px] px-4 py-1.5 uppercase tracking-[0.2em] font-sans z-20 font-light">
          مـعروض حـالياً
        </div>
      )}

      {/* Content Block (Positioned elegantly at bottom) */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-right text-white z-20 space-y-3.5">
        
        {/* Category Tag Header */}
        <div className="flex items-center gap-2.5 justify-end">
          <Sparkles size={10} className="text-[#C5A46D] shrink-0" />
          <span 
            className="font-serif text-[10px] tracking-[0.25em] text-[#C5A46D] uppercase font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {category.nameEn}
          </span>
        </div>

        {/* Category Major Title */}
        <h3 className="text-xl md:text-2xl font-light font-sans tracking-wide leading-tight text-white group-hover:text-[#C5A46D] transition-colors duration-300">
          {category.name}
        </h3>

        {/* Category Narrative */}
        <p className="text-xs text-[#FAF8F4]/80 font-sans font-light leading-relaxed max-w-sm line-clamp-2 pr-1">
          {category.description}
        </p>

        {/* Sophisticated Action Arrow Button */}
        <div className="pt-2 flex items-center justify-end gap-2 text-[11px] font-light text-[#C5A46D] overflow-hidden">
          <motion.span
            variants={{
              rest: { x: 5, opacity: 0.8 },
              hover: { x: 0, opacity: 1 }
            }}
            transition={{ duration: 0.4 }}
            className="font-sans uppercase tracking-widest text-[#C5A46D]"
          >
            استكشفي المظاهر
          </motion.span>
          <motion.div
            variants={{
              rest: { x: 0 },
              hover: { x: -4 }
            }}
            transition={{ duration: 0.4 }}
          >
            <ArrowLeft size={12} className="text-[#C5A46D]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
