import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Navbar } from "@/components/navigation";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap"
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "OpportunityHub | Discover Global Scholarships, Internships & Fellowships",
  description: "Automatically match with official scholarships, fellowships, PhD grants, and internship opportunities worldwide based on your academic credentials.",
  keywords: ["scholarships", "fellowships", "internships", "study abroad", "fully funded scholarships", "academic mobility"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "OpportunityHub | Global Scholarships, Internships & Fellowships",
    description: "Automatically match with verified scholarships, fellowships, PhD grants, and internships based on your profile.",
    url: "https://opportunityhub.netlify.app",
    siteName: "OpportunityHub",
    type: "website"
  }
};

import { ToastProvider } from "@/components/ui/toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <ToastProvider />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
