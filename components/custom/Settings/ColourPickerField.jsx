import React from 'react'
import {Input} from "@/components/ui/input";

export function ColourPickerField({label, value, onHandleStyleChange}) {
    return (
        <div className={'grid'}>
            <div>
                <label htmlFor="">{label}</label>
            </div>
            <Input type={"color"}
                   value={value}
                   onChange={(event) => onHandleStyleChange(event.target.value)} />
        </div>
    )
}

