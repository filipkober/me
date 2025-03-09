"use client";

import { SpecialEffectsProvider } from "./SpecialEffectsProvider";

export default function SpecialEffectsWrapper({ children }: { children: React.ReactNode }) {
    return <SpecialEffectsProvider>{children}</SpecialEffectsProvider>;
}
