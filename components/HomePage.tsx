"use client"

import Boids from "@/components/Boids";
import SpecialEffects from "@/components/SpecialEffects";
import StarLink from "@/components/StarLink";
import { useSpecialEffects } from "@/util/hooks/useSpecialEffects";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

export default function HomePage() {

    const session = useSession();
    const loggedIn = !!session.data;
    const isAdmin = session.data?.user?.admin;
  
    const { canvasRef, shootStar, startStarShower, stopShootingStars } = useSpecialEffects();

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
    <h1 className="text-6xl text-center mb-12">
      Filip Kober {isAdmin && <Link href={'/admin'}>⭐</Link>}
    </h1>
    <div className="sm:grid sm:columns-3 md:mt-[20vh] lg:mt-0">
      <div className="sm:col-start-1 flex justify-center flex-col gap-4 sm:gap-64 relative">
        <Link href={'./about'}>
          <h1 className="text-4xl font-bold sm:text-right sm:absolute lg:left-[22vw] sm:bottom-[30vw] text-nowrap text-center">
            About Me
          </h1>
        </Link>
        <h1 className="text-4xl font-bold sm:text-right sm:absolute lg:left-[20vw] text-nowrap text-center">
          <Link href={'./blog'}>Blog</Link>
        </h1>
        <h1 className="text-4xl font-bold sm:text-right sm:absolute cursor-not-allowed lg:left-[22vw] sm:top-[30vw] text-nowrap text-center">
          <Link href={'./portfolio'}>Portfolio</Link>
        </h1>
      </div>
      <div className="sm:flex justify-center items-center col-start-2 hidden">
        <Boids />
      </div>
      <div className="sm:col-start-3 flex justify-center flex-col gap-4 sm:gap-64 relative mt-4 sm:mt-0">
        <h1 className="text-4xl font-bold sm:text-left sm:absolute lg:right-[22vw] sm:bottom-[30vw] text-nowrap text-center">
          <StarLink href={"/fun"} shootStar={shootStar}>Fun</StarLink>
        </h1>
        <h1 className="text-4xl font-bold sm:text-left sm:absolute cursor-not-allowed lg:right-[20vw] text-nowrap text-center">
          <Link href={"/tools"}>Tools</Link>
        </h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h1 className={"text-4xl font-bold sm:text-left sm:absolute lg:right-[22vw] sm:top-[30vw] text-nowrap text-center"}>
                <Link href={loggedIn ? "/secrets" : '/account/login'}>Secrets</Link>
              </h1>
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
  <SpecialEffects canvasRef={canvasRef} />
  </>
  )
}
