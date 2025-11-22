import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Access VBA Studio",
  description: "Design and generate Microsoft Access VBA solutions with a modern web-based toolkit."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-10 pt-8 sm:px-10">
          {children}
        </div>
      </body>
    </html>
  );
}
