import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryan Hamill · Founder & AI Entrepreneur",
  description:
    "Ayudo a empresas a escalar con IA. 🇬🇧🇨🇴",
  icons: {
    icon: "/favicon-rh.png",
    shortcut: "/favicon-rh.png",
    apple: "/favicon-rh.png",
  },
  openGraph: {
    title: "Ryan Hamill · Founder & AI Entrepreneur",
    description: "Ayudo a las empresas a escalar con IA ",
    url: "https://hamilll.com",
    siteName: "hamilll",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
