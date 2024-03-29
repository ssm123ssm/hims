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
  const [userData, setUserData] = useState(null);
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
        setUserData(data[0]);
        //data[0][ix] is an array of objects with {value: value, timestamp: timestamp} format. Create two arrays from this data, one for the values and one for the timestamps.
        const values = data[0][ix].map((item) => item.value);
        const timestamps = data[0][ix].map(
          (
            item //map over the timestamps and convert them to a human readable format
          ) => new Date(item.timestamp).toLocaleString()
        );

        setBedData({ values: values, timestamps: timestamps });
        setLineData({
          labels: timestamps,
          datasets: [
            {
              label: ix,
              data: values,
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
    const currentDate = new Date();
    const ISO = currentDate.toISOString();
    const newBedData = {
      values: [...bedData.values, newIx],
      timestamps: [...bedData.timestamps, new Date(ISO).toLocaleString()],
      _id: id,
    };

    const newUserData = {
      ...userData,
      [ix]: [...userData[ix], { value: newIx, timestamp: Date.now() }],
    };

    setBedData((pr) => newBedData);
    setUserData((pr) => newUserData);
    console.log("userData:", userData);
    try {
      const res = await fetch("/api/edit", {
        method: "POST",
        body: JSON.stringify({ form: newUserData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setLineData({
          //iterate over the timestamps and convert them to a human readable format,
          labels: newBedData.timestamps.map((timestamp) => timestamp),
          datasets: [
            {
              label: ix,
              data: newBedData.values,
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
    <div className="w-full flex justify-start items-start flex-col overflow-auto h-dvh">
      <Scroller />

      {!lineReady ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-start w-full p-8 h-dvh overflow-auto">
          <h2 className="">{ix}</h2>
          <Line_chart data={lineData} className="max-w-10" />

          <Input
            className="my-5"
            name="newix"
            label="Enter new investigation value"
            onChange={(e) => handleChange(e)}
          />
          <Button
            onClick={handleProcess}
            disabled={submitting}
            className="w-[100px] p-[30px] h-[30px]"
          >
            {submitting ? "Please wait..." : "Process"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
