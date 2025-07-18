import React from "react";
import { Button } from "@/components/ui/button";

export function ButtonComponent({ style, content, url, outerStyle }) {
    const computedStyle = {
        ...style,
        backgroundImage: style?.backgroundImageUrl
            ? `url(${style.backgroundImageUrl})`
            : undefined,
        backgroundColor:
            style?.backgroundImageUrl ? undefined : style?.backgroundColor || "#ffffff",
    };
    return (
        <div>
            <a href={url} style={outerStyle}>
                <Button style={computedStyle} className={""}>
                    {content}
                </Button>
            </a>
        </div>
    );
}
