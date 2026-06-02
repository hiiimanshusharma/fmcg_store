import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "KB Brothers - Your Growth Partner for HUL Distribution",
  description:
    "KB Brothers is a leading distributor of Hindustan Unilever products. Partner with us for reliable supply chain, extensive distribution network, and digital ordering.",
  keywords: [
    "KB Brothers",
    "HUL Distributor",
    "Hindustan Unilever",
    "FMCG Distribution",
    "Wholesale",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
