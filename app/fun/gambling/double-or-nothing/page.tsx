import DoubleOrNothingPage from "@/components/DoubleOrNothingPage";
import { authOptions } from "@/types/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function DoubleOrNothing() {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/account/login?callbackUrl=/fun/gambling/double-or-nothing");
    }

    return (
        <DoubleOrNothingPage session={session} />
    );
}