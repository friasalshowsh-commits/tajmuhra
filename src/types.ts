/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  longDescription: string;
  price: number;
  unit: string;
  imageUrl: string;
  category: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabricDetails: string[];
  careInstructions: string[];
  shippingDetails: string[];
}

export interface CartItem {
  id: string; // unique for item + color + size
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  quantity: number;
}

export interface SizeInfo {
  size: string;
  length: string; // الطول
  chest: string;  // الصدر
  waist: string;  // الخصر
  sleeve: string; // الكم
  notes: string;  // ملاحظات
}
