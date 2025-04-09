"use client";

import { CSSProperties, useEffect, useState } from "react";
import "@/styles/Bounce.css"
import PrettyLinkBox from "@/components/PrettyLinkBox";

const letters = "The Fun Page".split("");


export default function FunPage() {

    const [screenWide, setScreenWide] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 1024) {
            setScreenWide(true);
        }
    }
    , []);

    const spans = letters.map((letter, index) => {

        const style: CSSProperties = {
            animation: `bounce ${letters.length * 0.1 * 1.5}s infinite ${index * 0.1}s ease-in-out`,
            left: screenWide ? `${index * 2}rem` : `${index * 1.3}rem`,
        }
    
        return <span key={index} className="text-4xl lg:text-6xl absolute" style={style}>{letter}</span>
    });

    return (
        <div className="relative h-screen flex flex-col items-center">
            <h1 className="absolute mt-16" style={{left: `calc(50% - ${letters.length * (screenWide ? 1 : 0.65)}rem)`}}>
                {spans}
            </h1>
            <PrettyLinkBox
                title={{
                    icon: "🪙",
                    content: "Fun utilities",
                }}
                links={[
                    {
                        content: "Web demo",
                        href: "/fun/web-demo",
                        icon: "🌐",
                    },
                    {
                        content: "Daily coins",
                        href: "/fun/daily",
                        icon: "💰",
                    },
                    {
                        content: "Random thoughts",
                        href: "/fun/random-thoughts",
                        icon: "💭",
                    },
                    {
                        content: "Casino",
                        href: "/fun/gambling/",
                        icon: "🎰",
                    },
                ]}
                className="mt-48"
            />
        </div>
    );
}