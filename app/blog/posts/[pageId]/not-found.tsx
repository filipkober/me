import Link from "next/link";

export default function PostNotFoundPage() {
    return (
        <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
            <h1 className="text-5xl">404</h1>
            <h2 className="text-3xl">Post not found</h2>
            <Link href="/blog">back to blog</Link>
        </div>
    );
}