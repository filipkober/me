"use server";

import { authOptions } from "@/types/authOptions";
import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth/next";

export const getRandomThoughts = async () => {
    const thoughts = await prisma.thought.findMany();   
    return thoughts;
};

export const addThought = async (thought: string) => {

    const session = await getServerSession(authOptions);
    if(!session?.user.admin) return null;

    const newThought = await prisma.thought.create({
        data: {
            content: thought
        }
    });
    return newThought;
}