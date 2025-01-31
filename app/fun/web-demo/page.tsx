"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGodot } from "@/util/hooks/useGodot";
import { useState } from "react";

export default function WebDemoPage() {

    const [inputText, setInputText] = useState("");

    const testFn = (message: unknown, ) => {
        const msg = message as string;
        console.log(msg);
    }

    const { send, iframeRef, addCallback } = useGodot();
    addCallback(testFn, "clg");

    const onClick = () => {
        send(inputText, "set_label");
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-2">
            <h1 className="text-5xl">Web Demo</h1>
            <p>godot game test</p>
            <iframe src="/web-demo/web-demo.html" className="w-1/2 h-1/2" ref={iframeRef} />
            <div className="flex gap-2 text-2xl">
                <Input type="text" placeholder="message" onChange={e => setInputText(e.target.value)} />
                <Button onClick={onClick}>Send</Button>
            </div>
        </div>
    );
}