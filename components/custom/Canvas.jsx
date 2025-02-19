"use client";
import React, { useState } from "react";
import {
    useDragDropLayout,
    useEmailTemplate,
    useScreenSize,
} from "@/app/provider";
import layout from "@/Data/Layout";
import { ColumnLayout } from "@/components/LayoutElements/ColumnLayout";
import Layout from "@/Data/Layout";
export function Canvas() {
    const { ScreenSize, setScreenSize } = useScreenSize();
    const { DragElementLayout, setDragElementLayout } = useDragDropLayout();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);

    const onDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
        console.log("Ondrag over");
    };
    const onDropHandler = () => {
        setDragOver(false);
        console.log(DragElementLayout?.dragLayout, "helllo ");
        if (DragElementLayout?.dragLayout) {
            setEmailTemplate((prev) => [...prev, DragElementLayout?.dragLayout]);
        }
    };

    const getLayoutComponent = (layout) => {
        if (layout?.type === "column") {
            return <ColumnLayout layout={layout} />;
        }
        return null;
    };

    return (
        <div className={"mt-20 flex justify-center "}>
            {/*<div className={`bg-white p-6 w-full */}
            {/*${ScreenSize == 'desktop' ? 'max-w-2xl':'max-w-lg'}*/}
            {/*${dragOver && 'bg-purple-100 p-4'}*/}
            {/*`}*/}
            {/*onDragOver={OndragOver}*/}
            {/*     onDrop={()=> onDropHandler()}*/}
            {/*>*/}
            {/*    {*/}
            {/*        emailTemplate?.length>0 ? emailTemplate?.map((layout,index) => (*/}
            {/*                <div key={index}>{*/}
            {/*                    getLayoutComponent(layout)*/}
            {/*                }</div>*/}
            {/*        )):*/}
            {/*            <div className={'p-4 text-center bg-gray-100 border border-dashed border-primary'}>add layout here</div>*/}
            {/*    }*/}
            {/*</div>*/}

            <div
                className={`bg-white p-6 w-full 
                    ${ScreenSize === "desktop" ? "max-w-2xl" : "max-w-lg"} 
                    ${dragOver ? "bg-purple-100 p-4" : ""}`}
                onDragOver={onDragOver}
                onDrop={onDropHandler}
            >
                {emailTemplate?.length > 0 ? (
                    emailTemplate.map((layout, index) => (
                        <div key={index}>{getLayoutComponent(layout)}</div>
                    ))
                ) : (
                    <div className="p-4 text-center bg-gray-100 border border-dashed border-primary">
                        Add layout here
                    </div>
                )}
            </div>
        </div>
    );
}
