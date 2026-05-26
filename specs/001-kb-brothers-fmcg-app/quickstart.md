# Quickstart: KB Brothers FMCG Distribution Application

## Environment Setup
1. **Node.js**: Install Node.js v20+.
2. **PostgreSQL**: Ensure a Postgres instance is running.
3. **Google Cloud Console**: Create a project and obtain OAuth2 Client ID for Gmail SSO.

## Installation
```bash
# Clone the repository (if not already present)
# git clone <repo_url>
# cd fmcg-store

# Setup Backend
cd backend
npm install
cp .env.example .env # Update with DB and Google credentials
npm run dev

# Setup Frontend
cd ../frontend
npm install
npm run dev
```

## Mock Data Seeding
Run the following to seed initial HUL product data:
```bash
cd backend
npm run seed:hul
```

## Running Tests
```bash
# Backend unit tests
cd backend
npm test

# E2E Playwright tests
cd frontend
npx playwright test
```
