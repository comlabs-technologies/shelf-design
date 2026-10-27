import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/Providers";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recall — Everything you meant to keep, ready when you need it",
  description:
    "Recall is an AI-powered workspace that turns the links, notes, screenshots, and ideas you save into a private library you can ask in plain language.",
  openGraph: {
    title: "Recall — A memory layer for your work",
    description:
      "Save links, notes, screenshots, and ideas. Find them again by describing what you remember.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-revealed elements can start hidden without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
