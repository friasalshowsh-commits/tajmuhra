/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Truck, Sparkles, RefreshCw, Layers, Calendar, Landmark, Check } from "lucide-react";
import { openWhatsApp } from "./WhatsAppButton";

export default function ShippingPage() {
  const policies = [
    {
      title: "خيارات وتغطية شحن الدار",
      desc: "نشحن بفخر لكافة مدن المملكة والمجلس الخليجي بالتعاون مع كبرى شركات نقل الطرود الفاخرة لضمان وصول شحنتك مغلقة ومعقمة.",
      benefits: [
        "شحن مجاني لكافة مدن المملكة للطلبات فوق ٣٠٠ ريال سعودي.",
        "توصيل سريع ومباشر داخل الرياض الكبرى في غضون ٢٤ إلى ٤٨ ساعة عمل.",
        "شحن قياسي لباقي مناطق المملكة ومدن الحدود خلال ٣-٥ أيام عمل كحد أقصى.",
        "تتوفر تغطية شحن سريعة لعميلاتنا في دول الخليج (الإمارات، قطر، البحرين، الكويت، وعُمان)."
      ]
    },
    {
      title: "سياسة الاستبدال والاسترجاع المريح",
      desc: "نحن في تاج مُهرة نهتم برضاكِ التام؛ لذا صممنا نظام إرجاع ومقاسات مريح وسهل خلال أيام معدودة من وصول القطعة لكِ.",
      benefits: [
        "إمكانية الاستبدال أو الاسترجاع بكل سلاسة للعباءات والجلابيات الجاهزة خلال ٧ أيام من تاريخ تسلّم الطرد.",
        "يرجى التأكد من بقاء القطعة مغلفة وبها كروت التعريف وبحالتها الأصلية غير المستخدمة ولم تتعرض لروائح كيميائية أو بخار خارجي.",
        "يتحمل المتجر رسوم الاسترجاع المباشرة في حالة وجود ملاحظات أو عيوب مصنعية في نسيج أو خيوط التطريز.",
        "في حال الرغبة بالاستبدال لتغيير المقاس، نقوم بإيفاد مندوب خاص لاستلام العباءة وتسليم المقاس الآخر البديل لك فوراً."
      ]
    },
    {
      title: "مدة وتنسيق الحياكة الخاصة والطلب المخصص",
      desc: "نظراً لأن بعض القطع تخضع لحياكة وتطريز يدوي مخصص على طلبكِ ومقاسكِ، فإنها تتطلب وقتاً محدداً لنصنعها بإعجاز متكامل.",
      benefits: [
        "يستغرق تفصيل العباءات المدرجة تحت Signature Collection نحو ٣-٥ أيام حياكة يدوية قبل الانتقال لمرحلة الشحن والتعبئة.",
        "الطرح والملحقات المرفقة مجانية تماماً ويجري مطابقتها بأقمشة العباءات تلقائياً.",
        "في مواسم الأعياد وشهر رمضان الفضيل، نوصي عميلاتنا بالطلب المبكر لتجنب تأخير أو تمدد ساعات الشحن الإقليمية."
      ]
    }
  ];

  const handleSupportInquiry = () => {
    openWhatsApp(undefined, "مرحبًا تاج مُهرة. أرغب بالاستفسار عن حالة شحنتي، أو طلب إرجاع/استبدال لأحد القطع");
  };

  return (
    <div className="bg-[#FAF8F4] py-16 md:py-24 select-none font-sans overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span 
            className="text-[#C5A46D] text-[10px] uppercase tracking-[0.3em] font-serif font-light block"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            CUSTOMER COUTURE SOLUTIONS
          </span>
          <h1 className="text-3xl md:text-5xl font-light text-[#111111] tracking-tight">
            سياسة الشحن والاسترجاع والطلب
          </h1>
          <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-light max-w-md mx-auto">
            مستاؤون من أي صعوبة مظهرية طرأت على مقاسكِ؛ إليك تفاصيل التغليف، التوصيل، الإرجاع، والوصول الفوري لمسؤولي الطرود والدعم.
          </p>
          <div className="flex justify-center pt-2">
            <div className="w-16 h-[1px] bg-[#C5A46D]" />
          </div>
        </div>

        {/* 3 Main Informational Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
          {policies.map((pol, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#E7E2DA] p-8 space-y-6 hover:border-[#C5A46D] transition-colors duration-300 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Custom top icon indicator */}
                <div className="w-10 h-10 bg-[#FAF8F4] flex items-center justify-center border border-[#E7E2DA]/80">
                  {idx === 0 ? (
                    <Truck size={15} className="text-[#C5A46D]" />
                  ) : idx === 1 ? (
                    <RefreshCw size={15} className="text-[#C5A46D]" />
                  ) : (
                    <Calendar size={15} className="text-[#C5A46D]" />
                  )}
                </div>

                <h3 className="text-lg font-light text-[#111111] leading-snug">
                  {pol.title}
                </h3>
                
                <p className="text-xs text-[#6E6256] leading-relaxed font-light">
                  {pol.desc}
                </p>

                <div className="w-8 h-[1px] bg-[#C5A46D]/50" />

                <ul className="space-y-3 pt-2">
                  {pol.benefits.map((ben, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-[#6E6256]/90 leading-relaxed font-light">
                      <Check size={11} className="text-[#C5A46D] shrink-0 mt-1" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}
        </div>

        {/* Dynamic CTA box with direct touch */}
        <div className="bg-white p-8 md:p-12 border border-[#E7E2DA] text-center max-w-3xl mx-auto space-y-6 shadow-sm">
          <div className="flex justify-center">
            <div className="bg-[#FAF8F4] w-12 h-12 flex items-center justify-center border border-[#C5A46D]/15 text-[#C5A46D]">
              <Sparkles size={18} className="animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-light text-[#111111]">مستشارة الدعم للتسليم والشحنات</h3>
            <p className="text-xs md:text-sm text-[#6E6256] font-light max-w-md mx-auto">
              إذا كانت لديكِ أي رغبة في استبيان رقم تتبع طردكِ الحالي عبر شركات الشحن (أرامكس، سمسا، سبل)، أو التعديل على عنوان التوصيل المحدد، يسعدنا خدمتكِ فوراً.
            </p>
          </div>

          <button
            id="shipping-support-whatsapp-btn"
            onClick={handleSupportInquiry}
            className="inline-flex justify-center items-center gap-2 bg-[#111111] hover:bg-neutral-800 text-[#FAF8F4] px-8 py-3.5 text-xs tracking-wider cursor-pointer font-light uppercase tracking-widest rounded-none"
          >
            <span>تحديث الشحنة فوريّاً</span>
          </button>
        </div>

      </div>
    </div>
  );
}
