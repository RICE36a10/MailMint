"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    useDragDropLayout,
    useEmailTemplate, useHtmlCode,
    useScreenSize,
} from "@/app/provider";
import layout from "@/Data/Layout";
import { ColumnLayout } from "@/components/LayoutElements/ColumnLayout";
import Layout from "@/Data/Layout";
import { ViewHtmlDialog } from "@/components/custom/ViewHtmlDialog";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBan, faFaceSadTear} from "@fortawesome/free-solid-svg-icons";
export function Canvas({ viewHtmlCode, closeDialog }) {
    const htmlref = useRef();
    const { ScreenSize, setScreenSize } = useScreenSize();
    const { DragElementLayout, setDragElementLayout } = useDragDropLayout();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);
    const {htmlCode, setHtmlCode} = useHtmlCode();

    const onDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
        console.log("Ondrag over");
    };
    const onDropHandler = (event) => {
        event.preventDefault();
        setDragOver(false);
        if (DragElementLayout?.dragLayout) {
            setEmailTemplate((prev) => [...prev, DragElementLayout?.dragLayout]);
            toast("New Set of Column Added");
        }
    };

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
            console.log(htmlContent);
            setHtmlCode(htmlContent);
            console.log(htmlCode);
        }
    };

    // useEffect(() => {
    //     console.log("email template design",emailTemplate?.design);
    //     console.log("type of design ",typeof(emailTemplate?.design));
    //     console.log("type of email template in canvas",typeof(emailTemplate), emailTemplate);
    // }, [emailTemplate]);

    const [TempTemplate, setTempTemplate] = useState([]);

    const p = [{4:4}, {4:4}, {4:4}, {4:4}];


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
                        emailTemplate.length >= 0 ? (
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
}
