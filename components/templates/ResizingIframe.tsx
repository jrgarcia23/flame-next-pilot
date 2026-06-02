"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
  fallbackHeight: number;
};

export default function ResizingIframe({ src, title, fallbackHeight }: Props) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(fallbackHeight);

  useEffect(() => {
    function handler(event: MessageEvent) {
      const data = event.data;
      if (data && data.type === "flame-iframe-resize" && typeof data.height === "number") {
        // Only accept from our iframe by checking source window
        if (event.source === ref.current?.contentWindow) {
          setHeight(Math.max(data.height, 200));
        }
      }
    }
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      style={{ width: "100%", height: `${height}px`, border: 0, display: "block" }}
      loading="lazy"
      scrolling="no"
    />
  );
}
