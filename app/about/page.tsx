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
        <div className="flex items-center flex-col mb-16">
            <h1 className="mt-8 text-5xl mb-8">About Me</h1>
            <p className="lg:max-w-[25%] max-w-[80%] text-wrap">Hi! My name is Filip Kober and I&apos;m a{n && "n"} {myAge} year old software developer from Poland 🇵🇱</p>
            <h2 className="mt-8 text-4xl mb-8">What is this page?</h2>
            <p className="lg:max-w-[25%] max-w-[80%] text-wrap">
                It&apos;s my own little place on the internet, where I upload whatever I feel like uploading. <br/>
                For a really long time I wanted to have a spot like this, and I finally have my place.
                This website not only serves as my portfolio, but also as a place where I will just make stuff that I find
                cool and upload it here
            </p>
            <h2 className="mt-8 text-4xl mb-8">Programming</h2>
            <p className="lg:max-w-[25%] max-w-[80%] text-wrap">
                My journey with programming began pretty early on. I don&apos;t remember exactly how old I was,
                but it was around the age of 12. My journey started pretty unusual, as my first experience with coding
                was making scripts (basically cheats) for Roblox games. Doing that I learned Lua and basics of reverse engineering <br /><br />
                After doing this for a bit, I moved onto web technologies. I fell in love with making websites and APIs.
                I&apos;m not good at web design (or design in general), so I tend to like the backend side more, however I find frontend enjoyable too. <br/><br/>
                I like a bunch of branches of programming. I have the most skill in web, however I also really like game development, AI and making simulations.
            </p>
            <h2 className="mt-8 text-4xl mb-8">Hobbies</h2>
            <p className="lg:max-w-[25%] max-w-[80%] text-wrap mb-2">
                Besides programming, I really like:
            </p>
            <ul className="list-disc lg:max-w-[25%] max-w-[80%] text-wrap mb-4">
                    <li>Cooking</li>
                    <li>Reading (mostly fantasy)</li>
                    <li>Working out at the gym</li>
                    <li>Writing</li>
                    <li>Board Games</li>
                    <li>Listening to music (Hip-Hop being my favorite)</li>
            </ul>
            <p className="lg:max-w-[25%] max-w-[80%] text-wrap">
                This website is a good place for me to write more about them
            </p>
            <h2 className="mt-8 text-4xl mb-8">Contact</h2>
            <p className="lg:max-w-[25%] max-w-[80%] text-wrap mb-2">
                Click the icons to be redirected to the corresponding platforms
            </p>
            <div className="flex flex-row flex-wrap">
                <Link href={"https://github.com/filipkober"} target="_blank"><Image src={github} alt={"GitHub logo"} width={48} /></Link>
                <Link href={"https://www.linkedin.com/in/filip-kober/"} target="_blank"><Image src={linkedin} alt={"LinkedIn logo"} width={48} /></Link>
            </div>
            <p className="lg:max-w-[25%] max-w-[80%] text-wrap mb-4">
                Or just email me at: <Link href={"mailto:koberfilip2@gmail.com"} className="font-bold">koberfilip2@gmail.com</Link>
            </p>
        </div>
    )

};

export default AboutMe;