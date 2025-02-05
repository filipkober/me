import { DecoratorNode, DOMConversionMap, DOMConversionOutput, LexicalUpdateJSON, SerializedLexicalNode, Spread } from "lexical";
import { JSX } from "react";
import CodeNodeComponent from "./CodeNodeComponent";
import hljs from 'highlight.js';

export type SerializedCodeNode = Spread<{
    lines: string[];
    language: string;
    canCopy: boolean;
    showLineNumbers: boolean;
}, SerializedLexicalNode>;

function $convertCodeElement(domNode: Node): null | DOMConversionOutput {
    const pre = domNode as HTMLPreElement;
    const code = pre.firstElementChild as HTMLSpanElement;
    const lines = Array.from(code.children).map((line) => {
        const div = line as HTMLDivElement;
        return div.lastElementChild?.textContent ?? "";
    });
    const language = code.className;
    const canCopy = pre.className.includes("can-copy");
    const showLineNumbers = pre.className.includes("show-line-numbers");
    const node = $createCodeNode({ lines, language, canCopy, showLineNumbers });
    return { node };
}

export class CodeNode extends DecoratorNode<JSX.Element> {
    __lines: string[];
    __language: string;
    __canCopy: boolean;
    __showLineNumbers: boolean;

    constructor(lines: string[], language: string, canCopy: boolean, showLineNumbers: boolean, key?: string) {
        super(key);
        this.__lines = lines;
        this.__language = language;
        this.__canCopy = canCopy;
        this.__showLineNumbers = showLineNumbers;
    }

    decorate() {
        return (
            <CodeNodeComponent canCopy={this.__canCopy} language={this.__language} lines={this.__lines} showLineNumbers={this.__showLineNumbers} />
        );
    }

    createDOM() {
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        pre.appendChild(code);
        return pre;
    }

    exportDOM() {
        const div = document.createElement("div");
        div.classList.add("relative");
        div.classList.add("hljs");
        div.classList.add("pl-2");
        div.classList.add("w-fit");
        div.classList.add("pr-24");
        div.classList.add("max-w-full");

        const pre = document.createElement("pre");
        div.appendChild(pre);

        const code = document.createElement("code");
        pre.appendChild(code);

        this.__lines.forEach((line, i) => {
            const div = document.createElement("div");
            const element = hljs.highlight(line, { language: this.__language });
            div.innerHTML = `<div class='flex flex-row gap-2'>${this.__showLineNumbers && `<span class='select-none'>${i + 1}</span>`}<div>${element.value}</div></div>`;
            code.appendChild(div);
        });

        if (this.__canCopy) {
            const button = document.createElement("button");
            button.classList.add("absolute");
            button.classList.add("top-2");
            button.classList.add("right-2");
            button.classList.add("aspect-square");
            button.classList.add("bg-transparent");
            button.addEventListener("click", () => {
                navigator.clipboard.writeText(this.__lines.join('\n'));
            });
            code.appendChild(button);
        }

        return { element: div };

    }

    static importDOM(): DOMConversionMap | null {
        return {
            pre: (node: Node) => ({
                conversion: () => $convertCodeElement(node),
                priority: 0
            })
        };
    }

    updateDOM(): false {
        return false;
    }



    static getType(): string {
        return "code";
    }

    static clone(node: CodeNode): CodeNode {
        return new CodeNode([...node.__lines], node.__language, node.__canCopy, node.__showLineNumbers, node.__key);
    }

    static importJSON(_serializedNode: SerializedCodeNode): CodeNode {
        const { lines, language, canCopy, showLineNumbers } = _serializedNode;
        return $createCodeNode({ lines, language, canCopy, showLineNumbers }).updateFromJSON(_serializedNode);
    }

    updateFromJSON(serializedNode: LexicalUpdateJSON<SerializedCodeNode>): this {
        const node = super.updateFromJSON(serializedNode);
        return node;
    }

    getLines() {
        const self = this.getLatest();
        return self.__lines;
    }
    getLanguage() {
        const self = this.getLatest();
        return self.__language;
    }
    getCanCopy() {
        const self = this.getLatest();
        return self.__canCopy;
    }
    getShowLineNumbers() {
        const self = this.getLatest();
        return self.__showLineNumbers;
    }

    setLines(lines: string[]) {
        const self = this.getWritable();
        self.__lines = lines;
    }
    setLanguage(language: string) {
        const self = this.getWritable();
        self.__language = language;
    }
    setCanCopy(canCopy: boolean) {
        const self = this.getWritable();
        self.__canCopy = canCopy;
    }
    setShowLineNumbers(showLineNumbers: boolean) {
        const self = this.getWritable();
        self.__showLineNumbers = showLineNumbers;
    }


}

export type CodePayload = {
    lines: string[];
    language: string;
    canCopy: boolean;
    showLineNumbers: boolean;
};

export function $createCodeNode({ lines, language, canCopy, showLineNumbers }: CodePayload): CodeNode {
    return new CodeNode(lines, language, canCopy, showLineNumbers);
}

export function $isCodeNode(node: unknown): node is CodeNode {
    return node instanceof CodeNode;
}