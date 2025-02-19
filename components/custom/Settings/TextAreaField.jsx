import React from "react";
import { Textarea } from "@/components/ui/textarea";

export function TextAreaField({ label, value, onHandleInputChange }) {
    return (
        <div>
            <label htmlFor="">{label}</label>
            <Textarea
                value={value || ""} // Handle undefined cases
                onChange={(e) => onHandleInputChange(e.target.value)}
            />
        </div>
    );
}
