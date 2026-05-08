import { hashPassword } from "@/src/lib/hash";
import { prisma } from "@/src/lib/prisma";
import { registerValidation } from "@/src/validators/authValidation";
import { NextResponse } from "next/server";

//register new user
export async function POST(req: Request) {
    try{
        const body = await req.json();

        //validate input
        const parsed = registerValidation.safeParse(body);

        if(!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, password } = parsed.data;

        //existing user check
        const existingUser = await prisma.user.findUnique({ 
            where: { email }
        });

        if(existingUser) {
            return NextResponse.json({ message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);

        //create new user
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        return NextResponse.json({ message: "User Registered Successfully!" }, { status: 201 });
    }
    catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}