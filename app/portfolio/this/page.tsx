import getConfig from "next/config";
import newblog1 from "@/public/newblog1.png";
import newblog2 from "@/public/newblog2.png";
import newtag from "@/public/newtag.png";

// logos
import typeScriptLogo from "@/public/typescript.svg";
import nextLogo from "@/public/nextdotjs.svg";
import prismaLogo from "@/public/prisma.svg";
import mongoLogo from "@/public/mongodb.svg";
import nextAuthLogo from "@/public/nextauth.svg";
import tailwindLogo from "@/public/tailwindcss.svg";
import shadcnLogo from "@/public/shadcnui.svg";

import ImageCarousel from "@/components/ImageCarousel";
import Image from "next/image";

export default function AboutThisPagePage() {

    const { publicRuntimeConfig } = getConfig();
    const images = [
        { src: newblog1, width: 1648, height: 908, alt: 'new blog form' },
        { src: newblog2, width: 1598, height: 761, alt: 'new blog form pt. 2' },
        { src: newtag, width: 717, height: 779, alt: 'new tag form' },
    ];

    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <div className="w-full py-10 flex flex-col items-center gap-2 bg-gradient-to-r from-black to-gray-950">
                <h1 className="text-5xl font-bold gradient-text">About this page</h1>
                <p className="text-xl text-gray-300">The story behind my personal website</p>
            </div>
            
            <div className="flex flex-col items-center gap-8 p-8 max-w-[80vw] md:max-w-[60vw] lg:max-w-[40vw] bg-gray-950 rounded-lg shadow-md border border-gray-700">
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Background</h2>
                    <p className="text-gray-300">
                        For a long time I wanted to have a personal website. This is the result of that desire.
                        It&apos;s a place where I intend to have my portfolio, blog and host some of my projects.
                    </p>
                </section>
                
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Notable pages</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-200 mb-2">The homepage</h3>
                            <p className="text-gray-300">
                                In the very center of the homepage, there&apos;s a little simulation of boids.
                                I thought they would be a nice, eye-catching element to have on the homepage.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold text-gray-200 mb-2">The blog</h3>
                            <p className="text-gray-300">
                                The blog is a place where I intend to write about things I find interesting.
                                I&apos;ll try to write about programming, tech, and my interests.
                                I can write new posts from the admin panel, allowing me to write posts without having to touch the code.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold text-gray-200 mb-2">The admin panel</h3>
                            <p className="text-gray-300 mb-3">
                                This part of the website is not accessible to the public. It&apos;s where I can write blog posts, create new tags, and manage the website.
                                It&apos;s secured with Next Auth, so only I can access it.
                                The creation forms have some pretty cool features, like allowing me to add custom css to tags, and previewing the post before publishing.
                            </p>
                            <p className="text-gray-300 mb-3">Here are some screenshots of the admin panel:</p>
                            <ImageCarousel images={images} className="w-[90%] mx-auto" />
                        </div>
                    </div>
                </section>
                
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Technologies Used</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-750 bg-opacity-50 p-4 rounded-md border border-gray-700">
                            <div className="flex items-center gap-3 text-gray-200 font-bold text-lg mb-2">
                                <Image src={typeScriptLogo} alt="TypeScript logo" width={18} height={18}/>
                                <span>TypeScript</span>
                            </div>
                            <p className="text-gray-300 pl-7">
                                I chose TypeScript over JavaScript because I like the type safety it provides.
                                It&apos;s really nice to have the compiler catch errors before they happen and to have intellisense in the editor.
                            </p>
                        </div>
                        
                        <div className="bg-gray-750 bg-opacity-50 p-4 rounded-md border border-gray-700">
                            <div className="flex items-center gap-3 text-gray-200 font-bold text-lg mb-2">
                                <Image src={nextLogo} alt="Next.js logo" width={18} height={18}/>
                                <span>Next.js</span>
                            </div>
                            <p className="text-gray-300 pl-7">
                                The main framework used for this website is Next.js. The version used is {publicRuntimeConfig.nextVersion}.
                                While making this website, I tried to use the latest features of Next.js, such as the app router, server actions and react suspense.
                                In my opinion Next.js is a great framework for building websites, because it lets you connect your frontend to your backend easily.
                            </p>
                        </div>
                        
                        <div className="bg-gray-750 bg-opacity-50 p-4 rounded-md border border-gray-700">
                            <div className="flex items-center gap-3 text-gray-200 font-bold text-lg mb-2">
                                <Image src={prismaLogo} alt="Prisma logo" width={18} height={18}/>
                                <Image src={mongoLogo} alt="MongoDB logo" width={18} height={18}/>
                                <span>Prisma & MongoDB</span>
                            </div>
                            <p className="text-gray-300 pl-7">
                                Prisma is the ORM I use to talk to the database. I love the type safety and ease of use. <br />
                                The database used is MongoDB. It&apos;s my first time using a NoSQL database. I like the flexibility it provides, also 
                                I&apos;m not planning to have a lot of relations in the database, so it fits my use case.
                            </p>
                        </div>
                        
                        <div className="bg-gray-750 bg-opacity-50 p-4 rounded-md border border-gray-700">
                            <div className="flex items-center gap-3 text-gray-200 font-bold text-lg mb-2">
                                <Image src={nextAuthLogo} alt="Next Auth logo" width={18} height={18}/>
                                <span>Next Auth</span>
                            </div>
                            <p className="text-gray-300 pl-7">
                                Also my first time using Next Auth. I&apos;m using it for securing access to the admin panel, where I can write blog posts,
                                create new tags. The library was really simple to set up, and there&apos;s a lot of providers to choose from. 
                            </p>
                        </div>
                        
                        <div className="bg-gray-750 bg-opacity-50 p-4 rounded-md border border-gray-700">
                            <div className="flex items-center gap-3 text-gray-200 font-bold text-lg mb-2">
                                <Image src={tailwindLogo} alt="Tailwind logo" width={18} height={18}/>
                                <span>Tailwind CSS</span>
                            </div>
                            <p className="text-gray-300 pl-7">
                                Tailwind is my go-to CSS framework. It lets me style my projects quickly and efficiently, there&apos;s a bunch of plugins and utilities,
                                and styling components from different libraries is really easy, because of the class names.
                            </p>
                        </div>
                        
                        <div className="bg-gray-750 bg-opacity-50 p-4 rounded-md border border-gray-700">
                            <div className="flex items-center gap-3 text-gray-200 font-bold text-lg mb-2">
                                <Image src={shadcnLogo} alt="shadcn/ui logo" width={18} height={18}/>
                                <span>shadcn/ui</span>
                            </div>
                            <p className="text-gray-300 pl-7">
                                Love the components in this library, their flexibility and compatibility with Tailwind. Thanks to this library,
                                my website has a consistent look and feel.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}