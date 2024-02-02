"use client";

import Nav from "@/app/components/Nav";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  //wait for 1 second and redirect to dashboard
  setTimeout(() => {
    router.replace("/dashboard");
  }, 1000);

  return (
    <main className="flex w-full h-full justify-center mt-10">
      <p>Welcome...</p>
    </main>
  );
}
