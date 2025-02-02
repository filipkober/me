"use client";

import { LexicalComposer, InitialConfigType } from "@lexical/react/LexicalComposer"; 
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { EditorThemeClasses } from "lexical";
import GenerateHtmlPlugin from "./editor/GenerateHtmlPlugin";
import EditorToolbar from "./editor/EditorToolbar";

const onError = (error: Error) => {
    console.error("Error in LexicalComposer", error);
}

const theme: EditorThemeClasses = {
    
}

export default function TextEditor() {

    const initialConfig: InitialConfigType = {
        namespace: "text-editor",
        onError,
        theme
    }

    

  return (
    <div className="min-w-[33%] min-h-[30vh] h-max w-max border-[hsl(var(--border))] border-2">
    <LexicalComposer initialConfig={initialConfig}>
        <div className="flex flex-col h-full">
        <EditorToolbar />
        <div className="border-[hsl(var(--border))] relative h-full border-t-2">
        <RichTextPlugin ErrorBoundary={LexicalErrorBoundary} contentEditable={<ContentEditable className="h-full p-2" />} 
        placeholder={
            <div className="absolute pointer-events-none w-max top-2 left-2">Start typing here...</div>
        }
        />
        </div>
        {/* <GenerateHtmlPlugin /> */}
        </div>
    </LexicalComposer>
    </div>
  )
}
