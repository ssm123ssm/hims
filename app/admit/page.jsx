import React from "react";
import Nav from "../components/Nav";
import Admission_card from "../components/Admission_card";

const page = () => {
  return (
    <>
      <div className="h-3/4 overflow-auto w-full justify-center flex">
        <Admission_card />{" "}
      </div>
    </>
  );
};

export default page;
