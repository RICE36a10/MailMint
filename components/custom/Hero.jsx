"use client";
import react from "react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "./SignInButton";

export const Hero = (props) => {
    return (
        <div
            className={
                "px-10 md:px-28 lg:px-44 xl:px-56 flex flex-col items-center m-24 "
            }
        >
            <h2 className={"text-5xl font-extrabold text-center"}>
                Ai powered
                <span className={"text-primary"}> email templates</span>
            </h2>
            <p className={"text-center mt-4 "}>
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text ever
                since the , when an ...' +
            </p>

            <div className={"flex gap-5 mt-6 "}>
                <Button variant="outline">Try demo</Button>
                <SignInButton />
            </div>
            <img
                src="/landing.png"
                alt="landing"
                width={1000}
                height={800}
                className={"mt-12 rounded-xl"}
            />
        </div>
    );
};
