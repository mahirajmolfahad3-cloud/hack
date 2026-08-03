import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth MVP",
  description: "A minimal Next.js + Supabase + Prisma authentication demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
