import AddThought from "@/components/AddThought";
import DecorativeTerminal from "@/components/DecorativeTerminal";
import { authOptions } from "@/types/authOptions";
import { getServerSession } from "next-auth/next";
import { getRandomThoughts } from "./actions";

const localeDateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
}

export default async function RandomThoughts({}) {

    const session = await getServerSession(authOptions);

    const thoughts = await getRandomThoughts();
    const thoughtsFormatted = thoughts.map(t => `[${t.date.toLocaleDateString("pl-PL", localeDateOptions)}] ${t.content}`);

    return (
        <div className="flex flex-col p-4 gap-4 items-center justify-center">
            <h1 className="text-4xl font-bold">Random Thoughts</h1>
            <p>Here are some random thoughts:</p>
            <DecorativeTerminal lines={thoughtsFormatted} />
            {session?.user.admin && <AddThought />}
        </div>
    );
}