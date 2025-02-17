"use client"
import React, {useContext, useEffect, useState} from 'react'
import {useSelectedElement} from "@/app/provider";
import {InputField} from "@/components/custom/Settings/InputField";

export default function Settings() {
    const {SelectedElement, setSelectedElement} = useSelectedElement();
    const [element, setElement] = useState();

    useEffect(() => {
        console.log(SelectedElement?.layout?.[SelectedElement?.index]);
        setElement(SelectedElement?.layout?.[SelectedElement?.index]);
    }, [SelectedElement]);

    return (
        <div className={'p-5 '}>
            <h2 className={'font-bold text-xl'}>Settings</h2>
            {
                SelectedElement?.layout?.content &&
                <InputField/>
            }
        </div>
    )
}
