import Link from "next/link";
import Image from "next/image";
import linkedin from "@/public/linkedin.svg"
import github from "@/public/github.svg"

const birthday = new Date('2006-01-31')
const now = new Date()
let myAge = (now.getFullYear() - birthday.getFullYear())

if(now.getMonth() < birthday.getMonth() || (now.getMonth() === birthday.getMonth() && now.getDate() < birthday.getDate())){
    myAge--;
}

let n = false;
if([18,80,81,82,83,84,85,86,87,88,89].find(e => e === myAge)) n = true;


const AboutMe = () => {

    return (
        <div className="flex items-center flex-col mb-16 px-4">
            <h1 className="mt-12 text-6xl mb-8 font-bold tracking-tight">About Me</h1>
            <p className="md:max-w-2xl max-w-[90%] text-xl text-center leading-relaxed mb-10">
                Hi! My name is <span className="font-semibold text-blue-300">Filip Kober</span> and I&apos;m a{n && "n"} {myAge} year old software developer from Poland 🇵🇱
            </p>
            
            <div className="md:max-w-2xl max-w-[90%] border-t border-gray-700 w-full my-10 opacity-50" />
            
            <section className="md:max-w-2xl max-w-[90%] w-full mb-12">
                <h2 className="text-4xl mb-6 font-semibold tracking-wide text-center">What is this page?</h2>
                <p className="text-lg leading-relaxed text-gray-200">
                    It&apos;s my own little place on the internet, where I upload whatever I feel like uploading. 
                    For a really long time I wanted to have a spot like this, and I finally have my place.
                    This website not only serves as my portfolio, but also as a place where I will just make stuff that I find
                    cool and upload it here.
                </p>
            </section>
            
            <section className="md:max-w-2xl max-w-[90%] w-full mb-12 bg-gray-900/50 p-6 rounded-lg">
                <h2 className="text-4xl mb-6 font-semibold tracking-wide text-center">Programming</h2>
                <p className="text-lg leading-relaxed text-gray-200">
                    My journey with programming began pretty early on. I don&apos;t remember exactly how old I was,
                    but it was around the age of 12. My journey started pretty unusual, as my first experience with coding
                    was making scripts (basically cheats) for Roblox games. Doing that I learned Lua and basics of reverse engineering.
                    <br /><br />
                    After doing this for a bit, I moved onto web technologies. I fell in love with making websites and APIs.
                    I&apos;m not good at web design (or design in general), so I tend to like the backend side more, however I find frontend enjoyable too.
                    <br/><br/>
                    I like a bunch of branches of programming. I have the most skill in web, however I also really like game development, AI and making simulations.
                </p>
            </section>
            
            <section className="md:max-w-2xl max-w-[90%] w-full mb-12">
                <h2 className="text-4xl mb-6 font-semibold tracking-wide text-center">Portfolio</h2>
                <p className="text-lg leading-relaxed text-gray-200 mb-4">
                    I have a few projects that I am proud of. You can check them out in the 
                    <Link href={"/portfolio"} className="font-bold text-blue-300 hover:text-blue-400 transition-colors mx-1">Portfolio</Link>
                    section.
                </p>
            </section>
            
            <section className="md:max-w-2xl max-w-[90%] w-full mb-12 bg-gray-900/50 p-6 rounded-lg">
                <h2 className="text-4xl mb-6 font-semibold tracking-wide text-center">Hobbies</h2>
                <p className="text-lg leading-relaxed text-gray-200 mb-4">
                    Besides programming, I really like:
                </p>
                <ul className="list-none text-lg space-y-2 mb-6 grid md:grid-cols-2 grid-cols-1 gap-2">
                    <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
                        <span>Cooking</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
                        <span>Reading (mostly fantasy)</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
                        <span>Working out at the gym</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
                        <span>Writing</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
                        <span>Board Games</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
                        <span>Listening to music (Hip-Hop being my favorite)</span>
                    </li>
                </ul>
                <p className="text-lg leading-relaxed text-gray-200">
                    This website is a good place for me to write more about them.
                </p>
            </section>
            
            <section className="md:max-w-2xl max-w-[90%] w-full mb-12 mt-4">
                <h2 className="text-4xl mb-6 font-semibold tracking-wide text-center">Contact</h2>
                <p className="text-lg leading-relaxed text-center text-gray-200 mb-6">
                    Click the icons to be redirected to the corresponding platforms
                </p>
                <div className="flex flex-row justify-center gap-6 mb-8">
                    <Link 
                        href={"https://github.com/filipkober"} 
                        target="_blank" 
                        className="transform hover:scale-110 transition-transform hover:opacity-80"
                    >
                        <Image src={github} alt={"GitHub logo"} width={48} className="opacity-90" />
                    </Link>
                    <Link 
                        href={"https://www.linkedin.com/in/filip-kober/"} 
                        target="_blank"
                        className="transform hover:scale-110 transition-transform hover:opacity-80"  
                    >
                        <Image src={linkedin} alt={"LinkedIn logo"} width={48} className="opacity-90" />
                    </Link>
                </div>
                <p className="text-center text-lg leading-relaxed mb-4">
                    Or just email me at: 
                    <Link 
                        href={"mailto:koberfilip2@gmail.com"} 
                        className="font-bold mx-1 text-blue-300 hover:text-blue-400 transition-colors"
                    >
                        koberfilip2@gmail.com
                    </Link>
                </p>
            </section>
        </div>
    )
};

export default AboutMe;