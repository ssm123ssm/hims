"use client";
import React, { Suspense } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Chip, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import {
  faCirclePlus,
  faPenToSquare,
  faFileLines,
  faHouse,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import Scroller from "./Scroller";
import Trend from "./Trend";
import Search from "./Search";

const Dashboard = () => {
  let [beds, setBeds] = useState([]);
  const [bedsLoaded, setBedsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const mapColor = (bedNumber) => {
    let color = "bg-slate-600";
    //parse bed number to int
    let bed = parseInt(bedNumber);
    if (bed < 5) {
      color = "bg-slate-600";
    } else if (bed < 10) {
      color = "bg-red-300";
    } else if (bed < 15) {
      color = "bg-red-600";
    } else if (bed < 18) {
      color = "bg-green-600";
    }
    return color;
  };

  useEffect(() => {
    console.log("Dashboard component mounted");
    fetch("/api/beds", { next: { revalidate: 0 } })
      .then((response) => response.json())
      .then((data) => {
        //add a key 'visible' to all the elemts in the array
        data.forEach((element) => {
          element.visible = true;
        });
        setBeds(data.reverse());
        setBedsLoaded(true);
        console.log(data);
      });
  }, []);

  const router = useRouter();
  const handleDetails = (e, id) => {
    router.push(`/dashboard/${id}`);
  };

  const handleEdit = (e, bed) => {
    console.log(bed);
    console.log("edit");
    router.push(`/edit?id=${bed._id}`);
  };

  const handleSearchChange = (e) => {
    const id = e;
    console.log(id);
    if (e) {
      beds.forEach((element) => {
        element.visible = false;
      });
      let bed = beds.find((bed) => bed._id === id);
      bed.visible = true;
      setBeds((beds) => [...beds]);
    } else {
      beds.forEach((element) => {
        element.visible = true;
      });
      setBeds((beds) => [...beds]);
    }
  };

  const handleIx = (e, id, ix) => {
    const s = e.target;
    const nameAttribute = s.getAttribute("name");
    router.push(`/editix?id=${id}&ix=${nameAttribute}`);
  };

  return (
    <div className="flex ml-10">
      <Scroller />
      {bedsLoaded ? (
        <div className="flex flex-col gap-5 justify-start items-start ">
          <Search props={{ beds, handleSearchChange }} />
          {beds
            .filter((bed) => bed.visible === true)
            .map((bed) => (
              <div className="flex w-[800px] justify-center" key={bed._id}>
                <Card
                  key={bed._id}
                  className="flex w-[1000px] my-5 "
                  shadow="sm"
                >
                  <div className="flex justify-between items-center mr-3 my-2">
                    <div className="flex">
                      <CardHeader>
                        <Avatar
                          name={bed.first_name.slice(-1)[0]?.value}
                          size="sm"
                          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                          className=" hover:text-slate-500 hover:cursor-pointer"
                        />
                      </CardHeader>
                    </div>
                    <span className="text-gray-500 text-xs flex font-extralight">
                      Created at {bed.createdAt}
                    </span>
                  </div>

                  <Divider />
                  <CardBody className="grid grid-cols-5">
                    <div className="flex flex-col gap-5 justify-between">
                      <div className="flex justify-start">
                        <div className="flex fle-col text-slate-500"></div>
                        <div className="flex flex-col">
                          {
                            //only if age is not defined
                            !bed.age[0] && (
                              <span className="text-xs flex text-purple-500">
                                Name
                              </span>
                            )
                          }

                          <span className="text-gray-700 flex max-w-[100px]">
                            {bed.first_name.slice(-1)[0]?.value}
                          </span>
                          {bed.age[0] && (
                            <span className="text-purple-500 text-xs flex">
                              {bed.age.slice(-1)[0]?.value} years old
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-col flex">
                        <span className="text-gray-500 text-xs">
                          BHT number
                        </span>
                        <span className="text-gray-700">
                          {bed.bht_number.slice(-1)[0] &&
                            bed.bht_number.slice(-1)[0]?.value}
                        </span>
                      </div>
                      <div className="flex-col flex">
                        <span className="text-gray-500 text-xs mb-2">
                          Bed number
                        </span>

                        {bed.bed_number.slice(-1)[0]?.value && (
                          <Chip
                            className={`w-[40px] ${mapColor(
                              bed.bed_number.slice(-1)[0]?.value
                            )} text-white`}
                          >
                            {bed.bed_number.slice(-1)[0]?.value}
                          </Chip>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Fever day</span>
                        <span className="text-gray-700">
                          {bed.date_of_fever.slice(-1)[0]?.value}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5 justify-between">
                      <div className="flex justify-start">
                        <div className="flex fle-col text-slate-500"></div>
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-xs flex">
                            NS1 status
                          </span>
                          <span className="text-gray-700 flex">
                            {bed.ns1_status.slice(-1)[0]?.value ===
                            "Positive" ? (
                              <FontAwesomeIcon
                                icon={faCirclePlus}
                                size="xs"
                                className="mr-2 mt-1 text-slate-500"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faCircleMinus}
                                size="xs"
                                className="mr-2 mt-1 text-slate-500"
                              />
                            )}

                            {bed.ns1_status.slice(-1)[0]?.value}
                          </span>
                        </div>
                      </div>
                      <div className="flex-col flex mr-3">
                        <span className="text-gray-500 text-xs">
                          Leaking finishes on
                        </span>
                        <span className="text-gray-700 text-sm my-1">
                          {
                            // format (bed.date_of_leak_over.slice(-1)[0]?.value) to readable date
                            new Date(
                              bed.date_of_leak_over.slice(-1)[0]?.value
                            ).toLocaleString()
                          }
                        </span>
                        {
                          //if the leaking is not over
                          bed.date_of_leak_over.slice(-1)[0]?.value &&
                          new Date(bed.date_of_leak_over.slice(-1)[0]?.value) >
                            new Date() ? (
                            <>
                              {bed.date_of_leak_over.slice(-1)[0]?.value ? (
                                //Calculating how many hours and minutes left for the leaking finishes
                                <span className="text-gray-500 text-xs">
                                  {Math.floor(
                                    (new Date(
                                      bed.date_of_leak_over.slice(-1)[0]?.value
                                    ) -
                                      new Date()) /
                                      3600000
                                  )}{" "}
                                  hours and{" "}
                                  {Math.floor(
                                    ((new Date(
                                      bed.date_of_leak_over.slice(-1)[0]?.value
                                    ) -
                                      new Date()) /
                                      60000) %
                                      60
                                  )}{" "}
                                  minutes left
                                </span>
                              ) : (
                                <> </>
                              )}{" "}
                            </>
                          ) : (
                            <Chip variant="dot" color="success" size="sm">
                              Leaking over
                            </Chip>
                          )
                        }
                      </div>
                      <div className="flex-col flex">
                        <span className="text-gray-500 text-xs">VOTS</span>
                        {bed.vots.slice(-1)[0]?.value && (
                          <span className="text-gray-700">
                            {bed.vots.slice(-1)[0]?.value}%
                          </span>
                        )}
                        <span
                          className="text-gray-500 text-xs flex hover:cursor-pointer"
                          name="vots"
                          onClick={(e) => handleIx(e, bed._id)}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5 justify-between">
                      <div className="flex justify-start">
                        <div className="flex fle-col text-slate-500"></div>
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-xs flex">
                            Platelets
                          </span>
                          <div className="flex justify-between">
                            <span className="text-gray-700 flex">
                              {bed.plt.slice(-1)[0]?.value}
                            </span>
                            <Trend props={{ data: bed.plt, good: "high" }} />
                            <span
                              className="text-gray-500 text-xs flex hover:cursor-pointer"
                              name="plt"
                              onClick={(e) => handleIx(e, bed._id)}
                            >
                              +
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-col flex">
                        <span className="text-gray-500 text-xs">CRP</span>
                        <div className="flex flex-r">
                          <span className="text-gray-700">
                            {bed.crp.slice(-1)[0]?.value}
                          </span>
                          <Trend props={{ data: bed.crp, good: "low" }} />
                          <span
                            className="text-gray-500 text-xs flex hover:cursor-pointer"
                            name="crp"
                            onClick={(e) => handleIx(e, bed._id)}
                          >
                            {" "}
                            +
                          </span>
                        </div>
                      </div>
                      <div className="flex-col flex">
                        <span className="text-gray-500 text-xs">
                          Serum creatinine
                        </span>
                        <div className="flex flex-r">
                          <span className="text-gray-700">
                            {bed.scr.slice(-1)[0]?.value}
                          </span>
                          <Trend props={{ data: bed.scr, good: "low" }} />
                          <span
                            className="text-gray-500 text-xs flex hover:cursor-pointer"
                            name="scr"
                            onClick={(e) => handleIx(e, bed._id)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="flex-col flex">
                        <span className="text-gray-500 text-xs">WBC</span>
                        <div className="flex flex-r">
                          <span className="text-gray-700">
                            {bed.wbc.slice(-1)[0]?.value}
                          </span>
                          <Trend props={{ data: bed.wbc, good: "high" }} />
                          <span
                            className="text-gray-500 text-xs flex hover:cursor-pointer"
                            name="wbc"
                            onClick={(e) => handleIx(e, bed._id)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5 justify-between">
                      <div className="flex justify-start">
                        <div className="flex fle-col text-slate-500"></div>
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-xs flex">
                            SGOT
                          </span>
                          <div className="flex flex-r">
                            <span className="text-gray-700 flex">
                              {bed.sgot.slice(-1)[0]?.value}
                            </span>
                            <Trend props={{ data: bed.sgot, good: "low" }} />
                            <span
                              className="text-gray-500 text-xs flex hover:cursor-pointer"
                              name="sgot"
                              onClick={(e) => handleIx(e, bed._id)}
                            >
                              +
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-col flex">
                        <span className="text-gray-500 text-xs">SGPT</span>
                        <div className="flex flex-r">
                          <span className="text-gray-700">
                            {bed.sgpt.slice(-1)[0]?.value}
                          </span>
                          <Trend props={{ data: bed.sgpt, good: "low" }} />
                          <span
                            className="text-gray-500 text-xs flex hover:cursor-pointer"
                            name="sgpt"
                            onClick={(e) => handleIx(e, bed._id)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="flex-col flex">
                        <span className="text-gray-500 text-xs">Hb</span>
                        <div className="flex flex-r">
                          <span className="text-gray-700">
                            {bed.hb.slice(-1)[0]?.value}
                          </span>
                          <Trend props={{ data: bed.hb, good: "high" }} />
                          <span
                            className="text-gray-500 text-xs flex hover:cursor-pointer"
                            name="hb"
                            onClick={(e) => handleIx(e, bed._id)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="flex-col flex">
                        <span className="text-gray-500 text-xs">INR</span>
                        <div className="flex flex-r">
                          <span className="text-gray-700">
                            {bed.inr.slice(-1)[0]?.value}
                          </span>
                          <Trend props={{ data: bed.inr, good: "low" }} />

                          <span
                            className="text-gray-500 text-xs flex hover:cursor-pointer"
                            name="inr"
                            onClick={(e) => handleIx(e, bed._id)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex-col flex">
                        <span className="text-gray-500 text-xs">PCV</span>
                        <div className="flex flex-r">
                          <span className="text-gray-700">
                            {bed.pcv.slice(-1)[0]?.value}
                          </span>
                          <Trend props={{ data: bed.pcv, good: "high" }} />

                          <span
                            className="text-gray-500 text-xs flex hover:cursor-pointer"
                            name="pcv"
                            onClick={(e) => handleIx(e, bed._id)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-xs flex">
                            Ultrasound findings
                          </span>
                          <span className="text-gray-700 flex">
                            {bed.ultrasound_findings.slice(-1)[0]?.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  <Divider />
                  <div className="flex justify-between text-slate-400 p-4">
                    <Tooltip content="Full report">
                      <FontAwesomeIcon
                        icon={faFileLines}
                        size="sm"
                        className="mr-2 flex hover:text-slate-500 hover:cursor-pointer"
                      />
                    </Tooltip>

                    <Tooltip content="Details">
                      <FontAwesomeIcon
                        icon={faHouse}
                        size="sm"
                        className="mr-2 flex hover:text-slate-500 hover:cursor-pointer"
                        onClick={(e) => {
                          handleDetails(e, bed._id);
                        }}
                      />
                    </Tooltip>

                    <Tooltip content="Edit">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="sm"
                        className="mr-2 flex hover:text-slate-500 hover:cursor-pointer"
                        onClick={(e) => {
                          handleEdit(e, bed);
                        }}
                      />
                    </Tooltip>
                  </div>
                </Card>
              </div>
            ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Dashboard;
