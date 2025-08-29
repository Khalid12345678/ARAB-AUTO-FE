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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full hero-gradient"></div>
          <div className="absolute inset-0 islamic-pattern"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
        
        {/* Floating logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20 animate-luxury-float"
        >
          <div className="w-24 h-24 luxury-logo">
            <img 
              src="@assets/arabauto_logo_1756464535928.jpg" 
              alt="Arab Auto Logo" 
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-6xl md:text-8xl font-display font-black mb-8 compact-spacing" 
            data-testid="text-hero-title"
          >
            {t('home.hero.title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl md:text-3xl mb-6 text-white/95 font-light luxury-tracking" 
            data-testid="text-hero-tagline"
          >
            {t('home.hero.tagline')}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-white/85 leading-relaxed" 
            data-testid="text-hero-subtitle"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Link href="/cars">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/95 text-xl font-bold px-12 py-6 shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-2xl luxury-tracking"
                data-testid="button-hero-cta"
              >
                {t('home.hero.cta')}
                <motion.i 
                  className="fas fa-arrow-right ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.i>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Car Preview Cards */}
        {featuredCars && featuredCars.length >= 3 && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 hidden xl:flex space-x-8">
            {featuredCars.slice(0, 3).map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.4 + (0.2 * index),
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="premium-card p-6 rounded-2xl w-72 group cursor-pointer"
                data-testid={`card-hero-preview-${car.id}`}
              >
                {car.images && car.images[0] && (
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img 
                      src={car.images[0]} 
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-foreground">{car.brand} {car.model}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold premium-text">${car.price.toLocaleString()}</span>
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                      {car.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Cars Section */}
      <section className="py-24 bg-gradient-to-br from-secondary/30 via-background to-secondary/50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div 
              className="inline-block mb-6"
              whileInView={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="inline-block w-16 h-1 bg-primary rounded-full"></span>
              <span className="inline-block w-16 h-1 bg-accent rounded-full ml-2"></span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-display font-bold premium-text mb-6 compact-spacing" data-testid="text-featured-title">
              {t('home.featured.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-featured-subtitle">
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
