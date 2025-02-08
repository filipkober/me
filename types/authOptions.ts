import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import loginSchema from "@/util/schemas/login";
import bcrypt from "bcrypt";
import { prisma } from "@/util/prisma";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { error, data } = loginSchema.safeParse(credentials);
        if (error || !data) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: data.email,
          },
        });

        if (!user) {
          return null;
        }

        const match = await bcrypt.compare(data.password, user.password);

        if (!match) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async session({ session }) {
        if(session.user) {
            const prismaUser = await prisma.user.findFirst({
                where: {
                    email: session.user.email as string,
                },
                include: {
                  achievements: true
                }
            });
            session.user.admin = prismaUser?.admin;
            session.user.userId = prismaUser?.id;
            session.user.name = prismaUser?.name;
            session.user.coins = prismaUser?.coins;
            session.user.achievements = prismaUser?.achievements;
        }
        return session;
    }
  }
};

export { authOptions };