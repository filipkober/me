import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  navigateTo: "login" | "register";
}
export default function LoginRegisterLink({ navigateTo }: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <Link
      href={
        callbackUrl
          ? `/account/${navigateTo}?callbackUrl=${callbackUrl}`
          : `/account/${navigateTo}`
      }
      className="text-blue-600 underline"
    >
      {navigateTo === "login" ? "Log in" : "Sign up"}
    </Link>
  );
}
