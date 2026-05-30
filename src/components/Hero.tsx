/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { HERO_IMAGE } from "../data";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles } from "lucide-react";

interface HeroProps {
  onShopNowClick: () => void;
  onSeeWhatNewClick: () => void;
}

export default function Hero({ onShopNowClick, onSeeWhatNewClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-bg py-12 md:py-20 border-b border-brand-border select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column: Copywriting and CTA (RTL: Arrives on right on desktop) */}
          <motion.div
            id="hero-copy-column"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6 text-right order-2 lg:order-1"
          >
            <div className="overflow-hidden mb-2">
              <span className="text-brand-gold text-[12px] uppercase tracking-[0.2em] font-medium block">
                مـوسـم جـديـد ٢٠٢٦ ✦ تـاج مـهـرة
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-brand-black font-sans">
                أناقة محتشمة
                <span className="block mt-2 italic font-serif text-brand-gold" style={{ fontFamily: "Georgia, serif" }}>
                  بتفاصيل هادئة
                </span>
              </h1>
              
              <p className="text-[#9A8F86] text-[15px] font-sans leading-relaxed max-w-md">
                تصاميم راقية للعباءات والجلابيات اليومية، بخامات مريحة وقصّات تناسب حضورك، مستوحاة من بساطة الطبيعة وفخامة التفاصيل الهادئة.
              </p>
            </div>

            {/* CTA Actions (Flat Minimal design) */}
            <div className="flex flex-wrap gap-4 pt-4 items-center">
              <button
                id="hero-shop-now-btn"
                onClick={onShopNowClick}
                className="bg-brand-black text-white px-10 py-4 text-[13px] font-sans font-medium tracking-widest hover:bg-brand-navy transition-all cursor-pointer uppercase"
              >
                تسوقي الآن
              </button>

              <button
                id="hero-see-new-btn"
                onClick={onSeeWhatNewClick}
                className="border border-brand-black text-brand-black px-10 py-4 text-[13px] font-sans font-medium tracking-widest hover:bg-[#F0EEE8] transition-all cursor-pointer uppercase"
              >
                شاهدي الجديد
              </button>
            </div>

            {/* Custom Boutique Badges info */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-border">
              <div className="text-right">
                <span className="block font-serif text-xl font-bold tracking-tight text-brand-gold">
                  100%
                </span>
                <span className="text-[11px] text-[#9A8F86] font-light">
                  أقمشة كورية ناعمة
                </span>
              </div>
              <div className="text-right border-r border-[#E7E2DA] pr-4">
                <span className="block font-serif text-xl font-bold tracking-tight text-brand-black">
                  7+
                </span>
                <span className="text-[11px] text-[#9A8F86] font-light">
                  مقاسات مخصصة
                </span>
              </div>
              <div className="text-right border-r border-[#E7E2DA] pr-4">
                <span className="block font-sans text-xs md:text-sm font-bold tracking-widest text-[#25D366] py-1.5">
                  رَسـمـيّ
                </span>
                <span className="text-[11px] text-[#9A8F86] font-light block">
                  دعم وتنسيق واتساب
                </span>
              </div>
            </div>
          </motion.div>

          {/* Left Column: Model / Product Image Area */}
          <motion.div
            id="hero-image-column"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-7 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-2xl aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] bg-[#F8F6F1] p-1 border border-brand-border group overflow-hidden">
              {/* Inner Decorative Accent Border */}
              <div className="absolute inset-2 border border-brand-gold/10 pointer-events-none z-10" />
              
              <img
                src={HERO_IMAGE}
                alt="العارض البصري لـ تاج مُهرة"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-101 transition-all duration-700"
              />

              {/* Float Card Overlay for brand look (Flat and elegant) */}
              <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md px-5 py-4 border border-brand-border max-w-[220px] text-right shadow-sm hidden sm:block">
                <div className="flex items-center gap-1.5 text-[9px] text-[#C8A96B] font-bold tracking-widest block mb-1">
                  <span>الأكثر مبيعاً</span>
                </div>
                <p className="font-semibold text-xs text-brand-black font-sans tracking-tight leading-snug">
                  طقم عباءة الدانتيل الأسود الملكي
                </p>
                <span className="block font-serif font-bold text-sm text-brand-gold mt-1">
                  ١٧٠ ر.س
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
