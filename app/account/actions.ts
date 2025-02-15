"use server";

import bcrypt from 'bcrypt';
import { prisma } from "@/util/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/types/authOptions';
import { Prisma } from '@prisma/client';

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

export const getCurrentUser = async (include?: Prisma.UserInclude): Promise<Prisma.UserGetPayload<{ include: Prisma.UserInclude }> | null> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include,
    });
    return user as Prisma.UserGetPayload<{ include: Prisma.UserInclude }>;
  } catch (error) {
    console.error("Error retrieving current user:", error);
    return null;
  }

}

export const awardPublicAchievement = async (achievementId: string) => {
  const user = await getCurrentUser({achievements: true});
  if (!user) return null;

  const achievementIdIs12Bytes = /^[0-9a-fA-F]{24}$/.test(achievementId);

  const achievement = await prisma.achievement.findFirst({
    where: {
      id: achievementIdIs12Bytes ? achievementId : undefined,
      unique_tag: achievementIdIs12Bytes ? undefined : achievementId,
      public: true
    },
    select: { id: true, name: true }
  });
  if (!achievement) return null;

  try {
    await prisma.user.update({
      where: {email: user.email},
      data: {
        achievements: {
          connect: [{id: achievement.id}]
        }
      },
      include: {achievements: true}
    });
    return achievement;
  } catch (error) {
    console.error("Error awarding public achievement:", error);
    return null;
  }
};