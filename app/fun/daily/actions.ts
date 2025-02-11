"use server";

import { authOptions } from "@/types/authOptions";
import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth/next";

export const claimDailyCoins = async () => {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
        throw new Error("User not authenticated");
    }

    const lastDaily = session.user.lastDaily || new Date(0);
    
    const now = new Date();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (now.getTime() - lastDaily.getTime() < twentyFourHours) {
        return {success: false, message: "You have already claimed your daily coins."};
    }

    await prisma.user.update({
        where: { id: session.user.userId },
        data: {
            coins: { increment: 10 },
            lastDaily: new Date(),
        },
    });

    return {success: true, message: "You have claimed your daily coins!"};

};