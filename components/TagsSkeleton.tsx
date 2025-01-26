import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function TagsSkeleton() {
  return (
    <div className="flex gap-4 lg:w-1/2 mx-auto mt-4 flex-wrap">
      <Skeleton className="rounded-full w-[8em] h-8" />
      <Skeleton className="rounded-full w-[4em] h-8" />
      <Skeleton className="rounded-full w-[6em] h-8" />
      <Skeleton className="rounded-full w-[4em] h-8" />
    </div>
  );
}
