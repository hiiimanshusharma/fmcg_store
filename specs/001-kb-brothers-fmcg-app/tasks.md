# Implementation Tasks: KB Brothers FMCG Distribution Application

This document outlines the execution plan for building the KB Brothers FMCG distribution platform. The tasks are organized by user story and phase to enable incremental delivery and testing.

## Implementation Strategy
- **Phase 1-2**: Focus on local development environment, Supabase configuration, and shared models.
- **Phase 3 (GTM)**: Deliver the public-facing brand showcase first to build marketing momentum.
- **Phase 4-5 (Core)**: Implement the dual-mode portal (Admin Inventory & Client Ordering).
- **Phase 6 (Analytics)**: Add business intelligence layers.

## Phase 1: Setup (Project Initialization)
- [x] T001 Initialize repository structure for `backend/` (FastAPI) and `frontend/` (Next.js)
- [x] T002 Configure Supabase project (Auth, Database, Storage) and local `.env` files
- [x] T003 Set up Tailwind CSS configuration in `frontend/` with HUL brand palette
- [ ] T004 Initialize PWA service worker with Workbox in `frontend/` for offline support

## Phase 2: Foundational (Blocking Prerequisites)
- [ ] T005 [P] Create database schema in Supabase using `specs/001-kb-brothers-fmcg-app/data-model.md`
- [ ] T006 [P] Implement Supabase Auth integration (Hybrid: Google SSO + Phone/OTP) in `frontend/src/services/auth.ts`
- [x] T007 Implement shared `Product` and `Inventory` service logic in `backend/app/services/inventory.py`
- [x] T008 [P] Seed initial HUL product catalog using official HUL Article Codes in `backend/app/scripts/seed_hul.py`

## Phase 3: User Story 1 - GTM & Marketing Landing Page (P1)
**Story Goal**: Showcase KB Brothers and HUL partnership to prospective partners.
**Independent Test**: Public visitor can view the hero section, brand showcase, and navigate to the inquiry form.

- [x] T009 [P] [US1] Create Hero section with high-impact HUL branding in `frontend/src/app/page.tsx`
- [x] T010 [P] [US1] Implement "Featured Brands" component (Surf Excel, Dove, etc.) in `frontend/src/components/BrandShowcase.tsx`
- [x] T011 [US1] Build "Why Partner with KB Brothers" value prop section in `frontend/src/components/ValueProps.tsx`
- [x] T012 [US1] Create "Partner with Us" inquiry/registration form in `frontend/src/components/RegistrationForm.tsx`

## Phase 4: User Story 2a - Admin Inventory Management (P1)
**Story Goal**: Admin manages stock, batches, and expiries.
**Independent Test**: Admin can log in via SSO, update stock for a product, and see real-time updates.

- [x] T013 [US2a] Implement Admin Dashboard Layout and Protected Route in `frontend/src/app/admin/layout.tsx`
- [x] T014 [P] [US2a] Create Inventory List view with search (HUL Code/Name) in `frontend/src/app/admin/inventory/page.tsx`
- [x] T015 [US2a] Implement Stock Update modal with Batch/Expiry fields in `frontend/src/components/StockUpdateModal.tsx`
- [ ] T016 [US2a] Create API endpoint for Batch/Inventory updates in `backend/app/api/inventory_routes.py`

## Phase 5: User Story 2b - Client Product Catalog & Ordering (P1)
**Story Goal**: Retailers browse the catalog and place orders (offline-capable).
**Independent Test**: Retailer can browse brands, add items to cart (even offline), and sync orders when online.

- [x] T017 [US2b] Implement Client Portal Dashboard and Category filters in `frontend/src/app/client/catalog/page.tsx`
- [ ] T018 [P] [US2b] Set up Dexie.js (IndexedDB) for offline cart and order persistence in `frontend/src/services/offline_store.ts`
- [x] T019 [US2b] Create Product Card component with "Backorder" state for OOS items in `frontend/src/components/ProductCard.tsx`
- [ ] T020 [US2b] Implement Order Sync logic (Server-side authority + Conflict resolution) in `backend/app/services/order_sync.py`
- [x] T021 [US2b] Create "My Orders" status tracker with 5-stage lifecycle in `frontend/src/app/client/orders/page.tsx`

## Phase 6: User Story 3 - Analytics Dashboard (P2)
**Story Goal**: Business metrics for Admin.
**Independent Test**: Dashboard displays counts for Total Retailers, Products, and Stockout Rate.

- [ ] T022 [P] [US3] Create aggregate view for "Distributor Metrics" in Supabase (SQL/Functions)
- [x] T023 [US3] Implement Analytics charts (Inventory Turnover, Order Cycle) in `frontend/src/app/admin/dashboard/charts.tsx`
- [x] T024 [US3] Build Client Management view for Admin approvals in `frontend/src/app/admin/clients/page.tsx`

## Phase 7: Polish & Cross-Cutting Concerns
- [ ] T025 [P] Implement E2E tests for the core ordering flow using Playwright in `frontend/tests/order_flow.spec.ts`
- [x] T026 Add error handling and loading states for slower connections in `frontend/src/components/FeedbackUI.tsx`
- [ ] T027 Finalize image optimization for high-res HUL brand assets in `frontend/next.config.js`
- [x] T028 Implement "Complaints" submission form and email integration in `frontend/src/app/client/complaints/page.tsx`
- [ ] T029 Implement Inventory Audit Logging and Reconciliation view in `backend/app/api/audit_routes.py`

## Dependencies & Parallel Execution
- **Setup (T001-T004)** must complete first.
- **Foundational (T005-T008)** provides the core API/DB for further phases.
- **US1 (GTM)** can be developed in parallel with **US2a/US2b (Portals)** backend logic.
- **Analytics (US3)** depends on data accumulated in US2a/US2b.

## Parallel Execution Examples
| Stream | Tasks |
|--------|-------|
| Frontend UI | T009, T010, T014, T019 |
| Backend API | T007, T008, T016, T020 |
| Data/Auth | T005, T006, T022 |
