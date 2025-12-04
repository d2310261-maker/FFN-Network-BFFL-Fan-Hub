# BFFL Fan Hub

## Overview

BFFL Fan Hub is a Christmas-themed fantasy football league platform that provides live game scores, real-time chat, news updates, weekly pick'ems, and playoff tracking. The application is built as a full-stack TypeScript web application with a React frontend and Express backend, featuring real-time updates via WebSockets and a festive holiday design theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript using Vite as the build tool
- Single Page Application (SPA) using `wouter` for client-side routing
- Component-based architecture with reusable UI components from shadcn/ui (Radix UI primitives)

**State Management**
- TanStack Query (React Query) for server state management with aggressive caching strategies
- Local component state using React hooks
- Query invalidation pattern for real-time data synchronization

**Styling Approach**
- Tailwind CSS with custom design system following Christmas theme guidelines
- Light and dark mode support via ThemeProvider context
- Custom CSS variables for dynamic theming (forest green, red, gold/champagne palette)
- Responsive design with mobile-first approach

**Real-time Features**
- WebSocket connections for live game updates and chat functionality
- Polling-based refetch for game scores (2-second intervals during live games)
- Optimistic UI updates with query invalidation

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- Development mode uses Vite middleware for HMR
- Production mode serves pre-built static assets
- Session-based authentication using connect-pg-simple

**API Design**
- RESTful API endpoints organized by resource type (games, news, chat, pickems, standings, etc.)
- Request/response validation using Zod schemas
- Error handling middleware with formatted JSON responses
- CORS and credential handling for cross-origin requests

**Authentication System**
- Simple username/password authentication (hardcoded credentials for admin)
- Session storage in PostgreSQL using express-session
- Protected routes using authentication middleware
- Future support for Replit Auth integration (code present but not active)

**Real-time Communication**
- WebSocket server implementation for game updates and chat
- Broadcast pattern for game state changes
- Per-game chat rooms with connection management

### Data Storage

**Database**
- PostgreSQL as the primary database
- Drizzle ORM for type-safe database operations
- Schema-first approach with TypeScript type generation
- Connection via `postgres-js` driver (compatible with Neon and standard PostgreSQL)

**Key Tables**
- `games` - Game schedule, scores, and status tracking
- `news` - News articles and announcements
- `chat_messages` - Real-time chat history per game
- `pickems` - Weekly prediction contests
- `pickem_rules` - Rules and scoring for pick'ems
- `standings` - Team rankings with manual ordering support
- `playoff_matches` - Playoff bracket data
- `predictions` - User game outcome predictions
- `changelogs` - Version history and feature updates
- `bracket_images` - Playoff bracket image storage
- `sessions` - Express session storage
- `users` - Admin user accounts

**Schema Features**
- UUID primary keys with PostgreSQL `gen_random_uuid()`
- Timestamp tracking (created_at, updated_at)
- JSONB columns for flexible data storage
- Unique constraints and indexes for data integrity

### External Dependencies

**UI Component Library**
- shadcn/ui components built on Radix UI primitives
- Comprehensive component set (dialogs, dropdowns, cards, forms, etc.)
- Accessible components following WAI-ARIA standards

**Utilities & Tools**
- date-fns and date-fns-tz for timezone-aware date formatting (America/New_York)
- zod for schema validation
- clsx and tailwind-merge for className manipulation
- nanoid for ID generation

**Development Tools**
- Replit-specific plugins for development experience (cartographer, dev-banner, runtime-error-modal)
- esbuild for production server bundling
- TypeScript for type safety across the stack

**Deployment Platform**
- Render.com for hosting (evidenced by build logs)
- Database migrations via Drizzle Kit push command
- Build process: database schema push → Vite build → esbuild server bundle

### Key Architectural Decisions

**Monorepo Structure**
- Shared schema definitions between client and server (`/shared/schema.ts`)
- Path aliases for clean imports (`@/`, `@shared/`)
- Single TypeScript configuration for entire project

**Development vs Production**
- Separate entry points (index-dev.ts vs index-prod.ts)
- Development uses Vite middleware for HMR
- Production serves pre-built static files from `/dist/public`

**Data Flow Pattern**
- Client requests data via TanStack Query hooks
- API endpoints fetch from database using Drizzle ORM
- WebSocket broadcasts for real-time updates
- Query invalidation triggers automatic refetches

**Win Probability System** (Enhanced Dec 2024)
- Multi-factor prediction algorithm with weighted factors:
  - **Rankings** (25% weight): Derived from standings order (manualOrder or calculated from win%)
  - **Point Differential** (25% weight): Each 15 PD difference contributes to probability swing
  - **Win/Loss Record** (25% weight): Win percentage directly influences predictions
  - **Schedule Strength** (25% weight): Average win% of opponents faced in completed games
- Live game adjustments:
  - Score difference weighted by quarter progress (Q1: 25%, Q2: 45%, Q3: 70%, Q4: 90%)
  - Pre-game factors blend with live score as game progresses
- UI displays factor breakdown showing which team has advantage in each category
- Calculations performed client-side in `client/src/lib/winProbability.ts`
- Helper function `getWinProbabilityFactors()` provides detailed breakdown for UI

**Christmas Theme Implementation**
- Animated snowfall effects using pure CSS
- Festive emoji elements (snowflakes, trees, Santa, gifts)
- Color palette switching between light/dark modes
- Custom CSS variables for theming consistency