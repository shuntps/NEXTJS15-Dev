import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { extractRouterConfig } from "uploadthing/server";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/app/ReactQueryProvider";
import { fileRouter } from "@/app/api/uploadthing/core";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.APP_NAME || "My App"}`,
    default: process.env.APP_NAME || "My App",
  },
  description: process.env.APP_DESCRIPTION || "My App description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
