"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSelectedElement } from "@/app/provider";
import { InputField } from "@/components/custom/Settings/InputField";
import { ColourPickerField } from "@/components/custom/Settings/ColourPickerField";
import { InputStyleField } from "@/components/custom/Settings/InputStyleField";
import { SliderField } from "@/components/custom/Settings/SliderField";
import { Slider } from "@/components/ui/slider";
import { TextAreaField } from "@/components/custom/Settings/TextAreaField";
import {ToggleGroupField} from "@/components/custom/Settings/ToggleGroupField";
import {AArrowUp, AlignCenter, AlignLeft, AlignRight, CaseLower, CaseUpper} from "lucide-react";
import {DropdownField} from "@/components/custom/Settings/DropdownField";
import {ImagePreview} from "@/components/custom/Settings/ImagePreview";

export default function Settings() {
    const { SelectedElement, setSelectedElement } = useSelectedElement();
    const [element, setElement] = useState();

    useEffect(() => {
        console.log(SelectedElement?.layout?.[SelectedElement?.index]);
        setElement(SelectedElement?.layout?.[SelectedElement?.index]);
    }, [SelectedElement]);

    const onHandleInputChange = (fieldName, value) => {
        console.log(fieldName, "value" + value);
        const updateData = { ...SelectedElement };
        console.log("updateData", updateData);
        updateData.layout[SelectedElement.index][fieldName] = value;
        setSelectedElement(updateData);
    };

    const onHandleStyleChange = (fieldName, value) => {
        let updatedElement = {
            ...SelectedElement,
            layout: {
                ...SelectedElement?.layout,
                [SelectedElement?.index]: {
                    ...SelectedElement?.layout[SelectedElement?.index],
                    style: {
                        ...SelectedElement?.layout[SelectedElement?.index]?.style,
                        [fieldName]: [value],
                    },
                },
            },
        };
        setSelectedElement(updatedElement);
    };

    const TextAlignOptions = [
        {
            value: "left",
            icon: AlignLeft
        },
        {
            value: "center", // Change 'centre' to 'center'
            icon: AlignCenter
        },
        {
            value: "right",
            icon: AlignRight
        },
    ];

    const TextTransformOptions = [
        {
            value: "uppercase",
            icon: CaseUpper
        },
        {
            value: "lowercase",
            icon: CaseLower
        },
        {
            value: "capitalize",
            icon: AArrowUp
        },
    ];




    return (
        <div className={"p-5 flex flex-col gap-5"}>
            <h2 className={"font-bold text-xl"}>Settings</h2>
            {element?.imageUrl && (
                <ImagePreview
                    label={"Image Preview"}
                    value={element?.imageUrl}
                    onHandleInputChange={(value) => onHandleInputChange("imageUrl", value)}
                    outerStyle={element?.outerStyle}
                    style = {element?.style}
                />
            )}
            {element?.content && (
                <InputField
                    label={"Content"}
                    value={element?.content}
                    onHandleInputChange={(value) => onHandleInputChange("content", value)}
                    outerStyle={element?.outerStyle}
                    style = {element?.style}
                />
            )}
            {element?.textarea && (
                <TextAreaField
                    label={"Text Area"}
                    value={element?.textarea}
                    onHandleInputChange={(value) =>
                        onHandleInputChange('textarea', value)
                    }
                    outerStyle={element?.outerStyle}
                    style = {element?.style}
                />
            )}
            {element?.style?.textAlign && (
                <ToggleGroupField
                    label={'Text Align'}
                    value ={element?.style?.textAlign}
                    options={TextAlignOptions}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange('textAlign', value)
                    }
                />
            )
            }
            {element?.url && (
                <InputField
                    label={"url"}
                    value={element?.url}
                    onHandleInputChange={(value) => onHandleInputChange("url", value)}
                    outerStyle={element?.outerStyle}
                    style = {element?.style}
                />
            )}
            {element?.style?.backgroundColor && (
                <ColourPickerField
                    label={"BackGround Colour"}
                    value={element?.style?.backgroundColor}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange("backgroundColor", value)
                    }
                    outerStyle={element?.outerStyle}
                    style = {element?.style}
                />
            )}
            {element?.style?.color && (
                <ColourPickerField
                    label={"Text color"}
                    value={element?.style?.color}
                    onHandleStyleChange={(value) => onHandleStyleChange("color", value)}
                    outerStyle={element?.outerStyle}
                    style = {element?.style}
                />
            )}
            {element?.style?.fontSize && (
                <InputStyleField
                    label={"Font Size"}
                    value={element?.style?.fontSize}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange('fontSize', value)
                    }
                    outerStyle={element?.outerStyle}
                    style = {element?.style}
                />
            )}
            {element?.style?.padding && (
                <InputStyleField
                    label={"Padding"}
                    value={element?.style?.padding}
                    onHandleStyleChange={(value) => onHandleStyleChange('padding', value)}
                    outerStyle={element?.outerStyle}
                    style = {element?.style}
                />
            )}
            {element?.style?.borderRadius && (
                <SliderField
                    label={"Border Radius"}
                    value={element?.style?.borderRadius}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange('borderRadius', value)
                    }
                    outerStyle={element?.outerStyle}
                    MIN={0}
                    MAX={25}
                    STEP={0.05}
                    style = {element?.style}
                />
            )}
            {/* testing of Slider */}
            {/*<Slider defaultValue={[2]}*/}
            {/*        max={4} step={1}*/}
            {/*        min={0}*/}
            {/*/>*/}
            {element?.style?.width && (
                <SliderField
                    label={"Width"}
                    value={element?.style?.width}
                    onHandleStyleChange={(value) => onHandleStyleChange('width', value)}
                    type={"%"}
                    MIN={5}
                    MAX={600}
                    STEP={1}
                    outerStyle={element?.outerStyle}
                    style = {element?.style}
                />
            )}
            {element?.style?.textTransform && (
                <ToggleGroupField
                    label={'Text Transform'}
                    value ={element?.style?.textTransform}
                    options={TextTransformOptions}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange('textTransform', value)
                    }
                />
            )
            }
            {element?.style?.fontWeight && (
                <DropdownField
                    label={'Font Weight'}
                    value ={element?.style?.fontWeight}
                    options={['normal', 'bold']}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange('fontWeight', value)
                    }
                />
            )
            }



        </div>
    );
}
