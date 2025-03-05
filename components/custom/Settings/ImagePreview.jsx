import React from "react";

export function ImagePreview({ label, value, onHandleInputChange }) {
    return (
        <div>
            <div>
                <label>{label}</label>
                <img
                    src={value}
                    alt="image"
                    className={"w-full h-[180px] object-fill border rounded-xl"}
                />
                <input
                    value={value}
                    onChange={(v) => onHandleInputChange(v.target.value)}
                    className={"mt-4"}
                />
            </div>
        </div>
    );
}
