import "@/styles/Blog.css"
import "highlight.js/styles/night-owl.css";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="container lg:max-w-[60%] xl:max-w-[45%] 2xl:max-w[30%] mx-auto px-4 pt-4">
            {children}
        </section>
    );
}