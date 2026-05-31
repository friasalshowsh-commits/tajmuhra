import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Image as ImageIcon,
  DollarSign,
  Package,
  FolderOpen,
  Tags,
  Sliders,
  Globe,
  Truck,
  Info,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Sparkles,
  Save,
  ArrowRight,
  Trash2,
  Eye,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Upload,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface AddProductPageProps {
  onSave: (newProduct: any) => void;
  onCancel: () => void;
}

export default function AddProductPage({ onSave, onCancel }: AddProductPageProps) {
  // Stepper indices range from 0 to 7 (8 Sections)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [highestStepReached, setHighestStepReached] = useState<number>(0);

  // Success indicator state
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // --- SECTION STATES ---

  // 1. Product Information
  const [nameAr, setNameAr] = useState("عباءة المها المخملية الراقية");
  const [nameEn, setNameEn] = useState("RAW AL-MAHA LUXURY VELVET ABAYA");
  const [shortDesc, setShortDesc] = useState("عباءة مخملية ناعمة مصممة بنقوش ذهبية مستوحاة من التراث العربي الأصيل وكسرات ملكية.");
  
  // Rich Text Editor State
  const [editorHtml, setEditorHtml] = useState(
    "<p>تصميم فاخر جداً يجمع بين الدفء والفخامة الملكية لليالي الشتاء والمناسبات الكبرى.</p><p><strong>مميزات القطعة:</strong></p><ul><li>حياكة فاخرة من المخمل الكوري الثقيل المعالج.</li><li>تطريز يدوي على طول الأكمام بخيوط القصب المذهبة الأصلية.</li><li>قصة انسيابية كلوش مريحة وملحقاتها تتضمن طرحة حرير كريب مجانية.</li></ul>"
  );
  const [isEditorRaw, setIsEditorRaw] = useState(false);
  const [designerNote, setDesignerNote] = useState("تصميم حصري محدود الإصدار من تشكيلة الشتاء الفاخرة.");

  // 2. Product Images
  // Pre-populate with a couple of existing gorgeous image templates from data.ts
  const [images, setImages] = useState([
    { id: "img-1", url: PRODUCTS[0]?.imageUrl || "", name: "إطلالة الصدر والياقة.jpg", isPrimary: true },
    { id: "img-2", url: PRODUCTS[2]?.imageUrl || "", name: "تفاصيل التطريز والأكمام.jpg", isPrimary: false },
    { id: "img-3", url: PRODUCTS[4]?.imageUrl || "", name: "القصة الملكية من الخلف.jpg", isPrimary: false }
  ]);
  const [dragOverZone, setDragOverZone] = useState(false);

  // 3. Pricing
  const [basePrice, setBasePrice] = useState<number>(240);
  const [comparePrice, setComparePrice] = useState<number>(380);
  const [costPerItem, setCostPerItem] = useState<number>(95);

  // 4. Inventory
  const [sku, setSku] = useState("TM-VEL-901");
  const [barcode, setBarcode] = useState("6283300994121");
  const [trackInventory, setTrackInventory] = useState(true);
  const [inventoryCount, setInventoryCount] = useState(24);
  const [lowStockAlert, setLowStockAlert] = useState(5);
  const [continueSellingOutOfStock, setContinueSellingOutOfStock] = useState(false);

  // 5. Categories & Collections
  const [category, setCategory] = useState("عباءات سوداء");
  const [collection, setCollection] = useState("تشكيلة الشتاء الملكية");
  const [tags, setTags] = useState<string[]>(["مخمل", "تطريز ذهبي", "إصدار_محدود", "شتاء_٢٠٢٦"]);
  const [newTagInput, setNewTagInput] = useState("");

  // 6. Product Variants
  // Selection templates
  const [variantSizes, setVariantSizes] = useState<string[]>(["S", "M", "L", "XL"]);
  const [variantColors, setVariantColors] = useState<string[]>(["أسود ملكي", "كحلي هادئ"]);
  const [variantsGenerated, setVariantsGenerated] = useState<any[]>([
    { id: "v-1", size: "S", color: "أسود ملكي", price: 240, sku: "TM-VEL-901-S-BLK", stock: 10 },
    { id: "v-2", size: "M", color: "أسود ملكي", price: 240, sku: "TM-VEL-901-M-BLK", stock: 8 },
    { id: "v-3", size: "L", color: "أسود ملكي", price: 240, sku: "TM-VEL-901-L-BLK", stock: 6 },
    { id: "v-4", size: "S", color: "كحلي هادئ", price: 260, sku: "TM-VEL-901-S-NAV", stock: 5 },
    { id: "v-5", size: "M", color: "كحلي هادئ", price: 265, sku: "TM-VEL-901-M-NAV", stock: 4 }
  ]);
  const [newSizeOption, setNewSizeOption] = useState("");
  const [newColorOption, setNewColorOption] = useState("");

  // 7. SEO Settings
  const [seoTitle, setSeoTitle] = useState("عباءة المها المخملية الراقية | تاج مُهرة للأزياء");
  const [seoDescription, setSeoDescription] = useState("اكتشفي فخامة عباءة المها المخملية بقماشها الشتوي الفاخر وتطريزاتها الذهبية الملفتة. شحن مجاني وتوصيل سريع بجميع مدن المملكة.");
  const [seoSlug, setSeoSlug] = useState("almaha-royal-velvet-abaya");

  // 8. Shipping Settings
  const [weight, setWeight] = useState<number>(0.85); // in kg
  const [dimsLength, setDimsLength] = useState<number>(45); // l in cm
  const [dimsWidth, setDimsWidth] = useState<number>(35);  // w in cm
  const [dimsHeight, setDimsHeight] = useState<number>(12);  // h in cm
  const [packagingType, setPackagingType] = useState("صندوق مخملي خشبي معطر ومربوط بشريط ذهبي");
  const [requiresSpecialHandling, setRequiresSpecialHandling] = useState(true);

  // Sync SEO elements to content changes by default
  useEffect(() => {
    if (nameAr) {
      setSeoTitle(`${nameAr} | دار تاج مُهرة`);
    }
    if (shortDesc) {
      setSeoDescription(shortDesc);
    }
    if (nameEn) {
      setSeoSlug(
        nameEn
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  }, [nameAr, nameEn, shortDesc]);

  // Track stepper progress
  useEffect(() => {
    if (currentStep > highestStepReached) {
      setHighestStepReached(currentStep);
    }
  }, [currentStep, highestStepReached]);

  // Real-time automatic margin calculation
  const calculatedProfit = basePrice - costPerItem;
  const calculatedMargin = basePrice > 0 ? ((calculatedProfit / basePrice) * 100).toFixed(1) : "0";

  // Stepper descriptions configuration
  const stepsConfig = [
    { id: 0, title: "معلومات المنتج الأساسية", sub: "الاسم، الوصف، والميزة التسويقية" },
    { id: 1, title: "ألبوم صور القطعة العلوية", sub: "إدارة صور المنتج المميزة والترتيب" },
    { id: 2, title: "سياسة التسعير الفاخرة", sub: "هامش الربح، السعر المقارن والتكاليف" },
    { id: 3, title: "تفاصيل المخزون والترميز", sub: "SKU، الباركود وإعدادات المستودع" },
    { id: 4, title: "التصنيف والوسوم الذكية", sub: "الفئة، المجموعات والمفاتيح المعيارية" },
    { id: 5, title: "خيارات الموديلات والمقاسات", sub: "المولد التلقائي للفروق والمتغيرات" },
    { id: 6, title: "إعدادات محركات البحث SEO", sub: "الرابط، العناوين ونظرة محرك بحث جوجل" },
    { id: 7, title: "خيارات الشحن والتعبئة", sub: "أوزان الشحن والتغليف النخبوي" }
  ];

  // Move up/down logic for reordering images
  const moveImage = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const reordered = [...images];
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;
    setImages(reordered);
  };

  // Mark Primary Image
  const setPrimaryImage = (id: string) => {
    setImages(prev =>
      prev.map(img => ({
        ...img,
        isPrimary: img.id === id
      }))
    );
  };

  // Add dummy image on file drop/select to keep it interactive
  const handleAddMockImage = () => {
    const randomProductImg = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]?.imageUrl || PRODUCTS[0]?.imageUrl;
    const newId = `img-${Date.now()}`;
    const newImgItem = {
      id: newId,
      url: randomProductImg,
      name: `نموذج_جلسة_تصوير_${images.length + 1}.jpg`,
      isPrimary: images.length === 0
    };
    setImages(prev => [...prev, newImgItem]);
  };

  // Handle drag and drop simulation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverZone(true);
  };

  const handleDragLeave = () => {
    setDragOverZone(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverZone(false);
    handleAddMockImage();
  };

  // Delete an image
  const deleteImage = (id: string) => {
    const remaining = images.filter(img => img.id !== id);
    if (remaining.length > 0) {
      // Re-assign primary if deleted one was primary
      const deletedWasPrimary = images.find(img => img.id === id)?.isPrimary;
      if (deletedWasPrimary) {
        remaining[0].isPrimary = true;
      }
    }
    setImages(remaining);
  };

  // Variant generator logic
  const handleGenerateVariants = () => {
    if (variantSizes.length === 0 || variantColors.length === 0) {
      alert("الرجاء إضافة خيار مقاس ولون واحد على الأقل للتوليد.");
      return;
    }
    const temp: any[] = [];
    variantSizes.forEach((size, szIdx) => {
      variantColors.forEach((color, colIdx) => {
        const skuSuffix = `${size}-${colIdx === 0 ? "BLK" : colIdx === 1 ? "NAV" : "OTR"}`;
        temp.push({
          id: `v-custom-${szIdx}-${colIdx}-${Date.now()}`,
          size,
          color,
          price: basePrice,
          sku: `${sku || "TM-V"}-${skuSuffix}`,
          stock: 12
        });
      });
    });
    setVariantsGenerated(temp);
  };

  // Edit individual variant inline
  const updateVariant = (id: string, field: string, value: any) => {
    setVariantsGenerated(prev =>
      prev.map(v => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  // Remove variant key
  const removeVariantRow = (id: string) => {
    setVariantsGenerated(prev => prev.filter(v => v.id !== id));
  };

  // Add custom size/color tags
  const addSizeOption = () => {
    if (newSizeOption && !variantSizes.includes(newSizeOption)) {
      setVariantSizes(prev => [...prev, newSizeOption]);
      setNewSizeOption("");
    }
  };

  const addColorOption = () => {
    if (newColorOption && !variantColors.includes(newColorOption)) {
      setVariantColors(prev => [...prev, newColorOption]);
      setNewColorOption("");
    }
  };

  // Tag helper
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagInput && !tags.includes(newTagInput)) {
      setTags(prev => [...prev, newTagInput]);
      setNewTagInput("");
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(prev => prev.filter(item => item !== t));
  };

  // Rich Text Markup helper
  const appendRichText = (tag: string) => {
    let tagValue = "";
    if (tag === "bold") tagValue = "<strong>نص عريض</strong>";
    if (tag === "italic") tagValue = "<em>نص مائل</em>";
    if (tag === "bullet") tagValue = "<ul><li>نقطة أولى جديدة</li><li>نقطة ثانية جديدة</li></ul>";
    if (tag === "quote") tagValue = "<blockquote>«اقتباس لتصميم العباية الأنيق هنا»</blockquote>";
    setEditorHtml(prev => prev + tagValue);
  };

  // Main Submit handler
  const handleFinalSave = () => {
    if (!nameAr || !sku) {
      alert("الرجاء استكمال الاسم باللغة العربية والخطوات الإلزامية.");
      return;
    }

    const payload = {
      name: nameAr,
      nameEn: nameEn,
      description: shortDesc,
      longDescription: editorHtml,
      price: Number(basePrice),
      compareAtPrice: Number(comparePrice),
      costPerItem: Number(costPerItem),
      unit: "ر.س",
      imageUrl: images.find(img => img.isPrimary)?.url || PRODUCTS[0]?.imageUrl || "",
      category: category,
      sku: sku,
      barcode: barcode,
      inventory: Number(inventoryCount),
      status: "Active",
      colors: variantColors.map(c => ({ name: c, hex: c === "أسود ملكي" ? "#111111" : "#0B1F3A" })),
      sizes: variantSizes,
      fabricDetails: [
        `خامة فاخرة: ${designerNote || "تفاصيل الدار"}`,
        `درجة التطريز: حياكة حرير يدويّة خاصة`,
        `الوزن: ${weight} كجم`
      ],
      careInstructions: [
        `تنظيف جاف وكي بالبخار للحفاظ على القطعة الفنية`
      ],
      shippingDetails: [
        `توصيل في صندوق: ${packagingType}`,
        `التزام بالتوصيل: شحن نخبوي معزز خاضع للتأمين`
      ],
      seo: {
        title: seoTitle,
        description: seoDescription,
        slug: seoSlug
      },
      variants: variantsGenerated
    };

    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onSave(payload);
    }, 1800);
  };

  return (
    <div className="space-y-6 text-right select-none animate-fade-in" style={{ direction: "rtl" }}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-[#0D0D0D] border border-[#C8A96B] px-6 py-4 shadow-2xl z-[100] flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#C8A96B]">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-white text-xs font-bold font-serif leading-none">نجحت عملية الحفظ النخبوية والربط</p>
              <p className="text-zinc-500 text-[10px] mt-1 font-sans">تم إكمال كافة مقاييس الجودة وإدراج عباءة {nameAr} بسلام.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-neutral-900">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-sans">
            <span className="hover:text-zinc-400 cursor-pointer" onClick={onCancel}>المخازن والمعروضات</span>
            <span>/</span>
            <span className="text-[#C8A96B] font-medium font-serif">حياكة وتفصيل قطعة جديدة</span>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-serif text-white tracking-wide font-bold">نموذج إضافة منتج نخبوي جديد للكتالوج</h3>
            <span className="text-[10px] bg-[#C8A96B]/10 border border-[#C8A96B]/20 px-2 py-0.5 text-[#C8A96B] font-mono tracking-wider">
              SHOPIFY_GOLD_FLOW
            </span>
          </div>
          <p className="text-xs text-zinc-500">إعداد كافة مواصفات دار تاج مهرة للعباءات والحرير بالمتجر الرقمي المتكامل</p>
        </div>

        {/* Top Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="text-xs px-4 py-2 border border-neutral-900 bg-[#090909] text-zinc-400 hover:text-white hover:bg-neutral-900/60 transition-colors cursor-pointer"
          >
            إلغاء وتجاهل المسودة
          </button>
          <button
            onClick={handleFinalSave}
            className="text-xs px-5 py-2 bg-gradient-to-l from-[#C8A96B] to-amber-600 text-black font-semibold flex items-center gap-1.5 hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Save size={14} /> حفظ وإدراج القطعة فوراً
          </button>
        </div>
      </div>

      {/* Layout Grid: Stepper Menu (Sidebar on Desktop) + Content Form Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Right side stepper list (Desktop Sidebar style to optimize workspace visual architecture) */}
        <div className="lg:col-span-4 bg-[#090909] border border-neutral-900 overflow-hidden sticky top-6">
          <div className="p-4 bg-[#0D0D0D] border-b border-neutral-900/80">
            <h4 className="text-xs font-serif text-white uppercase font-bold tracking-wider">مراحل تفصيل وإدراج المنتجات الفاخرة</h4>
            <p className="text-[10px] text-zinc-500 mt-1 leading-none">مؤشر التقدم في المتطلبات اللوجستية وتصميم الصفحة</p>
          </div>

          <div className="divide-y divide-neutral-900/40">
            {stepsConfig.map((st) => {
              const belongsToCurrent = currentStep === st.id;
              const hasCompleted = highestStepReached > st.id;
              
              let stepStateColor = "border-neutral-900 bg-neutral-950 text-zinc-650";
              if (belongsToCurrent) {
                stepStateColor = "border-[#C8A96B] bg-[#C8A96B]/10 text-[#C8A96B] font-bold";
              } else if (hasCompleted) {
                stepStateColor = "border-emerald-500/40 bg-emerald-950/10 text-emerald-400";
              }

              return (
                <button
                  key={st.id}
                  onClick={() => setCurrentStep(st.id)}
                  className={`w-full text-right p-3.5 hover:bg-neutral-900/30 transition-all flex items-start gap-3 relative cursor-pointer ${
                    belongsToCurrent ? "bg-neutral-900/40" : ""
                  }`}
                >
                  {/* Left accent glowing line */}
                  {belongsToCurrent && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C8A96B] to-amber-600" />
                  )}

                  {/* Bubble badge */}
                  <span
                    className={`w-6 h-6 shrink-0 text-[11px] font-mono font-bold flex items-center justify-center border transition-colors ${stepStateColor}`}
                  >
                    {hasCompleted ? "✓" : st.id + 1}
                  </span>

                  {/* Titles */}
                  <div className="space-y-0.5 min-w-0">
                    <span
                      className={`text-[11.5px] block truncate transition-colors ${
                        belongsToCurrent ? "text-[#C8A96B]" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {st.title}
                    </span>
                    <span className="text-[9.5px] text-zinc-550 block font-light leading-none truncate">
                      {st.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Luxury Quality Check list */}
          <div className="p-4 bg-zinc-950 border-t border-neutral-900/60 space-y-3">
            <span className="text-[10px] text-[#C8A96B] font-semibold uppercase block">حالة جودة السجل والمزامنة</span>
            <div className="text-[10px] space-y-2 text-zinc-500 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={12} className={nameAr ? "text-emerald-500" : "text-zinc-650"} />
                <span>الاسم والبيانات الأساسية كاملة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={12} className={images.length > 0 ? "text-emerald-500" : "text-zinc-650"} />
                <span>الصور والألبوم ({images.length} صور) جاهز</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>المتسير والمخاطر الضريبية منخفضة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={12} className={variantsGenerated.length > 0 ? "text-emerald-500" : "text-zinc-650"} />
                <span>المتغيرات ({variantsGenerated.length} خيارات) معرّفة</span>
              </div>
            </div>
            <div className="bg-[#0c0c0c] p-2 border border-neutral-900/60">
              <span className="text-[9px] text-[#C8A96B] block">معادلة الربح الذكية:</span>
              <p className="text-[10px] text-zinc-400 mt-1">
                الهامش المحقق من هذه القطعة هو <strong className="text-emerald-400 font-mono text-xs">{calculatedMargin}%</strong> (ربح قطعي صافٍ {calculatedProfit} ر.س)
              </p>
            </div>
          </div>
        </div>

        {/* Left side active content area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#090909] border border-neutral-900 p-6 shadow-xl relative min-h-[460px]">
            
            {/* Ambient gold glow decoration in top corner */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#C8A96B]/10 to-transparent blur-xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-6 text-right"
              >
                {/* Visual indicator header */}
                <div className="pb-4 border-b border-neutral-900 flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#C8A96B] font-bold block uppercase tracking-wider font-mono">
                      الخطوة {currentStep + 1} من ٨
                    </span>
                    <h3 className="text-base font-serif font-bold text-white uppercase tracking-normal">
                      {stepsConfig[currentStep].title}
                    </h3>
                  </div>
                  <HelpCircleComponent stepId={currentStep} />
                </div>

                {/* --- RENDER INDIVIDUAL SECTIONS --- */}

                {/* SECTION 1: Product Information */}
                {currentStep === 0 && (
                  <div className="space-y-5 animate-fade-in font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-zinc-400 font-semibold block">اسم القطعة باللغة العربية <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={nameAr}
                          onChange={(e) => setNameAr(e.target.value)}
                          placeholder="مثال: عباءة الشال الهدب الحرير"
                          className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-3 outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-zinc-400 font-semibold block">اسم القطعة باللغة الإنجليزية <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={nameEn}
                          onChange={(e) => setNameEn(e.target.value)}
                          placeholder="EX: ROYAL fringe SILK ABAYA"
                          className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-3 outline-none font-mono tracking-wide transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-zinc-400 font-semibold block">نبذة تسويقية مختصرة ولطيفة للبطاقات والمشتركات</label>
                      <input
                        type="text"
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        placeholder="يكتب هنا لمحة من قماش وجودة القطعة تظهر في كارد التصفح..."
                        className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-3 outline-none transition-colors"
                      />
                    </div>

                    {/* Rich text editor with toolbar mockup */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-zinc-400 font-semibold block flex justify-between">
                        <span>الوصف التفصيلي والقصة ونوع الخامة (المحرر الفاخر)</span>
                        <button
                          type="button"
                          onClick={() => setIsEditorRaw(!isEditorRaw)}
                          className="text-[9.5px] text-[#C8A96B] hover:underline"
                        >
                          {isEditorRaw ? "شاشة لوحة المفاتيح العادية" : "تعديل عبر كود غني HTML"}
                        </button>
                      </label>

                      <div className="border border-neutral-905 bg-black">
                        {/* Editor Toolbar */}
                        <div className="bg-[#0e0e0e] border-b border-neutral-900 p-2 flex items-center justify-start gap-1 flex-wrap">
                          <button
                            type="button"
                            onClick={() => appendRichText("bold")}
                            className="p-1 px-2.5 bg-[#141414] border border-zinc-900 hover:bg-neutral-900 text-zinc-300 hover:text-white text-[11px] font-bold flex items-center gap-1"
                            title="عريض"
                          >
                            <Bold size={11} />
                          </button>
                          <button
                            type="button"
                            onClick={() => appendRichText("italic")}
                            className="p-1 px-2.5 bg-[#141414] border border-zinc-900 hover:bg-neutral-900 text-zinc-300 hover:text-white text-[11px] italic flex items-center gap-1"
                            title="مائل"
                          >
                            <Italic size={11} />
                          </button>
                          <button
                            type="button"
                            onClick={() => appendRichText("bullet")}
                            className="p-1 px-2.5 bg-[#141414] border border-zinc-900 hover:bg-neutral-900 text-zinc-300 hover:text-white text-[11px] flex items-center gap-1"
                            title="قائمة نقطية"
                          >
                            <List size={11} />
                          </button>
                          <button
                            type="button"
                            onClick={() => appendRichText("quote")}
                            className="p-1 px-2.5 bg-[#141414] border border-zinc-900 hover:bg-neutral-900 text-zinc-300 hover:text-white text-[11px] flex items-center gap-1"
                            title="اقتباس مبرز"
                          >
                            <Quote size={11} />
                          </button>
                          
                          <div className="h-4 w-[1px] bg-neutral-900 mx-1.5" />
                          
                          <span className="text-[10px] text-zinc-550 font-mono">تنسيقات ذكية معتمدة للعباءة</span>
                        </div>

                        {/* Editor Textarea */}
                        {isEditorRaw ? (
                          <textarea
                            rows={6}
                            value={editorHtml}
                            onChange={(e) => setEditorHtml(e.target.value)}
                            className="w-full bg-transparent text-xs text-emerald-400 font-mono p-3 outline-none resize-none"
                            placeholder="كود HTML تفصيلي..."
                          />
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-neutral-900">
                            {/* Input form panel */}
                            <textarea
                              rows={6}
                              value={editorHtml}
                              onChange={(e) => setEditorHtml(e.target.value)}
                              className="w-full bg-transparent text-xs text-white p-3 outline-none resize-none font-sans"
                              placeholder="أدخلي تفاصيل الخامة، أزرار القفل، والتطريز..."
                            />
                            {/* Interactive live preview */}
                            <div className="p-3 bg-zinc-950/60 max-h-[144px] overflow-y-auto text-xs text-zinc-400 font-light rich-text-preview" style={{ direction: "rtl" }}>
                              <span className="text-[10px] text-zinc-600 block mb-1">المحاكاة البصرية لمتجر المشتريات:</span>
                              <div dangerouslySetInnerHTML={{ __html: editorHtml }} className="space-y-1 text-zinc-300" />
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-500">يتولى دار تاج مهرة طباعة هذا النص في شهادات ضمان الجودة مع الحزمة.</p>
                    </div>

                    <div className="space-y-1.5 bg-[#111111]/40 border border-neutral-900 p-3.5">
                      <div className="flex gap-2 items-center text-xs text-[#C8A96B] mb-1 font-serif">
                        <Sparkles size={13} />
                        <span>ملاحظة مصمم الأزياء الفريدة</span>
                      </div>
                      <input
                        type="text"
                        value={designerNote}
                        onChange={(e) => setDesignerNote(e.target.value)}
                        className="w-full bg-black border border-neutral-950 hover:border-neutral-900 text-xs text-zinc-300 p-2 outline-none font-sans"
                        placeholder="أدخلي شهادة وتوقيع المصمم عن الموديلات المماثلة..."
                      />
                    </div>
                  </div>
                )}

                {/* SECTION 2: Product Images */}
                {currentStep === 1 && (
                  <div className="space-y-5 animate-fade-in font-sans">
                    {/* Drag and Drop Zone and actions */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-none p-8 text-center transition-all ${
                        dragOverZone
                          ? "border-[#C8A96B] bg-[#C8A96B]/5"
                          : "border-neutral-900 bg-neutral-950/40 hover:bg-neutral-950"
                      }`}
                    >
                      <input type="file" id="image-uploader-element" className="hidden" onChange={handleAddMockImage} />
                      <label htmlFor="image-uploader-element" className="block cursor-pointer space-y-3">
                        <div className="w-12 h-12 bg-neutral-900 border border-neutral-850 mx-auto flex items-center justify-center text-[#C8A96B]">
                          <Upload size={20} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-white">اسحبي صور العباءة الراقية هنا للتحميل، أو <span className="text-[#C8A96B] underline font-medium">اضغطي لتصفح ملفات التصوير</span></p>
                          <p className="text-[10px] text-zinc-550 leading-relaxed font-light">يدعم التحميل المتعدد للقطعة، يوصى بصور قياس 1000 × 1400 بكسل بطابع ملكي داكن وموحد</p>
                        </div>
                      </label>
                      
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={handleAddMockImage}
                          className="text-[10px] px-3 py-1.5 bg-[#141414] hover:bg-zinc-900 text-zinc-300 border border-neutral-900 transition-colors inline-flex items-center gap-1.5"
                        >
                          <Plus size={10} /> أدخلي صوراً نموذجية حصرية
                        </button>
                      </div>
                    </div>

                    {/* Previews and Sorting Table Column */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs pb-1.5 border-b border-neutral-900/60">
                        <span className="text-zinc-400 font-semibold">ألبوم الصور المرتب مسبقاً ({images.length} صور متوفرة)</span>
                        <span className="text-[10px] text-zinc-500">يتولى السحب أو النقر على الأسهم تعديل الترتيب بالهاتف والمتصفح</span>
                      </div>

                      {images.length === 0 ? (
                        <div className="p-10 bg-neutral-950 text-center text-zinc-650 border border-neutral-955 text-xs">
                          لا توجد صور مضافة للموديل بعد. يرجى تحميل لقطة واحدة على الأقل.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {images.map((img, index) => (
                            <div
                              key={img.id}
                              className={`bg-[#0D0D0D] border relative group select-none p-2 space-y-2 flex flex-col justify-between ${
                                img.isPrimary ? "border-[#C8A96B]/80 shadow-md" : "border-neutral-900 hover:border-[#C8A96B]/30"
                              }`}
                            >
                              {/* Primary badge indicators */}
                              {img.isPrimary && (
                                <div className="absolute top-2 right-2 bg-[#C8A96B] text-black text-[9px] px-1.5 py-0.5 font-bold font-serif select-none z-10 scale-90">
                                  الغلاف / الأساسية
                                </div>
                              )}

                              {/* Target actions */}
                              <div className="absolute top-2 left-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                  type="button"
                                  onClick={() => deleteImage(img.id)}
                                  className="w-6 h-6 bg-black/80 hover:bg-red-950 text-zinc-400 hover:text-red-400 flex items-center justify-center border border-zinc-900"
                                  title="حذف هذه اللقطة"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>

                              {/* Frame */}
                              <div className="w-full aspect-[3/4] bg-neutral-950 overflow-hidden relative border border-neutral-900">
                                <img
                                  src={img.url}
                                  alt={img.name}
                                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              {/* Image filename and sort indices */}
                              <div className="space-y-1 block pt-1.5">
                                <p className="text-[10px] text-zinc-400 block truncate font-mono text-left">{img.name}</p>
                                <div className="flex items-center justify-between gap-1 border-t border-neutral-900/40 pt-1.5">
                                  {/* Select as prime */}
                                  <button
                                    type="button"
                                    onClick={() => setPrimaryImage(img.id)}
                                    className={`text-[9px] px-1.5 py-0.5 ${
                                      img.isPrimary
                                        ? "text-[#C8A96B] font-bold"
                                        : "text-zinc-550 hover:text-white"
                                    }`}
                                  >
                                    {img.isPrimary ? "تم التعيين كغلاف" : "دعيها صورة الغلاف"}
                                  </button>

                                  {/* Sort controls */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={index === 0}
                                      onClick={() => moveImage(index, "up")}
                                      className="w-5 h-5 bg-neutral-950 text-zinc-400 hover:text-[#C8A96B] flex items-center justify-center border border-neutral-900 disabled:opacity-30"
                                      title="ترتيب للأمام"
                                    >
                                      <ArrowRight size={10} className="rotate-90" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={index === images.length - 1}
                                      onClick={() => moveImage(index, "down")}
                                      className="w-5 h-5 bg-neutral-950 text-zinc-400 hover:text-[#C8A96B] flex items-center justify-center border border-neutral-900 disabled:opacity-30"
                                      title="ترتيب للخلف"
                                    >
                                      <ArrowRight size={10} className="-rotate-90" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SECTION 3: Pricing */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-zinc-400 font-semibold block flex justify-between">
                          <span>سعر البيع الفعلي (ر.س) <span className="text-red-500">*</span></span>
                          <span className="text-[#C8A96B] text-[9.5px]">نهائي شامل الضمان</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            min="1"
                            value={basePrice}
                            onChange={(e) => setBasePrice(Number(e.target.value))}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-3 pr-8 outline-none transition-colors"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-serif text-[10px] text-zinc-500">ر.س</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-[11px] text-zinc-400 font-semibold block">سعر الشطب / المقارن (ر.س)</label>
                          <span className="text-zinc-500 text-[9.5px]">يعطي انطباع النخبوية</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={comparePrice}
                            onChange={(e) => setComparePrice(Number(e.target.value))}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-3 pr-8 outline-none transition-colors line-through decoration-red-900/70"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-serif text-[10px] text-zinc-500">ر.س</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] text-zinc-400 font-semibold block">سعر تكلفة القطعة كاملة (ر.س)</label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={costPerItem}
                            onChange={(e) => setCostPerItem(Number(e.target.value))}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-3 pr-8 outline-none transition-colors"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-serif text-[10px] text-zinc-500">ر.س</span>
                        </div>
                      </div>

                    </div>

                    {/* Calculations Summary Panel */}
                    <div className="bg-[#0D0D0D] border border-neutral-900 p-5 space-y-4">
                      <div className="flex items-center gap-1.5 text-xs text-[#C8A96B] font-serif">
                        <Sparkles size={14} />
                        <span>محاكاة الأرباح لمتجر تاج مُهرة النخبوي</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-right">
                        <div className="p-3.5 bg-black border border-neutral-950">
                          <span className="text-[10px] text-zinc-500 block">هامش الربح المسجّل:</span>
                          <span className="text-lg font-serif font-bold text-emerald-400 block mt-1">{calculatedMargin}%</span>
                          <span className="text-[9px] text-zinc-550 block">مقبول وضمن النسبة الطبيعية للعباءات الفارهة</span>
                        </div>

                        <div className="p-3.5 bg-black border border-neutral-950">
                          <span className="text-[10px] text-zinc-500 block">صافي الربح الفردي المقدر:</span>
                          <span className="text-lg font-serif font-bold text-[#C8A96B] block mt-1">{calculatedProfit} ر.س</span>
                          <span className="text-[9px] text-zinc-550 block">مخصوماً منه تكلفة الخيوط والكريب فقط</span>
                        </div>

                        <div className="p-3.5 bg-black border border-neutral-950">
                          <span className="text-[10px] text-zinc-500 block">التخفيض المطبّق بالصفحة:</span>
                          <span className="text-lg font-serif font-bold text-amber-500 block mt-1">
                            {comparePrice > basePrice ? (((comparePrice - basePrice) / comparePrice) * 100).toFixed(0) : 0}%
                          </span>
                          <span className="text-[9px] text-zinc-550 block">تخفيض ظاهر للعملاء والمستخدمين بوضوح</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-zinc-500 border-t border-neutral-950 pt-3 leading-relaxed">
                        * يرجى ملاحظة أن هامش الربح المحقق يخضع لسياسات الشحن والخصومات الحصرية المسوقة عبر طاقم خدمة العملاء والمنسقين.
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 4: Inventory */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-[11px] text-zinc-400 font-semibold block">رمز تخطيط المستودع SKU <span className="text-red-500">*</span></label>
                          <button
                            type="button"
                            onClick={() => setSku(`TM-VEL-${Math.floor(Math.random() * 800 + 101)}`)}
                            className="text-[10px] text-[#C8A96B] hover:underline"
                          >
                            توليد تلقائي
                          </button>
                        </div>
                        <input
                          type="text"
                          required
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                          placeholder="مثال: TM-AB-VAL-102"
                          className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-3 outline-none font-mono tracking-wider transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] text-zinc-400 font-semibold block">الرمز الشريطي للبلد باركود (GTIN / Barcode)</label>
                        <input
                          type="text"
                          value={barcode}
                          onChange={(e) => setBarcode(e.target.value)}
                          placeholder="مثال: 6281100994112"
                          className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-3 outline-none font-mono tracking-wider transition-colors"
                        />
                      </div>
                    </div>

                    <div className="bg-[#0D0D0D] border border-neutral-900 p-4 space-y-4">
                      {/* Toggle tracking inventory */}
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <label className="text-xs text-white font-semibold block">تفعيل تتبع المخزون بالقطعة</label>
                          <span className="text-[10px] text-zinc-550 block">تحديث الحساب لخدمات البيع والشحن تلو الشراء مباشرة لدار تاج مهرة</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTrackInventory(!trackInventory)}
                          className={`w-11 h-6 p-0.5 transition-colors ${
                            trackInventory ? "bg-[#C8A96B]" : "bg-neutral-800"
                          } relative rounded-none`}
                        >
                          <div
                            className={`w-5 h-5 bg-black transition-transform ${
                              trackInventory ? "-translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>

                      {trackInventory && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2.5 border-t border-neutral-950">
                          <div className="space-y-1.5">
                            <label className="text-[11px] text-[#C8A96B] font-semibold block">الكمية الإجمالية المتوفرة بالمستودع</label>
                            <input
                              type="number"
                              min="0"
                              value={inventoryCount}
                              onChange={(e) => setInventoryCount(Number(e.target.value))}
                              className="w-full bg-black border border-neutral-905 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-sans"
                            />
                            <p className="text-[9.5px] text-zinc-500">يتأثر هذا الرقم حاسوبياً بطلبيات طاقم المبيعات</p>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] text-zinc-400 font-semibold block">عتبة التنبيه بانخفاض كمية العباءة</label>
                            <input
                              type="number"
                              min="1"
                              value={lowStockAlert}
                              onChange={(e) => setLowStockAlert(Number(e.target.value))}
                              className="w-full bg-black border border-neutral-905 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-sans"
                            />
                            <p className="text-[9.5px] text-zinc-500">سوف يعلمك النظام إدارياً عند وصول الكمية لهذا العدد</p>
                          </div>
                        </div>
                      )}

                      {/* Sell out of stock toggle */}
                      <div className="flex justify-between items-center pt-3 border-t border-neutral-950">
                        <div className="space-y-0.5">
                          <label className="text-xs text-white block">السماح لربات البيوت بالشراء حتى عند النفاذ من صالة الإنتاج</label>
                          <span className="text-[10px] text-zinc-550 block">يكون الشراء بمثابة طلب مسبق (Pre-Order) يتطلب مدة حياكة إضافية</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setContinueSellingOutOfStock(!continueSellingOutOfStock)}
                          className={`w-11 h-6 p-0.5 transition-colors ${
                            continueSellingOutOfStock ? "bg-[#C8A96B]" : "bg-neutral-800"
                          } relative rounded-none`}
                        >
                          <div
                            className={`w-5 h-5 bg-black transition-transform ${
                              continueSellingOutOfStock ? "-translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 5: Categories & Collections */}
                {currentStep === 4 && (
                  <div className="space-y-5 animate-fade-in font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-zinc-400 font-semibold block">الفئة الرئيسية للقطعة</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-black border border-neutral-900 hover:border-neutral-850 p-3 text-xs text-white outline-none cursor-pointer font-sans"
                        >
                          <option value="عباءات سوداء">عباءات سوداء</option>
                          <option value="عباءات ملونة">عباءات ملونة</option>
                          <option value="جلابيات يومية">جلابيات يومية</option>
                          <option value="قطع للمناسبات">قطع للمناسبات</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] text-zinc-400 font-semibold block">المجموعة الفرعية / المجموعة الموسمية</label>
                        <select
                          value={collection}
                          onChange={(e) => setCollection(e.target.value)}
                          className="w-full bg-black border border-neutral-900 hover:border-neutral-850 p-3 text-xs text-white outline-none cursor-pointer font-sans"
                        >
                          <option value="تشكيلة الشتاء الملكية">تشكيلة الشتاء الملكية</option>
                          <option value="الأعياد الفاخرة">الأعياد الفاخرة</option>
                          <option value="عبايات الكريب الفريش">عبايات الكريب الفريش</option>
                          <option value="مجموعة الزي الموحد اليومية">مجموعة الزي الموحد اليومية</option>
                        </select>
                      </div>

                    </div>

                    {/* Tag Manager Input */}
                    <div className="space-y-3 bg-[#0D0D0D] border border-neutral-900 p-4">
                      <label className="text-[11.5px] text-white font-semibold block">وسوم ومرجعيات البحث بالفلتر (Product Tags)</label>
                      <form onSubmit={handleAddTag} className="flex gap-2">
                        <input
                          type="text"
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          placeholder="مثال: كريب_صالونا، حرير_طبيعي، ملكي، كولكشن_جديد"
                          className="w-full bg-black border border-neutral-950 hover:border-neutral-900 focus:border-[#C8A96B]/60 text-xs text-zinc-200 p-2.5 outline-none font-sans"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 bg-neutral-900 hover:bg-[#C8A96B] hover:text-black hover:font-bold border border-neutral-805 text-zinc-300 font-medium text-xs transition-colors shrink-0"
                        >
                          إضافة وسم
                        </button>
                      </form>

                      {/* Displaying tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {tags.map((t) => (
                          <div
                            key={t}
                            className="bg-[#121212] border border-neutral-900 px-3 py-1 text-xs text-zinc-300 flex items-center gap-1.5"
                          >
                            <span className="font-mono text-[#C8A96B]/85">#</span>
                            <span>{t}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(t)}
                              className="text-zinc-550 hover:text-red-400 p-0.5 transition-colors"
                              title="إلغاء الوسم"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-[9.5px] text-zinc-500">تساعد الوسوم العميلات على حصر خيارات الشيفون والمظهر بدقة فائقة</p>
                    </div>
                  </div>
                )}

                {/* SECTION 6: Product Variants */}
                {currentStep === 5 && (
                  <div className="space-y-5 animate-fade-in font-sans">
                    <div className="p-4 bg-zinc-950 border border-neutral-900 space-y-3 text-xs leading-relaxed text-zinc-400">
                      <p className="font-serif text-[#C8A96B] font-bold">مولد المتغيرات ومقاسات الحرير (Variant Generator)</p>
                      <p className="font-light text-[11px]">
                        قومي بتحديد مقاسات العباية والجلابية الفارهة المتاحة للقطعة، والألوان المتوفرة في مشغل الحياكة، لتتولى اللوحة تفريع الرموز الخاصة بالمخزون والسعر الفردي لكل توليفة فرعية.
                      </p>
                    </div>

                    {/* Previews Selection options template */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Sizes Options */}
                      <div className="space-y-2 bg-[#0D0D0D] border border-neutral-900 p-3.5">
                        <span className="text-xs text-zinc-300 font-semibold block">١. خيارات المقاس المتاحة:</span>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {variantSizes.map((sz) => (
                            <span key={sz} className="bg-black text-[10px] text-white px-2 py-1 border border-neutral-900 flex items-center gap-1">
                              {sz}
                              <button type="button" onClick={() => setVariantSizes(prev => prev.filter(s => s !== sz))} className="text-zinc-500 hover:text-red-400">×</button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-1.5 mt-2">
                          <input
                            type="text"
                            value={newSizeOption}
                            onChange={(e) => setNewSizeOption(e.target.value)}
                            placeholder="مثال: XXL"
                            className="w-full bg-black border border-neutral-950 p-1.5 text-xs text-white"
                          />
                          <button type="button" onClick={addSizeOption} className="px-3 bg-neutral-900 text-xs text-zinc-200 border border-zinc-850 hover:bg-neutral-800">إضافة</button>
                        </div>
                      </div>

                      {/* Colors Options */}
                      <div className="space-y-2 bg-[#0D0D0D] border border-neutral-900 p-3.5">
                        <span className="text-xs text-zinc-300 font-semibold block">٢. الألوان وموديل التطريز:</span>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {variantColors.map((col) => (
                            <span key={col} className="bg-black text-[10px] text-white px-2 py-1 border border-neutral-900 flex items-center gap-1">
                              {col}
                              <button type="button" onClick={() => setVariantColors(prev => prev.filter(c => c !== col))} className="text-zinc-500 hover:text-red-400">×</button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-1.5 mt-2">
                          <input
                            type="text"
                            value={newColorOption}
                            onChange={(e) => setNewColorOption(e.target.value)}
                            placeholder="مثال: عاجي"
                            className="w-full bg-black border border-neutral-950 p-1.5 text-xs text-white"
                          />
                          <button type="button" onClick={addColorOption} className="px-3 bg-neutral-900 text-xs text-zinc-200 border border-zinc-850 hover:bg-neutral-800">إضافة</button>
                        </div>
                      </div>

                    </div>

                    {/* Generate Action Button */}
                    <div className="text-left pb-1">
                      <button
                        type="button"
                        onClick={handleGenerateVariants}
                        className="text-xs px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-[#C8A96B] font-bold border border-[#C8A96B]/30 transition-all cursor-pointer"
                      >
                        إعادة توليد قائمة متغيرات العباية تلقائياً
                      </button>
                    </div>

                    {/* Table View of Variants */}
                    <div className="border border-neutral-900/60 overflow-hidden">
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-right text-xs">
                          <thead>
                            <tr className="bg-black border-b border-neutral-900 text-[10px] text-zinc-500 uppercase">
                              <th className="px-4 py-3 font-normal text-right">مزيج المقاس × اللون</th>
                              <th className="px-4 py-3 font-normal text-right">سعر البيع الفردي</th>
                              <th className="px-4 py-3 font-normal text-right">رمز SKU للمقاس</th>
                              <th className="px-4 py-3 font-normal text-right">المخزون المتوفر</th>
                              <th className="px-4 py-3 font-normal text-center">إلغاء الخيار</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-900/40">
                            {variantsGenerated.map((v) => (
                              <tr key={v.id} className="hover:bg-neutral-950 transition-colors">
                                <td className="px-4 py-2 text-white font-medium">
                                  {v.size} ({v.color})
                                </td>
                                <td className="px-4 py-2">
                                  <input
                                    type="number"
                                    value={v.price}
                                    onChange={(e) => updateVariant(v.id, "price", Number(e.target.value))}
                                    className="bg-black border border-neutral-905 w-20 p-1 text-center font-serif text-white outline-none"
                                  />
                                  <span className="text-[10px] text-zinc-550 mr-1">ر.س</span>
                                </td>
                                <td className="px-4 py-2">
                                  <input
                                    type="text"
                                    value={v.sku}
                                    onChange={(e) => updateVariant(v.id, "sku", e.target.value)}
                                    className="bg-black border border-neutral-905 w-full max-w-[130px] p-1 font-mono text-zinc-300 outline-none uppercase"
                                  />
                                </td>
                                <td className="px-4 py-2">
                                  <input
                                    type="number"
                                    value={v.stock}
                                    onChange={(e) => updateVariant(v.id, "stock", Number(e.target.value))}
                                    className="bg-black border border-neutral-905 w-16 p-1 text-center font-mono text-white outline-none"
                                  />
                                </td>
                                <td className="px-4 py-2 text-center">
                                  <button
                                    type="button"
                                    onClick={() => removeVariantRow(v.id)}
                                    className="p-1 hover:bg-neutral-900 text-zinc-650 hover:text-red-400 transition-colors"
                                    title="حذف هذا الخيار الفرعي"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 7: SEO Settings */}
                {currentStep === 6 && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    {/* Visual Search Engine Preview Card (Shopify Premium look) */}
                    <div className="bg-[#0D0D0D] border border-neutral-900 p-5 space-y-3 text-left" style={{ direction: "ltr" }}>
                      <span className="text-[10px] text-[#C8A96B] font-bold block uppercase tracking-wider font-mono">
                        Google Search Preview
                      </span>
                      
                      <div className="space-y-1">
                        <span className="text-sky-400 text-sm font-medium hover:underline block truncate cursor-pointer font-serif">
                          {seoTitle || "رمز عباءة مميزة | دار تاج مهرة للعباءات"}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-emerald-500 overflow-hidden truncate font-mono">
                          <span>https://tajmuhra.com</span>
                          <span>›</span>
                          <span>products</span>
                          <span>›</span>
                          <span className="text-zinc-400">{seoSlug || "slug-handle"}</span>
                        </div>
                        <p className="text-zinc-400 text-[11px] line-clamp-2 leading-relaxed">
                          {seoDescription || "الوصف التسويقي للمستهلك والمحركات في السير الفخم هنا لزيارة المتجر."}
                        </p>
                      </div>
                    </div>

                    {/* SEO Input Fields */}
                    <div className="space-y-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-[11.5px] text-zinc-400 font-semibold block">عنوان محرك البحث الفوقي (META Title)</label>
                        <input
                          type="text"
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          className="w-full bg-black border border-neutral-900 hover:border-neutral-850 p-2.5 text-xs text-white outline-none"
                          maxLength={70}
                        />
                        <div className="flex justify-between items-center text-[10px] text-zinc-500">
                          <span>يوصى بأقل من 60 حرفاً من أجل الملاءمة</span>
                          <span>{seoTitle.length} / 70 حرفاً</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11.5px] text-zinc-400 font-semibold block">وصف محرك البحث المعزز (META Description)</label>
                        <textarea
                          rows={3}
                          value={seoDescription}
                          onChange={(e) => setSeoDescription(e.target.value)}
                          className="w-full bg-black border border-neutral-900 hover:border-neutral-850 p-2.5 text-xs text-white outline-none resize-none font-sans"
                          maxLength={160}
                        />
                        <div className="flex justify-between items-center text-[10px] text-zinc-500">
                          <span>يوصى بـ 120 إلى 155 حرفاً لإثراء النتائج بالمحركات</span>
                          <span>{seoDescription.length} / 160 حرفاً</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11.5px] text-zinc-400 font-semibold block">رابط القطعة بالإنجليزية (URL Slug Handle)</label>
                        <div className="flex bg-black border border-neutral-900 text-xs items-center pl-3">
                          <span className="text-zinc-500 font-mono select-none px-2.5 border-r border-neutral-905 bg-zinc-950/40 py-2.5">tajmuhra.com/products/</span>
                          <input
                            type="text"
                            value={seoSlug}
                            onChange={(e) => setSeoSlug(e.target.value)}
                            className="bg-transparent text-white p-2.5 outline-none font-mono flex-1 text-left"
                            style={{ direction: "ltr" }}
                          />
                        </div>
                        <p className="text-[9.5px] text-zinc-550">تلقائي مستنبط من الاسم الإنجليزي المعرّف للعباءة</p>
                      </div>

                    </div>
                  </div>
                )}

                {/* SECTION 8: Shipping Settings */}
                {currentStep === 7 && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-[11.5px] text-zinc-400 font-semibold block">الوزن التقديري للشحنة (كجم)</label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.05"
                            min="0.1"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full bg-black border border-neutral-900 focus:border-[#C8A96B]/60 text-xs text-white p-3 outline-none"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-550 font-mono">كجم</span>
                        </div>
                        <p className="text-[9.5px] text-zinc-500">الأوزان الدقيقة تنعكس تلقائياً في حسابات الجمارك والشحن بـ دي إتش إل والبريد</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11.5px] text-zinc-400 font-semibold block">أسلوب تعبئة القطعة للنخبة والعميلات</label>
                        <input
                          type="text"
                          value={packagingType}
                          onChange={(e) => setPackagingType(e.target.value)}
                          className="w-full bg-black border border-neutral-900 focus:border-[#C8A96B]/60 text-xs text-white p-3 outline-none"
                          placeholder="مثال: صندوق مخملي خشبي مع زجاجة عودة صغيرة"
                        />
                      </div>

                    </div>

                    {/* Packaging Dimensions form */}
                    <div className="space-y-3 bg-[#0D0D0D] border border-neutral-900 p-4">
                      <span className="text-xs text-white font-semibold block">أبعاد الحزمة الموحدة للشحن (الطول × العرض × الارتفاع)</span>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] text-zinc-500 block">الطول (cm)</span>
                          <input
                            type="number"
                            value={dimsLength}
                            onChange={(e) => setDimsLength(Number(e.target.value))}
                            className="w-full bg-black border border-neutral-950 p-2 text-center text-xs text-white font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-zinc-500 block">العرض (cm)</span>
                          <input
                            type="number"
                            value={dimsWidth}
                            onChange={(e) => setDimsWidth(Number(e.target.value))}
                            className="w-full bg-black border border-neutral-950 p-2 text-center text-xs text-white font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-zinc-500 block">الارتفاع (cm)</span>
                          <input
                            type="number"
                            value={dimsHeight}
                            onChange={(e) => setDimsHeight(Number(e.target.value))}
                            className="w-full bg-black border border-neutral-950 p-2 text-center text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <p className="text-[9.5px] text-zinc-550 mt-1">تستند شركات الشحن للأبعاد الحجمية لتقدير فاتورة التوصيل النهائي</p>
                    </div>

                    {/* Highly interactive shipping toggle rules */}
                    <div className="bg-[#0D0D0D] border border-neutral-900 p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <span className="text-xs text-white font-semibold block">تتطلب القطعة معالجة وتغليفاً خاصاً لمكافحة الكسر والتلف</span>
                          <span className="text-[10px] text-zinc-550 block">يرسل إشعار فوري لموزع المستودع لتدعيم الصندوق بغطاء قطيفة</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRequiresSpecialHandling(!requiresSpecialHandling)}
                          className={`w-11 h-6 p-0.5 transition-colors ${
                            requiresSpecialHandling ? "bg-[#C8A96B]" : "bg-neutral-800"
                          } relative rounded-none`}
                        >
                          <div
                            className={`w-5 h-5 bg-black transition-transform ${
                              requiresSpecialHandling ? "-translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="border-t border-neutral-950 pt-3 text-[10px] text-zinc-500 flex items-center gap-2">
                        <Info size={12} className="text-[#C8A96B] shrink-0" />
                        <span>يتولى النظام ترحيل هذه القطعة لخزانة الشحن المباشر المعزز المجاني للعميل النخبوي من دار تاج مهرة للعبايات.</span>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Stepper Navigation Buttons (Prev / Next or Save) */}
            <div className="mt-8 pt-4 border-t border-neutral-900/65 flex justify-between items-center bg-[#090909]">
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 bg-neutral-950 border border-neutral-900 text-xs text-zinc-400 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
              >
                <ChevronRight size={14} /> الخطوة السابقة
              </button>

              <div className="text-[11px] text-zinc-500 hidden sm:block font-serif font-semibold text-center">
                مراجعة القسم: {stepsConfig[currentStep].title}
              </div>

              {currentStep < 7 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-4 py-2 bg-[#141414] hover:bg-[#1D1D1D] text-xs text-white border border-neutral-850 hover:border-[#C8A96B]/30 transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  الخطوة التالية <ChevronLeft size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSave}
                  className="px-5 py-2.5 bg-gradient-to-l from-[#C8A96B] to-amber-600 text-black font-bold text-xs flex items-center gap-1.5 hover:opacity-95 transition-opacity cursor-pointer font-sans"
                >
                  <Save size={14} /> تفصيل ونشر القطعة بالكتالوج
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Help text bubbles for step instructions
function HelpCircleComponent({ stepId }: { stepId: number }) {
  const messages = [
    "املئ أسماء المنتجات بدقة لمزامنتها مع الفواتير العربية والإنجليزية للبلد ومصلحة الضرائب.",
    "يرجى فرز أولوية الصور المعروضة، الصورة الأولى ذات إقرار النجم ستكون غلاف التصفح الرسمي.",
    "حساب الهامش والصافي التقديري يساعدكِ على مراجعة جدوى صياغة التسعير مقارنة بالسوق وتكلفة الحرير.",
    "SKU هو المعرّف الأوحد لوحدات التخزين. اتركي الباركود فارغاً في حال لم تكن القطعة مرقّمة عالمياً.",
    "سيقوم وسم الفلتر والبحث بتسهيل اقتناء الجلابيات اليومية والنخبوية بمحرك التصفية.",
    "توليد الفروق يقوم بضرب أحجام المقاسات المقترحة بالألوان المضافة لتنتج قائمة فرعية غنية بالبيانات.",
    "يقرر محرك البحث النجاخ العام لصفحات العباءات بمتجر تاج مهرة، أدخلي كلمات ذات صلة بالبحث اليومي.",
    "دعم الأوزان في الشحن والقياسات الحقيقية يحمي من تضارب رسوم التغليف التقديرية لدار الأزياء."
  ];

  return (
    <div className="text-[10px] text-zinc-500 bg-neutral-950 px-2.5 py-1 flex items-center gap-1 border border-neutral-900 max-w-xs leading-tight font-sans">
      <AlertCircle size={10} className="text-[#C8A96B] shrink-0" />
      <span>{messages[stepId]}</span>
    </div>
  );
}
