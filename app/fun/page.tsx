"use client";

import { CSSProperties } from "react";
import "@/styles/Bounce.css"
import Link from "next/link";

const letters = "The Fun Page".split("");
const spans = letters.map((letter, index) => {

    const style: CSSProperties = {
        animation: `bounce ${letters.length * 0.1 * 1.5}s infinite ${index * 0.1}s ease-in-out`,
        left: `${index * 2}rem`,
    }

    return <span key={index} className="text-6xl absolute" style={style}>{letter}</span>
});

export default function FunPage() {

    return (
        <div className="relative h-screen flex flex-col items-center">
            <h1 className="absolute mt-16" style={{left: `calc(50% - ${letters.length}rem)`}}>
                {spans}
            </h1>
            <h2 className="text-4xl mt-48">links:</h2>
            <ul className="text-2xl mt-4 list-disc list-outside">
                <li><Link href="/fun/web-demo" className="text-blue-600 underline">Godot + React bridge demo</Link></li>
                <li><Link href="/fun/daily" className="text-blue-600 underline">Claim your daily coins!</Link></li>
                <li><Link href="/fun/random-thoughts" className="text-blue-600 underline">Random thoughts</Link></li>
            </ul>
        </div>
    );
}