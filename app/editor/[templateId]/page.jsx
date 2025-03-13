"use client";
import React, {useEffect, useState} from "react";
import { EditorHeader } from "@/components/custom/EditorHeader";
import { Canvas } from "@/components/custom/Canvas";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Settings from "@/components/custom/Settings";
import {useEmailTemplate, useScreenSize, useUserDetail} from "@/app/provider";
import {useParams} from "next/navigation";
import {useConvex, useQuery} from "convex/react";
import {GetTemplateDesign } from "@/convex/emailTemplate";
import {api} from "@/convex/_generated/api";
import Link from "next/link";

function editor() {
    const [viewHtmlCode, setViewHtmlCode] = useState();

    const {templateId} = useParams();
    const {userDetail, setUserDetail} = useUserDetail();
    const convex = useConvex();
    const {emailTemplate, setEmailTemplate} = useEmailTemplate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userDetail) {
            console.log("Fetching template data...");
            console.log(templateId);
            GetTemplateData();
        } else {
            console.log("userDetail is undefined or null");
        }
    }, [userDetail]);


    const GetTemplateData = async () => {
        try {
            if(!userDetail.email) {
                return;
            }
            setLoading(true);
            console.log(userDetail, 'hehehehehe');
            const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
                tid: templateId,
                email: userDetail.email,
            });
            console.log(result, "GetTemplateData");
            console.log(emailTemplate);
            setEmailTemplate(result?.design);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching template data:", error);
        }
    };

    return (
        <div>
            <EditorHeader viewHtmlCode={(v) => setViewHtmlCode(v)} />
            { !loading ? <div className={"grid grid-cols-5"}>
                <ElementsSideBar/>
                <div className={"col-span-3 bg-gray-100"}>
                    <Canvas
                        viewHtmlCode={viewHtmlCode}
                        closeDialog={() => setViewHtmlCode(false)}
                    />
                </div>
                <Settings/>
            </div>
                :
                <div>
                    <h2>please wait</h2>
                </div>
            }
        </div>
    );
}

export default editor;
