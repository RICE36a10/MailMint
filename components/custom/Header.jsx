"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/custom/SignInButton";
// import { useUserDetail } from "@/provider";
import { useUserDetail, useTheme } from "@/app/provider";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

export const Header = () => {
    const { userDetail } = useUserDetail();
    const { theme, setTheme } = useTheme();

    console.log("User Email:", userDetail?.email); // Debugging user email

    return (
        <div className="flex justify-between items-center p-4 shadow-sm px-10">
            <Link href={'/'}>
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
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                {
                    userDetail?.email ? (
                    <div className="flex gap-3 items-center">
                        <Link href={"/dashboard"}>
                            <Button>Dashboard</Button>
                        </Link>
                        <Image
                            src={userDetail?.picture}
                            alt="user"
                            width={35}
                            height={35}
                            className="rounded-full"
                        />
                    </div>
                ) : (
                        <div className="flex gap-3 items-center">
                            <SignInButton Messege={"Get Started"} />
                        </div>
                )}
            </div>
        </div>
    );
};
