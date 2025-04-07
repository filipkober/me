import Link from "next/link";

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center px-4 py-16">
            <div className="max-w-2xl w-full">
                <div className="mb-12 text-center">
                    <h1 className="text-6xl font-bold mb-2 gradient-text">
                        Tools
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700">
                    <h2 className="text-3xl font-semibold mb-6 flex items-center">
                        <span className="mr-2">📌</span> Available Tools
                    </h2>
                    
                    <ul className="space-y-4">
                        <li className="transition-all duration-300 hover:translate-x-2">
                            <Link href="/tools/editor" className="flex items-center text-xl text-blue-400 hover:text-blue-300 group">
                                <span className="w-8 h-8 mr-3 rounded-lg flex items-center justify-center transition-all">
                                    ✏️
                                </span>
                                Rich text editor
                            </Link>
                        </li>
                        <li className="transition-all duration-300 hover:translate-x-2">
                            <Link href="/tools/ciphers" className="flex items-center text-xl text-blue-400 hover:text-blue-300 group">
                                <span className="w-8 h-8 mr-3 rounded-lg flex items-center justify-center transition-all">
                                    🔒
                                </span>
                                Ciphers
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}