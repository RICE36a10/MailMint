"use client";
import React, { useState } from "react";
import {
    useDragDropLayout,
    useEmailTemplate,
    useSelectedElement,
} from "@/app/provider";
import { ButtonComponent } from "@/components/Element/ButtonComponent";
import { TextComponent } from "@/components/Element/TextComponent";
import { ImageComponent } from "@/components/Element/ImageComponent";
import { LogoComponent } from "@/components/Element/LogoComponent";
import { LogoHeaderComponent } from "@/components/Element/LogoHeaderComponent";
import { SocialIconsComponent } from "@/components/Element/SocialIconsComponent";
import { DividerComponent } from "@/components/Element/DividerComponent";
import {Trash} from "lucide-react";

export function ColumnLayout({ layout }) {
    const [dragOver, setDragOver] = useState();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const { DragElementLayout, setDragElementLayout } = useDragDropLayout();
    const { SelectedElement, setSelectedElement } = useSelectedElement();

    const ondragoverhandle = (event, index) => {
        event.preventDefault();
        setDragOver({
            index: index,
            columnId: layout?.id,
        });
    };

    const ondrophandle = () => {
        if (!dragOver) return;
        const index = dragOver?.index;

        setEmailTemplate((prevItem) =>
            prevItem?.map((col) =>
                col.id === layout?.id
                    ? {
                        ...col,
                        [index]: DragElementLayout?.dragElement,
                    }
                    : col,
            ),
        );
        setDragOver(null);
        console.log(emailTemplate);
    };

    const DeleteLayout = (layoutId) => {
        const updateEmailTemplate = emailTemplate?.filter(item => item.id !== layoutId);
        setEmailTemplate(updateEmailTemplate);
        setSelectedElement(null);
    }


    const getElementComponent = (element) => {
        if (element?.type == "Button") {
            return <ButtonComponent {...element} />;
        } else if (element?.type == "Text") {
            return <TextComponent {...element} />;
        } else if (element?.type == "Image") {
            return <ImageComponent {...element} />;
        } else if (element?.type == "Logo") {
            return <LogoComponent {...element} />;
        } else if (element?.type == "LogoHeader") {
            return <LogoHeaderComponent {...element} />;
        } else if (element?.type == "SocialIcons") {
            return <SocialIconsComponent {...element} />;
        } else if (element?.type == "Divider") {
            return <DividerComponent {...element} />;
        }

        return element?.type;
    };

    return (
        <div className={'relative'}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${layout?.numOfCol || 1}, 1fr)`,
                    gap: "0px", // Added gap for better visibility
                }}
                className={`${SelectedElement?.layout?.id === layout?.id && 'border border-dashed border-red-900 border-2'}`}
            >
                {layout?.numOfCol > 0 ? (
                    Array.from({ length: layout.numOfCol }).map((_, index) => (
                        <div
                            key={index}
                            className={`p-0 flex cursor-pointer items-center 
                             ${!layout?.[index]?.type && "bg-gray-300 border border-dashed border-x-chart-3 border-y-chart-3 "} justify-center
                             ${index == dragOver?.index && dragOver?.columnId && "bg-green-100"}
                             ${SelectedElement?.layout?.id === layout?.id && SelectedElement?.index == index && "border-blue-500 border "}
                             `}
                            onDragOver={(event) => ondragoverhandle(event, index)}
                            onDrop={(event) => ondrophandle()}
                            onClick={() =>
                                setSelectedElement({
                                    layout: layout,
                                    index: index,
                                })
                            }
                        >
                            {getElementComponent(layout?.[index]) ?? "drag element here"}
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center bg-red-200">No columns</div>
                )}

                {
                    SelectedElement?.layout?.id === layout?.id &&
                    <div className={
                        'absolute cursor-pointer -right-10 bg-red-100 rounded-full p-2 ' +
                        'hover:scale-110 hover:bg-red-200 hover:shadow-2xl  transition-all'
                    }

                         onClick={()=>DeleteLayout(layout?.id)}

                    >
                        <Trash className={'h-4 w-4 text-red-500  '}/>
                    </div>
                }

            </div>
        </div>
    );
}
