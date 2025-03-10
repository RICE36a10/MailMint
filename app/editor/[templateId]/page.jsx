"use client";
import React, {useEffect, useState} from "react";
import { EditorHeader } from "@/components/custom/EditorHeader";
import { Canvas } from "@/components/custom/Canvas";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Settings from "@/components/custom/Settings";
import {useScreenSize, useUserDetail} from "@/app/provider";
import {useParams} from "next/navigation";
import {useConvex, useQuery} from "convex/react";
import {GetTemplateDesign } from "@/convex/emailTemplate";
import {api} from "@/convex/_generated/api";

function editor() {
    const [viewHtmlCode, setViewHtmlCode] = useState();

    const {templateId} = useParams();
    const {userDetail, setUserDetail} = useUserDetail();
    const convex = useConvex();

    useEffect(() => {
        if (userDetail) {
            console.log("Fetching template data...");
            GetTemplateData();
        } else {
            console.log("userDetail is undefined or null");
        }
    }, [userDetail]);


    const GetTemplateData = async () => {
        try {
            const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
                tid: templateId,
                email: userDetail.email,
            });
            console.log(result, "GetTemplateData");
        } catch (error) {
            console.error("Error fetching template data:", error);
        }
    };

    return (
        <div>
            <EditorHeader viewHtmlCode={(v) => setViewHtmlCode(v)} />
            <div className={"grid grid-cols-5"}>
                <ElementsSideBar />
                <div className={"col-span-3 bg-gray-100"}>
                    <Canvas
                        viewHtmlCode={viewHtmlCode}
                        closeDialog={() => setViewHtmlCode(false)}
                    />
                </div>
                <Settings />
            </div>
        </div>
    );
}

export default editor;
