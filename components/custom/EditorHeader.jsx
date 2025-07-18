"use client";
import React, {useContext, useEffect, useState} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CodeSquare, Code, Monitor, Smartphone } from "lucide-react";
import {useEmailTemplate, useScreenSize} from "@/app/provider";
import Link from "next/link";
import {useMutation} from "convex/react";
import {UpdateTemplateDesign} from "@/convex/emailTemplate";
import {api} from "@/convex/_generated/api";
import {useParams} from "next/navigation";
import {EmailTemplateContext} from "@/context/EmailTemplateContext";
import SendEmail from "@/components/custom/SendEmail";
import { toast } from "sonner";

export const EditorHeader = ({ viewHtmlCode }) => {
    const { ScreenSize, setScreenSize } = useScreenSize();
    const {templateId} = useParams();
    const {emailTemplate, setEmailTemplate} = useEmailTemplate();
    const UpdateTemplate = useMutation(api.emailTemplate.UpdateTemplateDesign);


    const onSaveTemplate = async () => {
        await UpdateTemplate({
            tid: templateId,
            design: emailTemplate,
        });
    };



    return (
        <div className={"p-3 shadow-sm  flex justify-between items-center border "}>
            <Link href={'/dashboard'}>
                <div className={'flex gap-4'}>
                    <Image src={"/logo.svg"} alt={"editor header"} width={50} height={70} className={'ml-10 scale-125 rounded-sm   '}/>
                    <div className={'flex flex-col text-xl'}>
                        <div className={'text-yellow-500 scale-125'}>
                            M<span className={'text-red-400'}>ail</span>
                        </div>
                        <div className={'text-red-400'}>
                            M<span className={'text-yellow-500'}>int</span>
                        </div>
                    </div>
                </div>
            </Link>
            {/*<div className={'flex gap-3'} >*/}
            {/*    <Button variant = {'ghost'} className={`${ScreenSize==='desktop' && 'bg-purple-400' && 'text-primary'}`}> <Monitor/> Desktop</Button>*/}
            {/*    <Button variant = {'ghost'} className={`${ScreenSize==='mobile' && 'bg-purple-400' && 'text-primary'}`}>   <Smartphone/> Mobile</Button>*/}
            {/*</div>*/}
            <div className="flex gap-3">
                <Button
                    onClick={() => {
                        setScreenSize("desktop");
                    }}
                    variant="ghost"
                    className={`${ScreenSize === "desktop" ? "bg-purple-100 text-primary" : ""}`}
                >
                    <Monitor /> Desktop
                </Button>
                <Button
                    onClick={() => {
                        setScreenSize("mobile");
                    }}
                    variant="ghost"
                    className={`${ScreenSize === "mobile" ? "bg-purple-100 text-primary" : ""}`}
                >
                    <Smartphone /> Mobile
                </Button>
            </div>

            <div className={"flex gap-3"}>
                <Button
                    variant={"ghost"}
                    className={"hover:text-primary    hover:bg-purple-100  "}
                    onClick={() => viewHtmlCode(true)}
                >
                    <Code />
                </Button>
                {/*// try sending email will show a dialogue box*/}
                {/*// crossing will remove it*/}

                {/*// now that dialogue box will have a send email button*/}
                {/*// and an input box for ',' separated values for sending email*/}
                <div>
                    <SendEmail/>
                </div>
                <Button onClick={onSaveTemplate} >Save template</Button>
            </div>
        </div>
    );
};
