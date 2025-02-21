import React from "react";
import { Input } from "@/components/ui/input";

export function InputStyleField({
                                    label,
                                    onHandleStyleChange,
                                    value,
                                    type = "px",
                                    outerStyle

                                }) {
    const FormattedValue = (value_) => {
        return Number(value_.toString().replace(type, ""));
    };
    return (
        <div style={outerStyle} className={'flex gap-6'}>
            <label>{label}</label>
            <div className={"flex"}>
                <Input
                    type={"text"}
                    value={FormattedValue(value)}
                    onChange={(e) => onHandleStyleChange(e.target.value + type)}
                    className={' w-2/5 '}
                />
                <h2 className={"p-1 bg-gray-100 rounded-r-lg -ml-2"}>px</h2>
            </div>
        </div>
    );
}
