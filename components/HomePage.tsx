"use client"

import Boids from "@/components/Boids";
import StarLink from "@/components/StarLink";
import { useSpecialEffectsContext } from "@/util/contexts/SpecialEffectsContext";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

export default function HomePage() {

    const session = useSession();
    const loggedIn = !!session.data;
    const isAdmin = session.data?.user?.admin;
  
    const { startStarShower, stopShootingStars } = useSpecialEffectsContext();

    useEffect(() => {

        if (window.innerWidth > 640) return;

        startStarShower();

        const stopShootingStarsRef = stopShootingStars.current;

        return () => {
          if (stopShootingStarsRef)
            stopShootingStarsRef();
        }
    }, [startStarShower, stopShootingStars])

  return (
    <>
    <div className="w-screen h-screen relative p-16">
    <h1 className="text-6xl text-center mb-12 ">
      <span className="gradient-text font-bold">Filip Kober</span> {isAdmin && <Link href={'/admin'}>⭐</Link>}
    </h1>
    <div className="sm:grid sm:columns-3 md:mt-[20vh] lg:mt-0">
      <div className="sm:col-start-1 flex justify-center flex-col gap-4 sm:gap-64 relative">
        <Link href={'./about'}>
          <h1 className="text-4xl font-bold sm:text-right sm:absolute lg:left-[22vw] sm:bottom-[30vw] text-nowrap text-center transition-all duration-300 hover:scale-110 hover:text-cyan-400 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            About Me
          </h1>
        </Link>
        <Link href={'./blog'} className="sm:text-right sm:absolute lg:left-[20vw]">
        <h1 className="text-4xl font-bold text-nowrap text-center transition-all duration-300 hover:scale-110 hover:text-blue-400 hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">
          Blog
        </h1>
        </Link>
        <Link href={'./portfolio'} className="sm:text-right sm:absolute lg:left-[22vw] sm:top-[30vw]">
        <h1 className="text-4xl font-bold text-nowrap text-center transition-all duration-300 hover:scale-110 hover:text-purple-400 hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          Portfolio
        </h1>
        </Link>
      </div>
      <div className="sm:flex justify-center items-center col-start-2 hidden">
        <Boids />
      </div>
      <div className="sm:col-start-3 flex justify-center flex-col gap-4 sm:gap-64 relative mt-4 sm:mt-0">
      <StarLink href={"/fun"} className="sm:text-left sm:absolute lg:right-[22vw] sm:bottom-[30vw]">
        <h1 className="text-4xl font-bold text-nowrap text-center transition-all duration-300 hover:scale-110 hover:text-amber-400 hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
          Fun
        </h1>
        </StarLink>
        <Link href={"/tools"} className="sm:text-left sm:absolute lg:right-[20vw]">
        <h1 className="text-4xl font-bold text-nowrap text-center transition-all duration-300 hover:scale-110 hover:text-emerald-400 hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
          Tools
        </h1>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <Link href={loggedIn ? "/secrets" : '/account/login'} className="sm:text-left sm:absolute lg:right-[22vw] sm:top-[30vw]">
              <h1 className={"text-4xl font-bold text-nowrap text-center transition-all duration-300 hover:scale-110 hover:text-rose-400 hover:drop-shadow-[0_0_15px_rgba(251,113,133,0.5)]"}>
                Secrets
              </h1>
              </Link>
            </TooltipTrigger>
            {!loggedIn && (
              <TooltipContent>
                <p>
                You need to log in to access this page.
                </p>
                <p>
                    click the to log in
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>
  </>
  )
}
