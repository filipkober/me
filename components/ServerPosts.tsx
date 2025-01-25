import { getPosts } from "@/app/admin/blog/post/new/actions";
import BlogPost from "./BlogPost";

interface ServerPostsProps {
    search?: string;
    tags?: string[];
}

export default async function ServerPosts({ search, tags }: ServerPostsProps) {

  const posts = await getPosts({ search, tags });

  return (
    <>
      {posts.length > 0 ? posts.map((post) => {
        return <BlogPost key={post.id} post={post} />;
      }) : <p className="text-center">No posts found</p>}
    </>
  );
}
