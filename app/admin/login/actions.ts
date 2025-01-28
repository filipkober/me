"use server";

import { authOptions } from "@/types/authOptions";
import { getServerSession } from "next-auth/next";

export const isAdmin = async () => {
    const session = await getServerSession(authOptions);
    return session?.user.admin ?? false;
}