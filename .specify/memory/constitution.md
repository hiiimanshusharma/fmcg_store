<!-- 
Sync Impact Report:
- Version change: [TEMPLATE] -> 1.0.0
- Modified principles: 
  - [PRINCIPLE_1_NAME] -> I. API-First & Internal Consistency
  - [PRINCIPLE_2_NAME] -> II. Transactional Integrity & Idempotency
  - [PRINCIPLE_3_NAME] -> III. Security-First Hybrid Auth
  - [PRINCIPLE_4_NAME] -> IV. Offline-First Resilience
  - [PRINCIPLE_5_NAME] -> V. Observable Execution
- Added sections: Core Principles, Governance
- Templates requiring updates: 
  - plan-template.md (✅ updated via manual check)
  - spec-template.md (✅ updated via manual check)
  - tasks-template.md (✅ updated via manual check)
- Follow-up TODOs: None.
-->

# KB Brothers FMCG Store Constitution

## Core Principles

### I. API-First & Internal Consistency
Every system interaction must be mediated by a well-defined, versioned API. The backend (FastAPI) is the single source of truth for business logic. The frontend (Next.js) must strictly consume these interfaces, ensuring that the "GTM" landing page and "Admin/Client" portals share the same underlying data state.

### II. Transactional Integrity & Idempotency
In FMCG distribution, stock accuracy and order fidelity are paramount. All state mutations (inventory adjustments, order placements) MUST be transactional. We adopt Stripe's pattern of idempotency keys for all critical operations to prevent duplicate orders or stock double-counts during sync.

### III. Security-First Hybrid Auth
Authentication is the gatekeeper for business data. We use Supabase Auth for Hybrid (SSO + Phone/OTP) flows. All routes are "Secure by Default." Access control (RBAC) must distinguish between Admin and Retailer scopes at the database level (RLS) and the API layer.

### IV. Offline-First Resilience
Field operations occur in low-connectivity areas. The application MUST provide a seamless offline experience using IndexedDB (Dexie.js). Sync logic should favor server-side authority while providing the user with actionable conflict resolution UI. If it doesn't work offline, it doesn't work for our users.

### V. Observable Execution
We cannot improve what we cannot measure. Every critical path (Auth, Order Sync, Stock Update) must emit structured logs and metrics. We prioritize observability to detect stock race conditions or sync failures in real-time, aligned with our <2s dashboard latency goal.

## Security Requirements

Retailer data (PII) and business metrics are sensitive. We strictly adhere to data protection standards. No business metrics or inventory case quantities should be exposed to unauthenticated public visitors on the GTM landing page.

## Development Workflow

1. **Spec-First**: No code is written without a refined specification and design review.
2. **Atomic Commits**: Changes must be small, focused, and mapped to a specific task ID.
3. **Test-First (Mandatory)**: All core business logic (Inventory FEFO, Order Lifecycle) must have companion unit or integration tests.

## Governance
This constitution is the supreme guide for the KB Brothers project. Amendments require a version bump and coordination across spec, plan, and tasks. All pull requests must be validated against these five principles.

**Version**: 1.0.0 | **Ratified**: 2026-05-09 | **Last Amended**: 2026-05-09
