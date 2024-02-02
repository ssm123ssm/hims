"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"; // Corrected import
import Scroller from "@/app/components/Scroller";
import { Input, Button } from "@nextui-org/react";
import Line_chart from "@/app/components/Line_chart"; // Corrected import
import Loading from "@/app/components/Loading";
import { parse } from "postcss";

const Page = () => {
  const ix = useSearchParams().get("ix");
  console.log("ix:", ix);
  const id = useSearchParams().get("id");
  const [bedLoaded, setBedLoaded] = useState(false);
  const [bedData, setBedData] = useState(null);
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        label: ix,
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const [lineReady, setLineReady] = useState(false);
  const [newIx, setNewIx] = useState("");
  const [submitting, setSubmitting] = useState(false); // Renamed to submitting
  const router = useRouter();

  useEffect(() => {
    const fetchBedData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await fetch("/api/beds/bed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const data = await response.json();
        console.log("data:", data[0][ix]);
        setBedData(data[0]);
        setLineData({
          labels: data[0][ix].map((item, index) => index),
          datasets: [
            {
              label: ix,
              data: data[0][ix],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
        setLineReady(true);
        setBedLoaded(true);
      } catch (error) {
        console.error("Error fetching bed data:", error);
      }
    };

    fetchBedData();
  }, [id, ix]);

  const handleProcess = async () => {
    setSubmitting(true);
    const newBedData = {
      ...bedData,
      [ix]: [...bedData[ix], parseFloat(newIx)],
    };

    try {
      const res = await fetch("/api/edit", {
        method: "POST",
        body: JSON.stringify({ form: newBedData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setBedData(newBedData);
        setLineData({
          labels: newBedData[ix].map((item, index) => index),
          datasets: [
            {
              label: "Plt Edits",
              data: newBedData[ix],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error processing:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setNewIx(e.target.value);
    console.log("newIx:", newIx);
  };

  return (
    <div className="w-1/2">
      <Scroller />

      {!lineReady ? (
        <Loading />
      ) : (
        <>
          <h2>{ix}</h2>
          <Line_chart data={lineData} />
          <Input
            className="my-5"
            name="newix"
            label="Enter new investigation value"
            onChange={(e) => handleChange(e)}
          />
          <Button
            onClick={handleProcess}
            disabled={submitting}
            className="w-[300px]"
          >
            {submitting ? "Please wait..." : "Process"}
          </Button>
        </>
      )}
    </div>
  );
};

export default Page;
