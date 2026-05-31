/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryCard from "./components/CategoryCard";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./components/ProductDetails";
import SizeGuide from "./components/SizeGuide";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import WhatsAppButton, { openWhatsApp } from "./components/WhatsAppButton";
import AdminDashboard from "./components/AdminDashboard";
import BrandStory from "./components/BrandStory";
import InstagramGallery from "./components/InstagramGallery";
import JournalPage from "./components/JournalPage";
import AboutPage from "./components/AboutPage";
import ShippingPage from "./components/ShippingPage";
import ContactPage from "./components/ContactPage";
import Testimonials from "./components/Testimonials";
import { PRODUCTS, CATEGORIES, TRUST_BADGES } from "./data";
import { Product, CartItem } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MessageSquare, Truck, ShieldCheck, CheckCircle2, Heart, Award } from "lucide-react";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // Sync state between searches and landing page. If search is active, we reset selectedProduct so they see search results
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() !== "") {
      setSelectedProduct(null);
      setActiveSection("all");
    }
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setSelectedProduct(null);
    setSearchQuery(""); // Reset search on explicit navigation

    // If "sizing" tab is selected, handled by header to show modal, but double guard here too
    if (section === "sizing") {
      setIsSizeGuideOpen(true);
    } else if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Smooth scroll to product listings on filter change
      const el = document.getElementById("shop-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Add item to shopping cart drawer
  const handleAddToCart = (
    product: Product,
    color: { name: string; hex: string },
    size: string,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${color.name}-${size}`;
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity,
          },
        ];
      }
    });

    // Elegant feedback toast
    setToast(`تمت إضافة [${product.name}] بمقاس ${size} إلى حقيبة التسوق الخاصة بكِ ✨`);
  };

  // Handle Toast timeout safely in React 19
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Sync initial view check for admin panel parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "admin" || params.get("admin") === "true") {
      setActiveSection("admin");
    }
  }, []);

  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get matching Lucide icon helper
  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="text-brand-gold stroke-[1.5]" size={28} />;
      case "PhoneCall":
        return <MessageSquare className="text-brand-gold stroke-[1.5]" size={28} />;
      case "Sparkles":
        return <Award className="text-brand-gold stroke-[1.5]" size={28} />;
      case "Truck":
        return <Truck className="text-brand-gold stroke-[1.5]" size={28} />;
      default:
        return <Sparkles className="text-brand-gold stroke-[1.5]" size={28} />;
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (activeSection === "admin") {
    return <AdminDashboard onBackToStore={() => handleNavigate("home")} />;
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-black flex flex-col font-sans relative antialiased" style={{ direction: "rtl" }}>
      
      {/* Dynamic Floating Toast System (Rectilinear) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="fixed top-24 left-4 right-4 md:left-auto md:right-8 z-50 max-w-md bg-brand-black border border-brand-gold/30 text-[#FFF] px-6 py-4 rounded-none shadow-lg flex items-center gap-3.5"
          >
            <CheckCircle2 size={20} className="text-brand-gold shrink-0 fill-none" />
            <div className="flex-1 text-right">
              <p className="text-xs md:text-sm font-sans font-light leading-relaxed">
                {toast}
              </p>
            </div>
            <button
              id="dismiss-toast-btn"
              onClick={() => setToast(null)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Global Sizing Sheets / Modals */}
      <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      {/* Shopping Basket Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Primary Header */}
      <Header
        cartItemsCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onSizeGuideClick={() => setIsSizeGuideOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onSearch={handleSearch}
      />

      {/* Core Dynamic Content Container */}
      <main className="flex-1">
        {selectedProduct ? (
          /* Detailed Single product layout replaces hero & grids to optimize focus */
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onViewProduct={handleViewProductDetails}
          />
        ) : (
          /* Default Landing structure */
          <>
            {/* Show Hero only on Homepage view */}
            {activeSection === "home" && (
              <Hero
                onShopNowClick={() => handleNavigate("all")}
                onSeeWhatNewClick={() => handleNavigate("offers")}
              />
            )}

            {/* Featured categories list on Homepage view */}
            {activeSection === "home" && (
              <section className="py-24 bg-white border-b border-[#E7E2DA] select-none font-sans">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
                  
                  {/* Category Header */}
                  <div className="text-center max-w-xl mx-auto space-y-4">
                    <span 
                      className="text-[#C5A46D] text-[10px] uppercase tracking-[0.3em] font-serif font-light block"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      THE COUTURE PRESETS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light text-[#111111] tracking-tight leading-snug">
                      Luxury Categories • تصنيفات الأناقة
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6E6256] leading-relaxed font-light">
                      تصفّحي مجموعاتنا الحصرية المنتقاة بعناية لتعكس الهوية الساحرة لدار تاج مُهرة بلمسات متطورة.
                    </p>
                  </div>

                  {/* Categories card grid (Editorial tall cards) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {CATEGORIES.map((cat) => (
                      <CategoryCard
                        key={cat.id}
                        category={cat}
                        onClick={() => handleNavigate(cat.id)}
                        isActive={activeSection === cat.id}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Standalone Modular Page Switcher */}
            {activeSection === "journal" && <JournalPage />}
            {activeSection === "about" && <AboutPage />}
            {activeSection === "shipping" && <ShippingPage />}
            {activeSection === "contact" && <ContactPage />}

            {/* Catalog list section (Active under all catalog tabs except custom non-catalog info sections) */}
            {!["about", "journal", "shipping", "contact"].includes(activeSection) && (
              <ProductGrid
                activeSection={activeSection}
                searchQuery={searchQuery}
                onNavigate={handleNavigate}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewProductDetails}
                onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              />
            )}

            {/* Reusable Luxury About Block Segment (renders if beautifully present at the bottom of the home layout) */}
            {activeSection === "home" && (
              <BrandStory />
            )}

            {/* Testimonials Review Slider on Homepage */}
            {(activeSection === "home" || activeSection === "about") && (
              <Testimonials />
            )}

            {/* Curated Instagram Lifestyle Social Wall (Renders on homepage view below brand story) */}
            {activeSection === "home" && (
              <InstagramGallery />
            )}

            {/* Core Trust Badges (Active under all product segments to seal security) */}
            <section className="py-16 bg-[#F8F6F1]/50 border-b border-brand-border select-none font-sans">
              <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {TRUST_BADGES.map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-6 bg-white border border-brand-border text-right transition-colors duration-300 hover:border-brand-gold"
                    >
                      {/* Icon with rectilinear wrap */}
                      <div className="w-12 h-12 bg-[#F8F6F1] flex items-center justify-center shrink-0 border border-brand-border">
                        {renderBadgeIcon(badge.iconName)}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-semibold text-sm text-brand-black">
                          {badge.title}
                        </h4>
                        <p className="text-xs text-[#9A8F86] leading-relaxed font-light">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Premium Footer */}
      <Footer onNavigate={handleNavigate} onSizeGuideClick={() => setIsSizeGuideOpen(true)} />

      {/* Sticky Mobile/Desktop WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}

// Simple Helper function to render path check to close custom visual blocks
function X({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
