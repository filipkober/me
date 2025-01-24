"use client";

import Tag from "@/components/Tag";
import TagGroup from "@/components/TagGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TagType } from "@/types/Tag";
import { useEffect, useState } from "react";
import { createTag, fetchTags } from "./actions";
import Link from "next/link";

export default function CreateTags() {

    const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
    const [styleText, setStyleText] = useState<string>("");
    const [styleTextToggled, setStyleTextToggled] = useState<string>("");
    const [previewTagToggled, setPreviewTagToggled] = useState<boolean>(false);
    const [previewTagDescription, setPreviewTagDescription] = useState<string>("");
    const [previewTagName, setPreviewTagName] = useState<string>("");
    const [tags, setTags] = useState<TagType[]>([]);

    useEffect(() => {
        fetchTags().then(tags => setTags(tags));
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const tag: Omit<TagType, "id"> = {
            name: previewTagName,
            description: previewTagDescription,
            style: styleText,
            styleToggled: styleTextToggled,
        };

        const newTag = await createTag(tag);

        if (newTag.error) {
            alert(newTag.error);
        } else {

            const newCreatedTag: TagType = {
                id: newTag.tag!.id,
                name: newTag.tag!.name,
                description: newTag.tag?.description || undefined,
                style: newTag.tag?.specialStyle || undefined,
                styleToggled: newTag.tag?.specialStyleToggled || undefined,
            }

            setTags([...tags, newCreatedTag]);
            setPreviewTagName("");
            setPreviewTagDescription("");
            setStyleText("");
            setStyleTextToggled("");
        }

    };

    return (
        <div className="container mx-auto flex flex-col items-center mt-8">
            <h1 className="text-4xl"><Link href={'/admin'} className="mr-[1ch]">&lt;</Link>Create a new tag</h1>
            <form className="flex flex-col gap-4 lg:w-1/4 mb-8" onSubmit={onSubmit}>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" value={previewTagName} onChange={e => setPreviewTagName(e.target.value)} />
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={previewTagDescription} onChange={e => setPreviewTagDescription(e.target.value)} />
                <Label htmlFor="specialStyle">Special Style</Label>
                <Textarea id="specialStyle" name="specialStyle" value={styleText} onChange={e => setStyleText(e.target.value)} />
                <Label htmlFor="specialStyleToggled">Special Style (When Toggled)</Label>
                <Textarea id="specialStyle" name="specialStyleToggled" value={styleTextToggled} onChange={e => setStyleTextToggled(e.target.value)} />
                <h2 className="text-2xl">Preview</h2>
                <Tag name={previewTagName || "preview"} description={previewTagDescription} onClick={() => setPreviewTagToggled(!previewTagToggled)} style={previewTagToggled ? styleTextToggled : styleText} toggled={previewTagToggled} />
                <Button type="submit">Create Tag</Button>
            </form>
            <h1 className="text-4xl mb-8">All tags</h1>
            <TagGroup tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </div>
    );
}