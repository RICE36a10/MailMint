import React from "react";
import { Input } from "@/components/ui/input";

export function ColourPickerField({ label, value, onHandleStyleChange ,outerStyle}) {
    return (
        <div className={"grid gap-6 "} style={outerStyle}>
            <div>
                <label htmlFor="">{label}</label>
            </div>
            <Input
                type={"color"}
                value={value}
                onChange={(event) => onHandleStyleChange(event.target.value)}
                className={'w-15'}
            />
        </div>
    );
}
