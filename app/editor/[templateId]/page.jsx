"use client";
import React, {useState} from "react";
import {EditorHeader} from "@/components/custom/EditorHeader";
import {Canvas} from "@/components/custom/Canvas";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Settings from "@/components/custom/Settings";
import {useScreenSize} from "@/app/provider";

function editor() {

    const [viewHtmlCode, setViewHtmlCode] = useState();

    return (
        <div>
            <EditorHeader viewHtmlCode={(v) => setViewHtmlCode(v)} />
            <div className={'grid grid-cols-5'}>
                <ElementsSideBar/>
                <div className={'col-span-3 bg-gray-100'}>
                    <Canvas viewHtmlCode={viewHtmlCode} closeDialog={() => setViewHtmlCode(false)} />
                </div>
                <Settings/>
            </div>
        </div>
    )
}

export default editor;
