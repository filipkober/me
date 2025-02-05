import { Button } from '@/components/ui/button';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react'

export default function GenerateHtmlPlugin({setHtml = () => {}, download = false}: {setHtml?: (v: string) => void, download?: boolean}) {
    const [editor] = useLexicalComposerContext();
    
        const onClick = () => {
            editor.read(() => {
              const html = $generateHtmlFromNodes(editor);
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
