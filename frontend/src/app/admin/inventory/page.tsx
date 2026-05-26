"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { MOCK_PRODUCTS } from "@/data/products";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(MOCK_PRODUCTS.map((p) => [p.hul_article_code, p.stock_quantity]))
  );

  const filtered = MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.hul_article_code.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = (code: string, newQty: number) => {
    setQuantities({ ...quantities, [code]: newQty });
    setEditingCode(null);
  };

  return (
    <div>
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Inventory Management
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Manage HUL product stock levels, batches, and expiry tracking
          </p>
        </div>
        <span className="neu-badge" style={{ color: "var(--kb-blue)" }}>
          {filtered.length} products
        </span>
      </motion.div>

      <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <input
          id="inventory-search"
          type="text"
          placeholder="Search by HUL Code, Name, or Brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="neu-input max-w-md"
        />
      </motion.div>

      <motion.div
        className="neu-raised overflow-hidden"
        style={{ padding: 0 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(30, 58, 95, 0.04)" }}>
                <th className="text-left px-6 py-4 font-semibold">HUL Code</th>
                <th className="text-left px-6 py-4 font-semibold">Product</th>
                <th className="text-left px-6 py-4 font-semibold">Brand</th>
                <th className="text-right px-6 py-4 font-semibold">MRP (₹)</th>
                <th className="text-right px-6 py-4 font-semibold">Stock</th>
                <th className="text-center px-6 py-4 font-semibold">Status</th>
                <th className="text-center px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => {
                const qty = quantities[product.hul_article_code] ?? product.stock_quantity;
                const isLow = qty > 0 && qty <= 10;
                const isOOS = qty === 0;

                return (
                  <motion.tr
                    key={product.hul_article_code}
                    className="border-t"
                    style={{ borderColor: "var(--border)" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ backgroundColor: "rgba(30,58,95,0.02)" }}
                  >
                    <td className="px-6 py-4 font-mono text-xs font-medium" style={{ color: "var(--kb-blue)" }}>
                      {product.hul_article_code}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-contain" sizes="40px" />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs" style={{ color: "var(--muted)" }}>
                            {product.unit_size} • Case of {product.case_quantity}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4 text-right">₹{product.mrp}</td>
                    <td className="px-6 py-4 text-right">
                      {editingCode === product.hul_article_code ? (
                        <input
                          type="number"
                          defaultValue={qty}
                          className="neu-input w-20 text-right"
                          style={{ padding: "6px 10px" }}
                          autoFocus
                          onBlur={(e) => handleUpdate(product.hul_article_code, parseInt(e.target.value) || 0)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleUpdate(product.hul_article_code, parseInt((e.target as HTMLInputElement).value) || 0);
                          }}
                        />
                      ) : (
                        <span className="font-semibold">{qty}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className="neu-badge text-xs"
                        style={{
                          background: isOOS ? "#EF444420" : isLow ? "#F59E0B20" : "#10B98120",
                          color: isOOS ? "#EF4444" : isLow ? "#F59E0B" : "#10B981",
                        }}
                      >
                        {isOOS ? "Out of Stock" : isLow ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <motion.button
                        className="neu-btn-primary text-xs"
                        style={{ padding: "6px 16px", borderRadius: "10px" }}
                        onClick={() => setEditingCode(product.hul_article_code)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Update
                      </motion.button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
