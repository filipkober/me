import nigditcommunity from "@/public/nigditcommunity.png";
import how2liftDemo from "@/public/how2liftscreen.png";
import websiteScreenshot from "@/public/thispage.png";
import PortfolioWebsiteCard from "@/components/PortfolioWebsiteCard";

export default function Portfolio() {
    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <div className="w-full py-10 flex flex-col items-center gap-2 bg-gradient-to-r from-black to-gray-950">
                <h1 className="text-5xl font-bold gradient-text">Portfolio</h1>
                <p className="text-xl text-gray-300">Projects I&apos;ve worked on</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
                {/* This Website Card */}
                <PortfolioWebsiteCard
                    image={websiteScreenshot}
                    title="This Website"
                    description="My personal website built with Next.js, featuring a blog system and portfolio showcase."
                    technologies={["Next.js", "TypeScript", "MongoDB"]}
                    link="/portfolio/this"
                />

                {/* Nigdit Card */}
                <PortfolioWebsiteCard
                    image={nigditcommunity}
                    title="Nigdit"
                    description="A social media platform with community features, moderation tools, and rich-media posts."
                    technologies={["Next.js", "TypeScript", "Strapi", "PostgreSQL"]}
                    link="/portfolio/nigdit"
                />

                {/* How2Lift Card */}
                <PortfolioWebsiteCard
                    image={how2liftDemo}
                    title="How2Lift"
                    description="An AI-powered mobile app that helps users learn proper weightlifting techniques."
                    technologies={["React Native", "Spring Boot", "OpenAI"]}
                    link="/portfolio/how2lift"
                />
            </div>
        </div>
    );
}