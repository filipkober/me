import { Button } from '@/components/ui/button';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react'

import {copyScript} from '@/util/editor/copyScript';
const INJECTED_SCRIPTS: string[] = [copyScript];

export default function GenerateHtmlPlugin({setHtml = () => {}, download = false}: {setHtml?: (v: string) => void, download?: boolean}) {
    const [editor] = useLexicalComposerContext();
    
        const onClick = () => {
            editor.read(() => {
              let html = $generateHtmlFromNodes(editor);

              INJECTED_SCRIPTS.forEach(script => {
                html += `<script>${script}</script>`;
              });

              setHtml(html);

              if(!download) return;

              const blob = new Blob([html], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'document.html';
              a.click();
              URL.revokeObjectURL(url);
            })
        }
  return (
    <div className='mt-4 w-full flex justify-end'>
    <Button onClick={onClick}>Generate HTML</Button>
    </div>
  )
}
