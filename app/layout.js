import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Loading from "./components/Loading";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = {
  title: "Dengue",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="light">
        <div>
          <Nav />

          <div className="grid grid-cols-6 lg:grid-cols-8 max-h-lvh overflow-hidden">
            <div className="hidden lg:block lg:col-span-2">
              <Sidebar />
            </div>
            <div className="col-span-6 justify-center lg:ml-10 overflow-auto flex">
              <Suspense fallback={<Loading />} className="justify-around">
                {children}
              </Suspense>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
