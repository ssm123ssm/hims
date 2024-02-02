import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPenToSquare,
  faFileLines,
  faHouse,
  faSearch,
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";

const Trend = ({ props: { data, good } }) => {
  const up =
    good === "high" ? "text-green-500 mx-2 mt-1" : "text-red-500 mx-2 mt-1";
  const down =
    good === "high" ? "text-red-500 mx-2 mt-1" : "text-green-500 mx-2 mt-1";
  return (
    <>
      {data.length > 1 && data.slice(-1)[0] > data.slice(-2)[0] ? (
        <FontAwesomeIcon icon={faArrowTrendUp} size="xs" className={up} />
      ) : data.length > 1 && data.slice(-1)[0] < data.slice(-2)[0] ? (
        <FontAwesomeIcon icon={faArrowTrendDown} size="xs" className={down} />
      ) : (
        <></>
      )}{" "}
    </>
  );
};

export default Trend;
