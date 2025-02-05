"use server";

import { PostImageResponse } from "@/types/Imgur";

export const uploadImage = async ({
    image,
    title,
    description,
  }: {
    image: Blob;
    title: string;
    description: string;
  }): Promise<PostImageResponse> => {
    const headers = new Headers();
    headers.append("Authorization", `Client-ID ${process.env.IMGUR_CLIENT_ID}`);
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
  
    const requestOptions: RequestInit = {
      method: "POST",
      headers,
      body: formData,
      redirect: "follow",
    };
  
    const response = await fetch("https://api.imgur.com/3/image", requestOptions);
    const data: PostImageResponse = await response.json();
    return data;
  };