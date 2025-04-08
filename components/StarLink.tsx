"use client";

import { useSpecialEffectsContext } from "@/util/contexts/SpecialEffectsContext";
import Link, { LinkProps } from "next/link";
import { MouseEventHandler, TouchEventHandler } from "react";

export default function StarLink({href, children, numberOfStars = 5, className}: LinkProps & {children?: React.ReactNode | React.ReactNode[] | string} & {numberOfStars?: number, className?: string}) {
  
    const {shootStar} = useSpecialEffectsContext();
    
    const shootStars: MouseEventHandler<HTMLAnchorElement> = (e) => {
        for(let i = 0; i < numberOfStars; i++) {
            shootStar({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 10 + 5
            })
        }
    }

    const shootStarsMobile: TouchEventHandler<HTMLAnchorElement> = (e) => {
        for(let i = 0; i < numberOfStars; i++) {
            shootStar({
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                size: Math.random() * 10 + 5
            })
        }
    }
  
    return (
    <Link href={href} onMouseEnter={shootStars} onTouchStart={shootStarsMobile} className={className}>{children}</Link>
  )
}
