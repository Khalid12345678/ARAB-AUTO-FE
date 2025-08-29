import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleLanguage}
      data-testid="button-language-toggle"
      className="font-medium"
    >
      {language === 'en' ? 'AR' : 'EN'}
    </Button>
  );
}
