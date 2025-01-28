"use client";
import { useEffect, useRef } from "react";

export default function WebDemoPage() {

    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            if(iframe.contentWindow === null) return;
            iframe.onload = () => {
            iframe.contentWindow!.postMessage(
                { type: "SERVER_URL", url: window.location.origin },
                "*"
            );
            };
        }
      }, [iframeRef]);

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-2">
            <h1 className="text-5xl">Web Demo</h1>
            <p>godot game test</p>
            <iframe src="/web-demo/web-demo.html" ref={iframeRef} className="w-1/2 h-1/2" />
        </div>
    );
}