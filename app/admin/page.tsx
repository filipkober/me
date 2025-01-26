import Link from "next/link";

export default function AdminPage() {
    return (
        <div className="w-screen flex items-center pt-8 flex-col gap-2">
            <h1 className="font-bold text-5xl">Admin Page</h1>
            <h2 className="text-3xl">Links:</h2>
            <ul className="list-disc text-xl">
                <li><Link href="/admin/blog/post/new" className="text-blue-500 underline">Create a new blog post</Link></li>
                <li><Link href="/admin/blog/tag/new" className="text-blue-500 underline">Create a new tag</Link></li>
            </ul>
        </div>
    );
}