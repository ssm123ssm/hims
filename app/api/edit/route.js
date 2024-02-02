// admission.js (server component)
import { NextResponse } from "next/server";
import Bed from "@/app/(models)/bed";
import { getItem } from "@/app/utils/db";

export async function POST(req) {
  try {
    // Get the form data
    const data = await req.json();
    const userData = data.form;

    let bed = await getItem({ _id: userData._id });

    console.log("from route: bed :", bed, "end route");
    console.log("from route data: ", userData, "end route");

    bed = await Bed.findOneAndUpdate(
      { _id: userData._id },
      { $set: userData },
      { new: true } // This option returns the modified document
    );

    return NextResponse.json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
