"use server"
import { authOptions } from "@/types/authOptions";
import { TagType } from "@/types/Tag";
import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth/next";

export async function getTags() {

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