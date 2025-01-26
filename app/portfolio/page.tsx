import Link from "next/link";

export default function Portfolio() {
    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <h1 className="text-5xl font-bold">Portfolio</h1>
            <p className="text-lg">This is a portfolio page.</p>

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold">Projects</h2>
                <ul className="flex flex-col gap-2 list-disc pl-4">
                    <li className="text-lg"><Link href={'/portfolio/this'} className="text-blue-600 underline">this website</Link></li>
                    <li className="text-lg"><Link href={'/portfolio/nigdit'} className="text-blue-600 underline">nigdit</Link></li>
                    <li className="text-lg"><Link href={'#'} className="text-blue-600 underline cursor-not-allowed">How2Lift (W.I.P.)</Link></li>
                </ul>
            </div>
        </div>
    );
}