import { createContext, useContext, useState, useEffect } from "react";

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cars': 'Cars',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Home Page
    'home.hero.title': 'ARAB AUTO',
    'home.hero.tagline': 'Sky is the Limit',
    'home.hero.subtitle': 'Discover premium luxury vehicles with exceptional quality and unmatched performance. Your dream car awaits.',
    'home.hero.cta': 'Explore Cars',
    'home.featured.title': 'Featured Vehicles',
    'home.featured.subtitle': 'Discover our handpicked selection of premium vehicles',
    'home.why.title': 'Why Choose Arab Auto',
    'home.why.quality.title': 'Premium Quality',
    'home.why.quality.desc': 'Only the finest vehicles with comprehensive inspections',
    'home.why.trust.title': 'Trusted Service',
    'home.why.trust.desc': 'Years of experience with thousands of satisfied customers',
    'home.why.deals.title': 'Best Deals',
    'home.why.deals.desc': 'Competitive pricing with flexible financing options',
    
    // Car Listings
    'listings.title': 'Our Car Collection',
    'listings.subtitle': 'Browse through our premium selection of vehicles',
    'listings.filters.brand': 'Brand',
    'listings.filters.price': 'Price Range',
    'listings.filters.year': 'Year',
    'listings.filters.apply': 'Apply Filters',
    'listings.filters.all': 'All',
    'listings.viewDetails': 'View Details',
    
    // Car Details
    'details.specifications': 'Specifications',
    'details.features': 'Features',
    'details.price': 'Price',
    'details.mileage': 'Mileage',
    'details.fuel': 'Fuel Type',
    'details.transmission': 'Transmission',
    'details.drivetrain': 'Drivetrain',
    'details.year': 'Year',
    'details.color': 'Color',
    'details.contact': 'Contact Us About This Car',
    'details.financing': 'Financing Available',
    'details.backToListings': 'Back to Listings',
    
    // About
    'about.title': 'About Arab Auto',
    'about.subtitle': 'Your trusted partner in finding the perfect vehicle. With years of experience and thousands of satisfied customers, we\'re committed to excellence.',
    'about.story.title': 'Our Story',
    'about.story.p1': 'Founded with a vision to revolutionize the automotive industry in the Arab world, Arab Auto has grown from a small dealership to a leading automotive destination.',
    'about.story.p2': 'We pride ourselves on offering only the finest vehicles, exceptional customer service, and building long-lasting relationships with our clients.',
    'about.stats.experience': 'Years Experience',
    'about.stats.customers': 'Happy Customers',
    'about.vision.title': 'Our Vision',
    'about.vision.desc': 'To be the leading automotive destination in the Arab world, known for excellence, trust, and innovation in everything we do.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To provide exceptional automotive solutions with unmatched customer service, helping our clients find their perfect vehicle.',
    'about.team.title': 'Meet Our Team',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team. We\'re here to help you find your perfect vehicle.',
    'contact.form.title': 'Send us a Message',
    'contact.form.firstName': 'First Name',
    'contact.form.lastName': 'Last Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.interestedIn': 'Interested In',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.info.title': 'Get in Touch',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.location': 'Location',
    'contact.info.hours': 'Business Hours',
    'contact.location.address': 'Eastern Ring Road, Al-Sharqiya\nCar Showroom Complex',
    'contact.hours.text': 'Saturday - Thursday: 9:00 AM - 9:00 PM\nFriday: 2:00 PM - 9:00 PM',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error loading data',
    'common.noResults': 'No results found',
    'common.tryAgain': 'Try Again',
    'common.close': 'Close',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.cars': 'السيارات',
    'nav.about': 'عنا',
    'nav.contact': 'اتصل بنا',
    
    // Home Page
    'home.hero.title': 'عرب أوتو',
    'home.hero.tagline': 'السماء هي الحد',
    'home.hero.subtitle': 'اكتشف السيارات الفاخرة المتميزة بجودة استثنائية وأداء لا يضاهى. سيارة أحلامك في انتظارك.',
    'home.hero.cta': 'استكشف السيارات',
    'home.featured.title': 'السيارات المميزة',
    'home.featured.subtitle': 'اكتشف مجموعتنا المختارة بعناية من السيارات المتميزة',
    'home.why.title': 'لماذا تختار عرب أوتو',
    'home.why.quality.title': 'جودة متميزة',
    'home.why.quality.desc': 'أفضل المركبات مع فحوصات شاملة',
    'home.why.trust.title': 'خدمة موثوقة',
    'home.why.trust.desc': 'سنوات من الخبرة مع آلاف العملاء الراضين',
    'home.why.deals.title': 'أفضل العروض',
    'home.why.deals.desc': 'أسعار تنافسية مع خيارات تمويل مرنة',
    
    // Car Listings
    'listings.title': 'مجموعة سياراتنا',
    'listings.subtitle': 'تصفح مجموعتنا المتميزة من المركبات',
    'listings.filters.brand': 'الماركة',
    'listings.filters.price': 'النطاق السعري',
    'listings.filters.year': 'السنة',
    'listings.filters.apply': 'تطبيق الفلاتر',
    'listings.filters.all': 'الكل',
    'listings.viewDetails': 'عرض التفاصيل',
    
    // Car Details
    'details.specifications': 'المواصفات',
    'details.features': 'الميزات',
    'details.price': 'السعر',
    'details.mileage': 'المسافة المقطوعة',
    'details.fuel': 'نوع الوقود',
    'details.transmission': 'ناقل الحركة',
    'details.drivetrain': 'نظام الدفع',
    'details.year': 'السنة',
    'details.color': 'اللون',
    'details.contact': 'تواصل معنا حول هذه السيارة',
    'details.financing': 'التمويل متاح',
    'details.backToListings': 'العودة إلى القائمة',
    
    // About
    'about.title': 'عن عرب أوتو',
    'about.subtitle': 'شريكك الموثوق في العثور على المركبة المثالية. مع سنوات من الخبرة وآلاف العملاء الراضين، نحن ملتزمون بالتميز.',
    'about.story.title': 'قصتنا',
    'about.story.p1': 'تأسست برؤية لثورة في صناعة السيارات في العالم العربي، نمت عرب أوتو من وكالة صغيرة إلى وجهة سيارات رائدة.',
    'about.story.p2': 'نفخر بتقديم أفضل المركبات فقط، وخدمة عملاء استثنائية، وبناء علاقات طويلة الأمد مع عملائنا.',
    'about.stats.experience': 'سنوات خبرة',
    'about.stats.customers': 'عملاء سعداء',
    'about.vision.title': 'رؤيتنا',
    'about.vision.desc': 'أن نكون الوجهة السيارات الرائدة في العالم العربي، معروفين بالتميز والثقة والابتكار في كل ما نقوم به.',
    'about.mission.title': 'مهمتنا',
    'about.mission.desc': 'تقديم حلول سيارات استثنائية مع خدمة عملاء لا مثيل لها، مساعدة عملائنا في العثور على مركبتهم المثالية.',
    'about.team.title': 'تعرف على فريقنا',
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع فريقنا. نحن هنا لمساعدتك في العثور على مركبتك المثالية.',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.firstName': 'الاسم الأول',
    'contact.form.lastName': 'اسم العائلة',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.phone': 'الهاتف',
    'contact.form.interestedIn': 'مهتم بـ',
    'contact.form.message': 'الرسالة',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.info.title': 'تواصل معنا',
    'contact.info.phone': 'الهاتف',
    'contact.info.email': 'البريد الإلكتروني',
    'contact.info.location': 'الموقع',
    'contact.info.hours': 'ساعات العمل',
    'contact.location.address': 'طريق الدائري الشرقي، الشرقية\nمجمع معارض السيارات',
    'contact.hours.text': 'السبت - الخميس: 9:00 ص - 9:00 م\nالجمعة: 2:00 م - 9:00 م',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ في تحميل البيانات',
    'common.noResults': 'لم يتم العثور على نتائج',
    'common.tryAgain': 'حاول مرة أخرى',
    'common.close': 'إغلاق',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const html = document.documentElement;
    if (language === 'ar') {
      html.setAttribute('lang', 'ar');
      html.setAttribute('dir', 'rtl');
    } else {
      html.setAttribute('lang', 'en');
      html.setAttribute('dir', 'ltr');
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
