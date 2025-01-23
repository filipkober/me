import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const tagSchema = z.object({
    name: z.string(),
    specialStyle: z.string().optional(),
});

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions)

    if(!session?.user?.admin){
        NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const { error, data } = tagSchema.safeParse(req.body);
    if (error || !data) {
        return NextResponse.json({ error: "Invalid data", errorData: error }, { status: 400 });
    }

    const newTag = await prisma.tag.create({
        data: {
            name: data.name,
            specialStyle: data.specialStyle,
        }
    });

    return NextResponse.json(newTag, { status: 201 });
}

export const GET = async () => {
    const tags = await prisma.tag.findMany();

    return NextResponse.json(tags);
}