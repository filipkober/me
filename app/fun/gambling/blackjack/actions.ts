"use server";

import { authOptions } from "@/types/authOptions"
import { prisma } from "@/util/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next"
import {playBlackJackGame, newBlackJackGame} from '@/util/games/blackjack'

export const newGame = async (bet: number) => {
    const session = await getServerSession(authOptions);
    if(!session) {
        return null;
    }

    const user = await prisma.user.findUnique({where: {id: session.user.userId}, include: {blackJackGame: true}});
    if(!user || user.coins < bet || bet <= 0 || !Number.isInteger(bet)) {
        return null;
    }

    if(user.blackJackGame) {

        await prisma.user.update({
            where: {id: user.id},
            data: {coins: user.coins + user.blackJackGame.result}
        });

        await prisma.blackJackGame.delete({where: {id: user.blackJackGame.id}});
    }

    const newGame = await newBlackJackGame(user.id, bet);

    return newGame;
}

export const playGame = async (action: "hit" | "stand"): Promise<Prisma.BlackJackGameGetPayload<object> | null> => {
    const session = await getServerSession(authOptions);
    if(!session) {
        return null;
    }

    const user = await prisma.user.findUnique({where: {id: session.user.userId}, include: {blackJackGame: true}});
    if(!user || !user.blackJackGame) {
        return null;
    }

    const game = await playBlackJackGame(user.id, action);

    return game;
}

export const getGame = async () => {
    const session = await getServerSession(authOptions);
    if(!session) {
        return null;
    }

    const user = await prisma.user.findUnique({where: {id: session.user.userId}, include: {blackJackGame: true}});
    if(!user || !user.blackJackGame) {
        return null;
    }

    return user.blackJackGame;
}