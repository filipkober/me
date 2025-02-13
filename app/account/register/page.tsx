"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, Suspense } from "react";
import CallbackRedirector from "@/components/CallbackRedirector";
import { register } from "../actions";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const registerSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const username = formData.get("username") as string;

    const data = {
      email,
      password,
      confirmPassword,
      username,
    };

    const result = registerSchema.safeParse(data);
    if (!result.success) {
      toast({
        title: "Error",
        description: "Invalid input",
        variant: "destructive",
      });
      return;
    }

    const user = await register(email, password, username);
    if (user) {
      toast({
        title: "Success",
        description: "Registration successful, logging in...",
      });

      toast({
        title: "Success",
        description: "Registration successful, logging in...",
      });

      setTimeout(async () => {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      }, 1000);
    } else {
      toast({
        title: "Error",
        description: "Registration failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Suspense>
        <CallbackRedirector />
      </Suspense>
      <h1 className="text-2xl mb-8">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="username">Username</Label>
        <Input type="text" name="username" placeholder="Name" />
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" placeholder="Email" />
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" placeholder="Password" />
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
        />
        <Button type="submit">Register</Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link
            href={
              callbackUrl
                ? `/account/login?callbackUrl=${callbackUrl}`
                : "/account/login"
            }
            className="text-blue-600 underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
