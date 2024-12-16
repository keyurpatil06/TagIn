import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const fontSans = Nunito({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: "TagIn",
  description: "Effortless event registration with personalized tickets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
