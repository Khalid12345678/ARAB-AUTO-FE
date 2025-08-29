import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      data-testid="button-language-toggle"
      className="font-semibold px-4 py-2 border-2 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300 rounded-xl premium-hover"
    >
      <span className="flex items-center space-x-2">
        <i className="fas fa-globe text-sm"></i>
        <span>{language === 'en' ? 'العربية' : 'English'}</span>
      </span>
    </Button>
  );
}
