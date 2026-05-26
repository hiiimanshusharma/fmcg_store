# KB Brothers: Redefining FMCG Distribution

**Empowering the supply chain for Hindustan Unilever (HUL) products with a premium, digital-first distribution ecosystem.**

KB Brothers is not just a management tool; it's a comprehensive Go-To-Market engine designed to bridge the gap between global product excellence and local retail execution. By digitizing the relationship between distributors and retailers, we ensure that the right products reach the right shelves at the right time.

---

## 🌟 The Vision

In the fast-paced world of FMCG, efficiency is the only currency that matters. KB Brothers transforms traditional distribution into a streamlined digital experience, reducing friction in ordering, eliminating inventory guesswork, and scaling retailer acquisition through a high-impact digital presence.

### 💎 Tailored Experiences

#### For the Distributor (Admin)
**Total Command & Control.**
Manage your entire HUL portfolio from a single pane of glass. From FEFO-based inventory precision to real-time business intelligence, the Admin suite is built for operational excellence.
- **Precision Inventory**: Batch tracking and expiry management to minimize waste.
- **Growth Analytics**: Monitor retailer growth, stockout rates, and turnover ratios.
- **Network Management**: Seamlessly onboard and approve new retail partners.

#### For the Retailer (Client)
**Ordering, Simplified.**
A premium digital storefront that puts the entire HUL catalog in the palm of the retailer's hand. No more manual lists or phone-tag—just a few clicks to restock.
- **Digital Catalog**: Browse HUL's world-class brands with intuitive category filtering.
- **Instant Ordering**: Fast, reliable ordering with integrated backorder support.
- **Seamless Access**: Modern hybrid authentication (Gmail SSO & Phone/OTP) for secure, effortless login.

---

## 🚀 Core Pillars of Innovation

### 📈 Market Expansion (GTM)
The platform features a high-impact landing page designed as a marketing vehicle. It showcases the prestige of the HUL partnership to attract and convert prospective retailers into long-term partners.

### ⚡ Operational Resilience
Built for the real world. With **Offline-First architecture**, retailers can browse and place orders even in remote areas with poor connectivity, with seamless background synchronization once back online.

### 🛠 Technical Excellence
Powered by a modern, scalable stack designed for low latency and high availability, ensuring that stock updates are reflected across the network in under 5 seconds.

---

## 🛠 Technical Foundation (Developer's Guide)

For contributors and engineers, the project is built on a robust monorepo architecture.

### Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS.
- **Backend**: FastAPI (Python), Supabase (Database & Auth).
- **Quality**: Pytest, Pytest-asyncio.

### Project Structure
```text
.
├── backend/             # FastAPI core logic (API, Models, Services)
├── frontend/            # Next.js application (Source, Assets)
└── specs/               # Comprehensive feature specifications & design docs
```

### Getting Started

**Backend Setup:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

## 👥 Contributors

| Contributor | Role |
|---|---|
| [hiiimanshusharma](https://github.com/hiiimanshusharma) | 👨‍💻 Creator & Lead Developer |
| [Antigravity](https://deepmind.google/) (Google DeepMind) | 🤖 AI Pair Programmer |
| [Claude](https://www.anthropic.com/) (Anthropic) | 🤖 AI Pair Programmer |

## 📄 Documentation
Detailed technical specifications, API contracts, and implementation roadmaps are available in the `/specs` directory.
