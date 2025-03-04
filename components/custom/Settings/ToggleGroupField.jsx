import React from 'react'
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

export function ToggleGroupField({label, value, onHandleStyleChange, options}) {
    console.log(options);
    return (
        <div>
            <label htmlFor="">
                {label}
            </label>
            <ToggleGroup
                type='single'
                defaultValue={value}
                onValueChange={
                (e) => onHandleStyleChange(e)
            }
            >
                {
                    options.map((option, index) => (
                        <ToggleGroupItem
                            value={option.value}
                            key={index}
                            className={'w-full'}
                        >
                            <option.icon />

                        </ToggleGroupItem>
                    ))
                }
            </ToggleGroup>

        </div>
    )
}
