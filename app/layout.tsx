import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ponpes-darul-hikam-tebo.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pondok Pesantren Darul Hikam Rimbo Ulu - Membentuk Generasi Qur'ani",
    template: "%s | Ponpes Darul Hikam Rimbo Ulu",
  },
  description:
    "Website Resmi Yayasan Pondok Pesantren DARUL HIKAM, Desa Suka Damai, Kecamatan Rimbo Ulu, Kabupaten Tebo, Jambi. Informasi Penerimaan Santri Baru (PSB 2026/2027), Tahfidz Al-Qur'an, MTs, dan MA.",
  keywords: [
    "Pondok Pesantren Darul Hikam",
    "Darul Hikam Rimbo Ulu",
    "Darul Hikam Tebo",
    "Pesantren Rimbo Ulu",
    "Ponpes Darul Hikam Jambi",
    "PSB Darul Hikam 2026",
    "Penerimaan Santri Baru Darul Hikam",
    "MTs Darul Hikam",
    "MA Darul Hikam",
    "Tahfidz Quran Tebo",
    "Pendidikan Islam Terpadu",
  ],
  authors: [{ name: "Yayasan Pondok Pesantren DARUL HIKAM Rimbo Ulu" }],
  creator: "Yayasan Pondok Pesantren DARUL HIKAM Rimbo Ulu",
  publisher: "Yayasan Pondok Pesantren DARUL HIKAM Rimbo Ulu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Darul Hikam Rimbo Ulu",
    startupImage: ["/icons/icon-192x192.png"],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Pondok Pesantren Darul Hikam Rimbo Ulu",
    title: "Pondok Pesantren Darul Hikam Rimbo Ulu - Membentuk Generasi Qur'ani",
    description:
      "Website Resmi Yayasan Pondok Pesantren DARUL HIKAM, Desa Suka Damai, Kecamatan Rimbo Ulu, Kabupaten Tebo, Jambi. Informasi Penerimaan Santri Baru (PSB), Tahfidz Quran, dan Program Pendidikan Terpadu.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Logo Resmi Yayasan Pondok Pesantren Darul Hikam Rimbo Ulu Tebo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pondok Pesantren Darul Hikam Rimbo Ulu",
    description:
      "Website Resmi Yayasan Pondok Pesantren DARUL HIKAM - Membentuk Generasi Qur'ani Berakhlak Mulia",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google960056565f6d7629",
  },
}

export const viewport: Viewport = {
  themeColor: "#166534",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Yayasan Pondok Pesantren DARUL HIKAM Rimbo Ulu",
  alternateName: "Darul Hikam Rimbo Ulu",
  url: siteUrl,
  logo: `${siteUrl}/icons/icon-512x512.png`,
  image: `${siteUrl}/og-image.png`,
  description:
    "Yayasan Pondok Pesantren DARUL HIKAM di Desa Suka Damai, Kecamatan Rimbo Ulu, Kabupaten Tebo, Jambi. Pendidikan Islam terpadu, Tahfidz Al-Qur'an, MTs, dan MA.",
  foundingDate: "1990",
  founder: {
    "@type": "Person",
    name: "KH. Rifai Ahmad, S.Pd.I",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Teratai, Desa Suka Damai",
    addressLocality: "Rimbo Ulu",
    addressRegion: "Kabupaten Tebo, Jambi",
    addressCountry: "ID",
  },
  sameAs: [
    "https://youtube.com/@darulhikamtv?si=5rPvykoMigMg44NQ",
    "https://www.instagram.com/darulhikam.sukadamai?igsh=YXduN2Z2NDFlM3l5",
    "https://www.tiktok.com/@darulhikamtebo?_r=1&_t=ZS-98jjgRchKGw",
    "https://www.facebook.com/profile.php?id=100081803812314&mibextid=rS40aB7S9Ucbxw6v",
    "https://whatsapp.com/channel/0029Vb5CIK6DzgTCAQYTTS1R",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DARUL HIKAM" />
        <meta name="msapplication-TileColor" content="#166534" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
