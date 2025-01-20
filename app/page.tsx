"use client"

import Boids from "@/components/Boids";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [loggedIn, setLoggedIn] = useState(false);

  getSession().then(session => {
    if (session) {
      setLoggedIn(true);
    }
  });

  return (
    <div className="w-screen h-screen relative p-16">
      <h1 className="text-6xl text-center mb-12">Filip Kober {loggedIn && <span>⭐</span>}</h1>
      <div className="grid columns-3">
      <div className="col-start-1 flex justify-center flex-col gap-64 relative">
        <Link href={'./about'}><h1 className="text-4xl font-bold text-right absolute left-[22vw] bottom-[30vw] text-nowrap">About Me</h1></Link>
        <h1 className="text-4xl font-bold text-right absolute cursor-not-allowed left-[20vw] text-nowrap">Blog</h1>
        <h1 className="text-4xl font-bold text-right absolute cursor-not-allowed left-[22vw] top-[30vw] text-nowrap">Portfolio</h1>
      </div>
      <div className="flex justify-center items-center col-start-2">
        <Boids />
      </div>
      <div className="col-start-3 flex justify-center flex-col gap-64 relative">
        <h1 className="text-4xl font-bold text-left absolute cursor-not-allowed right-[22vw] bottom-[30vw] text-nowrap">Fun</h1>
        <h1 className="text-4xl font-bold text-left absolute cursor-not-allowed right-[20vw] text-nowrap">Tools</h1>
        <h1 className="text-4xl font-bold text-left absolute cursor-not-allowed right-[22vw] top-[30vw] text-nowrap">Secrets</h1>
      </div>
    </div>
    </div>
  );
}
