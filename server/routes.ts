import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all cars
  app.get("/api/cars", async (req, res) => {
    try {
      const cars = await storage.getCars();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cars" });
    }
  });

  // Get featured cars
  app.get("/api/cars/featured", async (req, res) => {
    try {
      const cars = await storage.getFeaturedCars();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured cars" });
    }
  });

  // Get car by ID
  app.get("/api/cars/:id", async (req, res) => {
    try {
      const car = await storage.getCar(req.params.id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch car" });
    }
  });

  // Get cars by brand
  app.get("/api/cars/brand/:brand", async (req, res) => {
    try {
      const cars = await storage.getCarsByBrand(req.params.brand);
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cars by brand" });
    }
  });

  // Submit contact inquiry
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.status(201).json({ 
        message: "Contact inquiry submitted successfully", 
        inquiry 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to submit contact inquiry" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
