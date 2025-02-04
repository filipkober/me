import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ImagePlus } from 'lucide-react'
import React, { useEffect } from 'react'
import { $createImageNode, ImageNode, ImagePayload } from '../nodes/ImageNode';
import { $createParagraphNode, $insertNodes, $isRootOrShadowRoot, COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement } from '@lexical/utils'

export type InsertImagePayload = Readonly<ImagePayload>;
export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand('INSERT_IMAGE_COMMAND')

const exampleImage: ImagePayload = {
    src: "https://images.unsplash.com/photo-1477511801984-4ad318ed9846?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Lavender flowers",
    width: 300,
    height: 200
};

export default function ImagePlugin() {

    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if(!editor.hasNode(ImageNode)){
            throw new Error('ImagePlugin: ImageNode is not registered')
        }

        return editor.registerCommand(INSERT_IMAGE_COMMAND,
            (payload: InsertImagePayload) => {
                const imageNode = $createImageNode(payload);
                $insertNodes([imageNode]);
                if ($isRootOrShadowRoot(imageNode.getParentOrThrow())){
                    $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
                }

                return true;
            },
            COMMAND_PRIORITY_EDITOR
        )

    }, [editor])

    const insertImage = () => {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, exampleImage);
    }

  return (
    <DropdownMenuItem onClick={insertImage}><ImagePlus /> Image</DropdownMenuItem>
  )
}
