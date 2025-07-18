"use client";
import Layout from "@/Data/Layout";
import layout from "@/Data/Layout";
import React from "react";
import { ElementLayoutCard } from "@/components/custom/ElementLayoutCard";
import ElementList from "@/Data/ElementList";
import { useDragDropLayout } from "@/app/provider";

export function ElementsSideBar() {
    const { DragElementLayout, setDragElementLayout } = useDragDropLayout();

    const OnDragLayoutStart = (layout) => {
        setDragElementLayout((prev) => ({
            ...prev, // Ensure previous state is retained
            dragLayout: {
                ...(prev?.dragLayout || {}), // Ensure `prev.dragLayout` exists
                ...layout,
                id: Date.now(),
            },
        }));
    };

    const onDragelementStart = (element) => {
        setDragElementLayout({
            dragElement: {
                ...element,
                id: Date.now(),
            },
        });
    };

    return (
        <div className={"p-5 h-screen shadow-sm"}>
            <h2 className={"font-bold text-lg"}> Layouts</h2>
            <div className={"grid grid-cols-1 md:grid-cols-2  gap-5 mt-3" + ""}>
                {Layout.map((layout, index) => (
                    <div
                        key={index}
                        draggable={true}
                        onDragStart={() => OnDragLayoutStart(layout)}
                    >
                        <ElementLayoutCard key={index} index={index} layout={layout} />
                    </div>
                ))}
            </div>

            <h2 className={"font-bold text-lg mt-3"}> Elements</h2>
            <div className={"grid grid-cols-1 md:grid-cols-2  gap-5 mt-3" + ""}>
                {ElementList.map((element, index) => (
                    <div key={index} draggable={true}>
                        <div
                            key={index}
                            draggable={true}
                            onDragStart={() => onDragelementStart(element)}
                        >
                            <ElementLayoutCard key={index} index={index} layout={element} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ElementsSideBar;
