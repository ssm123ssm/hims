// admission.js (server component)
import { NextResponse } from "next/server";
import {getItems} from '../../utils/db'

export async function GET(req) {
    const beds = await getItems('beds')
    console.log(beds)
    return NextResponse.json(beds);
}
