"use client";

import { motion } from "framer-motion";

export default function ValueProps() {
  const props = [
    {
      icon: "🚀",
      title: "Extensive Distribution Network",
      description: "Reach 500+ retailers across the region with our proven distribution infrastructure. We ensure last-mile delivery even in tier-2 and tier-3 towns.",
      stat: "500+",
      statLabel: "Active Retailers",
    },
    {
      icon: "🔗",
      title: "Reliable Supply Chain",
      description: "Direct partnership with Hindustan Unilever ensures fresh stock, competitive margins, and consistent availability of 1000+ SKUs.",
      stat: "99.9%",
      statLabel: "Inventory Accuracy",
    },
    {
      icon: "📊",
      title: "Digital-First Operations",
      description: "Place orders digitally, track deliveries in real-time, and manage your inventory with our offline-capable platform.",
      stat: "<10s",
      statLabel: "Order Processing",
    },
    {
      icon: "💰",
      title: "Competitive Margins",
      description: "Get the best distributor pricing on HUL brands with transparent billing, flexible credit limits, and batch-level FEFO tracking.",
      stat: "15%+",
      statLabel: "Avg. Retailer Margin",
    },
  ];

  return (
    <section
      id="why-us"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, var(--neu-bg) 0%, #DDE3EA 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="neu-badge mb-4 inline-block" style={{ color: "var(--kb-gold)" }}>
            Why Partner With Us
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Why Choose KB Brothers?
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            Decades of distribution expertise combined with modern technology.
          </p>
        </motion.div>

        {/* Props Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {props.map((prop, index) => (
            <motion.div
              key={prop.title}
              className="group neu-raised p-8"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <div className="flex items-start gap-5">
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 neu-pressed"
                  whileHover={{ scale: 1.1, rotateZ: 10 }}
                >
                  {prop.icon}
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{prop.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                    {prop.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold" style={{ color: "var(--kb-blue)" }}>
                      {prop.stat}
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>
                      {prop.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}
        <motion.div
          className="mt-16 p-8 rounded-3xl text-center text-white"
          style={{ background: "linear-gradient(135deg, var(--kb-blue) 0%, var(--hul-blue) 100%)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {[
              { value: "10+", label: "Years in Distribution" },
              { value: "₹50Cr+", label: "Annual Turnover" },
              { value: "98%", label: "On-Time Delivery" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                <div className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
