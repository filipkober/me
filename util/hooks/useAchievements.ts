import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { awardPublicAchievement, getCurrentUser } from "@/app/account/actions";
import { useToast } from "@/hooks/use-toast";

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
                description: "Failed to award achievement",
                variant: "destructive"
            });
            return;
        }

        const didAward = await awardPublicAchievement(achievementId);
        if (didAward) {
            toast({
                title: "Success",
                description: "Achievement awarded",
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