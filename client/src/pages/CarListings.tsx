import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function CarListings() {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    brand: 'all',
    priceRange: 'all',
    year: 'all',
  });

  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
  });

  const filteredCars = cars?.filter((car) => {
    if (filters.brand !== 'all' && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }
    
    if (filters.priceRange !== 'all') {
      const price = car.price;
      switch (filters.priceRange) {
        case 'low':
          if (price >= 40000) return false;
          break;
        case 'mid':
          if (price < 40000 || price >= 60000) return false;
          break;
        case 'high':
          if (price < 60000) return false;
          break;
      }
    }
    
    if (filters.year !== 'all' && car.year.toString() !== filters.year) {
      return false;
    }
    
    return car.isAvailable;
  });

  const brands = cars ? Array.from(new Set(cars.map(car => car.brand))) : [];

  return (
    <div className="py-24 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-6">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-block mb-6"
            whileInView={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="inline-block w-12 h-1 bg-primary rounded-full"></span>
            <span className="inline-block w-12 h-1 bg-accent rounded-full ml-2"></span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-display font-bold premium-text mb-6 compact-spacing" data-testid="text-listings-title">
            {t('listings.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-listings-subtitle">
            {t('listings.subtitle')}
          </p>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="mb-12 premium-card border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="brand-filter" className="block text-sm font-medium mb-2">
                    {t('listings.filters.brand')}
                  </Label>
                  <Select value={filters.brand} onValueChange={(value) => setFilters(prev => ({ ...prev, brand: value }))}>
                    <SelectTrigger data-testid="select-filter-brand">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('listings.filters.all')} Brands</SelectItem>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="price-filter" className="block text-sm font-medium mb-2">
                    {t('listings.filters.price')}
                  </Label>
                  <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
                    <SelectTrigger data-testid="select-filter-price">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('listings.filters.all')} Prices</SelectItem>
                      <SelectItem value="low">$20,000 - $40,000</SelectItem>
                      <SelectItem value="mid">$40,000 - $60,000</SelectItem>
                      <SelectItem value="high">$60,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="year-filter" className="block text-sm font-medium mb-2">
                    {t('listings.filters.year')}
                  </Label>
                  <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}>
                    <SelectTrigger data-testid="select-filter-year">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('listings.filters.all')} Years</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                    onClick={() => {/* Filter logic already applied via state */}}
                    data-testid="button-apply-filters"
                  >
                    <i className="fas fa-filter mr-2"></i>
                    {t('listings.filters.apply')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Car Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="premium-card rounded-2xl p-6 animate-pulse shimmer">
                <div className="w-full h-56 bg-muted rounded-xl mb-6"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-muted rounded-lg"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-8 bg-muted rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCars && filteredCars.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
                whileInView={{ 
                  scale: [0.95, 1.02, 1],
                  transition: { duration: 0.5, delay: 0.1 * index }
                }}
                viewport={{ once: true }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-24"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-car text-3xl text-primary"></i>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">No Cars Found</h3>
              <p className="text-lg text-muted-foreground" data-testid="text-no-cars">
                {t('common.noResults')}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
