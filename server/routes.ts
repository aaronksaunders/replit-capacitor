import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure CORS to allow all origins for mobile testing
  app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

  const JWT_SECRET = process.env.JWT_SECRET || process.env.REPLIT_SECRET_JWT_SECRET || "your-secret-key";

  // JWT middleware for protected routes
  const authenticateToken = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };

  // Register endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(validatedData.password, saltRounds);

      // Create user
      const user = await storage.createUser(validatedData.email, passwordHash);

      res.status(201).json({ 
        message: "User registered successfully",
        user: { id: user.id, email: user.email }
      });
    } catch (error: any) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);

      // Find user
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email }
      });
    } catch (error: any) {
      if (error.errors) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Protected profile endpoint
  app.get("/api/profile", authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUserByEmail(req.user.email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "Protected data retrieved successfully",
        user: { id: user.id, email: user.email },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
