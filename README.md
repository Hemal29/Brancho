# Brancho — India's Trusted Home Services Platform

Brancho connects homeowners with background-verified professionals for home services
(AC repair, deep cleaning, electrician, plumbing and more) across India.

The platform is divided into **three independent apps**:

| App | Path | Port | Description |
| --- | ---- | ---- | ----------- |
| **Backend API** | `backend/` | 4000 | Next.js route handlers (`/api/*`), MySQL pool, JWT auth |
| **Admin Panel** | `admin/` | 3001 | Admin dashboard: users, bookings, services, professionals, coupons, reviews, support |
| **Customer App** | `customer/` | 3000 | Corporate site + customer dashboard + provider dashboard |

Both frontends proxy `/api/*` requests to the backend (`next.config.ts` rewrites), so
authentication cookies keep working unchanged — just make sure the backend is running.

## Features

- Corporate website: businesses, founder, newsroom, media, careers, legal, brand pages
- Customer flow: browse services → book → pay → track bookings → wallet → reviews
- Provider flow: incoming jobs, status updates, earnings dashboard
- Admin panel: full CRUD over users, services, professionals, coupons, reviews, tickets
- JWT authentication with role-based access (customer / provider / admin)
- MySQL schema with 13 tables + seed data (`backend/db/init.sql`, `backend/scripts/seed.mjs`)

## Tech Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS 4**, Framer Motion, GSAP, Lenis smooth scroll
- **MySQL 8** via `mysql2` connection pool
- **JWT** auth (`jsonwebtoken`) + bcrypt password hashing

## Getting Started

```bash
# 1. Install dependencies for all three apps
npm run install:all

# 2. Configure the backend environment
cp backend/.env.local   # fill in DB credentials + JWT secret

# 3. Create tables + demo data (requires MySQL running)
npm run db:seed

# 4. Run each app (in separate terminals)
npm run dev:backend     # http://localhost:4000  (start this first)
npm run dev:customer    # http://localhost:3000
npm run dev:admin       # http://localhost:3001
```

### Environment variables (`backend/.env.local`)

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=brancho
DB_PASSWORD="your-password"
DB_NAME=brancho
JWT_SECRET=your-secret
JWT_EXPIRE=7d
```

### Frontend configuration (optional)

| Variable | Where | Default | Purpose |
| -------- | ----- | ------- | ------- |
| `API_PROXY_URL` | `customer/`, `admin/` | `http://localhost:4000` | Where `/api/*` requests are proxied |
| `NEXT_PUBLIC_SITE_URL` | `admin/` | `http://localhost:3000` | "View website" links in the admin panel |

## Demo Accounts (after seeding)

| Role | Email | Password |
| ---- | ----- | -------- |
| Admin | admin@brancho.in | Admin@123 |
| Customer | aarav@example.com | Customer@123 |
| Provider | ramesh@brancho.in | Provider@123 |

## Database

Schema lives in [`backend/db/init.sql`](backend/db/init.sql) (13 tables: Users,
Professionals, Services, Bookings, Payments, Reviews, Wallets, WalletTransactions,
Coupons, Notifications, SupportTickets, Addresses, ActivityLogs).

Seed demo data:

```bash
npm run db:seed
```
