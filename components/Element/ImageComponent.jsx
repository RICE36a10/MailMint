import React from "react";
export function ImageComponent({ style, imageUrl, alt, outerStyle }) {
    const computedStyle = {
        ...style,
        backgroundImage: style?.backgroundImageUrl
            ? `url(${style.backgroundImageUrl})`
            : undefined,
        backgroundColor:
            style?.backgroundImageUrl ? undefined : style?.backgroundColor || "#ffffff",
    };
    const width = parseInt(style?.width) || 150;
    const height = parseInt(style?.height) || 150;
    return (
        <div style={outerStyle}>
            <img src={imageUrl} style={computedStyle} alt={alt || "Image"} width={width} height={height} />
        </div>
    );
}
