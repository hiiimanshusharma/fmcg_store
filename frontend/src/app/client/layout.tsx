"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/client/catalog", label: "Catalog", icon: "🛒" },
  { href: "/client/orders", label: "My Orders", icon: "📋" },
  { href: "/client/complaints", label: "Complaints", icon: "📧" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Top Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: "var(--kb-blue)" }}
                >
                  KB
                </div>
                <span className="font-bold text-sm">Retailer Portal | FMCG Ordering</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: active ? "rgba(30, 58, 95, 0.08)" : "transparent",
                        color: active ? "var(--kb-blue)" : "var(--muted)",
                      }}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>🔔</span>
              <span className="font-medium" style={{ color: "var(--kb-blue)" }}>₹1,210</span>
              <span style={{ color: "var(--muted)" }}>Aman&#39;s Store ▾</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
