import AchievementCard from "@/components/AchievementCard";
import { authOptions } from "@/types/authOptions";
import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const achievementCount = await prisma.achievement.count();

  if (!session || !session.user) return redirect("/");

  const userAchievementCount = session.user.achievements?.length || 0;

  return (
    <div className="w-screen h-screen flex flex-col items-center gap-2">
      <h1 className="text-5xl font-bold my-4">Secrets Page</h1>
      <p className="text-2xl flex gap-2">Your coins: {session.user.coins} <Image src="/coin.gif" alt="Coin" width={22} height={22} className="w-[22px] h-[22px] my-auto" /></p>
      <p className="text-2xl">Your achievements:</p>
      <div className="flex flex-row gap-4 w-[80%] mt-4 justify-center">
        {session.user.achievements?.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            title={achievement.name}
            description={achievement.description}
            icon={achievement.image}
          />
        ))}
        {Array.from({ length: achievementCount - userAchievementCount}).map(
          (_, index) => (
            <AchievementCard key={index} title="???" description="???" />
          )
        )}
      </div>
    </div>
  );
}
