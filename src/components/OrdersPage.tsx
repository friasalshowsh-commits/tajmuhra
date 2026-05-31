import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Download,
  Plus,
  Eye,
  CheckCircle,
  Truck,
  RotateCcw,
  X,
  CreditCard,
  User,
  Calendar,
  DollarSign,
  Briefcase,
  AlertCircle,
  Clock,
  MapPin,
  Tag,
  Phone,
  Printer,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Package,
  Award,
  Filter,
  Check,
  Gift
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

// Order model matching the context
export interface OrderItem {
  productId: string;
  name: string;
  nameEn: string;
  imageUrl: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string; // Order Number
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  };
  date: string;
  items: OrderItem[];
  paymentStatus: "Paid" | "Pending" | "Refunded" | "Failed";
  orderStatus: "New" | "Processing" | "Packed" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";
  shippingWeight: number; // in kg
  shippingCarrier: string;
  trackingNumber?: string;
  paymentMethod: string;
  discountCode?: string;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  giftNote?: string;
  privateNotes?: string;
  timeline: {
    status: string;
    title: string;
    description: string;
    time: string;
  }[];
}

interface OrdersPageProps {
  onBackToDashboard?: () => void;
}

// Initial luxury orders list matching Tajmuhra boutique styling
const INITIAL_ORDERS: Order[] = [
  {
    id: "TM-2026-6101",
    customerName: "سارة بنت خالد الشريف",
    customerEmail: "sara.sh@luxury.sa",
    customerPhone: "+966 50 491 8823",
    customerAddress: {
      street: "طريق الملك عبدالعزيز، حي الياسمين",
      city: "الرياض",
      region: "منطقة الرياض",
      postalCode: "11564"
    },
    date: "2026-05-30T14:22:00Z",
    items: [
      {
        productId: "1",
        name: "عباءة سوداء بتفاصيل دانتيل",
        nameEn: "SHAHAD BLACK LACE ABAYA",
        imageUrl: PRODUCTS[0]?.imageUrl || "",
        color: "أسود فاخر",
        size: "M",
        price: 170,
        quantity: 1
      },
      {
        productId: "3",
        name: "عباءة بيضاء واسعة",
        nameEn: "SERENA NOBLE WHITE ABAYA",
        imageUrl: PRODUCTS[2]?.imageUrl || "",
        color: "أبيض ملكي",
        size: "M",
        price: 170,
        quantity: 1
      }
    ],
    paymentStatus: "Paid",
    orderStatus: "New",
    shippingWeight: 1.8,
    shippingCarrier: "Aramex Premium",
    paymentMethod: "Apple Pay (أبل باي)",
    discountCode: "EID2026",
    discountAmount: 34,
    shippingCost: 0, // Free
    taxAmount: 45.9,
    totalAmount: 306,
    giftNote: "برجاء كتابة كارت بعبارة: كل عام وأنتِ بقمة أناقتك يا أمي الغالية، بمناسبة عيد الفطر المبارك.",
    privateNotes: "عميلة VIP مكررة، يجب تغليف العباءة في صندوق خشبي معطر إضافي وبخور العود الملكي.",
    timeline: [
      {
        status: "New",
        title: "تم استلام الطلب وتأكيد الدفع",
        description: "تم الدفع وتأمين الحجوزات بنجاح من خلال بوابة أبل باي المعتمدة.",
        time: "30 مايو 2026، 02:22 م"
      }
    ]
  },
  {
    id: "TM-2026-6102",
    customerName: "مريم بنت عبدالعزيز الحربي",
    customerEmail: "maryam.harbi@gmail.com",
    customerPhone: "+966 53 118 4390",
    customerAddress: {
      street: "ممشى الواجهة البحرية، حي الشاطئ",
      city: "جدة",
      region: "مكة المكرمة",
      postalCode: "21563"
    },
    date: "2026-05-29T09:15:00Z",
    items: [
      {
        productId: "6",
        name: "عباءة سوداء بتطريز وردي",
        nameEn: "LUXURY ROSE GOLD EMBROIDERED ABAYA",
        imageUrl: PRODUCTS[5]?.imageUrl || "",
        color: "أسود بتطريز وردي ذهبي",
        size: "L",
        price: 250,
        quantity: 1
      }
    ],
    paymentStatus: "Paid",
    orderStatus: "Processing",
    shippingWeight: 1.1,
    shippingCarrier: "DHL Express",
    paymentMethod: "Mada (مدى)",
    discountAmount: 0,
    shippingCost: 25,
    taxAmount: 41.25,
    totalAmount: 275,
    privateNotes: "العميلة سألت بالواتس عن طول الكلوش الخلفي، تم التأكيد لها.",
    timeline: [
      {
        status: "Processing",
        title: "قيد تفصيل ومراجعة الخيوط",
        description: "باشر المعلم حياكة التطريز الذهبي الوردي وتأكيد قياس الكلوش الخلفي.",
        time: "29 مايو 2026، 01:45 م"
      },
      {
        status: "New",
        title: "تم استلام الطلب",
        description: "تم تحويل قيمة القطعة بنجاح عبر بوابة مدى الرقمية للأقسام المالية.",
        time: "29 مايو 2026، 09:15 ص"
      }
    ]
  },
  {
    id: "TM-2026-6103",
    customerName: "الجوهرة بنت تركي آل سعود",
    customerEmail: "aljohara.t@royal.gov.sa",
    customerPhone: "+966 55 999 0088",
    customerAddress: {
      street: "القصور الملكية، حي الخزامى",
      city: "الرياض",
      region: "منطقة الرياض",
      postalCode: "11411"
    },
    date: "2026-05-28T18:40:00Z",
    items: [
      {
        productId: "6",
        name: "عباءة سوداء بتطريز وردي",
        nameEn: "LUXURY ROSE GOLD EMBROIDERED ABAYA",
        imageUrl: PRODUCTS[5]?.imageUrl || "",
        color: "أسود بتطريز وردي ذهبي",
        size: "XL",
        price: 250,
        quantity: 2
      },
      {
        productId: "5",
        name: "عباءة رمادية بتفاصيل ناعمة",
        nameEn: "MINIMALIST SOFT GREY ABAYA",
        imageUrl: PRODUCTS[4]?.imageUrl || "",
        color: "رمادي هادئ",
        size: "XL",
        price: 100,
        quantity: 1
      }
    ],
    paymentStatus: "Paid",
    orderStatus: "Packed",
    shippingWeight: 3.2,
    shippingCarrier: "ناقل خاص بالدار",
    paymentMethod: "Bank Transfer (حوالة بنكية)",
    discountCode: "ROYAL_PASS",
    discountAmount: 60,
    shippingCost: 0,
    taxAmount: 81,
    totalAmount: 540,
    giftNote: "الرجاء حزم القطع في صناديق الغليتر الفاخرة الخاصة بالدار لإرسالها كإهداء لأميرة بمناسبة تخرجها.",
    privateNotes: "تم التدقيق عبر مديرة صالة العرض الخاصة. التوصيل بسيارة التوصيل النخبوية واللباس الرسمي في الموعد.",
    timeline: [
      {
        status: "Packed",
        title: "تم التغليف بالصندوق الملكي المعطر",
        description: "تم تكييف العبايات وكيها بالبخار ثم وضع البخور ودهن العود النخبوي داخل الحزمة الخشبية المعطرة.",
        time: "29 مايو 2026، 04:30 م"
      },
      {
        status: "Processing",
        title: "تجهيز القطع بالمشغل",
        description: "تم فحص تماثل التطريز وتطابق الأطوال المطلوبة.",
        time: "28 مايو 2026، 08:31 م"
      },
      {
        status: "New",
        title: "تم تأكيد التحويل البنكي يدوياً",
        description: "وافق المدير المالي على إشعار الحوالة الصادر من البنك الأهلي السعودي.",
        time: "28 مايو 2026، 06:55 م"
      }
    ]
  },
  {
    id: "TM-2026-6104",
    customerName: "هند بنت ناصر الدوسري",
    customerEmail: "hend.n@yahoo.com",
    customerPhone: "+966 54 887 2321",
    customerAddress: {
      street: "شارع الظهران، حي الدانة",
      city: "الظهران",
      region: "المنطقة الشرقية",
      postalCode: "31311"
    },
    date: "2026-05-27T11:05:00Z",
    items: [
      {
        productId: "2",
        name: "جلابية كحلي يومية",
        nameEn: "EVE PARK DAILY NAVY JALABIYA",
        imageUrl: PRODUCTS[1]?.imageUrl || "",
        color: "كحلي داكن",
        size: "S",
        price: 150,
        quantity: 1
      }
    ],
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    shippingWeight: 0.95,
    shippingCarrier: "Aramex Premium",
    trackingNumber: "AMX-883920912-SA",
    paymentMethod: "Apple Pay (أبل باي)",
    discountAmount: 0,
    shippingCost: 15,
    taxAmount: 24.75,
    totalAmount: 165,
    timeline: [
      {
        status: "Shipped",
        title: "تم تسليم الشحنة لشركة أرامكس",
        description: "في طريقها للظهران. رقم تتبع الباقة: AMX-883920912-SA.",
        time: "28 مايو 2026، 10:00 ص"
      },
      {
        status: "Packed",
        title: "اكتمل التغليف الآمن",
        description: "تم تغليف الجلابية بكرتون الشحن المقاوم للماء والأتربة.",
        time: "27 مايو 2206، 03:00 م"
      },
      {
        status: "New",
        title: "استلام وتأكيد الطلب",
        description: "تم التحقق التلقائي للرموز والدفع عبر المحفظة الأجهزة الذكية.",
        time: "27 مايو 2026، 11:05 ص"
      }
    ]
  },
  {
    id: "TM-2026-6105",
    customerName: "نورة بنت عبدالمحسن العتيبي",
    customerEmail: "noura.otaibi@hotmail.com",
    customerPhone: "+966 56 312 9954",
    customerAddress: {
      street: "شارع عبدالمجيد، حي الصحافة",
      city: "الرياض",
      region: "منطقة الرياض",
      postalCode: "11564"
    },
    date: "2026-05-26T21:10:00Z",
    items: [
      {
        productId: "4",
        name: "عباءة كحلي بتطريز لامع",
        nameEn: "ZOYA EMBROIDERED SHIMMER ABAYA",
        imageUrl: PRODUCTS[3]?.imageUrl || "",
        color: "كحلي لامع",
        size: "L",
        price: 100,
        quantity: 1
      },
      {
        productId: "5",
        name: "عباءة رمادية بتفاصيل ناعمة",
        nameEn: "MINIMALIST SOFT GREY ABAYA",
        imageUrl: PRODUCTS[4]?.imageUrl || "",
        color: "رمادي هادئ",
        size: "L",
        price: 100,
        quantity: 2
      }
    ],
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    shippingWeight: 2.6,
    shippingCarrier: "Aramex Premium",
    trackingNumber: "AMX-882103445-SA",
    paymentMethod: "Mada (مدى)",
    discountCode: "MARHABA",
    discountAmount: 15,
    shippingCost: 0,
    taxAmount: 42.75,
    totalAmount: 285,
    timeline: [
      {
        status: "Delivered",
        title: "تم تسليم العباءة بنجاح للعميلة",
        description: "تم التوقيع الإلكتروني على الاستلام يد بيد من مندوب شركة النقل أرامكس.",
        time: "29 مايو 2026، 06:12 م"
      },
      {
        status: "Shipped",
        title: "غادرت مستودعات الشحن بالرياض",
        description: "الشحنة في سيارة التسليم النهائي لحي الصحافة.",
        time: "28 مايو 2026، 09:10 ص"
      },
      {
        status: "New",
        title: "الطلب المعتمد",
        description: "تم الدفع وتلقي السجل بالمخازن مسبقاً.",
        time: "26 مايو 2026، 09:10 م"
      }
    ]
  },
  {
    id: "TM-2026-6106",
    customerName: "دلال بنت أحمد السديري",
    customerEmail: "dalal.sudairy@outlook.com",
    customerPhone: "+966 50 112 0033",
    customerAddress: {
      street: "طريق العروبة، حي السليمانية",
      city: "الرياض",
      region: "منطقة الرياض",
      postalCode: "12243"
    },
    date: "2026-05-25T15:30:00Z",
    items: [
      {
        productId: "1",
        name: "عباءة سوداء بتفاصيل دانتيل",
        nameEn: "SHAHAD BLACK LACE ABAYA",
        imageUrl: PRODUCTS[0]?.imageUrl || "",
        color: "أسود فاخر",
        size: "S",
        price: 170,
        quantity: 1
      }
    ],
    paymentStatus: "Pending",
    orderStatus: "New",
    shippingWeight: 0.9,
    shippingCarrier: "Aramex Premium",
    paymentMethod: "Tamara Split (تمارا بالتقسيط)",
    discountAmount: 0,
    shippingCost: 15,
    taxAmount: 24.75,
    totalAmount: 185,
    privateNotes: "العميلة اختارت تمارا ولكن بانتظار موافقة تمارا النهائية وتأكيد العملية.",
    timeline: [
      {
        status: "New",
        title: "إنشاء الفاتورة الأوليّة للعميل",
        description: "بانتظار استجابة بوابة الدفع بالتقسيط تمارا أو التحويل المباشر مع المالية.",
        time: "25 مايو 2026، 03:30 م"
      }
    ]
  },
  {
    id: "TM-2026-6107",
    customerName: "شهد بنت محمد العون",
    customerEmail: "shahad.oun@gmail.com",
    customerPhone: "+966 59 778 4402",
    customerAddress: {
      street: "شارع المعذر، حي النموذجية",
      city: "الرياض",
      region: "منطقة الرياض",
      postalCode: "12731"
    },
    date: "2026-05-24T10:14:00Z",
    items: [
      {
        productId: "3",
        name: "عباءة بيضاء واسعة",
        nameEn: "SERENA NOBLE WHITE ABAYA",
        imageUrl: PRODUCTS[2]?.imageUrl || "",
        color: "أبيض ملكي",
        size: "L",
        price: 170,
        quantity: 1
      }
    ],
    paymentStatus: "Refunded",
    orderStatus: "Refunded",
    shippingWeight: 0.95,
    shippingCarrier: "Aramex Premium",
    paymentMethod: "Mada (مدى)",
    discountAmount: 0,
    shippingCost: 0,
    taxAmount: 25.5,
    totalAmount: 170,
    privateNotes: "تم تقديم طلب استرجاع بسبب اختيار مقاس خارق لطول العميل، وتم تحويل القيمة لحسابها البنكي.",
    timeline: [
      {
        status: "Refunded",
        title: "اكتملت التسوية والاسترجاع",
        description: "تم استرداد العباءة الرمادية لغرفة الصيانة، وتحويل مبلغ 170 ريال بالكامل.",
        time: "26 مايو 2026، 02:00 م"
      },
      {
        status: "Delivered",
        title: "تم التوصيل المبدئي",
        description: "شحنت وتم تسجيل الاستفادة والاستلام.",
        time: "25 مايو 2026، 10:14 ص"
      }
    ]
  },
  {
    id: "TM-2026-6108",
    customerName: "حصة بنت نايف الشمري",
    customerEmail: "hissa.shammari@kaust.edu.sa",
    customerPhone: "+966 54 332 1199",
    customerAddress: {
      street: "حي الأندلس، الشارع العام",
      city: "حائل",
      region: "منطقة حائل",
      postalCode: "55421"
    },
    date: "2026-05-23T08:12:00Z",
    items: [
      {
        productId: "2",
        name: "جلابية كحلي يومية",
        nameEn: "EVE PARK DAILY NAVY JALABIYA",
        imageUrl: PRODUCTS[1]?.imageUrl || "",
        color: "كحلي داكن",
        size: "XL",
        price: 150,
        quantity: 1
      }
    ],
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
    shippingWeight: 0.9,
    shippingCarrier: "DHL Express",
    paymentMethod: "Credit Card (الكريدت كارد)",
    discountAmount: 0,
    shippingCost: 25,
    taxAmount: 26.25,
    totalAmount: 175,
    privateNotes: "تم إلغاء الطلبية وتفادي الحياكة لرفض المصرفية العملية بسب عدم استكمال معرّف الأمان ثلاثي الأبعاد 3D Secure.",
    timeline: [
      {
        status: "Cancelled",
        title: "ألغي الطلب تلقائياً",
        description: "بسبب فشل سحب الأموال المصرفي والتحويل.",
        time: "23 مايو 2026، 08:30 ص"
      },
      {
        status: "New",
        title: "محاولة عملية الدفع بالأبلكيشن",
        description: "أخفقت العملية من جهة المصدر للبطاقة المصرفية.",
        time: "23 مايو 2026، 08:12 ص"
      }
    ]
  }
];

export default function OrdersPage({ onBackToDashboard }: OrdersPageProps) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  // Selection state for bulk actions
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  // ---- SEARCH & FILTERS STATE ----
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>("All");
  const [filterOrderStatus, setFilterOrderStatus] = useState<string>("All");
  const [filterCity, setFilterCity] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("Newest");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [selectedQuickTab, setSelectedQuickTab] = useState<"all" | "pending" | "unpaid" | "completed">("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  // New Draft Order state configuration
  const [draftCustomerName, setDraftCustomerName] = useState("");
  const [draftPhone, setDraftPhone] = useState("");
  const [draftCity, setDraftCity] = useState("الرياض");
  const [draftAddress, setDraftAddress] = useState("");
  const [draftSelectedProduct, setDraftSelectedProduct] = useState<string>("1");
  const [draftSize, setDraftSize] = useState("M");
  const [draftColor, setDraftColor] = useState("أسود فاخر");
  const [draftQuantity, setDraftQuantity] = useState(1);
  const [draftGiftNote, setDraftGiftNote] = useState("");

  // Statuses list
  const ORDER_STATUSES = [
    { id: "New", label: "جديد", colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { id: "Processing", label: "قيد المعالجة", colorClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
    { id: "Packed", label: "تم التغليف", colorClass: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    { id: "Shipped", label: "تم الشحن", colorClass: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { id: "Delivered", label: "تم التسليم", colorClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { id: "Cancelled", label: "ملغي", colorClass: "bg-red-500/10 text-red-400 border-red-500/20" },
    { id: "Refunded", label: "مسترجع", colorClass: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" }
  ];

  const PAYMENT_STATUSES = [
    { id: "Paid", label: "مدفوع بالكامل", colorClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { id: "Pending", label: "معلق الدفع", colorClass: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { id: "Refunded", label: "مسترجع لحساب المشتري", colorClass: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
    { id: "Failed", label: "فشل الدفع", colorClass: "bg-red-500/10 text-red-400 border-red-500/20" }
  ];

  // Helper trigger custom notifications
  const triggerNotification = (message: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  // Switch tabs
  const handleQuickTabSelect = (tab: "all" | "pending" | "unpaid" | "completed") => {
    setSelectedQuickTab(tab);
    setCurrentPage(1);
    if (tab === "all") {
      setFilterPaymentStatus("All");
      setFilterOrderStatus("All");
    } else if (tab === "pending") {
      setFilterPaymentStatus("All");
      setFilterOrderStatus("New,Processing,Packed");
    } else if (tab === "unpaid") {
      setFilterPaymentStatus("Pending");
      setFilterOrderStatus("All");
    } else if (tab === "completed") {
      setFilterPaymentStatus("All");
      setFilterOrderStatus("Delivered");
    }
  };

  // Status Change Logic
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["orderStatus"]) => {
    // Generate description depending on state
    let actionDesc = `تعديل حالة الشحنة لتكون [${ORDER_STATUSES.find(o => o.id === newStatus)?.label}]`;
    if (newStatus === "Processing") actionDesc = "تم البدء بفك العينة وتنسيق المقاسات بقسم الحياكة بالدار.";
    if (newStatus === "Packed") actionDesc = "تم تغليف الثوب بالبخور المعطر والكرتون الملكي الفاخر المخصص لتاج مهرة.";
    if (newStatus === "Shipped") actionDesc = "تم استدعاء مندوب شركة النقل وتسليمه الحزم الراقية.";
    if (newStatus === "Delivered") actionDesc = "تسلمت العميلة القطعة الراقية وسجلت كامل الرضا.";

    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedTimeline = [
            {
              status: newStatus,
              title: `تعديل الحالة إلى ${ORDER_STATUSES.find(o => o.id === newStatus)?.label}`,
              description: actionDesc,
              time: new Date().toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' }) + "، اليوم"
            },
            ...order.timeline
          ];

          const updatedOrder: Order = {
            ...order,
            orderStatus: newStatus,
            timeline: updatedTimeline
          };

          // Auto-adjust payment status in some states
          if (newStatus === "Refunded") {
            updatedOrder.paymentStatus = "Refunded";
          }

          // If the order updated is the one open in drawer, keep it synced
          if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(updatedOrder);
          }

          return updatedOrder;
        }
        return order;
      })
    );

    triggerNotification(`نجح تحديث الطلب ${orderId} إلى حالة ${ORDER_STATUSES.find(o => o.id === newStatus)?.label}..`, "success");
  };

  // Update payment status directly
  const handleUpdatePaymentStatus = (orderId: string, newPaymentStatus: Order["paymentStatus"]) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedTimeline = [
            {
              status: "PaymentUpdated",
              title: `تحديث حالة الدفع لحساب العميل`,
              description: `غير السجل الدفع إلى: ${PAYMENT_STATUSES.find(p => p.id === newPaymentStatus)?.label}`,
              time: new Date().toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' }) + "، اليوم"
            },
            ...order.timeline
          ];

          const updatedOrder: Order = {
            ...order,
            paymentStatus: newPaymentStatus,
            timeline: updatedTimeline
          };

          if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(updatedOrder);
          }

          return updatedOrder;
        }
        return order;
      })
    );
    triggerNotification(`تم تحديث حالة دفع الفاتورة ${orderId} لـ [${PAYMENT_STATUSES.find(p => p.id === newPaymentStatus)?.label}]`, "info");
  };

  // Save private note update
  const handleSavePrivateNote = (orderId: string, noteContent: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, privateNotes: noteContent };
          if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(updatedOrder);
          }
          return updatedOrder;
        }
        return order;
      })
    );
    triggerNotification("تم حفظ الملاحظات الإدارية وتوثيقها بسلامة.", "success");
  };

  // Update Tracking Number
  const handleUpdateTracking = (orderId: string, carrier: string, trackingNum: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedTimeline = [
            {
              status: "TrackingUpdated",
              title: `تحديث خيار تتبع النقل`,
              description: `تم إسناد الشحنة لشركة [${carrier}] تحت الرقم المرجعي: ${trackingNum}`,
              time: new Date().toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' }) + "، اليوم"
            },
            ...order.timeline
          ];

          const updatedOrder = {
            ...order,
            shippingCarrier: carrier,
            trackingNumber: trackingNum,
            timeline: updatedTimeline
          };

          if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(updatedOrder);
          }
          return updatedOrder;
        }
        return order;
      })
    );
    triggerNotification("مبهر! تم ربط شحنة العميل برقم التتبع لدى شركة النقل بنجاح.", "success");
  };

  // Draft New Custom Order logic
  const handleCreateDraftOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftCustomerName || !draftPhone) {
      triggerNotification("الرجاء إدخال الاسم ورقم الجوال للعميلة.", "error");
      return;
    }

    const selectedProduct = PRODUCTS.find(p => p.id === draftSelectedProduct) || PRODUCTS[0];
    const orderNumber = `TM-2026-${Math.floor(Math.random() * 9000 + 1000)}`;
    const baseVal = selectedProduct.price * draftQuantity;
    const taxVal = Number((baseVal * 0.15).toFixed(1));
    const totalVal = baseVal + taxVal + 15; // 15 SAR flat shipping

    const newDraftOrder: Order = {
      id: orderNumber,
      customerName: draftCustomerName,
      customerEmail: `${draftCustomerName.replace(/\s+/g, '-')}@draft.sa`,
      customerPhone: draftPhone,
      customerAddress: {
        street: draftAddress || "الشارع العام، رقم السكن الافتراضي",
        city: draftCity,
        region: `منطقة ${draftCity}`,
        postalCode: "10001"
      },
      date: new Date().toISOString(),
      items: [
        {
          productId: selectedProduct.id,
          name: selectedProduct.name,
          nameEn: selectedProduct.nameEn,
          imageUrl: selectedProduct.imageUrl,
          color: draftColor,
          size: draftSize,
          price: selectedProduct.price,
          quantity: draftQuantity
        }
      ],
      paymentStatus: "Pending",
      orderStatus: "New",
      shippingWeight: 1.0,
      shippingCarrier: "Aramex Premium",
      paymentMethod: "Draft Note (فاتورة يدويّة)",
      discountAmount: 0,
      shippingCost: 15,
      taxAmount: taxVal,
      totalAmount: totalVal,
      giftNote: draftGiftNote,
      privateNotes: "طلب يدوي منشأ ومصاغ بواسطة لوحة تحكم الإدارة.",
      timeline: [
        {
          status: "New",
          title: "تصميم وإدراج مسودة الطلب يدويًا",
          description: "تم حجز الخيوط والقياسات المقترحة للتواصل مع العميلة.",
          time: new Date().toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' }) + "، اليوم"
        }
      ]
    };

    setOrders([newDraftOrder, ...orders]);
    setShowDraftModal(false);
    triggerNotification(`واو! تم حفظ طلب مسودة ${orderNumber} لعميل جديد بنجاح.`, "success");

    // Clear Draft inputs
    setDraftCustomerName("");
    setDraftPhone("");
    setDraftAddress("");
    setDraftGiftNote("");
  };

  // Bulk Actions
  const handleBulkStatusChange = (newStatus: Order["orderStatus"]) => {
    if (selectedOrderIds.length === 0) return;
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (selectedOrderIds.includes(order.id)) {
          return {
            ...order,
            orderStatus: newStatus,
            timeline: [
              {
                status: newStatus,
                title: `تعديل الحالة مجمعاً`,
                description: `تم ترقية حالة الطلبية بواسطة إجراء التعديل الجماعي في صالة العرض.`,
                time: "مؤخراً"
              },
              ...order.timeline
            ]
          };
        }
        return order;
      })
    );
    setSelectedOrderIds([]);
    triggerNotification(`نجحت العملية! تم تحديث ${selectedOrderIds.length} طلبات مختارة بشكل مجمّع.`, "success");
  };

  const handleBulkPaymentChange = (newPayment: Order["paymentStatus"]) => {
    if (selectedOrderIds.length === 0) return;
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (selectedOrderIds.includes(order.id)) {
          return { ...order, paymentStatus: newPayment };
        }
        return order;
      })
    );
    setSelectedOrderIds([]);
    triggerNotification(`تم تعديل حالة الإيراد والتحصيل المالي لـ ${selectedOrderIds.length} طلبات مختارة مسبقاً.`, "info");
  };

  const toggleSelectOrder = (id: string) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter(item => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedOrderIds.length === filteredOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(filteredOrders.map(o => o.id));
    }
  };

  // Simulated export to CSV
  const handleExportCSV = () => {
    triggerNotification("جاري إعداد وتحميل الفاتورة العامة للطلبيات بتنسيق CSV...", "info");
    setTimeout(() => {
      triggerNotification("اكتمل التصدير! تم تصدير المستندات الضريبية للعميل والتدفق المالي بنجاح.", "success");
    }, 1500);
  };

  // --- FILTER & SEARCH PROCESSING ---
  const filteredOrders = orders.filter(order => {
    // 1. Text Search query matching Order #, Customer Name, Email, or Phone
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);

    // 2. Filter Payment Status
    const matchesPayment =
      filterPaymentStatus === "All" || order.paymentStatus === filterPaymentStatus;

    // 3. Filter Order Status (Handles single or multiple comma-separated statuses in quick tabs)
    const activeOrderStatuses = filterOrderStatus.split(",");
    const matchesOrder =
      filterOrderStatus === "All" || activeOrderStatuses.includes(order.orderStatus);

    // 4. Filter City
    const matchesCity = filterCity === "All" || order.customerAddress.city === filterCity;

    return matchesSearch && matchesPayment && matchesOrder && matchesCity;
  }).sort((a, b) => {
    if (sortOption === "Newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortOption === "Oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortOption === "HighestValue") {
      return b.totalAmount - a.totalAmount;
    }
    if (sortOption === "LowestValue") {
      return a.totalAmount - b.totalAmount;
    }
    return 0;
  });

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrdersSlice = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage) || 1;

  // Real-time Metrics calculated directly from state
  const totalPaidRevenue = orders
    .filter(o => o.paymentStatus === "Paid")
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const activeNewOrProcessCount = orders.filter(
    o => o.orderStatus === "New" || o.orderStatus === "Processing"
  ).length;

  const averageBasketValue = orders.length > 0
    ? Math.round(orders.reduce((acc, curr) => acc + curr.totalAmount, 0) / orders.length)
    : 0;

  const pendingDeliveryCount = orders.filter(
    o => o.orderStatus === "Packed" || o.orderStatus === "Shipped"
  ).length;

  return (
    <div className="space-y-6 text-right select-none animate-fade-in" style={{ direction: "rtl" }}>
      
      {/* Dynamic Alert Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-[#0E0E0E] border border-[#C8A96B] px-6 py-4 shadow-2xl z-[150] flex items-center gap-3 min-w-[320px]"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
              toastType === "error"
                ? "bg-red-500/10 border-red-500/25 text-red-400"
                : toastType === "info"
                ? "bg-amber-500/10 border-amber-500/25 text-amber-300"
                : "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
            }`}>
              {toastType === "error" ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            </div>
            <div>
              <p className="text-white text-xs font-bold font-serif leading-none">إشعار نظام المبيعات</p>
              <p className="text-zinc-400 text-[10.5px] mt-1 font-sans leading-normal">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header - Matches Shopify Luxury Standard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-neutral-900">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-sans">
            <span className="hover:text-zinc-300 cursor-pointer" onClick={onBackToDashboard}>الرئيسية</span>
            <span>/</span>
            <span className="text-[#C8A96B] font-medium font-serif">طلبات العملاء وحجوزات النخبة</span>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-serif text-white tracking-wide font-bold">إدارة الطلبات الفاخرة واللوجستيات</h3>
            <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[#C8A96B] font-mono">
              TM_BOUTIQUE_FLOW
            </span>
          </div>
          <p className="text-xs text-zinc-500">مراقبة الفواتير الصادرة، عمليات كي الشحن للعباءات وتخصيص كروت الإهداء الفارهة</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="text-xs px-4 py-2 border border-neutral-900 bg-[#090909] text-zinc-400 hover:text-white hover:bg-neutral-900/60 transition-colors cursor-pointer flex items-center gap-1.5"
            id="btn-export-orders-csv"
          >
            <Download size={13} /> تصدير السجلات CSV
          </button>
          
          <button
            onClick={() => setShowDraftModal(true)}
            className="text-xs px-4 py-2 bg-gradient-to-l from-[#C8A96B] to-amber-600 text-black font-semibold flex items-center gap-1.5 hover:opacity-95 transition-opacity cursor-pointer"
            id="btn-create-draft-order"
          >
            <Plus size={14} /> إضافة طلب يدوي
          </button>
        </div>
      </div>

      {/* Real-Time Metrics cards - Premium Design with high contrast */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#090909] border border-neutral-900 p-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <span className="text-[10px] text-zinc-520 uppercase font-bold tracking-wider block font-sans">إجمالي الإيرادات المحصلة</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-xl font-serif font-bold text-white">{totalPaidRevenue.toLocaleString()}</span>
            <span className="text-[11px] text-[#C8A96B] font-serif">ر.س</span>
          </div>
          <p className="text-[9.5px] text-emerald-400 mt-1 flex items-center gap-1 font-sans">
            <span>● نقدي ورقمنة</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-500">على كل القنوات</span>
          </p>
        </div>

        <div className="bg-[#090909] border border-neutral-900 p-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <span className="text-[10px] text-zinc-520 uppercase font-bold tracking-wider block font-sans">طلبات تحت الحياكة والتدقيق</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-xl font-serif font-bold text-white">{activeNewOrProcessCount}</span>
            <span className="text-[10px] text-zinc-500">طلبيات جديدة</span>
          </div>
          <p className="text-[9.5px] text-zinc-500 mt-1 font-sans">
            مؤشر الطلبات الجديدة والمغسولة حديثاً
          </p>
        </div>

        <div className="bg-[#090909] border border-neutral-900 p-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C8A96B]/5 to-transparent rounded-bl-full pointer-events-none" />
          <span className="text-[10px] text-zinc-510 uppercase font-bold tracking-wider block font-sans">متوسط سلة المبيعات الفاخرة</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-xl font-serif font-bold text-[#C8A96B]">{averageBasketValue}</span>
            <span className="text-[11px] text-zinc-500 font-serif">ر.س / الطلب</span>
          </div>
          <p className="text-[9.5px] text-amber-500/80 mt-1 font-sans">
            قيمة ممتازة تعكس النمط السلوكي الراقي
          </p>
        </div>

        <div className="bg-[#090909] border border-neutral-900 p-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <span className="text-[10px] text-zinc-520 uppercase font-bold tracking-wider block font-sans">طلبيات جاهزة معبأة للشحن</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-xl font-serif font-bold text-white">{pendingDeliveryCount}</span>
            <span className="text-[10px] text-zinc-550 mr-1">طرود بالصندوق</span>
          </div>
          <p className="text-[9.5px] text-purple-400 mt-1 font-sans flex items-center gap-1">
            <span>كي الشحن وبخور العود</span>
          </p>
        </div>
      </div>

      {/* Main filter & table panel */}
      <div className="bg-[#090909] border border-neutral-900 overflow-hidden shadow-lg">
        
        {/* Dynamic Header Tab List - Mimics Shopify Admin Tabs */}
        <div className="bg-[#0D0D0D] border-b border-neutral-900 flex flex-wrap justify-between items-center px-4">
          <div className="flex items-center gap-1.5 overflow-x-auto scroller-hidden">
            <button
              onClick={() => handleQuickTabSelect("all")}
              className={`text-xs px-4 py-3.5 font-medium border-b-2 transition-all cursor-pointer ${
                selectedQuickTab === "all"
                  ? "border-[#C8A96B] text-[#C8A96B] font-bold"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              جميع الطلبيات والمبيعات
            </button>
            <button
              onClick={() => handleQuickTabSelect("pending")}
              className={`text-xs px-4 py-3.5 font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedQuickTab === "pending"
                  ? "border-[#C8A96B] text-[#C8A96B] font-bold"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              بانتظار الإجراء (الحياكة والتغليف)
              <span className="w-4 h-4 rounded-full text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center font-mono">
                {orders.filter(o => o.orderStatus === "New" || o.orderStatus === "Processing" || o.orderStatus === "Packed").length}
              </span>
            </button>
            <button
              onClick={() => handleQuickTabSelect("unpaid")}
              className={`text-xs px-4 py-3.5 font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedQuickTab === "unpaid"
                  ? "border-[#C8A96B] text-[#C8A96B] font-bold"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              ذمم غير مدفوعة
              <span className="w-4 h-4 rounded-full text-[9px] bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center font-mono">
                {orders.filter(o => o.paymentStatus === "Pending" || o.paymentStatus === "Failed").length}
              </span>
            </button>
            <button
              onClick={() => handleQuickTabSelect("completed")}
              className={`text-xs px-4 py-3.5 font-medium border-b-2 transition-all cursor-pointer ${
                selectedQuickTab === "completed"
                  ? "border-[#C8A96B] text-[#C8A96B] font-bold"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              المسَلَّمة بالكامل
            </button>
          </div>

          <div className="py-2 px-1 text-[11px] text-zinc-500 font-mono">
            عرض {filteredOrders.length} سجل من أصل {orders.length}
          </div>
        </div>

        {/* Filters and Actions Bar */}
        <div className="p-4 bg-black border-b border-neutral-900 space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="ابحثي بالرقم المرجعي (TM-XXX)، اسم العميلة، البريد الإلكتروني أو الجوال..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#070707] border border-neutral-900 focus:border-[#C8A96B]/50 hover:border-neutral-800 text-xs text-white p-2.5 pr-10 outline-none transition-colors"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 flex-wrap items-center">
              
              <button
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className={`text-xs px-3.5 py-2.5 border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isAdvancedOpen || filterPaymentStatus !== "All" || filterOrderStatus !== "All" || filterCity !== "All"
                    ? "border-[#C8A96B] bg-[#C8A96B]/5 text-[#C8A96B]"
                    : "border-neutral-900 bg-[#090909] text-zinc-400 hover:text-white"
                }`}
                id="btn-toggle-advanced-filters"
              >
                <SlidersHorizontal size={12} />
                <span>فرز كلي بالخيارات</span>
              </button>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-[#090909] border border-neutral-900 hover:border-neutral-800 text-xs text-zinc-300 p-2.5 pr-8 outline-none font-sans"
              >
                <option value="Newest">ترتيب: الأحدث أولاً</option>
                <option value="Oldest">ترتيب: الأقدم أولاً</option>
                <option value="HighestValue">ترتيب: الأعلى قيمة</option>
                <option value="LowestValue">ترتيب: الأقل قيمة</option>
              </select>

              {(searchQuery || filterPaymentStatus !== "All" || filterOrderStatus !== "All" || filterCity !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterPaymentStatus("All");
                    setFilterOrderStatus("All");
                    setFilterCity("All");
                    setSelectedQuickTab("all");
                    setCurrentPage(1);
                  }}
                  className="text-[10px] px-2.5 py-2 bg-red-950/25 text-red-400 border border-red-900/30 font-sans cursor-pointer flex items-center gap-1"
                >
                  <X size={10} /> رسي الفرز
                </button>
              )}
            </div>
          </div>

          {/* Advanced Sliders / Filters Drawer Drawer */}
          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 pb-2 border-t border-neutral-900/40 text-right">
                  
                  {/* Status filter */}
                  <div className="space-y-1.5">
                    <span className="text-[10.5px] text-zinc-400 font-semibold block">فلترة حالة الطلب اللوجستي:</span>
                    <select
                      value={filterOrderStatus}
                      onChange={(e) => {
                        setFilterOrderStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-[#070707] border border-neutral-900 text-xs text-zinc-300 p-2 outline-none font-sans"
                    >
                      <option value="All">كل الحالات (بدون حظر)</option>
                      {ORDER_STATUSES.map(stat => (
                        <option key={stat.id} value={stat.id}>{stat.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Payment filter */}
                  <div className="space-y-1.5">
                    <span className="text-[10.5px] text-zinc-400 font-semibold block">فلترة حالة الدفع والتحصيل المالي:</span>
                    <select
                      value={filterPaymentStatus}
                      onChange={(e) => {
                        setFilterPaymentStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-[#070707] border border-neutral-900 text-xs text-zinc-300 p-2 outline-none font-sans"
                    >
                      <option value="All">أظهر المكتمل والمسودة والفاشل كلياً</option>
                      {PAYMENT_STATUSES.map(pay => (
                        <option key={pay.id} value={pay.id}>{pay.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* City filter */}
                  <div className="space-y-1.5">
                    <span className="text-[10.5px] text-zinc-400 font-semibold block">فلترة حسب مدينة العباءة:</span>
                    <select
                      value={filterCity}
                      onChange={(e) => {
                        setFilterCity(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-[#070707] border border-neutral-900 text-xs text-zinc-300 p-2 outline-none font-sans"
                    >
                      <option value="All">كل مناطق فروع الشحن والتغطية</option>
                      <option value="الرياض">الرياض (مقر الدار الرئيسي)</option>
                      <option value="جدة">جدة (صالة الواجهة)</option>
                      <option value="حائل">حائل</option>
                      <option value="الظهران">الظهران (مستودعات الشرقية)</option>
                    </select>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bulk Action Controls - Only shown when checkboxes checked */}
          <AnimatePresence>
            {selectedOrderIds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-[#0F0D09]/80 border border-[#C8A96B]/20 p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 animate-fade-in"
              >
                <div className="flex items-center gap-1 text-[11px] text-[#C8A96B]">
                  <Check size={12} strokeWidth={3} />
                  <span>تم تحديد <strong className="font-mono text-xs">{selectedOrderIds.length}</strong> طلبات للتدقيق الجماعي.</span>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-zinc-500 whitespace-nowrap">جماعي لوجستي:</span>
                    <select
                      onChange={(e) => handleBulkStatusChange(e.target.value as any)}
                      className="bg-black border border-neutral-800 text-[10.5px] text-zinc-300 p-1.5 outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>انقلي الحالة كليّاً</option>
                      <option value="Processing">صالح للحياكة</option>
                      <option value="Packed">معبأة بالعبوات</option>
                      <option value="Shipped">سلمت للمندوب</option>
                      <option value="Cancelled">ألغي الطلبات المحددة</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-zinc-500 whitespace-nowrap">جماعي مالي الحساب:</span>
                    <select
                      onChange={(e) => handleBulkPaymentChange(e.target.value as any)}
                      className="bg-black border border-neutral-800 text-[10.5px] text-zinc-300 p-1.5 outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>تغيير حالة كشف الحساب</option>
                      <option value="Paid">الحساب مدفوع معتمد</option>
                      <option value="Pending">تعليق السحوبات والفواتير</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setSelectedOrderIds([])}
                    className="text-[10px] text-zinc-400 hover:text-white underline font-sans mr-2"
                  >
                    إلغاء التحديد
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Orders Table view */}
        <div className="overflow-x-auto">
          <table className="w-full text-right table-auto border-collapse">
            <thead>
              <tr className="border-b border-neutral-900 bg-[#0D0D0D] text-[10.5px] text-zinc-400 uppercase font-sans">
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={filteredOrders.length > 0 && selectedOrderIds.length === filteredOrders.length}
                    onChange={toggleSelectAll}
                    className="rounded border-neutral-800 bg-neutral-950 focus:ring-0 text-[#C8A96B]"
                  />
                </th>
                <th className="p-4 font-semibold tracking-wider">سجل المعاملة</th>
                <th className="p-4 font-semibold tracking-wider">العميلة</th>
                <th className="p-4 font-semibold tracking-wider">تاريخ الحياكة</th>
                <th className="p-4 font-semibold tracking-wider text-left">قيمة الفاتورة</th>
                <th className="p-4 font-semibold tracking-wider">حالة الاستلام المالي</th>
                <th className="p-4 font-semibold tracking-wider">الحالة اللوجستية</th>
                <th className="p-4 font-semibold tracking-wider text-center">خدمة العملاء</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-neutral-900 text-xs text-zinc-300 font-sans">
              {currentOrdersSlice.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-16 text-center text-zinc-600 font-light">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-10 h-10 bg-neutral-950 border border-neutral-900 mx-auto rounded-none flex items-center justify-center text-zinc-550">
                        <AlertCircle size={16} />
                      </div>
                      <p className="text-[#C8A96B] font-bold">عذراً! لا توجد سجلات مطابقة لمعايير الفرز</p>
                      <p className="text-[10.5px] text-zinc-500">حاولت تصفير الخيارات، كتابة كلمات مثل الرياض، أو كحلي هادئ أو تغيير معرّف الفرز.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentOrdersSlice.map((ord) => {
                  const payBadge = PAYMENT_STATUSES.find(p => p.id === ord.paymentStatus) || PAYMENT_STATUSES[1];
                  const orderBadge = ORDER_STATUSES.find(o => o.id === ord.orderStatus) || ORDER_STATUSES[0];
                  const isChecked = selectedOrderIds.includes(ord.id);
                  
                  return (
                    <tr
                      key={ord.id}
                      className={`hover:bg-neutral-900/15 transition-colors group cursor-pointer ${
                        isChecked ? "bg-[#C8A96B]/5" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-4 text-center cursor-auto" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectOrder(ord.id)}
                          className="rounded border-neutral-800 bg-neutral-950 focus:ring-0 text-[#C8A96B]"
                        />
                      </td>

                      {/* ID / Order Number */}
                      <td className="p-4" onClick={() => { setSelectedOrder(ord); setIsDrawerOpen(true); }}>
                        <span className="font-serif block text-white font-semibold hover:text-[#C8A96B] transition-colors">
                          {ord.id}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1 text-[9.5px] text-zinc-500">
                          <span>{ord.items.reduce((acc, curr) => acc + curr.quantity, 0)} قطع</span>
                          <span>|</span>
                          <span className="truncate max-w-[120px] inline-block font-serif text-[9px]">{ord.paymentMethod}</span>
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="p-4" onClick={() => { setSelectedOrder(ord); setIsDrawerOpen(true); }}>
                        <span className="block text-zinc-200 font-medium font-serif">{ord.customerName}</span>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500 mt-1">
                          <MapPin size={9} className="text-[#C8A96B]/60" />
                          <span>{ord.customerAddress.city}، {ord.customerAddress.region}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="p-4 font-mono text-zinc-400 font-light" onClick={() => { setSelectedOrder(ord); setIsDrawerOpen(true); }}>
                        {new Date(ord.date).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                        <div className="text-[9.5px] text-zinc-650 mt-1">
                          {new Date(ord.date).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="p-4 text-left font-serif text-[#C8A96B] font-bold" onClick={() => { setSelectedOrder(ord); setIsDrawerOpen(true); }}>
                        {ord.totalAmount.toLocaleString()} ر.س
                      </td>

                      {/* Payment Status */}
                      <td className="p-4" onClick={() => { setSelectedOrder(ord); setIsDrawerOpen(true); }}>
                        <span className={`inline-block text-[10px] px-2 py-0.5 border font-medium ${payBadge.colorClass}`}>
                          {payBadge.label}
                        </span>
                      </td>

                      {/* Order Status */}
                      <td className="p-4" onClick={() => { setSelectedOrder(ord); setIsDrawerOpen(true); }}>
                        <span className={`inline-block text-[10px] px-2 py-0.5 border font-semibold ${orderBadge.colorClass}`}>
                          {orderBadge.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center cursor-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => { setSelectedOrder(ord); setIsDrawerOpen(true); }}
                            className="w-7 h-7 bg-black hover:bg-neutral-900 border border-neutral-900 text-zinc-400 hover:text-[#C8A96B] flex items-center justify-center"
                            title="معاينة تفاصيل الفاتورة وقفة الحياكة"
                          >
                            <Eye size={12} />
                          </button>
                          
                          <a
                            href={`https://wa.me/${ord.customerPhone.replace(/[\s+]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-7 h-7 bg-black hover:bg-zinc-950 border border-neutral-900 text-emerald-500 hover:text-emerald-400 flex items-center justify-center font-sans tracking-tight"
                            title="تنسيق المقاس بالواتساب مع العميل"
                          >
                            <span className="text-[9px] font-bold">WA</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer Pagination controls */}
        {totalPages > 1 && (
          <div className="p-4 bg-[#0D0D0D] border-t border-neutral-900 flex justify-between items-center text-xs">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1.5 border border-neutral-900 bg-black text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
            >
              <ChevronRight size={14} /> الخطوات السابقة
            </button>
            
            <div className="text-zinc-500 font-mono">
              الصفحة {currentPage} من أصل {totalPages}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1.5 border border-neutral-900 bg-black text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
            >
              الخطوة التالية <ChevronLeft size={14} />
            </button>
          </div>
        )}
      </div>

      {/* --- SIDEBAR DRAWER: Shopify-Style Detailed View Panel --- */}
      <AnimatePresence>
        {isDrawerOpen && selectedOrder && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-[120]"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 max-w-xl w-full bg-[#090909] border-r border-neutral-900 z-[130] shadow-2xl flex flex-col justify-between overflow-y-auto text-right"
              style={{ direction: "rtl" }}
              id="order-details-drawer"
            >
              {/* Drawer Header */}
              <div className="p-5 bg-black border-b border-neutral-900 flex justify-between items-center sticky top-0 z-[140]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-serif text-white font-bold tracking-wider">{selectedOrder.id}</span>
                    <span className="text-[9.5px] bg-[#C8A96B]/15 border border-[#C8A96B]/30 text-[#C8A96B] px-1.5 py-0.5 font-mono">
                      {selectedOrder.paymentMethod}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-550 block font-mono">
                    تاريخ الإنشاء: {new Date(selectedOrder.date).toLocaleString("ar-EG")}
                  </p>
                </div>
                
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-none border border-neutral-900 bg-neutral-950 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-6 flex-1 text-xs">
                
                {/* 1. Primary statuses & controls section */}
                <div className="bg-[#0E0E0E] border border-neutral-900 p-4 space-y-4">
                  <span className="text-[10.5px] text-[#C8A96B] font-semibold uppercase block border-b border-neutral-900 pb-2 mb-1">
                    أدوات التحكم وتعديل حالة الطلب اللوجستية
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <span className="text-[10.5px] text-zinc-500 block">تعديل الحالة اللوجستية:</span>
                      <select
                        value={selectedOrder.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value as any)}
                        className="w-full bg-black border border-neutral-800 text-xs text-white p-2.5 font-sans"
                        id="select-order-status-control"
                      >
                        {ORDER_STATUSES.map(stat => (
                          <option key={stat.id} value={stat.id}>{stat.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10.5px] text-zinc-500 block">تغيير حالة كشف الحساب:</span>
                      <select
                        value={selectedOrder.paymentStatus}
                        onChange={(e) => handleUpdatePaymentStatus(selectedOrder.id, e.target.value as any)}
                        className="w-full bg-black border border-neutral-800 text-xs text-white p-2.5 font-sans"
                        id="select-payment-status-control"
                      >
                        {PAYMENT_STATUSES.map(pay => (
                          <option key={pay.id} value={pay.id}>{pay.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Aramex / DHL tracking section */}
                  <div className="pt-3 border-t border-neutral-900 space-y-2">
                    <span className="text-[10px] text-[#C8A96B] block">معلومات التوصيل وتتبع شركة النقل:</span>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.currentTarget;
                        const carrier = (target.elements.namedItem("carrier_input") as HTMLInputElement).value;
                        const trNum = (target.elements.namedItem("track_num_input") as HTMLInputElement).value;
                        handleUpdateTracking(selectedOrder.id, carrier, trNum);
                      }}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                    >
                      <input
                        type="text"
                        name="carrier_input"
                        placeholder="أرامكس / DHL / ساعي"
                        defaultValue={selectedOrder.shippingCarrier}
                        className="bg-black border border-neutral-950 p-1.5 text-[10.5px] text-white"
                        required
                      />
                      <input
                        type="text"
                        name="track_num_input"
                        placeholder="رقم التتبع المرجعي"
                        defaultValue={selectedOrder.trackingNumber || ""}
                        className="bg-black border border-neutral-950 p-1.5 text-[10.5px] text-white font-mono"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-[#C8A96B] hover:bg-amber-600 text-black text-[10.5px] font-bold p-1.5 transition-colors cursor-pointer"
                      >
                        حفظ التتبع
                      </button>
                    </form>
                  </div>
                </div>

                {/* 2. Products Purchased details */}
                <div className="space-y-2">
                  <span className="text-[10.5px] text-zinc-400 block font-semibold">تفاصيل المنتجات الفنية المطلوبة:</span>
                  <div className="border border-neutral-900 divide-y divide-neutral-950 bg-black">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="p-3.5 flex items-start gap-3.5">
                        <div className="w-12 h-16 bg-neutral-950 overflow-hidden shrink-0 border border-neutral-900">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover object-top"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        
                        <div className="flex-1 space-y-1 block max-w-md min-w-0">
                          <span className="text-white font-medium block truncate font-serif">{item.name}</span>
                          <span className="text-[10.1px] text-zinc-550 block font-mono">{item.nameEn}</span>
                          <div className="flex items-center gap-3 text-[10px] text-zinc-500 pt-1">
                            <span>المقاس: <strong className="text-[#C8A96B] font-mono">{item.size}</strong></span>
                            <span>|</span>
                            <span>اللون: <strong className="text-zinc-300 font-sans">{item.color}</strong></span>
                          </div>
                        </div>

                        <div className="text-left font-serif space-y-1 shrink-0">
                          <p className="text-[#C8A96B] font-bold">{item.price} ر.س</p>
                          <p className="text-[10.5px] text-zinc-500 font-mono">الكمية: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Customer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-neutral-900 p-4 bg-neutral-950/60 space-y-3">
                    <span className="text-[10px] text-zinc-550 block uppercase tracking-wider font-bold">بطاقة العميلة والاتصال</span>
                    <div className="space-y-1.5 font-sans">
                      <p className="text-white font-serif font-semibold">{selectedOrder.customerName}</p>
                      <p className="text-zinc-400 font-mono">{selectedOrder.customerEmail}</p>
                      <p className="text-[#C8A96B] font-mono block pt-0.5">{selectedOrder.customerPhone}</p>
                      
                      <div className="pt-2 border-t border-neutral-900/60 flex items-center justify-start gap-1">
                        <a
                          href={`https://wa.me/${selectedOrder.customerPhone.replace(/[\s+]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                        >
                          <ExternalLink size={10} /> افتحي محادثة واتساب للتنسيق
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border border-neutral-900 p-4 bg-neutral-950/60 space-y-3">
                    <span className="text-[10px] text-zinc-550 block uppercase tracking-wider font-bold">عنوان شحن العباءة</span>
                    <div className="space-y-1.5 font-sans text-zinc-400">
                      <p className="text-zinc-200">{selectedOrder.customerAddress.street}</p>
                      <p className="text-zinc-200">{selectedOrder.customerAddress.city}، {selectedOrder.customerAddress.region}</p>
                      <p className="text-zinc-500 text-[10px]">الرمز البريدي: {selectedOrder.customerAddress.postalCode}</p>
                      <p className="text-zinc-500 text-[10px] font-serif">الوزن التقريبي للطرود: {selectedOrder.shippingWeight} كجم</p>
                    </div>
                  </div>
                </div>

                {/* 4. Luxury Custom Packaging notes / Gift Notes */}
                {selectedOrder.giftNote && (
                  <div className="bg-[#110D03] border border-[#C8A96B]/20 p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-[#C8A96B] font-serif">
                      <Gift size={13} />
                      <span>رسالة كارت الإهداء والتقديم الخاص بالعلبة</span>
                    </div>
                    <blockquote className="text-zinc-300 italic font-medium leading-relaxed font-sans text-[11px] bg-black p-3 border-r border-[#C8A96B]/60">
                      {selectedOrder.giftNote}
                    </blockquote>
                  </div>
                )}

                {/* 5. Invoicing & Price Calculations Summary */}
                <div className="border border-neutral-900 p-4 bg-[#0A0A0A] space-y-2.5 font-sans">
                  <span className="text-[10px] text-zinc-550 block uppercase tracking-wider font-bold">سند الفواتير والضرائب الصادرة</span>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-zinc-400">
                      <span>إجمالي القيمة الأساسية للقطع:</span>
                      <span className="font-mono">
                        {selectedOrder.items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)} ر.س
                      </span>
                    </div>

                    {selectedOrder.discountAmount > 0 && (
                      <div className="flex justify-between items-center text-red-400">
                        <span>الخصم المطبق ({selectedOrder.discountCode || "مباشر"}):</span>
                        <span className="font-mono">-{selectedOrder.discountAmount} ر.س</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-zinc-400">
                      <span>تكاليف الشحن الملكي والتأمين للدار:</span>
                      <span className="font-mono">{selectedOrder.shippingCost === 0 ? "مجاني" : `${selectedOrder.shippingCost} ر.س`}</span>
                    </div>

                    <div className="flex justify-between items-center text-zinc-500 text-[10.5px]">
                      <span>ضريبة القيمة المضافة المحسوبة (١٥٪):</span>
                      <span className="font-mono">{selectedOrder.taxAmount} ر.س</span>
                    </div>

                    <div className="h-[1px] bg-neutral-900 my-2" />

                    <div className="flex justify-between items-center text-white font-serif font-bold text-sm">
                      <span>القيمة الإجمالية الصافية للعميل:</span>
                      <span className="text-[#C8A96B]">{selectedOrder.totalAmount} ر.س</span>
                    </div>
                  </div>
                </div>

                {/* 6. Admin Private Notes Section */}
                <div className="border border-neutral-900 p-4 bg-black space-y-3">
                  <span className="text-[10px] text-zinc-450 block uppercase tracking-wider font-bold">ملاحظات سرّية وخاصة بالدار (إداري فقط)</span>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const textVal = (form.elements.namedItem("private_notes_area") as HTMLTextAreaElement).value;
                      handleSavePrivateNote(selectedOrder.id, textVal);
                    }}
                    className="space-y-2"
                  >
                    <textarea
                      name="private_notes_area"
                      rows={3}
                      defaultValue={selectedOrder.privateNotes || ""}
                      placeholder="اكتبي تفاصيل المقاس المستثنى، عيوب القماش أو تنبيهات المندوب..."
                      className="w-full bg-[#080808] border border-neutral-900 focus:border-[#C8A96B]/50 p-2.5 text-xs text-zinc-300 outline-none resize-none font-sans"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-neutral-900 text-zinc-300 hover:text-white border border-neutral-850 hover:bg-neutral-850 px-4 py-1.5 text-[10px] transition-colors cursor-pointer"
                      >
                        حفظ الملاحظة الخاصة
                      </button>
                    </div>
                  </form>
                </div>

                {/* 7. Timeline History Log */}
                <div className="space-y-3 pb-8">
                  <span className="text-[10.5px] text-zinc-450 block font-semibold">سير حركات حياكة وتتبع العباءة:</span>
                  <div className="relative border-r border-neutral-900 pr-4 mr-1 space-y-4">
                    {selectedOrder.timeline.map((item, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <div className="absolute right-[-20.5px] top-1.5 w-2 h-2 rounded-full border border-black bg-[#C8A96B]" />
                        
                        <div className="space-y-0.5">
                          <p className="text-white font-medium text-[11px] font-serif">{item.title}</p>
                          <p className="text-zinc-500 text-[10.5px] leading-relaxed font-sans">{item.description}</p>
                          <p className="text-[9px] text-zinc-600 font-mono pt-0.5">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Drawer Footer actions */}
              <div className="bg-black border-t border-neutral-950 p-4 sticky bottom-0 z-[140] flex justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    triggerNotification(`جاري تحويل السجل ${selectedOrder.id} إلى طابعة البوالص الملكية...`, "info");
                    setTimeout(() => triggerNotification("نجح توليد ملف PDF ببطاقة الإهداء والتقديم بسلام.", "success"), 1200);
                  }}
                  className="bg-neutral-955 border border-neutral-900 text-zinc-400 hover:text-white px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={13} /> اطبع تذكرة الإهداء الفارهة
                </button>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="bg-[#C8A96B] hover:bg-amber-600 font-bold text-black px-5 py-2 text-xs cursor-pointer"
                >
                  باق من مراجعة الحساب
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- CREATIVE DRAFT DIALOG SHEET - High Fidelity Manual Order Creator --- */}
      <AnimatePresence>
        {showDraftModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDraftModal(false)}
              className="fixed inset-0 bg-black"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#090909] border border-[#C8A96B]/30 max-w-lg w-full max-h-[90vh] overflow-y-auto text-right p-6 z-[170] shadow-2xl relative"
              style={{ direction: "rtl" }}
            >
              {/* Corner gold touch */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#C8A96B]/15 to-transparent blur-xl pointer-events-none" />

              <div className="flex justify-between items-center pb-4 border-b border-neutral-900 mb-5">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#C8A96B] font-bold block">إنشاء مسودة طلب يدوية</span>
                  <p className="text-sm font-serif font-bold text-white leading-none">تعبئة مواصفات الشحن والحياكة المصممة يدوياً</p>
                </div>
                <button
                  onClick={() => setShowDraftModal(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateDraftOrder} className="space-y-4 text-xs font-sans">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-450 block font-semibold">اسم العميل بالكامل <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="مثل: هدى بنت سليمان الراجحي"
                      value={draftCustomerName}
                      onChange={(e) => setDraftCustomerName(e.target.value)}
                      className="w-full bg-black border border-neutral-900 focus:border-[#C8A96B]/65 text-xs text-white p-2.5 outline-none font-serif"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-450 block font-semibold">رقم الجوال للتنسيق <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="+966 50 123 4567"
                      value={draftPhone}
                      onChange={(e) => setDraftPhone(e.target.value)}
                      className="w-full bg-black border border-neutral-900 focus:border-[#C8A96B]/65 text-xs text-white p-2.5 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* City & full address */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-450 block font-semibold">المدينة</label>
                    <select
                      value={draftCity}
                      onChange={(e) => setDraftCity(e.target.value)}
                      className="w-full bg-black border border-neutral-900 text-xs text-white p-2.5 outline-none font-sans"
                    >
                      <option value="الرياض">الرياض</option>
                      <option value="جدة">جدة</option>
                      <option value="الدمام">الدمام</option>
                      <option value="مكة المكرمة">مكة المكرمة</option>
                      <option value="حائل">حائل</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-zinc-450 block font-semibold">العنوان السكني التفصيلي</label>
                    <input
                      type="text"
                      placeholder="حي الملقا، طريق الملك سلمان، مجمع السكن..."
                      value={draftAddress}
                      onChange={(e) => setDraftAddress(e.target.value)}
                      className="w-full bg-black border border-neutral-900 focus:border-[#C8A96B]/65 text-xs text-white p-2.5 outline-none"
                    />
                  </div>
                </div>

                {/* Product Selection */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-900">
                  <label className="text-zinc-400 block font-semibold">اختيار القطعة الفنية من المعرض:</label>
                  <select
                    value={draftSelectedProduct}
                    onChange={(e) => setDraftSelectedProduct(e.target.value)}
                    className="w-full bg-black border border-neutral-900 text-xs text-white p-2.5 outline-none font-serif"
                  >
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - ({p.price} ر.س)</option>
                    ))}
                  </select>
                </div>

                {/* Size / Color / Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-zinc-450 block font-semibold">تحديد المقاس:</label>
                    <select
                      value={draftSize}
                      onChange={(e) => setDraftSize(e.target.value)}
                      className="w-full bg-black border border-neutral-900 text-xs text-white p-2.5 outline-none font-sans"
                    >
                      <option value="S">S (صغير)</option>
                      <option value="M">M (وسط)</option>
                      <option value="L">L (عريض)</option>
                      <option value="XL">XL (فخم)</option>
                      <option value="2XL">2XL (خاص)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-450 block font-semibold">تفاصيل اللون بالحرير:</label>
                    <input
                      type="text"
                      value={draftColor}
                      onChange={(e) => setDraftColor(e.target.value)}
                      placeholder="أسود فاخر أو كحلي"
                      className="w-full bg-black border border-neutral-900 focus:border-[#C8A96B]/65 text-xs text-white p-2.5 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-450 block font-semibold">الكمية المطلوبة:</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={draftQuantity}
                      onChange={(e) => setDraftQuantity(Number(e.target.value))}
                      className="w-full bg-black border border-neutral-900 focus:border-[#C8A96B]/65 text-xs text-white p-2.5 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Custom Gift note */}
                <div className="space-y-1.5">
                  <label className="text-zinc-450 block font-semibold">كارت الإهداء والعبارات المخصصة بالهدية (اختياري)</label>
                  <textarea
                    rows={2}
                    placeholder="اكتبي النص الذي سيتم صياغته بخط كوفي أو ذهبي على الكارت الفاخر..."
                    value={draftGiftNote}
                    onChange={(e) => setDraftGiftNote(e.target.value)}
                    className="w-full bg-black border border-neutral-900 focus:border-[#C8A96B]/65 text-xs text-white p-2.5 outline-none resize-none"
                  />
                </div>

                {/* Pricing Summary simulations */}
                <div className="bg-[#0e0e0e] border border-neutral-900 p-3.5 space-y-2 text-zinc-500 text-[11px] font-sans">
                  <span className="text-[10px] text-[#C8A96B] font-semibold block">تقدير الفواتير الجماعي:</span>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>ثمن الأثواب المطلوبة:</span>
                    <span>
                      {((PRODUCTS.find(p => p.id === draftSelectedProduct) || PRODUCTS[0]).price * draftQuantity).toLocaleString()} ر.س
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>الشحن ومجلة غسالة الحرير المؤمنة:</span>
                    <span>15 ر.س</span>
                  </div>
                  <div className="h-[1px] bg-neutral-900 my-1" />
                  <div className="flex justify-between items-center text-white font-serif font-bold">
                    <span>إجمالي القيمة الفاتورية المسار إليها:</span>
                    <span className="text-[#C8A96B]">
                      {(((PRODUCTS.find(p => p.id === draftSelectedProduct) || PRODUCTS[0]).price * draftQuantity) * 1.15 + 15).toFixed(0)} ر.س
                    </span>
                  </div>
                </div>

                {/* Form buttons */}
                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-900">
                  <button
                    type="button"
                    onClick={() => setShowDraftModal(false)}
                    className="px-4 py-2 bg-[#0E0E0E] text-zinc-400 hover:text-white border border-neutral-900 cursor-pointer"
                  >
                    أغلق المسودة
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#C8A96B] hover:bg-amber-600 text-black font-serif font-bold transition-colors cursor-pointer"
                  >
                    تأكيد وإصدار الطلب الفاخر
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

// Visual small helper item component to optimize code workspace
function HelpCircleComponent({ stepId }: { stepId: number }) {
  let helpTxt = "صف معايير الفرز الذكي والترتيب.";
  if (stepId === 0) helpTxt = "البحث السريع يطابق اسم العميلة، المعرفة، رقم الفاتورة أو رمز الهاتف.";
  if (stepId === 1) helpTxt = "التفتيش والفرز التلقائي بمدن مثل الرياض أو جدة يسهل خدمات الشحن لشركة ناقل أو Aramex.";
  if (stepId === 2) helpTxt = "المشارف والتحصيلات التلقائية من Apple Pay مميزة بالسرعة.";
  
  return (
    <div className="hidden sm:flex items-center gap-1.5 text-zinc-500 bg-neutral-950 p-2 border border-neutral-900/60 font-sans text-[10px]">
      <Clock size={11} className="text-[#C8A96B]" />
      <span>{helpTxt}</span>
    </div>
  );
}
