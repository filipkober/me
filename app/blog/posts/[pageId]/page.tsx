import { getPost } from "@/app/admin/blog/post/new/actions"
import { notFound } from "next/navigation"
import TagLabel from "@/components/TagLabel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Image from "next/image"

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

    if (!post) return null;
    
    // Format the date
    const date = new Date(post.date).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <article className="flex flex-col gap-4">
        {/* Title and date section */}
        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">{post.title}</h1>
          <p className="text-md text-gray-400">{date}</p>
        </div>

        {/* Featured image */}
        {post.image && (
          <div className="relative w-full h-52 md:h-64 lg:h-80 mb-2 overflow-hidden rounded-md">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <ScrollArea className="w-full whitespace-nowrap mb-4">
            <div className="flex w-max gap-2 pb-2">
              {post.tags.map(tag => (
                <TagLabel key={tag.id} name={tag.name} description={tag.description} style={tag.style} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        {/* Description/summary */}
        {post.description && (
          <div className="text-lg text-gray-300 border-l-2 border-gray-700 pl-4 py-1 italic mb-4">
            {post.description}
          </div>
        )}

        {/* Content */}
        <div 
          className="flex flex-col gap-4 prose prose-invert max-w-none" 
          dangerouslySetInnerHTML={{__html: post.content}} 
        />
      </article>
    )
  }