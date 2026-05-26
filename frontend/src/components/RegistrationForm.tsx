"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    ownerName: "",
    phone: "",
    email: "",
    city: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="partner" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="neu-badge mb-4 inline-block" style={{ color: "var(--kb-teal)" }}>
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Ready to Grow Your Retail Business?
            </h2>
            <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
              Register as a KB Brothers retail partner and get access to the full HUL product catalog with competitive pricing.
            </p>
            <div className="space-y-4">
              {[
                "Access to 1000+ HUL SKUs",
                "Competitive distributor pricing",
                "Digital ordering with offline support",
                "Real-time order tracking",
                "Flexible credit terms",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ background: "var(--kb-teal)" }}
                  >
                    ✓
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Neumorphic Form */}
          <motion.div
            className="neu-raised p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.span
                    className="text-5xl mb-4 block"
                    animate={{ rotateZ: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    🎉
                  </motion.span>
                  <h3 className="text-xl font-bold mb-2">Registration Submitted!</h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    Our team will review your application within 24 hours.
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
                  <h3 className="text-lg font-bold mb-2">Partner Registration</h3>
                  <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
                    Fill in your details and our team will contact you.
                  </p>

                  {[
                    { id: "storeName", label: "Store Name", type: "text", placeholder: "e.g., Sharma General Store" },
                    { id: "ownerName", label: "Owner Name", type: "text", placeholder: "Your full name" },
                    { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                    { id: "email", label: "Email (Optional)", type: "email", placeholder: "you@email.com" },
                    { id: "city", label: "City / Area", type: "text", placeholder: "e.g., Lucknow, Kanpur" },
                  ].map((field, i) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <label htmlFor={field.id} className="block text-sm font-medium mb-1.5">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.id !== "email"}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        className="neu-input"
                      />
                    </motion.div>
                  ))}

                  <motion.button
                    type="submit"
                    id="btn-submit-registration"
                    className="neu-btn-primary w-full"
                    style={{ borderRadius: "14px", padding: "14px" }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Registration →
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
