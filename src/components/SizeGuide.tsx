/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Ruler, HelpCircle, PhoneCall } from "lucide-react";
import { SIZE_GUIDE_DATA } from "../data";
import { openWhatsApp } from "./WhatsAppButton";

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            id="size-guide-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            id="size-guide-modal"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="relative w-full max-w-4xl bg-brand-bg border border-brand-border text-brand-black flex flex-col max-h-[90vh] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border bg-white">
              <div className="flex items-center gap-3">
                <Ruler className="text-brand-gold" size={18} />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-black">
                  دليل المقاسات الفاخرة
                </h3>
              </div>
              <button
                id="close-size-guide-btn"
                onClick={onClose}
                className="p-1.5 hover:bg-neutral-100 transition-colors cursor-pointer text-[#9A8F86] hover:text-brand-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 font-sans">
              <div className="bg-white p-5 border border-brand-border space-y-3">
                <h4 className="font-semibold text-brand-black flex items-center gap-2 text-xs uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-brand-gold" />
                  ملاحظة هامة للاختيار المريح
                </h4>
                <p className="text-xs md:text-sm text-[#9A8F86] leading-relaxed font-light">
                  تعتمد مقاسات عباءات وجلابيات تاج مُهرة على القياسات الفنية القياسية المعتمدة لدى دور الأزياء السعودية. نوصي بقياس ومراجعة مقاس الكتف والطول بعناية لضمان إنسيابية حركة العباءة وثباتها.
                </p>
              </div>

              {/* Sizing Table */}
              <div className="space-y-3">
                <h4 className="font-semibold text-brand-black text-xs uppercase tracking-wider">جدول المقاسات الرسمي (سم)</h4>
                <div className="overflow-x-auto border border-brand-border">
                  <table className="w-full text-right text-xs md:text-sm border-collapse bg-white min-w-[600px]">
                    <thead>
                      <tr className="bg-[#F8F6F1] text-brand-black border-b border-brand-border font-medium">
                        <th className="p-4">المقاس</th>
                        <th className="p-4">الطول (Length)</th>
                        <th className="p-4">الصدر (Chest)</th>
                        <th className="p-4">الخصر (Waist)</th>
                        <th className="p-4">الكم (Sleeve)</th>
                        <th className="p-4 text-[#9A8F86]">ملاحظات توجيهية</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-brand-black">
                      {SIZE_GUIDE_DATA.map((row) => (
                        <tr
                          key={row.size}
                          className="hover:bg-brand-bg/50 transition-colors"
                        >
                          <td className="p-4 font-bold text-brand-black font-serif text-sm" style={{ fontFamily: "Georgia, serif" }}>{row.size}</td>
                          <td className="p-4">{row.length}</td>
                          <td className="p-4">{row.chest}</td>
                          <td className="p-4">{row.waist}</td>
                          <td className="p-4">{row.sleeve}</td>
                          <td className="p-4 text-xs text-neutral-500 font-light">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Measurement Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/60 p-5 border border-brand-border space-y-2">
                  <p className="font-semibold text-xs uppercase tracking-wider text-brand-black">1. قياس الطول (Length)</p>
                  <p className="text-xs text-[#9A8F86] leading-relaxed font-light">
                    ابدئي بالقياس من منتصف الكتف على طول جسمك لأسفل حتى الكعبين للحصول على الطول الكامل المرغوب فيه.
                  </p>
                </div>
                <div className="bg-white/60 p-5 border border-brand-border space-y-2">
                  <p className="font-semibold text-xs uppercase tracking-wider text-brand-black">2. قياس الصدر والخصر</p>
                  <p className="text-xs text-[#9A8F86] leading-relaxed font-light">
                    قومي بلف شريط القياس بحرية حول أوسع منطقة في الصدر، ثم منطقة الخصر مع ترك مسافة إصبعين للتنفس والحركة.
                  </p>
                </div>
                <div className="bg-white/60 p-5 border border-brand-border space-y-2">
                  <p className="font-semibold text-xs uppercase tracking-wider text-brand-black">3. قياس طول الكم (Sleeve)</p>
                  <p className="text-xs text-[#9A8F86] leading-relaxed font-light">
                    ابدئي بالقياس من أعلى عظمة الكتف وصولاً إلى الرسغ مع ثني كوعكِ قليلاً للحصول على قوام فضفاض ومريح.
                  </p>
                </div>
              </div>

              {/* Assistant Message Block */}
              <div className="bg-white text-center p-6 border border-brand-border flex flex-col items-center gap-4">
                <HelpCircle className="text-brand-gold" size={24} />
                <div className="space-y-1">
                  <p className="font-semibold text-brand-black text-xs uppercase tracking-wider">
                    محتارة في اختيار قياسكِ الأمثل؟
                  </p>
                  <p className="text-xs text-neutral-500">
                    يمكنكِ التواصل المباشر مع مستشارة القياس والأناقة لدينا وسنساعدكِ في اختيار وتفصيل المقاس الأنسب لكِ عبر واتساب.
                  </p>
                </div>
                <button
                  id="size-guide-whatsapp-btn"
                  onClick={() => openWhatsApp(undefined, "مرحبًا تاج مُهرة، أرغب بالاستفسار والمساعدة في اختيار المقاس الأنسب لعباءتي")}
                  className="flex items-center gap-2 bg-brand-black text-white px-5 py-3 rounded-none hover:bg-neutral-800 transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider"
                >
                  <PhoneCall size={14} />
                  <span>تنسيق المقاس الفوري عبر واتساب</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-brand-border bg-white flex justify-end">
              <button
                id="close-size-guide-footer-btn"
                onClick={onClose}
                className="px-6 py-2.5 border border-brand-border rounded-none hover:bg-brand-bg transition-colors cursor-pointer text-xs font-medium text-brand-black uppercase tracking-wider"
              >
                إغلاق دليل المقاسات
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
