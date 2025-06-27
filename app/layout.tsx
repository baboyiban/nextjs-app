import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/client-layout";
import { AuthProvider } from "./context/auth-context";
import { DashboardDataProvider } from "./context/dashboard-data-context"; // 추가

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "물류 관리 시스템",
  description: "물류 관리 시스템 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray`}
      >
        <AuthProvider>
          <DashboardDataProvider>
            <ClientLayout>{children}</ClientLayout>
          </DashboardDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
