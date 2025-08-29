import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List } from "lucide-react";
import { motion } from "framer-motion";
import { cars, carBrands, priceRanges, fuelTypes, filterCars } from "@/data/cars";

export default function CarListings() {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  
  // Use static cars data instead of API call
  const [filteredCars, setFilteredCars] = useState(cars);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let currentCars = cars;

    if (selectedBrand) {
      currentCars = currentCars.filter(car => car.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (selectedPriceRange && selectedPriceRange !== 'all') {
      currentCars = currentCars.filter(car => {
        const price = car.price;
        switch (selectedPriceRange) {
          case 'low':
            return price <= 40000;
          case 'mid':
            return price > 40000 && price <= 60000;
          case 'high':
            return price > 60000;
          default:
            return true;
        }
      });
    }

    if (selectedFuelType && selectedFuelType !== 'all') {
      currentCars = currentCars.filter(car => car.fuelType.toLowerCase() === selectedFuelType.toLowerCase());
    }

    if (searchTerm) {
      currentCars = currentCars.filter(car =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm.toLowerCase()) ||
        car.price.toString().includes(searchTerm.toLowerCase()) ||
        car.fuelType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCars(currentCars);
  }, [selectedBrand, selectedPriceRange, selectedFuelType, searchTerm]);

  const brands = carBrands;
  const priceRangesOptions = priceRanges;
  const fuelTypesOptions = fuelTypes;

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
                  <Select value={selectedBrand} onValueChange={(value) => setSelectedBrand(value)}>
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
                  <Select value={selectedPriceRange} onValueChange={(value) => setSelectedPriceRange(value)}>
                    <SelectTrigger data-testid="select-filter-price">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('listings.filters.all')} Prices</SelectItem>
                      {priceRangesOptions.map(pr => (
                        <SelectItem key={pr.value} value={pr.value}>{pr.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="fuel-type-filter" className="block text-sm font-medium mb-2">
                    {t('listings.filters.fuelType')}
                  </Label>
                  <Select value={selectedFuelType} onValueChange={(value) => setSelectedFuelType(value)}>
                    <SelectTrigger data-testid="select-filter-fuel-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('listings.filters.all')} Fuel Types</SelectItem>
                      {fuelTypesOptions.map(ft => (
                        <SelectItem key={ft.value} value={ft.value}>{ft.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="search-input" className="block text-sm font-medium mb-2">
                    {t('listings.filters.search')}
                  </Label>
                  <Input
                    placeholder={t('listings.filters.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    data-testid="input-search"
                  />
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
