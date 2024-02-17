import "@/app/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = {
  title: "Dengue | login",
  description: "Please log in",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark bg-black bg-fixed h-lvh">
      <body>{children}</body>
    </html>
  );
}
