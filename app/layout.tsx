import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Sidebar from "@/components/Sidebar";   // 👈 import sidebar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Audit dashboard",
  description: "View and filter audit logs in real-time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            {/* Sidebar Left */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
              {children}
            </main>
          </div>

          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
