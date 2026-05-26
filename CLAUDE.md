# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
KB Brothers FMCG Distribution Application. A distribution management system for Hindustan Unilever (HUL) products catering to Admins (distributors) and Clients (retailers).

## Architecture & Structure
The project is a monorepo containing a FastAPI backend and a Next.js frontend.

### Backend (`/backend`)
- **Framework**: FastAPI
- **Database/Backend-as-a-Service**: Supabase
- **Structure**:
    - `app/main.py`: API entry point and configuration.
    - `app/api/`: API endpoint definitions.
    - `app/models/`: Pydantic models and database schemas.
    - `app/services/`: Business logic layer.
    - `tests/`: Pytest suite for API and service testing.

### Frontend (`/frontend`)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS, PostCSS
- **Structure**:
    - `src/`: Main application source code.
    - `public/`: Static assets.
- **Note**: This project uses a specific version of Next.js with breaking changes; refer to `node_modules/next/dist/docs/` if encountering unexpected behavior.

## Common Commands

### Backend
- **Run API**: `uvicorn app.main:app --reload` (from `/backend`)
- **Install Dependencies**: `pip install -r requirements.txt`
- **Run All Tests**: `pytest` (from `/backend`)
- **Run Single Test**: `pytest tests/test_health.py`

### Frontend
- **Install Dependencies**: `npm install` (from `/frontend`)
- **Run Development Server**: `npm run dev` (from `/frontend`)
- **Lint**: `npm run lint` (from `/frontend`)
- **Build**: `npm run build` (from `/frontend`)

## Key Development Context
- **Authentication**: Hybrid approach using Gmail SSO and Phone/OTP.
- **Domain Logic**: Specifically tailored to HUL product hierarchies and official HUL Article Codes.
- **Core Features**: GTM landing page, Admin inventory management (FEFO logic), Client catalog/ordering, and Analytics dashboard.
- **Offline Support**: The system is designed to support unlimited offline operation with background synchronization.
