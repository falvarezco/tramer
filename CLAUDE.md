# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Colombian Supermarket Price Tracker - a full-stack monolith with separate backend and frontend directories. Scrapes real-time prices from Colombian supermarkets (Éxito, Carulla, Euro) via GraphQL APIs and displays comparisons in a React dashboard.

## Commands

### Backend

```bash
cd backend
npm install          # Install backend dependencies
npm run dev          # Start Express API with nodemon (hot-reload)
npm start            # Start Express API (production)
```

Backend runs on http://localhost:3000.

### Frontend

```bash
cd frontend
npm install          # Install frontend dependencies
npm run dev          # Start Vite dev server (port 5173, proxies /api to backend)
npm run build        # Production build
npx vitest run       # Run all tests
```

Frontend dev server runs on http://localhost:5173 and proxies `/api` requests to the backend.

## Architecture

### Backend (`backend/`)

Express REST API structured as routes → controllers → services:

- `src/server.js` — Entry point: app.listen() + cron setup
- `src/app.js` — Express app assembly (middleware + route mounting)
- `src/config/index.js` — PORT, CRON_SCHEDULE, default tracked products
- `src/routes/` — Thin route files mapping HTTP methods to controllers
- `src/controllers/` — Request handling logic (compare, history, tracking, alerts, deals, stats)
- `src/services/scraper/` — `ExitoCarullaClient` (GraphQL scraper) and `EuroSupermercadosClient` (placeholder)
- `src/services/aggregator.service.js` — `ColombianPriceAggregator` (groups products by brand+volume, sorts by price)
- `src/services/monitor.service.js` — `DailyPriceMonitor` (scheduled price checks)
- `src/services/history.service.js` — Mock price history generator
- `src/store/inMemoryStore.js` — In-memory `Set` (tracked products) and `Map` (price alerts)
- `src/middleware/errorHandler.js` — Global error handler

### Frontend (`frontend/`)

Vite + React app with Tailwind CSS v4, shadcn/ui, Zustand, Recharts:

- `src/App.jsx` — Root layout composing all page sections
- `src/components/` — SearchBar, StatsCards, PriceComparisonCard, PriceHistoryChart, TopDeals, Footer
- `src/components/ui/` — shadcn primitives (Card, Button, Input, Badge)
- `src/stores/usePriceStore.js` — Zustand store (search state, price data, history, mock fallback)
- `src/services/api.js` — Fetch wrappers for all backend endpoints
- `src/lib/utils.js` — `cn()` helper + `formatCOP()` currency formatter
- `src/__tests__/` — Vitest + React Testing Library tests for all components and store

## Key API Endpoints

- `GET /api/compare?product={name}` — Compare prices across stores
- `GET /api/history/:product?days=7` — Price history (currently mock)
- `GET /api/deals?minDiscount=20` — Find discounted products
- `POST /api/track` — Add product to tracking (body: `{product}`)
- `GET /api/tracked` — List tracked products
- `POST /api/alerts` — Set price alert (body: `{product, targetPrice}`)
- `GET /api/stats` — Dashboard statistics
- `GET /api/health` — Health check

## Data Flow

User search → Vite proxy → Express API → ColombianPriceAggregator → GraphQL queries to exito.com/carulla.com → Parse/group by brand+volume → Sort by price → Return JSON → Zustand store → React components

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express, node-cron, dotenv |
| Frontend | Vite, React 18, Tailwind CSS v4, shadcn/ui, Zustand, Recharts, lucide-react |
| Testing | Vitest, React Testing Library, jest-dom |

## Current Limitations

- In-memory storage (no persistence between restarts)
- Price history is mocked (not stored)
- Euro Supermercados client is placeholder only
- Stats values are hardcoded

## Configuration Points

- Default tracked products: `backend/src/config/index.js`
- Cron schedule: `backend/.env` (`CRON_SCHEDULE`)
- API port: `backend/.env` (`PORT`, default 3000)
- Vite proxy: `frontend/vite.config.js` (proxies `/api` to backend)
