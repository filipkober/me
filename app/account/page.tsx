import { authOptions } from "@/types/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await getServerSession(authOptions);

    if(!session) return redirect("/");

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl">Your account</h1>
            <p>Username: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
        </div>
    );
}