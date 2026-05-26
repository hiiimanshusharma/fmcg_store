"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
            <div className="text-xs text-white/40">(Logo)</div>
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
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <span>🌐</span>
            <span>Back to Site</span>
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40">
            <span>⚙️</span>
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40">
            <span>❓</span>
            <span>Help</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
