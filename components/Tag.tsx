"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface TagProps {
  name: string;
  description?: string;
  style?: string;
  toggled?: boolean;
  onClick?: () => void;
}

export default function Tag({
  name,
  style,
  toggled,
  onClick,
  description,
}: TagProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const className = cn({
    "border-white": !toggled,
    "border-green-600": toggled,
    "rounded-full bg-transparent border-2 px-2 transition duration-100": true,
  });

  useEffect(() => {
    if (style) {
      if (btnRef.current) {
        btnRef.current.style.cssText =
          btnRef.current.style.cssText + " " + style;
      }
    }
  }, [btnRef, style]);

  const component = description ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={onClick}
          ref={btnRef}
          className={className}
          type="button"
          dangerouslySetInnerHTML={{ __html: name }}
        />
        <TooltipContent>
            <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <button onClick={onClick} ref={btnRef} className={className} type="button" dangerouslySetInnerHTML={{ __html: name }} />
  );

  return component;
}
