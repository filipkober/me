import { RangeSelection, TextNode } from "lexical";

export const splitSelection = (selection: RangeSelection): boolean => {
  const selectedNodes = selection.getNodes();
  if (selectedNodes.length === 0) return false;

  const firstNode = selectedNodes[0];
  const lastNode = selectedNodes[selectedNodes.length - 1];
  let didSplit = false;

  selectedNodes.forEach((node) => {
    if (!node || !(node instanceof TextNode)) return false;

    const fullText = node.getTextContent();
    let nodeStart = 0;
    let nodeEnd = fullText.length;

    if (node === firstNode) {
      nodeStart =
        node.getKey() === selection.anchor.key
          ? selection.anchor.offset
          : selection.focus.offset;
    }

    if (node === lastNode) {
      nodeEnd =
        node.getKey() === selection.focus.key
          ? selection.focus.offset
          : selection.anchor.offset;
    }
    if (nodeStart !== 0 || nodeEnd !== fullText.length) {
      if (nodeEnd < fullText.length) {
        node.splitText(nodeEnd);
        didSplit = true;
      }
      if (nodeStart > 0) {
        node.splitText(nodeStart);
        didSplit = true;
      }
    }
  });
  return didSplit;
};
