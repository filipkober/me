"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    if (window) {
      setTimeout(() => {
        signOut();
        redirect("/");
      }, 1000);
    }
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <h1 className="text-2xl">Logging out...</h1>
    </div>
  );
}
