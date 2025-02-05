"use client";

import { AlignCenter, AlignJustify, AlignRight, AlignLeft } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, ElementFormatType, FORMAT_ELEMENT_COMMAND } from "lexical";
import { useEffect, useState } from "react";

const triggerClassName = "h-9 px-2 min-w-9 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"

const isElementFormatType = (format: string): format is ElementFormatType => {
    return ["left", "start", "end", "center", "right", "justify"].includes(format);
}

export default function AlignPlugin() {

    const [editor] = useLexicalComposerContext();

    const [alignValue, setAlignValue] = useState("left");

    const onValueChange = (value: string) => {

        setAlignValue(value);

        if(isElementFormatType(value))
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value);
    }

    useEffect(() => {
        return editor.registerUpdateListener(() => {
            editor.read(() => {
                const selection = $getSelection();
                if($isRangeSelection(selection)) {
                    const element = selection.anchor.getNode().getTopLevelElementOrThrow();
                    setAlignValue(element.getFormatType());
                }
            })
        })
    }, [editor])

    let icon = <AlignLeft />;
    switch(alignValue) {
        case "left":
            icon = <AlignLeft />;
            break;
        case "center":
            icon = <AlignCenter />;
            break;
        case "right":
            icon = <AlignRight />;
            break;
        case "justify":
            icon = <AlignJustify />;
            break;
    }

  return (
    <Popover>
        <PopoverTrigger><div className={triggerClassName}>{icon}</div></PopoverTrigger>
        <PopoverContent>
            <ToggleGroup type="single" onValueChange={onValueChange} value={alignValue} >
                <ToggleGroupItem value={"left"} variant={"outline"}><AlignLeft /></ToggleGroupItem>
                <ToggleGroupItem value={"center"} variant={"outline"}><AlignCenter /></ToggleGroupItem>
                <ToggleGroupItem value={"right"} variant={"outline"}><AlignRight /></ToggleGroupItem>
                <ToggleGroupItem value={"justify"} variant={"outline"}><AlignJustify /></ToggleGroupItem>
            </ToggleGroup>
        </PopoverContent>
    </Popover>
  )
}
