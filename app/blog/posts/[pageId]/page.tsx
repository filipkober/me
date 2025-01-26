import { getPost } from "@/app/admin/blog/post/new/actions"
import { notFound } from "next/navigation"

export default async function BlogPage({
    params,
  }: {
    params: Promise<{ pageId: string }>
  }) {
    const postId = (await params).pageId
    let post;
    try {
        post = await getPost(postId)
    } catch (e: unknown) {
        const error = e as Error
        if (error.message === "not found") {
            return notFound()
        }
    }

    return <div className="w-screen min-h-screen p-4 ql-editor" dangerouslySetInnerHTML={post ? {__html: post.content} : undefined}></div>
  }