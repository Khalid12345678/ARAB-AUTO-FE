import { Car } from "@/types/car";
import { useLanguage } from "@/contexts/LanguageContext";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Award, Shield, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import { featuredCars } from "@/data/cars";

export default function Home() {
  const { t } = useLanguage();
  
  // Use static featured cars data instead of API call
  const cars = featuredCars;

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
          className="absolute top-24 right-8 z-20 animate-luxury-float hidden lg:block"
        >
          <div className="w-20 h-20 luxury-logo">
            <img 
              src="/arabauto_logo_1756464535928.jpg" 
              alt="Arab Auto Logo" 
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>
        
        {/* Enhanced Floating Car Preview Cards */}
        {cars && cars.length >= 3 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 hidden xl:flex space-x-6">
            {cars.slice(0, 3).map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="w-80 h-96 premium-card car-card-hover">
                  <CardContent className="p-0 h-full">
                    <div className="relative h-full">
                      {/* Car Image */}
                      <div className="h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={car.images[0]}
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Explore Button - Better positioned and styled */}
                      <div className="absolute top-4 right-4 z-20">
                        <Button 
                          size="sm"
                          className="explore-button text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Explore
                        </Button>
                      </div>
                      
                      {/* Car Info Overlay - Completely redesigned for better readability */}
                      <div className="absolute bottom-0 left-0 right-0 car-showcase-overlay p-5 rounded-b-lg">
                        {/* Car Model and Year */}
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-bold text-xl leading-tight car-info-text">
                            {car.brand} {car.model}
                          </h3>
                          <span className="text-white text-sm font-medium bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                            {car.year}
                          </span>
                        </div>
                        
                        {/* Price - More prominent */}
                        <div className="text-center">
                          <span className="text-white font-bold text-2xl car-info-text bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                            ${car.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 drop-shadow-2xl hero-title-text"
          >
            <span className="bg-black/20 backdrop-blur-sm px-8 py-4 rounded-2xl inline-block">
              ARAB AUTO
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed hero-subtitle-text"
          >
            <span className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-xl inline-block">
              Sky is the Limit
            </span>
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-white mb-12 max-w-3xl mx-auto leading-relaxed hero-description-text"
          >
            <span className="bg-black/25 backdrop-blur-sm px-6 py-3 rounded-xl inline-block">
              Discover premium luxury vehicles with exceptional quality and unmatched performance. Your dream car awaits.
            </span>
          </motion.p>

          {/* CTA Buttons - Better spacing and positioning */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row cta-button-spacing justify-center items-center mb-20"
          >
            <Button 
              asChild
              size="lg"
              className="brand-button text-white font-bold px-10 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl"
            >
              <Link href="/cars">
                Explore Our Cars
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="outline-button text-white font-semibold px-10 py-4 text-lg rounded-xl border-2 hover:border-white/50"
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </motion.div>
        </div>
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

          {/* The isLoading state and the loading skeleton are removed as per the edit hint */}
          {/* The featuredCars data is now static */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars?.map((car, index) => (
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
