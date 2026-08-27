import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahsanali Samejo — Operations in Motion",
  description:
    "The personal site of Ahsanali Samejo, an Implementation & Operations Coordinator building smoother customer journeys and smarter systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
