// src/app/layout.jsx

import "./globals.css";

export const metadata = {
  title: "Velvet Café",
  description: "واجهة عربية أنيقة لاستعراض مشروبات وحلويات الكافيه.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}