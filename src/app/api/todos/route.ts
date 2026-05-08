import { getCookieName } from "@/src/lib/cookies";
import { verifyToken } from "@/src/lib/jwt";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// type TokenPayLoad = {
//     userId: number
// };

//get all todo list
export async function GET() {
    try{
        const token = (await cookies()).get(getCookieName())?.value;

        if(!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = verifyToken(token) as TokenPayLoad;

        const todos = await prisma.todo.findMany({
            where: { userId: decoded.userId },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(todos);

    } catch {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

//post a new todo task
export async function POST(req: Request) {
    try {
        const token = (await cookies()).get(getCookieName())?.value;

        if(!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = verifyToken(token) as TokenPayLoad;

        const { title }  = await req.json();

        if(!title) {
            return NextResponse.json({ error: "Title required" }, { status: 400 });
        }

        const todo = await prisma.todo.create({
            data: {
                title,
                completed: false,
                userId: decoded.userId
            }
        });
        
        return NextResponse.json(todo);

    } catch (error){
        console.log(error);
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
    }
}