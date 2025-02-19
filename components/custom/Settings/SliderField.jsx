import React from 'react'
import {Slider} from "@/components/ui/slider";

export function SliderField({label, value, onHandleStyleChange}, type = 'px') {

    const FormattedValue = (value_) => {
        return Number(value_.toString().replace(type,''));
    }

    return (
        <div>
            <label htmlFor="">{label}{" "}
                <span className={'text-primary'}>
                     ({value})
                </span>
            </label>
            <Slider
                    value={[FormattedValue(value)]} // this line is helpful for if you add two slide bars of same value now both of them will move if one is moved
                    defaultValue={[10]}
                    max={1000} step={0.001}
                    min={0}
                    onValueChange={(value) => onHandleStyleChange(value+type)}
                    />
        </div>
    )
}
