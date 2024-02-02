import React, { Suspense } from "react";
import Nav from "../components/Nav";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";

const dashboard = () => {
  return (
    <div className="flex h-screen overflow-auto w-full">
      <Dashboard />
    </div>
  );
};

export default dashboard;
