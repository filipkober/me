import Link from "next/link";
import Image from "next/image";
import nigditcommunity from "@/public/nigditcommunity.png";
import how2liftDemo from "@/public/how2liftscreen.png";
import websiteScreenshot from "@/public/thispage.png";

export default function Portfolio() {
    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <div className="w-full py-10 flex flex-col items-center gap-2 bg-gradient-to-r from-black to-gray-950">
                <h1 className="text-5xl font-bold text-gray-100">Portfolio</h1>
                <p className="text-xl text-gray-300">Projects I&apos;ve worked on</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
                {/* This Website Card */}
                <Link href="/portfolio/this" className="group">
                    <div className="h-full border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <Image 
                                src={websiteScreenshot} 
                                alt="This website screenshot" 
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                width={400}
                                height={200}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                <h3 className="text-xl font-bold text-white">This Website</h3>
                            </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                            <p className="text-white mb-auto">My personal website built with Next.js, featuring a blog system and portfolio showcase.</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium">Next.js</span>
                                <span className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium">TypeScript</span>
                                <span className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium">MongoDB</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Nigdit Card */}
                <Link href="/portfolio/nigdit" className="group">
                    <div className="h-full border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <Image 
                                src={nigditcommunity} 
                                alt="Nigdit screenshot" 
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                width={400}
                                height={200}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                <h3 className="text-xl font-bold text-white">Nigdit</h3>
                            </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                            <p className="text-white mb-auto">A social media platform with community features, moderation tools, and rich-media posts.</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium">Next.js</span>
                                <span className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium">TypeScript</span>
                                <span className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium">Strapi</span>
                                <span className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium">PostgreSQL</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* How2Lift Card */}
                <Link href="/portfolio/how2lift" className="group">
                    <div className="h-full border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <Image 
                                src={how2liftDemo} 
                                alt="How2Lift screenshot" 
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                width={400}
                                height={200}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                <h3 className="text-xl font-bold text-white">How2Lift</h3>
                            </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                            <p className="text-white mb-auto">An AI-powered mobile app that helps users learn proper weightlifting techniques.</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium">React Native</span>
                                <span className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium">Spring Boot</span>
                                <span className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium">OpenAI</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}