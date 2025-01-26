import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import ServerTags from "@/components/ServerTags";
import ServerPosts from "@/components/ServerPosts";
import { Skeleton } from "@/components/ui/skeleton";
import TagsSkeleton from "@/components/TagsSkeleton";

export default async function Blog(
    props: {searchParams?: Promise<{ [key: string]: string | string[] | undefined}>}
) {
    const searchParams = await props.searchParams;

    const tags = searchParams?.tags ? (searchParams.tags as string).split(',') : undefined;

    return (
        <div className="container mx-auto pt-8 pb-8 px-2">
            <h1 className="text-5xl text-center">Blog</h1>

            <form className="flex gap-2 lg:w-1/2 mx-auto mt-8" method="GET">
                <Input placeholder="Search by title, description..." name="search" />
                <Button className="btn" type="submit">Search</Button>
            </form>
            <Suspense fallback={
                <TagsSkeleton />
            }>
                <ServerTags />
            </Suspense>
            <div className="mt-8 flex flex-col gap-4 lg:w-1/2 mx-auto">
                <Suspense fallback={
                    <>
                    <Skeleton className="w-full h-[30vh] rounded-xl relative" >
                        <Skeleton className="absolute bottom-0 left-0 my-24 ml-4 w-1/3 rounded-xl h-8" />
                        <Skeleton className="absolute bottom-0 left-0 my-4 ml-4 w-[calc(100%-2rem)] rounded-xl h-16" />
                    </Skeleton>
                    <Skeleton className="w-full h-[30vh] rounded-xl relative" >
                        <Skeleton className="absolute bottom-0 left-0 my-24 ml-4 w-1/3 rounded-xl h-8" />
                        <Skeleton className="absolute bottom-0 left-0 my-4 ml-4 w-[calc(100%-2rem)] rounded-xl h-16" />
                    </Skeleton>
                    <Skeleton className="w-full h-[30vh] rounded-xl relative" >
                        <Skeleton className="absolute bottom-0 left-0 my-24 ml-4 w-1/3 rounded-xl h-8" />
                        <Skeleton className="absolute bottom-0 left-0 my-4 ml-4 w-[calc(100%-2rem)] rounded-xl h-16" />
                    </Skeleton>
                    </>
                }>
                    <ServerPosts search={searchParams?.search as string} tags={tags} />
                </Suspense>
            </div>
        </div>
    );
}