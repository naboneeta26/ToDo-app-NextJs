import { getCookieName } from "@/src/lib/cookies";
import { verifyToken } from "@/src/lib/jwt";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// type TokenPayLoad = {
//     userId: number
// };

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get(getCookieName())?.value;

        if(!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = verifyToken(token) as TokenPayLoad;

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true },
        });

        if(!user) {
            return NextResponse.json({ error: "User not found!" }, { status: 404 });
        }
        return NextResponse.json(user);
    }
    catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}