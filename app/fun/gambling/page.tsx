import Link from "next/link"

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col p-4 gap-4 items-center">
            <h1 className="text-5xl">🎰🎰🎰 Casino 🎰🎰🎰</h1>
            <p className="italic">all the coins are fake money, don&apos;t worry 🙂</p>
            <h2 className="text-4xl mt-16">Available games</h2>
            <Link href="/fun/gambling/double-or-nothing">
            <div className="rounded-xl border-4 border-white grid grid-cols-[1fr_auto_1fr] text-4xl overflow-clip hover:border-blue-300 duration-150">
                <span className="text-center p-4 bg-[linear-gradient(45deg,#166534_25%,#22c55e_25%,#22c55e_50%,#166534_50%,#166534_75%,#22c55e_75%,#22c55e_100%)] bg-[length:20px_20px]">DOUBLE</span>
                <span className="px-2 p-4">or</span>
                <span className="text-left p-4 bg-[linear-gradient(45deg,#b91c1c_25%,#f87171_25%,#f87171_50%,#b91c1c_50%,#b91c1c_75%,#f87171_75%,#f87171_100%)] bg-[length:20px_20px]">NOTHING</span>
            </div>
            </Link>
        </div>
    );
}