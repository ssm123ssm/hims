import React from "react";
import { Skeleton } from "@nextui-org/react";
import Scroller from "./Scroller";

const Loading = () => {
  return (
    <div>
      <Scroller />
      <div className="space-y-5 p-4 w-screen sm:w-[600px]">
        <div className="space-y-3">
          <Skeleton style={{ borderRadius: "0.25rem" }} className="w-3/5">
            <div className="h-3 w-3/5 bg-default-200"></div>
          </Skeleton>
          <Skeleton style={{ borderRadius: "0.25rem" }} className="w-4/5">
            <div className="h-3 w-4/5 bg-default-200"></div>
          </Skeleton>
          <Skeleton style={{ borderRadius: "0.25rem" }} className="w-2/5">
            <div className="h-3 w-2/5 bg-default-300"></div>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default Loading;
