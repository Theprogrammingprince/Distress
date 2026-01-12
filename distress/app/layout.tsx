'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";
import { ProductsProvider } from "./context/ProductsContext";
import { WishlistProvider } from "./context/WishlistContext";
import { QueryProvider } from "../lib/providers/QueryProvider";
import { ToastProvider } from "../lib/providers/ToastProvider";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Distress - Premium Products at Unbeatable Prices</title>
        <meta name="description" content="Shop quality furniture, electronics, and home decor at distress sale prices. Save up to 60% on premium brands." />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <ProductsProvider>
              <WishlistProvider>
                <ToastProvider />
                {!isDashboard && <Header />}
                {children}
                {!isDashboard && <Footer />}
              </WishlistProvider>
            </ProductsProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
