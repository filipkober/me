"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { createAchievement } from "../../actions";
import { Switch } from "@/components/ui/switch";

export default function CreateAchievement() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<Blob>();
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [uniqueTag, setUniqueTag] = useState<string>("");

  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !image) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newAchievement = await createAchievement({
      name,
      description,
      image,
      isPublic,
      uniqueTag
    });
    if (newAchievement) {
      toast({
        title: "Success",
        description: "Achievement created",
      });
      setName("");
      setDescription("");
      setImage(undefined);
    } else {
      toast({
        title: "Error",
        description: "Error creating achievement",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center pt-8">
      <h1 className="text-4xl">Create a new achievement</h1>
      <form className="flex flex-col gap-4 lg:w-1/4 mb-8" onSubmit={onSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            const strippedName = name.replaceAll(" ", "-").replaceAll(/[^a-zA-Z0-9-]/g, "").toLowerCase();
            if(!uniqueTag || uniqueTag === strippedName) {
              setUniqueTag(e.target.value.replaceAll(" ", "-").replaceAll(/[^a-zA-Z0-9-]/g, "").toLowerCase());
            }
          }}
        />
        <Label htmlFor="name">Unique tag (optional)</Label>
        <Input
          type="text"
          id="tag"
          name="tag"
          value={uniqueTag}
          onChange={(e) => setUniqueTag(e.target.value)}
        />
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label htmlFor="image">Image</Label>
        <ImageUpload fileChanged={setImage} image={image} />
        <div className="flex gap-4">
          <Label htmlFor="public" className="my-auto">Public</Label>
          <Switch
            id="public"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
        </div>
        <Button type="submit">Create Achievement</Button>
      </form>
    </div>
  );
}
