import ImageCarousel from "@/components/ImageCarousel";
import nigditcommunity from "@/public/nigditcommunity.png";
import nigdithome from "@/public/nigdithome.png";
import nigditpost from "@/public/nigditpost.png";
import nigditstrapi from "@/public/nigditstrapi.png";
import typeScriptLogo from "@/public/typescript.svg";
import nextLogo from "@/public/nextdotjs.svg";
import strapiLogo from "@/public/strapi.svg";
import postgresLogo from "@/public/postgresql.svg";
import { ImageType } from "@/types/Image";
import Image from "next/image";

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
        <div className="w-screen flex flex-col items-center gap-4 p-4">
            <h1 className="text-5xl font-bold">Nigdit</h1>
            <p className="text-lg">A social media platform</p>
            <div className="max-w-xl flex flex-col gap-2">
                <h2 className="text-2xl font-bold">About this project</h2>
                <p>
                    I made this project with two other friends, and had some non-coding help from one more friend.
                    I was the main developer for the project, not only writing the code, but also managing the project and the team. <br />
                    Nigdit is a social media platform, where each user can create a group and post in it.
                    It has a whole system of moderating content, so that the users can report posts and groups, and the moderators can take action.
                    Posts can include text, images, gifs and videos. <br />
                    Users can comment on posts, and make replies to comments.
                    They can also vote on the content. They can be moderators in different groups and help manage the content.
                </p>
                <h2 className="text-2xl font-bold">Images</h2>
                <ImageCarousel images={images} />
                <h2 className="text-2xl font-bold">Code</h2>
                <p>
                    The code for this project is split into two repositories:
                </p>
                <ul className="flex flex-col gap-2 list-disc pl-4">
                    <li className="text-lg"><a href="https://github.com/filipkober/nigdit-dashboard" className="text-blue-600 underline">Dashboard (Frontend)</a></li>
                    <li className="text-lg"><a href="https://github.com/filipkober/nigdit-strapi" className="text-blue-600 underline">Strapi (Backend)</a></li>
                </ul>
                <h2 className="text-2xl font-bold">Hosting</h2>
                <p>
                    The entirety of the project is hosted on the cloud by me.
                    I used an Oracle VPS to host the backend, the frontend and the database.
                    The domain, DNS and SSL certificates were all set up by me, using Cloudflare and ngnix.
                </p>
                <h2 className="text-2xl font-bold">Technologies</h2>
                <h3 className="text-lg font-bold flex gap-2">TypeScript <Image src={typeScriptLogo} alt="TypeScript logo" width={18} height={18}/></h3>
                <p>
                    Used both in the frontend and the backend.
                </p>
                <h3 className="text-lg font-bold flex gap-2">Next.js <Image src={nextLogo} alt="Next.js logo" width={18} height={18}/></h3>
                <p>
                    Used mainly for frontend (with the exception of a Google login), using the pages router.
                </p>
                <h3 className="text-lg font-bold flex gap-2">Strapi <Image src={strapiLogo} alt="Strapi logo" width={18} height={18}/></h3>
                <p>
                    Used for the backend, as a headless CMS. There&apos;s a bunch of custom endpoints and services, pretty much all of the backend is custom.
                </p>
                <h3 className="text-lg font-bold flex gap-2">PostgreSQL <Image src={postgresLogo} alt="PostgreSQL logo" width={18} height={18}/></h3>
                <p>
                    Used as the database for Strapi. This project has a lot of relations, so a relational database was the best choice.
                </p>
            </div>
            
        </div>
    );
}