import { useParams, Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Shield, 
  Clock,
  Car,
  Fuel,
  Settings,
  Palette,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { getCarById } from "@/data/cars";

export default function CarDetails() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  
  // Use static car data instead of API call
  const car = getCarById(Number(id));
  
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          {t('details.notFound.title')}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t('details.notFound.message')}
        </p>
        <Button asChild>
          <a href="/cars">{t('details.notFound.backToList')}</a>
        </Button>
      </div>
    );
  }

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
    if (fuelType === 'electric') return <CheckCircle size={16} />;
    return <Fuel size={16} />;
  };

  const specs = [
    { icon: <Car size={16} />, label: t('details.mileage'), value: formatMileage(car.mileage || 0) },
    { icon: getFuelIcon(car.fuelType), label: t('details.fuel'), value: car.fuelType },
    { icon: <Settings size={16} />, label: t('details.transmission'), value: car.transmission },
    { icon: <Calendar size={16} />, label: t('details.year'), value: car.year.toString() },
    { icon: <Palette size={16} />, label: t('details.color'), value: car.color },
  ];

  if (car.drivetrain) {
    specs.push({ icon: <Settings size={16} />, label: t('details.drivetrain'), value: car.drivetrain.toUpperCase() });
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/cars">
            <Button variant="ghost" className="mb-8" data-testid="button-back-navigation">
              <ArrowLeft size={16} className="mr-2" />
              {t('details.backToListings')}
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Car Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4">
              {car.images && car.images[0] && (
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={car.images[0]} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover"
                    data-testid="img-car-main"
                  />
                </div>
              )}
              
              {car.images && car.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {car.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${car.brand} ${car.model} - View ${index + 2}`}
                        className="w-full h-full object-cover"
                        data-testid={`img-car-gallery-${index}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Car Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2" data-testid="text-car-title">
                {car.brand} {car.model}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-primary" data-testid="text-car-price">
                  {formatPrice(car.price)}
                </span>
                {car.isFeatured && (
                  <Badge variant="secondary" data-testid="badge-featured">مميز</Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground" data-testid="text-car-description">
                {language === 'ar' ? car.descriptionAr : car.description}
              </p>
            </div>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-specifications-title">{t('details.specifications')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {specs.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-muted-foreground">{spec.icon}</div>
                      <div>
                        <p className="text-sm text-muted-foreground">{spec.label}</p>
                        <p className="font-medium" data-testid={`text-spec-${index}`}>{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle data-testid="text-features-title">{t('details.features')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {(language === 'ar' ? car.featuresAr : car.features)?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm" data-testid={`text-feature-${index}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Actions */}
            <div className="space-y-4">
              <Link href="/contact">
                <Button className="w-full" size="lg" data-testid="button-contact-about-car">
                  <Phone size={16} className="mr-2" />
                  {t('details.contact')}
                </Button>
              </Link>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="lg" data-testid="button-call-now">
                  <Phone size={16} className="mr-2" />
                  01070007436
                </Button>
                <Button variant="outline" size="lg" data-testid="button-email">
                  <Mail size={16} className="mr-2" />
                  Email Us
                </Button>
              </div>
              
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <i className="fas fa-percent text-accent-foreground text-sm"></i>
                    </div>
                    <div>
                      <p className="font-medium" data-testid="text-financing-available">{t('details.financing')}</p>
                      <p className="text-sm text-muted-foreground">Call us for details</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
