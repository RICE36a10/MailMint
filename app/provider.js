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
    const [userDetail, setUserDetail] = useState({});
    const [ScreenSize, setScreenSize] = useState("desktop");
    const [DragElementLayout, setDragElementLayout] = useState({});
    const [SelectedElement, setSelectedElement] = useState();


    const [emailTemplate, setEmailTemplate] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                const storedData = localStorage.getItem("emailTemplate");
                const parsedData = storedData ? JSON.parse(storedData) : [];
                return Array.isArray(parsedData) ? parsedData : [];
            } catch (error) {
                console.error("Error parsing localStorage:", error);
                return [];
            }
        }
        return [];
    });


    // const [emailTemplate, setEmailTemplate] = useState(() => {
    //     if (typeof window !== "undefined") {
    //         try {
    //             return JSON.parse(localStorage.getItem("emailTemplate")) ?? [];
    //         } catch (error) {
    //             console.error("Error parsing localStorage:", error);
    //             return [];
    //         }
    //     }
    //     return [];
    // });


    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = JSON.parse(localStorage.getItem("userDetail"));
            if (storage?.email && storage) {
                setUserDetail(storage);
            } else {
                console.error("No email found in local storage");
            }
        }
    }, []);


    useEffect(() => {
        console.log("Current ScreenSize:", ScreenSize);
    }, [ScreenSize]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
        }
    }, [emailTemplate]);

    useEffect(() => {
        if (typeof window !== undefined) {
            const storage = JSON.parse(localStorage.getItem("userDetail"));
            if (storage?.email) {
                setUserDetail(storage);
            }
        }
    }, []);

    useEffect(() => {
        console.log("Updated Email Template:", emailTemplate);
    }, [emailTemplate]);


    useEffect(() => {
        if (SelectedElement) {
            let updatedEmailTemplate = [];
            emailTemplate.forEach((item, index) => {
                if (item.id === SelectedElement?.layout?.id) {
                    updatedEmailTemplate?.push(SelectedElement?.layout);
                } else {
                    updatedEmailTemplate?.push(item);
                }
            });
            setEmailTemplate(updatedEmailTemplate);
        }
    }, [SelectedElement]);

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
