import React, { Suspense } from "react";
import Nav from "../components/Nav";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";

const dashboard = () => {
  return (
    <div className="flex h-screen overflow-auto w-full justify-around pb-[100px]">
      <Dashboard />
    </div>
  );
};

export default dashboard;
