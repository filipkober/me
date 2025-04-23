import BlackJackGame from "@/components/BlackJackGamePage";
import SpecialEffectsWrapper from "@/components/SpecialEffectsWrapper";
import { authOptions } from "@/types/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function BlackJackPage() {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/account/login?callbackUrl=/fun/gambling/blackjack");
    }
    
    return (
        <SpecialEffectsWrapper>
            <BlackJackGame session={session} />
        </SpecialEffectsWrapper>
    );
}