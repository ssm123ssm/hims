"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Session_data = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/login");
  }
  return <></>;
};

export default Session_data;
