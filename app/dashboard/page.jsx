"use client";
import React, { Suspense } from "react";
import Nav from "../components/Nav";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import Loading from "@/app/components/Loading";

const dashboard = () => {
  return (
    <>
      <Nav props={{ isVisible: true }} />

      <div className="grid grid-cols-6 lg:grid-cols-8 h-dvh overflow-hidden fixed bg-black">
        <div className="hidden lg:block lg:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-6 justify-center lg:ml-10 overflow-auto flex h-full ">
          <Suspense fallback={<Loading />} className="justify-around">
            <div className="flex h-full overflow-auto w-full justify-around pb-[100px]">
              <Dashboard />{" "}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default dashboard;
