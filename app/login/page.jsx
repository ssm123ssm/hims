"use client"
import React from "react";
import Login_component from "@/app/components/Login";
import { SessionProvider } from "next-auth/react";

const Login = ({props: session}) => {
  return (
    <SessionProvider session={session}><div className="justify-center items-center grid grid-cols-1 md:grid-cols-3">
    <div className="col-span-1 md:col-span-3">
      <Login_component />
    </div>
  </div></SessionProvider>
    
  );
};

export default Login;
