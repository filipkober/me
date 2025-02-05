import { $getSelection, LexicalEditor, TextNode } from "lexical";

type ToggledFormats = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  lineThrough: boolean;
};


export const getFormats = (editor: LexicalEditor): ToggledFormats => {
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