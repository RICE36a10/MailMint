import React from 'react'

export function TextComponent({textarea, style, content, outerStyle}) {
    return (
        <div style={outerStyle} className={'w-full'}>
            <h2 style={style}>
                {textarea}
            </h2>
        </div>
    )
}
