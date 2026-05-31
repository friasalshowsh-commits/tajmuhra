/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { openWhatsApp } from "./WhatsAppButton";
import { Landmark, PhoneCall, Calendar, Mail, Clock, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    appointmentType: "تفصيل مخصص / مقاسات خاصة",
    preferredDate: "",
    preferredTime: "صباحاً (9:00 - 12:00)",
    notes: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("الرجاء تعبئة الاسم ورقم الجوال لتنسيق الموعد");
      return;
    }

    // Format secure message for WhatsApp direct forward
    const waText = `مرحبًا دار تاج مُهرة للأناقة. أرغب في حجز موعد استشارة وتفصيل:
- الاسم: ${formData.name}
- الجوال: ${formData.phone}
- نوع الاستشارة: ${formData.appointmentType}
- التاريخ المفضل: ${formData.preferredDate || "غير محدد"}
- التوقيت المفضل: ${formData.preferredTime}
- ملاحظات خاصة: ${formData.notes || "لا توجد"}`;

    // Show success view
    setIsSubmitted(true);
    
    // Open WhatsApp
    setTimeout(() => {
      openWhatsApp(undefined, waText);
    }, 1800);
  };

  return (
    <div className="bg-[#FAF8F4] py-16 md:py-24 select-none font-sans overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span 
            className="text-[#C5A46D] text-[10px] uppercase tracking-[0.3em] font-serif font-light block"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            THE RIYADH RESIDENCE
          </span>
          <h1 className="text-3xl md:text-5xl font-light text-[#111111] tracking-tight">
            تواصل استثنائي واستشارات الأزياء
          </h1>
          <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-light max-w-md mx-auto">
            احجزي موعد وتنسيق حياكة خاص، أو زوري موقعنا، أو تواصلي فوراً مع فريق الأتيليه لتجسيد أثوابك الفاخرة المنسوجة يدوياً.
          </p>
          <div className="flex justify-center pt-2">
            <div className="w-16 h-[1px] bg-[#C5A46D]" />
          </div>
        </div>

        {/* Two-Column split: Showroom Details (Left) / Reservation Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* SHOWROOM DETAILS COL (5 Columns) */}
          <div className="lg:col-span-5 space-y-8 bg-white border border-[#E7E2DA] p-8 md:p-10 shadow-sm relative">
            <div className="absolute inset-4 border border-[#C5A46D]/10 pointer-events-none" />
            
            <h2 className="text-xl font-light text-[#111111] border-b border-[#E7E2DA] pb-4 flex items-center gap-2.5 justify-end">
              <span className="font-serif text-[11px] text-[#C5A46D] tracking-wider font-light">EXQUISITE SHOWROOM</span>
              <span>مقر الدار الرئيسي</span>
            </h2>

            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 justify-end text-xs font-semibold text-[#111111]">
                <span>عنوان الاتجاه الجغرافي</span>
                <MapPin size={13} className="text-[#C5A46D]" />
              </div>
              <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-light">
                حي التخصصي الفخم / طريق العروبة الفرعي، فيلات كوتور المغلقة، الرياض، المملكة العربية السعودية.
              </p>
            </div>

            {/* Hours */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 justify-end text-xs font-semibold text-[#111111]">
                <span>أوقات العمل واستقبال الطلبات</span>
                <Clock size={13} className="text-[#C5A46D]" />
              </div>
              <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-light">
                يومياً من السبت إلى الخميس: ١0:00 صباحاً حتى ١0:00 مساءً.<br />
                يوم الجمعة: ٤:٠٠ عصراً حتى ١0:00 مساءً.
              </p>
            </div>

            {/* Grid Hotline/Mail */}
            <div className="space-y-4 pt-4 border-t border-[#E7E2DA]/65 divide-y divide-[#E7E2DA]/40">
              
              <div className="flex justify-between items-center text-xs md:text-sm font-light py-2">
                <span className="font-mono text-[#111111] hover:text-[#C5A46D] transition-colors">٠٥٠٠٤٩٥٧٣١</span>
                <span className="text-[#6E6256] flex items-center gap-2">
                   المستشار المظهري والمكالمات
                  <PhoneCall size={12} className="text-[#C5A46D]" />
                </span>
              </div>

              <div className="flex justify-between items-center text-xs md:text-sm font-light py-3">
                <span className="font-mono text-[#111111] hover:text-[#C5A46D] transition-colors">support@tajmuhra.com</span>
                <span className="text-[#6E6256] flex items-center gap-2">
                   المراسلات الرسمية بالفريق
                  <Mail size={12} className="text-[#C5A46D]" />
                </span>
              </div>

            </div>

            {/* Note on Showroom reservations */}
            <div className="bg-[#FAF8F4] p-5 border border-[#E7E2DA]/85 space-y-2 text-center">
              <Sparkles className="mx-auto text-[#C5A46D] animate-pulse" size={16} />
              <p className="font-serif text-[10px] tracking-wider text-[#C5A46D] uppercase">Showroom Experience</p>
              <p className="text-xs text-[#6E6256] leading-relaxed font-light">
                لتجربة قياس مجهرية لبارد الكريب والحرائر في بيئة هادئة ومكيفة لراحتكِ، نوصي بحجز موعد استشارة مسبق لتجنب أوقات الذروة.
              </p>
            </div>

          </div>

          {/* INTERACTIVE FORM COL (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-[#E7E2DA] p-8 md:p-10 shadow-sm relative">
            <div className="absolute inset-4 border border-[#C5A46D]/10 pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  id="contact-reservation-form"
                  onSubmit={handleSubmit}
                  key="form-entry"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-light text-[#111111] border-b border-[#E7E2DA] pb-4 text-right">
                    نموذج طلب الاستشارة وتفصيل القياس الخاص
                  </h2>

                  {/* Input Grid Name/Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="text-right space-y-2">
                      <label id="lbl-name" className="text-xs text-[#6E6256] font-light">الاسم الكريم بالكامل *</label>
                      <input
                        id="form-input-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="الأستاذة/ الفاضلة مريم..."
                        className="bg-[#FAF8F4] border border-[#E7E2DA]/80 w-full px-4 py-3.5 text-xs text-brand-black outline-none focus:border-[#C5A46D] text-right font-sans rounded-none"
                      />
                    </div>

                    <div className="text-right space-y-2">
                      <label id="lbl-phone" className="text-xs text-[#6E6256] font-light">رقم الجوال لتنسيق المندوب والتحقق *</label>
                      <input
                        id="form-input-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+966 50 000 0000"
                        className="bg-[#FAF8F4] border border-[#E7E2DA]/80 w-full px-4 py-3.5 text-xs text-brand-black outline-none focus:border-[#C5A46D] text-right font-sans rounded-none"
                      />
                    </div>
                  </div>

                  {/* Input Grid Type/Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="text-right space-y-2">
                      <label id="lbl-type" className="text-xs text-[#6E6256] font-light">خيار الاستشارة المطلوب</label>
                      <select
                        id="form-input-appointment"
                        name="appointmentType"
                        value={formData.appointmentType}
                        onChange={handleInputChange}
                        className="bg-[#FAF8F4] border border-[#E7E2DA]/80 w-full px-4 py-3.5 text-xs text-brand-black outline-none focus:border-[#C5A46D] text-right font-sans rounded-none cursor-pointer"
                      >
                        <option value="تفصيل مخصص / مقاسات خاصة">تفصيل مخصص / مقاسات خاصة</option>
                        <option value="استفسار عن الشحن والتبديل الجاري">استفسار عن الشحن والتبديل الجاري</option>
                        <option value="طلب تفصيل هدية فاخرة مرسلة لصديقة">طلب تفصيل هدية فاخرة مرسلة لصديقة</option>
                        <option value="استشارة مظهر واختيار نقوش أكمام">استشارة مظهر واختيار أقمشة ونقوش</option>
                      </select>
                    </div>

                    <div className="text-right space-y-2">
                      <label id="lbl-date" className="text-xs text-[#6E6256] font-light">التاريخ المفضل لطلبك الاستشاري</label>
                      <input
                        id="form-input-preferred-date"
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="bg-[#FAF8F4] border border-[#E7E2DA]/80 w-full px-4 py-3.5 text-xs text-[#111111] outline-none focus:border-[#C5A46D] text-right font-sans rounded-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Preferred Time slots */}
                  <div className="text-right space-y-2">
                    <label id="lbl-time" className="text-xs text-[#6E6256] font-light">التوقيت المفضل للتواصل والمكالمة الاسترشادية</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        "صباحاً (9:00 - 12:00)",
                        "عصراً (1:00 - 5:00)",
                        "مساءً (6:00 - 9:00)"
                      ].map((slot) => (
                        <button
                          key={slot}
                          id={`time-slot-${slot}`}
                          type="button"
                          onClick={() => setFormData((f) => ({ ...f, preferredTime: slot }))}
                          className={`px-3 py-3 border text-[10px] font-sans text-center cursor-pointer transition-all ${
                            formData.preferredTime === slot
                              ? "bg-[#111111] text-white border-[#111111]"
                              : "bg-[#FAF8F4] text-[#6E6256] border-[#E7E2DA]/80 hover:border-[#C5A46D]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes / custom specifications */}
                  <div className="text-right space-y-2">
                    <label id="lbl-notes" className="text-xs text-[#6E6256] font-light">أي طلبات خاصة / مقاس كتف / تمليك الطول بالأمتار</label>
                    <textarea
                      id="form-input-notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="يرجى كتابة مقاساتك أو أي تعديل ترغبينه على تصميم الأكمام والطرح والقطع..."
                      className="bg-[#FAF8F4] border border-[#E7E2DA]/80 w-full px-4 py-3.5 text-xs text-brand-black outline-none focus:border-[#C5A46D] text-right font-sans rounded-none resize-none"
                    />
                  </div>

                  {/* Submission triggers */}
                  <button
                    id="submit-reservation-btn"
                    type="submit"
                    className="w-full bg-[#111111] hover:bg-neutral-800 text-white py-4 text-xs tracking-wider cursor-pointer font-light transition-all duration-300 uppercase tracking-widest rounded-none shadow-sm flex items-center justify-center gap-2"
                  >
                    <Calendar size={13} className="text-[#C5A46D]" />
                    <span>تأكيد الموعد وإرسال عبر واتساب الفوري</span>
                  </button>

                  <p className="text-[10px] text-center text-[#6E6256] font-light leading-relaxed">
                    من خلال الضغط على 'تأكيد الموعد'، سيتم فتح نافذة واتساب رسمية لإتمام التناسق النهائي للقياس مع خبير الأناقة دون أي رسوم مالية مسبقة.
                  </p>
                </motion.form>
              ) : (
                /* SUCCESS SCREEN */
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-6"
                >
                  <div className="flex justify-center">
                    <CheckCircle2 size={54} className="text-[#C5A46D] animate-bounce" />
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-light text-[#111111]">تم تسجيل رغبتكِ الاستشارية بنجاح</h2>
                    <p className="text-xs md:text-sm text-[#6E6256] font-light max-w-sm mx-auto leading-relaxed">
                      جاري نقلك المباشر والآمن للأتيليه ومستشارة المقاسات الخاصة بنا للتصميم النهائي عبر واتساب.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-serif text-[#C5A46D] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 bg-[#C5A46D] rounded-full animate-ping" />
                    <span>TAJMUHRA COUTURE WORKROOM</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
