"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem } from "../../ui/select";
import { $getSelection, $createParagraphNode, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $isHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { useEffect, useState } from "react";

const isHeadingTagType = (tag: string): tag is HeadingTagType => {
    return ["h1", "h2", "h3"].includes(tag);
}

export default function HeadingPlugin() {

    const [editor] = useLexicalComposerContext();

    const [selectValue, setSelectValue] = useState("p");

    const onChange = (v: string) => {
        setSelectValue(v);
        editor.update(() => {
            const selection = $getSelection();
            if(v === "p") {
                $setBlocksType(selection, () => $createParagraphNode());
            } else if (isHeadingTagType(v)) {
                $setBlocksType(selection, () => $createHeadingNode(v))
            }
        })
    }

    useEffect(() => {
        return editor.registerUpdateListener(() => {
            editor.read(() => {
                const selection = $getSelection();
                if($isRangeSelection(selection)) {
                    let tag = "p";
                    const anchorNode = selection.anchor.getNode();
                    const focusNode = selection.focus.getNode();
                    const ancestor = anchorNode.getCommonAncestor(focusNode);

                    if($isHeadingNode(ancestor)) tag = ancestor.getTag();
                    
                    setSelectValue(tag);
                }
            })
        })
    }, [editor])

  return (
    <Select defaultValue="p" onValueChange={onChange} value={selectValue}>
        <SelectTrigger className="w-32">
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Paragraph type</SelectLabel>
                <SelectItem value="h1">Heading 1</SelectItem>
                <SelectItem value="h2">Heading 2</SelectItem>
                <SelectItem value="h3">Heading 3</SelectItem>
                <SelectItem value="p" defaultChecked>Paragraph</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}
