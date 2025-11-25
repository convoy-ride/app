import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/ui/Header";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const APP_TITLE = "Convoy | Decentralized ride-hailing marketplace";
const APP_NAME = "Convoy";
const APP_DESCRIPTION =
  "A community-owned ride-hailing marketplace built on blockchain technology, empowering drivers and riders with transparency and fair pricing.";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_TITLE
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_TITLE,
    description: APP_DESCRIPTION
  },
  twitter: {
    card: "summary",
    title: APP_TITLE,
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
