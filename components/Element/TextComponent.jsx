import React from "react";

export function TextComponent({ textarea, style, content, outerStyle }) {
    const computedStyle = {
        ...style,
        backgroundImage: style?.backgroundImageUrl
            ? `url(${style.backgroundImageUrl})`
            : undefined,
        backgroundColor:
            style?.backgroundImageUrl ? undefined : style?.backgroundColor || "#ffffff",
    };
    return (
        <div style={outerStyle} className={"w-full"}>
            <h2 style={computedStyle}>{textarea}</h2>
        </div>
    );
}
