/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`relative cursor-pointer h-80 overflow-hidden border select-none transition-all duration-300 ${
        isActive
          ? "border-brand-gold"
          : "border-brand-border hover:border-brand-gold"
      }`}
    >
      {/* Background Image */}
      <img
        src={category.imageUrl}
        alt={category.name}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700"
      />

      {/* Luxury Dark Semi-gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Category Content (Positioned at bottom for Ounass look) */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-right text-white">
        <span className="font-serif text-[10px] tracking-[0.2em] text-[#C8A96B] uppercase font-medium mb-1.5">
          {category.nameEn}
        </span>
        
        <h3 className="text-xl font-light font-sans tracking-tight mb-1 group-hover:text-brand-gold transition-colors">
          {category.name}
        </h3>

        <p className="text-xs text-neutral-300 font-sans font-light leading-snug opacity-90 truncate max-w-full">
          {category.description}
        </p>

        {/* Call to action arrow that slides out with hover */}
        <div className="mt-4 flex items-center justify-end gap-1.5 text-xs font-semibold text-brand-gold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <span>استكشفي القطع</span>
          <ArrowLeft size={12} />
        </div>
      </div>

      {/* Small top-left badge for active indication */}
      {isActive && (
        <span className="absolute top-4 left-4 bg-[#C8A96B] text-white text-[9px] px-3.5 py-1 uppercase tracking-wider font-sans z-10 font-bold">
          مُفعلّ
        </span>
      )}
    </motion.div>
  );
}
