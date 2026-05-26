"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 neu-raised"
      style={{ borderRadius: 0, margin: 0, padding: "0 0" }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{
                background: "linear-gradient(135deg, var(--kb-blue), var(--hul-blue))",
                boxShadow: "3px 3px 6px var(--neu-shadow-dark), -3px -3px 6px var(--neu-shadow-light)",
              }}
            >
              KB
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              KB Brothers
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {["Home", "Brands", "Why Us", "Contact"].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                className="neu-btn text-sm"
                style={{ padding: "8px 18px", borderRadius: "12px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="#partner"
              id="cta-partner-nav"
              className="neu-btn-primary text-sm"
              style={{ padding: "10px 24px", borderRadius: "12px" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Partner with Us
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            id="mobile-menu-toggle"
            className="md:hidden neu-btn p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden px-4 pb-4 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {["Home", "Brands", "Why Us", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s/g, "-")}`} className="block neu-btn text-sm text-center" onClick={() => setMobileOpen(false)}>
                {link}
              </a>
            ))}
            <a href="#partner" className="block neu-btn-primary text-sm text-center" onClick={() => setMobileOpen(false)}>
              Partner with Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
