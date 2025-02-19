import Link from "next/link";

export default function ToolsPage() {

    return (
        <div className="h-screen flex flex-col items-center">
            <h1 className="mt-4 text-5xl mb-4">
                Tools
            </h1>
            <h2 className="text-4xl">links:</h2>
            <ul className="text-2xl mt-4 list-disc list-outside">
                <li><Link href="/tools/editor" className="text-blue-600 underline">Rich text editor</Link></li>
                <li><Link href="/tools/ciphers" className="text-blue-600 underline">Ciphers</Link></li>
            </ul>
        </div>
    );
}