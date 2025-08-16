import type { Metadata, Viewport } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@payload-types";
import { Inter } from "next/font/google";
import "@style/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Greenvan Services</title>
      </head>
      <body className={`${inter.variable}`}>{children}</body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });
  const ogImage = siteSettings?.siteSEO?.ogImage as Media;
  return {
    title: "Greenvan Services",
    icons: {
      icon: "/greenvan-logo.svg",
    },
    description: siteSettings.siteSEO?.metaDescription || "Greenvan Services",
    openGraph: {
      images: [ogImage?.url || "/default-og-image.jpg"],
    },
  };
}
