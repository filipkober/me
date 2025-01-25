import { Prisma } from "@prisma/client";

export type TagType = {
    id: string;
    name: string;
    style?: string;
    styleToggled?: string;
    description?: string;
}

export const prismaTagToTagType = (tag: Prisma.TagGetPayload<object>): TagType => {
    return {
        id: tag.id,
        name: tag.name,
        style: tag.specialStyle || undefined,
        styleToggled: tag.specialStyleToggled || undefined,
        description: tag.description || undefined,
    };
};