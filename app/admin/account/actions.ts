"use server";

import { uploadImage } from "@/app/actions";
import { authOptions } from "@/types/authOptions";
import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth/next";

type CreateAchievementPayload = {
    name: string;
    description: string;
    image: Blob;
    isPublic: boolean;
    uniqueTag?: string;
}

export const createAchievement = async ({name, description, image, isPublic, uniqueTag}: CreateAchievementPayload) => {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.admin) return null;

    try {
        const uploadedImage = await uploadImage({
            image,
            title: name,
            description
        });
        if (!uploadedImage.data.link) return null

        const achievement = await prisma.achievement.create({
            data: {
                name,
                description,
                image: uploadedImage.data.link,
                public: isPublic,
                unique_tag: uniqueTag
            }
        });
        return achievement;
    } catch (error) {
        console.error("Error creating achievement:", error);
        return null;
    }
};