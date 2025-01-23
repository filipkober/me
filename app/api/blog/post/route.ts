import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const blogPostSchema = z.object({
    title: z.string(),
    content: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional()
});

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions)

    if(!session?.user?.admin){
        NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const { error, data } = blogPostSchema.safeParse(req.body);
    if (error || !data) {
        return NextResponse.json({ error: "Invalid data", errorData: error }, { status: 400 });
    }

    const newPost = await prisma.post.create({
        data: {
            title: data.title,
            content: data.content,
            image: data.image,
            tagIDs: data.tags,
            authorId: session!.user.userId!,
        }
    });

    return NextResponse.json(newPost, { status: 201 });
}