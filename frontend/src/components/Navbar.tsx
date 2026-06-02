"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, role, signInWithGoogle } = useAuth();

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
            {!user ? (
              <motion.button
                onClick={signInWithGoogle}
                className="neu-btn-primary text-sm flex items-center gap-2"
                style={{ padding: "10px 24px", borderRadius: "12px" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign In
              </motion.button>
            ) : (
              <Link
                href={role === "admin" ? "/admin/dashboard" : "/client/catalog"}
                className="neu-btn-primary text-sm"
                style={{ padding: "10px 24px", borderRadius: "12px" }}
              >
                Dashboard
              </Link>
            )}
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
            {!user ? (
              <button
                onClick={signInWithGoogle}
                className="block w-full neu-btn-primary text-sm text-center flex items-center justify-center gap-2"
                style={{ padding: "12px" }}
              >
                Sign In with Google
              </button>
            ) : (
              <Link
                href={role === "admin" ? "/admin/dashboard" : "/client/catalog"}
                className="block w-full neu-btn-primary text-sm text-center"
                style={{ padding: "12px" }}
                onClick={() => setMobileOpen(false)}
              >
                Go to Dashboard
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
