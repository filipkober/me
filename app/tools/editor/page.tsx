"use client";

import TextEditor from "@/components/TextEditor";

export default function TextEditorPage() {
    return (
        <div className="h-screen flex flex-col items-center">
            <h1 className="mt-4 text-5xl mb-4">
                Rich Text Editor
            </h1>
            <TextEditor />
        </div>
    );
}