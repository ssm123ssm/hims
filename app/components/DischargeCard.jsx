import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Avatar,
  Chip,
  Tooltip,
} from "@nextui-org/react";

import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPenToSquare,
  faFileLines,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const DischargeCard = ({ props: data }) => {
  return (
    <div>
      <div>
        Discharging {data.first_name}
        <div className="flex w-[800px] justify-center">
          {data.first_name && (
            <Card key={data._id} className="flex w-[1000px] my-5 " shadow="sm">
              <div className="flex justify-between items-center mr-3 my-2">
                <div className="flex">
                  <CardHeader>
                    <Avatar
                      name={data.first_name.slice(-1)}
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                      className=" hover:text-slate-500 hover:cursor-pointer"
                    />
                  </CardHeader>
                </div>
                <span className="text-gray-500 text-xs flex font-extralight">
                  Created at {String(data.createdAt)}
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
                        !data.age.slice(-1) && (
                          <span className="text-gray-500 text-xs flex">
                            Name
                          </span>
                        )
                      }

                      <span className="text-gray-700 flex">
                        {data.first_name.slice(-1)}
                      </span>
                      {data.age.slice(-1) && (
                        <span className="text-gray-500 text-xs flex">
                          {data.age.slice(-1)} years old
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs">BHT number</span>
                    <span className="text-gray-700">
                      {data.bht_number.slice(-1)}
                    </span>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs mb-2">
                      Bed number
                    </span>

                    {data.bed_number.slice(-1) && (
                      <Chip className={`w-[40px] text-white`}>
                        {data.bed_number.slice(-1)}
                      </Chip>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs">Fever day</span>
                    <span className="text-gray-700">
                      {data.date_of_fever.slice(-1)}
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
                      <span className="text-gray-700 flex h-5">
                        {data.ns1_status.slice(-1) === "Positive" ? (
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

                        {data.ns1_status.slice(-1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs">
                      Leaking finishes on
                    </span>
                    <span className="text-gray-700">
                      {data.date_of_leak_over.slice(-1)}
                    </span>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs">VOTS</span>
                    {data.vots.slice(-1) && (
                      <span className="text-gray-700">
                        {data.vots.slice(-1)}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-5 justify-between">
                  <div className="flex justify-start">
                    <div className="flex fle-col text-slate-500"></div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs flex">
                        Platelets
                      </span>
                      <span className="text-gray-700 flex">
                        {data.plt.slice(-1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs">CRP</span>
                    <span className="text-gray-700">{data.crp.slice(-1)}</span>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs">
                      Serum creatinine
                    </span>
                    <span className="text-gray-700">{data.scr.slice(-1)}</span>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs">WBC</span>
                    <span className="text-gray-700">{data.wbc.slice(-1)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-5 justify-between">
                  <div className="flex justify-start">
                    <div className="flex fle-col text-slate-500"></div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs flex">SGOT</span>
                      <span className="text-gray-700 flex">
                        {data.sgot.slice(-1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs">SGPT</span>
                    <span className="text-gray-700">{data.sgpt.slice(-1)}</span>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs">Hb</span>
                    <span className="text-gray-700">{data.hb.slice(-1)}</span>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs">INR</span>
                    <span className="text-gray-700">{data.inr.slice(-1)}</span>
                  </div>
                  <div className="flex-col flex">
                    <span className="text-gray-500 text-xs">PCV</span>
                    <span className="text-gray-700">{data.pcv.slice(-1)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-5 justify-between justify-items-stretch">
                  <div className="flex justify-start">
                    <div className="flex fle-col text-slate-500"></div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs flex">
                        Ultrasound findings
                      </span>
                      <span className="text-gray-700 flex">
                        {data.ultrasound_findings.slice(-1)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>

              <div className="flex justify-between text-slate-400 p-4"></div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DischargeCard;
