"use client";

import { Button } from "@/components/ui/button";
import useAchievements from "@/util/hooks/useAchievements";

export default function SecretPage() {

    const {awardAchievement, getAchievements} = useAchievements();

    const handleAchievement = () => {
        awardAchievement("secret-page-found");
    };

    const hasAchievement = getAchievements().some((a) => a.unique_tag === "secret-page-found");

    return (
        <div className="flex flex-col pt-4 gap-4 items-center justify-center h-screen">
            <p>Wow you found this secret page!</p>
            <Button onClick={handleAchievement} disabled={hasAchievement}>
                {hasAchievement ? "Achievement Unlocked" : "Click this to get an achievement"}
            </Button>
        </div>
    );
}