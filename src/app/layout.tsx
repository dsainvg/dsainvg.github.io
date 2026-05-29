import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gundubogula Durga Sai | Personal Portfolio",
  description: "Personal portfolio website of Gundubogula Nageswara Venkata Durga Sai, sophomore B.Tech Computer Science student at IIT Kharagpur. Showcasing projects in AI/ML, Web3.0, and Web Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
