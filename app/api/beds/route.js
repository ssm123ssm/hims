// admission.js (server component)
import { NextResponse } from "next/server";
import { getItems } from "../../utils/db";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  const beds = await getItems("beds");
  console.log(beds);
  return NextResponse.json(beds, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
