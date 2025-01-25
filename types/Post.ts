import { prismaTagToTagType, TagType } from "./Tag";
import { Prisma } from "@prisma/client";

export type PostType = {
    id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    tags: TagType[];
    date: Date;
}

export type SmallPostType = Omit<PostType, "content">;

export const prismaPostToPostType = (post: Prisma.PostGetPayload<{ include: { tags: true; } }>): PostType => {
    return {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        image: post.image,
        tags: post.tags.map(prismaTagToTagType),
        date: post.date,
    };
};

export const prismaPostToSmallPostType = (post: Prisma.PostGetPayload<{ include: { tags: true; }, omit: {content: true} }>): SmallPostType => {
    return {
        id: post.id,
        title: post.title,
        description: post.description,
        image: post.image,
        tags: post.tags.map(prismaTagToTagType),
        date: post.date,
    };
};