/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Phone } from "lucide-react";
import { motion } from "motion/react";

const PHONE_NUMBER = "966500495731"; // Saudi Arabia international format for 0500495731

export function getWhatsAppLink(productName?: string, customText?: string) {
  let text = "مرحبًا، تاج مُهرة. أرغب في الاستفسار عن تصاميمكم الراقية.";
  if (productName) {
    text = `مرحبًا، أرغب بطلب هذا المنتج من تاج مُهرة: [${productName}]`;
  } else if (customText) {
    text = customText;
  }
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(productName?: string, customText?: string) {
  const link = getWhatsAppLink(productName, customText);
  window.open(link, "_blank", "noopener,noreferrer");
}

export default function WhatsAppButton() {
  return (
    <motion.button
      id="floating-whatsapp-btn"
      onClick={() => openWhatsApp()}
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5,
      }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-5 py-3.5 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 font-medium text-sm md:text-base cursor-pointer"
      title="تواصلي معنا عبر واتساب"
    >
      <Phone size={20} className="fill-current animate-bounce" />
      <span className="font-sans font-semibold tracking-wide">
        اطلبي عبر واتساب
      </span>
    </motion.button>
  );
}
