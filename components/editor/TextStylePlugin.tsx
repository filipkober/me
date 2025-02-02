import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  TextFormatType,
} from "lexical";
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { TextNode } from "lexical";
import { splitSelection } from "@/util/editor/selection";

const baseButtonClass = "bg-gray-600 aspect-square rounded-xl";

type ToggledFormats = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  lineThrough: boolean;
};

export default function TextStylePlugin() {
  const [editor] = useLexicalComposerContext();

  const [boldToggled, setBoldToggled] = useState(false);
  const [italicToggled, setItalicToggled] = useState(false);
  const [underlineToggled, setUnderlineToggled] = useState(false);
  const [lineThroughToggled, setLineThroughToggled] = useState(false);

  const boldClassName = cn(baseButtonClass, {
    "font-bold": true,
    "bg-primary": boldToggled,
  });
  const italicClassName = cn(baseButtonClass, {
    italic: true,
    "bg-primary": italicToggled,
  });
  const underlineClassName = cn(baseButtonClass, {
    underline: true,
    "bg-primary": underlineToggled,
  });
  const lineThroughClassName = cn(baseButtonClass, {
    "line-through": true,
    "bg-primary": lineThroughToggled,
  });

  const getFormats = (editor: LexicalEditor): ToggledFormats => {
    const formats: ToggledFormats = {
      bold: false,
      italic: false,
      underline: false,
      lineThrough: false,
    };
    editor.read(() => {
      const selection = $getSelection();
      selection?.getNodes().forEach((node) => {
        if (node instanceof TextNode) {
          if (node.hasFormat("bold")) {
            formats.bold = true;
          }
          if (node.hasFormat("italic")) {
            formats.italic = true;
          }
          if (node.hasFormat("underline")) {
            formats.underline = true;
          }
          if (node.hasFormat("strikethrough")) {
            formats.lineThrough = true;
          }
        }
      });
    });
    return formats;
  };
  const toggleSelectedFormat = (format: TextFormatType) => {
    switch (format) {
      case "bold":
        setBoldToggled(!boldToggled);
        break;
      case "italic":
        setItalicToggled(!italicToggled);
        break;
      case "underline":
        setUnderlineToggled(!underlineToggled);
        break;
      case "strikethrough":
        setLineThroughToggled(!lineThroughToggled);
        break;
    }

    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="flex gap-2">
      <Button
        className={boldClassName}
        onClick={() => toggleSelectedFormat("bold")}
      >
        b
      </Button>
      <Button
        className={italicClassName}
        onClick={() => toggleSelectedFormat("italic")}
      >
        i
      </Button>
      <Button
        className={underlineClassName}
        onClick={() => toggleSelectedFormat("underline")}
      >
        u
      </Button>
      <Button
        className={lineThroughClassName}
        onClick={() => toggleSelectedFormat("strikethrough")}
      >
        s
      </Button>
      {/* <OnChangePlugin onChange={onChange} /> */}
    </div>
  );
}
