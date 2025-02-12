"use client";

import DailyCoinsButton from "./DailyCoinsButton";
import SpecialEffects from "./SpecialEffects";
import { Session } from "next-auth";
import { useSpecialEffects } from "@/util/hooks/useSpecialEffects";

export default function DailyCoinsPage({
  session,
}: {
  session: Session | null;
}) {
  const { canvasRef, drawCoin } = useSpecialEffects();

  const drawCoinInPosition = (x: number, y: number) => {
    drawCoin(x, y, 10);
  }

  return (
    <div>
      <div className="flex flex-col items-center h-screen p-4 gap-4">
        <h1 className="text-5xl font-bold">Daily Coins</h1>
        <p className="text-2xl">you have {session?.user.coins} coins :)</p>
        <DailyCoinsButton lastClaimed={session?.user.lastDaily || new Date()} drawCoin={drawCoinInPosition} />
      </div>
      <SpecialEffects canvasRef={canvasRef} />
    </div>
  );
}
