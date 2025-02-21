import React from "react";
import { Textarea } from "@/components/ui/textarea";

export function TextAreaField({ label, value, onHandleInputChange,outerStyle, style }) {
    return (
        <div style={outerStyle}>
            <label htmlFor="">{label}</label>
            <Textarea

                value={value || " "} // Handle undefined cases
                onChange={(e) => onHandleInputChange(e.target.value)}
            />
        </div>
    );
}


