"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, Suspense } from "react";
import { signIn } from "next-auth/react";
import CallbackRedirector from "@/components/CallbackRedirector";
import { useToast } from "@/hooks/use-toast";
import LoginRegisterLink from "@/components/LoginRegisterLink";

const LoginPage = () => {
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
    });

    if (res?.error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Logged in",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Suspense>
        <CallbackRedirector />
      </Suspense>
      <h1 className="text-2xl mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" placeholder="Email" />
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" placeholder="Password" />
        <Button type="submit">Login</Button>
        <p className="text-center">
          No account?{" "}
          <Suspense>
            <LoginRegisterLink navigateTo="register" />
          </Suspense>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
