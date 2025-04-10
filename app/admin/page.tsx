import PrettyLinkBox from "@/components/PrettyLinkBox";

export default function AdminPage() {
    return (
        <div className="w-screen flex items-center pt-8 flex-col gap-2">
            <h1 className="font-bold text-5xl gradient-text pb-2">Admin Page</h1>

            <PrettyLinkBox
                title={{
                    icon: "⚙️",
                    content: "Admin tools",
                }}
                links={[
                    {
                        content: "Create a new blog post",
                        href: "/admin/blog/post/new",
                        icon: "📝",
                    },
                    {
                        content: "Create a new tag",
                        href: "/admin/blog/tag/new",
                        icon: "🏷️",
                    },
                    {
                        content: "Create a new achievement",
                        href: "/admin/account/achievements/new",
                        icon: "🏆",
                    },
                ]}
                className="mt-6"
            />
        </div>
    );
}