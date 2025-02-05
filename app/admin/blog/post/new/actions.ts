"use server";

import { getServerSession } from "next-auth/next";
import { PostType, prismaPostToPostType, prismaPostToSmallPostType, SmallPostType } from "@/types/Post";
import { prisma } from "@/util/prisma";
import { authOptions } from "@/types/authOptions";
import { uploadImage } from "@/app/actions";

interface CreateBlogPostParams {
  title: string;
  description: string;
  content: string;
  tags: string[];
  image: Blob;
}

export const createBlogPost = async ({
  title,
  description,
  content,
  tags,
  image,
}: CreateBlogPostParams) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.admin) {
    return { error: "Unauthorized", tag: null };
  }

    const imageUrl = await uploadImage({
        image,
        title: title + " thumbnail",
        description: description + " thumbnail",
    });

    const newPost = await prisma.post.create({
        data: {
            title,
            description,
            content,
            image: imageUrl,
            tagIDs: tags,
            authorId: session.user.userId!,
            date: new Date(),
        },
    });

    return { error: null, post: newPost };
};

interface GetPostsParams {
    search?: string;
    tags?: string[];
    page?: number;
}

export const getPosts = async ({ search, tags }: GetPostsParams = {}): Promise<SmallPostType[]> => {

    const posts = await prisma.post.findMany({
        where: {
            OR: search ? [
                {
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ] : undefined,
            tagIDs: tags ? {
                hasEvery: tags
            } : undefined,
        },
        include: {
            tags: true,
        },
        // TODO: Implement pagination
        // skip: (page - 1) * 10,
        // take: 10,
        orderBy: {
            date: "desc",
        },
        omit: {
            content: true,
        }
    });
    
    return posts.map(prismaPostToSmallPostType);
};

export const getPost = async (id: string): Promise<PostType> => {
    const post = await prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            tags: true,
        },
    });

    if (!post) {
        throw new Error("not found");
    }

    return prismaPostToPostType(post);
};