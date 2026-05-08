import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{id: string}> }) {
    try {
        const { id } = await params;
        const { title, completed } = await req.json();

        const todo = await prisma.todo.update({
            where: { id: Number(id)},
            data: { title, completed }
        });

        return NextResponse.json(todo);
    } catch(error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{id: string}> }) {
    try {
        const{ id } = await params;
        await prisma.todo.delete({
            where: { id: Number(id)}
        });

        return NextResponse.json({ message: "Deleted" });
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}