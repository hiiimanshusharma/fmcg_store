"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MOCK_PRODUCTS, BRAND_CATEGORIES } from "@/data/products";

type CategoryKey = keyof typeof BRAND_CATEGORIES;

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "ALL">("ALL");
  const [cart, setCart] = useState<Record<string, number>>({});

  const categories = Object.entries(BRAND_CATEGORIES) as [CategoryKey, typeof BRAND_CATEGORIES[CategoryKey]][];

  const filtered =
    activeCategory === "ALL"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

  const addToCart = (code: string) => {
    setCart({ ...cart, [code]: (cart[code] || 0) + 1 });
  };

  const cartTotal = Object.entries(cart).reduce((sum, [code, qty]) => {
    const product = MOCK_PRODUCTS.find((p) => p.hul_article_code === code);
    return sum + (product?.distributor_price || 0) * qty;
  }, 0);

  return (
    <div>
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          All Products
        </h1>
        {cartTotal > 0 && (
          <motion.div
            className="neu-btn-primary text-sm"
            style={{ padding: "8px 20px", borderRadius: "14px" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            🛒 Cart: ₹{cartTotal.toLocaleString()} ({Object.values(cart).reduce((a, b) => a + b, 0)} items)
          </motion.div>
        )}
      </motion.div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <h3 className="font-semibold text-sm mb-3">Categories</h3>
          <div className="space-y-2">
            <motion.button
              onClick={() => setActiveCategory("ALL")}
              className={activeCategory === "ALL" ? "neu-pressed" : "neu-btn"}
              style={{ width: "100%", textAlign: "left", padding: "10px 14px", fontSize: "0.875rem" }}
              whileTap={{ scale: 0.97 }}
            >
              📦 All Products
            </motion.button>
            {categories.map(([key, cat]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={activeCategory === key ? "neu-pressed" : "neu-btn"}
                style={{ width: "100%", textAlign: "left", padding: "10px 14px", fontSize: "0.875rem" }}
                whileTap={{ scale: 0.97 }}
              >
                {cat.icon} {cat.label}
              </motion.button>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((product, i) => {
            const isOOS = product.stock_quantity === 0;
            return (
              <motion.div
                key={product.hul_article_code}
                className="neu-raised p-5"
                style={{ opacity: isOOS ? 0.75 : 1 }}
                initial={{ opacity: 0, y: 30, rotateX: 5 }}
                animate={{ opacity: isOOS ? 0.75 : 1, y: 0, rotateX: 0 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                whileHover={{
                  scale: 1.04,
                  rotateY: 4,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                {/* Product Image */}
                <div className="neu-pressed w-full h-36 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                  <div className="relative w-28 h-28">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="112px"
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-sm mb-0.5">{product.name}</h3>
                <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
                  {product.brand}, {product.unit_size}
                </p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-lg font-bold" style={{ color: "var(--kb-blue)" }}>
                    ₹{product.distributor_price}
                  </span>
                  <span className="text-xs line-through" style={{ color: "var(--muted)" }}>
                    ₹{product.mrp}
                  </span>
                </div>

                <p className="text-xs mb-3 font-mono" style={{ color: "var(--muted)" }}>
                  {product.hul_article_code}
                </p>

                {isOOS && (
                  <span className="neu-badge text-xs mb-3 inline-block" style={{ background: "#EF444420", color: "#EF4444" }}>
                    Backorder
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <div className="neu-pressed flex items-center" style={{ borderRadius: "10px" }}>
                    <span className="px-3 py-1.5 text-sm" style={{ color: "var(--muted)" }}>Qty</span>
                    <span className="px-3 py-1.5 text-sm font-medium">{cart[product.hul_article_code] || 0}</span>
                  </div>
                  <motion.button
                    onClick={() => addToCart(product.hul_article_code)}
                    className={isOOS ? "neu-btn" : "neu-btn-primary"}
                    style={{ flex: 1, padding: "8px", borderRadius: "10px", fontSize: "0.75rem" }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isOOS ? "Backorder" : "Add to Cart"}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
