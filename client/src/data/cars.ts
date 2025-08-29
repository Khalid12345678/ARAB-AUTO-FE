// This file contains static car data for reference
// The actual data is served from the backend API

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

export const carTypes = [
  { value: 'luxury-sedan', label: 'Luxury Sedan', labelAr: 'سيدان فاخر' },
  { value: 'suv', label: 'SUV', labelAr: 'دفع رباعي' },
  { value: 'sports-car', label: 'Sports Car', labelAr: 'سيارة رياضية' },
  { value: 'pickup-truck', label: 'Pickup Truck', labelAr: 'شاحنة' },
  { value: 'electric-vehicle', label: 'Electric Vehicle', labelAr: 'مركبة كهربائية' },
  { value: 'hatchback', label: 'Hatchback', labelAr: 'هاتشباك' },
  { value: 'convertible', label: 'Convertible', labelAr: 'مكشوفة' },
];

export const priceRanges = [
  { value: 'all', label: 'All Prices', labelAr: 'جميع الأسعار' },
  { value: 'low', label: '$20,000 - $40,000', labelAr: '20,000$ - 40,000$' },
  { value: 'mid', label: '$40,000 - $60,000', labelAr: '40,000$ - 60,000$' },
  { value: 'high', label: '$60,000+', labelAr: '60,000$+' },
];

export const fuelTypes = [
  { value: 'petrol', label: 'Petrol', labelAr: 'بنزين' },
  { value: 'diesel', label: 'Diesel', labelAr: 'ديزل' },
  { value: 'electric', label: 'Electric', labelAr: 'كهربائي' },
  { value: 'hybrid', label: 'Hybrid', labelAr: 'هجين' },
];
