# Overview

Arab Auto is a bilingual (English/Arabic) car dealership website built with a modern full-stack architecture. The application features a premium automotive showcase with car listings, detailed vehicle information, contact forms, and multilingual support. It's designed as a luxury car dealership platform with Islamic-themed design elements and comprehensive vehicle management capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **Styling**: Tailwind CSS with custom CSS variables for theming and Arabic/Islamic design patterns
- **Internationalization**: Custom context-based solution supporting English and Arabic languages
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the stack
- **API Design**: RESTful API with structured endpoints for cars, users, and contact inquiries
- **Development**: Hot module replacement with Vite integration for seamless development experience

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Well-defined tables for users, cars, and contact inquiries with proper relationships
- **Migrations**: Drizzle Kit for database schema management and version control
- **Development Storage**: In-memory storage implementation for development/testing

## Component Architecture
- **Design System**: Consistent component library with variants and theming support
- **Layout System**: Responsive design with mobile-first approach
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **Error Handling**: Comprehensive error boundaries and user feedback systems

## Key Features
- **Multilingual Support**: Complete Arabic and English language switching
- **Car Management**: Comprehensive vehicle listings with detailed specifications
- **Contact System**: Inquiry forms with validation and submission handling
- **Responsive Design**: Mobile-optimized interface with touch-friendly interactions
- **Islamic Theming**: Cultural design elements including patterns and color schemes

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **Drizzle ORM**: Type-safe database toolkit for schema management and queries

## UI and Styling
- **Radix UI**: Headless UI components for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for smooth user interactions

## Development Tools
- **Vite**: Build tool and development server with HMR support
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

## Form and Validation
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Hookform Resolvers**: Integration between React Hook Form and Zod

## Additional Libraries
- **TanStack Query**: Server state management with caching and synchronization
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Utility for creating component variants
- **CLSX/Tailwind Merge**: Conditional className utilities

## Development Environment
- **Replit Integration**: Cloud development environment with runtime error handling
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins