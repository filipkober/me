"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import { getSession, signIn } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();

  getSession().then((session) => {
    if (session) {
      const redirectUrl = searchParams.get("callbackUrl") || "/";
      redirect(redirectUrl);
    }
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", {
      email,
      password,
      redirect: true,
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" placeholder="Email" />
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" placeholder="Password" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
