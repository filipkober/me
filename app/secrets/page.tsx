import { authOptions } from "@/types/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await getServerSession(authOptions);

    if(!session) return redirect("/");

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl">Secrets Page</h1>
            <p>Your coins: {session.user.coins}</p>
            <p>Your achievements: {session.user.achievements?.join(", ") || "None"}</p>
        </div>
    );
}