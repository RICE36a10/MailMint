"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/custom/SignInButton";
// import { useUserDetail } from "@/provider";
import { useUserDetail } from "@/app/provider";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

export const Header = () => {
    const { userDetail } = useUserDetail();

    console.log("User Email:", userDetail?.email); // Debugging user email

    return (
        <div className="flex justify-between items-center p-4 shadow-sm px-10">
            <Image src="/logo.svg" alt="logo" width={50} height={70} className={' ml-10 scale-125  rounded-sm   '} />
            <div>
                {
                    userDetail?.email ? (
                    <div className="flex gap-3 items-center">
                        <ThemeToggle />
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
                            <ThemeToggle />
                            <SignInButton Messege={"Get Started"} />
                        </div>
                )}
            </div>
        </div>
    );
};
