import React, { useEffect } from 'react'
import { $createImageNode, ImageNode, ImagePayload } from '../nodes/ImageNode';
import { $createParagraphNode, $insertNodes, $isRootOrShadowRoot, COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement } from '@lexical/utils'

export type InsertImagePayload = Readonly<ImagePayload>;
export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand('INSERT_IMAGE_COMMAND')

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

  return (
    <></>
  )
}
