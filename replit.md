# JWT Authentication Demo Application

## Overview

This is a full-stack authentication demo application built with Node.js/Express backend and React/Vite frontend. The primary purpose is to demonstrate secure JWT-based authentication flow with user registration, login, and protected route access. The application uses in-memory storage for simplicity and is optimized for mobile testing with permissive CORS configuration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite as the build tool and development server
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: React hooks (useState, useEffect) for local component state
- **Routing**: Wouter for lightweight client-side routing
- **HTTP Client**: Native fetch API for server communication
- **Authentication Storage**: localStorage for JWT token persistence
- **Styling**: Tailwind CSS with custom design system variables and dark mode support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Authentication**: JWT (JSON Web Tokens) for stateless authentication
- **Password Security**: bcryptjs for password hashing with salt rounds
- **Data Storage**: In-memory storage using Map data structure (no database)
- **CORS Policy**: Configured to allow all origins (*) for mobile testing
- **Middleware**: Custom JWT verification middleware for protected routes
- **Validation**: Zod schemas for request validation and type safety

### Authentication Flow
- **Registration**: Email/password validation, password hashing, user creation
- **Login**: Credential verification, JWT generation and return
- **Protected Routes**: Bearer token verification via Authorization header
- **Token Management**: Client-side token storage and automatic inclusion in requests
- **Session Management**: Stateless JWT-based sessions with expiration handling

### API Design
- **Registration Endpoint**: POST /api/register - User creation with validation
- **Login Endpoint**: POST /api/login - Authentication with JWT generation
- **Protected Endpoint**: GET /api/profile - Demonstrates protected route access
- **Error Handling**: Consistent error responses with appropriate HTTP status codes
- **Request Logging**: Custom middleware for API request/response logging

### Security Considerations
- **Password Hashing**: bcryptjs with configurable salt rounds
- **JWT Secret**: Environment variable based secret key management
- **Token Validation**: Server-side JWT verification with expiration checks
- **CORS Configuration**: Permissive settings for development and mobile testing
- **Input Validation**: Zod schemas for type-safe request validation

## External Dependencies

### Database and ORM
- **Drizzle ORM**: SQL query builder and schema management (configured but not actively used)
- **PostgreSQL**: Database dialect configuration (ready for future implementation)
- **Neon Database**: Serverless PostgreSQL driver included

### Authentication and Security
- **jsonwebtoken**: JWT creation and verification
- **bcryptjs**: Password hashing and comparison
- **Zod**: Schema validation and type inference

### Frontend Libraries
- **Radix UI**: Primitive components for accessible UI elements
- **Tailwind CSS**: Utility-first CSS framework
- **TanStack Query**: Server state management (included but minimal usage)
- **Wouter**: Lightweight routing library
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment optimizations and debugging tools