# Implementation Plan: KB Brothers FMCG Distribution Application

**Branch**: `master` | **Date**: 2026-05-09 | **Spec**: [spec.md](file:///home/himanshu/fmcg-store/specs/001-kb-brothers-fmcg-app/spec.md)
**Input**: Feature specification from `/specs/001-kb-brothers-fmcg-app/spec.md`

## Summary

The KB Brothers FMCG Distribution Application is designed to streamline operations for a Hindustan Unilever (HUL) distributor. It features a high-impact "Go-To-Market" (GTM) landing page to showcase the brand and partnership, alongside functional portals for Admin (inventory/distribution management) and Clients (retailers placing orders). The system prioritizes real-time stock visibility and offline capability for field sales.

## Technical Context

**Language/Version**: Python 3.11+ (Backend), TypeScript/Node.js (Frontend)  
**Primary Dependencies**: Next.js 14, FastAPI, Tailwind CSS, Supabase SDK, Dexie.js (for offline)  
**Storage**: Supabase (PostgreSQL)  
**Testing**: Playwright (E2E), Jest (Unit)  
**Target Platform**: Web (Desktop & Mobile Responsive)
**Project Type**: Web Application  
**Performance Goals**: Dashboard access < 2s, Stock update < 10s, 99.9% inventory accuracy.  
**Constraints**: Offline-capable synchronization, Hybrid Authentication (Supabase Auth: Google SSO + Phone/OTP).  
**Scale/Scope**: Serving 500+ retailers, 50+ HUL brands, 1000+ SKUs.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] Principle 1: [NEEDS CLARIFICATION: Core Principles are currently placeholders in constitution.md]
- [ ] Principle 2: [NEEDS CLARIFICATION]
- [ ] Principle 3: [NEEDS CLARIFICATION]

## Project Structure

### Documentation (this feature)

```text
specs/001-kb-brothers-fmcg-app/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
backend/ (FastAPI)
├── app/
│   ├── models/
│   ├── api/
│   └── services/
└── tests/

frontend/ (Next.js)
├── src/
│   ├── app/ (App Router)
│   ├── components/
│   └── services/
└── tests/
```

**Structure Decision**: Web application structure with separated frontend (React) and backend (Node.js/Python) to support the dual-mode portal and premium GTM landing page.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multiple projects | Separate frontend/backend for scalability | Monolith would be harder to maintain for GTM vs Admin needs |
