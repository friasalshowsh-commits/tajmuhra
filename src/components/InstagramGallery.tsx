/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { PRODUCTS } from "../data";
import { Heart, MessageCircle, Instagram } from "lucide-react";

export default function InstagramGallery() {
  // Use product images for social grid
  const galleryItems = PRODUCTS.map((p, index) => ({
    id: p.id,
    imageUrl: p.imageUrl,
    likes: 124 + index * 42,
    comments: 8 + index * 3,
    tag: p.nameEn.split(" ")[0] // e.g. SHAHAD, EVE, SERENA
  }));

  return (
    <section className="py-24 md:py-32 bg-white border-b border-brand-border select-none font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex justify-center items-center gap-2 text-[#C5A46D]">
            <Instagram size={14} className="animate-pulse" />
            <span 
              className="font-serif text-[10px] tracking-[0.3em] uppercase font-light"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              LIFESTYLE / SOCIAL CAPTURES
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-light text-[#111111] tracking-tight leading-snug">
            إطلالات مجتمع تاج مُهرة
          </h2>
          
          <p className="text-xs text-[#6E6256] leading-relaxed font-light max-w-md mx-auto">
            تسوّقي من وحي تصاميمنا اليومية والمشغولة يدوياً وتشاركي معنا حضورك الملفت عبر هاشتاج <span className="font-semibold text-brand-black">#تاج_مهرة</span> ومتابعتنا الدائمة.
          </p>
        </div>

        {/* 6 Grid Instagram Grid (Horizontal scroll on mobile, perfect grid on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryItems.map((item, idx) => (
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              key={idx}
              initial="rest"
              whileHover="hover"
              className="relative aspect-square bg-[#FAF8F4] border border-neutral-150 overflow-hidden group block cursor-pointer"
            >
              {/* Image zoom */}
              <motion.img
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.04 }
                }}
                transition={{ duration: 0.8 }}
                src={item.imageUrl}
                alt={`Instagram aesthetic shot ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[12%] group-hover:grayscale-0 transition-all duration-800"
              />

              {/* Black elegant overlay with social metrics */}
              <motion.div
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 0.85 }
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-[#111111] flex flex-col items-center justify-center text-white p-4 space-y-4 z-10 text-center"
              >
                {/* Thin inside frame */}
                <div className="absolute inset-2 border border-white/10 pointer-events-none" />

                <span 
                  className="font-serif text-[10px] tracking-[0.25em] text-[#C5A46D] uppercase font-light"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  @{item.tag}
                </span>

                <div className="flex items-center gap-4 text-xs font-light">
                  <span className="flex items-center gap-1.5 hover:text-[#C5A46D] transition-colors">
                    <Heart size={12} className="fill-current text-[#C5A46D]" />
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-[#C5A46D] transition-colors">
                    <MessageCircle size={12} className="fill-current text-neutral-300" />
                    {item.comments}
                  </span>
                </div>

                <span className="text-[10px] text-neutral-300 font-light hover:underline font-sans">
                  مـشاهدة المصدر
                </span>
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Action Link to Instagram */}
        <div className="pt-4 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 text-[#111111] border-b border-[#111111] pb-1 hover:text-[#C5A46D] hover:border-[#C5A46D] transition-all duration-300 font-sans font-light text-xs tracking-wider uppercase"
          >
            <span>تابعينا على @TAJMUHRA</span>
            <Instagram size={12} className="text-[#C5A46D]" />
          </a>
        </div>

      </div>
    </section>
  );
}
