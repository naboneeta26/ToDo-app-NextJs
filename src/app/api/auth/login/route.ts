import { setAuthCookie } from "@/src/lib/cookies";
import { comparePassword } from "@/src/lib/hash";
import { generateToken } from "@/src/lib/jwt";
import { prisma } from "@/src/lib/prisma";
import { loginValidation } from "@/src/validators/authValidation";
import { NextResponse } from "next/server";

//login user
export async function POST(req: Request) {
    try {
        const body = await req.json();

        //validate input
        const parsed = loginValidation.safeParse(body);

        if(!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
        }

        const{ email, password } = parsed.data;

        //Finding user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(!user) {
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
        }

        //comparing password
        const isPasswordValid = await comparePassword(password, user.password);

        if(!isPasswordValid) {
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401});
        }

        //generate token
        const token = generateToken({ userId: user.id });

        //set cookie
        return setAuthCookie(token);

        // return NextResponse.json({ message: "Login successful" }, { status: 200 });     
    }
    catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}