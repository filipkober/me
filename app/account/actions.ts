"use server";

import bcrypt from 'bcrypt';
import { prisma } from "@/util/prisma";

export const register = async (email: string, password: string, name: string) => {

    const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          admin: false,
        },
      });
    
      return user;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }     
};