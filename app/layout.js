import { Inter } from "next/font/google";
import "./globals.css";
import { Copyright } from "lucide-react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Header from "../components/Header";
import { ThemeProvider } from "../components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "coach-ai",
  description: "AI Powered Career Coach",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className}`}
        >
          <ThemeProvider

            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            <main className="w-full min-h-screen">
              {children}
            </main>
            <Toaster richColors />
            {/* footer */}
            <footer className="bg-muted/50 py-10">
              <div className="flex justify-center gap-2">
                <Copyright />
                <p className="text-gray-200">
                  All rights Reserved
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
