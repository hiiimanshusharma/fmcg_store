"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/inventory", label: "Inventory", icon: "📦" },
  { href: "/admin/clients", label: "Clients", icon: "👥" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) {
      router.push("/login");
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center font-bold animate-pulse">
          KB
        </div>
      </div>
    );
  }

  if (!user || role !== "admin") return null;

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Sidebar */}
      <aside
        className="w-64 min-h-screen p-6 flex flex-col shrink-0"
        style={{ background: "#0B1120", color: "#E2E8F0" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg gradient-gold text-[#0B1120]">
            KB
          </div>
          <div>
            <div className="font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>
              KB BROTHERS
            </div>
            <div className="text-xs text-white/40">Admin Panel</div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: active ? "rgba(14, 165, 160, 0.15)" : "transparent",
                  color: active ? "#14D4CE" : "#94A3B8",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="space-y-2 mt-auto">
          {/* User info */}
          <div className="px-4 py-3 rounded-xl text-xs" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="text-white/60 mb-0.5">Signed in as</div>
            <div className="text-white/90 font-medium truncate">{user.email}</div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <span>🌐</span>
            <span>Back to Site</span>
          </Link>
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-red-400 transition-colors w-full text-left"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
