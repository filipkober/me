import ImageCarousel from "@/components/ImageCarousel";
import nigditcommunity from "@/public/nigditcommunity.png";
import nigdithome from "@/public/nigdithome.png";
import nigditpost from "@/public/nigditpost.png";
import nigditstrapi from "@/public/nigditstrapi.png";
import typeScriptLogo from "@/public/typescript.svg";
import nextLogo from "@/public/nextdotjs.svg";
import strapiLogo from "@/public/strapi.svg";
import postgresLogo from "@/public/postgresql.svg";
import github from "@/public/github.svg";
import { ImageType } from "@/types/Image";
import Image from "next/image";
import Link from "next/link";

export default function NigditPage() {

    const images: ImageType[] = [
        {
            src: nigditcommunity,
            width: 1920,
            height: 1080,
            alt: "Nigdit community page"
        },
        {
            src: nigdithome,
            width: 1920,
            height: 1080,
            alt: "Nigdit home page"
        },
        {
            src: nigditpost,
            width: 1920,
            height: 1080,
            alt: "Nigdit post page"
        },
        {
            src: nigditstrapi,
            width: 1920,
            height: 1080,
            alt: "Nigdit Strapi backend"
        }
    ]

    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <div className="w-full py-10 flex flex-col items-center gap-2 bg-gradient-to-r from-black to-gray-950">
                <h1 className="text-5xl font-bold text-gray-100">Nigdit</h1>
                <p className="text-xl text-gray-300">A social media platform</p>
            </div>
            
            <div className="flex flex-col items-center gap-8 p-8 max-w-[80vw] md:max-w-[60vw] lg:max-w-[40vw] bg-gray-950 rounded-lg shadow-md border border-gray-700">
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">About this project</h2>
                    <p className="text-gray-300 mb-4">
                        I made this project with two other friends, and had some non-coding help from one more friend.
                        I was the main developer for the project, not only writing the code, but also managing the project and the team.
                    </p>
                    <p className="text-gray-300 mb-4">
                        Nigdit is a social media platform, where each user can create a group and post in it.
                        It has a whole system of moderating content, so that the users can report posts and groups, and the moderators can take action.
                        Posts can include text, images, gifs and videos.
                    </p>
                    <p className="text-gray-300">
                        Users can comment on posts, and make replies to comments.
                        They can also vote on the content. They can be moderators in different groups and help manage the content.
                    </p>
                </section>
                
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Images</h2>
                    <ImageCarousel images={images} className="w-[90%] mx-auto" />
                </section>

                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Code</h2>
                    <p className="text-gray-300 mb-4">
                        The code for this project is split into two repositories:
                    </p>
                    <ul className="space-y-2">
                        <li>
                            <Link href="https://github.com/filipkober/nigdit-dashboard" target="_blank" 
                                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group">
                                <span className="group-hover:underline">Dashboard (Frontend)</span>
                                <Image src={github} alt="GitHub" className="w-5 h-5" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://github.com/filipkober/nigdit-strapi" target="_blank" 
                                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group">
                                <span className="group-hover:underline">Strapi (Backend)</span>
                                <Image src={github} alt="GitHub" className="w-5 h-5" />
                            </Link>
                        </li>
                    </ul>
                </section>

                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Hosting</h2>
                    <p className="text-gray-300">
                        The entirety of the project is hosted on the cloud by me.
                        I used an Oracle VPS to host the backend, the frontend and the database.
                        The domain, DNS and SSL certificates were all set up by me, using Cloudflare and ngnix.
                    </p>
                </section>

                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Technologies</h2>
                    <div className="bg-gray-750 bg-opacity-50 p-4 rounded-md border border-gray-700">
                        <div className="mb-4">
                            <div className="flex items-center gap-3 text-gray-200 font-bold text-lg mb-2">
                                <Image src={typeScriptLogo} alt="TypeScript logo" width={18} height={18}/>
                                <span>TypeScript</span>
                            </div>
                            <p className="text-gray-300 pl-7">
                                Used both in the frontend and the backend.
                            </p>
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex items-center gap-3 text-gray-200 font-bold text-lg mb-2">
                                <Image src={nextLogo} alt="Next.js logo" width={18} height={18}/>
                                <span>Next.js</span>
                            </div>
                            <p className="text-gray-300 pl-7">
                                Used mainly for frontend (with the exception of a Google login), using the pages router.
                            </p>
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex items-center gap-3 text-gray-200 font-bold text-lg mb-2">
                                <Image src={strapiLogo} alt="Strapi logo" width={18} height={18}/>
                                <span>Strapi</span>
                            </div>
                            <p className="text-gray-300 pl-7">
                                Used for the backend, as a headless CMS. There&apos;s a bunch of custom endpoints and services, pretty much all of the backend is custom.
                            </p>
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-3 text-gray-200 font-bold text-lg mb-2">
                                <Image src={postgresLogo} alt="PostgreSQL logo" width={18} height={18}/>
                                <span>PostgreSQL</span>
                            </div>
                            <p className="text-gray-300 pl-7">
                                Used as the database for Strapi. This project has a lot of relations, so a relational database was the best choice.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}