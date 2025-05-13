import { Analytics } from "@vercel/analytics/react";
import { Varela_Round, Fredoka } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Link from "next/link";
import Logo from "@/components/HeaderLogo";
import { STATE_CODE, WEBSITE_NAME } from "./constant";
import { BreadcrumbFooter } from "@/components/breadcrumbs";

const defaultUrl = process.env.VERCEL_URL
  ? `${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const valera_round = Varela_Round({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
  variable: "--font-valera_round",
});

const fredoka = Fredoka({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fredoka",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={valera_round.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-col justify-stretch items-stretch bg-muted/30">
            <div className="min-h-screen flex-1 w-full flex flex-col items-center">
              <nav className="relative w-full flex justify-center border-b border-b-secondary bg-white dark:bg-black">
                <div className="max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                  <Link href="/" passHref>
                    <Logo />
                  </Link>
                  {/* <div className=" absolute right-6">
                    <ThemeSwitcher />
                  </div> */}
                </div>
              </nav>
              <div className="flex-1 flex justify-center gap-20 w-full">
                {children}
              </div>
              <footer className="w-full flex justify-center p-6 bg-white dark:bg-black">
                <div className="max-w-7xl w-full flex flex-col gap-6">
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                      <Logo />
                      <div className="flex flex-col gap-4 sm:gap-2 justify-center">
                        <div className="md:self-end">
                          <BreadcrumbFooter />
                        </div>
                        <div className="flex flex-row justify-center sm:justify-end gap-4 text-sm md:text-base">
                          <Link href="/about-us">About Us</Link>
                          <Link href="/contact-us">Contact</Link>
                          <Link href="/privacy-policy">Privacy Policy</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary w-full h-[1px]" />
                  <div className="w-full flex items-center justify-center">
                    <p className="text-sm text-center">
                      © 2025 {WEBSITE_NAME}, {STATE_CODE}. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
              <Analytics />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
