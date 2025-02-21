import React from "react";
import { Slider } from "@/components/ui/slider";

export function SliderField(
    { label, value, onHandleStyleChange, MIN, MAX, STEP, outerStyle },
    type = "px",
) {
    const FormattedValue = (value_) => {
        return Number(value_.toString().replace(type, ""));
    };

    return (
        <div style={outerStyle} className={'flex gap-3   '}>
            <label htmlFor="" className={'w-2/5'}>
                {label} <span className={"text-primary"}>({value})</span>
            </label>
            <Slider
                value={[FormattedValue(value)]} // this line is helpful for if you add two slide bars of same value now both of them will move if one is moved
                defaultValue={[(MIN+MAX)/2]}
                max={MAX}
                step={STEP}
                min={MIN}
                onValueChange={(value) => onHandleStyleChange(value + type)}
                className={'  w-1/2'}
            />
        </div>
    );
}
