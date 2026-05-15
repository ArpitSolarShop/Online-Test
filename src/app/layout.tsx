import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hiring Assessment — Listening & Communication Competency",
  description:
    "Online psychometric hiring assessment tool for evaluating listening attitude and communication competency styles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("antialiased", inter.variable)}>
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
