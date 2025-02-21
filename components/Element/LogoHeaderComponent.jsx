import React from "react";

export function LogoHeaderComponent({ style, imageUrl, outerStyle }) {
    return (
        <div>
            <img src={imageUrl} alt={"LogoHeader"} style={style} />
        </div>
    );
}
