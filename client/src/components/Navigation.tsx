import { Link, useLocation } from "wouter";
import { Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { path: "/", label: t('nav.home') },
    { path: "/cars", label: t('nav.cars') },
    { path: "/about", label: t('nav.about') },
    { path: "/contact", label: t('nav.contact') },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location?.startsWith(path)) return true;
    return false;
  };

  const NavLinks = ({ mobile = false, onClose = () => {} }) => (
    <>
      {navigationLinks.map(({ path, label }) => (
        <Link
          key={path}
          href={path}
          onClick={onClose}
          className={`${mobile ? 'block py-4 px-4 rounded-xl' : 'px-4 py-2 rounded-lg'} text-sm font-semibold transition-all duration-300 premium-hover ${
            isActive(path) 
              ? mobile 
                ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                : 'text-primary bg-primary/5 border-b-2 border-primary shadow-sm'
              : mobile 
                ? 'text-foreground hover:bg-secondary/80 hover:text-primary' 
                : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
          }`}
          data-testid={`link-nav-${path.replace('/', '') || 'home'}`}
        >
          {label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 w-full z-50 compact-nav">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 premium-hover" data-testid="link-logo">
            <div className="w-14 h-14 luxury-logo">
              <img 
                src="@assets/arabauto_logo_1756464535928.jpg" 
                alt="Arab Auto Logo" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-display font-bold premium-text compact-spacing">ARAB AUTO</h1>
              <p className="text-sm text-muted-foreground luxury-tracking">{t('home.hero.tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <NavLinks />
          </div>

          {/* Right Side - Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden premium-hover" data-testid="button-mobile-menu">
                  <Menu size={22} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 premium-glass">
                <div className="flex flex-col space-y-6 mt-12">
                  <div className="flex items-center space-x-3 pb-6 border-b border-border/20">
                    <img 
                      src="@assets/arabauto_logo_1756464535928.jpg" 
                      alt="Arab Auto" 
                      className="w-12 h-12 object-contain rounded-lg"
                    />
                    <div>
                      <h2 className="text-lg font-display font-bold premium-text">ARAB AUTO</h2>
                      <p className="text-sm text-muted-foreground">{t('home.hero.tagline')}</p>
                    </div>
                  </div>
                  <NavLinks mobile onClose={() => setIsOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
