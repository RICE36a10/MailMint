import React from 'react'
import {Button} from "@/components/ui/button";

export function ButtonComponent({style, content,url, outerStyle}) {
    return (
        <div>
                <a href={url} style={outerStyle}>
                    <Button style={style}  className={''} >
                        {content}
                    </Button>
                </a>
        </div>
    )
}
