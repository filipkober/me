"use client";
import { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor-dark-mode.css";
import draftToHtml from "draftjs-to-html";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const previewRef = useRef<HTMLDivElement>(null);

  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  return (
    <div className="w-screen h-screen flex items-center mt-8 flex-col">
      <div className="container my-4">
        <h1 className="text-center font-bold text-4xl mb-4">New Blog Post</h1>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbarClassName="text-black"
          editorClassName="border border-gray-300 p-4"
        />
      </div>
      <div className="container">
        <h1 className="text-center font-bold text-4xl mb-4">Preview</h1>
        <div
          ref={previewRef}
          dangerouslySetInnerHTML={{ __html: html }}
          className="border border-gray-300 p-4"
        />
        <Button onClick={() => console.log(html)} className="mt-4">Publish</Button>
      </div>
    </div>
  );
}
