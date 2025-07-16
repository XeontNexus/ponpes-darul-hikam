import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pondok Pesantren DARUL HIKAM",
  description: "Sistem Informasi Pondok Pesantren DARUL HIKAM - Membentuk Generasi Qur'ani",
  keywords: ["pondok pesantren", "darul hikam", "pendidikan islam", "santri", "pesantren"],
  authors: [{ name: "Pondok Pesantren DARUL HIKAM" }],
  creator: "Pondok Pesantren DARUL HIKAM",
  publisher: "Pondok Pesantren DARUL HIKAM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DARUL HIKAM",
    startupImage: ["/icons/icon-192x192.png"],
  },
  openGraph: {
    type: "website",
    siteName: "Pondok Pesantren DARUL HIKAM",
    title: "Pondok Pesantren DARUL HIKAM",
    description: "Sistem Informasi Pondok Pesantren DARUL HIKAM - Membentuk Generasi Qur'ani",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Logo Pondok Pesantren DARUL HIKAM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pondok Pesantren DARUL HIKAM",
    description: "Sistem Informasi Pondok Pesantren DARUL HIKAM - Membentuk Generasi Qur'ani",
    images: ["/icons/icon-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#166534",
      },
    ],
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#166534",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DARUL HIKAM" />
        <meta name="msapplication-TileColor" content="#166534" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
