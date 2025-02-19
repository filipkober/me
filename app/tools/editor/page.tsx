"use client";

import TextEditor from "@/components/Editor";
import { useEffect, useState } from "react";

export default function TextEditorPage() {

    const [screenWide, setScreenWide] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 1024) {
            setScreenWide(true);
        }
    }, []);

    return (
        <div className="h-screen flex flex-col items-center w-max lg:w-screen">
            <h1 className="mt-4 text-5xl mb-4">
                Rich Text Editor
            </h1>
            {!screenWide && <p className="mb-4 text-red-600">Warning: this page is not designed to work on mobile devices</p>}
            <p className="mb-4">(you also need to include tailwind and highlight.js styles to make it look the same on your page)</p>
            <div>
                <TextEditor download />
            </div>
        </div>
    );
}