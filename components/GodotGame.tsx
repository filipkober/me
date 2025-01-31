"use client";

import { MessageCallbackRecord, useGodot } from "@/util/hooks/useGodot";

interface GodotGameProps {
  gameSrc: string;
  className?: string;
  callbacks?: MessageCallbackRecord[];
}

export default function GodotGame({
  gameSrc,
  className,
  callbacks = [],
}: GodotGameProps) {
  const { iframeRef, addCallback, send } = useGodot();

  callbacks.forEach((callback) => {
    for (const key in callback) {
      addCallback(callback[key], key);
    }
  });

  addCallback(() => {
    console.log("got get_label");
    send(window.location.origin, "set_label");
  }, "get_label");

  return <iframe src={gameSrc} ref={iframeRef} className={className} />;
}
