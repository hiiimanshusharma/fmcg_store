"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";

export default function HeroSection() {
  const { user, role, signInWithGoogle } = useAuth();
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient Backdrop */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Floating 3D Orbs */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-15"
        style={{ background: "var(--kb-gold)" }}
        animate={{ y: [0, -20, 0], rotateZ: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-10"
        style={{ background: "var(--kb-teal)" }}
        animate={{ y: [0, 15, 0], rotateZ: [0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90">Official HUL Distribution Partner</span>
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Growth Partner for{" "}
              <span className="gradient-text">HUL Distribution</span>
            </h1>

            <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
              Unlock access to India&#39;s most loved FMCG brands through KB Brothers.
              Reliable supply chain, extensive distribution network, and digital-first ordering.
            </p>

            <div className="flex flex-wrap gap-4">
              {!user ? (
                <motion.button
                  onClick={signInWithGoogle}
                  className="neu-btn-gold flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontSize: "1rem" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B1120">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Login with Google
                </motion.button>
              ) : (
                <motion.a
                  href={user && role === "admin" ? "/admin/dashboard" : "/client/catalog"}
                  className="neu-btn-gold"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontSize: "1rem" }}
                >
                  Go to Dashboard →
                </motion.a>
              )}
              <motion.a
                href="#brands"
                id="cta-explore-hero"
                className="px-8 py-4 rounded-full font-semibold text-lg text-white border-2 border-white/30"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Brands
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { value: "50+", label: "HUL Brands" },
                { value: "500+", label: "Retailers" },
                { value: "1000+", label: "SKUs" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                >
                  <div
                    className="text-2xl sm:text-3xl font-bold gradient-text"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — 3D Product Showcase */}
          <motion.div
            className="hidden lg:grid grid-cols-2 gap-5"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { name: "Surf Excel", img: "/brands/surf-excel.png" },
              { name: "Dove", img: "/brands/dove.png" },
              { name: "Red Label", img: "/brands/red-label.png" },
              { name: "Surf Excel", img: "/brands/surf-excel.png" },
            ].map((brand, i) => (
              <motion.div
                key={`${brand.name}-${i}`}
                className="neu-raised p-5 flex flex-col items-center justify-center text-center cursor-pointer"
                style={{ background: "rgba(232,237,242,0.95)" }}
                whileHover={{
                  scale: 1.08,
                  rotateY: 8,
                  rotateX: -5,
                  transition: { type: "spring", stiffness: 300 },
                }}
                initial={{ opacity: 0, y: 30, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 0.4 + i * 0.15, type: "spring" }}
              >
                <div className="relative w-24 h-24 mb-3">
                  <Image
                    src={brand.img}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
                <span className="font-semibold text-sm" style={{ color: "var(--kb-blue)" }}>
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
