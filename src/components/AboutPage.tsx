/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { PRODUCTS } from "../data";
import { motion } from "motion/react";
import { Heart, Landmark, Landmark as Building, Sparkles, Star, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F4] py-16 md:py-24 select-none font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
        
        {/* Section 1: Hero Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-8 text-right order-2 lg:order-1">
            <span 
              className="text-[#C5A46D] text-[10px] uppercase tracking-[0.3em] font-serif font-light block"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              TAJMUHRA ATHENS BOUTIQUE
            </span>
            
            <h1 className="text-3xl md:text-5xl font-light text-[#111111] leading-tight tracking-tight">
              حكاية التفرّد ورقيّ الحضور
            </h1>
            
            <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-light max-w-xl">
              تأسست دار تاج مُهرة كعلامة تجارية متخصصة في صياغة أرقى تصاميم العباءات والجلابيات والقطع المحتشمة. رؤيتنا نابعة من شغف لتقديم خطوط أزياء تعبر عن الهوية الخليجية الأصيلة بلمسات عالمية معاصرة تجمع البساطة المينيمالية بالقوام المتزن المتوازن.
            </p>

            <blockquote className="border-r-2 border-[#C5A46D] pr-4 py-1 italic text-xs text-[#6E6256]/90 font-light">
              "نحن لا نقوم ببيع قطع للملبس فقط، بل نوفر ثقة، ووقاراً، وحضوراً هادئاً يفرض احترامه ويخطف الأبصار بكل هدوء وانسيابية."
            </blockquote>

            <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-light">
              نختار خامات الكريب والحرير والكتان الياباني والكوري بعناية مفرطة، ونقوم بتنسيقها واختبارها تحت ظروف مختلفة لضمان ثبات اللون، مقاومة الانكماش، وثبات النسيج ليدوم تراثاً فاخراً في خزانتكِ الأنيقة.
            </p>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[4/5] bg-white border border-[#E7E2DA] p-2 overflow-hidden shadow-sm">
              <div className="absolute inset-4 border border-[#C5A46D]/15 pointer-events-none" />
              <img
                src={PRODUCTS[0].imageUrl}
                alt="Tajmuhra signature silhouette illustration representation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[8%] hover:grayscale-0 transition-all duration-700 hover:scale-101"
              />
              <div className="absolute bottom-6 right-6 bg-[#FAF8F4] border border-[#E7E2DA]/65 px-4 py-2 text-[10px] uppercase tracking-widest font-serif font-light">
                THE SIGNATURE SHIELD
              </div>
            </div>
          </div>

        </div>

        {/* Section 2: Craftsmanship / Core Values Grid */}
        <div className="space-y-12 border-t border-[#E7E2DA]/60 pt-20">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="text-[#C5A46D] text-[10px] uppercase tracking-[0.22em] font-serif font-light block">Our Commitments</span>
            <h2 className="text-2xl md:text-3.5xl font-light text-[#111111] tracking-tight">روافد الحياكة وبصمة الدار</h2>
            <p className="text-xs text-[#6E6256] leading-relaxed font-light">
              أربع ركائز فنية تحكم كواليس إنتاج وحياكة أثواب وعباءات تاج مُهرة في الرياض.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Value 1 */}
            <div className="bg-white border border-[#E7E2DA] p-8 text-right space-y-4 shadow-sm hover:border-[#C5A46D] transition-colors duration-300">
              <div className="w-10 h-10 bg-[#FAF8F4] flex items-center justify-center border border-[#E7E2DA]">
                <Sparkles size={16} className="text-[#C5A46D]" />
              </div>
              <h3 className="text-base font-light text-[#111111]">1. نقاء وانتقاء الخامة</h3>
              <p className="text-xs text-[#6E6256] leading-relaxed font-light font-sans">
                نستورد منسوجات ومخام الكريب مباشرة من منشأها الأصلي في طوكيو وسول للتأكد من انسياب ناعم ودرجة سواد غنية لا تبهت مع كثرة الغسيل والزيارات.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white border border-[#E7E2DA] p-8 text-right space-y-4 shadow-sm hover:border-[#C5A46D] transition-colors duration-300">
              <div className="w-10 h-10 bg-[#FAF8F4] flex items-center justify-center border border-[#E7E2DA]">
                <Building size={16} className="text-[#C5A46D]" />
              </div>
              <h3 className="text-base font-light text-[#111111]">2. الأتيليه والمشغل المحلي</h3>
              <p className="text-xs text-[#6E6256] leading-relaxed font-light font-sans">
                جميع عباءات الدار تُطرز وتُفصل يدوياً في مشغلنا الخاص بالرياض تحت قيادة أمهر العاملين ذوي الخبرة الطويلة لأزيد من عقود في صياغة الكوتور الخليجي.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white border border-[#E7E2DA] p-8 text-right space-y-4 shadow-sm hover:border-[#C5A46D] transition-colors duration-300">
              <div className="w-10 h-10 bg-[#FAF8F4] flex items-center justify-center border border-[#E7E2DA]">
                <Heart size={16} className="text-[#C5A46D]" />
              </div>
              <h3 className="text-base font-light text-[#111111]">3. الحشمة والوقار</h3>
              <p className="text-xs text-[#6E6256] leading-relaxed font-light font-sans">
                ندرس القصّات بدقة ميكرومترية لضمان قوام فضفاض ومستور بالكامل، يمنحكِ الراحة التامة وحرية الحركة في الأماكن المشتركة وفي ظلال العائلة بحشمة ترضي ذوقكِ.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white border border-[#E7E2DA] p-8 text-right space-y-4 shadow-sm hover:border-[#C5A46D] transition-colors duration-300">
              <div className="w-10 h-10 bg-[#FAF8F4] flex items-center justify-center border border-[#E7E2DA]">
                <Users size={16} className="text-[#C5A46D]" />
              </div>
              <h3 className="text-base font-light text-[#111111]">4. خدمات مخصصة</h3>
              <p className="text-xs text-[#6E6256] leading-relaxed font-light font-sans">
                لكل عميل خصوصيته وتفضيله المظهري؛ لذا نوفر عبر الدعم الخاص خدمة تعديل تفصيل الأطوال ومستشاري القياس لنوفر لك قطعة مصممة بدقة استثنائية لأجلك وحده.
              </p>
            </div>

          </div>
        </div>

        {/* Section 3: The Creative Hub (Team & Founders Note) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-[#E7E2DA]/60 pt-20">
          <div className="lg:col-span-5 relative aspect-[3/4.2] overflow-hidden border border-[#E7E2DA] p-2 bg-white flex items-center shadow-xs">
            <div className="absolute inset-4 border border-[#C5A46D]/15 pointer-events-none" />
            <img
              src={PRODUCTS[3].imageUrl}
              alt="Tailoring design workspace"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale-[12%]"
            />
          </div>

          <div className="lg:col-span-7 space-y-8 text-right">
            <span className="text-[#C5A46D] text-[10px] uppercase tracking-[0.25em] font-serif block font-light">FOUNDER PROFILE</span>
            <h2 className="text-2xl md:text-3.5xl font-light text-[#111111] leading-snug">
              مذكرة من ورشة الحياكة الفندقية
            </h2>
            <div className="w-12 h-[1px] bg-[#C5A46D]" />
            <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-light">
              "عندما تصمم قطعة أزياء راقية، تباشر العمل بالاهتمام بجمال الهدب ونقاء اللون الكلي. نحن حريصون على تقديم تغليف يرقى لمرتبة الهدايا الفخمة، حيث تأتي العباءة مغلقة تماماً بشعار الدار وحامل تعليق مخصص، مع بطاقة إهداء مفرغة يدوياً ومعطرة برذاذ العود الأصلي لتصلكِ بلمسة تليق بمقامك."
            </p>
            <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-light">
              ندعوكم للانضمام إلى عائلة تاج مُهرة المتميزة والمثنية عن حضورها البراق في كافة المحافل والمجالس الكبرى، ونرحب برغباتكم الإضافية في تعديل الأطوال وخياطة الطرح بحرية كاملة طوال العام.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
