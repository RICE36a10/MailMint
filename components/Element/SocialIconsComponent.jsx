import React from "react";

export function SocialIconsComponent({ socialIcons = [], style, outerStyle }) {
    const computedStyle = {
        ...style,
        backgroundImage: style?.backgroundImageUrl
            ? `url(${style.backgroundImageUrl})`
            : undefined,
        backgroundColor:
            style?.backgroundImageUrl ? undefined : style?.backgroundColor || "#ffffff",
    };
    return (
        <div style={outerStyle} className="flex gap-2">
            {socialIcons?.map((item, index) => (
                <a
                    key={index}
                    href={item.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={item.icon} alt="icon" style={computedStyle} />
                </a>
            ))}
        </div>
    );
}
