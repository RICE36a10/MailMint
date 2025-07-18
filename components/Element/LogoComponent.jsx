import React from "react";

export function LogoComponent({ style, imageUrl, outerStyle }) {
    const computedStyle = {
        ...style,
        backgroundImage: style?.backgroundImageUrl
            ? `url(${style.backgroundImageUrl})`
            : undefined,
        backgroundColor:
            style?.backgroundImageUrl ? undefined : style?.backgroundColor || "#ffffff",
    };
    const width = parseInt(style?.width) || undefined;
    const height = parseInt(style?.height) || undefined;
    return (
        <div style={outerStyle}>
            <img src={imageUrl} alt={"Logo"} style={computedStyle} width={width} height={height} />
        </div>
    );
}
