import DailyCoinsPage from "@/components/DailyCoinsPage";
import { authOptions } from "@/types/authOptions";
import { getServerSession } from "next-auth/next";

export default async function DailyCoins() {

    const session = await getServerSession(authOptions);

    return (
        <DailyCoinsPage session={session} />
    );
}