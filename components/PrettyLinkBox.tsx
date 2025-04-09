import Link from "next/link";
import React from "react";

interface Props {
  links: {
    content: React.ReactNode | React.ReactNode[] | string | string[];
    href: string;
    icon?: React.ReactNode | React.ReactNode[] | string | string[];
  }[];
  className?: string;
  title: {
    content: React.ReactNode | React.ReactNode[] | string | string[];
    icon?: React.ReactNode | React.ReactNode[] | string | string[];
  };
}
export default function PrettyLinkBox({ links, className, title }: Props) {
  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700 ${className}`}
    >
      <h2 className="text-3xl font-semibold mb-6 flex items-center">
        <span className="mr-2">{title.icon}</span> {title.content}
      </h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li
            key={link.href}
            className="transition-all duration-300 hover:translate-x-2"
          >
            <Link
              href={link.href}
              className="flex items-center text-xl text-blue-400 hover:text-blue-300 group"
            >
              <span className="w-8 h-8 mr-3 rounded-lg flex items-center justify-center transition-all">
                {link.icon}
              </span>
              {link.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
