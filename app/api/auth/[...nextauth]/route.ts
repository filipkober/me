import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
import loginSchema from "@/util/schemas/login"
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: "Email", type: "email" },
            password: {  label: "Password", type: "password" }
        },
        async authorize(credentials) {
            const { error, data } = loginSchema.safeParse(credentials);
            if (error || !data) {
                return null;
            }

            const user = await prisma.user.findFirst({
                where: {
                    email: data.email
                }
            });

            if (!user) {
                return null;
            }

            const match = await bcrypt.compare(data.password, user.password);

            if (!match) {
                return null;
            }

            return user;
        }
    })
  ],
  pages: {
    signIn: "/admin/login"
  }
})

export { handler as GET, handler as POST }