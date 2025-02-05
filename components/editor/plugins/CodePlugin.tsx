import { $createParagraphNode, $insertNodes, $isRootOrShadowRoot, COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from "lexical";
import { $createCodeNode, CodeNode, CodePayload } from "../nodes/CodeNode"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $wrapNodeInElement } from "@lexical/utils";

export type InsertCodePayload = Readonly<CodePayload>;
export const INSERT_CODE_COMMAND: LexicalCommand<InsertCodePayload> = createCommand('INSERT_CODE_COMMAND')

export default function CodePlugin() {

    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        if(!editor.hasNode(CodeNode)){
            throw new Error('CodePlugin: CodeNode is not registered')
        }

        return editor.registerCommand(INSERT_CODE_COMMAND,
            (payload: InsertCodePayload) => {
                const codeNode = $createCodeNode(payload);
                $insertNodes([codeNode]);
                if ($isRootOrShadowRoot(codeNode.getParentOrThrow())){
                    $wrapNodeInElement(codeNode, $createParagraphNode).selectEnd();
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
