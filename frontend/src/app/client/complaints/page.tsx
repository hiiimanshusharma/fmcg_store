"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComplaintsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.h1
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Complaints & Support
      </motion.h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        Report issues with orders, products, or deliveries.
      </p>

      <motion.div
        className="neu-raised p-6 mb-8 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
      >
        <span className="text-3xl">📧</span>
        <div>
          <h3 className="font-semibold mb-1">Email Us Directly</h3>
          <a
            href="mailto:complaints@kbbrothers.in"
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--kb-blue)" }}
          >
            complaints@kbbrothers.in
          </a>
        </div>
      </motion.div>

      <motion.div
        className="neu-raised p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span className="text-4xl mb-3 block">✅</span>
              <h3 className="font-bold text-lg mb-1">Complaint Submitted</h3>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Reference #CMP-2026-{Math.floor(Math.random() * 10000)}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="font-bold text-lg mb-4">Submit a Complaint</h3>

              <div>
                <label className="block text-sm font-medium mb-1.5">Issue Type</label>
                <select className="neu-input" required>
                  <option value="">Select issue type...</option>
                  <option value="damaged">Damaged Product</option>
                  <option value="quality">Quality Concern</option>
                  <option value="delivery">Delivery Issue</option>
                  <option value="billing">Billing Discrepancy</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Order ID (Optional)</label>
                <input type="text" placeholder="e.g., ORD-2024-001" className="neu-input" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your issue in detail..."
                  className="neu-input resize-none"
                />
              </div>

              <motion.button
                type="submit"
                className="neu-btn-primary w-full"
                style={{ borderRadius: "14px", padding: "14px" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Complaint
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
