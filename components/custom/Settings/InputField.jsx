import React from "react";

export function InputField({ label, value, onHandleInputChange , outerStyle}) {
    return (
        <div className={"flex flex-col"} style={outerStyle}>
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
