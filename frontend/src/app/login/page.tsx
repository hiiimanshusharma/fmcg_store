"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user, role, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (!loading && user && role) {
      router.push(role === "admin" ? "/admin/dashboard" : "/client/catalog");
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center text-xl font-bold mx-auto mb-4 animate-pulse">
            KB
          </div>
          <p style={{ color: "var(--muted)" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #0B1120, #1E3A5F)" }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Card */}
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center text-2xl font-bold mx-auto mb-4"
              style={{ color: "#0B1120" }}
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
            >
              KB
            </motion.div>
            <h1
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              KB Brothers
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              FMCG Distribution Management
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              className="mb-6 p-3 rounded-xl text-sm text-center"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                color: "#EF4444",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              Authentication failed. Please try again.
            </motion.div>
          )}

          {/* Google SSO Button */}
          <motion.button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold text-sm transition-all"
            style={{
              background: "white",
              color: "#1f2937",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
            whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </motion.button>

          <p
            className="text-center text-xs mt-6"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Authorized distributors & retailers only
          </p>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm hover:underline"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            ← Back to KB Brothers
          </a>
        </div>
      </motion.div>
    </div>
  );
}
