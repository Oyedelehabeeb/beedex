import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Beedex",
  description:
    "A secure and open-source platform for managing and collaborating on beekeeping projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />

          <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-hide">
              {children}
            </div>

            <Toaster position="top-right" />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
