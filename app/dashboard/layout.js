import { Inter } from "next/font/google";
import "@/app/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Nav from "@/app/components/Nav";
import Sidebar from "@/app/components/Sidebar";
import Loading from "@/app/components/Loading";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="light">
        <div>{children}</div>
      </body>
    </html>
  );
}
