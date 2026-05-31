/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { getWhatsAppLink } from "./WhatsAppButton";
import {
  PhoneCall,
  Instagram,
  Music2,
  ShieldCheck,
  Sparkles,
  BookOpen,
  ArrowUp,
  Landmark,
  Shield,
  HelpCircle
} from "lucide-react";

interface FooterProps {
  onNavigate: (section: string) => void;
  onSizeGuideClick: () => void;
}

export default function Footer({ onNavigate, onSizeGuideClick }: FooterProps) {
  
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF8F4] border-t border-[#E7E2DA] py-20 md:py-28 text-[#111111] select-none font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Top Section with Logo Centering and Scroll top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#E7E2DA]/65">
          <div className="text-right flex flex-col items-center md:items-start">
            <span 
              className="font-serif text-2xl md:text-3.5xl font-light tracking-[0.25em] text-[#111111] block pl-[0.25em]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              TAJMUHRA
            </span>
            <span className="font-sans text-[10px] tracking-[0.35em] text-[#C5A46D] block mt-1 uppercase">
              تاج مُهرة للأناقة والعباءات
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              id="footer-scroll-top-btn"
              onClick={handleScrollTop}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#6E6256] hover:text-[#111111] transition-colors cursor-pointer border border-[#E7E2DA] px-4 py-2.5 bg-white"
            >
              <span>العودة للأعلى</span>
              <ArrowUp size={11} className="text-[#C5A46D]" />
            </button>
          </div>
        </div>

        {/* Core Nav Split Grid (4 Column layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 text-right">
          
          {/* Col 1: Brand manifesto (5 Columns) */}
          <div className="md:col-span-5 space-y-6">
            <span className="text-[#C5A46D] text-[10px] uppercase tracking-widest font-serif font-light block">
              THE HOUSE NARRATIVE
            </span>
            <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-light max-w-sm">
              تلتزم دار تاج مُهرة بتفصيل وحياكة أرقى العباءات والجلابيات مستندين إلى جودة منسوجات الكريب الملكية، دقة العمل اليدوي، والتغليف الفاخر الذي يليق بتقديرك ومناسباتكِ الاستثنائية بالمملكة العربية السعودية والخليج العربي.
            </p>
            
            {/* Business Verification License logo */}
            <div className="inline-flex items-center gap-2.5 text-[10px] text-[#6E6256] font-light bg-white border border-[#E7E2DA] px-4 py-2.5">
              <ShieldCheck size={13} className="text-[#C5A46D]" />
              <span>متجر مرخص ومسجل كليًا عبر منصة المركز السعودي للأعمال</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 Columns) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-light text-[11px] tracking-[0.2em] uppercase text-[#111111] border-b border-[#E7E2DA]/80 pb-2">
              علامات ومجموعات الدار
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6E6256] font-light">
              <li>
                <button
                  id="foot-link-home"
                  onClick={() => onNavigate("home")}
                  className="hover:text-[#C5A46D] transition-colors cursor-pointer text-right w-full block"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  id="foot-link-all"
                  onClick={() => onNavigate("all")}
                  className="hover:text-[#C5A46D] transition-colors cursor-pointer text-right w-full block"
                >
                  كل القطع والعباءات
                </button>
              </li>
              <li>
                <button
                  id="foot-link-about"
                  onClick={() => onNavigate("about")}
                  className="hover:text-[#C5A46D] transition-colors cursor-pointer text-right w-full block"
                >
                  من نحن والقيمة
                </button>
              </li>
              <li>
                <button
                  id="foot-link-journal"
                  onClick={() => onNavigate("journal")}
                  className="hover:text-[#C5A46D] transition-colors cursor-pointer text-right w-full block"
                >
                  ثقافة الدار (Journal)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sizing and Returns (2 Columns) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-light text-[11px] tracking-[0.2em] uppercase text-[#111111] border-b border-[#E7E2DA]/80 pb-2">
              العملاء والدعم
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6E6256] font-light">
              <li>
                <button
                  id="foot-link-sizing"
                  onClick={onSizeGuideClick}
                  className="hover:text-[#C5A46D] transition-colors cursor-pointer text-right w-full block"
                >
                  دليل ومستشار القياسات
                </button>
              </li>
              <li>
                <button
                  id="foot-link-shipping"
                  onClick={() => onNavigate("shipping")}
                  className="hover:text-[#C5A46D] transition-colors cursor-pointer text-right w-full block"
                >
                  الشحن والتبديل السهل
                </button>
              </li>
              <li>
                <button
                  id="foot-link-contact"
                  onClick={() => onNavigate("contact")}
                  className="hover:text-[#C5A46D] transition-colors cursor-pointer text-right w-full block"
                >
                  لحجز موعد الأتيليه
                </button>
              </li>
              <li>
                <button
                  id="foot-link-admin"
                  onClick={() => onNavigate("admin")}
                  className="text-[#C5A46D] hover:text-[#111111] transition-colors cursor-pointer text-right w-full block"
                >
                  لوحة إدارة الطلبيات
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Accounts (3 Columns) */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="font-light text-[11px] tracking-[0.2em] uppercase text-[#111111] border-b border-[#E7E2DA]/80 pb-2">
              قنوات ومجتمع الدار
            </h4>
            <p className="text-xs text-[#6E6256] leading-relaxed font-light">
              شاركينا إطلالتكِ الفريدة، وتصفحي تصاميمنا الأسبوعية ولقطات الكواليس عبر حساباتنا الموثقة.
            </p>
            
            <div className="flex gap-4.5 justify-start">
              {/* Instagram */}
              <a
                id="footer-insta-circle"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none border border-[#E7E2DA] bg-white text-[#111111] hover:text-[#C5A46D] hover:border-[#C5A46D] transition-all flex items-center justify-center cursor-pointer shadow-xs"
                title="Instagram"
              >
                <Instagram size={15} />
              </a>

              {/* TikTok */}
              <a
                id="footer-tiktok-circle"
                href="https://www.tiktok.com/@tajmuhra"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none border border-[#E7E2DA] bg-white text-[#111111] hover:text-[#C5A46D] hover:border-[#C5A46D] transition-all flex items-center justify-center cursor-pointer shadow-xs"
                title="TikTok"
              >
                <Music2 size={15} />
              </a>

              {/* WhatsApp direct customer line */}
              <a
                id="footer-wa-circle"
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none border border-[#E7E2DA] bg-white text-[#111111] hover:text-[#C5A46D] hover:border-[#C5A46D] transition-all flex items-center justify-center cursor-pointer shadow-xs"
                title="WhatsApp"
              >
                <PhoneCall size={14} className="text-[#C5A46D]" />
              </a>
            </div>

            <p className="text-[10px] text-[#9A8F86] font-light">
              هاتف تنسيق المقاس الكلي: <span className="font-mono">٠٥٠٠٤٩٥٧٣١</span>
            </p>
          </div>

        </div>

        {/* Bottom licensing info */}
        <div className="mt-16 pt-8 border-t border-[#E7E2DA]/60 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-[11px] text-[#6E6256] font-light">
          <p>© {new Date().getFullYear()} TAJMUHRA COUTURE. متاح شحن مجاني لكافة أطياف المملكة الخليجية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 text-right">
            <span className="flex items-center gap-1.5 text-[#C5A46D] font-medium">
              <Sparkles size={11} className="animate-spin" style={{ animationDuration: '6s' }} />
              <span>هوية الدير الكلاسيكية الفاخرة</span>
            </span>
            <span className="text-[#E7E2DA]">|</span>
            <span>بواسطة الأتيليه الخاص</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
