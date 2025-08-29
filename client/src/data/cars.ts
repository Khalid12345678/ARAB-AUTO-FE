import { Car } from "@/types/car";

// Static car data for the application
export const cars: Car[] = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2023,
    price: 25000,
    currency: "USD",
    mileage: 15000,
    fuelType: "petrol",
    transmission: "automatic",
    engineSize: "1.8L",
    color: "Red",
    condition: "excellent",
    description: "Well-maintained Toyota Corolla with excellent fuel efficiency and reliability.",
    features: ["Bluetooth", "Backup Camera", "Cruise Control", "Air Conditioning"],
    images: ["arab_auto_red_car_1756463265802.jpg"],
    location: "Cairo, Egypt",
    seller: "Arab Auto",
    contactPhone: "01070007436",
    contactEmail: "sales@arabauto.com",
    isFeatured: true,
    isAvailable: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    brand: "BMW",
    model: "X5",
    year: 2022,
    price: 65000,
    currency: "USD",
    mileage: 25000,
    fuelType: "diesel",
    transmission: "automatic",
    engineSize: "3.0L",
    color: "White",
    condition: "excellent",
    description: "Luxury BMW X5 SUV with premium features and powerful performance.",
    features: ["Leather Seats", "Navigation", "Panoramic Roof", "Premium Sound System", "4WD"],
    images: ["arab_auto_hilux_1756463265803.jpg"],
    location: "Cairo, Egypt",
    seller: "Arab Auto",
    contactPhone: "01070007436",
    contactEmail: "sales@arabauto.com",
    isFeatured: true,
    isAvailable: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10"
  },
  {
    id: 3,
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    price: 45000,
    currency: "USD",
    mileage: 18000,
    fuelType: "petrol",
    transmission: "automatic",
    engineSize: "2.0L",
    color: "Silver",
    condition: "excellent",
    description: "Elegant Mercedes C-Class with sophisticated design and advanced technology.",
    features: ["LED Headlights", "Digital Dashboard", "Heated Seats", "Parking Sensors"],
    images: ["arab_auto_car_inside_1756463265802.jpg"],
    location: "Cairo, Egypt",
    seller: "Arab Auto",
    contactPhone: "01070007436",
    contactEmail: "sales@arabauto.com",
    isFeatured: true,
    isAvailable: true,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20"
  },
  {
    id: 4,
    brand: "Toyota",
    model: "Hilux",
    year: 2021,
    price: 35000,
    currency: "USD",
    mileage: 35000,
    fuelType: "diesel",
    transmission: "manual",
    engineSize: "2.4L",
    color: "White",
    condition: "good",
    description: "Robust Toyota Hilux pickup truck perfect for work and off-road adventures.",
    features: ["4WD", "Towing Package", "Bed Liner", "Alloy Wheels"],
    images: ["arab_auto_hilux_1756463265803.jpg"],
    location: "Cairo, Egypt",
    seller: "Arab Auto",
    contactPhone: "01070007436",
    contactEmail: "sales@arabauto.com",
    isFeatured: false,
    isAvailable: true,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05"
  },
  {
    id: 5,
    brand: "Audi",
    model: "A4",
    year: 2022,
    price: 40000,
    currency: "USD",
    mileage: 22000,
    fuelType: "petrol",
    transmission: "automatic",
    engineSize: "2.0L",
    color: "Black",
    condition: "excellent",
    description: "Premium Audi A4 with quattro all-wheel drive and sophisticated styling.",
    features: ["Quattro AWD", "Virtual Cockpit", "Bang & Olufsen Sound", "Matrix LED"],
    images: ["arab_auto_car_brand_1756463265803.jpg"],
    location: "Cairo, Egypt",
    seller: "Arab Auto",
    contactPhone: "01070007436",
    contactEmail: "sales@arabauto.com",
    isFeatured: false,
    isAvailable: true,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12"
  },
  {
    id: 6,
    brand: "Land Rover",
    model: "Range Rover Sport",
    year: 2021,
    price: 85000,
    currency: "USD",
    mileage: 30000,
    fuelType: "diesel",
    transmission: "automatic",
    engineSize: "3.0L",
    color: "Grey",
    condition: "excellent",
    description: "Luxury Range Rover Sport with exceptional off-road capability and comfort.",
    features: ["Terrain Response", "Air Suspension", "Meridian Sound", "360° Camera"],
    images: ["arab_auto_shop_1756463265801.jpg"],
    location: "Cairo, Egypt",
    seller: "Arab Auto",
    contactPhone: "01070007436",
    contactEmail: "sales@arabauto.com",
    isFeatured: false,
    isAvailable: true,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08"
  },
  {
    id: 7,
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 55000,
    currency: "USD",
    mileage: 12000,
    fuelType: "electric",
    transmission: "automatic",
    engineSize: "Electric",
    color: "Blue",
    condition: "excellent",
    description: "Modern Tesla Model 3 with autopilot and long-range battery.",
    features: ["Autopilot", "Supercharging", "Glass Roof", "15-inch Touchscreen"],
    images: ["arab_auto_good_1756463265803.jpg"],
    location: "Cairo, Egypt",
    seller: "Arab Auto",
    contactPhone: "01070007436",
    contactEmail: "sales@arabauto.com",
    isFeatured: false,
    isAvailable: true,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18"
  },
  {
    id: 8,
    brand: "Porsche",
    model: "911",
    year: 2020,
    price: 120000,
    currency: "USD",
    mileage: 15000,
    fuelType: "petrol",
    transmission: "automatic",
    engineSize: "3.0L",
    color: "Red",
    condition: "excellent",
    description: "Iconic Porsche 911 sports car with exceptional performance and heritage.",
    features: ["Sport Chrono Package", "PASM", "Sport Exhaust", "Carbon Fiber Interior"],
    images: ["arab_auto_good_pic_1756463265803.jpg"],
    location: "Cairo, Egypt",
    seller: "Arab Auto",
    contactPhone: "01070007436",
    contactEmail: "sales@arabauto.com",
    isFeatured: false,
    isAvailable: true,
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03"
  }
];

// Featured cars (subset of cars with isFeatured: true)
export const featuredCars = cars.filter(car => car.isFeatured);

// All available cars
export const availableCars = cars.filter(car => car.isAvailable);

// Get car by ID
export const getCarById = (id: number): Car | undefined => {
  return cars.find(car => car.id === id);
};

// Filter cars by various criteria
export const filterCars = (filters: {
  brand?: string;
  priceRange?: string;
  fuelType?: string;
  transmission?: string;
  year?: number;
}) => {
  return cars.filter(car => {
    if (filters.brand && car.brand !== filters.brand) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.year && car.year !== filters.year) return false;
    
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'low':
          if (car.price > 40000) return false;
          break;
        case 'mid':
          if (car.price < 40000 || car.price > 60000) return false;
          break;
        case 'high':
          if (car.price < 60000) return false;
          break;
      }
    }
    
    return true;
  });
};

// Car brands for filtering
export const carBrands = [
  'Toyota',
  'BMW', 
  'Mercedes-Benz',
  'Audi',
  'Land Rover',
  'Chevrolet',
  'Tesla',
  'Lexus',
  'Porsche',
  'Jaguar'
];

// Car types for filtering
export const carTypes = [
  { value: 'luxury-sedan', label: 'Luxury Sedan', labelAr: 'سيدان فاخر' },
  { value: 'suv', label: 'SUV', labelAr: 'دفع رباعي' },
  { value: 'sports-car', label: 'Sports Car', labelAr: 'سيارة رياضية' },
  { value: 'pickup-truck', label: 'Pickup Truck', labelAr: 'شاحنة' },
  { value: 'electric-vehicle', label: 'Electric Vehicle', labelAr: 'مركبة كهربائية' },
  { value: 'hatchback', label: 'Hatchback', labelAr: 'هاتشباك' },
  { value: 'convertible', label: 'Convertible', labelAr: 'مكشوفة' },
];

// Price ranges for filtering
export const priceRanges = [
  { value: 'all', label: 'All Prices', labelAr: 'جميع الأسعار' },
  { value: 'low', label: '$20,000 - $40,000', labelAr: '20,000$ - 40,000$' },
  { value: 'mid', label: '$40,000 - $60,000', labelAr: '40,000$ - 60,000$' },
  { value: 'high', label: '$60,000+', labelAr: '60,000$+' },
];

// Fuel types for filtering
export const fuelTypes = [
  { value: 'petrol', label: 'Petrol', labelAr: 'بنزين' },
  { value: 'diesel', label: 'Diesel', labelAr: 'ديزل' },
  { value: 'electric', label: 'Electric', labelAr: 'كهربائي' },
  { value: 'hybrid', label: 'Hybrid', labelAr: 'هجين' },
];
