import Boids from "@/components/Boids";
import Link from "next/link";

export default function Home() {

  return (
    <div className="w-screen h-screen relative p-16">
      <h1 className="text-6xl text-center mb-32">Filip Kober</h1>
      <div className="grid columns-3">
      <div className="col-start-1 flex justify-center flex-col gap-64 relative">
        <Link href={'./about'}><h1 className="text-4xl font-bold text-right relative left-64">About Me</h1></Link>
        <h1 className="text-4xl font-bold text-right relative left-24 cursor-not-allowed">Blog</h1>
        <h1 className="text-4xl font-bold text-right relative left-64 cursor-not-allowed">Portfolio</h1>
      </div>
      <div className="flex justify-center items-center col-start-2">
        <Boids />
      </div>
      <div className="col-start-3 flex justify-center flex-col gap-64">
        <h1 className="text-4xl font-bold text-left relative right-64 cursor-not-allowed">Fun</h1>
        <h1 className="text-4xl font-bold text-left relative right-24 cursor-not-allowed">Tools</h1>
        <h1 className="text-4xl font-bold text-left relative right-64 cursor-not-allowed">Secrets</h1>
      </div>
    </div>
    </div>
  );
}
