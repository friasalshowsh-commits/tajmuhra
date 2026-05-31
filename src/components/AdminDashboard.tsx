import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Grid,
  ClipboardList,
  Users,
  Ticket,
  Star,
  Layers,
  TrendingUp,
  Bell,
  Settings as SettingsIcon,
  ShieldCheck,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  LogOut,
  Sparkles,
  Crown,
  Lock,
  Menu,
  X,
  Plus,
  Filter,
  RefreshCw,
  Globe,
  Database,
  Calendar,
  AlertCircle,
  TrendingDown,
  Dot,
  Edit,
  Trash2,
  Copy
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS, CATEGORIES } from "../data";
import { Product } from "../types";
import AddProductPage from "./AddProductPage";
import OrdersPage from "./OrdersPage";

interface AdminDashboardProps {
  onBackToStore: () => void;
}

type SidebarItemId =
  | "dashboard"
  | "products"
  | "categories"
  | "orders"
  | "customers"
  | "coupons"
  | "reviews"
  | "inventory"
  | "analytics"
  | "notifications"
  | "settings"
  | "staff";

interface SidebarItem {
  id: SidebarItemId;
  label: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: string;
  badgeType?: "gold" | "neutral" | "danger";
}

export default function AdminDashboard({ onBackToStore }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<SidebarItemId>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAlertBannerVisible, setIsAlertBannerVisible] = useState(true);
  
  // Dashboard Interactive States
  const [dashboardTimeframe, setDashboardTimeframe] = useState<"7d" | "30d">("30d");
  const [selectedChartTab, setSelectedChartTab] = useState<"revenue" | "orders">("revenue");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Premium Products State incorporating SKU, Inventory, Status
  const [productsList, setProductsList] = useState(() => {
    return PRODUCTS.map((p, index) => {
      let inventory = 15;
      let status: "Active" | "Draft" | "OutOfStock" = "Active";
      let sku = `TM-${p.category === "عباءات سوداء" ? "AB" : p.category === "جلابيات يومية" ? "JL" : "OT"}-${100 + index}`;
      
      if (index === 1) {
        inventory = 8;
        status = "Active";
      } else if (index === 2) {
        inventory = 0;
        status = "OutOfStock";
      } else if (index === 4) {
        inventory = 25;
        status = "Draft";
      } else {
        inventory = 12 + (index * 3);
      }
      
      return {
        ...p,
        sku,
        inventory,
        status
      };
    });
  });

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStockStatus, setSelectedStockStatus] = useState<string>("All");
  const [selectedProductStatus, setSelectedProductStatus] = useState<string>("All");
  const [productSearch, setProductSearch] = useState<string>("");

  // Product Modals & Forms State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAddingProductPage, setIsAddingProductPage] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Form Field States
  const [formNameAr, setFormNameAr] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formPrice, setFormPrice] = useState(150);
  const [formCategory, setFormCategory] = useState("عباءات سوداء");
  const [formSKU, setFormSKU] = useState("");
  const [formInventory, setFormInventory] = useState(10);
  const [formStatus, setFormStatus] = useState<"Active" | "Draft" | "OutOfStock">("Active");
  const [formDescAr, setFormDescAr] = useState("");
  const [formDescEn, setFormDescEn] = useState("");
  const [formImgUrl, setFormImgUrl] = useState("");
  const [formSizes, setFormSizes] = useState<string[]>(["S", "M", "L", "XL"]);

  // Helper to open modal for creation
  const openNewProductModal = () => {
    setEditingProduct(null);
    setFormNameAr("");
    setFormNameEn("");
    setFormPrice(180);
    setFormCategory("عباءات سوداء");
    setFormSKU(`TM-NEW-${Math.floor(Math.random() * 900 + 100)}`);
    setFormInventory(15);
    setFormStatus("Active");
    setFormDescAr("تصميم فاخر وجذاب مصنوع من الكريب المتميز يجمع بين الأناقة العربية والراحة العصرية.");
    setFormDescEn("A premium black abaya meticulously stitched from luxurious Korean crepe with a beautiful modern design.");
    setFormImgUrl(PRODUCTS[0]?.imageUrl || "");
    setFormSizes(["S", "M", "L", "XL", "2XL"]);
    setIsProductModalOpen(true);
  };

  // Helper to open modal for editing
  const openEditProductModal = (product: any) => {
    setEditingProduct(product);
    setFormNameAr(product.name);
    setFormNameEn(product.nameEn);
    setFormPrice(product.price);
    setFormCategory(product.category);
    setFormSKU(product.sku);
    setFormInventory(product.inventory);
    setFormStatus(product.status);
    setFormDescAr(product.description || "");
    setFormDescEn(product.nameEn || "");
    setFormImgUrl(product.imageUrl);
    setFormSizes(product.sizes || ["S", "M", "L", "XL"]);
    setIsProductModalOpen(true);
  };

  // Save product details (Create / Update)
  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNameAr || !formPrice || !formSKU) {
      alert("الرجاء ملء الحقول الإلزامية مثل اسم المنتج، السعر والرمز (SKU)");
      return;
    }

    const determinedStatus = Number(formInventory) === 0 ? "OutOfStock" : formStatus;

    if (editingProduct) {
      // Update
      setProductsList(prev =>
        prev.map(p =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formNameAr,
                nameEn: formNameEn,
                price: Number(formPrice),
                category: formCategory,
                sku: formSKU,
                inventory: Number(formInventory),
                status: determinedStatus,
                description: formDescAr,
                longDescription: formDescAr,
                imageUrl: formImgUrl,
                sizes: formSizes
              }
            : p
        )
      );
    } else {
      // Create
      const newId = String(Date.now());
      const newProductItem = {
        id: newId,
        name: formNameAr,
        nameEn: formNameEn,
        description: formDescAr,
        longDescription: formDescAr,
        price: Number(formPrice),
        unit: "ر.س",
        imageUrl: formImgUrl || PRODUCTS[0]?.imageUrl || "",
        category: formCategory,
        colors: [{ name: "أسود فاخر", hex: "#111111" }],
        sizes: formSizes,
        fabricDetails: [
          `نوع القماش: كريب عالي الجودة لمتجر تاج مهرة`,
          `القصّة: كلوش انسيابي رائع`,
          `الملحقات: تأتي مع طرحة مجانية فاخرة`
        ],
        careInstructions: [
          `يغسل يدوياً بماء بارد لضمان دوام الأنسجة ونعومة التفصيل`
        ],
        shippingDetails: [
          `شحن مجاني وسريع لكافة مدن المملكة للطلبات المتميزة`
        ],
        sku: formSKU,
        inventory: Number(formInventory),
        status: determinedStatus
      };
      setProductsList(prev => [newProductItem, ...prev]);
    }
    setIsProductModalOpen(false);
  };

  // Duplicate product
  const duplicateProduct = (pId: string) => {
    const parent = productsList.find(p => p.id === pId);
    if (!parent) return;

    const newId = String(Date.now());
    const duplicated = {
      ...parent,
      id: newId,
      name: `${parent.name} - مكرر`,
      nameEn: `${parent.nameEn} (Copy)`,
      sku: `${parent.sku}-DUP`,
      inventory: parent.inventory,
      status: parent.status as any
    };

    setProductsList(prev => {
      const index = prev.findIndex(p => p.id === pId);
      const updated = [...prev];
      updated.splice(index + 1, 0, duplicated);
      return updated;
    });
  };

  // Delete product
  const deleteProduct = (pId: string) => {
    const p = productsList.find(item => item.id === pId);
    if (!p) return;
    
    const confirmText = `هل أنتِ متأكدة من رغبتكِ في حذف هذه القطعة الفنية الفاخرة؟\n(${p.name})`;
    if (window.confirm(confirmText)) {
      setProductsList(prev => prev.filter(item => item.id !== pId));
    }
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  // Sync formatted time in Arabic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format options for luxury display: formatted in Arabic Gregorian with local timezone
      const formatted = now.toLocaleDateString("ar-SA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      setCurrentTime(formatted);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "لوحة التحكم الرئيسية",
      labelEn: "Main Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "products",
      label: "إدارة المنتجات",
      labelEn: "Products",
      icon: ShoppingBag,
      badge: "٢٤ قطة",
      badgeType: "gold",
    },
    {
      id: "categories",
      label: "التصنيفات الفاخرة",
      labelEn: "Categories",
      icon: Grid,
    },
    {
      id: "orders",
      label: "طلبات العملاء",
      labelEn: "Orders",
      icon: ClipboardList,
      badge: "جديد",
      badgeType: "gold",
    },
    {
      id: "customers",
      label: "سجل النخبة",
      labelEn: "Elite Customers",
      icon: Users,
    },
    {
      id: "coupons",
      label: "رموز الخصم والحملات",
      labelEn: "Coupons & Offers",
      icon: Ticket,
    },
    {
      id: "reviews",
      label: "تقييمات الذوق",
      labelEn: "Client Reviews",
      icon: Star,
      badge: "٤.٩★",
      badgeType: "gold",
    },
    {
      id: "inventory",
      label: "المخزون والقطع",
      labelEn: "Inventory Control",
      icon: Layers,
    },
    {
      id: "analytics",
      label: "مؤشرات وتدفقات مالية",
      labelEn: "Financial Analytics",
      icon: TrendingUp,
    },
    {
      id: "notifications",
      label: "مركز التنبيهات",
      labelEn: "System Notifications",
      icon: Bell,
      badge: "٣",
      badgeType: "danger",
    },
    {
      id: "settings",
      label: "إعدادات صالة العرض",
      labelEn: "Boutique Settings",
      icon: SettingsIcon,
    },
    {
      id: "staff",
      label: "الموظفون والصلاحيات",
      labelEn: "Staff & Permissions",
      icon: ShieldCheck,
    },
  ];

  const activeItem = sidebarItems.find((item) => item.id === activeTab) || sidebarItems[0];

  // Helper function to render badges
  const renderItemBadge = (item: SidebarItem) => {
    if (!item.badge) return null;
    let styleClasses = "text-[9px] px-2 py-0.5 font-sans tracking-wide shrink-0 border ";
    if (item.badgeType === "gold") {
      styleClasses += "bg-gradient-to-r from-[#C8A96B]/20 to-[#C8A96B]/5 text-[#C8A96B] border-[#C8A96B]/30";
    } else if (item.badgeType === "danger") {
      styleClasses += "bg-red-500/15 text-red-500 border-red-500/30 font-bold";
    } else {
      styleClasses += "bg-neutral-800 text-neutral-400 border-neutral-700/60";
    }
    return <span className={styleClasses}>{item.badge}</span>;
  };

  const renderShellContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8 animate-fade-in text-right" style={{ direction: "rtl" }}>
            {/* Top Premium Action & Header Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#090909] border border-neutral-900 px-6 py-5">
              <div className="space-y-1 text-right">
                <div className="flex items-center gap-2 justify-start">
                  <span className="p-1 bg-[#C8A96B]/15 border border-[#C8A96B]/30 text-[#C8A96B]">
                    <Crown size={15} />
                  </span>
                  <h2 className="text-lg font-serif text-white tracking-wide">غرفة العمليات الاستراتيجية ومراقبة الأداء</h2>
                </div>
                <p className="text-[11px] text-zinc-500 font-light mt-1">
                  مؤشرات تدفق المبيعات التاريخية واللفتات الإحصائية لصالة عرض دار تاج مُهرة للأزياء الراقية
                </p>
              </div>

              {/* Responsive Elegant Selectors */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                {/* Timeframe selector pill */}
                <div className="bg-black border border-neutral-900 p-0.5 flex gap-1">
                  <button
                    onClick={() => {
                      setDashboardTimeframe("7d");
                      triggerRefresh();
                    }}
                    className={`text-[11px] px-3 py-1.5 transition-all ${
                      dashboardTimeframe === "7d"
                        ? "bg-[#C8A96B] text-black font-semibold"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    آخر ٧ أيام
                  </button>
                  <button
                    onClick={() => {
                      setDashboardTimeframe("30d");
                      triggerRefresh();
                    }}
                    className={`text-[11px] px-3 py-1.5 transition-all ${
                      dashboardTimeframe === "30d"
                        ? "bg-[#C8A96B] text-black font-semibold"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    آخر ٣٠ يوماً
                  </button>
                </div>

                {/* Instant Database Refresher */}
                <button
                  onClick={triggerRefresh}
                  className="p-2 bg-neutral-950 border border-neutral-900 text-[#C8A96B] hover:bg-neutral-900 transition-colors flex items-center justify-center relative"
                  title="تحديث البيانات الفوري"
                  disabled={isRefreshing}
                >
                  <RefreshCw size={14} className={`${isRefreshing ? "animate-spin text-amber-500" : ""}`} />
                </button>

                {/* Simulated luxury export action */}
                <button
                  onClick={() => alert("جاري إعداد تقرير الأداء المالي بصيغة PDF... يتم التشفير والإرسال لبريد النخبة الحقيقي.")}
                  className="text-[11px] px-3 py-2 bg-[#121212] hover:bg-[#181818] border border-neutral-800 text-zinc-300 hover:text-white transition-colors"
                >
                  تصدير التقرير المالي
                </button>
              </div>
            </div>

            {/* Quick Indicators / Interactive KPIs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  id: "revenue",
                  title: "إجمالي الإيرادات والمبيعات",
                  val30: "١٥٤,٨٢٠ ر.س",
                  val7: "٣٨,٩٤٠ ر.س",
                  change30: "+١٤.٢%",
                  change7: "+٨.٧%",
                  trend30: "up",
                  trend7: "up",
                  subtitle30: "مبيعات ٢٤٨ قطعة فخمة",
                  subtitle7: "مبيعات ٦١ قطعة فخمة",
                  chartAssociation: "revenue" as const
                },
                {
                  id: "orders",
                  title: "إجمالي طلبات العميلات",
                  val30: "٢٤٨ طلباً",
                  val7: "٦١ طلباً",
                  change30: "+١١.٥%",
                  change7: "+٤.٣%",
                  trend30: "up",
                  trend7: "up",
                  subtitle30: "منها ٢٦ قيد الحياكة والتفصيل",
                  subtitle7: "منها ٩ قيد المقاس يدوياً",
                  chartAssociation: "orders" as const
                },
                {
                  id: "customers",
                  title: "العميلات النخبة والولاء",
                  val30: "٤١٢ عميلة",
                  val7: "٩٨ عميلة",
                  change30: "+١٨.٩%",
                  change7: "+٦.١%",
                  trend30: "up",
                  trend7: "up",
                  subtitle30: "٢٩ عضوية ملكية جديدة",
                  subtitle7: "٥ انضممن اليوم كأعضاء",
                  chartAssociation: "revenue" as const
                },
                {
                  id: "average",
                  title: "متوسط قيمة طلب الشراء",
                  val30: "٦٢٤ ر.س",
                  val7: "٦٣٨ ر.س",
                  change30: "+٢.٤%",
                  change7: "+٣.١%",
                  trend30: "up",
                  trend7: "up",
                  subtitle30: "زيادة بطلب الحرير الكريب",
                  subtitle7: "الطلب الأعلى: عباية الملكة",
                  chartAssociation: "orders" as const
                },
                {
                  id: "conversion",
                  title: "معدل التحويل المعياري",
                  val30: "٣.٤٢%",
                  val7: "٣.٥٥%",
                  change30: "+٠.٦٢%",
                  change7: "+٠.١٥%",
                  trend30: "up",
                  trend7: "up",
                  subtitle30: "زيارة فاعلة للمقاسات",
                  subtitle7: "تفاعل مميز للواجهة",
                  chartAssociation: "revenue" as const
                }
              ].map((kpi) => {
                const isActiveMetric = selectedChartTab === kpi.chartAssociation;
                const value = dashboardTimeframe === "30d" ? kpi.val30 : kpi.val7;
                const change = dashboardTimeframe === "30d" ? kpi.change30 : kpi.change7;
                const subtitle = dashboardTimeframe === "30d" ? kpi.subtitle30 : kpi.subtitle7;
                const trend = dashboardTimeframe === "30d" ? kpi.trend30 : kpi.trend7;

                return (
                  <div
                    key={kpi.id}
                    onClick={() => {
                      if (kpi.chartAssociation) {
                        setSelectedChartTab(kpi.chartAssociation);
                      }
                    }}
                    className={`bg-[#0D0D0D] p-5 border cursor-pointer relative transition-all duration-300 group select-none ${
                      isActiveMetric
                        ? "border-[#C8A96B] bg-[#0E0B05]"
                        : "border-neutral-900 hover:border-neutral-800"
                    }`}
                  >
                    {/* Glowing Accent line for active or hovered card */}
                    <div
                      className={`absolute top-0 right-0 left-0 h-[2px] transition-all duration-300 ${
                        isActiveMetric ? "bg-[#C8A96B]" : "bg-transparent group-hover:bg-[#C8A96B]/50"
                      }`}
                    />

                    <div className="flex justify-between items-start">
                      <span className="text-zinc-500 text-[11px] font-medium leading-tight">{kpi.title}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 font-mono ${
                          trend === "up" ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"
                        }`}
                      >
                        {change}
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline gap-1.5 justify-start">
                      <span className="text-xl font-serif text-white tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
                        {value}
                      </span>
                    </div>

                    <p className="text-[10px] text-zinc-400 mt-2 font-light flex items-center gap-1 justify-start">
                      <span className="w-1.5 h-1.5 bg-[#C8A96B] rounded-full inline-block" />
                      {subtitle}
                    </p>

                    {/* Interactive Assist prompt on hover */}
                    <span className="absolute bottom-2 left-3 text-[8px] text-[#C8A96B] opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                      تفعيل الرسم الفوري ⏎
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Main Interactive Charts & Material Alerts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Wide Interactive Multi-Metric Chart Box */}
              <div className="lg:col-span-2 bg-[#0C0C0C] border border-neutral-900 p-6 flex flex-col justify-between relative overflow-hidden">
                {isRefreshing && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-20">
                    <div className="text-center space-y-2">
                      <RefreshCw className="animate-spin text-[#C8A96B] mx-auto" size={24} />
                      <p className="text-xs text-zinc-400">جاري مزامنة قواعد بيانات المبيعات الفاخرة لـ تاج مهرة...</p>
                    </div>
                  </div>
                )}

                <div>
                  {/* Chart header area */}
                  <div className="flex justify-between items-center pb-4 border-b border-neutral-900/80">
                    <div className="space-y-1 text-right">
                      <h3 className="text-sm font-medium text-white flex items-center gap-2 justify-start">
                        <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
                        {selectedChartTab === "revenue"
                          ? "مخطط الإيرادات ورسم التدفقات المالية اليومية"
                          : "مخطط الطلبات وسير إجمالي معاملات النخبة اليومي"}
                      </h3>
                      <p className="text-[10px] text-zinc-500 font-light">
                        {dashboardTimeframe === "30d"
                          ? "نطاق الفحص الإداري: الثلاثين يوماً الماضية مصنفة تدريجياً"
                          : "نطاق الفحص الإداري: الأيام السبعة الحالية من الأسبوع"}
                      </p>
                    </div>

                    {/* Chart Tabs (Stripe style) */}
                    <div className="flex gap-1.5 bg-black p-0.5 border border-neutral-900/60">
                      <button
                        onClick={() => setSelectedChartTab("revenue")}
                        className={`text-[10px] px-2.5 py-1.5 transition-all ${
                          selectedChartTab === "revenue"
                            ? "bg-[#121212] text-[#C8A96B] font-semibold border border-[#C8A96B]/30"
                            : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        الإيرادات المالية
                      </button>
                      <button
                        onClick={() => setSelectedChartTab("orders")}
                        className={`text-[10px] px-2.5 py-1.5 transition-all ${
                          selectedChartTab === "orders"
                            ? "bg-[#121212] text-[#C8A96B] font-semibold border border-[#C8A96B]/30"
                            : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        حجم الطلبيات
                      </button>
                    </div>
                  </div>

                  {/* Chart statistics legends */}
                  <div className="grid grid-cols-3 gap-2 py-3 bg-neutral-900/20 border-b border-neutral-900/40 px-3 my-2 text-[10px] text-right">
                    <div>
                      <span className="text-zinc-500 block">القيمة الأعلى للتسجيل:</span>
                      <span className="text-white font-mono font-medium">
                        {selectedChartTab === "revenue"
                          ? (dashboardTimeframe === "30d" ? "٥٤,٨٢٠ ر.س" : "٧,٨٠٠ ر.س")
                          : (dashboardTimeframe === "30d" ? "٨٠ طلباً" : "١٢ طلباً")}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">المتوسط اليومي العام:</span>
                      <span className="text-[#C8A96B] font-mono font-medium">
                        {selectedChartTab === "revenue"
                          ? (dashboardTimeframe === "30d" ? "٥,١٦٠ ر.س" : "٥,٥٦٢ ر.س")
                          : (dashboardTimeframe === "30d" ? "٨ طلبات" : "٨.٧ طلبات")}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">حالة ثبات خط الاتجاه:</span>
                      <span className="text-emerald-500 font-medium">مستقر وإيجابي (+٨.٤٪)</span>
                    </div>
                  </div>

                  {/* Premium Interactive SVG Chart Canvas */}
                  <div className="my-6 relative h-52">
                    {/* Horizontal Guideline Grids */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-zinc-500 text-[9px] font-mono">
                      <div className="border-b border-neutral-900 pb-1 w-full flex justify-between">
                        <span>{selectedChartTab === "revenue" ? "مستوى أقصى" : "أقصى"}</span>
                        <span>{selectedChartTab === "revenue" ? "٦٠,٠٠٠ ر.س" : "١٥ طلب"}</span>
                      </div>
                      <div className="border-b border-neutral-900 pb-1 w-full flex justify-between">
                        <span>{selectedChartTab === "revenue" ? "مستوى أوسط" : "أوسط"}</span>
                        <span>{selectedChartTab === "revenue" ? "٣٠,٠٠٠ ر.س" : "٧.٥ طلب"}</span>
                      </div>
                      <div className="border-b border-neutral-900/20 pb-1 w-full flex justify-between">
                        <span>صفر</span>
                        <span>{selectedChartTab === "revenue" ? "٠ ر.س" : "٠"}</span>
                      </div>
                    </div>

                    {/* SVG GRAPH WITH GLOWS AND HOVER BULLETS */}
                    <div className="w-full h-full relative z-10 pt-4">
                      {dashboardTimeframe === "7d" ? (
                        /* 7 DAYS PLOT */
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGoldGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#C8A96B" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#C8A96B" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Gradient Fill under the curve */}
                          <path
                            d={
                              selectedChartTab === "revenue"
                                ? "M 10 130 C 110 90, 210 120, 310 80 S 510 60, 610 30 L 690 15 L 690 160 L 10 160 Z"
                                : "M 10 120 C 110 100, 210 110, 310 90 S 510 70, 610 40 L 690 10 L 690 160 L 10 160 Z"
                            }
                            fill="url(#chartGoldGradient)"
                          />

                          {/* Smooth Curve Path */}
                          <path
                            d={
                              selectedChartTab === "revenue"
                                ? "M 10 130 C 110 90, 210 120, 310 80 S 510 60, 610 30 L 690 15"
                                : "M 10 120 C 110 100, 210 110, 310 90 S 510 70, 610 40 L 690 10"
                            }
                            fill="none"
                            stroke="#C8A96B"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />

                          {/* Interactive Points Circles */}
                          {[
                            { x: 10, y: selectedChartTab === "revenue" ? 130 : 120 },
                            { x: 120, y: selectedChartTab === "revenue" ? 100 : 90 },
                            { x: 230, y: selectedChartTab === "revenue" ? 120 : 115 },
                            { x: 340, y: selectedChartTab === "revenue" ? 85 : 95 },
                            { x: 450, y: selectedChartTab === "revenue" ? 95 : 100 },
                            { x: 570, y: selectedChartTab === "revenue" ? 45 : 50 },
                            { x: 690, y: selectedChartTab === "revenue" ? 15 : 10 },
                          ].map((pt, index) => (
                            <g key={index} className="group/point cursor-pointer">
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="4"
                                className="fill-[#080808] stroke-[#C8A96B] stroke-2 hover:r-6 transition-all"
                              />
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="8"
                                className="fill-transparent stroke-[#C8A96B]/30 hover:stroke-amber-500/50 hover:animate-ping transition-all"
                              />
                            </g>
                          ))}
                        </svg>
                      ) : (
                        /* 30 DAYS PLOT */
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGoldGradient30" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#C8A96B" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#C8A96B" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d={
                              selectedChartTab === "revenue"
                                ? "M 10 150 Q 150 140, 250 110 T 450 65 T 570 40 T 690 15 L 690 160 L 10 160 Z"
                                : "M 10 140 Q 150 130, 250 110 T 450 85 T 570 60 T 690 30 L 690 160 L 10 160 Z"
                            }
                            fill="url(#chartGoldGradient30)"
                          />
                          <path
                            d={
                              selectedChartTab === "revenue"
                                ? "M 10 150 Q 150 140, 250 110 T 450 65 T 570 40 T 690 15"
                                : "M 10 140 Q 150 130, 250 110 T 450 85 T 570 60 T 690 30"
                            }
                            fill="none"
                            stroke="#C8A96B"
                            strokeWidth="2.5"
                          />
                          {/* Denser points for 30d */}
                          {[
                            { x: 10, y: selectedChartTab === "revenue" ? 150 : 140 },
                            { x: 150, y: selectedChartTab === "revenue" ? 130 : 120 },
                            { x: 290, y: selectedChartTab === "revenue" ? 100 : 95 },
                            { x: 430, y: selectedChartTab === "revenue" ? 65 : 80 },
                            { x: 560, y: selectedChartTab === "revenue" ? 40 : 55 },
                            { x: 690, y: selectedChartTab === "revenue" ? 15 : 30 }
                          ].map((pt, index) => (
                            <circle
                              key={index}
                              cx={pt.x}
                              cy={pt.y}
                              r="3.5"
                              className="fill-[#080808] stroke-[#C8A96B] stroke-2 leading-none cursor-help hover:fill-[#C8A96B]"
                            />
                          ))}
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* X Axis Timestamps under Charts */}
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-sans border-t border-neutral-900/60 pt-3 px-1">
                    {dashboardTimeframe === "7d" ? (
                      <>
                        <span>السبت</span>
                        <span>الأحد</span>
                        <span>الإثنين</span>
                        <span>الثلاثاء</span>
                        <span>الأربعاء</span>
                        <span>الخميس</span>
                        <span>الجمعة</span>
                      </>
                    ) : (
                      <>
                        <span>أسبوع ١ (يوم ١-٥)</span>
                        <span>أسبوع ٢ (يوم ٦-١٥)</span>
                        <span>أسبوع ٣ (يوم ١٦-٢٠)</span>
                        <span>أسبوع ٤ (يوم ٢١-٣٠)</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Footnote of the chart */}
                <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center text-[10px] text-zinc-500 font-sans">
                  <span>
                    العملة المعتمدة للتدفق هي <strong>الريال السعودي (ر.س)</strong>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#C8A96B]">
                    <Sparkles size={11} /> متصل بالخادم الأصلي لدار الأزياء
                  </span>
                </div>
              </div>

              {/* Material Inventory Alerts Window */}
              <div className="bg-[#0C0C0C] border border-neutral-900 p-6 flex flex-col justify-between text-right">
                <div>
                  <div className="pb-4 border-b border-neutral-900 flex justify-between items-center">
                    <div className="space-y-1 text-right">
                      <h4 className="text-sm font-medium text-white flex items-center gap-2 justify-start">
                        <AlertCircle className="text-red-500" size={16} />
                        تنبيهات خامات صالة التفصيل والمخازن
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-light">
                        متابعة مستويات الأقمشة النادرة والخيوط الفرنسية لضمان الإنتاج الفاخر
                      </p>
                    </div>
                  </div>

                  {/* Alerts Items Stack with custom progress bars and pulse beacons */}
                  <div className="mt-5 space-y-5">
                    {[
                      {
                        fabric: "حرير كريب صالونا الياباني الفاخر",
                        left: "١٢ متراً متبقية فقط",
                        percent: 12,
                        status: "danger",
                        statusText: "حرج جداً - حياكة عباية الأغصان الملكية"
                      },
                      {
                        fabric: "خيوط ذهب فرنسية أصلية مجدولة",
                        left: "٣ بكرات متبقية",
                        percent: 8,
                        status: "danger",
                        statusText: "ينفد سريعاً - مطرزات النخبة المطابقة للطلب"
                      },
                      {
                        fabric: "شيفون دبل سوبر ملكي أسود غامق",
                        left: "٢٥ متراً متبقية",
                        percent: 32,
                        status: "warning",
                        statusText: "مستوى متوسط - طرح مرافقة لقطع السترة"
                      },
                      {
                        fabric: "دانتيـل شانتيلي الإيطالي العريض",
                        left: "٤ أمتار متبقية",
                        percent: 5,
                        status: "danger",
                        statusText: "حرج للغاية - جلابيات الأعياد المرصعة"
                      }
                    ].map((alertItem, i) => (
                      <div key={i} className="space-y-2 pb-3 border-b border-neutral-900/60 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start text-xs">
                          <div className="space-y-0.5 text-right">
                            <span className="text-zinc-200 font-medium block">{alertItem.fabric}</span>
                            <span className="text-[10px] text-[#C8A96B] block">{alertItem.statusText}</span>
                          </div>
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 whitespace-nowrap ${
                              alertItem.status === "danger"
                                ? "text-red-400 bg-red-900/20 border border-red-900/40"
                                : "text-amber-400 bg-amber-900/20 border border-amber-900/40"
                            }`}
                          >
                            {alertItem.left}
                          </span>
                        </div>

                        {/* Visual Segmented Progress Bar */}
                        <div className="h-1.5 w-full bg-[#151515] relative overflow-hidden">
                          <div
                            className={`h-full transition-all duration-1000 ${
                              alertItem.status === "danger"
                                ? "bg-red-500"
                                : "bg-[#C8A96B]"
                            }`}
                            style={{ width: `${alertItem.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900/60">
                  <button
                    onClick={() => setActiveTab("inventory")}
                    className="w-full text-center py-2 bg-neutral-950 hover:bg-[#121212] text-[#C8A96B] hover:text-white text-xs border border-neutral-800 transition-all font-medium"
                  >
                    إرسال طلب توفير الأنسجة العاقرة
                  </button>
                </div>
              </div>

            </div>

            {/* Structured Secondary Layout for Records (Best Sellers, Recent Orders, Elite Customers) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* Best Selling Products Panel */}
              <div className="bg-[#0C0C0C] border border-neutral-900 p-6 flex flex-col justify-between text-right">
                <div>
                  <div className="pb-4 border-b border-neutral-900 flex justify-between items-center">
                    <div className="space-y-1 text-right">
                      <h4 className="text-sm font-medium text-white flex items-center gap-1.5 justify-start">
                        <ShoppingBag className="text-[#C8A96B]" size={15} />
                        المعروضات والمنسوجات الأكثر مبيعاً
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-light">
                        القطع والعباءات الراقية الأكثر حجزاً وتفصيلاً من عميلاتنا
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    {[
                      {
                        name: "عباءة الملكة مطرزة بالخيوط الذهبية",
                        cat: "عباءات سوداء سود السواد",
                        sales: "٨٤ قطعة",
                        rev: "٦٣,٠٠٠ ر.س",
                        status: "ينفد متبقي ٣ فقط"
                      },
                      {
                        name: "جلابية المهرة الملكية كريب حرير",
                        cat: "جلابيات المناسبات الخاصة صالونا",
                        sales: "٦٢ قطعة",
                        rev: "٤٩,٦٠٠ ر.س",
                        status: "١٥ قطعة في المخبر"
                      },
                      {
                        name: "طرحة التاج الفاخرة دانتيل فرنسي",
                        cat: "طرح وإكسسوارات الرأس ومكمّلات",
                        sales: "١٢٠ قطعة",
                        rev: "٢١,٦٠٠ ر.س",
                        status: "مستقر"
                      },
                      {
                        name: "عباءة السدو التراثية بقماش الكريب الفخم",
                        cat: "التشكيلات الكلاسيكية التراثية",
                        sales: "٣٨ قطعة",
                        rev: "٣٠,٤٠٠ ر.س",
                        status: "ينفد متبقي ١ فقط"
                      }
                    ].map((prod, i) => (
                      <div key={i} className="flex justify-between items-center text-xs pb-3.5 border-b border-neutral-900/60 last:border-0 last:pb-0">
                        <div className="space-y-0.5 text-right flex-1 pl-4">
                          <span className="text-zinc-200 font-medium block">{prod.name}</span>
                          <span className="text-[10px] text-zinc-500 block">{prod.cat}</span>
                        </div>
                        <div className="text-left shrink-0">
                          <span className="font-mono text-[11px] text-[#C8A96B] block font-medium">{prod.rev}</span>
                          <span className="text-[9px] text-zinc-500 block font-light">تم تسليم {prod.sales}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab("products")}
                    className="w-full text-center py-2 bg-[#121212] hover:bg-[#181818] text-zinc-400 hover:text-white text-xs border border-neutral-900 transition-colors"
                  >
                    عرض كاتالوج المعروضات بالكامل
                  </button>
                </div>
              </div>

              {/* Recent Orders Segment with Shipping Logs */}
              <div className="bg-[#0C0C0C] border border-neutral-900 p-6 flex flex-col justify-between text-right">
                <div>
                  <div className="pb-4 border-b border-neutral-900 flex justify-between items-center">
                    <div className="space-y-1 text-right">
                      <h4 className="text-sm font-medium text-white flex items-center gap-1.5 justify-start">
                        <ClipboardList className="text-[#C8A96B]" size={15} />
                        أحدث المعاملات وطلبات التخصيص
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-light">تدرج الحضور الجغرافي وحالات نقل وتسليم الطلبات</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    {[
                      {
                        id: "#TM-2081",
                        client: "عنود السويلم",
                        date: "منذ ٣ دقائق كحد أقصى",
                        price: "٢,٤٥٠ ر.س",
                        status: "جاري التفصيل والتطريز يدوياً",
                        statusStyle: "text-amber-400 bg-amber-955/20 border border-amber-900/30"
                      },
                      {
                        id: "#TM-2080",
                        client: "سارة الرميحي",
                        date: "اليوم، ١١:٤٥ ص",
                        price: "١,٨٠٠ ر.س",
                        status: "شحن سمسا - مرافقة جدة",
                        statusStyle: "text-emerald-400 bg-emerald-955/20 border border-emerald-900/30"
                      },
                      {
                        id: "#TM-2079",
                        client: "مها العتيبي",
                        date: "أمس، ٨:٣٠ م",
                        price: "٣,١٢٠ ر.س",
                        status: "جاهز للاستلام بصالة العرض كلاسيك",
                        statusStyle: "text-blue-400 bg-blue-955/20 border border-blue-900/30"
                      },
                      {
                        id: "#TM-2078",
                        client: "دلال السديري",
                        date: "أمس، ٤:١٠ م",
                        price: "٩٧٠ ر.س",
                        status: "تم التسليم والمطابقة لرضى العميلة",
                        statusStyle: "text-zinc-400 bg-zinc-900 text-zinc-300 border border-neutral-800"
                      }
                    ].map((order, i) => (
                      <div key={i} className="flex justify-between items-center text-xs pb-3.5 border-b border-neutral-900/60 last:border-0 last:pb-0">
                        <div className="space-y-1 text-right flex-1 pl-4">
                          <div className="flex items-center gap-2 justify-start">
                            <span className="font-mono text-[#C8A96B] font-bold">{order.id}</span>
                            <span className="text-zinc-300 font-medium">{order.client}</span>
                          </div>
                          <span className="text-[9px] text-[#C8A96B] font-mono inline-block px-1.5 py-0.5 rounded-none border border-[#C8A96B]/10">
                            {order.price}
                          </span>
                        </div>
                        <div className="text-left space-y-1 shrink-0">
                          <span className={`text-[10px] px-2 py-0.5 inline-block text-[9px] font-sans ${order.statusStyle}`}>
                            {order.status}
                          </span>
                          <span className="text-[9px] text-zinc-600 block">{order.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="w-full text-center py-2 bg-[#121212] hover:bg-[#181818] text-zinc-400 hover:text-white text-xs border border-neutral-900 transition-colors"
                  >
                    تتبع وإدارات كامل المبيعات الراقية
                  </button>
                </div>
              </div>

              {/* Elite Customers Panel with VIP Levels */}
              <div className="bg-[#0C0C0C] border border-neutral-900 p-6 flex flex-col justify-between text-right">
                <div>
                  <div className="pb-4 border-b border-neutral-900 flex justify-between items-center">
                    <div className="space-y-1 text-right">
                      <h4 className="text-sm font-medium text-white flex items-center gap-1.5 justify-start">
                        <Users className="text-[#C8A96B]" size={15} />
                        أحدث زفيات صيت دار مُهرة الرائعات
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-light">صالة العضوات الفضيات، الماسيات ومفاهيم الولاء النخبوية</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4 font-sans">
                    {[
                      {
                        initials: "س س",
                        name: "سلطانة آل سعود",
                        tier: "عضوية تاج ملوكية مخصصة",
                        tierStyle: "text-amber-400 bg-amber-955/20 border border-amber-900/40",
                        reg: "منذ ساعتين كحد أقصى",
                        totalSpend: "٢٨,٤٠٠ ر.س"
                      },
                      {
                        initials: "م ب",
                        name: "موضي البواردي",
                        tier: "ماسية VIP النخبة الراغبة",
                        tierStyle: "text-[#C8A96B] bg-[#C8A96B]/10 border border-[#C8A96B]/20",
                        reg: "اليوم، ٩:١٥ ص",
                        totalSpend: "١٤,٢٠٠ ر.س"
                      },
                      {
                        initials: "ن ن",
                        name: "نوف الناصر - فرع جدة",
                        tier: "عضوية بلاتينية فخمة",
                        tierStyle: "text-zinc-300 bg-zinc-800/40 border border-neutral-700/60",
                        reg: "أمس، ١١:٠٠ م",
                        totalSpend: "٨,٧٥٠ ر.س"
                      },
                      {
                        initials: "ه ف",
                        name: "هيا الفايز - فرع الرياض",
                        tier: "عضو ذهبي مميز",
                        tierStyle: "text-yellow-600 bg-yellow-500/5 border border-yellow-500/10",
                        reg: "منذ يومين",
                        totalSpend: "٦,٨٤٠ ر.س"
                      }
                    ].map((cust, i) => (
                      <div key={i} className="flex justify-between items-center text-xs pb-3.5 border-b border-neutral-900/60 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3 text-right">
                          <div className="w-8 h-8 rounded-none border border-neutral-800 bg-black flex items-center justify-center font-bold text-[#C8A96B] text-[10px] font-sans">
                            {cust.initials}
                          </div>
                          <div className="space-y-0.5 text-right">
                            <span className="text-zinc-200 font-medium block">{cust.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 inline-block ${cust.tierStyle}`}>
                              {cust.tier}
                            </span>
                          </div>
                        </div>

                        <div className="text-left">
                          <span className="font-mono text-xs text-white block">{cust.totalSpend}</span>
                          <span className="text-[9px] text-zinc-650 block leading-tight">{cust.reg}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab("customers")}
                    className="w-full text-center py-2 bg-[#121212] hover:bg-[#181818] text-zinc-400 hover:text-white text-xs border border-neutral-900 transition-colors"
                  >
                    استعراض سجل الولاء النخبوي بالكامل
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      case "products": {
        if (isAddingProductPage) {
          return (
            <AddProductPage
              onSave={(newProd) => {
                const newId = String(Date.now());
                const formattedProduct = {
                  ...newProd,
                  id: newId,
                  status: newProd.inventory === 0 ? "OutOfStock" : "Active"
                };
                setProductsList(prev => [formattedProduct, ...prev]);
                setIsAddingProductPage(false);
              }}
              onCancel={() => setIsAddingProductPage(false)}
            />
          );
        }

        // Calculate dynamic stats for the top cards of product view
        const totalProductsCount = productsList.length;
        const activeProductsCount = productsList.filter(p => p.status === "Active").length;
        const draftProductsCount = productsList.filter(p => p.status === "Draft").length;
        const outOfStockCount = productsList.filter(p => p.inventory === 0).length;
        const lowStockCount = productsList.filter(p => p.inventory > 0 && p.inventory < 10).length;

        // Apply filters
        const filteredProductsList = productsList.filter(p => {
          // 1. Search Query
          if (productSearch) {
            const q = productSearch.toLowerCase().trim();
            const matchNameAr = p.name?.toLowerCase().includes(q);
            const matchNameEn = p.nameEn?.toLowerCase().includes(q);
            const matchSku = p.sku?.toLowerCase().includes(q);
            const matchCat = p.category?.toLowerCase().includes(q);
            if (!matchNameAr && !matchNameEn && !matchSku && !matchCat) {
              return false;
            }
          }
          // 2. Category Filter
          if (selectedCategory !== "All") {
            if (p.category !== selectedCategory) return false;
          }
          // 3. Stock Status Filter
          if (selectedStockStatus !== "All") {
            if (selectedStockStatus === "InStock" && p.inventory < 10) return false;
            if (selectedStockStatus === "LowStock" && (p.inventory >= 10 || p.inventory === 0)) return false;
            if (selectedStockStatus === "OutOfStock" && p.inventory !== 0) return false;
          }
          // 4. Status Filter
          if (selectedProductStatus !== "All") {
            if (p.status !== selectedProductStatus) return false;
          }
          return true;
        });

        return (
          <div className="space-y-6 text-right animate-fade-in" style={{ direction: "rtl" }}>
            
            {/* Elite Statistics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { title: "إجمالي التشكيلة", value: `${totalProductsCount} قطع`, sub: "كامل المعروضات والأزياء", color: "text-[#C8A96B]" },
                { title: "القطع النشطة", value: `${activeProductsCount} عبايات`, sub: "معروضة للعميلات الآن", color: "text-emerald-500" },
                { title: "المسودات", value: `${draftProductsCount} تصاميم`, sub: "قيد المراجعة وإعداد السعر", color: "text-zinc-400" },
                { title: "نفذت بالكامل", value: `${outOfStockCount} قطع`, sub: "تتطلب إعادة التفصيل فورا" , color: "text-red-500" },
                { title: "مخزون منخفض", value: `${lowStockCount} قطع`, sub: "أقل من 10 وحدات متوفرة" , color: "text-amber-500"},
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#090909] border border-neutral-900 p-4">
                  <span className="text-[10px] text-zinc-500 block font-light">{stat.title}</span>
                  <span className={`text-lg font-serif tracking-wide block mt-1 font-semibold ${stat.color}`}>{stat.value}</span>
                  <span className="text-[9px] text-zinc-550 block mt-0.5 leading-none">{stat.sub}</span>
                </div>
              ))}
            </div>

            {/* Shopify Header and Control Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-900">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-white tracking-wide">غرفة التحكم بجريدة معروضات تاج مُهرة</h3>
                <p className="text-xs text-zinc-500">إضافة، تعديل، تكرار ومسح فئات العباءات الفاخرة وخامات الكريب صالونا والحرير</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddingProductPage(true)}
                  className="text-xs px-4 py-2 bg-gradient-to-l from-[#C8A96B] to-amber-600 text-black font-semibold flex items-center gap-1.5 hover:opacity-95 transition-opacity"
                >
                  <Plus size={14} /> إضافة قطعة فنية جديدة
                </button>
              </div>
            </div>

            {/* Shopify-Level Filter Row Container */}
            <div className="bg-[#0D0D0D] border border-neutral-900 p-4 space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Search query box with interactive clean action */}
                <div className="flex items-center gap-1.5 flex-1 bg-black border border-neutral-900 px-3 py-2 text-xs">
                  <Search className="text-zinc-600 shrink-0" size={14} />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="البحث بالاسم العربي، الإنجليزي، رمز SKU، أو تفصيل القماش..."
                    className="bg-transparent text-white outline-none w-full text-xs"
                  />
                  {productSearch && (
                    <button
                      onClick={() => setProductSearch("")}
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Filters grid for categories, stock, status */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-black border border-neutral-900 px-2 py-1 text-xs text-zinc-400">
                    <span className="text-[10px] text-zinc-500">الفئة:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-transparent text-white outline-none border-none py-1 cursor-pointer font-sans"
                    >
                      <option value="All" className="bg-black text-white">الكل وافر الفئات</option>
                      <option value="عباءات سوداء" className="bg-black text-white">عباءات سوداء</option>
                      <option value="عباءات ملونة" className="bg-black text-white">عباءات ملونة</option>
                      <option value="جلابيات يومية" className="bg-black text-white">جلابيات يومية</option>
                      <option value="قطع للمناسبات" className="bg-black text-white">قطع للمناسبات</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 bg-black border border-neutral-900 px-2 py-1 text-xs text-zinc-400">
                    <span className="text-[10px] text-zinc-500">حالة المخزون:</span>
                    <select
                      value={selectedStockStatus}
                      onChange={(e) => setSelectedStockStatus(e.target.value)}
                      className="bg-transparent text-white outline-none border-none py-1 cursor-pointer font-sans"
                    >
                      <option value="All" className="bg-black text-white">الكل وافر الكمية</option>
                      <option value="InStock" className="bg-black text-white">متوفر وافر (١٠+)</option>
                      <option value="LowStock" className="bg-black text-white">مستوى منخفض (&lt;١٠)</option>
                      <option value="OutOfStock" className="bg-black text-white">نفذ من الصالة (٠)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 bg-black border border-neutral-900 px-2 py-1 text-xs text-zinc-400">
                    <span className="text-[10px] text-zinc-500">حالة العرض:</span>
                    <select
                      value={selectedProductStatus}
                      onChange={(e) => setSelectedProductStatus(e.target.value)}
                      className="bg-transparent text-white outline-none border-none py-1 cursor-pointer font-sans"
                    >
                      <option value="All" className="bg-black text-white">الكل </option>
                      <option value="Active" className="bg-black text-white">معروض للبيع (نشط)</option>
                      <option value="Draft" className="bg-black text-white">مسودة للتفصيل</option>
                      <option value="OutOfStock" className="bg-black text-white">نفذ المخزون</option>
                    </select>
                  </div>

                  {/* Clear filter shortcut button */}
                  {(selectedCategory !== "All" || selectedStockStatus !== "All" || selectedProductStatus !== "All" || productSearch !== "") && (
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSelectedStockStatus("All");
                        setSelectedProductStatus("All");
                        setProductSearch("");
                      }}
                      className="text-xs px-2.5 py-1.5 bg-red-950/20 hover:bg-red-900/10 text-red-400 border border-red-900/30 transition-all flex items-center gap-1"
                    >
                      إعادة ضبط الفلاتر
                    </button>
                  )}
                </div>
              </div>

              {/* Status information tag */}
              <div className="flex items-center justify-between text-[11px] text-zinc-500 border-t border-neutral-900 pt-2.5 font-sans">
                <p>تم تصفية وإيجاد <strong>{filteredProductsList.length}</strong> منتج من أصل {productsList.length} قطع فنية متوفرة بالموقع</p>
                <span className="flex items-center gap-1 text-[#C8A96B]">
                  <Sparkles size={11} /> صالة عرض تاج مُهرة الرقمية
                </span>
              </div>
            </div>

            {/* Shopify Table Container */}
            {filteredProductsList.length === 0 ? (
              <div className="border border-neutral-900 bg-[#070707] text-center p-16">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="mx-auto w-12 h-12 bg-neutral-900/60 rounded-none border border-neutral-800 flex items-center justify-center text-zinc-600">
                    <ShoppingBag size={22} className="stroke-zinc-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-white">لم يتم العثور على أي قطعة للفرز الحالي</h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                      جربي تصفير البحث أو تعديل الفلاتر للعميلات والنخبة لتستعروضي بقية النماذج الكلاسيكية والحرير.
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSelectedStockStatus("All");
                        setSelectedProductStatus("All");
                        setProductSearch("");
                      }}
                      className="text-xs px-4 py-2 bg-neutral-950 hover:bg-neutral-900 text-[#C8A96B] border border-neutral-800 transition-colors"
                    >
                      إعادة فرز كل المعروضات المتوفرة
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-neutral-900 bg-[#070707] overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-neutral-950 border-b border-neutral-900/80 text-[10px] text-zinc-500 uppercase tracking-widest font-sans">
                        <th className="px-5 py-4 font-normal text-right w-20">صورة القطعة</th>
                        <th className="px-5 py-4 font-normal text-right min-w-[180px]">اسم المنتج الفاخر / الوصف العربي والإنجليزية</th>
                        <th className="px-4 py-4 font-normal text-right">رمز SKU</th>
                        <th className="px-4 py-4 font-normal text-right">الفئة المعيارية</th>
                        <th className="px-4 py-4 font-normal text-right">سعر البيع</th>
                        <th className="px-4 py-4 font-normal text-right">المستودع والمخزون</th>
                        <th className="px-4 py-4 font-normal text-right">حالة العرض</th>
                        <th className="px-5 py-4 font-normal text-center min-w-[130px]">العمليات الإدارية</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/60 text-xs">
                      {filteredProductsList.map((product) => {
                        // Badge formatting for status
                        let statusColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
                        let statusLabel = "نشط ومتاح";
                        if (product.status === "Draft") {
                          statusColor = "text-zinc-400 bg-zinc-850/40 border-zinc-700/50";
                          statusLabel = "مسودة مخفية";
                        } else if (product.status === "OutOfStock" || product.inventory === 0) {
                          statusColor = "text-red-400 bg-red-950/20 border-red-900/30";
                          statusLabel = "نفذ بالكامل";
                        }

                        // Badge for stock safety levels
                        let stockBadge = (
                          <span className="text-emerald-400 font-mono font-medium">
                            {product.inventory} وحدة
                          </span>
                        );
                        if (product.inventory === 0) {
                          stockBadge = (
                            <span className="text-red-400 font-mono font-bold bg-red-950/20 px-1.5 py-0.5 border border-red-900/30">
                              غير متوفرة
                            </span>
                          );
                        } else if (product.inventory < 10) {
                          stockBadge = (
                            <span className="text-amber-400 font-mono font-medium bg-amber-950/20 px-1.5 py-0.5 border border-amber-900/30">
                              {product.inventory} وحدات (وشيك)
                            </span>
                          );
                        }

                        return (
                          <tr
                            key={product.id}
                            className="hover:bg-[#0c0c0c] transition-colors"
                          >
                            {/* Product Image Column */}
                            <td className="px-5 py-3">
                              <div className="w-12 h-14 bg-neutral-900/45 border border-neutral-900 relative overflow-hidden group select-none">
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-zinc-950">
                                    <ShoppingBag size={14} />
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* Product Names Column */}
                            <td className="px-5 py-3 max-w-xs md:max-w-sm">
                              <div className="space-y-0.5 animate-fade-in">
                                <span className="font-semibold text-zinc-100 block break-words text-xs">{product.name}</span>
                                <span className="font-mono text-[9.5px] text-zinc-500 block break-all font-medium uppercase tracking-wide leading-tight">{product.nameEn}</span>
                                <span className="text-[10px] text-zinc-400 block line-clamp-1 font-light">{product.description || "-"}</span>
                              </div>
                            </td>

                            {/* SKU Column */}
                            <td className="px-4 py-3 font-mono text-[11px] text-[#C8A96B] font-semibold">
                              {product.sku || `-`}
                            </td>

                            {/* Category Column */}
                            <td className="px-4 py-3 text-zinc-400 text-[11px]">
                              <span className="px-2 py-1 bg-zinc-900/60 border border-zinc-900 rounded-none text-[10px] text-zinc-300">
                                {product.category}
                              </span>
                            </td>

                            {/* Price Column */}
                            <td className="px-4 py-3 text-left">
                              <div className="font-serif font-semibold text-white tracking-wide text-xs">
                                {product.price} ر.س
                              </div>
                            </td>

                            {/* Inventory Column */}
                            <td className="px-4 py-3 text-[11px]">
                              {stockBadge}
                            </td>

                            {/* Status Column */}
                            <td className="px-4 py-3">
                              <span className={`text-[9px] font-medium font-sans px-2 py-0.5 border ${statusColor}`}>
                                {statusLabel}
                              </span>
                            </td>

                            {/* Actions Column */}
                            <td className="px-5 py-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => openEditProductModal(product)}
                                  className="p-1 px-1.5 bg-[#141414] hover:bg-[#1D1D1D] text-zinc-300 hover:text-[#C8A96B] border border-neutral-900 hover:border-[#C8A96B]/30 transition-colors flex items-center gap-1 cursor-pointer"
                                  title="تعديل هذا الموديل"
                                >
                                  <Edit size={12} />
                                  <span className="text-[9px] font-sans">تعديل</span>
                                </button>
                                <button
                                  onClick={() => duplicateProduct(product.id)}
                                  className="p-1 px-1.5 bg-[#141414] hover:bg-[#1D1D1D] text-zinc-300 hover:text-[#C8A96B] border border-neutral-900 hover:border-[#C8A96B]/30 transition-colors flex items-center gap-1 cursor-pointer"
                                  title="تكرار وإنتاج نسخة"
                                >
                                  <Copy size={11} />
                                  <span className="text-[9px] font-sans">تكرار</span>
                                </button>
                                <button
                                  onClick={() => deleteProduct(product.id)}
                                  className="p-1 px-1.5 bg-neutral-950/20 hover:bg-red-950/45 text-zinc-500 hover:text-red-400 border border-neutral-900 hover:border-red-900/40 transition-colors flex items-center gap-1 cursor-pointer"
                                  title="إلغاء وحذف كلي"
                                >
                                  <Trash2 size={11} />
                                  <span className="text-[9px] font-sans">حذف</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Shopify Table Footer Indicator */}
            <div className="p-4 bg-[#090909] border border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-zinc-500 font-sans">
              <div>
                <span>يعرض الآن <strong>{filteredProductsList.length}</strong> من أصل {productsList.length} تصاميم فنية بمخازن تاج مُهرة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
                <span>جميع تعديلات خادم الأمان وقاعدة البيانات النشطة تترجم في الوقت الفعلي</span>
              </div>
            </div>

            {/* Premium Dialog Slide-Over Overlay for Add / Edit Product */}
            <AnimatePresence>
              {isProductModalOpen && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="bg-[#0A0A0A] border border-[#C8A96B]/20 w-full max-w-2xl overflow-hidden relative shadow-2xl flex flex-col"
                    style={{ direction: "rtl" }}
                  >
                    {/* Golden top decorative bar */}
                    <div className="h-[3px] bg-gradient-to-r from-transparent via-[#C8A96B] to-transparent w-full" />

                    {/* Modal Header */}
                    <div className="flex justify-between items-center px-6 py-4 bg-[#0E0E0E] border-b border-neutral-900">
                      <div className="space-y-0.5 text-right">
                        <span className="text-[10px] text-[#C8A96B] uppercase font-mono font-semibold tracking-wider block">
                          {editingProduct ? "تحديث قطعة في الخزينة الإدارية" : "إضافة تحفة فنية جديدة بالكتالوج"}
                        </span>
                        <h4 className="text-sm font-serif text-white uppercase font-bold">
                          {editingProduct ? `تعديل: ${editingProduct.name}` : "مدخلات تفصيل عباية أو جلابية فاخرة"}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsProductModalOpen(false)}
                        className="p-1.5 bg-neutral-950 border border-neutral-900 text-zinc-500 hover:text-white transition-colors"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    {/* Modal Body Form */}
                    <form onSubmit={saveProduct} className="flex-1 overflow-y-auto max-h-[70vh] p-6 space-y-5 text-right select-none">
                      
                      {/* Name Ar / En */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-zinc-400 font-medium block">اسم المنتج باللغة العربية <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: عباءة السدو الراقية الحرير"
                            value={formNameAr}
                            onChange={(e) => setFormNameAr(e.target.value)}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-sans"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-zinc-400 font-medium block">اسم المنتج باللغة الإنجليزية <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: ROYAL SADO SILK ABAYA"
                            value={formNameEn}
                            onChange={(e) => setFormNameEn(e.target.value)}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-mono tracking-wide"
                          />
                        </div>
                      </div>

                      {/* Pricing / SKU / Inventory */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-zinc-400 font-medium block">سعر القطعة (ر.س) <span className="text-red-500">*</span></label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={formPrice}
                            onChange={(e) => setFormPrice(Number(e.target.value))}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-sans"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-zinc-400 font-medium block">رمز التخزين SKU <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: TM-AB-405"
                            value={formSKU}
                            onChange={(e) => setFormSKU(e.target.value)}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-mono uppercase"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-[#C8A96B] font-medium block">إجمالي المخزون (الوحدات) <span className="text-red-500">*</span></label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={formInventory}
                            onChange={(e) => setFormInventory(Number(e.target.value))}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-sans"
                          />
                        </div>
                      </div>

                      {/* Category and status */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-zinc-400 font-medium block">تصنيف ونوع المنتج</label>
                          <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-sans cursor-pointer"
                          >
                            <option value="عباءات سوداء">عباءات سوداء</option>
                            <option value="عباءات ملونة">عباءات ملونة</option>
                            <option value="جلابيات يومية">جلابيات يومية</option>
                            <option value="قطع للمناسبات">قطع للمناسبات</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-zinc-400 font-medium block">حالة النشر والبيع</label>
                          <select
                            value={formStatus}
                            onChange={(e) => setFormStatus(e.target.value as any)}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-sans cursor-pointer"
                          >
                            <option value="Active">نشط ومعروض (Active)</option>
                            <option value="Draft">مسودة وتعديل (Draft)</option>
                            <option value="OutOfStock">نفذ من الصالة (Out of Stock)</option>
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-zinc-400 font-medium block">وصف مختصر للقطعة وأهم تفاصيل الأكمام والكلوش (بالعربي)</label>
                        <textarea
                          rows={3}
                          placeholder="وصف تفصيلي يشرح جمال النسيج، ونقوش الدانتيل أو التطريز الملكي المجدول..."
                          value={formDescAr}
                          onChange={(e) => setFormDescAr(e.target.value)}
                          className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-sans resize-none"
                        />
                      </div>

                      {/* Image selector Mockup */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-zinc-400 font-medium block">رابط صورة المنتج الفاخر</label>
                        <div className="flex gap-2">
                          <select
                            value={formImgUrl}
                            onChange={(e) => setFormImgUrl(e.target.value)}
                            className="w-full bg-black border border-neutral-900 hover:border-neutral-800 focus:border-[#C8A96B]/60 text-xs text-white p-2.5 outline-none font-sans cursor-pointer"
                          >
                            {PRODUCTS.map((p, pIdx) => (
                              <option key={pIdx} value={p.imageUrl}>
                                صورة الموديل: {p.name}
                              </option>
                            ))}
                          </select>
                          <div className="w-11 h-11 bg-neutral-950 border border-neutral-905 relative shrink-0 overflow-hidden">
                            {formImgUrl ? (
                              <img src={formImgUrl} alt="Preview" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full text-zinc-700 bg-neutral-900" />
                            )}
                          </div>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-sans leading-none mt-1">يستعين النظام بصور بجودة عالية وحجم مناسب لدار تاج مهرة</p>
                      </div>

                      {/* Sizes multi checks */}
                      <div className="space-y-2">
                        <label className="text-[11px] text-zinc-400 font-medium block">المقاسات المتاحة للحياكة الفورية</label>
                        <div className="flex flex-wrap gap-2.5">
                          {["S", "M", "L", "XL", "2XL", "3XL", "4XL"].map((sz) => {
                            const isChecked = formSizes.includes(sz);
                            return (
                              <button
                                key={sz}
                                type="button"
                                onClick={() => {
                                  if (isChecked) {
                                    setFormSizes(prev => prev.filter(s => s !== sz));
                                  } else {
                                    setFormSizes(prev => [...prev, sz]);
                                  }
                                }}
                                className={`text-[10px] px-3 py-1.5 border transition-all ${
                                  isChecked
                                    ? "bg-[#C8A96B] text-black border-[#C8A96B] font-semibold"
                                    : "bg-black text-zinc-500 border-neutral-900 hover:text-white"
                                }`}
                              >
                                {sz}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Dialog actions */}
                      <div className="flex justify-end gap-2 pt-4 border-t border-neutral-900">
                        <button
                          type="button"
                          onClick={() => setIsProductModalOpen(false)}
                          className="px-4 py-2 bg-[#121212] hover:bg-[#181818] border border-neutral-900 text-zinc-400 hover:text-white text-xs transition-colors"
                        >
                          إلغاء الأمر
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-gradient-to-l from-[#C8A96B] to-amber-600 text-black font-semibold text-xs hover:opacity-95 transition-opacity"
                        >
                          {editingProduct ? "حفظ التعديلات" : "إضافة للكتالوج فوراً"}
                        </button>
                      </div>

                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        );
      }
      case "categories":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-900">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-white tracking-wide">تصنيفات التشكيلة</h3>
                <p className="text-xs text-zinc-500">مجموعات العرض في متجر تاج مهرة الفاخر</p>
              </div>
            </div>

            <div className="border border-neutral-900 bg-[#070707] text-center p-12">
              <div className="max-w-md mx-auto space-y-4">
                <div className="mx-auto w-12 h-12 bg-[#C8A96B]/10 rounded-none border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B]">
                  <Grid size={22} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white">تصنيف صالة العرض جاهز للربط</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    تشمل التصنيفات الحالية (عباءات سوداء، عباءات ملونة، جلابيات يومية، قطع المناسبات الفخمة). هيكل التعديل والحذف منظم وقابل لإعادة التشكيل.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "orders":
        return (
          <OrdersPage onBackToDashboard={() => setActiveTab("dashboard")} />
        );
      case "customers":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-900">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-white tracking-wide">سجل عميلات النخبة وضيفات الشرف</h3>
                <p className="text-xs text-zinc-500">إحصاءات عادات الشراء ومستويات الولاء المخصصة</p>
              </div>
            </div>

            <div className="border border-neutral-900 bg-[#070707] text-center p-12">
              <div className="max-w-md mx-auto space-y-4">
                <div className="mx-auto w-12 h-12 bg-[#C8A96B]/10 rounded-none border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B]">
                  <Users size={22} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white">قاعدة بيانات عائلات تاج مُهرة وعميلاتنا</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    سيربط بواجهات العميلات لتمكين رؤية شاملة للمقاسات المفضلة، تفضيلات العبايات، والنصوص المعدة لشركاء المبيعات المباشرة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "coupons":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-900">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-white tracking-wide">حملات كوبونات الخصم والولاء</h3>
                <p className="text-xs text-zinc-500">تخصيص الخصومات الحصرية لمناسبات الشراء الفخمة</p>
              </div>
            </div>

            <div className="border border-neutral-900 bg-[#070707] text-center p-12">
              <div className="max-w-md mx-auto space-y-4">
                <div className="mx-auto w-12 h-12 bg-[#C8A96B]/10 rounded-none border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B]">
                  <Ticket size={22} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white">نظام التخفيضات والكوبونات المغناطيسي</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    تخطيط لإنشاء أكواد ثابتة أو نسبة مئوية تتكامل مع شحن سلة تاج مهرة الحقيقية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-900">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-white tracking-wide">أصوات عابرات السبيل وآراء العميلات</h3>
                <p className="text-xs text-zinc-500">تقييم جودة التفصيل وجودة الخيوط والغسيل الفاخر</p>
              </div>
            </div>

            <div className="border border-neutral-900 bg-[#070707] text-center p-12">
              <div className="max-w-md mx-auto space-y-4">
                <div className="mx-auto w-12 h-12 bg-[#C8A96B]/10 rounded-none border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B]">
                  <Star size={22} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white">إدارية مراجعات جودة التصنيع</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    منصة مراقبة للتحقق من التقييمات الراقية لعرضها مباشرة كعناصر ثقة لزوار واجهة الشراء.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "inventory":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-900">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-white tracking-wide">مستودع الأقمشة ومخازن الخامات المحدودة</h3>
                <p className="text-xs text-zinc-500">إدارة ذكية لكمية الكريب، السويد الياباني، والدانتيل المخصص</p>
              </div>
            </div>

            <div className="border border-neutral-900 bg-[#070707] text-center p-12">
              <div className="max-w-md mx-auto space-y-4">
                <div className="mx-auto w-12 h-12 bg-[#C8A96B]/10 rounded-none border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B]">
                  <Layers size={22} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white">محاسبة كمية المخزون وسلسلة التوريد</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    تنبيهات فورية عند وصول الخامات النادرة إلى مستويات دنيا لضمان استمرارية إنتاج وحياكة العباءات النخبوية دون انقطاع.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-900">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-white tracking-wide">المقاييس المالية والتقارير</h3>
                <p className="text-xs text-zinc-500">أرباح القنوات، تكاليف شحن سمسا وأرامكس داخل وخارج المملكة</p>
              </div>
            </div>

            <div className="border border-neutral-900 bg-[#070707] text-center p-12">
              <div className="max-w-md mx-auto space-y-4">
                <div className="mx-auto w-12 h-12 bg-[#C8A96B]/10 rounded-none border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B]">
                  <TrendingUp size={22} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white">الذكاء المالي واسترداد القيمة</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    بناء مخصص لمراقبة متوسط سلة الشراء ومعدلات بقاء الزوار وأسرار الأداء التجاري الأكثر حيوية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-900">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-white tracking-wide">مركز الإشعارات المركزي للأعمال</h3>
                <p className="text-xs text-zinc-500">إدارة الإخطارات الصوتية وتحديثات نظام المراسلة التلقائي</p>
              </div>
            </div>

            <div className="border border-neutral-900 bg-[#070707] text-center p-12">
              <div className="max-w-md mx-auto space-y-4">
                <div className="mx-auto w-12 h-12 bg-[#C8A96B]/10 rounded-none border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B]">
                  <Bell size={22} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white">اشعارات مبيعات الموزعين والطلبيات</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    لوحة مصممة لبث الرسائل العاجلة عند ورود طلبات فورية أو تجاوز سقف المقاسات المتاحة للتألق مع عمالقة صناعة النسيج.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-900">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-white tracking-wide">إعدادات صالة عرض وعلامة تاج مُهرة</h3>
                <p className="text-xs text-zinc-500">تمكين وتخصيص إعدادات الهوية البصرية، شعارات العروض، وحسابات الاتصال</p>
              </div>
            </div>

            <div className="border border-neutral-900 bg-[#070707] text-center p-12">
              <div className="max-w-md mx-auto space-y-4">
                <div className="mx-auto w-12 h-12 bg-[#C8A96B]/10 rounded-none border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B]">
                  <SettingsIcon size={22} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white">محطة ضبط معلمات تاج مُهرة الفنية</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    خيارات ضبط العملة المحلية ر.س، ربط فيسبوك بيكسل، جوجل اناليتيكس ومحركات البحث لضمان ظهور المنتجات الفاخرة للجمهور الخليجي.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "staff":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-900">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-white tracking-wide">فريق الدعم ومجموعات الصلاحية</h3>
                <p className="text-xs text-zinc-500">تنظيم صلاحية الموظفين، مسؤولية المتجر، والمندوبين الموكلين</p>
              </div>
            </div>

            <div className="border border-neutral-900 bg-[#070707] text-center p-12">
              <div className="max-w-md mx-auto space-y-4">
                <div className="mx-auto w-12 h-12 bg-[#C8A96B]/10 rounded-none border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B]">
                  <ShieldCheck size={22} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white">المشرفون وحوكمة لوحة العمليات الفاخرة</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    منصة مراقبة لمنع دخول أي مستخدم غير مرخص، مع تشفير كلمات المرور وحفظ مستويات الأمان (Stripe & ISO standard compliance role hierarchy).
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex font-sans select-none antialiased relative overflow-hidden" style={{ direction: "rtl" }}>
      {/* Decorative Golden Ambient Aura Glows (Luxury feeling) */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#C8A96B]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-[300px] h-[300px] bg-gradient-to-tr from-[#C8A96B]/3 to-transparent blur-[100px] pointer-events-none rounded-full" />

      {/* Persistent Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 border-l border-neutral-900 bg-[#080808]/90 backdrop-blur-md justify-between h-screen sticky top-0 z-20">
        <div>
          {/* Brand Logo / Identifier */}
          <div className="px-6 py-6 border-b border-neutral-900 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-[0.15em] text-white" style={{ fontFamily: "Georgia, serif" }}>
                TAJMUHRA
              </span>
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#C8A96B] font-light mt-0.5 uppercase">
                بوابة الإدارة الفاخرة
              </span>
            </div>
            <div className="bg-[#C8A96B]/10 p-1.5 border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B]">
              <Crown size={14} />
            </div>
          </div>

          {/* Quick System Status Pill */}
          <div className="px-6 py-3 border-b border-neutral-900/60 bg-neutral-900/10 flex items-center justify-between text-[10px] text-zinc-500 font-light font-sans">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              الخادم الرئيسي متصل
            </span>
            <span className="font-mono">V2.46.1</span>
          </div>

          {/* Navigation Items list */}
          <nav className="p-4 space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto no-scrollbar">
            {sidebarItems.map((item) => {
              const IconComp = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  id={`sidebar-item-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 transition-all text-right group ${
                    isSelected
                      ? "bg-gradient-to-r from-[#C8A96B]/15 via-[#C8A96B]/5 to-transparent border-r-2 border-[#C8A96B] text-white font-medium"
                      : "text-zinc-400 hover:text-white hover:bg-neutral-900/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp
                      size={16}
                      className={`transition-colors ${
                        isSelected ? "text-[#C8A96B]" : "text-zinc-500 group-hover:text-zinc-300"
                      }`}
                    />
                    <div className="flex flex-col text-right">
                      <span className="text-xs">{item.label}</span>
                      <span className="text-[9px] text-zinc-600 font-sans group-hover:text-zinc-500 transition-colors">
                        {item.labelEn}
                      </span>
                    </div>
                  </div>
                  {renderItemBadge(item)}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Back to Retail Shop trigger at the bottom */}
        <div className="p-4 border-t border-neutral-900 bg-neutral-950/40">
          <button
            id="back-to-store-sidebar-btn"
            onClick={onBackToStore}
            className="w-full py-2.5 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-900 text-xs font-medium text-[#C8A96B] border border-[#C8A96B]/20 hover:border-[#C8A96B]/40 transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={14} className="rotate-180 text-[#C8A96B]" />
            <span>عرض المتجر الرئيسي</span>
          </button>
        </div>
      </aside>

      {/* Floating Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Content Sidebar Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-[#080808] border-l border-neutral-900 h-full z-50 flex flex-col justify-between lg:hidden"
            >
              <div>
                {/* Mobile Drawer Header */}
                <div className="px-6 py-6 border-b border-neutral-900 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-serif text-lg tracking-[0.15em] text-white" style={{ fontFamily: "Georgia, serif" }}>
                      TAJMUHRA
                    </span>
                    <span className="font-sans text-[9px] tracking-[0.2em] text-[#C8A96B] font-light mt-0.5 uppercase">
                      الإدارة المتنقلة للمتجر
                    </span>
                  </div>
                  <button
                    id="close-mobile-sidebar-btn"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1 border border-neutral-800 text-zinc-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Navigation items List */}
                <nav className="p-4 space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto no-scrollbar">
                  {sidebarItems.map((item) => {
                    const IconComp = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        id={`mob-sidebar-item-${item.id}`}
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 transition-all text-right group ${
                          isSelected
                            ? "bg-gradient-to-r from-[#C8A96B]/15 via-[#C8A96B]/5 to-transparent border-r-2 border-[#C8A96B] text-white font-medium"
                            : "text-zinc-400 hover:text-white hover:bg-neutral-900/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComp
                            size={16}
                            className={`transition-colors ${
                              isSelected ? "text-[#C8A96B]" : "text-zinc-500 group-hover:text-zinc-300"
                            }`}
                          />
                          <div className="flex flex-col text-right">
                            <span className="text-xs">{item.label}</span>
                            <span className="text-[9px] text-zinc-600 font-sans">
                              {item.labelEn}
                            </span>
                          </div>
                        </div>
                        {renderItemBadge(item)}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Close / Return Bottom Block */}
              <div className="p-4 border-t border-neutral-900 bg-neutral-950/40">
                <button
                  id="mobile-back-to-store-btn"
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    onBackToStore();
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-neutral-900 to-neutral-800 text-xs font-medium text-[#C8A96B] border border-[#C8A96B]/20 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={14} className="rotate-180" />
                  <span>العودة لشاشة البيع</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Primary Main Content Container Shell */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10 overflow-hidden w-full">
        {/* Core Premium Topbar */}
        <header className="sticky top-0 bg-[#050505]/80 backdrop-blur-md border-b border-neutral-900/80 z-20 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Topbar Right Area: Mobile Toggle & Page context breadcrumbs */}
            <div className="flex items-center gap-3">
              <button
                id="mobile-sidebar-toggle-btn"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-1.5 border border-neutral-800 bg-[#0D0D0D] text-white hover:bg-neutral-900"
              >
                <Menu size={18} />
              </button>

              {/* Advanced Luxury Breadcrumbs */}
              <nav className="hidden md:flex items-center gap-2 font-sans text-xs">
                <span className="text-zinc-500 hover:text-zinc-400 cursor-pointer" onClick={onBackToStore}>تاج مهرة</span>
                <ChevronLeft size={12} className="text-zinc-700" />
                <span className="text-zinc-400 font-medium">بوابة الإدارة</span>
                <ChevronLeft size={12} className="text-zinc-700" />
                <span className="text-white font-semibold hover:text-[#C8A96B] cursor-pointer" onClick={() => setActiveTab("dashboard")}>
                  {activeItem.label}
                </span>
                {activeTab !== "dashboard" && (
                  <>
                    <ChevronLeft size={12} className="text-zinc-700" />
                    <span className="text-[#C8A96B]/95 font-mono text-[10px] tracking-wider uppercase">
                      {activeItem.id}
                    </span>
                  </>
                )}
              </nav>

              {/* Small Active View Indicator for tiny viewports */}
              <span className="md:hidden font-serif text-sm font-semibold tracking-wide text-white">
                {activeItem.label}
              </span>
            </div>

            {/* Topbar Left Area: Global clocks, Search, Profile settings */}
            <div className="flex items-center gap-3 ml-0">
              {/* Premium Live Clock Tag in Arabic */}
              <div className="hidden xl:flex items-center gap-2 bg-[#0C0C0C] border border-neutral-900 px-3 py-1 text-[11px] text-zinc-500 font-light font-sans leading-none">
                <Calendar size={12} className="text-[#C8A96B] shrink-0" />
                <span>{currentTime || "تحميل التاريخ والوقت الحقيقي..."}</span>
              </div>

              {/* Mini back to store tag */}
              <button
                id="topbar-retail-back-btn"
                onClick={onBackToStore}
                className="text-xs text-zinc-400 hover:text-[#C8A96B] px-3 py-1.5 bg-neutral-900/30 hover:bg-neutral-900/60 border border-neutral-900 transition-all flex items-center gap-1.5"
                title="مشاهدة الواجهة الرئيسية للمتجر"
              >
                <Globe size={11} className="text-[#C8A96B]" />
                <span className="hidden sm:inline">مشاهدة المتجر</span>
              </button>

              {/* Simulated search triggers with stylish glowing ring */}
              <div className="relative hidden sm:flex items-center bg-[#0C0C0C] border border-neutral-900 focus-within:border-[#C8A96B]/30 px-3 py-1.5 text-xs text-zinc-400 transition-all">
                <Search size={14} className="text-zinc-500 mr-1.5" />
                <input
                  type="text"
                  placeholder="بحث سريع للواجهة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-600 focus:ring-0 w-36 focus:w-48 transition-all"
                />
              </div>

              {/* Notification Alerts dot */}
              <div className="relative">
                <button className="p-1.5 border border-neutral-900 bg-[#0C0C0C] hover:bg-neutral-900 text-zinc-400 hover:text-white transition-colors relative">
                  <Bell size={15} />
                  <span className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-[#C8A96B] rounded-full animate-ping" />
                  <span className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-[#C8A96B] rounded-full" />
                </button>
              </div>

              {/* Luxury Administrator Profile Badge */}
              <div className="relative">
                <button
                  id="profile-dropdown-trigger"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 bg-neutral-950 px-2.5 py-1.5 border border-neutral-900 hover:border-[#C8A96B]/30 transition-all"
                >
                  <div className="w-5 h-5 rounded-none bg-gradient-to-br from-[#C8A96B] to-amber-700 flex items-center justify-center text-[10px] text-black font-extrabold shadow-inner font-mono">
                    AD
                  </div>
                  <span className="hidden lg:inline text-[11px] text-zinc-300 font-medium">المديرة الفنية</span>
                  <ChevronDown size={12} className="text-zinc-500" />
                </button>

                {/* Profile dropdown placeholder menu with frameless precision */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-2 w-48 bg-[#0C0C0C] border border-neutral-900 shadow-2xl z-40 p-2 font-sans text-xs"
                      >
                        <div className="px-3 py-2 border-b border-neutral-900 mb-1">
                          <p className="text-white font-medium">مُهرة آل مكتوم</p>
                          <p className="text-[10px] text-[#C8A96B] mt-0.5">مشرفة الموقع الأقدم</p>
                        </div>
                        <button className="w-full text-right px-3 py-2 text-zinc-400 hover:text-white hover:bg-neutral-900 transition-colors">
                          ملفي الشخصي
                        </button>
                        <button className="w-full text-right px-3 py-2 text-zinc-400 hover:text-white hover:bg-neutral-900 transition-colors">
                          صلاحياتي الأمنية
                        </button>
                        <button className="w-full text-right px-3 py-2 text-zinc-400 hover:text-white hover:bg-neutral-900 transition-colors">
                          سجل نشاط الخادم
                        </button>
                        <hr className="border-neutral-900 my-1" />
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            onBackToStore();
                          }}
                          className="w-full text-right px-3 py-2 text-red-400 hover:text-red-300 hover:bg-neutral-900 transition-colors flex items-center justify-between"
                        >
                          <span>الخروج للمتجر</span>
                          <LogOut size={12} />
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </header>

        {/* Global Alert Notification Banner */}
        <AnimatePresence>
          {isAlertBannerVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#C8A96B]/10 border-b border-[#C8A96B]/20 relative"
            >
              <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4 font-sans text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <AlertCircle size={14} className="text-[#C8A96B] shrink-0" />
                  <span>
                    مرحباً بكِ في <strong>لوحة تحكم تاج مُهرة الفاخرة</strong>. تم إعداد الهيكل التخطيطي ونظام التنقل المتقدم مع تفعيل RTL بالكامل.
                  </span>
                </div>
                <button
                  id="close-system-banner-btn"
                  onClick={() => setIsAlertBannerVisible(false)}
                  className="text-zinc-500 hover:text-white p-1"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Inner Page Layout Container */}
        <main className="flex-1 px-4 lg:px-8 py-8 overflow-y-auto no-scrollbar max-w-7xl w-full mx-auto">
          {/* Transition wrapper to fade screen on select */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {renderShellContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mini Sticky Status Footer bar inside Admin */}
        <footer className="bg-black/50 border-t border-neutral-950 py-3.5 px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-zinc-500 font-sans mt-auto">
          <div className="flex items-center gap-4">
            <span>© ٢٠٢٦ دار تاج مُهرة للأزياء الراقية • حقوق الإدارة محفوظة</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span className="flex items-center gap-1.5">
              <Database size={12} /> النسخة الاحتياطية سحابية ومؤمنة بالكامل
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span>LATENCY: ٣٤ms</span>
            <span className="text-zinc-700">•</span>
            <span>SYSTEM ENCRYPTED (TLS 1.3)</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
