import React from 'react'
import {Button} from "@/components/ui/button";

export function ButtonComponent({style, content,url}) {
    return (
        <div>
            <Button style={style} className={''} >
                <a href={url}>
                {content}
                </a>
            </Button>
        </div>
    )
}
