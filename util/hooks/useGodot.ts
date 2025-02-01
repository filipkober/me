import { useCallback, useEffect, useRef } from "react";


export type MessageCallback = (message: unknown) => void;
export type MessageCallbackRecord = Record<string, MessageCallback>;

const formatMessage = (message: unknown, tag: string) => {
    return JSON.stringify({ source: "react", tag, message: JSON.stringify(message) });
};

/**
 * Custom hook to interact with a Godot game embedded in an iframe.
 *
 * @returns An object containing:
 * - `send`: A function to send messages to the Godot game.
 * - `iframeRef`: A ref to the iframe element containing the Godot game.
 * - `addCallback`: A function to add callbacks for messages received from the Godot game.
 *
 * @example
 * const { send, iframeRef, addCallback } = useGodot();
 *
 * // Send a message to the Godot game
 * send("Hello, Godot!", "greeting");
 *
 * // Add a callback for messages with the tag "response"
 * addCallback((message) => {
 *   console.log("Received response:", message);
 * }, "response");
 */
export const useGodot = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const callbacks = useRef<MessageCallbackRecord[]>([]);

    const send = useCallback((message: string, tag = "none") => {
        if (!iframeRef.current) {
            console.error("Iframe not found");
            return;
        }
        iframeRef.current.contentWindow?.postMessage(formatMessage(message, tag), "*");
    }, [iframeRef]);

    useEffect(() => {
        const listener = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                if (!data.source || data.source !== "godot") {
                    return;
                }
                callbacks.current.forEach((callback) => {
                    if (callback[data.tag]) {
                        callback[data.tag](JSON.parse(data.message));
                    }
                });
            } catch {
                console.warn("Received message is not JSON");
            }
        };

        window.addEventListener("message", listener);

        return () => {
            window.removeEventListener("message", listener);
        };
    }, [callbacks]);

    const addCallback = useCallback((callback: MessageCallback, tag: string) => {
        callbacks.current.push({ [tag]: callback });
    }, []);

    return { send, iframeRef, addCallback };
}