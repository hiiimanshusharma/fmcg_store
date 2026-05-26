# Feature Specification: KB Brothers FMCG Distribution Application

**Feature Branch**: `001-kb-brothers-fmcg-app`  
**Created**: 2026-05-09  
**Status**: Draft  
**Input**: User description: "I want to create a application for FMCG product distributors named 'KB Brothers' . It should have two modes one for admin and other for clients. It must have catalog and inventory showcase highlights stocks and clients names, and no of retailers , no of products and all other metrics. brand which is used distributed is Hindustan Unilever. Surf over Internet and gather requirements from FMCG distributors worldwide about what would be required in this. This client side page is getting very specific i still think it's very specific ... main page should also acts it's adverstiment or marketing or go ti market"

## Clarifications

### Session 2026-05-09

- Q: Which authentication method should be used for KB Brothers distributors and their retailers? → A: Hybrid Authentication (Gmail SSO + Phone/OTP).
- Q: What is the definitive lifecycle of an order from placement to completion? → A: Pending -> Confirmed -> Processing -> Out for Delivery -> Delivered.
- Q: What is the minimum duration the application must support full offline functionality before requiring a sync? → A: Unlimited (Sync whenever possible).
- Q: Should the system use official HUL Article Codes or custom KB Brothers internal SKU code as the primary identifier? → A: Official HUL Article Codes.
- Q: How should new retailers (clients) be onboarded into the system? → A: Self-Registration with Admin Approval.

### Session 2026-05-09 #2

- Q: How should the system display and handle OOS items in the retailer's view? → A: Show "Out of Stock" with "Backorder" option.
- Q: Should v1 include a module for handling product returns and damages? → A: No, provide a simple complaints page or "Email Us" link.
- Q: Should we diversify the auth strategy? → A: Use Hybrid Auth (Gmail SSO and Phone/OTP both).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - GTM & Marketing Landing Page (Priority: P1)

As a Prospective Retailer or Partner, I want to see a premium, high-impact landing page that showcases KB Brothers' partnership with Hindustan Unilever and their distribution capabilities so that I am convinced to partner with them.

**Why this priority**: First impressions are critical for business growth and market positioning. The landing page acts as the digital storefront and "Go-To-Market" vehicle.

**Independent Test**: A public visitor can access the home page and see a hero section with HUL branding, a showcase of top brands (Surf Excel, Dove, etc.), and clear "Why Partner with Us" value propositions.

**Acceptance Scenarios**:

1. **Given** a new visitor on the Home Page, **When** they scroll down, **Then** they see a "Featured Brands" section showcasing HUL categories (Home Care, Personal Care, Foods).
2. **Given** a prospective retailer, **When** they click "Partner with Us", **Then** they are directed to a registration or inquiry form.

---

### User Story 2 - Admin Inventory & Stock Management (Priority: P1)

As an Admin, I want to manage the HUL product catalog and monitor real-time stock levels so that I can ensure product availability and minimize stockouts.

**Why this priority**: Core functionality for a distributor. Without inventory management, the business cannot operate.

**Independent Test**: Admin can log in, view the stock level of "Surf Excel Matic Liquid", and update the quantity. The dashboard reflects the updated stock immediately.

**Acceptance Scenarios**:

1. **Given** the Admin is on the Inventory page, **When** they search for "Vim Bar", **Then** the system displays the current stock count, batch number, and expiry date.
2. **Given** a stock replenishment arrives, **When** the Admin adds 100 units to "Dove Soap", **Then** the inventory total is updated and a log entry is created.

---

### User Story 2b - Client Product Catalog & Ordering (Priority: P1)

As a Client (Retailer), I want to browse the HUL product catalog and place orders so that I can restock my shop efficiently.

**Why this priority**: This is the primary revenue-generating flow for the application.

**Independent Test**: Client can browse categories (Home Care, Personal Care, Foods), select "Red Label Tea", add it to a cart, and submit an order.

**Acceptance Scenarios**:

1. **Given** the Client is logged in, **When** they filter the catalog by "Home Care", **Then** only brands like Surf Excel, Rin, and Vim are displayed.
2. **Given** an order is placed, **When** the Client checks their "My Orders" section, **Then** the order status shows as "Pending" and lists the correct items.

---

### User Story 3 - Analytics Dashboard (Priority: P2)

As an Admin, I want to see key metrics like total retailers, total products, and stockout rates so that I can make data-driven business decisions.

**Why this priority**: Essential for business growth and operational efficiency tracking.

**Independent Test**: Dashboard displays accurate counts for "Total Retailers", "Total Active SKUs", and "Top Selling Brands".

**Acceptance Scenarios**:

1. **Given** new retailers have registered, **When** the Admin views the dashboard, **Then** the "No. of Retailers" count increases correspondingly.
2. **Given** sales have occurred, **When** the Admin views the "Performance" tab, **Then** a chart shows the "Order-to-Cash" cycle time trend.

---

### Edge Cases

- **Offline Order Placement**: How does the system handle orders when a client has a poor internet connection in a remote retail area?
- **Expiry nearing**: How does the system alert the Admin when a large batch of "Kissan Jam" is nearing its expiry date?
- **Simultaneous Stock Updates**: How does the system prevent overselling if two clients place an order for the last 5 units of "Horlicks" at the same time?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a high-impact, premium public landing page for marketing and Go-To-Market (GTM) purposes.
- **FR-002**: Landing page MUST prominently feature Hindustan Unilever (HUL) branding and a representative product showcase.
- **FR-003**: System MUST provide separate login and interface for Admin and Client (Authenticated Retailer) roles using Hybrid Authentication (Gmail-based SSO and Phone/OTP).
- **FR-004**: System MUST display a comprehensive catalog of HUL brands for authenticated clients.
- **FR-005**: Admin MUST be able to manage inventory, including batch tracking and expiry dates (FEFO logic).
- **FR-006**: System MUST display a dashboard with metrics: Total Retailers, Total Products, Inventory Turnover Ratio, and Stockout Rate.
- **FR-007**: Clients MUST be able to browse products by category and brand and add them to a digital order; Out-of-Stock items MUST remain visible with a "Backorder" option.
- **FR-008**: System MUST support real-time stock updates across all user interfaces (Latency < 5s).
- **FR-009**: System MUST provide a mechanism for Admin to manage Client (Retailer) profiles, approve self-registrations, and set credit limits.
- **FR-010**: System MUST provide a simple "Complaints" page or email link for retailers to report issues or damages.
- **FR-011**: Landing page MUST include a "Why Partner with KB Brothers" section highlighting delivery speed, product range, and digital ordering benefits.

### Key Entities *(include if feature involves data)*

- **Product**: Represents an HUL SKU. Attributes: HUL Article Code (Primary ID), SKU Name, Brand, Category, Unit Size, Case Quantity, MRP, Distributor Price.
- **Inventory**: Tracks stock levels. Attributes: Product ID, Batch Number, Expiry Date, Current Quantity, Warehouse Location.
- **Retailer (Client)**: Business partner profile. Attributes: Store Name, Owner Name, Address, Contact Number, Credit Limit, Outstanding Balance.
- **Order**: Records a transaction. Attributes: Order ID, Client ID, Status (Pending/Confirmed/Processing/Out for Delivery/Delivered), Total Value, List of Order Items.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Admins can update stock for an SKU in under 10 seconds.
- **SC-002**: Clients can complete a 5-item order in under 60 seconds from the start of browsing.
- **SC-003**: Dashboards load and reflect real-time data within 2 seconds of access.
- **SC-004**: System maintains 99.9% inventory accuracy between physical stock and digital records.

## Assumptions

- **Target Users**: Distributors (Admin) and Retailers (Clients) are based locally but requires an application for coordination.
- **Connectivity**: Users have at least intermittent internet access; system MUST support unlimited offline operation (order placement, inventory viewing) with background synchronization whenever connectivity is restored.
- **Scope**: Payment gateway and full reverse logistics (returns) are out of scope for v1; complaints handled via simple form/email.
- **Brand**: The application specifically caters to Hindustan Unilever (HUL) product hierarchies.
- **Mock Data**: Initial catalog will be seeded with major HUL brands and popular SKUs (Surf Excel, Dove, Red Label).
