
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social App",
  description:
    "A small but beautiful social feed web app built with Next.js and shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {" "}
          {/* Light background */}
          <Navbar />
          <main className="container max-w-2xl mx-auto py-8 px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
