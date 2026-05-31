/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Sparkles, Star, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface Review {
  name: string;
  location: string;
  text: string;
  style: string;
  stars: number;
}

export default function Testimonials() {
  const reviews: Review[] = [
    {
      name: "حصة العبد الله",
      location: "الرياض",
      text: "العباءة السوداء بدانتيل (SHAHAD) فاخرة جداً وسوادها فاحم ومذهل. لم أرى مثل هذه الحياكة المتقنة والخياطة النظيفة في أي متجر محلي آخر. التغليف يفوح بالعود والبطاقة الشخصية المكتوبة بخط اليد تشعرك بالاقتناء الفردي.",
      style: "عباءة سوداء بتفاصيل دانتيل",
      stars: 5
    },
    {
      name: "سارة الشمراني",
      location: "جدة",
      text: "جلابية (EVE PARK) الزرقاء الباردة أصبحت خياري المفضل اليومي والصباحي في جدة. الخامة مريحة جداً وخفيفة ومنعشة ودرزة الكتف منسدلة بأناقة تروق للمظهر اليومي. بارك الله في مشغلكم الراقي الموثوق.",
      style: "جلابية كحلي يومية مريحة",
      stars: 5
    },
    {
      name: "موضي الرشيد",
      location: "الخبر",
      text: "طلبت عباءة بيضاء لجمع استقبال رمضاني خاص ووصلتني سريعة جداً ونظيفة وفي مغلف معزول ممتاز لمنع الاتساخ. التفصيل الملكي واسع وراقي جداً وتلاؤم الطرحة مع العباءة فاق كل توقعاتي والحمد لله.",
      style: "SERENA NOBLE WHITE ABAYA",
      stars: 5
    },
    {
      name: "نوف العنزي",
      location: "الدمام",
      text: "تواصلت مع مستشارة القياس بخصوص زيادة طول عباءتي وبالفعل جائت بالقياس المطلوب تماماً دون تلاعب بالقصة الانسيابية. العباءة الرمادية (MINIMALIST) جودتها لا تنتهي ولا تحتاج كي مفرط يومياً.",
      style: "عباءة رمادية ناعمة",
      stars: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-24 bg-white border-b border-[#E7E2DA] select-none font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 space-y-12 text-center">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-lg mx-auto">
          <div className="flex justify-center items-center gap-1.5 text-[#C5A46D]">
            <Sparkles size={13} className="animate-pulse" />
            <span 
              className="font-serif text-[10px] tracking-[0.3em] uppercase font-light"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              CLIENT IMPRESSIONS
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-light text-[#111111] tracking-tight leading-snug">
            إشادات مجتمع تاج مُهرة الراقي
          </h2>
          
          <p className="text-xs text-[#6E6256] leading-relaxed font-light">
            ثقة عميلاتنا هي الإرث الحقيقي لدارنا الملتزمة دائمًا بمعايير الحياكة والأناقة الفندقية الفاخرة لجميع المحافل والزيارات.
          </p>
        </div>

        {/* Testimonial Stage Viewport */}
        <div className="relative py-8 px-6 md:px-12 bg-[#FAF8F4] border border-[#E7E2DA] max-w-3xl mx-auto">
          
          {/* Subtle Quote icon background decoration */}
          <div className="absolute top-4 right-4 text-[#C5A46D]/15">
            <Quote size={50} className="stroke-[1]" />
          </div>

          <div className="relative space-y-6">
            
            {/* Stars rating vector */}
            <div className="flex justify-center items-center gap-1">
              {[...Array(reviews[currentIndex].stars)].map((_, i) => (
                <Star key={i} size={13} className="text-[#C5A46D] fill-[#C5A46D]" />
              ))}
            </div>

            {/* Impressive Review Text block */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-sm md:text-base text-[#111111] leading-relaxed font-sans font-light min-h-[96px] max-w-2xl mx-auto italic"
              >
                "{reviews[currentIndex].text}"
              </motion.p>
            </AnimatePresence>

            {/* Customer specs details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-1.5"
              >
                <div className="flex justify-center items-center gap-1.5">
                  <span className="font-sans font-medium text-xs text-[#111111]">{reviews[currentIndex].name}</span>
                  <span className="text-[10px] text-[#C5A46D] font-serif">/ {reviews[currentIndex].location}</span>
                </div>
                
                <div className="inline-flex items-center gap-1.5 bg-[#FAF8F4] px-3.5 py-1 text-[9px] text-[#6E6256] border border-[#E7E2DA] font-light">
                  <Check size={10} className="text-[#C5A46D]" />
                  <span>اقتنت قطعة: {reviews[currentIndex].style}</span>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Simple Clean Navigation Arrow triggers on Desktop/Mobile */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button
              id="testimonial-prev-trigger"
              onClick={handlePrev}
              className="p-1.5 bg-white border border-[#E7E2DA] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors cursor-pointer text-brand-black"
              title="السابق"
            >
              <ChevronRight size={13} />
            </button>
            <button
              id="testimonial-next-trigger"
              onClick={handleNext}
              className="p-1.5 bg-white border border-[#E7E2DA] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors cursor-pointer text-brand-black"
              title="التالي"
            >
              <ChevronLeft size={13} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
