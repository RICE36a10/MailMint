"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CodeSquare, Code, Monitor, Smartphone } from "lucide-react";
import { useScreenSize } from "@/app/provider";
import ThemeToggle from "@/components/ui/ThemeToggle";
export const EditorHeader = ({ viewHtmlCode }) => {
    const { ScreenSize, setScreenSize } = useScreenSize();
    console.log(ScreenSize);

    return (
        <div className={"p-3 shadow-sm  flex justify-between items-center border "}>
            <div className={'flex gap-4'}>
                <Image src={"/logo.svg"} alt={"editor header"} width={50} height={70} className={'bg-red-100 ml-10 scale-125 border rounded-sm   '}/>
                 <div className={'flex flex-col text-xl'}>
                     <div className={'text-yellow-500 scale-125'}>
                         M<span className={'text-red-400'}>ail</span>
                     </div>
                     <div className={'text-red-400'}>
                         M<span className={'text-yellow-500'}>int</span>
                     </div>
                 </div>
            </div>
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
                <ThemeToggle />
                <Button
                    variant={"ghost"}
                    className={"hover:text-primary    hover:bg-purple-100  "}
                    onClick={() => viewHtmlCode(true)}
                >
                    <Code />
                </Button>
                <Button variant={"outline"}>send test email</Button>
                <Button>save template</Button>
            </div>
        </div>
    );
};
