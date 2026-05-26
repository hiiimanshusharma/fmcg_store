# Technical Research: KB Brothers FMCG Application

## Core Tech Stack Decision

- **Frontend**: Next.js (App Router, SSR for GTM page SEO)
- **Backend**: FastAPI (Python, High-performance async logic for distribution)
- **Storage/Auth**: Supabase (PostgreSQL + Supabase Auth + Realtime)
- **Offline Mode**: Workbox (PWA) + Dexie.js (IndexedDB for offline order storage)

## Rationale
- **Next.js**: Industry standard for SEO-optimized GTM/Marketing pages and robust web applications.
- **FastAPI**: Provides superior performance and developer velocity for the complex business logic required in FMCG (FEFO, SKU mapping).
- **Supabase**: Integrated ecosystem for storage, real-time updates, and hybrid authentication (SSO + Phone/OTP).

## Alternatives Considered
- **FastAPI (Python)**: Good for data processing, but Node.js has a larger ecosystem for real-time PWA synchronization libraries.
- **MongoDB**: Rejected because of the highly relational nature of orders and inventory.
