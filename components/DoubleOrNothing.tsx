"use client";

import {
  DoubleOrNothingGame,
  playGame,
} from "@/app/fun/gambling/double-or-nothing/actions";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface Props {
  game: DoubleOrNothingGame;
  setGame: (game: DoubleOrNothingGame | null) => void;
  setCoins: Dispatch<SetStateAction<number>>;
  shootStar: ({ x, y, size }: { x: number; y: number; size: number }) => void;
}
export default function DoubleOrNothing({
  game,
  setGame,
  setCoins,
  shootStar,
}: Props) {
  const [buttonText, setButtonText] = useState("Withdraw");
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (game.result === 0) {
      let timer = 6;
      const interval = setInterval(() => {
        timer--;
        if (timer === 0) {
          setButtonText("Withdraw");

          clearInterval(interval);

        } else {
          setButtonText(`You lost! Ending in ${timer}...`);
        }
      }, 1000);

      setTimeout(async () => {
        await playGame("withdraw");
        setGame(null);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [game.result, setGame]);

  return (
    <div>
      <h1>Double or Nothing</h1>
      <p>Initial Bet: {game.bet}</p>
      <p>Current Result: {game.result}</p>
      <Button
      ref={btnRef}
        onClick={async () => {
          const newGame = await playGame("hit");
          if (newGame) {
            setGame(newGame);
            if (newGame.result !== 0) {
              for (let i = 0; i < 10; i++) {
                shootStar({ x: btnRef.current!.offsetLeft, y: btnRef.current!.offsetTop, size: 10 });
              }
            }
          }
        }}
      >
        Hit
      </Button>
      <Button
        onClick={async () => {
          setCoins((c) => c + game.result);
          await playGame("withdraw");
          setGame(null);
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
}
