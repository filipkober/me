"use client";

import DailyCoinsButton from "./DailyCoinsButton";
import { Session } from "next-auth";
import { useState } from "react";

export default function DailyCoinsPage({
  session,
}: {
  session: Session | null;
}) {
  const [coins, setCoins] = useState<number>(session?.user.coins || 0);

  return (
    <div>
      <div className="flex flex-col items-center h-screen p-4 gap-4">
        <h1 className="text-5xl font-bold">Daily Coins</h1>
        <p className="text-2xl">you have {coins} coins :)</p>
        <DailyCoinsButton lastClaimed={session?.user.lastDaily || new Date()} setCoins={setCoins}/>
      </div>
    </div>
  );
}
