import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export function DropdownField({label,value,options,onHandleStyleChange}) {
    return (
        <div>
            <label >{label}</label>
            <Select onValueChange={(v) => onHandleStyleChange(v)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={value} />
                </SelectTrigger>
                <SelectContent>
                    {
                        options?.map((option, index) => (
                            <SelectItem value={option} key={index}> {option} </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}
