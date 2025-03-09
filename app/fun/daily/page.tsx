import DailyCoinsPage from "@/components/DailyCoinsPage";
import SpecialEffectsWrapper from "@/components/SpecialEffectsWrapper";
import { authOptions } from "@/types/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function DailyCoins() {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/account/login?callbackUrl=/fun/daily");
    }

    return (
        <SpecialEffectsWrapper>
        <DailyCoinsPage session={session} />
        </SpecialEffectsWrapper>
    );
}