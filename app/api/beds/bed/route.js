import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getItem } from "../../../utils/db";
export const fetchCache = "force-no-store";
export async function POST(req) {
  const data = await req.json();
  const bed = await getItem({ _id: data.id });
  return NextResponse.json(bed);
}
