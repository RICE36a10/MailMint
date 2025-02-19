import React from "react";
import { Input } from "@/components/ui/input";

export function InputStyleField({
                                    label,
                                    onHandleStyleChange,
                                    value,
                                    type = "px",
                                }) {
    const FormattedValue = (value_) => {
        return Number(value_.toString().replace(type, ""));
    };
    return (
        <div>
            <label>{label}</label>
            <div className={"flex"}>
                <Input
                    type={"text"}
                    value={FormattedValue(value)}
                    onChange={(e) => onHandleStyleChange(e.target.value + type)}
                />
                <h2 className={"p-1 bg-gray-100 rounded-r-lg -ml-2"}>px</h2>
            </div>
        </div>
    );
}
