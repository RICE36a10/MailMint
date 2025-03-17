"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ScreenSizeContext from "../context/ScreenSizeContext";
import { DragDropLayoutContext } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { SelectedElementContext } from "@/context/SelectedElement";
import {UserDetailContext} from "@/context/UserDetailContext"
import { ThemeProvider } from "next-themes";
function Provider({ children }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    const [userDetail, setUserDetail] = useState(null);
    const [ScreenSize, setScreenSize] = useState("desktop");
    const [DragElementLayout, setDragElementLayout] = useState(null);
    const [SelectedElement, setSelectedElement] = useState();
    const [emailTemplate, setEmailTemplate] = useState([]);
    const [htmlCode, setHtmlCode] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Safely parse userDetail from localStorage
            const userDetailStorage = localStorage.getItem("userDetail");
            if (userDetailStorage) {
                try {
                    const parsedUserDetail = JSON.parse(userDetailStorage);
                    if (!parsedUserDetail?.email || !parsedUserDetail) {
                        console.log("No valid user detail found in localStorage");
                    } else {
                        setUserDetail(parsedUserDetail);
                    }
                } catch (error) {
                    console.error("Failed to parse userDetail from localStorage:", error);
                }
            } else {
                console.log("No userDetail found in localStorage");
            }

            // Safely parse emailTemplate from localStorage
            const emailTemplateStorage = localStorage.getItem("emailTemplate");
            if (emailTemplateStorage) {
                try {
                    const parsedEmailTemplate = JSON.parse(emailTemplateStorage);
                    // Ensure parsed value is an array
                    if (Array.isArray(parsedEmailTemplate)) {
                        setEmailTemplate(parsedEmailTemplate);
                    } else {
                        console.error(
                            "Invalid emailTemplate format, resetting to empty array"
                        );
                        setEmailTemplate([]);
                    }
                } catch (error) {
                    console.error("Failed to parse emailTemplate:", error);
                    setEmailTemplate([]); // Fallback to empty array
                }
            } else {
                setEmailTemplate([]); // Fallback to an empty array
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
        }
    }, [emailTemplate]);

    return (
        <ThemeProvider attribute="class">
            <ConvexProvider client={convex}>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                        <ScreenSizeContext.Provider value={{ ScreenSize, setScreenSize }}>
                            <DragDropLayoutContext.Provider
                                value={{ DragElementLayout, setDragElementLayout }}
                            >
                                <EmailTemplateContext.Provider
                                    value={{ emailTemplate, setEmailTemplate }}
                                >
                                    <SelectedElementContext.Provider
                                        value={{ SelectedElement, setSelectedElement }}
                                    >
                                        <div>{children}</div>
                                    </SelectedElementContext.Provider>
                                </EmailTemplateContext.Provider>
                            </DragDropLayoutContext.Provider>
                        </ScreenSizeContext.Provider>
                    </UserDetailContext.Provider>
                </GoogleOAuthProvider>
            </ConvexProvider>
        </ThemeProvider>
    );
}

export default Provider;

export const useUserDetail = () => {
    return useContext(UserDetailContext);
};
export const useScreenSize = () => {
    return useContext(ScreenSizeContext);
};
export const useDragDropLayout = () => {
    return useContext(DragDropLayoutContext);
};
export const useEmailTemplate = () => {
    return useContext(EmailTemplateContext);
};
export const useSelectedElement = () => {
    return useContext(SelectedElementContext);
};
