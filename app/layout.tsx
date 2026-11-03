import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CLOUDFLARE_TOKEN, SITE_NAME, SITE_URL } from "../lib/site";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Công cụ tiện ích tiếng Việt`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Các công cụ nhỏ, miễn phí, dùng ngay trên trình duyệt: đọc số thành chữ và nhiều tiện ích khác.",
  // Sẽ bật dòng dưới khi có mã từ Google Search Console:
  verification: { google: "2c2el8xMT1Yv3WBcU0f-nDNiAkbctzZEQKtkuYCdOgI" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        {CLOUDFLARE_TOKEN && process.env.NODE_ENV === "production" && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CLOUDFLARE_TOKEN })}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}