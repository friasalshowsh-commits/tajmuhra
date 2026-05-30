/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
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

  const navigationItems = [
    { id: "home", label: "الرئيسية" },
    { id: "all", label: "كل المنتجات" },
    { id: "abayas", label: "العباءات" },
    { id: "colors", label: "الألوان الهادئة" },
    { id: "offers", label: "العروض " },
    { id: "sizing", label: "المقاسات" },
    { id: "about", label: "من نحن" },
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
    <header className="sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
      {/* Promo Announcement Banner */}
      <div className="bg-brand-navy text-white text-[11px] py-2 text-center tracking-widest font-sans font-light border-b border-brand-border/10">
        <span>شحن مجاني داخل المملكة للطلبات الأكثر من ٥٠٠ ريال</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Right Column: Menu Button (Mobile) & Desktop Navigation Links */}
          <div className="flex items-center gap-2 lg:gap-6 w-1/3 lg:w-auto">
            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-trigger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 lg:hidden border border-brand-border bg-white hover:bg-neutral-50 transition-colors text-brand-black cursor-pointer"
              title="القائمة"
            >
              <Menu size={20} />
            </button>

            {/* Desktop Nav Items */}
            <nav className="hidden lg:flex items-center gap-6 font-sans text-[13px] font-medium text-brand-black">
              {navigationItems.map((item) => (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative py-1 cursor-pointer transition-colors duration-200 hover:text-brand-gold ${
                    activeSection === item.id || (item.id === "all" && activeSection.startsWith("cat_"))
                      ? "text-brand-gold font-semibold"
                      : "text-brand-black/80"
                  }`}
                >
                  {item.label}
                  {(activeSection === item.id || (item.id === "all" && activeSection.startsWith("cat_"))) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-brand-gold"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Centered Column: Logo */}
          <div className="flex-1 lg:flex-none text-center flex flex-col items-center justify-center">
            <button
              id="header-logo-button"
              onClick={() => onNavigate("home")}
              className="group flex flex-col items-center select-none cursor-pointer"
            >
              <span className="font-serif text-2xl md:text-3xl font-normal tracking-[0.2em] transition-all duration-300 text-brand-black group-hover:text-brand-gold pr-[0.2em]" style={{ fontFamily: "'Times New Roman', serif" }}>
                TAJMUHRA
              </span>
              <span className="font-sans text-[10px] md:text-xs font-light tracking-[0.3em] text-[#9A8F86] group-hover:text-brand-navy transition-colors duration-300 mt-1 max-sm:mr-1 pr-[0.3em]">
                تاج مُهرة
              </span>
            </button>
          </div>

          {/* Left Column: Actions / Basket / Desktop WA */}
          <div className="flex items-center justify-end gap-2 md:gap-4 w-1/3 lg:w-auto">
            {/* Search Input expander */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.input
                    id="search-input-box"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="ابحثي عن عباءة، جلابية..."
                    value={searchText}
                    onChange={handleSearchChange}
                    className="bg-white border border-brand-border text-brand-black text-xs px-3 py-1.5 pl-8 outline-none focus:border-brand-gold font-sans transition-all"
                  />
                )}
              </AnimatePresence>
              <button
                id="search-trigger-btn"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="p-1.5 border border-transparent hover:border-brand-border bg-transparent hover:bg-white transition-all text-brand-black cursor-pointer"
                title="البحث"
              >
                {isSearchExpanded ? <X size={16} /> : <Search size={18} />}
              </button>
            </div>

            {/* Account Placeholder */}
            <button
              id="user-account-btn"
              onClick={() => onNavigate("about")}
              className="p-1.5 border border-transparent hover:border-brand-border bg-transparent hover:bg-white transition-all text-brand-black cursor-pointer hidden md:flex"
              title="دليل المتجر"
            >
              <User size={18} />
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="shopping-cart-trigger-btn"
              onClick={onCartClick}
              className="p-1.5 border border-transparent hover:border-brand-border bg-transparent hover:bg-white transition-all text-[#9A8F86] hover:text-brand-black cursor-pointer relative"
              title="حقيبة التسوق"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -left-1 bg-brand-gold text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-none border border-brand-bg shadow-sm"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Desktop WhatsApp Action */}
            <a
              id="desktop-whatsapp-link"
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-white text-brand-black border border-brand-border hover:bg-brand-black hover:text-white px-4 py-2 text-[11px] font-sans font-medium cursor-pointer transition-all uppercase tracking-wider"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.584 3.914 1.517 5.514l-.947 3.46 3.568-.937z" />
              </svg>
              <span>تواصلي عبر واتساب</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sliding Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-black object-cover"
            />

            {/* Content Drawer */}
            <motion.div
              id="mobile-drawer-content"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-[80vw] max-w-xs bg-brand-bg h-full z-10 shadow-2xl flex flex-col justify-between p-6 border-l border-brand-border"
            >
              <div className="space-y-8">
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
                  <div className="text-right">
                    <span className="font-serif text-lg font-bold tracking-widest text-brand-black pr-1 block">
                      TAJMUHRA
                    </span>
                    <span className="font-sans text-[9px] tracking-[0.2em] text-brand-taupe pr-1 block">
                      تاج مُهرة
                    </span>
                  </div>
                  <button
                    id="close-mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-brand-black"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex flex-col gap-5 text-right font-sans text-base font-medium">
                  {navigationItems.map((item) => (
                    <button
                      id={`mobile-nav-link-${item.id}`}
                      key={item.id}
                      onClick={() => handleLinkClick(item.id)}
                      className={`py-1 right-0 text-right cursor-pointer flex justify-between items-center transition-all ${
                        activeSection === item.id || (item.id === "all" && activeSection.startsWith("cat_"))
                          ? "text-brand-gold font-bold pr-2 border-r-2 border-brand-gold"
                          : "text-brand-black/90 hover:text-brand-gold"
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
                  className="w-full flex justify-center items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full text-sm font-semibold cursor-pointer shadow-md"
                >
                  <PhoneCall size={16} />
                  <span>تواصلي مباشر عبر واتساب</span>
                </a>
                <p className="text-[10px] text-brand-taupe leading-relaxed text-center">
                  أناقة محتشمة تجمع بين بساطة الألوان وفخامة الخامات. متجر تاج مُهرة رفيق طلتكِ المشرقة.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
