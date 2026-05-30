/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, Truck, Gift } from "lucide-react";
import { CartItem } from "../types";
import { openWhatsApp } from "./WhatsAppButton";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  
  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 300;
  const shippingCost = subtotal > 0 && !isFreeShipping ? 25 : 0;
  const total = subtotal + shippingCost;

  // Custom checkout formatting for WhatsApp
  const handleProceedCheckout = () => {
    if (cartItems.length === 0) return;

    let text = "مرحبًا متجر تاج مُهرة، أرغب بتأكيد وحجز طلبي من السلة الأنيقة:\n\n";
    cartItems.forEach((item, index) => {
      text += `${index + 1}. [${item.product.name}] \n`;
      text += `   - القياس المطلوب: ${item.selectedSize}\n`;
      text += `   - اللون المحدد: ${item.selectedColor.name}\n`;
      text += `   - الكمية: ${item.quantity} × ${item.product.price} ر.س\n\n`;
    });

    text += `🔹 القيمة الإجمالية للمشتريات: ${subtotal} ر.س\n`;
    text += `🔹 الشحن والتوصيل: ${isFreeShipping ? "شحن مجاني فخم" : `${shippingCost} ر.س`}\n`;
    text += `💰 المبلغ الإجمالي النهائي: ${total} ر.س\n\n`;
    text += "أتطلع لتزويدكم ببيانات العنوان ورقم الجوال للتوصيل الفوري 🤍.";

    openWhatsApp(undefined, text);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black cursor-pointer"
          />

          {/* Cart Panel Slider (RTL: slides in from LEFT or RIGHT. In Arabic view, let's slide in from right or left depending on choice.) */}
          <motion.div
            id="cart-panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="relative w-full max-w-md bg-brand-bg h-full z-10 border-r border-brand-border flex flex-col justify-between p-6 font-sans text-right"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <button
                id="close-cart-btn"
                onClick={onClose}
                className="p-1.5 hover:bg-neutral-100 transition-colors cursor-pointer text-brand-black"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-brand-gold" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-black">حقيبة التسوق</h3>
                <span className="text-[10px] bg-brand-black text-white px-2 py-0.5 font-semibold">
                  {cartItems.length}
                </span>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-5 space-y-4 no-scrollbar">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white border border-brand-border"
                  >
                    {/* Trash remove selector */}
                    <div className="flex flex-col justify-between items-center">
                      <button
                        id={`remove-cart-item-${item.id}`}
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                        title="إزالة هذا المنتج"
                      >
                        <Trash2 size={15} />
                      </button>

                      {/* Quantity Tweak */}
                      <div className="flex flex-col items-center gap-1.5 border border-brand-border bg-[#F8F6F1] py-1 px-1">
                        <button
                          id={`qty-inc-${item.id}`}
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-0.5 text-brand-black hover:bg-white cursor-pointer"
                        >
                          <Plus size={11} />
                        </button>
                        <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          id={`qty-dec-${item.id}`}
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-0.5 text-brand-black hover:bg-white cursor-pointer"
                        >
                          <Minus size={11} />
                        </button>
                      </div>
                    </div>

                    {/* Meta specifics */}
                    <div className="flex-1 space-y-1">
                      <h4 className="font-semibold text-xs text-brand-black leading-snug">
                        {item.product.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 text-[10px] text-[#9A8F86] font-medium pt-1">
                        <span className="bg-[#F8F6F1] px-2 py-0.5 border border-brand-border">
                          مقاس: <strong className="font-semibold">{item.selectedSize}</strong>
                        </span>
                        <span className="bg-[#F8F6F1] px-2 py-0.5 border border-brand-border flex items-center gap-1">
                          <span
                            className="w-2 h-2 border border-black/15 flex"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                      </div>
                      
                      {/* Price calc */}
                      <div className="pt-2 text-xs font-serif font-bold text-brand-black" style={{ fontFamily: "Georgia, serif" }}>
                        {item.product.price * item.quantity} ر.س
                      </div>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="w-20 aspect-[3/4] bg-[#F8F6F1] border border-brand-border overflow-hidden">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 space-y-4 max-w-sm mx-auto">
                  <div className="bg-[#F8F6F1] border border-brand-border w-14 h-14 flex items-center justify-center mx-auto text-brand-gold">
                    <ShoppingBag size={24} />
                  </div>
                  <h4 className="font-medium text-sm text-brand-black">حقيبة تسوقكِ فارغة تمامًا</h4>
                  <p className="text-xs text-[#9A8F86] leading-relaxed">
                    تصفحي مختاراتنا الراقية من العباءات والجلابيات والأنماط المعاصرة التي ترضي حضوركِ الفخم.
                  </p>
                  <button
                    id="back-to-shop-drawer-btn"
                    onClick={onClose}
                    className="bg-brand-black text-white text-[10px] tracking-wider uppercase px-6 py-3 hover:bg-neutral-800 transition-colors cursor-pointer font-medium"
                  >
                    ابدئي التسوق الآن
                  </button>
                </div>
              )}
            </div>

            {/* Calculations and Actions Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-brand-border pt-5 space-y-4">
                
                {/* Delivery Threshold info bar */}
                <div className="bg-[#F8F6F1] border border-brand-border p-3.5 space-y-1.5 text-right flex items-center gap-3">
                  <Gift size={16} className="text-brand-gold shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-brand-black">
                      {isFreeShipping ? "أحسنتِ! لقد حصلتِ على الشحن الفخم المجاني!" : `متبقي لكِ فقط ${300 - subtotal} ر.س لربح الشحن المجاني`}
                    </p>
                    {/* Linear Progress and Visual Indicator */}
                    <div className="w-full bg-neutral-200 h-1 overflow-hidden mt-1 max-w-[200px]">
                      <div
                        className="bg-brand-gold h-full transition-all duration-300"
                        style={{ width: `${Math.min((subtotal / 300) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Sub Total metrics */}
                <div className="space-y-2 text-xs text-brand-black font-medium font-sans">
                  <div className="flex justify-between items-center">
                    <span className="text-[#9A8F86]">مجموع القطع</span>
                    <span className="font-serif">{subtotal} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#9A8F86]">الشحن والتوصيل الفوري</span>
                    <span className="font-serif text-[#25D366]">
                      {isFreeShipping ? "شحن مجاني فخم" : "٢٥ ر.س"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider pt-2 border-t border-brand-border">
                    <span>المبلغ الكلي النهائي</span>
                    <span className="font-serif text-base text-brand-black" style={{ fontFamily: "Georgia, serif" }}>{total} ر.س</span>
                  </div>
                </div>

                {/* Confirm actions */}
                <button
                  id="checkout-cart-button"
                  onClick={handleProceedCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 font-semibold text-xs tracking-wider uppercase cursor-pointer transition-colors duration-200"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.584 3.914 1.517 5.514l-.947 3.46 3.568-.937z" />
                  </svg>
                  <span>تأكيد الطلب وشراء عبر واتساب</span>
                </button>
                
                <p className="text-[10px] text-[#9A8F86] text-center leading-relaxed">
                  بمجرد تأكيد الطلب، سيتم توجيهكِ لتطبيق واتساب لمراجعة المقاسات وألوان الطرح مع خبير الأناقة قبل الشحن للتأكد من رضاكِ التام.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
