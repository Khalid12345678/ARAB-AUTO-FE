import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Phone } from "lucide-react";

export function Navigation() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { href: "/", label: t("nav.home"), labelAr: "الرئيسية" },
    { href: "/cars", label: t("nav.cars"), labelAr: "السيارات" },
    { href: "/about", label: t("nav.about"), labelAr: "من نحن" },
    { href: "/contact", label: t("nav.contact"), labelAr: "اتصل بنا" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10">
              <img 
                src="/arabauto_logo_1756464535928.jpg" 
                alt="Arab Auto Logo" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <span className="text-xl font-display font-bold text-primary">
              ARAB AUTO
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      location === item.href
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {language === "ar" ? item.labelAr : item.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <LanguageToggle />
                <a
                  href="tel:01070007436"
                  className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">01070007436</span>
                </a>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobile && isOpen && (
          <div className="py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    location === item.href
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {language === "ar" ? item.labelAr : item.label}
                </Link>
              ))}
              <a
                href="tel:01070007436"
                className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-fit"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">01070007436</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
