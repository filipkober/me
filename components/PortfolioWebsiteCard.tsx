import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Props {
  image: StaticImageData;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}
export default function PortfolioWebsiteCard({
  image,
  title,
  description,
  technologies,
  link,
}: Props) {
  return (
    <Link href={link} className="group">
      <div className="h-full border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title + " screenshot"}
            priority
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={200}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <p className="text-white mb-auto">{description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-950 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
