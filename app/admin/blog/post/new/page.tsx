"use client";
import { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor-dark-mode.css";
import draftToHtml from "draftjs-to-html";
import { Button } from "@/components/ui/button";
import { TagType } from "@/types/Tag";
import { getTags } from "../../tag/new/actions";
import TagGroup from "@/components/TagGroup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BlogPost from "@/components/BlogPost";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import { createBlogPost } from "./actions";
import { z } from "zod";
import { SmallPostType } from "@/types/Post";

const date = new Date();

const newBlogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  image: z.instanceof(File)
})

export default function Page() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<Blob>();

  const editorStateRef = useRef(editorState);

  useEffect(() => {
    editorStateRef.current = editorState;
  }, [editorState]);

  useEffect(() => {
    getTags().then((tags) => setTags(tags));

    const draft = localStorage.getItem("draft");
    if (draft) {
      const newState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(draft))
      );
      setEditorState(newState);
    }

    function handleBeforeUnload() {
      localStorage.setItem(
        "draft",
        JSON.stringify(convertToRaw(editorStateRef.current.getCurrentContent()))
      );
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const previewRef = useRef<HTMLDivElement>(null);

  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

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
    <div className="w-screen h-screen flex items-center mt-8 flex-col">
      <div className="container my-4">
        <h1 className="text-center font-bold text-4xl my-4"><Link href={'/admin'} className="mr-[1ch]">&lt;</Link>New Blog Post</h1>
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
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbarClassName="text-black"
          editorClassName="border border-gray-300 p-4"
        />
        <h2 className="font-bold text-2xl my-4">Tags</h2>
        <TagGroup
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tags={tags}
        />
      </div>
      <div className="container">
        <h1 className="text-center font-bold text-4xl mb-4">Preview</h1>
        <BlogPost
          post={blogPost}
          className="mb-4"
          nolink
        />
        <div
          ref={previewRef}
          dangerouslySetInnerHTML={{ __html: html }}
          className="border border-gray-300 p-4 mb-4"
        />
        <Button onClick={onSubmit} className="my-4">
          Publish
        </Button>
      </div>
    </div>
  );
}
