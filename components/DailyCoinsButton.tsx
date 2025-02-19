"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { claimDailyCoins } from "@/app/fun/daily/actions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import useAchievements from "@/util/hooks/useAchievements";

interface Props {
  lastClaimed: Date;
  drawCoin: (x: number, y: number) => void;
}
export default function DailyCoinsButton({ lastClaimed, drawCoin }: Props) {
  const [now, setNow] = useState(new Date());
  const [disabledClicks, setDisabledClicks] = useState(0);
  const [lastClaimedDate, setLastClaimedDate] = useState(new Date(lastClaimed));

  const { toast } = useToast();
  const { awardAchievement, getAchievements } = useAchievements();

  const diff = now.getTime() - lastClaimedDate.getTime();
  const hoursLeft = Math.floor(24 - diff / 1000 / 60 / 60)
  const minutesLeft = Math.floor(60 - diff / 1000 / 60 % 60)
  const secondsLeft = Math.floor(60 - diff / 1000 % 60)

  const canClaim = diff >= 24 * 60 * 60 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!canClaim) {
      setDisabledClicks(d => d + 1);

      if (disabledClicks == 9) {
        toast({
          title: "Stop!",
          description: "You obviously won't get more coins...",
        })
      }

      if (disabledClicks == 24) {
        toast({
          title: "Seriously?",
          description: "You're really going to keep clicking?",
        })
      }

      if (disabledClicks == 49) {
        const achievements = getAchievements();
        if(achievements.find(a => a.id === "67abad323c61e0a83d625021")) return;
        awardAchievement("67abad323c61e0a83d625021")
      }

      return;
    }

    const response = await claimDailyCoins();
    if (response.success) {
      toast({
        title: "Success",
        description: response.message,
      });
      drawCoin(
        e.clientX,
        e.clientY
      );
    } else {
      toast({
        title: "Error",
        description: response.message,
      });
    }
    setLastClaimedDate(new Date());
  };

  const btnClassName = cn({
    "cursor-not-allowed": !canClaim,
    "text-wrap": true,
  })

  return (
    <Button onClick={onClick} className={btnClassName}>
      {canClaim ? (
        <span className="flex flex-row gap-2">
          Claim your daily coins!{" "}
          <Image
            src="/coin.gif"
            width={22}
            height={22}
            className="my-auto w-[22px] h-[22px]"
            alt="coin icon"
          />
        </span>
      ) : (
        <span className="flex flex-row gap-2">
          Claim your daily coins in {hoursLeft} hours, {minutesLeft} minutes,{" "}
          {secondsLeft} seconds{" "}
          <Image
            src="/coin.gif"
            width={22}
            height={22}
            className="my-auto w-[22px] h-[22px]"
            alt="coin icon"
          />
        </span>
      )}
    </Button>
  );
}
