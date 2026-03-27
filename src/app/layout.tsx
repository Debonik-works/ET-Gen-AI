import type { Metadata } from "next";
import { Faustina, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MarketBand from "../components/MarketBand";
import { AuthProvider } from "@/context/AuthContext";

const faustina = Faustina({
  variable: "--font-faustina",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Economic Times: Business News, Personal Finance, Financial News",
  description: "Economic Times brings you the latest news, share market updates, and financial news.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${faustina.variable} ${montserrat.variable} antialiased bg-white`}
      >
        <AuthProvider>
          <div className="sticky top-0 z-50 print:hidden">
            <MarketBand />
            <Header />
          </div>
          <main className="max-w-[1280px] mx-auto px-4 lg:px-8 py-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
