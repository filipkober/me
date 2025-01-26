import { getSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";

export default function CallbackRedirector() {
  const searchParams = useSearchParams();

  getSession().then((session) => {
    if (session) {
      const redirectUrl = searchParams.get("callbackUrl") || "/";
      redirect(redirectUrl);
    }
  });
  return <></>;
}
