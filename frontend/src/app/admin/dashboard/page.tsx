"use client";

import { motion } from "framer-motion";

export default function AdminDashboard() {
  const metrics = [
    { label: "TOTAL RETAILERS", value: "8,742", sub: "Active Retailers", change: "+5.3% since last month", icon: "👥", color: "var(--kb-teal)" },
    { label: "MONTHLY TURNOVER", value: "₹2.85Cr", sub: "MTD Revenue", change: "+12.1% growth", icon: "💰", color: "var(--kb-gold)" },
    { label: "STOCKOUT RATE", value: "1.9%", sub: "Current Rate", change: "-0.8%", icon: "📉", color: "#10B981" },
  ];

  const topProducts = [
    { name: "Surf Excel Easy Wash", code: "HUL-SFE-105", sales: "₹12.4L" },
    { name: "Dove Cream Beauty Bar", code: "HUL-DVS-201", sales: "₹9.8L" },
    { name: "Red Label Tea 500g", code: "HUL-RLT-301", sales: "₹8.2L" },
    { name: "Lux International Soap", code: "HUL-LUX-001", sales: "₹7.1L" },
    { name: "Horlicks Health Drink", code: "HUL-HLK-701", sales: "₹6.5L" },
  ];

  const recentOrders = [
    { id: "ORD-110133", client: "Admin", status: "Confirmed", amount: "₹24,500" },
    { id: "ORD-110134", client: "Sharma Store", status: "Processing", amount: "₹18,200" },
    { id: "ORD-110135", client: "Patel Kirana", status: "Out for Delivery", amount: "₹31,000" },
    { id: "ORD-110136", client: "Gupta Mart", status: "Pending", amount: "₹15,800" },
  ];

  const statusColors: Record<string, string> = {
    Pending: "#F59E0B",
    Confirmed: "#3B82F6",
    Processing: "#8B5CF6",
    "Out for Delivery": "#14B8A6",
    Delivered: "#10B981",
  };

  return (
    <div>
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm" style={{ color: "var(--muted)" }}>DASHBOARD OVERVIEW</p>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Welcome back, Admin!
        </h1>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="neu-raised p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            whileHover={{ scale: 1.03, y: -4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wide" style={{ color: "var(--muted)" }}>{m.label}</span>
              <span className="text-2xl">{m.icon}</span>
            </div>
            <div className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: m.color }}>
              {m.value}
            </div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>{m.sub}</div>
            <div className="text-xs mt-2 font-medium" style={{ color: "#10B981" }}>↗ {m.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts + Top Products */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="lg:col-span-2 neu-raised p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold mb-4">SALES TRENDS - LAST 6 MONTHS</h3>
          <div className="h-64 flex items-end justify-around gap-2 px-4">
            {[
              { month: "Jan", value: 60 },
              { month: "Feb", value: 72 },
              { month: "Mar", value: 78 },
              { month: "Apr", value: 85 },
              { month: "May", value: 80 },
              { month: "Jun", value: 100 },
            ].map((bar, i) => (
              <div key={bar.month} className="flex flex-col items-center gap-2 flex-1">
                <div className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                  ₹{(bar.value * 2.85 / 100).toFixed(1)}M
                </div>
                <motion.div
                  className="w-full rounded-t-xl"
                  style={{
                    background: `linear-gradient(to top, var(--kb-teal), var(--kb-teal-light))`,
                    boxShadow: "3px 3px 6px var(--neu-shadow-dark), -3px -3px 6px var(--neu-shadow-light)",
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.value * 2}px` }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 80 }}
                />
                <span className="text-xs" style={{ color: "var(--muted)" }}>{bar.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="neu-raised p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-bold mb-4">TOP SELLING PRODUCTS</h3>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <motion.div
                key={p.code}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold" style={{ color: "var(--muted)" }}>{i + 1}.</span>
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>{p.code}</div>
                  </div>
                </div>
                <span className="text-sm font-semibold" style={{ color: "var(--kb-teal)" }}>{p.sales}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        className="neu-raised p-6"
        style={{ overflow: "hidden" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-bold mb-4">RECENT ORDERS</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "var(--muted)" }}>
                <th className="text-left pb-3 font-medium">Order ID</th>
                <th className="text-left pb-3 font-medium">Client</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-right pb-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  className="border-t"
                  style={{ borderColor: "var(--border)" }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  <td className="py-3 font-medium">{order.id}</td>
                  <td className="py-3">{order.client}</td>
                  <td className="py-3">
                    <span
                      className="neu-badge text-xs"
                      style={{ background: `${statusColors[order.status]}20`, color: statusColors[order.status] }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">{order.amount}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
