<<<<<<< Updated upstream
import "./globals.css"; // ✅ Import Global CSS

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>MARE!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
=======
import type React from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children} {/* Render the children here */}
      </body>
>>>>>>> Stashed changes
    </html>
  );
}
