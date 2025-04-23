import Link from "next/link"

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col p-4 gap-4 items-center">
            <h1 className="text-5xl">🎰🎰🎰 Casino 🎰🎰🎰</h1>
            <p className="italic">all the coins are fake money, don&apos;t worry 🙂</p>
            <h2 className="text-4xl mt-16">Available games</h2>
            <div className="flex flex-col gap-4 w-full md:w-1/2 lg:w-1/4">
            <Link href="/fun/gambling/double-or-nothing">
            <div className="rounded-xl border-4 border-white grid grid-cols-[1fr_auto_1fr] text-4xl overflow-clip hover:border-blue-300 duration-150">
                <span className="text-center p-4 bg-[linear-gradient(45deg,#166534_25%,#22c55e_25%,#22c55e_50%,#166534_50%,#166534_75%,#22c55e_75%,#22c55e_100%)] bg-[length:20px_20px]">DOUBLE</span>
                <span className="px-2 p-4">or</span>
                <span className="text-center p-4 bg-[linear-gradient(45deg,#b91c1c_25%,#f87171_25%,#f87171_50%,#b91c1c_50%,#b91c1c_75%,#f87171_75%,#f87171_100%)] bg-[length:20px_20px]">NOTHING</span>
            </div>
            </Link>
            <Link href="/fun/gambling/blackjack" className="w-full">
                <div className="rounded-xl border-4 border-white text-4xl overflow-clip hover:border-blue-300 duration-150 bg-green-800 p-2 relative">
                    <div className="flex justify-center items-center gap-2">
                        <div className="bg-white text-black rounded-md h-28 w-20 flex items-center justify-center shadow-lg transform -rotate-12 absolute left-8 top-3 font-bold">A<span className="text-red-600">♥</span></div>
                        <div className="bg-white text-black rounded-md h-28 w-20 flex items-center justify-center shadow-lg absolute left-32 top-3 font-bold">10<span className="text-black">♠</span></div>
                        <span className="ml-auto mr-4 text-yellow-300 font-bold tracking-wider" style={{textShadow: "2px 2px 4px rgba(0,0,0,0.5)"}}>BLACK<br/>JACK</span>
                    </div>
                </div>
            </Link>
            </div>
        </div>
    );
}