"use client";
import React, {useEffect, useState, useCallback} from "react";
import dynamic from "next/dynamic";
// Dynamic imports split heavy editor code for faster page loads
const EditorHeader = dynamic(() => import("@/components/custom/EditorHeader"));
const Canvas = dynamic(() => import("@/components/custom/Canvas"));
const ElementsSideBar = dynamic(() => import("@/components/custom/ElementsSideBar"));
const Settings = dynamic(() => import("@/components/custom/Settings"));
import {useEmailTemplate, useScreenSize, useUserDetail} from "@/app/provider";
import { toast } from "sonner";
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
            GetTemplateData();
        }
    }, [userDetail]);


    // Wrapped in useCallback so dependency array can stay stable
    const GetTemplateData = useCallback(async () => {
        try {
            if(!userDetail.email) {
                return;
            }
            setLoading(true);
            const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
                tid: templateId,
                email: userDetail?.email,
            });
            setEmailTemplate(result?.design);
            toast.success("Template loaded");
            setLoading(false);
        } catch (error) {
            console.error("Error fetching template data in /editor/page.jsx :", error);
        }
    }, [convex, templateId, userDetail?.email, setEmailTemplate]);

    // useEffect(() => {
    //     console.log(typeof(emailTemplate), emailTemplate);
    // }, [emailTemplate]);

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
