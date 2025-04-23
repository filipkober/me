"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { Card, getBlackJackValues, getRandomCard } from "../cards";

export const newBlackJackGame = async (userId: string, bet: number): Promise<Prisma.BlackJackGameGetPayload<object> | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            blackJackGame: true,
        }
    });
    if (!user) return null;
    if (user.coins < bet || bet <= 0 || !Number.isInteger(bet)) return null;

    if(user.blackJackGame && user.blackJackGame.status !== "over") return user.blackJackGame;

    const playerCards = [getRandomCard()]
    const dealerCards = [getRandomCard()]
    playerCards.push(getRandomCard([...playerCards, ...dealerCards]));

    const game = await prisma.blackJackGame.create({
        data: {
            userId,
            bet,
            cards: playerCards,
            dealerCards: dealerCards,
            actions: [],
            dealerActions: [],
            result: 0,            
        }
    });

    await prisma.user.update({
        where: { id: user.id },
        data: { coins: user.coins - bet }
    });

    return game;
}

export const playBlackJackGame = async (userId: string, action: "hit" | "stand"): Promise<Prisma.BlackJackGameGetPayload<object> | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            blackJackGame: true,
        }
    });
    if (!user || !user.blackJackGame) return null;

    let game = user.blackJackGame;
    

    if (action === "hit") {
        const usedCards = [...game.cards, ...game.dealerCards] as Card[];
        const playerCards = [...game.cards, getRandomCard(usedCards)];
        const playerValue = getBlackJackValues(playerCards as Card[]);

        if(playerValue > 21) {
            game = await prisma.blackJackGame.update({
                where: { id: game.id },
                data: {
                    actions: [...game.actions, action],
                    cards: playerCards,
                    result: -game.bet,
                    status: "over"
                }
            });
        }
        else if (playerValue === 21) {
            game = await prisma.blackJackGame.update({
                where: { id: game.id },
                data: {
                    actions: [...game.actions, action],
                    cards: playerCards,
                    result: game.bet * 2,
                    status: "over"
                }
            });
        }
        else {
            game = await prisma.blackJackGame.update({
                where: { id: game.id },
                data: {
                    actions: [...game.actions, action],
                    cards: playerCards,
                }
            });
        }
    } else if (action === "stand") {
        const playerValue = getBlackJackValues(game.cards as Card[]);
        let dealerValue = getBlackJackValues(game.dealerCards as Card[]);
        const dealerCards = [...game.dealerCards];
        const dealerActions = [...game.dealerActions];

        while(dealerValue < 17) {
            const usedCards = [...game.cards, ...dealerCards] as Card[];
            dealerCards.push(getRandomCard(usedCards));
            dealerActions.push("hit");
            dealerValue = getBlackJackValues(dealerCards as Card[]);
        }

        if (dealerValue > 21 || playerValue > dealerValue) {
            game = await prisma.blackJackGame.update({
                where: { id: game.id },
                data: {
                    actions: [...game.actions, action],
                    dealerActions: [...game.dealerActions, "bust"],
                    dealerCards,
                    result: game.bet * 2,
                    status: "over"
                }
            });
        }
        else if (playerValue < dealerValue) {
            game = await prisma.blackJackGame.update({
                where: { id: game.id },
                data: {
                    actions: [...game.actions, action],
                    dealerActions: [...game.dealerActions, "stand"],
                    dealerCards,
                    result: -game.bet,
                    status: "over"
                }
            });
        }
        else {
            game = await prisma.blackJackGame.update({
                where: { id: game.id },
                data: {
                    actions: [...game.actions, action],
                    dealerActions: [...game.dealerActions, "tie"],
                    dealerCards,
                    result: game.bet * 1,
                    status: "over"
                }
            });
        }
    }

    return game;
}