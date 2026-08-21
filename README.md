# Brancho — India's Trusted Home Services Platform

Brancho connects homeowners with background-verified professionals for home services
(AC repair, deep cleaning, electrician, plumbing and more) across India.

This repository contains the full platform: a corporate marketing website, a customer
booking dashboard, a provider (professional) dashboard, an admin panel, and a REST API
backed by MySQL.

## Project Structure

The platform is being split into three independent apps:

| App | Path | Port | Description |
| --- | ---- | ---- | ----------- |
| **Backend API** | `backend/` | 4000 | Next.js route handlers (`/api/*`), MySQL pool, JWT auth |
| **Admin Panel** | `admin/` | 3001 | Admin dashboard: users, bookings, services, professionals, coupons, reviews, support |
| **Customer App** | `customer/` | 3000 | Corporate site + customer dashboard + provider dashboard |

> During migration, the original monolithic app at the repository root still contains
> all three areas together and is fully functional.

## Features

- Corporate website: businesses, founder, newsroom, media, careers, legal, brand pages
- Customer flow: browse services → book → pay → track bookings → wallet → reviews
- Provider flow: incoming jobs, status updates, earnings dashboard
- Admin panel: full CRUD over users, services, professionals, coupons, reviews, tickets
- JWT authentication with role-based access (customer / provider / admin)
- MySQL schema with 13 tables + seed data (`db/init.sql`, `scripts/seed.mjs`)

## Tech Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS 4**, Framer Motion, GSAP, Lenis smooth scroll
- **MySQL 8** via `mysql2` connection pool
- **JWT** auth (`jsonwebtoken`) + bcrypt password hashing

## Getting Started (monolith)

```bash
npm install
cp .env.example .env.local   # then fill in DB credentials
npm run db:seed              # create tables + demo data
npm run dev                  # http://localhost:3000
```

### Environment variables (`.env.local`)

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=brancho
DB_PASSWORD="your-password"
DB_NAME=brancho
JWT_SECRET=your-secret
JWT_EXPIRE=7d
NEXT_PUBLIC_API_URL=http://localhost:4000   # admin/customer apps -> backend
```

## Demo Accounts (after seeding)

| Role | Email | Password |
| ---- | ----- | -------- |
| Admin | admin@brancho.in | Admin@123 |
| Customer | aarav@example.com | Customer@123 |
| Provider | ramesh@brancho.in | Provider@123 |

## Database

Schema lives in [`db/init.sql`](db/init.sql) (13 tables: Users, Professionals,
Services, Bookings, Payments, Reviews, Wallets, WalletTransactions, Coupons,
Notifications, SupportTickets, Addresses, ActivityLogs).

Seed demo data:

```bash
npm run db:seed
```
