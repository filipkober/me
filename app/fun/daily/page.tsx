import DailyCoinsPage from "@/components/DailyCoinsPage";
import { authOptions } from "@/types/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function DailyCoins() {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/account/login?callbackUrl=/fun/daily");
    }

    return (
        <DailyCoinsPage session={session} />
    );
}