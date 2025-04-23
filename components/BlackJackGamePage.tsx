"use client"

import { getGame, newGame, playGame } from "@/app/fun/gambling/blackjack/actions";
import { Prisma } from "@prisma/client"
import { useEffect, useState } from "react"
import BlackJackGame from "./BlackJackGame";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { Input } from "./ui/input";

interface Props {
    session: Session
}

export default function BlackJackGamePage({ session }: Props) {

    const [game, setGame] = useState<Prisma.BlackJackGameGetPayload<object> | null>(null);
    const [coins, setCoins] = useState<number>(session.user.coins!);
    const [bet, setBet] = useState<number>(10);

    useEffect(() => {
        getGame().then(game => setGame(game));
    }, []);

    const handleHit = async () => {
        const game = await playGame("hit");
        setGame(game);
    }
    const handleStand = async () => {
        const game = await playGame("stand");
        setGame(game);
    }

    let winner = "";
    if(game?.status === "over") {
        if(game.dealerActions[game.dealerActions.length - 1] === "tie") {
            winner = "It's a tie!";
        } else if(game.result < 0) {
            winner = "You lose!";
        } else if(game.result > 0) {
            winner = "You win!";
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">  
    <h1 className="text-6xl font-bold mb-4 gradient-text">BlackJack</h1>
    <h2 className="text-2xl font-bold mb-4">Coins: {coins}</h2>
    {game && <div>
        <p>Bet: {game.bet}</p>
        <p>Winner: {winner ? winner : "Game in progress"}</p>
        </div>}
    {game && <BlackJackGame onHit={handleHit} onStand={handleStand} game={game} />}  
    {
        (!game || game?.status === "over") && (
            <div className="mt-4">
                <Input type="number" placeholder="Bet" value={bet} onChange={e => setBet(Number(e.target.value))} id='bet' name='bet' max={coins} min={10}/>
            <Button onClick={async () => {
                const game2 = await newGame(bet);
                if(!game2) return;
                setCoins(c => c - bet);
                setGame(game2);
            }
            }>Start New Game</Button>
            </div>
        )
    }
    </div>
  )
}
