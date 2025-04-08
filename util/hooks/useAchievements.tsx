import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { awardPublicAchievement, getCurrentUser } from "@/app/account/actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const useAchievements = () => {
    const [user, setUser] = useState<Prisma.UserGetPayload<{include: {achievements: true}}>>();
    const {toast} = useToast();

    useEffect(() => {
        getCurrentUser({achievements: true}).then((data) => {
            if(data) setUser(data);
        }).catch((error) => {
            console.error("Error retrieving user achievements:", error);
            toast({
                title: "Error",
                description: "Failed to load user achievements",
                variant: "destructive"
            });
        });
    }, [toast]);

    const getAchievements = () => {
        return user?.achievements || [];
    }

    const awardAchievement = async (achievementId: string) => {
        if (!user) {
            toast({
                title: "Error",
                description: "Failed to award achievement, please log in",
                variant: "destructive"
            });
            return;
        }

        const achievement = await awardPublicAchievement(achievementId);
        if (achievement) {
            toast({
                title: "Achievement get!",
                description: <div><p>You have been awarded the {achievement.name} achievement!</p>
                <p>You can see your achievements <Link href="/secrets" className="underline text-blue-600">here</Link>.</p>
                </div>
            });
        } else {
            toast({
                title: "Error",
                description: "Failed to award achievement",
                variant: "destructive"
            });
        }
    };


    return { getAchievements, awardAchievement };
};

export default useAchievements;