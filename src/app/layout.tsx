import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Initialize ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Enable smooth scrolling
  gsap.config({ 
    scrollTrigger: {
      autoRefreshEvents: 'resize,orientationchange,DOMContentLoaded'
    }
  });
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Management Dashboard",
  description: "Modern user management dashboard built with Next.js, TypeScript, and TailwindCSS",
  keywords: "Next.js, TypeScript, TailwindCSS, User Management, Dashboard",
  authors: [{ name: "Mohammad Selim" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ scrollBehavior: 'auto' }} // Override default scroll behavior
      >
        {children}
      </body>
    </html>
  );
}
