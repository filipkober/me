// types/next-auth.d.ts
import { Prisma } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
      admin?: boolean;  // Add the admin field here
      userId?: string;
      coins?: number;
      achievements?: Prisma.UserGetPayload<{ include: Prisma.UserInclude }>["achievements"];
    }
  }

  interface User {
    admin?: boolean;  // Also add it to the User interface if you're using the user object elsewhere
    userId?: string;
    coins?: number;
    achievements?: Prisma.UserGetPayload<{ include: Prisma.UserInclude }>["achievements"];
  }
}