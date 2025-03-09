"use client";

import {
  DoubleOrNothingGame,
  playGame,
} from "@/app/fun/gambling/double-or-nothing/actions";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useSpecialEffectsContext } from "@/util/contexts/SpecialEffectsContext";
import Color from "@/util/Color";
import Vector from "@/util/Vector";
import { randomOffsetVector } from "@/util/randomUtils";

interface Props {
  game: DoubleOrNothingGame;
  setGame: (game: DoubleOrNothingGame | null) => void;
  setCoins: Dispatch<SetStateAction<number>>;
}
export default function DoubleOrNothing({ game, setGame, setCoins }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { shootStar, drawText } = useSpecialEffectsContext();

  const [loading, setLoading] = useState(false);

  const handleHit = async () => {
    setLoading(true);
    const newGame = await playGame("hit");
    setLoading(false);
    if (newGame) {
      setGame(newGame);
      if (newGame.mult > 1) {
        drawText({
          text: `x${newGame.mult}!`,
          coordinates: randomOffsetVector(
            new Vector(btnRef.current!.offsetLeft, btnRef.current!.offsetTop),
            50
          ),
          size: 80,
          color: Color.random(),
          outline: {
            color: Color.random(),
            width: 5,
          },
          lifespan: 200,
          animate: true,
        });
        for (let i = 0; i < 10; i++) {
          shootStar({
            x: btnRef.current!.offsetLeft,
            y: btnRef.current!.offsetTop,
            size: 10,
          });
        }
      } else {
        setGame(null);
      }
    }
  };

  const handleWithdraw = async () => {
    setCoins((c) => c + game.result);
    await playGame("withdraw");
    setGame(null);
  };

  return (
    <div>
      <h1>Double or Nothing</h1>
      <p>Initial Bet: {game.bet}</p>
      <p>Current Result: {game.result}</p>
      <Button ref={btnRef} onClick={handleHit} disabled={loading}>
        Hit
      </Button>
      <Button
        onClick={handleWithdraw}
        disabled={loading}
      >
        Withdraw
      </Button>
    </div>
  );
}
