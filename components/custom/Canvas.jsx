"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    useDragDropLayout,
    useEmailTemplate,
    useScreenSize,
} from "@/app/provider";
import layout from "@/Data/Layout";
import { ColumnLayout } from "@/components/LayoutElements/ColumnLayout";
import Layout from "@/Data/Layout";
import { ViewHtmlDialog } from "@/components/custom/ViewHtmlDialog";
import {toast, Toaster} from "react-hot-toast";
export function Canvas({ viewHtmlCode, closeDialog }) {
    const { ScreenSize, setScreenSize } = useScreenSize();
    const { DragElementLayout, setDragElementLayout } = useDragDropLayout();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);
    const [htmlCode, setHtmlCode] = useState("");

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
            toast.success("New Set of Column Added");
        }
    };

    const getLayoutComponent = (layout) => {
        if (layout?.type === "column") {
            return <ColumnLayout layout={layout} />;
        }
        return null;
    };

    const htmlref = useRef(null);

    const GetHtmlCode = () => {
        if (htmlref.current) {
            const htmlContent = htmlref.current.innerHTML;
            console.log(htmlContent);
            setHtmlCode(htmlContent);
            console.log(htmlCode);
        }
    };

    useEffect(() => {
        viewHtmlCode && GetHtmlCode();
    }, [viewHtmlCode]);


    useEffect(() => {
        console.log("agdsgdufauyjfds",emailTemplate);
    }, [emailTemplate]);

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className={"mt-20 flex justify-center "}>
                <div
                    className={`bg-white p-6 w-full 
                    ${ScreenSize === "desktop" ? "max-w-2xl" : "max-w-lg"} 
                    ${dragOver ? "bg-purple-100 p-4" : ""}`}
                    onDragOver={onDragOver}
                    onDrop={onDropHandler}
                    ref={htmlref}
                >
                    {emailTemplate.length > 0 ? (
                        <>
                            <p>Email Template Found ✅</p>
                            {emailTemplate.map((layout, index) => (
                                <div key={index}>{getLayoutComponent(layout) || "Empty Component"}</div>
                            ))}
                        </>
                    ) : (
                        <p>Email Template Empty ❌   {console.log("poiii"+emailTemplate)}</p>

                    )}


                    {/*{emailTemplate?.length > 0 ? (*/}
                    {/*    emailTemplate.map((layout, index) => (*/}
                    {/*        <div key={index}>{getLayoutComponent(layout)}</div>*/}
                    {/*    ))*/}
                    {/*) : (*/}
                    {/*    <div className="p-4 text-center bg-gray-100 border border-dashed border-primary">*/}
                    {/*        Add layout here*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
                <ViewHtmlDialog
                    openDialog={viewHtmlCode}
                    htmlCode={htmlCode}
                    closeDialog={closeDialog}
                />
            </div>
        </>
    );
}
