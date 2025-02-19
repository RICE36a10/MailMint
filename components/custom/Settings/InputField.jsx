import React from "react";

export function InputField({ label, value, onHandleInputChange }) {
    return (
        <div className={"flex flex-col"}>
            <label htmlFor="">{label}</label>
            <input
                className={"border-2  rounded-md "}
                type="text"
                value={value}
                onChange={(event) => onHandleInputChange(event.target.value)}
            />
        </div>
    );
}
