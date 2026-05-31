/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS } from "../data";
import { BookOpen, Calendar, Clock, ArrowRight, ArrowLeft, Heart, Share2, Sparkles } from "lucide-react";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  content: string[];
  quote: string;
  author: {
    name: string;
    role: string;
  };
}

export default function JournalPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: "art_1",
      title: "فلسفة الأناقة المحتشمة في تصاميم تاج مُهرة",
      subtitle: "كيف صاغ الأتيليه معايير جديدة تجمع بين الحشمة والقصّات العصرية الفاخرة",
      category: "DESIGN STORY",
      date: "31 مايو 2026",
      readTime: "4 دقائق",
      imageUrl: PRODUCTS[0].imageUrl,
      content: [
        "في عالمٍ متسارع التغير، تبرز الأناقة المحتشمة كشعار للمرأة التي تبحث عن الرقي والهدوء اللذين يعبران عن هويتها دون تكلّف. في دار تاج مُهرة، لا نعتبر العباءة مجرد قطعة ملابس، بل هي بيان معماري وتعبيري يجمع بين الهيكل الانسيابي والراحة المطلقة.",
        "تمثل تصاميمنا توازناً فريداً بين البساطة الهندسية المستوحاة من طراز 'The Row' وبين دقة التطريزات الكلاسيكية لخط كوتور 'Dior'. نختار أقمشة الكريب الياباني الثقيل والكريب الملكي الكوري خصيصاً بقدرتها الفائقة على الانسدال بحرية وتشكيل ظلال جمالية تعطي طابعاً متطوراً مع كل خطوة.",
        "نحن نؤمن بأن الحداثة لا تقتضي التخلي عن الكلاسيكية، بل تكمن في إعادة صياغتها برفق. وبفضل ورشة عملنا في الرياض، نوفر تفاصيل وحياكة يدوية مفرغة تضمن بقاء كل قطعة كإرث عائلي ثمين يحتفظ برونقه عبر الأجيال المسقبلية المشرقة."
      ],
      quote: "الأناقة الحقيقية هي عندما يكون الداخل جميلاً كالخارج تماماً وببساطة مطلقة.",
      author: {
        name: "رنا الميموني",
        role: "المديرة الإبداعية للأتيليه"
      }
    },
    {
      id: "art_2",
      title: "تاريخ الكريب الأسود وحكاية النسيج الملكي",
      subtitle: "رحلة البحث عن النعومة الفائقة ومقاومة التجاعيد للحياكة المثالية",
      category: "CRAFTMANSHIP",
      date: "14 مايو 2026",
      readTime: "6 دقائق",
      imageUrl: PRODUCTS[5].imageUrl,
      content: [
        "لطالما ارتبط اللون الأسود بالفخامة المطلقة والغموض الساحر. ولكن السر الكامن وراء العباءات الاستثنائية لدار تاج مُهرة يكمن في النسيج المختار بعناية بالغة. نأخذكم اليوم في جولة مجهرية حول خصائص الكريب الملكي الكوري والكريب الياباني الفاخر.",
        "يتميز الكريب الكوري بهيكله المسامي الذي يسمح بنفاذ الهواء، مما يجعله مثالياً لأجواء الخليج المعتدلة والدافئة. كما يتم معالجته بتقنيات متقدمة تمنحه لمعة مطفية راقية تعكس الضوء بوقار وهيبة لا تصنعها الخامات العادية.",
        "بينما يمثل الكريب الياباني الثقيل الاختيار الأول للعباءات المهيكلة (Structured Abayas) وعباءات السهرة الكلوش؛ حيث يوفر وزناً مثالياً يمنع العباءة من التطاير العشوائي، بل يجعلها تتحرك بوزن متزن يرسخ مكانتها الراقية في استقبالات الأعياد والمناسبات الرسمية الفائقة."
      ],
      quote: "جودة القماش هي النص الإبداعي الأول لأي عباءة، والتفصيل المتقن هو اللحن الذي يمنحها الحياة.",
      author: {
        name: "عبد الإله الشريف",
        role: "كبير خبراء المنسوجات والأقمشة لدى الدار"
      }
    },
    {
      id: "art_3",
      title: "تنسيق ألوان الصيف والهوية الهادئة خارج اللون الأسود",
      subtitle: "دليل الألوان الباستيل والكريمي والرمادي لطلة يومية مشرقة ومريحة",
      category: "STYLING CORNER",
      date: "05 مايو 2026",
      readTime: "3 دقائق",
      imageUrl: PRODUCTS[2].imageUrl,
      content: [
        "هل تبحثين عن التميز وتغيير الروتين المظهري اليومي؟ الألوان الهادئة مثل الرمادي المينيمال، والبيج التوب، والأبيض الكريمي تداعب حواسكِ لتضفي انطباعاً مشرقاً يفيض نضارة ووقاراً.",
        "نصيحة خبراء الأناقة لدينا تكمن في الدمج الدقيق للألوان الترابية مع ملحقات من الفضة والذهب الخالص. العباءة الرمادية الناعمة على سبيل المثال، يمكن ملائمتها مع فستان صيفي حريري من اللينن تحتها باللون الأبيض أو الكريمي لإيجاد تباين بصري مريح للعين يدوم تأثيره طويلاً.",
        "علاوة على ذلك، تعد العباءة البيضاء الواسعة الخاضعة لفهرسة Evening Collection الاختيار الأمثل لاحتفالات بعد الظهر ومناسبات العقيقة والمشاوير الراقية لما تعكسه من صفاء وروعة تليق بوقارك."
      ],
      quote: "الألوان الهادئة لا تصرخ لجذب الانتباه، لكنها تدوم في الذاكرة للأبد.",
      author: {
        name: "مها العتيبي",
        role: "مستشارة المظهر وتجربة العميل"
      }
    }
  ];

  return (
    <div className="bg-[#FAF8F4] py-16 md:py-24 select-none font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatePresence mode="wait">
          {!selectedArticle ? (
            /* --- MASTER VIEW WITH EDITORIAL LISTING --- */
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-16"
            >
              {/* Header Title with Dior typography style */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span 
                  className="text-[#C5A46D] text-[10px] uppercase tracking-[0.3em] font-serif font-light block"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  THE ATHENS JOURNAL
                </span>
                <h1 className="text-3xl md:text-5xl font-light text-[#111111] tracking-tight leading-tight">
                  مجلة أنماط الأناقة • Journal
                </h1>
                <p className="text-xs md:text-sm text-[#6E6256] leading-relaxed font-light max-w-md mx-auto">
                  تصفّحي مقالاتنا وثقافتنا الغنية؛ من كواليس الحياكة الفاخرة إلى قصص المنسوجات وأسرار الأناقة المحتشمة لدار تاج مُهرة.
                </p>
                <div className="flex justify-center pt-2">
                  <div className="w-16 h-[1px] bg-[#C5A46D]" />
                </div>
              </div>

              {/* Big Front Page Main Article Spotlight */}
              {articles[0] && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-[#E7E2DA] p-6 md:p-10 shadow-sm">
                  <div className="lg:col-span-7 aspect-[16/10] overflow-hidden relative bg-[#FAF8F4]">
                    <img
                      src={articles[0].imageUrl}
                      alt={articles[0].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[8%] hover:grayscale-0 transition-all duration-700 hover:scale-102"
                    />
                    <div className="absolute inset-4 border border-[#C5A46D]/15 pointer-events-none" />
                  </div>
                  <div className="lg:col-span-5 text-right space-y-6">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-serif">
                      {articles[0].category} • {articles[0].readTime}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-light text-[#111111] leading-snug">
                      {articles[0].title}
                    </h2>
                    <p className="text-xs md:text-sm text-[#6E6256] font-light leading-relaxed">
                      {articles[0].subtitle}
                    </p>
                    <div className="pt-2">
                      <button
                        id="read-spotlight-btn"
                        onClick={() => setSelectedArticle(articles[0])}
                        className="inline-flex items-center gap-2 text-[#111111] hover:text-[#C5A46D] transition-colors text-xs border-b border-[#111111] pb-1 cursor-pointer font-light uppercase tracking-wider"
                      >
                        <span>اقرئي المقال بالكامل</span>
                        <ArrowLeft size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Remaining grid articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
                {articles.slice(1).map((art) => (
                  <div
                    key={art.id}
                    className="space-y-6 bg-white border border-[#E7E2DA] p-6 hover:border-[#C5A46D] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="aspect-[4/3] overflow-hidden pointer-events-none relative bg-[#FAF8F4]">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale-[8%]"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#C5A46D] tracking-wide uppercase font-serif">
                        <span>{art.category}</span>
                        <span>{art.readTime} للقراءة</span>
                      </div>
                      <h3 className="text-xl font-light text-[#111111] leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-[#6E6256] leading-relaxed font-light">
                        {art.subtitle}
                      </p>
                    </div>
                    <div className="pt-4 flex justify-between items-center border-t border-[#E7E2DA]/60">
                      <span className="text-[10px] text-[#9A8F86] font-light">{art.date}</span>
                      <button
                        id={`read-article-btn-${art.id}`}
                        onClick={() => setSelectedArticle(art)}
                        className="inline-flex items-center gap-1.5 text-xs text-[#111111] hover:text-[#C5A46D] transition-colors border-b border-[#111111] pb-0.5 cursor-pointer font-light"
                      >
                        <span>تصفح المقال</span>
                        <ArrowLeft size={11} className="rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* --- SLATE MAGAZINE EDITORIAL DETAILED VIEW --- */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto space-y-12 text-right selection:bg-[#C5A46D]/10"
            >
              {/* Back breadcrumb navigation */}
              <div className="pb-6 border-b border-[#E7E2DA] flex justify-between items-center text-xs text-[#6E6256] font-light font-sans mb-8">
                <button
                  id="journal-back-list-btn"
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-2 text-[#111111] hover:text-[#C5A46D] transition-colors cursor-pointer uppercase tracking-widest text-[11px]"
                >
                  <ArrowRight size={13} />
                  <span>العودة لصفحة مجلة الدار</span>
                </button>
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <Clock size={11} className="text-[#C5A46D]" />
                  <span>زمن القراءة: {selectedArticle.readTime}</span>
                </div>
              </div>

              {/* Main Headline Block */}
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-serif block">
                  {selectedArticle.category} • {selectedArticle.date}
                </span>
                <h1 className="text-3xl md:text-5xl font-light text-[#111111] leading-tight tracking-tight">
                  {selectedArticle.title}
                </h1>
                <p className="text-base md:text-lg text-[#6E6256] font-light leading-relaxed">
                  {selectedArticle.subtitle}
                </p>
              </div>

              {/* Huge Hero Portrait / Story canvas */}
              <div className="aspect-[16/9] w-full border border-[#E7E2DA] p-2 bg-white relative overflow-hidden">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[5%] hover:grayscale-0 transition-opacity duration-700"
                />
                <div className="absolute inset-4 border border-white/20 pointer-events-none" />
              </div>

              {/* Article content and Quotes - double column space */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                
                {/* Side Quote & Author Attributes */}
                <div className="md:col-span-4 space-y-6 border-r-2 border-[#C5A46D] pr-6 self-start pt-2">
                  <p className="text-sm font-serif italic text-[#C5A46D] leading-relaxed tracking-wide">
                    "{selectedArticle.quote}"
                  </p>
                  <div>
                    <span className="block font-sans font-medium text-xs text-[#111111]">
                      {selectedArticle.author.name}
                    </span>
                    <span className="block text-[10px] text-[#6E6256] font-light mt-0.5">
                      {selectedArticle.author.role}
                    </span>
                  </div>
                  
                  {/* Share action buttons */}
                  <div className="flex items-center gap-4 text-[#9A8F86] text-xs pt-4 font-light">
                    <button className="flex items-center gap-1 hover:text-[#111111] transition-colors">
                      <Heart size={12} className="text-[#C5A46D]" />
                      <span>حفظ المقال</span>
                    </button>
                    <span>/</span>
                    <button className="flex items-center gap-1 hover:text-[#111111] transition-colors">
                      <Share2 size={11} />
                      <span>نشر الملحق</span>
                    </button>
                  </div>
                </div>

                {/* Main Paragraphs column (8 columns wide) */}
                <div className="md:col-span-8 space-y-6 text-[#6E6256] text-xs md:text-[14px] leading-relaxed font-light">
                  {selectedArticle.content.map((p, pIdx) => (
                    <p key={pIdx}>
                      {p}
                    </p>
                  ))}
                  
                  <div className="bg-white border border-[#E7E2DA] p-6 space-y-3 mt-10">
                    <div className="flex items-center gap-2 text-[#C5A46D]">
                      <Sparkles size={13} className="animate-spin" />
                      <span className="text-[10px] uppercase font-serif tracking-widest font-semibold">Boutique Secret</span>
                    </div>
                    <p className="text-xs text-[#111111] font-light">
                      هل أعجبكِ تنسيق القطعة الظاهرة في الملحق الإخباري للدار؟ يمكنكِ تنسيقها مباشرة وتفصيلها خصيصاً على مقاسكِ عبر التواصل المباشر مع استوديو التصاميم الخاص بنا.
                    </p>
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
