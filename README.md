# KB Brothers FMCG Distribution Application

A specialized distribution management system for **KB Brothers**, focused on the efficient distribution of Hindustan Unilever (HUL) products. The platform provides tailored experiences for both warehouse administrators and retail clients to streamline the supply chain from distributor to retailer.

## 🚀 Project Overview

The application is designed to handle the complexities of FMCG distribution, including real-time inventory tracking, HUL product hierarchy management, and a high-impact Go-To-Market (GTM) presence to attract new retail partners.

### Key Personas
- **Admin (Distributor)**: Manages the HUL product catalog, monitors real-time stock levels using FEFO (First Expired, First Out) logic, approves new retailer registrations, and tracks business metrics via an analytics dashboard.
- **Client (Retailer)**: Browses the digital HUL catalog, places orders for restocking, and manages their store's relationship with KB Brothers.

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database & Auth**: Supabase
- **Testing**: Pytest, Pytest-asyncio
- **Environment**: `python-dotenv`

### Frontend
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📂 Project Structure

```text
.
├── backend/             # FastAPI application
│   ├── app/             # Core application logic
│   │   ├── api/         # REST API endpoints
│   │   ├── models/      # Data schemas and Pydantic models
│   │   ├── services/    # Business logic layer
│   │   └── main.py      # Application entry point
│   └── tests/            # Backend test suite
├── frontend/            # Next.js application
│   ├── src/             # Application source code
│   └── public/          # Static assets and images
└── specs/               # Feature specifications and design documents
```

## 🚦 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Supabase account for backend services

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## ✨ Key Features

- **GTM Landing Page**: A premium public-facing page showcasing the partnership with HUL to drive retailer acquisition.
- **Inventory Management**: Real-time stock tracking with batch and expiry date management.
- **Hybrid Authentication**: Secure access via Gmail SSO and Phone/OTP.
- **Digital Catalog**: Category-based browsing of HUL products with "Backorder" support for out-of-stock items.
- **Analytics Dashboard**: High-level metrics including Total Retailers, Inventory Turnover, and Stockout Rates.
- **Offline Capabilities**: Designed for resilience in areas with poor connectivity, supporting offline order placement and background sync.

## 📄 Documentation
For detailed technical specifications and implementation plans, refer to the `specs/` directory.
