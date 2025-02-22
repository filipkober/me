"use server";

import { authOptions } from "@/types/authOptions"
import { prisma } from "@/util/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next"

export const initiateGame = async (bet: number) => {
    const session = await getServerSession(authOptions);
    if(!session) {
        return null;
    }

    const user = await prisma.user.findUnique({where: {id: session.user.userId}, include: {doubleOrNothingGame: true}});
    if(!user || user.coins < bet || bet <= 0 || !Number.isInteger(bet)) {
        return null;
    }

    if(user.doubleOrNothingGame) {

        await prisma.user.update({
            where: {id: user.id},
            data: {coins: user.coins + user.doubleOrNothingGame.result}
        });

        await prisma.doubleOrNothingGame.delete({where: {id: user.doubleOrNothingGame.id}});
    }

    const newGame = await prisma.doubleOrNothingGame.create({
        data: {
            userId: user.id,
            bet,
            result: bet,
            
        }
    });

    await prisma.user.update({
        where: {id: user.id},
        data: {coins: user.coins - bet}
    });
    
    return newGame;

}

export const playGame = async (action: "hit" | "withdraw"): Promise<DoubleOrNothingGame | null> => {
    const session = await getServerSession(authOptions);
    if(!session) {
        return null;
    }

    const user = await prisma.user.findUnique({where: {id: session.user.userId}, include: {doubleOrNothingGame: true}});
    if(!user || !user.doubleOrNothingGame) {
        return null;
    }

    let game;

    if(action === "hit") {
        const doubled = Math.random() < 0.5;
        game = await prisma.doubleOrNothingGame.update({
            where: {id: user.doubleOrNothingGame.id},
            data: {result: doubled ? user.doubleOrNothingGame.result * 2 : 0,
                status: doubled ? "active" : "lost"
            }
        });
    } else {
        const updatedUser = await prisma.user.update({
            where: {id: user.id},
            data: {coins: user.coins + user.doubleOrNothingGame.result},
            include: {doubleOrNothingGame: true}
        });
        game = updatedUser.doubleOrNothingGame;
        await prisma.doubleOrNothingGame.delete({where: {id: user.doubleOrNothingGame.id}});
    }

    return game;
}
export type DoubleOrNothingGame = Exclude<Prisma.UserGetPayload<{
    include: {doubleOrNothingGame: true}
}>["doubleOrNothingGame"], null>;

export const getGame = async (): Promise<DoubleOrNothingGame | null> => {
    const session = await getServerSession(authOptions);
    if(!session) {
        return null;
    }

    const user = await prisma.user.findUnique({where: {id: session.user.userId}, include: {doubleOrNothingGame: true}});
    if(!user || !user.doubleOrNothingGame) {
        return null;
    }

    return user.doubleOrNothingGame;
}