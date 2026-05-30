/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { getWhatsAppLink } from "./WhatsAppButton";
import { PhoneCall, Music2, ShieldCheck, Sparkles, MessageSquare } from "lucide-react";

interface FooterProps {
  onNavigate: (section: string) => void;
  onSizeGuideClick: () => void;
}

export default function Footer({ onNavigate, onSizeGuideClick }: FooterProps) {
  return (
    <footer className="bg-white border-t border-brand-border py-12 md:py-16 text-brand-black select-none font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Intro Column (4 Columns on Desktop) */}
          <div className="md:col-span-5 space-y-6 text-right">
            <div className="flex flex-col items-start text-right">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] text-brand-black block">
                TAJMUHRA
              </span>
              <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-brand-gold block mt-0.5">
                تاج مُهرة
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#9A8F86] leading-relaxed font-sans font-light max-w-sm">
              تاج مُهرة متجر يابى إلا تقديم تصاميم محتشمة راقية تجمع بين الراحة، البساطة، والتفاصيل الأنثوية الهادئة. نختار قطعنا بعناية فائقة لتناسب إطلالتك اليومية ومشاويرك الخاصة، بأسعار منافسة ملائمة وبدعم مباشر وموثوق عبر واتساب.
            </p>

            {/* Saudi Business Verification Sign / Trust labels */}
            <div className="flex items-center gap-3 text-[10px] text-[#9A8F86] font-semibold bg-[#F8F6F1] px-4 py-2.5 border border-brand-border/60 w-fit">
              <ShieldCheck size={14} className="text-[#25D366]" />
              <span>متجر مرخص سعودي موثوق عبر منصة الأعمال</span>
            </div>
          </div>

          {/* Quick Links Column (3 Columns) */}
          <div className="md:col-span-2 space-y-4 text-right">
            <h4 className="font-semibold text-xs tracking-wider uppercase text-brand-black border-b border-brand-border pb-2">
              روابط المتجر
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9A8F86] font-medium">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => onNavigate("home")}
                  className="hover:text-brand-gold transition-colors block cursor-pointer"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-all"
                  onClick={() => onNavigate("all")}
                  className="hover:text-brand-gold transition-colors block cursor-pointer"
                >
                  كل المنتجات والعباءات
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-offers"
                  onClick={() => onNavigate("offers")}
                  className="hover:text-brand-gold transition-colors block cursor-pointer"
                >
                  العروض المميزة
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-size"
                  onClick={onSizeGuideClick}
                  className="hover:text-brand-gold transition-colors block cursor-pointer"
                >
                  دليل مقاساتي (Sizeguide)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => onNavigate("about")}
                  className="hover:text-brand-gold transition-colors block cursor-pointer"
                >
                  من نحن وقصتنا
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support Links (3 Columns) */}
          <div className="md:col-span-2 space-y-4 text-right">
            <h4 className="font-semibold text-xs tracking-wider uppercase text-brand-black border-b border-brand-border pb-2">
              خدمة العملاء
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9A8F86] font-medium">
              <li>
                <a
                  id="footer-shipping-link"
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors block"
                >
                  الشحن والسياسات
                </a>
              </li>
              <li>
                <a
                  id="footer-return-link"
                  href={getWhatsAppLink(undefined, "مرحبًا، أرغب في معرفة شروط الاستبدال والاسترجاع")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors block"
                >
                  الاستبدال والاسترجاع
                </a>
              </li>
              <li>
                <button
                  id="footer-sizes-guide-secondary-btn"
                  onClick={onSizeGuideClick}
                  className="hover:text-brand-gold transition-colors block text-right cursor-pointer"
                >
                  استشيري مستشار القياس
                </button>
              </li>
              <li>
                <a
                  id="footer-business-verify-link"
                  href="https://www.tiktok.com/@tajmuhra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors block"
                >
                  قناتنا على تيك توك
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Social Media Column (3 Columns) */}
          <div className="md:col-span-3 space-y-4 text-right">
            <h4 className="font-semibold text-xs tracking-wider uppercase text-brand-black border-b border-brand-border pb-2">
              تواصل وأناقة مباشرة
            </h4>
            
            <p className="text-xs text-[#9A8F86] leading-relaxed font-light font-sans">
              نحن سعداء برغبتكن ومقترحاتكن طوال اليوم ومستعدون للرد على تساؤلاتكن مباشرة.
            </p>

            <div className="space-y-2.5">
              {/* WhatsApp direct dial */}
              <a
                id="footer-direct-wa-button"
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#F8F6F1] hover:bg-brand-black hover:text-white text-brand-black border border-brand-border/80 px-4 py-2.5 rounded-none text-xs font-semibold cursor-pointer transition-colors duration-200"
              >
                <PhoneCall size={14} className="text-[#25D366]" />
                <span className="font-mono">٠٥٠٠٤٩٥٧٣١</span>
              </a>

              {/* TikTok Profile */}
              <a
                id="footer-direct-tiktok-button"
                href="https://www.tiktok.com/@tajmuhra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#F8F6F1] hover:bg-brand-black hover:text-white text-brand-black border border-brand-border/80 px-4 py-2.5 rounded-none text-xs font-semibold cursor-pointer transition-colors duration-200 font-sans"
              >
                <Music2 size={13} className="text-brand-gold" />
                <span>@tajmuhra على تيك توك</span>
              </a>
            </div>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="mt-12 pt-6 border-t border-brand-border/60 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-[#9A8F86]">
          <p>© 2026 TAJMUHRA. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Sparkles size={11} className="text-brand-gold" />
              <span>أناقة محتشمة</span>
            </span>
            <span className="text-brand-border">|</span>
            <span>صُنع بحرفة وشغف للسعودية والخليج</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
