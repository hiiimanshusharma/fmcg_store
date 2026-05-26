"use client";

import { motion } from "framer-motion";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2026-05-08",
      items: [
        { name: "Surf Excel Easy Wash 1kg", qty: 24, price: 168 },
        { name: "Dove Cream Beauty Bar 100g", qty: 48, price: 52 },
      ],
      status: "Out for Delivery",
      total: 6528,
    },
    {
      id: "ORD-2024-002",
      date: "2026-05-07",
      items: [
        { name: "Red Label Tea 500g", qty: 12, price: 255 },
        { name: "Vim Bar 200g", qty: 36, price: 21 },
      ],
      status: "Delivered",
      total: 3816,
    },
    {
      id: "ORD-2024-003",
      date: "2026-05-09",
      items: [
        { name: "Horlicks Health Drink 500g", qty: 6, price: 242 },
        { name: "Kissan Mixed Fruit Jam 500g", qty: 12, price: 146 },
      ],
      status: "Pending",
      total: 3204,
    },
    {
      id: "ORD-2024-004",
      date: "2026-05-06",
      items: [{ name: "Lux International Soap 100g", qty: 48, price: 55 }],
      status: "Processing",
      total: 2640,
    },
  ];

  const statusSteps = ["Pending", "Confirmed", "Processing", "Out for Delivery", "Delivered"];
  const statusColors: Record<string, string> = {
    Pending: "#F59E0B",
    Confirmed: "#3B82F6",
    Processing: "#8B5CF6",
    "Out for Delivery": "#14B8A6",
    Delivered: "#10B981",
  };

  return (
    <div>
      <motion.h1
        className="text-2xl font-bold mb-6"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Orders
      </motion.h1>

      <div className="space-y-6">
        {orders.map((order, idx) => {
          const currentStep = statusSteps.indexOf(order.status);

          return (
            <motion.div
              key={order.id}
              className="neu-raised p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.01, y: -3 }}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <span className="font-bold">{order.id}</span>
                  <span className="text-sm ml-3" style={{ color: "var(--muted)" }}>
                    Placed: {order.date}
                  </span>
                </div>
                <span
                  className="neu-badge text-xs"
                  style={{
                    background: `${statusColors[order.status]}20`,
                    color: statusColors[order.status],
                  }}
                >
                  {order.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-1 mb-5">
                {statusSteps.map((step, i) => (
                  <div key={step} className="flex-1 flex flex-col items-center">
                    <motion.div
                      className="w-full h-2 rounded-full"
                      style={{
                        background: i <= currentStep ? statusColors[order.status] : "var(--neu-shadow-dark)",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: idx * 0.1 + i * 0.1 }}
                    />
                    <span
                      className="text-[10px] mt-1"
                      style={{ color: i <= currentStep ? statusColors[order.status] : "var(--muted)" }}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Items */}
              <div className="space-y-2 mb-3">
                {order.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span>{item.name} × {item.qty}</span>
                    <span className="font-medium">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center justify-between pt-3 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="text-sm font-semibold">Total</span>
                <span className="text-lg font-bold" style={{ color: "var(--kb-blue)" }}>
                  ₹{order.total.toLocaleString()}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
