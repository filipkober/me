import { Trophy } from "lucide-react";
import Image from "next/image";

interface Props {
    title?: string;
    description?: string;
    icon?: string;
}

export default function AchievementCard({ title, description, icon }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 border-2 border-[hsl(var(--border))] rounded-xl">
        <div className="w-[200px] h-[200px] border-b-2 border-[hsl(var(--border)) px-4 flex justify-center items-center">
      {icon ? <Image src={icon} alt={title || "achievement"} width={200} height={200} /> : <Trophy size={200} />}
      </div>
      <h2 className="font-bold text-2xl">{title}</h2>
      <p className="max-w-[200px] text-center pb-2">{description}</p>
    </div>
  )
}
