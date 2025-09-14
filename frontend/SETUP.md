# Khidmat CMS - Setup Instructions

## Overview
This is a React + TypeScript application built with Vite, using Tailwind CSS for styling and various UI libraries for components.

## Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation & Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd khidmat-cms-new
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or the next available port)

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Key Dependencies
- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Framer Motion** - Animation library
- **Recharts** - Chart library
- **React Query** - Data fetching and state management
- **Lucide React** - Icon library

## Project Structure
```
src/
├── components/     # Reusable UI components
│   ├── ui/        # Base UI components (buttons, inputs, etc.)
│   ├── layout/    # Layout components (header, sidebar)
│   ├── auth/      # Authentication components
│   ├── dashboard/ # Dashboard-specific components
│   └── ...        # Feature-specific components
├── views/         # Page-level components
├── contexts/      # React context providers
├── types/         # TypeScript type definitions
├── lib/           # Utility functions
└── data/          # Mock data and constants
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features
- Responsive design with Tailwind CSS
- Dark/light mode support
- Dashboard with KPI cards and charts
- User management interface
- Application review system
- Audit logs
- Settings and help pages
- Animated transitions with Framer Motion

## Troubleshooting

### SSL Certificate Issues
If you encounter SSL errors during `npm install`, try:
```bash
npm config set strict-ssl false
npm install --legacy-peer-deps
```

### Port Already in Use
If port 5173 is occupied, Vite will automatically use the next available port (5174, 5175, etc.)

### Missing Dependencies
If you see import errors, ensure all dependencies are installed:
```bash
npm install
```

## Development Notes
- The project uses TypeScript with strict type checking
- ESLint is configured for code quality
- Path aliases are set up (`@/` points to `src/`)
- The app uses React Query for state management
- Authentication context is provided throughout the app
