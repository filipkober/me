"use client";
import React, { useEffect, useRef } from "react";
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
}

export default function TagLabel({
  name,
  style,
  description,
}: TagProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (style) {
      if (btnRef.current) {
        btnRef.current.style.cssText =
          btnRef.current.style.cssText + " " + style;
      }
      if (divRef.current) {
        divRef.current.style.cssText =
          divRef.current.style.cssText + " " + style;
      }
    }
  }, [btnRef,divRef, style]);

  const component = description ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          ref={btnRef}
          className={"rounded-full bg-transparent border-2 px-2 transition duration-100 border-white cursor-default"}
          disabled
          dangerouslySetInnerHTML={{ __html: name }}
        />
        <TooltipContent>
            <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <div className={"rounded-full bg-transparent border-2 px-2 transition duration-100 border-white"} ref={divRef} dangerouslySetInnerHTML={{ __html: name }} />
  );

  return component;
}
