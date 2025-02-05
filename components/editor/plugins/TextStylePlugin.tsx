import React, { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from "lexical";
import { Toggle } from "../../ui/toggle";
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'

export default function TextStylePlugin() {
  const [editor] = useLexicalComposerContext();

  const [boldToggled, setBoldToggled] = useState(false);
  const [italicToggled, setItalicToggled] = useState(false);
  const [underlineToggled, setUnderlineToggled] = useState(false);
  const [lineThroughToggled, setLineThroughToggled] = useState(false);

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

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.read(() => {
        const selection = $getSelection();
        if($isRangeSelection(selection)) {
          setBoldToggled(selection.hasFormat("bold"));
          setItalicToggled(selection.hasFormat("italic"));
          setUnderlineToggled(selection.hasFormat("underline"));
          setLineThroughToggled(selection.hasFormat("strikethrough"));
        }
      })
    })
  }, [editor])

  return (
    <div className="flex w-fit shrink-0 border-[1px]">
      <Toggle
        className={"font-bold"}
        onClick={() => toggleSelectedFormat("bold")}
        pressed={boldToggled}
      >
        b
      </Toggle>
      <Toggle
        className={"italic"}
        onClick={() => toggleSelectedFormat("italic")}
        pressed={italicToggled}
      >
        i
      </Toggle>
      <Toggle
        className={"underline"}
        onClick={() => toggleSelectedFormat("underline")}
        pressed={underlineToggled}
      >
        u
      </Toggle>
      <Toggle
        className={"line-through"}
        onClick={() => toggleSelectedFormat("strikethrough")}
        pressed={lineThroughToggled}

      >
        s
      </Toggle>
      {/* <OnChangePlugin onChange={onChange} /> */}
    </div>
  );
}
