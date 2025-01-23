"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TagType } from "@/types/Tag";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function fetchTags() {

    const tags = await prisma.tag.findMany();
    return tags.map(tag => {
        return {
            name: tag.name,
            id: tag.id,
            style: tag.specialStyle || undefined,
            styleToggled: tag.specialStyleToggled || undefined,
            description: tag.description || undefined,
        }
    });
}

export async function createTag(tag: Omit<TagType, "id">) {
    const session = await getServerSession(authOptions)

    if(!session?.user?.admin){
        return {error: "Unauthorized", tag: null};
    }

    const newTag = await prisma.tag.create({
        data: {
            name: tag.name,
            specialStyle: tag.style,
            specialStyleToggled: tag.styleToggled,
            description: tag.description,
        }
    });

    return {error: null, tag: newTag};
}