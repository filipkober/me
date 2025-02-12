"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const LogoutPage = () => {
  useEffect(() => {
    const logout = async () => {
      await signOut({ redirect: false });
      redirect("/");
    };

    logout();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-8">Logging out...</h1>
    </div>
  );
};

export default LogoutPage;
