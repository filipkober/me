"use client";

import HomePage from "@/components/HomePage";
import SpecialEffectsWrapper from "@/components/SpecialEffectsWrapper";
import { SessionProvider } from "next-auth/react";

export default function Home() {

  return (
    <SessionProvider>
      <SpecialEffectsWrapper>
        <HomePage />
      </SpecialEffectsWrapper>
    </SessionProvider>
  );
}
