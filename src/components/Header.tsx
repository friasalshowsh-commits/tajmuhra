/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  PhoneCall,
  ChevronDown,
} from "lucide-react";
import { getWhatsAppLink } from "./WhatsAppButton";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSizeGuideClick: () => void;
  onNavigate: (tab: string) => void;
  activeSection: string;
  onSearch: (text: string) => void;
}

export default function Header({
  cartItemsCount,
  onCartClick,
  onSizeGuideClick,
  onNavigate,
  activeSection,
  onSearch,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { id: "home", label: "الرئيسية" },
    { id: "all", label: "كل المجموعات" },
    { id: "journal", label: "مجلة الدار" },
    { id: "sizing", label: "دليل المقاسات" },
    { id: "shipping", label: "الشحن والاسترجاع" },
    { id: "about", label: "قصة الدار" },
    { id: "contact", label: "اتصلي بنا" },
    { id: "admin", label: "لوحة التحكم" },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === "sizing") {
      onSizeGuideClick();
    } else {
      onNavigate(id);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);
    onSearch(val);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-[#FAF8F4]/95 backdrop-blur-md border-brand-border py-2 md:py-3 shadow-[0_1px_5px_rgba(0,0,0,0.02)]"
            : "bg-[#FAF8F4]/30 backdrop-blur-sm md:backdrop-blur-none md:bg-transparent border-transparent py-4 md:py-6"
        }`}
      >
        {/* Promo Announcement Banner */}
        <div className="bg-[#111111] text-white text-[10px] py-1.5 text-center uppercase tracking-[0.25em] font-serif font-light">
          <span>شحن مجاني لجميع مناطق المملكة الكبرى لطلبات العباءات والقطع</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Top Deck: Action / Centered Logo / Account */}
          <div className="flex items-center justify-between gap-4">
            
            {/* Right End Action (Desktop Search / Mobile Menu) */}
            <div className="flex items-center gap-4 w-1/3 justify-start">
              {/* Mobile Menu Toggle */}
              <button
                id="mobile-menu-trigger-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 lg:hidden border border-brand-border bg-white hover:bg-neutral-50 transition-colors text-brand-black cursor-pointer"
                title="القائمة"
              >
                <Menu size={18} />
              </button>

              {/* Desktop Search Expander */}
              <div className="hidden lg:flex items-center relative">
                <AnimatePresence>
                  {isSearchExpanded && (
                    <motion.input
                      id="search-input-box"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 190, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      type="text"
                      placeholder="ابحثي عن عباءة، جلابية..."
                      value={searchText}
                      onChange={handleSearchChange}
                      className="bg-transparent border-b border-brand-border text-brand-black text-xs px-3 py-1 outline-none focus:border-brand-gold font-sans transition-all text-right"
                    />
                  )}
                </AnimatePresence>
                <button
                  id="search-trigger-btn"
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="p-1 px-2 text-brand-black cursor-pointer hover:text-brand-gold transition-colors flex items-center gap-1.5"
                  title="البحث"
                >
                  {isSearchExpanded ? <X size={15} /> : <Search size={16} />}
                </button>
              </div>
            </div>

            {/* Exactly Centered Logo */}
            <div className="w-1/3 flex justify-center">
              <button
                id="header-logo-button"
                onClick={() => onNavigate("home")}
                className="group flex flex-col items-center select-none cursor-pointer"
              >
                <span
                  className="font-serif text-2xl md:text-3.5xl font-light tracking-[0.25em] text-[#111111] group-hover:text-brand-gold transition-colors duration-400 text-center pl-[0.25em]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  TAJMUHRA
                </span>
                <span className="font-sans text-[10px] tracking-[0.35em] text-[#6E6256] group-hover:text-brand-gold transition-colors duration-400 mt-1 uppercase">
                  تاج مُهرة
                </span>
              </button>
            </div>

            {/* Left End Actions (Cart & Support Contacts) */}
            <div className="flex items-center justify-end gap-3 md:gap-5 w-1/3">
              {/* Search on Mobile screen */}
              <div className="lg:hidden relative flex items-center">
                <AnimatePresence>
                  {isSearchExpanded && (
                    <motion.input
                      id="search-input-box-mobile"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 120, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      type="text"
                      placeholder="ابحثي..."
                      value={searchText}
                      onChange={handleSearchChange}
                      className="bg-white border border-brand-border text-brand-black text-[10px] px-2 py-1 outline-none text-right font-sans"
                    />
                  )}
                </AnimatePresence>
                <button
                  id="search-trigger-btn-mobile"
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="p-1.5 text-brand-black cursor-pointer"
                >
                  {isSearchExpanded ? <X size={14} /> : <Search size={15} />}
                </button>
              </div>

              {/* Guide/Profile */}
              <button
                id="user-account-btn"
                onClick={() => onNavigate("about")}
                className="p-1 text-brand-black hover:text-brand-gold transition-colors cursor-pointer hidden md:block"
                title="دليل المتجر"
              >
                <User size={16} />
              </button>

              {/* Shopping Bag */}
              <button
                id="shopping-cart-trigger-btn"
                onClick={onCartClick}
                className="p-1 text-brand-black hover:text-brand-gold transition-all cursor-pointer relative flex items-center justify-center"
                title="حقيبة التسوق"
              >
                <ShoppingBag size={16} />
                <AnimatePresence>
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -left-1.5 bg-[#C5A46D] text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-none border border-[#FAF8F4]"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Contact Link */}
              <a
                id="desktop-whatsapp-link"
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 bg-transparent text-[#111111] border border-[#111111] hover:bg-brand-black hover:text-[#FAF8F4] px-4.5 py-1.5 text-[11px] font-sans font-medium cursor-pointer transition-colors uppercase tracking-widest"
              >
                <span>واتساب</span>
              </a>
            </div>
          </div>

          {/* Bottom Deck: Simple Beautiful Navigation Menus (Desktop only) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 mt-5 pb-1 font-sans text-xs uppercase tracking-widest text-brand-black">
            {navigationItems.map((item) => (
              <button
                id={`nav-link-${item.id}`}
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`relative py-1 cursor-pointer transition-colors duration-300 hover:text-brand-gold font-light ${
                  activeSection === item.id || (item.id === "all" && activeSection.startsWith("cat_"))
                    ? "text-[#C5A46D] font-medium"
                    : "text-[#111111]/80"
                }`}
              >
                {item.label}
                {(activeSection === item.id || (item.id === "all" && activeSection.startsWith("cat_"))) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 right-0 left-0 h-[1px] bg-brand-gold"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Sliding Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40"
            />

            {/* Content Drawer */}
            <motion.div
              id="mobile-drawer-content"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="relative w-[75vw] max-w-xs bg-[#FAF8F4] h-full z-15 shadow-xl flex flex-col justify-between p-6 border-l border-brand-border text-right"
            >
              <div className="space-y-6">
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
                  <div className="text-right">
                    <span
                      className="font-serif text-lg font-light tracking-widest text-[#111111] pr-1 block"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      TAJMUHRA
                    </span>
                    <span className="font-sans text-[9px] tracking-[0.25em] text-[#6E6256] pr-1 block mt-0.5">
                      تاج مُهرة
                    </span>
                  </div>
                  <button
                    id="close-mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 hover:bg-neutral-100 transition-colors cursor-pointer text-[#111111]"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex flex-col gap-4 text-right font-sans text-sm font-light">
                  {navigationItems.map((item) => (
                    <button
                      id={`mobile-nav-link-${item.id}`}
                      key={item.id}
                      onClick={() => handleLinkClick(item.id)}
                      className={`py-1.5 right-0 text-right cursor-pointer flex justify-between items-center transition-all ${
                        activeSection === item.id || (item.id === "all" && activeSection.startsWith("cat_"))
                          ? "text-brand-gold font-medium pr-2 border-r-2 border-[#C5A46D]"
                          : "text-[#111111]/90 hover:text-brand-gold"
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Drawer Mobile Footer info */}
              <div className="space-y-4 border-t border-brand-border pt-6 mt-10 font-sans">
                <a
                  id="mobile-drawer-whatsapp-btn"
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center gap-2 bg-[#111111] text-white px-4 py-3 text-xs tracking-wider cursor-pointer font-light transition-colors hover:bg-neutral-800"
                >
                  <PhoneCall size={14} />
                  <span>تنسيق الطلبات عبر واتساب</span>
                </a>
                <p className="text-[10px] text-[#6E6256] leading-relaxed text-center font-light">
                  أناقة محتشمة تجمع بين التفرد وبساطة الأقمشة والقصات. دار تاج مُهرة للأناقة والعباءات.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
