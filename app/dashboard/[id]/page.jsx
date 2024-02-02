import React, { Suspense } from "react";
import { getItem } from "@/app/utils/db";

import DischargeCard from "@/app/components/DischargeCard";
import Report from "@/app/components/Report";
import Scroller from "@/app/components/Scroller";

const page = async ({ params }) => {
  const { id } = params;
  const bed = await getItem(id);
  const data = bed[0];

  return (
    <>
      <Scroller />
      <Report props={data} />
    </>
  );
};

export default page;
