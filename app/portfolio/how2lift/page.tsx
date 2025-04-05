import Link from "next/link";
import Image from "next/image";
import github from "@/public/github.svg"
import typeScriptLogo from "@/public/typescript.svg";
import postgresLogo from "@/public/postgresql.svg";
import reactLogo from "@/public/react.svg";
import expoLogo from "@/public/expo.svg";
import springBootLogo from "@/public/springboot.svg";
import tailwindLogo from "@/public/tailwindcss.svg";
import openaiLogo from "@/public/openai.svg";
import nginxLogo from "@/public/nginx.svg";
import ffmpegLogo from "@/public/ffmpeg.svg";
import oracleLogo from "@/public/oracle.svg";

export default function How2Lift() {
    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <div className="w-full py-10 flex flex-col items-center gap-2 bg-gradient-to-r from-black to-gray-950">
                <h1 className="text-5xl font-bold text-gray-100">How2Lift</h1>
                <p className="text-xl text-gray-300">An AI-powered weightlifting atlas</p>
            </div>
            
            <div className="flex flex-col items-center gap-8 p-8 max-w-[80vw] md:max-w-[60vw] lg:max-w-[40vw] bg-gray-950 rounded-lg shadow-md border border-gray-700">
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">The motivation</h2>
                    <p className="text-gray-300 mb-4">As a final project for school, we as students were tasked with making any project in a group. I gathered my friends and since working out is a passion of ours, we decided to create this application to help others.</p>
                    <p className="text-gray-300 mb-2">Our team composition and roles:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-300">
                        <li><Link className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" href="https://github.com/filipkober" target="_blank">Filip Kober (me)</Link> - Lead Developer, Project Manager</li>
                        <li><Link className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" href="https://github.com/jedrzejewskidamian" target="_blank">Damian Jędrzejewski</Link> - Developer</li>
                        <li><Link className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" href="https://github.com/MaciejPiekarczyk" target="_blank">Maciej Piekarczyk</Link> - Developer</li>
                        <li><Link className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" href="https://github.com/oliwierkwiatkowski" target="_blank">Oliwier Kwiatkowski</Link> - Designer</li>
                    </ul>
                </section>
                
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Phases of Development</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-200">Phase 1 - Planning</h3>
                            <p className="text-gray-300">We started with a brainstorming session, where we discussed the features we wanted to implement. We came up with a <Link className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" href="https://docs.google.com/document/d/1G76jUE-FqkEd1gBsUA-vmTQ5SDaIGExxsysCjLDXRVg/edit?usp=sharing" target="_blank">document (in Polish)</Link> outlining our ideas, tasks and technologies. At this point we also created a backlog on <Link className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" href="https://trello.com/b/MYxdcBnR/backlog" target="_blank">Trello</Link>.</p>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold text-gray-200">Phase 2 - Design</h3>
                            <p className="text-gray-300">Before designing the actual app, we picked a color scheme, fonts, and icons we would use in the app. We laid them all out in a system design page on Figma. Then we proceeded to create wireframes and prototypes to visualize the user experience.</p>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold text-gray-200">Phase 3 - Development</h3>
                            <p className="text-gray-300">After finalizing the design, we began the development phase, where we implemented the features outlined in our document. From then on, the development process consisted of picking tasks and assigning them to team members based on their strengths and expertise.</p>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold text-gray-200">Phase 4 - Testing</h3>
                            <p className="text-gray-300">In this phase, we conducted thorough testing of the application to ensure all features worked as intended and to identify any bugs that needed fixing.</p>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold text-gray-200">Phase 5 - Presentation</h3>
                            <p className="text-gray-300">With the application being complete, we prepared a presentation to showcase our work and demonstrate the features of the app.</p>
                        </div>
                    </div>
                </section>
                
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Technologies Used</h2>
                    <p className="text-gray-300 mb-4">We used the following technologies to build the application:</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-750 bg-opacity-50 p-4 rounded-md border border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-200 mb-3">Frontend</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <Image src={reactLogo} alt="React" className="w-6 h-6" />
                                    <span>React Native</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <Image src={expoLogo} alt="Expo" className="w-6 h-6" />
                                    <span>Expo</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <Image src={typeScriptLogo} alt="TypeScript" className="w-6 h-6" />
                                    <span>TypeScript</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <Image src={tailwindLogo} alt="Tailwind CSS" className="w-6 h-6" />
                                    <span>Tailwind CSS (NativeWind)</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-gray-750 bg-opacity-50 p-4 rounded-md border border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-200 mb-3">Backend</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <Image src={springBootLogo} alt="Spring Boot" className="w-6 h-6" />
                                    <span>Java Spring Boot</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <Image src={postgresLogo} alt="PostgreSQL" className="w-6 h-6" />
                                    <span>PostgreSQL</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <Image src={openaiLogo} alt="OpenAI" className="w-6 h-6" />
                                    <span>Spring AI + OpenAI</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <Image src={ffmpegLogo} alt="FFmpeg" className="w-6 h-6" />
                                    <span>FFmpeg</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-gray-750 bg-opacity-50 p-4 rounded-md border border-gray-700 md:col-span-2">
                            <h3 className="text-2xl font-bold text-gray-200 mb-3">Deployment</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <Image src={oracleLogo} alt="Oracle Cloud VPS" width={24} className="w-6 h-6" />
                                    <span>Oracle Cloud VPS</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <Image src={nginxLogo} alt="NGINX" className="w-6 h-6" />
                                    <span>NGINX</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">My involvement</h2>
                    <p className="text-gray-300">As the lead developer, I was responsible for overseeing the development process and ensuring that the project stayed on track. I also took on the role of project manager, coordinating tasks and managing the team. In addition to my managerial duties, I also majorly contributed to the development of the application. I was responsible for the whole backend development, including API design and database management. A significant part of the frontend was also implemented by me. Finally, all of the hosting and deployment was handled by me.</p>
                </section>
                
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Gallery</h2>
                    <div className="space-y-6">
                        <div>
                            <p className="text-gray-300 mb-2">A short demonstration of the application</p>
                            <video className="h-96 rounded-md shadow-md border border-gray-600 mx-auto" controls>
                                <source src="/how2lift1.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        
                        <div>
                            <p className="text-gray-300 mb-2">Another demonstration of the application</p>
                            <video className="h-96 rounded-md shadow-md border border-gray-600 mx-auto" controls>
                                <source src="/how2lift2.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </section>
                
                <section className="w-full">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Links</h2>
                    <p className="text-gray-300 mb-2">Here are some links to the project:</p>
                    <ul className="space-y-2">
                        <li>
                            <Link href="https://github.com/filipkober/How2Lift" target="_blank" 
                                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group">
                                <span className="group-hover:underline">GitHub Repository</span>
                                <Image src={github} alt="GitHub" className="w-5 h-5" />
                            </Link>
                        </li>
                        <li>
                            <Link className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" 
                                  href="https://docs.google.com/document/d/1G76jUE-FqkEd1gBsUA-vmTQ5SDaIGExxsysCjLDXRVg/edit?usp=sharing" 
                                  target="_blank">
                                Documentation (in Polish)
                            </Link>
                        </li>
                        <li>
                            <Link className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" 
                                  href="https://docs.google.com/presentation/d/1xJLhAiBYqIGHGknRBcKNNIKoE8ZirWvtzHjjYTfj5ns/edit?usp=sharing" 
                                  target="_blank">
                                The presentation
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}