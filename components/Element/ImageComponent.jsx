import React from "react";
import Image from "next/image";

export function ImageComponent({ style, imageUrl, alt, outerStyle }) {
    return (
        <div>
            <Image
                src={imageUrl}
                style={style}
                alt={"Image"}
                width={150} // Explicit width
                height={150} // Explicit height
            />
        </div>
    );
}
