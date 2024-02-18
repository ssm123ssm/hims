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

      <div className="grid grid-cols-6 lg:grid-cols-8 max-h-lvh overflow-hidden">
        <div className="hidden lg:block lg:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-6 justify-center lg:ml-10 overflow-auto flex">
          <Suspense fallback={<Loading />} className="justify-around">
            <div className="flex h-screen overflow-auto w-full justify-around pb-[100px]">
              <Dashboard />{" "}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default dashboard;
