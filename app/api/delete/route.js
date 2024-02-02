// admission.js (server component)
import { NextResponse } from "next/server";
import Bed from "@/app/(models)/bed";
import { deleteItem } from "@/app/utils/db";

export async function POST(req) {
  try {
    // Get the form data
    const data = await req.json();
    const id = data.id;
    await deleteItem(id);
    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error) {
    return NextResponse.error({ message: error.message });
  }
}
