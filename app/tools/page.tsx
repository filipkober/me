import PrettyLinkBox from "@/components/PrettyLinkBox";

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center px-4 py-16">
            <div className="max-w-2xl w-full">
                <div className="mb-12 text-center">
                    <h1 className="text-6xl font-bold mb-2 gradient-text">
                        Tools
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>
                <PrettyLinkBox
                title={{
                    icon: "📌",
                    content: "Available Tools",
                }}
                links={[
                    {
                        content: "Rich text editor",
                        href: "/tools/editor",
                        icon: "✏️",
                    },
                    {
                        content: "Ciphers",
                        href: "/tools/ciphers",
                        icon: "🔒",
                    },
                ]}
                />
            </div>
        </div>
    );
}