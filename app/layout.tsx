import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { siteConfig } from "@/data/site-config";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    siteConfig.seo.canonicalUrl || siteConfig.url || "https://localhost:3000"
  ),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.seo.author }],
  creator: siteConfig.seo.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.seo.canonicalUrl,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.seo.ogImage || "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage || "/images/og-image.jpg"],
    creator: "@thoht_z",
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
    google: "your-google-verification-code", // Add your Google verification code
  },
  alternates: {
    canonical: siteConfig.seo.canonicalUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Critical resource preloads */}
        <link
          rel="preload"
          href="/images/profile-photo.jpg"
          as="image"
          type="image/jpeg"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />

        {/* Prefetch critical images */}
        <link
          rel="prefetch"
          href="/images/platforms/leetcode-logo.svg"
          as="image"
        />
        <link
          rel="prefetch"
          href="/images/platforms/hackerrank-logo.svg"
          as="image"
        />

        {/* Resource hints for better performance */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteConfig.seo.structuredData),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content link for keyboard navigation */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        <ErrorBoundary>{children}</ErrorBoundary>
        {/* Browser Compatibility Initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Early browser compatibility detection
              (function() {
                var html = document.documentElement;
                var classes = [];
                
                // Feature detection
                if (!window.CSS || !window.CSS.supports || !window.CSS.supports('backdrop-filter', 'blur(10px)')) {
                  classes.push('no-backdrop-filter');
                }
                if (!window.CSS || !window.CSS.supports || !window.CSS.supports('display', 'grid')) {
                  classes.push('no-css-grid');
                }
                if (!window.CSS || !window.CSS.supports || !window.CSS.supports('transform', 'translateX(0)')) {
                  classes.push('no-transforms');
                }
                
                // Browser detection
                var ua = navigator.userAgent;
                if (/Chrome/.test(ua) && /Google Inc/.test(navigator.vendor)) classes.push('browser-chrome');
                else if (/Firefox/.test(ua)) classes.push('browser-firefox');
                else if (/Safari/.test(ua) && !/Chrome/.test(ua)) classes.push('browser-safari');
                else if (/Edge/.test(ua) || /Edg/.test(ua)) classes.push('browser-edge');
                else if (/MSIE|Trident/.test(ua)) classes.push('browser-ie');
                
                // Device detection
                if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                  classes.push('touch-device');
                } else {
                  classes.push('no-touch');
                }
                
                // Reduced motion
                if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                  classes.push('prefers-reduced-motion');
                }
                
                // Apply classes
                html.className += ' ' + classes.join(' ');
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
