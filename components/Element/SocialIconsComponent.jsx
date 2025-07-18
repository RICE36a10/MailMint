import React from "react";

export function SocialIconsComponent({ socialIcons = [], style, outerStyle }) {
    return (
        <div style={outerStyle} className="flex gap-2">
            {socialIcons?.map((item, index) => (
                <a key={index} href={item.url || "#"}>
                    <img src={item.icon} alt="icon" style={style} />
                </a>
            ))}
        </div>
    );
}
