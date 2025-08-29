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
          className={`${mobile ? 'block py-2' : ''} px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
            isActive(path) 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-foreground'
          }`}
          data-testid={`link-nav-${path.replace('/', '') || 'home'}`}
        >
          {label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" data-testid="link-logo">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Car className="text-primary-foreground" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ARAB AUTO</h1>
              <p className="text-xs text-muted-foreground">{t('home.hero.tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Right Side - Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden" data-testid="button-mobile-menu">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
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
