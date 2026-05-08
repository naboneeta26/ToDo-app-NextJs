import { clearAuthCookie } from "@/src/lib/cookies";
import { NextResponse } from "next/server";

//logout
export async function POST() {
    const res = NextResponse.json({ message: "Logged out Successfully!" });
    clearAuthCookie(res)
    return res;
}
