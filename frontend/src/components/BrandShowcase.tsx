"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FEATURED_BRANDS } from "@/data/products";

export default function BrandShowcase() {
  return (
    <section id="brands" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="neu-badge mb-4 inline-block" style={{ color: "var(--kb-blue)" }}>
            Our Portfolio
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Trusted HUL Brands
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            We distribute India&apos;s most iconic FMCG brands, powering retail shelves across the region.
          </p>
        </motion.div>

        {/* Brand Grid — 3D Neumorphic Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {FEATURED_BRANDS.map((brand, index) => (
            <motion.div
              key={brand.name}
              id={`brand-card-${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative neu-raised p-6 cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
              whileHover={{
                scale: 1.06,
                rotateY: 6,
                rotateX: -3,
                transition: { type: "spring", stiffness: 400 },
              }}
              whileTap={{ scale: 0.97 }}
              style={{ perspective: "1000px" }}
            >
              {/* Color Accent Bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                style={{ background: brand.color }}
                whileHover={{ height: 3 }}
              />

              <div className="flex flex-col items-center text-center pt-2">
                <motion.div
                  className="relative w-16 h-16 mb-3"
                  whileHover={{ scale: 1.15, rotateZ: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </motion.div>
                <h3 className="font-bold text-base mb-1">{brand.name}</h3>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {brand.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mt-16">
          {[
            { icon: "🏠", title: "Home Care", desc: "Surf Excel, Rin, Vim — Complete laundry & kitchen solutions", color: "var(--kb-blue)" },
            { icon: "💎", title: "Beauty & Personal Care", desc: "Dove, Lux — Premium skincare trusted by millions", color: "var(--kb-teal)" },
            { icon: "☕", title: "Foods & Refreshment", desc: "Red Label, Knorr, Horlicks — Daily nutrition & joy", color: "var(--kb-gold)" },
          ].map((cat, i) => (
            <motion.div
              key={cat.title}
              className="neu-raised p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <h3 className="font-bold text-lg mb-2" style={{ color: cat.color }}>{cat.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
