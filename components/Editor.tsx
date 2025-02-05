"use client";

import { LexicalComposer, InitialConfigType } from "@lexical/react/LexicalComposer"; 
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { EditorThemeClasses } from "lexical";
import EditorToolbar from "./editor/EditorToolbar";
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";

import "@/styles/Blog.css"
import { ImageNode } from "./editor/nodes/ImageNode";
import { CodeNode } from "./editor/nodes/CodeNode";
import GenerateHtmlPlugin from "./editor/plugins/GenerateHtmlPlugin";

const onError = (error: Error) => {
    console.error("Error in LexicalComposer", error);
}

const theme: EditorThemeClasses = {
    text: {
        strikethrough: "line-through",
        underline: "underline",
    },
    list: {
        listitem: "list-inside",
        ol: "list-decimal",
        ul: "list-bullet",
        checklist: "list-image-[--checkmark]",
    }
}

export default function TextEditor({setHtml = () => {}, download = false}: {setHtml?: (v: string) => void, download?: boolean}) {

    const initialConfig: InitialConfigType = {
        namespace: "text-editor",
        onError,
        theme,
        nodes: [HeadingNode, ListNode, ListItemNode, ImageNode, CodeNode]
    }

  return (
    <div className="min-w-[33%] min-h-[30vh] w-full">
    <LexicalComposer initialConfig={initialConfig}>
        <div className="flex flex-col h-full border-[hsl(var(--border))] border-2 min-h-[45vh]">
        <EditorToolbar />
        <div className="border-[hsl(var(--border))] relative h-full border-t-2 grow flex flex-col">
        <RichTextPlugin ErrorBoundary={LexicalErrorBoundary} contentEditable={<ContentEditable className="h-full grow p-2" />} 
        placeholder={
            <div className="absolute pointer-events-none w-max top-2 left-2">Start typing here...</div>
        }
        />
        </div>
        </div>
        <GenerateHtmlPlugin setHtml={setHtml} download={download} />
    </LexicalComposer>
    </div>
  )
}
