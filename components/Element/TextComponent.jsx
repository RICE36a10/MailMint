import React from 'react'

export function TextComponent({content, style}) {
    return (
        <div>
            <h2 style={style}>
                {content}
            </h2>
        </div>
    )
}
