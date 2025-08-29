import { type User, type InsertUser, type Car, type InsertCar, type ContactInquiry, type InsertContactInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCars(): Promise<Car[]>;
  getCar(id: string): Promise<Car | undefined>;
  getFeaturedCars(): Promise<Car[]>;
  getCarsByBrand(brand: string): Promise<Car[]>;
  createCar(car: InsertCar): Promise<Car>;
  
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cars: Map<string, Car>;
  private contactInquiries: Map<string, ContactInquiry>;

  constructor() {
    this.users = new Map();
    this.cars = new Map();
    this.contactInquiries = new Map();
    this.initializeCars();
  }

  private initializeCars() {
    const sampleCars: Omit<Car, 'id' | 'createdAt'>[] = [
      {
        brand: "Toyota",
        model: "Corolla",
        year: 2024,
        price: 25000,
        mileage: 0,
        fuelType: "petrol",
        transmission: "automatic",
        drivetrain: "fwd",
        color: "Silver",
        description: "Reliable and efficient sedan with advanced safety features",
        descriptionAr: "سيدان موثوق وفعال مع ميزات أمان متقدمة",
        images: ["https://pixabay.com/get/gc1de6361c79a3dafabfa8ca81a5f1ba4ce565e71e0d5c9bdd41c759ffb1f37b9acb4b9edd43182cf207663235ecb759a831980da86162d1365dd045c77786593_1280.jpg"],
        features: ["Apple CarPlay", "Safety Sense 2.0", "LED Headlights", "Climate Control"],
        featuresAr: ["أبل كار بلاي", "نظام الأمان 2.0", "مصابيح LED", "تحكم بالمناخ"],
        isFeatured: true,
        isAvailable: true
      },
      {
        brand: "BMW",
        model: "3 Series",
        year: 2024,
        price: 55000,
        mileage: 0,
        fuelType: "petrol",
        transmission: "automatic",
        drivetrain: "rwd",
        color: "Black",
        description: "Luxury performance sedan with cutting-edge technology",
        descriptionAr: "سيدان أداء فاخر مع تقنيات متطورة",
        images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        features: ["iDrive 8", "Adaptive Suspension", "Premium Sound", "Wireless Charging"],
        featuresAr: ["نظام iDrive 8", "تعليق تكيفي", "صوت متميز", "شحن لاسلكي"],
        isFeatured: true,
        isAvailable: true
      },
      {
        brand: "Mercedes-Benz",
        model: "C-Class",
        year: 2024,
        price: 68000,
        mileage: 0,
        fuelType: "petrol",
        transmission: "automatic",
        drivetrain: "rwd",
        color: "White",
        description: "Ultimate luxury experience with Mercedes-Benz quality",
        descriptionAr: "تجربة الفخامة المطلقة مع جودة مرسيدس-بنز",
        images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        features: ["MBUX System", "Air Suspension", "Burmester Audio", "Panoramic Sunroof"],
        featuresAr: ["نظام MBUX", "تعليق هوائي", "صوت Burmester", "سقف بانورامي"],
        isFeatured: true,
        isAvailable: true
      },
      {
        brand: "Toyota",
        model: "Hilux",
        year: 2024,
        price: 45000,
        mileage: 30000,
        fuelType: "diesel",
        transmission: "manual",
        drivetrain: "4wd",
        color: "Silver",
        description: "Powerful and reliable pickup truck built for adventure",
        descriptionAr: "شاحنة قوية وموثوقة مصممة للمغامرة",
        images: ["https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        features: ["4WD System", "Hill Start Assist", "Rear Differential Lock", "Towing Package"],
        featuresAr: ["نظام الدفع الرباعي", "مساعد بداية المنحدر", "قفل تفاضلي خلفي", "حزمة القطر"],
        isFeatured: false,
        isAvailable: true
      },
      {
        brand: "Chevrolet",
        model: "Camaro",
        year: 2023,
        price: 48000,
        mileage: 15000,
        fuelType: "petrol",
        transmission: "automatic",
        drivetrain: "rwd",
        color: "Red",
        description: "American muscle car with V8 power and aggressive styling",
        descriptionAr: "سيارة عضلية أمريكية بقوة V8 وتصميم جريء",
        images: ["https://pixabay.com/get/g46742f901b6f267b2048145d8f6b40ef72c016ce83c8feb2c0877c7d8e215da27d31a23e155f5019f567460628af4468d742a4de4121f554de21a5876f3d46de_1280.jpg"],
        features: ["V8 Engine", "Performance Suspension", "Sport Mode", "Brembo Brakes"],
        featuresAr: ["محرك V8", "تعليق رياضي", "وضع رياضي", "مكابح Brembo"],
        isFeatured: false,
        isAvailable: true
      },
      {
        brand: "Audi",
        model: "A4",
        year: 2024,
        price: 52000,
        mileage: 8000,
        fuelType: "petrol",
        transmission: "automatic",
        drivetrain: "awd",
        color: "Blue",
        description: "German engineering excellence with luxury and performance",
        descriptionAr: "التميز الهندسي الألماني مع الفخامة والأداء",
        images: ["https://pixabay.com/get/g3c7c1f910ca79a5089c55d5cecba1fc7875b4f100fa50d3a864a099c6c8efd0f2eface187acc51967ea25933289bc4395d8bec201d148f87508131482bc9b8ee_1280.jpg"],
        features: ["Quattro AWD", "Virtual Cockpit", "Bang & Olufsen", "Matrix LED"],
        featuresAr: ["دفع رباعي Quattro", "قمرة قيادة افتراضية", "Bang & Olufsen", "مصابيح Matrix LED"],
        isFeatured: false,
        isAvailable: true
      },
      {
        brand: "Land Rover",
        model: "Range Rover Evoque",
        year: 2023,
        price: 65000,
        mileage: 20000,
        fuelType: "petrol",
        transmission: "automatic",
        drivetrain: "4wd",
        color: "Gray",
        description: "Luxury compact SUV with off-road capabilities",
        descriptionAr: "دفع رباعي فاخر مدمج مع قدرات على الطرق الوعرة",
        images: ["https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        features: ["Terrain Response", "Meridian Audio", "Adaptive Cruise", "Panoramic Roof"],
        featuresAr: ["استجابة التضاريس", "صوت Meridian", "تحكم تكيفي", "سقف بانورامي"],
        isFeatured: false,
        isAvailable: true
      },
      {
        brand: "Tesla",
        model: "Model S",
        year: 2024,
        price: 85000,
        mileage: 12000,
        fuelType: "electric",
        transmission: "automatic",
        drivetrain: "awd",
        color: "Black",
        description: "Electric luxury performance with cutting-edge technology",
        descriptionAr: "أداء فاخر كهربائي مع تقنيات متطورة",
        images: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        features: ["Autopilot", "400+ Mile Range", "Supercharging", "Premium Interior"],
        featuresAr: ["القيادة التلقائية", "مدى 400+ ميل", "شحن فائق", "داخلية متميزة"],
        isFeatured: false,
        isAvailable: true
      }
    ];

    sampleCars.forEach((carData, index) => {
      const car: Car = {
        ...carData,
        id: `car-${index + 1}`,
        createdAt: new Date()
      };
      this.cars.set(car.id, car);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCars(): Promise<Car[]> {
    return Array.from(this.cars.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getCar(id: string): Promise<Car | undefined> {
    return this.cars.get(id);
  }

  async getFeaturedCars(): Promise<Car[]> {
    return Array.from(this.cars.values())
      .filter(car => car.isFeatured && car.isAvailable)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getCarsByBrand(brand: string): Promise<Car[]> {
    return Array.from(this.cars.values())
      .filter(car => car.brand.toLowerCase() === brand.toLowerCase() && car.isAvailable)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const id = randomUUID();
    const car: Car = { 
      ...insertCar, 
      id, 
      createdAt: new Date() 
    };
    this.cars.set(id, car);
    return car;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = randomUUID();
    const inquiry: ContactInquiry = { 
      ...insertInquiry, 
      id, 
      createdAt: new Date() 
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }
}

export const storage = new MemStorage();
