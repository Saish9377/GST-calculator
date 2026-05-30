import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GST Calculator India — Add, Remove GST with CGST SGST IGST Breakdown",
    template: "%s | GST Calculator India",
  },
  description:
    "Free online GST Calculator to add or remove GST instantly. Get CGST, SGST, IGST breakdown, generate tax invoices, and download PDF — all for free. Supports all GST rates: 0%, 3%, 5%, 12%, 18%, 28%.",
  keywords: [
    "GST Calculator",
    "GST Calculator India",
    "GST Add Calculator",
    "GST Remove Calculator",
    "CGST Calculator",
    "SGST Calculator",
    "IGST Calculator",
    "Reverse GST Calculator",
    "GST Invoice Generator",
    "18% GST Calculator",
    "28% GST Calculator",
    "GST rate calculator",
    "tax calculator india",
  ],
  authors: [{ name: "GST Calculator India" }],
  creator: "GST Calculator India",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "GST Calculator India",
    title: "GST Calculator — Add & Remove GST Instantly",
    description:
      "Free GST Calculator with CGST, SGST, IGST breakdown. Generate invoices and download PDF.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GST Calculator India",
    description:
      "Free GST Calculator with CGST, SGST, IGST breakdown. Add or remove GST instantly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "BC0ex51x72S_DzimDir1d_TOhFijacwPPfd-h7O4968",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "GST Calculator India",
              url: "https://gstcalculator.in",
              description:
                "Free online GST Calculator to add or remove GST with CGST, SGST, and IGST breakdown.",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <CustomCursor />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
