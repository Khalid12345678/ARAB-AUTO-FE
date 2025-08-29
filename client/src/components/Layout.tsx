import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImage from "@assets/arabauto_logo_1756464535928.jpg";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12">
                  <img 
                    src={logoImage} 
                    alt="Arab Auto Logo" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold">ARAB AUTO</h1>
                  <p className="text-sm text-background/70 luxury-tracking">{t('home.hero.tagline')}</p>
                </div>
              </div>
              <p className="text-background/70 text-sm">
                {t('about.subtitle')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-background/70 hover:text-background transition-colors">{t('nav.home')}</a></li>
                <li><a href="/cars" className="text-background/70 hover:text-background transition-colors">{t('nav.cars')}</a></li>
                <li><a href="/about" className="text-background/70 hover:text-background transition-colors">{t('nav.about')}</a></li>
                <li><a href="/contact" className="text-background/70 hover:text-background transition-colors">{t('nav.contact')}</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4">الخدمات</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-background/70 hover:text-background transition-colors">مبيعات السيارات</a></li>
                <li><a href="#" className="text-background/70 hover:text-background transition-colors">التمويل</a></li>
                <li><a href="#" className="text-background/70 hover:text-background transition-colors">استبدال</a></li>
                <li><a href="#" className="text-background/70 hover:text-background transition-colors">الخدمة والصيانة</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">{t('contact.info.title')}</h3>
              <div className="space-y-2 text-sm">
                <p className="text-background/70">
                  <i className="fas fa-phone mr-2"></i>
                  01070007436
                </p>
                <p className="text-background/70">
                  <i className="fas fa-envelope mr-2"></i>
                  info@arabauto.com
                </p>
                <p className="text-background/70">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {t('contact.location.address')}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center">
            <p className="text-background/70 text-sm">
              &copy; 2024 Arab Auto. جميع الحقوق محفوظة. | {t('home.hero.tagline')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
