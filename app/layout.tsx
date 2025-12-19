import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VetDrPaw - Cuidado Veterinario Premium",
  description: "Clínica veterinaria de excelencia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full w-full">
      <body className="min-h-screen flex flex-col overflow-x-hidden w-full">

        <Navbar />

        <main
          className="
            flex-1
            overflow-x-hidden
            overflow-y-auto
          "
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
