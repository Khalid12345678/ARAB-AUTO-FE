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
    if (fuelType === 'electric') return <Zap size={12} />;
    return <i className="fas fa-gas-pump text-xs"></i>;
  };

  return (
    <Card className="overflow-hidden card-hover shadow-lg" data-testid={`card-car-${car.id}`}>
      <div className="relative">
        {car.images && car.images.length > 0 && (
          <img 
            src={car.images[0]} 
            alt={`${car.brand} ${car.model}`}
            className="w-full h-48 object-cover"
          />
        )}
        {car.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
            مميز
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2" data-testid={`text-car-title-${car.id}`}>
          {car.brand} {car.model} {car.year}
        </h3>
        
        <p className="text-muted-foreground mb-4" data-testid={`text-car-description-${car.id}`}>
          {language === 'ar' ? car.descriptionAr : car.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary" data-testid={`text-car-price-${car.id}`}>
            {formatPrice(car.price)}
          </span>
          <div className="flex space-x-2">
            <Badge variant="secondary">
              {car.transmission === 'automatic' ? 'Auto' : 'Manual'}
            </Badge>
            {car.drivetrain && (
              <Badge variant="secondary">
                {car.drivetrain.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Gauge size={12} className="mr-1" />
            {formatMileage(car.mileage || 0)}
          </div>
          <div className="flex items-center">
            {getFuelIcon(car.fuelType)}
            <span className="ml-1 capitalize">{car.fuelType}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            {car.year}
          </div>
        </div>
        
        <Link href={`/cars/${car.id}`}>
          <Button className="w-full" data-testid={`button-view-details-${car.id}`}>
            {t('listings.viewDetails')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
