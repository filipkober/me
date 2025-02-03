import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';
import React from 'react'

export default function GenerateHtmlPlugin() {
    const [editor] = useLexicalComposerContext();
    
        const onChange = (editorState: EditorState) => {
            editorState.read(() => {
                console.log($generateHtmlFromNodes(editor));
            })
        }
  return (
    <OnChangePlugin onChange={onChange} />
  )
}
