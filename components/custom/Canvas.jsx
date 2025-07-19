"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    useDragDropLayout,
    useEmailTemplate, useHtmlCode,
    useScreenSize,
} from "@/app/provider";
import { ColumnLayout } from "@/components/LayoutElements/ColumnLayout";
import { ViewHtmlDialog } from "@/components/custom/ViewHtmlDialog";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBan} from "@fortawesome/free-solid-svg-icons";
// Memoized to avoid re-renders when props don't change
export const Canvas = React.memo(function Canvas({ viewHtmlCode, closeDialog }) {
    const htmlref = useRef();
    const { ScreenSize, setScreenSize } = useScreenSize();
    const { DragElementLayout, setDragElementLayout } = useDragDropLayout();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);
    const {htmlCode, setHtmlCode} = useHtmlCode();

    // useCallback keeps handlers stable to prevent re-render churn
    const onDragOver = useCallback((e) => {
        e.preventDefault();
        setDragOver(true);
    }, []);
    const onDropHandler = useCallback((event) => {
        event.preventDefault();
        setDragOver(false);
        if (DragElementLayout?.dragLayout) {
            setEmailTemplate((prev) => [...prev, DragElementLayout?.dragLayout]);
        }
    }, [DragElementLayout?.dragLayout, setEmailTemplate]);

    const getLayoutComponent = (layout) => {
        if (layout?.type == "column") {
            return <ColumnLayout layout={layout} />;
        }
        // return null;
    };


    useEffect(() => {
        viewHtmlCode && GetHtmlCode();
    }, [viewHtmlCode]);

    const GetHtmlCode = () => {
        if (htmlref.current) {
            const htmlContent = htmlref.current.innerHTML;
            setHtmlCode(htmlContent);
        }
    };

    // useEffect(() => {
    //     console.log("email template design",emailTemplate?.design);
    //     console.log("type of design ",typeof(emailTemplate?.design));
    //     console.log("type of email template in canvas",typeof(emailTemplate), emailTemplate);
    // }, [emailTemplate]);




    return (
        <>

            <div className={"mt-20 flex justify-center "}>
                <div
                    className={`bg-white p-6 w-full 
                    ${ScreenSize === "desktop" ? "max-w-2xl" : "max-w-lg"} 
                    ${dragOver ? "bg-purple-100 p-4" : ""}`}
                    onDragOver={onDragOver}
                    onDrop={(event) => onDropHandler(event)}
                    ref={htmlref}
                >
                    {
                        emailTemplate.length > 0 ? (
                            <>
                                {emailTemplate.map((layout, index) => (
                                    <div key={index}>{getLayoutComponent(layout) || "Empty Component"}</div>
                                ))}
                            </>
                        ) : (
                            <p className={' flex justify-center items-center bg-gray-100 h-[400px] text-2xl'}>Template Empty or Not Found
                                <FontAwesomeIcon className={'ml-2'} icon={faBan} />
                            </p>
                        )
                    }

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
});

export default Canvas;
