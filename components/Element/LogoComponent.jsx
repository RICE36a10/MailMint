import React from "react";

export function LogoComponent({ style, imageUrl, outerStyle }) {
    return (
        <div>
            <img src={imageUrl} alt={"Logo"} style={style} />
        </div>
    );
}
