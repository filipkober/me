"use client";

import TextEditor from "@/components/Editor";

export default function TextEditorPage() {
    return (
        <div className="h-screen flex flex-col items-center">
            <h1 className="mt-4 text-5xl mb-4">
                Rich Text Editor
            </h1>
            <p className="mb-4">(you also need to include tailwind and highlight.js styles to make it look the same on your page)</p>
            <div>
                <TextEditor download />
            </div>
        </div>
    );
}