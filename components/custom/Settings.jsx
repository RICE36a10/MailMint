"use client"
import React, {useContext, useEffect, useState} from 'react'
import {useSelectedElement} from "@/app/provider";
import {InputField} from "@/components/custom/Settings/InputField";
import {ColourPickerField} from "@/components/custom/Settings/ColourPickerField";
import {InputStyleField} from "@/components/custom/Settings/InputStyleField";
import {SliderField} from "@/components/custom/Settings/SliderField";
import {Slider} from "@/components/ui/slider";
import {TextAreaField} from "@/components/custom/Settings/TextAreaField";

export default function Settings() {
    const {SelectedElement, setSelectedElement} = useSelectedElement();
    const [element, setElement] = useState();

    useEffect(() => {
        console.log(SelectedElement?.layout?.[SelectedElement?.index]);
        setElement(SelectedElement?.layout?.[SelectedElement?.index]);
    }, [SelectedElement]);

    const onHandleInputChange = (fieldName, value) => {
        console.log(fieldName, "value"+value);
        const updateData = {...SelectedElement};
        console.log("updateData", updateData)
        updateData.layout[SelectedElement.index][fieldName] = value;
        setSelectedElement(updateData);
    }

    const onHandleStyleChange = (fieldName, value) => {
        let updatedElement = {
            ...SelectedElement,
            layout: {
                ...SelectedElement?.layout,
                [SelectedElement?.index]:{
                    ...SelectedElement?.layout[SelectedElement?.index],
                    style:{
                        ...SelectedElement?.layout[SelectedElement?.index]?.style,
                        [fieldName]:[value]
                    }
                }
            }
        };
        setSelectedElement(updatedElement);
    }

    return (
        <div className={'p-5 flex flex-col gap-4'}>
            <h2 className={'font-bold text-xl'}>Settings</h2>
            {
                element?.content &&
                <InputField label={'Content'} value={element?.content} onHandleInputChange={(value) => onHandleInputChange('content', value)}  />
            }{
                element?.url &&
                <InputField label={'url'} value={element?.url} onHandleInputChange={(value) => onHandleInputChange('url', value)}  />
            }{
                element?.style?.backgroundColor &&
                <ColourPickerField label={'BackGround Colour'}
                                   value={element?.style?.backgroundColor}
                                   onHandleStyleChange={(value) => onHandleStyleChange('backgroundColor', value)}
                />
            }{
                element?.style?.color &&
                <ColourPickerField label={'Text color'}
                                   value={element?.style?.color}
                                   onHandleStyleChange={(value) => onHandleStyleChange('color', value)}
                />
            }{
                element?.style?.fontSize &&
                <InputStyleField label={'Font Size'}
                                   value={element?.style?.fontSize}
                                   onHandleStyleChange={(value) => onHandleStyleChange('fontSize', value)}
                />
            }{
                element?.style?.padding &&
                <InputStyleField label={'Padding'}
                                   value={element?.style?.padding}
                                   onHandleStyleChange={(value) => onHandleStyleChange('padding', value)}
                />
            }{
                element?.style?.borderRadius &&
                <SliderField label={'Border Radius'}
                                   value={element?.style?.borderRadius}
                                   onHandleStyleChange={(value) => onHandleStyleChange('borderRadius', value)}
                />
            }
            {/* testing of Slider */}
            {/*<Slider defaultValue={[2]}*/}
            {/*        max={4} step={1}*/}
            {/*        min={0}*/}
            {/*/>*/}
            {
                element?.style?.width &&
                <SliderField label={'Width'}
                             value={element?.style?.width}
                             onHandleStyleChange={(value) => onHandleStyleChange('width', value)}
                             type={"%"}
                />
            }{
                element?.textarea &&
                <TextAreaField
                    label={'Text Area'}
                    value={element?.textarea}
                    onHandleInputChange={(value) => onHandleInputChange('textarea', value)}  />
            }
        </div>
    )
}
