/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { PRODUCTS } from "../data";

export default function BrandStory() {
  // Use the elegant white occasion showcase image for an ultra-clean contrast look
  const brandImage = PRODUCTS.find((p) => p.id === "3")?.imageUrl || PRODUCTS[0].imageUrl;

  return (
    <section className="py-24 md:py-32 bg-[#FAF8F4] border-b border-brand-border select-none font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Right Column: Narrative Copywriting & Luxury Typography */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 text-right space-y-8 order-2 lg:order-1"
          >
            {/* Slogan Badge */}
            <div className="flex items-center gap-2.5 justify-end">
              <span className="w-6 h-[1px] bg-[#C5A46D]/60" />
              <span 
                className="font-serif text-[10px] tracking-[0.25em] text-[#C5A46D] uppercase font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                THE CREATIVE INSPIRATION
              </span>
            </div>

            {/* Brand Story Main Headers */}
            <div className="space-y-3">
              <span 
                className="block text-[#C5A46D] text-xs uppercase tracking-widest font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                من نحن • حكاية الدار
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-[#111111] leading-snug tracking-tight">
                حضورٌ ينسج الصمت أناقة
              </h2>
            </div>

            {/* Authentic text about Tajmuhra */}
            <div className="space-y-6 text-[#6E6256] text-sm md:text-[15px] font-sans font-light leading-relaxed">
              <p>
                تأسست دار <strong className="text-[#111111] font-medium font-sans">تاج مُهرة (TAJMUHRA)</strong> لتجسيد فلسفة تبسيط الجمال، حيث الأناقة ليست صخباً، بل حضورٌ ناعم محتشم ينساب برقّة كلاسيكية ووقار.
              </p>
              <p>
                في مشاغلنا بالرياض، نقوم بانتقاء أجود المنسوجات من كريب إنترنت كوري، وحرير ياباني فاخر، لنحيك كوتور مخصص يرافق خطواتكِ في المشاوير اليومية والمناسبات الراقية. نؤمن بأن الحشمة والترف صنوان؛ لذلك صُممت كل قطعة في الدار بعناية فائقة لتبرز حضوركِ العذب لا لتنافسه.
              </p>
            </div>

            {/* Designer Signature Graphic */}
            <div className="pt-6 border-t border-brand-border flex flex-col items-end">
              <span 
                className="font-serif italic text-lg text-[#C5A46D] tracking-widest font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                TAJMUHRA BOUTIQUE
              </span>
              <span className="text-[10px] text-[#6E6256] font-light mt-1.5 block uppercase tracking-[0.1em]">
                ـ حياكة مخصصة للمرأة السعودية والخليجية ـ
              </span>
            </div>
          </motion.div>

          {/* Left Column: Magnificent Framed Brand Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-xl aspect-[3/4] bg-[#FAF8F4] border border-brand-border p-2">
              {/* Elegant Gold Accent Overlay Double Frame */}
              <div className="absolute inset-4 border border-[#C5A46D]/15 pointer-events-none z-10" />
              
              <img
                src={brandImage}
                alt="تاج مُهرة في المشغل والمصمم"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[10%]"
              />

              {/* Decorative Tag overlay */}
              <div className="absolute top-8 right-8 z-20 bg-black text-[#FAF8F4] px-4.5 py-1.5 border border-white/5 text-[9px] uppercase tracking-[0.25em] font-light">
                ATELIER RIYADH
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
