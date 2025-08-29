import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Car } from "@shared/schema";
import { Link } from "wouter";
import { Gauge, Calendar, Zap } from "lucide-react";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const { t, language } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return `${(mileage / 1000).toFixed(0)}k km`;
  };

  const getFuelIcon = (fuelType: string) => {
    if (fuelType === 'electric') return <Zap size={14} className="text-accent" />;
    return <i className="fas fa-gas-pump text-sm text-accent"></i>;
  };

  return (
    <Card className="overflow-hidden card-hover premium-card group" data-testid={`card-car-${car.id}`}>
      <div className="relative overflow-hidden">
        {car.images && car.images.length > 0 && (
          <div className="relative">
            <img 
              src={car.images[0]} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        )}
        {car.isFeatured && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground shadow-lg border-0 px-3 py-1 text-sm font-semibold">
            <i className="fas fa-star mr-1"></i>
            مميز
          </Badge>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {car.year}
          </span>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-bold text-foreground compact-spacing" data-testid={`text-car-title-${car.id}`}>
            {car.brand} {car.model}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed line-clamp-2" data-testid={`text-car-description-${car.id}`}>
            {language === 'ar' ? car.descriptionAr : car.description}
          </p>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <span className="text-3xl font-display font-bold premium-text" data-testid={`text-car-price-${car.id}`}>
              {formatPrice(car.price)}
            </span>
            <p className="text-sm text-muted-foreground">Starting from</p>
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0 px-3 py-1">
              {car.transmission === 'automatic' ? 'Auto' : 'Manual'}
            </Badge>
            {car.drivetrain && (
              <Badge variant="secondary" className="bg-accent/10 text-accent border-0 px-3 py-1">
                {car.drivetrain.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-border/20">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Gauge size={14} className="text-primary" />
            </div>
            <span className="font-medium">{formatMileage(car.mileage || 0)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
              {getFuelIcon(car.fuelType)}
            </div>
            <span className="font-medium capitalize">{car.fuelType}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Calendar size={14} className="text-primary" />
            </div>
            <span className="font-medium">{car.year}</span>
          </div>
        </div>
        
        <Link href={`/cars/${car.id}`}>
          <Button 
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 premium-hover" 
            data-testid={`button-view-details-${car.id}`}
          >
            {t('listings.viewDetails')}
            <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
