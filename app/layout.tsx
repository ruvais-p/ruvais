import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruvais P | Portfolio",
  description:
    "Computer Science Engineer — Flutter Developer, AI Enthusiast, Full-Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
