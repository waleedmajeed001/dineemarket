import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "DineeMarket - Your Fashion Destination",
  description: "Shop the latest trends in men's, women's, and teens' fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Link to Geist Font */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@geist-ui/fonts/index.css" />
      </head>
      <body className="geist-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
