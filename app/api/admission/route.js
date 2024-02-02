// admission.js (server component)
import { NextResponse } from "next/server";
import Bed from "@/app/(models)/bed";  // Adjust the path based on your project structure

export async function POST(req) {
    try {
        // Get the form data
        const data = await req.json();
        const userData = data.form;
        console.log(userData);

        // Create a new instance of the Bed model and save it to the database
        const newBed = new Bed(userData);
        await newBed.save();

        return NextResponse.json({ message: "Data saved successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.error("Internal Server Error", 500);
    }
}
