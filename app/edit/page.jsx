"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Admission_card_editor from "../components/Admission_card_editor";
import { Skeleton } from "@nextui-org/react";
import Loading from "../components/Loading";
import Scroller from "../components/Scroller";

const Page = () => {
  const [bedLoaded, setBedLoaded] = useState(false);
  const [bedData, setBedData] = useState(null);
  const id = useSearchParams().get("id");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBedData = async () => {
      try {
        //simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("delayed response");
        const response = await fetch("/api/beds/bed", {
          method: "POST", // or "GET" depending on your server-side implementation
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const data = await response.json();
        setBedData(data[0]);
        setBedLoaded(true);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching bed data:", error);
      }
    };

    fetchBedData();
  }, [id]);

  return (
    <div className="h-3/4 overflow-auto w-full justify-center flex">
      <Scroller />
      {!bedLoaded ? (
        <div className="h-[250px]">
          <Loading />
        </div>
      ) : (
        <Admission_card_editor props={bedData} />
      )}
    </div>
  );
};

export default Page;
