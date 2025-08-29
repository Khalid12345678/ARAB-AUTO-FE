import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Award, Shield, Handshake } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useLanguage();
  
  const { data: featuredCars, isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars/featured'],
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden ramadan-pattern">
        {/* Background with Islamic patterns */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full hero-gradient"></div>
          <div className="absolute inset-0 bg-black/20 islamic-pattern"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6" data-testid="text-hero-title">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90" data-testid="text-hero-tagline">
            {t('home.hero.tagline')}
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-white/80" data-testid="text-hero-subtitle">
            {t('home.hero.subtitle')}
          </p>
          <Link href="/cars">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg font-semibold px-8 py-4 shadow-lg transform hover:scale-105 transition-all"
              data-testid="button-hero-cta"
            >
              {t('home.hero.cta')}
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Link>
        </motion.div>

        {/* Floating Car Preview Cards */}
        {featuredCars && featuredCars.length >= 2 && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-6">
            {featuredCars.slice(0, 2).map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="car-card p-4 rounded-xl shadow-lg w-64"
                data-testid={`card-hero-preview-${car.id}`}
              >
                {car.images && car.images[0] && (
                  <img 
                    src={car.images[0]} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-semibold text-foreground">{car.brand} {car.model} {car.year}</h3>
                <p className="text-sm text-muted-foreground">From ${car.price.toLocaleString()}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-featured-title">
              {t('home.featured.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-featured-subtitle">
              {t('home.featured.subtitle')}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="w-full h-48 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars?.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-why-choose-title">
              {t('home.why.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: t('home.why.quality.title'), desc: t('home.why.quality.desc') },
              { icon: Shield, title: t('home.why.trust.title'), desc: t('home.why.trust.desc') },
              { icon: Handshake, title: t('home.why.deals.title'), desc: t('home.why.deals.desc') },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 h-full">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <item.icon className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-4" data-testid={`text-feature-title-${index}`}>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-feature-desc-${index}`}>
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
