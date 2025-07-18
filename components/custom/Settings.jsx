"use client";
import React, { useContext, useEffect, useState } from "react";
import {useEmailTemplate, useSelectedElement} from "@/app/provider";
import { InputField } from "@/components/custom/Settings/InputField";
import { ColourPickerField } from "@/components/custom/Settings/ColourPickerField";
import { InputStyleField } from "@/components/custom/Settings/InputStyleField";
import { SliderField } from "@/components/custom/Settings/SliderField";
import { Slider } from "@/components/ui/slider";
import { TextAreaField } from "@/components/custom/Settings/TextAreaField";
import { ToggleGroupField } from "@/components/custom/Settings/ToggleGroupField";
import {
    AArrowUp,
    AlignCenter,
    AlignLeft,
    AlignRight,
    CaseLower,
    CaseUpper,
} from "lucide-react";
import { DropdownField } from "@/components/custom/Settings/DropdownField";
import { ImagePreview } from "@/components/custom/Settings/ImagePreview";
import { isEqual } from "lodash";

export default function Settings() {
    const { SelectedElement, setSelectedElement } = useSelectedElement();
    const [element, setElement] = useState();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();

    // useEffect(() => {
    //     console.log(SelectedElement?.layout?.[SelectedElement?.index]);
    //     setElement(SelectedElement?.layout?.[SelectedElement?.index]);
    // }, [SelectedElement]);

    // major change
    useEffect(() => {
        const layout = SelectedElement?.layout?.[SelectedElement?.index];
        console.log("Layout:", layout); // Debug: check if layout is defined
        if (layout) {
            setElement({
                ...layout,
                style: {
                    ...layout.style,
                    fontSize: layout.style?.fontSize || "16px",
                    padding: layout.style?.padding || "10px",
                    width: layout.style?.width || "100%",
                    borderRadius: layout.style?.borderRadius || "0px",
                    textAlign: layout.style?.textAlign || "left", // Default to 'left'
                },
                outerStyle: {
                    ...layout.outerStyle,
                    justifyContent: layout.outerStyle?.justifyContent || "flex-start", // Default to 'flex-start'
                },
                textarea: layout.textarea !== undefined ? layout.textarea : "",
            });
        }
    }, [SelectedElement]);

    // major change
    useEffect(() => {
        if (SelectedElement && emailTemplate) {
            let updatedEmailTemplates = [];
            let hasChanged = false;
            emailTemplate.forEach((item) => {
                if (item.id === SelectedElement?.layout?.id) {
                    if (!isEqual(item, SelectedElement?.layout)) {
                        updatedEmailTemplates.push(SelectedElement?.layout);
                        hasChanged = true;
                    } else {
                        updatedEmailTemplates.push(item);
                    }
                } else {
                    updatedEmailTemplates.push(item);
                }
            });
            if (hasChanged) {
                setEmailTemplate(updatedEmailTemplates);
            }
        }
    }, [SelectedElement, emailTemplate]);

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

    const onHandleOuterStyleChange = (fieldName, value) => {
        let updatedElement = {
            ...SelectedElement,
            layout: {
                ...SelectedElement?.layout,
                [SelectedElement?.index]: {
                    ...SelectedElement?.layout[SelectedElement?.index],
                    outerStyle: {
                        ...SelectedElement?.layout[SelectedElement?.index]?.outerStyle,
                        [fieldName]: [value],
                    },
                },
            },
        };
        setSelectedElement(updatedElement);
    };

    const onHandleSocialIconLinkChange = (index, value) => {
        const updated = { ...SelectedElement };
        const icons = [...(updated.layout[SelectedElement.index].socialIcons || [])];
        if (icons[index]) {
            icons[index] = { ...icons[index], url: value };
        }
        updated.layout[SelectedElement.index].socialIcons = icons;
        setSelectedElement(updated);
    };

    const TextAlignOptions = [
        {
            value: "left",
            icon: AlignLeft,
        },
        {
            value: "center", // Change 'centre' to 'center'
            icon: AlignCenter,
        },
        {
            value: "right",
            icon: AlignRight,
        },
    ];

    const TextTransformOptions = [
        {
            value: "uppercase",
            icon: CaseUpper,
        },
        {
            value: "lowercase",
            icon: CaseLower,
        },
        {
            value: "capitalize",
            icon: AArrowUp,
        },
    ];

    return (
        <div className={"p-5 flex flex-col gap-5"}>
            <h2 className={"font-bold text-xl"}>Settings</h2>
            {element?.imageUrl !== undefined && (
                <ImagePreview
                    label={"Image Preview"}
                    value={element?.imageUrl}
                    onHandleInputChange={(value) =>
                        onHandleInputChange("imageUrl", value)
                    }
                    outerStyle={element?.outerStyle}
                    style={element?.style}
                />
            )}
            {element?.content && (
                <InputField
                    label={"Content"}
                    value={element?.content}
                    onHandleInputChange={(value) => onHandleInputChange("content", value)}
                    outerStyle={element?.outerStyle}
                    style={element?.style}
                />
            )}
            {element?.textarea && (
                <TextAreaField
                    label={"Text Area"}
                    value={element?.textarea}
                    onHandleInputChange={(value) =>
                        onHandleInputChange("textarea", value)
                    }
                    outerStyle={element?.outerStyle}
                    style={element?.style}
                />
            )}
            {element?.style?.textAlign && (
                <ToggleGroupField
                    label={"Text Align"}
                    value={element?.style?.textAlign}
                    options={TextAlignOptions}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange("textAlign", value)
                    }
                />
            )}
            {element?.style?.textTransform && (
                <ToggleGroupField
                    label={"Text Transform"}
                    value={element?.style?.textTransform}
                    options={TextTransformOptions}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange("textTransform", value)
                    }
                />
            )}
            {element?.style && (
                <InputField
                    label={"Background Image URL"}
                    value={element?.style?.backgroundImageUrl || ""}
                    onHandleInputChange={(value) =>
                        onHandleStyleChange("backgroundImageUrl", value)
                    }
                    outerStyle={element?.outerStyle}
                    style={element?.style}
                />
            )}
            {element?.url && (
                <InputField
                    label={"url"}
                    value={element?.url}
                    onHandleInputChange={(value) => onHandleInputChange("url", value)}
                    outerStyle={element?.outerStyle}
                    style={element?.style}
                />
            )}
            {element?.socialIcons && (
                <div className="flex flex-col gap-2">
                    {element.socialIcons.map((icon, idx) => (
                        <InputField
                            key={idx}
                            label={`Link ${idx + 1}`}
                            value={icon.url}
                            onHandleInputChange={(value) =>
                                onHandleSocialIconLinkChange(idx, value)
                            }
                            outerStyle={element?.outerStyle}
                            style={element?.style}
                        />
                    ))}
                </div>
            )}
            {
                <div className={'flex gap-6 bg-gray-100 justify-around'}>
                    {element?.style?.backgroundColor && (
                        <ColourPickerField
                            label={"BackGround Colour"}
                            value={element?.style?.backgroundColor}
                            onHandleStyleChange={(value) =>
                                onHandleStyleChange("backgroundColor", value)
                            }
                            outerStyle={element?.outerStyle}
                            style={element?.style}
                        />
                    )}
                    {element?.style?.color && (
                        <ColourPickerField
                            label={"Text color"}
                            value={element?.style?.color}
                            onHandleStyleChange={(value) => onHandleStyleChange("color", value)}
                            outerStyle={element?.outerStyle}
                            style={element?.style}
                        />
                    )}
                </div>
            }
            {element?.style?.fontSize && (
                <InputStyleField
                    label={"Font Size"}
                    value={element?.style?.fontSize}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange("fontSize", value)
                    }
                    outerStyle={element?.outerStyle}
                    style={element?.style}
                />
            )}
            {element?.style?.padding && (
                <InputStyleField
                    label={"Padding"}
                    value={element?.style?.padding}
                    onHandleStyleChange={(value) => onHandleStyleChange("padding", value)}
                    outerStyle={element?.outerStyle}
                    style={element?.style}
                />
            )}
            {element?.style?.margin && (
                <InputStyleField
                    label={"Margin"}
                    value={element?.style?.margin}
                    onHandleStyleChange={(value) => onHandleStyleChange("margin", value)}
                    outerStyle={element?.outerStyle}
                    style={element?.style}
                />
            )}
            {element?.style?.borderRadius && (
                <SliderField
                    label={"Border Radius"}
                    value={element?.style?.borderRadius}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange("borderRadius", value)
                    }
                    outerStyle={element?.outerStyle}
                    MIN={0}
                    MAX={25}
                    STEP={0.05}
                    style={element?.style}
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
                    onHandleStyleChange={(value) => onHandleStyleChange("width", value)}
                    type={"%"}
                    MIN={5}
                    MAX={600}
                    STEP={1}
                    outerStyle={element?.outerStyle}
                    style={element?.style}
                />
            )}
            {element?.style?.height && (
                <InputStyleField
                    label={"Height"}
                    value={element?.style?.height}
                    onHandleStyleChange={(value) => onHandleStyleChange("height", value)}
                    outerStyle={element?.outerStyle}
                    style={element?.style}
                />
            )}
            {element?.style?.fontWeight && (
                <DropdownField
                    label={"Font Weight"}
                    value={element?.style?.fontWeight}
                    options={["normal", "bold"]}
                    onHandleStyleChange={(value) =>
                        onHandleStyleChange("fontWeight", value)
                    }
                />
            )}
            <div>
                {
                    SelectedElement && (
                        <div>
                            <h2 className={"font-bold mb-2"}>Outer Style</h2>
                            {element?.outerStyle?.backgroundColor && (
                                <ColourPickerField
                                    label={"Text color"}
                                    value={element?.outerStyle?.color}
                                    onHandleStyleChange={(value) =>
                                        onHandleOuterStyleChange("color", value)
                                    }
                                    outerStyle={element?.outerStyle}
                                    style={element?.style}
                                />
                            )}
                            {element?.outerStyle?.justifyContent && (
                                <ToggleGroupField
                                    label={"Align"}
                                    value={element?.outerStyle?.justifyContent}
                                    options={TextAlignOptions}
                                    onHandleStyleChange={(value) =>
                                        onHandleOuterStyleChange("justifyContent", value)
                                    }
                                    outerStyle={element?.outerStyle}
                                    style={element?.style}
                                />
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    );
}
