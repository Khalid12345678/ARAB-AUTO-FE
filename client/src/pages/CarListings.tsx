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

  const brands = cars ? [...new Set(cars.map(car => car.brand))] : [];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-listings-title">
            {t('listings.title')}
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-listings-subtitle">
            {t('listings.subtitle')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
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
                    className="w-full" 
                    onClick={() => {/* Filter logic already applied via state */}}
                    data-testid="button-apply-filters"
                  >
                    {t('listings.filters.apply')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Car Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg shadow-lg p-6 animate-pulse">
                <div className="w-full h-48 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4"></div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredCars && filteredCars.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <p className="text-xl text-muted-foreground" data-testid="text-no-cars">
              {t('common.noResults')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
