import { $applyNodeReplacement, DecoratorNode, DOMConversionMap, DOMConversionOutput, DOMExportOutput, EditorConfig, LexicalNode, LexicalUpdateJSON, NodeKey, SerializedLexicalNode, Spread } from "lexical";
import ImageNodeComponent from "./ImageNodeComponent";
import { JSX } from "react";

export type SerializedImageNode = Spread<
    {
        src: string;
        alt: string;
        width: number;
        height: number;
    },
    SerializedLexicalNode
    >;

    function $convertImageElement(domNode: Node): null | DOMConversionOutput {
        const img = domNode as HTMLImageElement;
        if (img.src.startsWith('file:///')) return null;
        const node = $createImageNode({ src: img.src, alt: img.alt, width: img.width, height: img.height });
        return { node };
    }

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __alt: string;
    __width: number;
    __height: number;

    constructor(src: string, alt: string, width: number, height: number, key?: NodeKey) {
        super(key);
        this.__src = src;
        this.__alt = alt;
        this.__width = width;
        this.__height = height;
    }

    decorate() {
        return (
            <ImageNodeComponent
                src={this.__src}
                alt={this.__alt}
                initialWidth={this.__width}
                initialHeight={this.__height}
                remove={() => this.remove()}
                setDimensions={(width, height) => this.setDimensions(width, height)}
            />
        )
    } 

    createDOM(_config: EditorConfig): HTMLElement {
        const span = document.createElement("span");
        const theme = _config.theme;
        const className = theme.image;
        if(className !== undefined) {
            span.className = className;
        }
        return span;
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement("div");
        const img = document.createElement("img");
        img.setAttribute("src", this.__src);
        img.setAttribute("alt", this.__alt);
        img.setAttribute("width", this.__width.toString());
        img.setAttribute("height", this.__height.toString());

        element.appendChild(img);
        
        return { element };
    }

    static importDOM(): DOMConversionMap | null {
        return {
            img: (node: Node) => ({
                conversion: () => $convertImageElement(node),
                priority: 0
            })
        }
    }

    updateDOM(): false {
        return false;
    }

    static getType(): string {
        return "image";
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(node.__src, node.__alt, node.__width, node.__height, node.__key);
    }

    static importJSON(_serializedNode: SerializedImageNode): ImageNode {
        const { src, alt, width, height } = _serializedNode;
        return $createImageNode({ src, alt, width, height }).updateFromJSON(_serializedNode);
    }

    updateFromJSON(serializedNode: LexicalUpdateJSON<SerializedImageNode>): this {
        const node = super.updateFromJSON(serializedNode);

        return node;
    }

    getSrc() {
        const self = this.getLatest();
        return self.__src;
    }
    getAlt() {
        const self = this.getLatest();
        return self.__alt;
    }
    getWidth() {
        const self = this.getLatest();
        return self.__width;
    }
    getHeight() {
        const self = this.getLatest();
        return self.__height;
    }

    setSrc(src: string) {
        const self = this.getWritable();
        self.__src = src;
    }
    setAlt(alt: string) {
        const self = this.getWritable();
        self.__alt = alt;
    }
    setWidth(width: number) {
        const self = this.getWritable();
        self.__width = width;
    }
    setHeight(height: number) {
        const self = this.getWritable();
        self.__height = height;
    }

    setDimensions(width: number, height: number) {
        const self = this.getWritable();
        self.__width = width;
        self.__height = height;
    }

}

export type ImagePayload = {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export function $createImageNode({ src, alt, width, height }: ImagePayload): ImageNode {
    return $applyNodeReplacement(new ImageNode(src, alt, width, height));
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
    return node instanceof ImageNode;
}