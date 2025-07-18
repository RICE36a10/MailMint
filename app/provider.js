"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ScreenSizeContext from "../context/ScreenSizeContext";
import { DragDropLayoutContext } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { SelectedElementContext } from "@/context/SelectedElement";
import {UserDetailContext} from "@/context/UserDetailContext"
import {HtmlCodeContext} from "@/context/HtmlCodeContext";
import {ThemeContext} from "@/context/ThemeContext";
function Provider({ children }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    const [userDetail, setUserDetail] = useState(null);
    const [ScreenSize, setScreenSize] = useState("desktop");
    const [DragElementLayout, setDragElementLayout] = useState(null);
    const [SelectedElement, setSelectedElement] = useState();
    const [emailTemplate, setEmailTemplate] = useState([]);
    const [htmlCode, setHtmlCode] = useState("");
    const [theme, setTheme] = useState("light");

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

            // theme
            const storedTheme = localStorage.getItem("theme");
            if (storedTheme === "dark" || storedTheme === "light") {
                setTheme(storedTheme);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
        }
    }, [emailTemplate]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return (
        <ConvexProvider client={convex}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                        <ThemeContext.Provider value={{ theme, setTheme }}>
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
                                        <HtmlCodeContext.Provider
                                        value={{ htmlCode, setHtmlCode }}>
                                            <div>{children}</div>
                                        </HtmlCodeContext.Provider>
                                    </SelectedElementContext.Provider>
                                </EmailTemplateContext.Provider>
                            </DragDropLayoutContext.Provider>
                        </ScreenSizeContext.Provider>
                        </ThemeContext.Provider>
                    </UserDetailContext.Provider>
                </GoogleOAuthProvider>
            </ConvexProvider>
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
export const useHtmlCode = () => {
    return useContext(HtmlCodeContext);
};
export const useTheme = () => {
    return useContext(ThemeContext);
};
