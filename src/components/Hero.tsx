/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { HERO_IMAGE } from "../data";
import { motion } from "motion/react";

interface HeroProps {
  onShopNowClick: () => void;
  onSeeWhatNewClick?: () => void;
}

export default function Hero({ onShopNowClick }: HeroProps) {
  return (
    <section className="relative h-[92vh] w-full bg-[#111111] overflow-hidden select-none flex items-center justify-center">
      {/* Background Full-Screen Image with Soft Lighting Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={HERO_IMAGE}
          alt="TAJMUHRA Campaign Model"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center grayscale-[14%] brightness-95 scale-102"
        />
        {/* Soft, warm vignette overlay for premium atmospheric lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/75 via-[#111111]/35 to-[#111111]/45" />
        <div className="absolute inset-0 bg-radial-vignette opacity-30" />
      </div>

      {/* Inner thin double frame representing highest level couture alignment */}
      <div className="absolute inset-6 md:inset-10 border border-[#FAF8F4]/10 pointer-events-none z-10" />

      {/* Hero Typography & Content Overlay (Centered RTL alignment) */}
      <div className="relative z-20 text-center max-w-3xl px-6 space-y-6 md:space-y-8 flex flex-col items-center">
        
        {/* Subtitle / Brand Crest Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-3 justify-center"
        >
          <span className="w-8 h-[1px] bg-[#C5A46D]/60" />
          <span
            className="text-[#C5A46D] md:text-xs text-[10px] tracking-[0.4em] uppercase font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            HAUTE COUTURE ARABIA
          </span>
          <span className="w-8 h-[1px] bg-[#C5A46D]/60" />
        </motion.div>

        {/* Brand Display Header */}
        <div className="space-y-2 md:space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-white text-5xl sm:text-7xl lg:text-8.5xl font-light tracking-[0.08em] font-sans"
            style={{ letterSpacing: "0.0625em" }}
          >
            TAJMUHRA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6 }}
            className="text-[#C5A46D] text-lg sm:text-2xl mt-1 tracking-[0.25em] font-light italic font-serif"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Timeless Elegance
          </motion.p>
        </div>

        {/* Short Poetic Editorial Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-[#FAF8F4]/90 text-sm sm:text-base font-light max-w-xl leading-relaxed tracking-wide font-sans px-4"
        >
          قطع صُممت لترافق حضورك لا لتنافسه
        </motion.p>

        {/* CTA Button (Ultra-premium clean rectangular border button) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-4"
        >
          <button
            id="hero-shop-exclusive-btn"
            onClick={onShopNowClick}
            className="relative px-12 py-4 text-xs font-light tracking-[0.2em] font-sans text-[#FAF8F4] bg-transparent border border-[#FAF8F4]/40 hover:border-[#C5A46D] hover:bg-[#FAF8F4] hover:text-[#111111] transition-all duration-500 cursor-pointer uppercase rounded-none group shadow-sm overflow-hidden"
          >
            <span className="relative z-10">استكشفي المجموعة</span>
          </button>
        </motion.div>

      </div>

      {/* Decorative vertical coordinates / details at the margins of fullscreen view */}
      <div className="absolute bottom-8 left-10 hidden md:block z-20 text-neutral-400 text-[10px] uppercase tracking-[0.25em] font-light">
        © 2026 TAJMUHRA BOUTIQUE
      </div>
      <div className="absolute bottom-8 right-10 hidden md:block z-20 text-neutral-400 text-[10px] uppercase tracking-[0.25em] font-light">
        RIYADH / SAUDI ARABIA
      </div>
    </section>
  );
}
