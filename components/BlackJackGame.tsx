"use client"

import { Card, cardToImageSrc, getBlackJackValues } from "@/util/cards";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";

interface BlackJackGameProps {
    onHit: () => void;
    onStand: () => void;
    game: Prisma.BlackJackGameGetPayload<object>;
}

export default function BlackJackGame({onHit, onStand, game}: BlackJackGameProps) {

  const dealerParent = useRef(null)
  const playerParent = useRef(null)

  useEffect(() => {
    if (playerParent.current) {
      autoAnimate(playerParent.current, { duration: 300 })
    }
    if (dealerParent.current) {
      autoAnimate(dealerParent.current, { duration: 300 })
    }
  }, [playerParent, dealerParent])

  const [shownDealerCards, setShownDealerCards] = useState<Card[]>(game.dealerCards.slice(0, 1) as Card[]);
  const [gameId, setGameId] = useState<string>(game.id);

  useEffect(() => {
    // Reset animation state if the game ID changes
    if (gameId !== game.id) {
      setShownDealerCards(game.dealerCards.slice(0, 1) as Card[]);
      setGameId(game.id);
      return;
    }

    // Only animate if we have fewer cards shown than actual dealer cards
    if (shownDealerCards.length < game.dealerCards.length) {
      const nextCardIndex = shownDealerCards.length;
      const delay = 300; // 300ms delay between cards
      
      const timer = setTimeout(() => {
        setShownDealerCards(prev => [
          ...prev,
          game.dealerCards[nextCardIndex] as Card
        ]);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [game.dealerCards, shownDealerCards, game.id, gameId]);

  // Calculate scores based on the full dealer hand for game logic
  const playerScore = getBlackJackValues(game.cards as Card[]);

  // Calculate the displayed dealer score based on what's currently shown
  const shownDealerScore = getBlackJackValues(shownDealerCards as Card[]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        {/* dealer's area */}
        <h2 className="text-2xl font-bold">Dealer&apos;s Cards</h2>
        <div className="text-lg font-bold">
          Dealer&apos;s Score: {`${shownDealerScore} ${shownDealerScore === 21 ? "(Blackjack!)" : ""}${shownDealerScore > 21 ? "(Bust!)" : ""}`}
          {game.status === "over" && shownDealerCards.length < game.dealerCards.length && " (Drawing...)"}
        </div>
        <ScrollArea>
          <div className="flex gap-2" ref={dealerParent}>
            {shownDealerCards.map((card, index) => (
              <Image 
                key={`dealer-card-${index}-${card}`} 
                src={cardToImageSrc(card)} 
                alt={card} 
                width={250} 
                height={350} 
                className="transition-all duration-300"
              />
            ))}
            {(game.status !== "over" && shownDealerCards.length < 2) && (
              <Image key="reverse" src={cardToImageSrc("reverse")} alt="reverse" width={250} height={350} />
            )}
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>

      <div>
        {/* player's area */}
        <div>
          {/* player's cards */}
          <h2 className="text-2xl font-bold">Your Cards</h2>
          <div className="text-lg font-bold">Your Score: {`${playerScore} ${playerScore === 21 ? "(Blackjack!)" : ""}${playerScore > 21 ? "(Bust!)" : ""}`}</div>
          <ScrollArea>
            <div className="flex gap-2" ref={playerParent}>
              {game.cards.map((card, index) => (
                <Image key={index} src={cardToImageSrc(card as Card)} alt={card} width={250} height={350} />
              ))}
            </div>
            <ScrollBar orientation="horizontal"/>
          </ScrollArea>
        </div>
        {game.status !== "over" && <div className="flex justify-between mt-4">
          {/* player's actions */}
          <Button onClick={onHit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Hit
          </Button>
          <Button onClick={onStand} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Stand
          </Button>
        </div>}
      </div>
    </div>
  )
}
