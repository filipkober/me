import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBreadcrumbs from "@/components/NavBreadcrumbs";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Filip Kober",
  description: "personal website :)",
  icons: [
    {
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          {children}
          <div className="fixed bottom-2 flex w-full pr-12 sm:pr-10 lg:pr-4 z-30">
            <NavBreadcrumbs className="ml-auto"/>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
