"use client";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TagType } from "@/types/Tag";
import { getTags } from "../../tag/new/actions";
import TagGroup from "@/components/TagGroup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BlogPost from "@/components/BlogPost";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import { createBlogPost } from "./actions";
import { z } from "zod";
import { SmallPostType } from "@/types/Post";
import TagsSkeleton from "@/components/TagsSkeleton";
import Editor from "@/components/Editor";

const date = new Date();

const newBlogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  image: z.instanceof(File)
})

export default function Page() {
  const [html, setHtml] = useState<string>("");
  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<Blob>();

  useEffect(() => {
    getTags().then((tags) => setTags(tags));
  }, []);

  const onSubmit = async () => {

    const blogPost = {
      title,
      description,
      content: html,
      tags: selectedTags.map((tag) => tag.id),
      image: image!,
    }

    newBlogPostSchema.parse(blogPost)

    const result = await createBlogPost(blogPost)

    if (result.error) {
      console.error(result.error)
    } else {
      console.log(result.post)
    }
  }

  const blogPost: SmallPostType = {
    id: "1",
    title: title,
    description: description,
    image: image ? URL.createObjectURL(image) : "",
    tags: selectedTags,
    date: date,
  }

  return (
    <div className="w-screen flex items-center pt-8 flex-col pb-10 px-2 md:px-0 md:pb-4">
      <div className="container my-4">
        <h1 className="text-center font-bold text-4xl my-4">New Blog Post</h1>
        <Label htmlFor="title">Title</Label>
        <Input
          placeholder="Title"
          className="mb-4"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="Description"
          className="mb-4"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <ImageUpload className="mb-8" fileChanged={setImage} />
        <Editor setHtml={setHtml}/>
        <h2 className="font-bold text-2xl my-4">Tags</h2>
        <Suspense fallback={<TagsSkeleton />}>
          <TagGroup
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            tags={tags}
          />
        </Suspense>
      </div>
      <div className="container">
        <h1 className="text-center font-bold text-4xl mb-4">Preview</h1>
        <BlogPost
          post={blogPost}
          className="mb-4"
          nolink
        />
        <Button onClick={onSubmit} className="my-4">
          Publish
        </Button>
      </div>
    </div>
  );
}
