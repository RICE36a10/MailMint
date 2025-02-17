import React from 'react'

export function InputField({label, value, onHandleInputChange}) {
    return (
        <div>
            <label htmlFor="">{label}</label>
            <input type="text" value={value} onChange={(event) => onHandleInputChange(event.target.value)} />
        </div>
    )
}
